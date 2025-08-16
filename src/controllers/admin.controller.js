import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { createUserSchema, updateUserSchema, userArraySchema } from '../schemas/admin.schema.js'

// inscription admin 
// export const createUser = async (c) => {
//     try {

//         const body = await c.req.json()
//         const { prenom, nom, adresse, email, pass,telephone,role,specialiteId} = createUserSchema.parse(body)
      
//         const hashed = await bcrypt.hash(pass, 10)
      
//         const user = await prisma.user.create({
//           data: { prenom, nom, adresse, email, pass: hashed,telephone,role,specialiteId },
//         })
      
//         return c.json({ id: user.id, email: user.email })

//     } catch (error) {
//         console.error('Erreur création user:', err) // ← important
//         return c.json({ message: 'Erreur serveur', error: err.message }, 500)
//     }
// }

// liste users
export const getAllUsers = async (c) => {
  try {
    const admin = await prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
    const result = userArraySchema.parse(admin);
    console.log(result);
    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération users:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};

export const createUser = async (c) => {
  try {
    const body = await c.req.json();
    console.log(body);
    const { prenom, nom, adresse, email, pass, telephone, role, specialiteId, image, isActive } =
      createUserSchema.parse(body);

    const hashed = await bcrypt.hash(pass, 10);

    const user = await prisma.user.create({
      data: {prenom,nom,adresse,email,pass: hashed,telephone,role,specialiteId,image,isActive
      },
    });

    return c.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error('Erreur création user:', err);
    return c.json({ message: 'Erreur serveur', error: err.message }, 500);
  }
};

// liste Admin
export const getAllAdmins = async (c) => {
  try {
    const admin = await prisma.user.findMany({
      where: { role: "admin" },
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
    const result = userArraySchema.parse(admin);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération spécialités:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};
// liste Medecin
export const getAllMedcins = async (c) => {
  try {
    const medcin = await prisma.user.findMany({
      where: { role: "medecin" },
      orderBy: { id: 'asc' },
    });

  
    const result = userArraySchema.parse(medcin);
    console.log(result);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération medcins:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};
// liste Personnel
export const getAllPersonnels = async (c) => {
  try {
    const personnel = await prisma.user.findMany({
      where: { role: "personnel" },
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
    const result = userArraySchema.parse(personnel);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération personnel:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};


export const getUserById = async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    const user = await prisma.user.findUnique({
      where: { id }
    });

    console.log(user);
    if (!user) {
      return c.json({ message: 'Utilisateur non trouvé' }, 404);
    }

    return c.json(user);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Erreur lors de la récupération de l’utilisateur' }, 500);
  }
};

export const updateUsers = async (c) => {
  try {
    const body = await c.req.json();
    
    // Validation avec Zod
    const data = updateUserSchema.parse(body);
        console.log(body);

    const { id, ...updateData } = data;
    console.log("ID:", id, "updateData:", updateData);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    return c.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') return c.json({ message: 'Utilisateur non trouvé' }, 404);
    if (error.name === 'ZodError') return c.json({ message: 'Validation échouée', errors: error.errors }, 400);
    console.error(error);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};

export const updateUser = async (c) => {
  try {
    const id = parseInt(c.req.param('id')); // Récupère l'ID depuis l'URL
    const body = await c.req.json();

    // Validation Zod (sans l'ID dans le schéma car il vient de l'URL)
    const data = updateUserSchema.parse(body);

    console.log("Mise à jour de l'utilisateur ID:", id, data);

    const updatedUser = await prisma.user.update({
      where: { id },
      data
    });

    return c.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') return c.json({ message: 'Utilisateur non trouvé' }, 404);
    if (error.name === 'ZodError') return c.json({ 
      message: 'Échec de la validation', 
      errors: error.errors 
    }, 400);
    console.error(error);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};


// export const updateUser = async (c) => {
//   try {
    
//     const body = await c.req.json();

//      const data = updateUserSchema.parse(body);
//      const { id, ...updateData } = data;
//      console.log(data);
     

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: updateData
//     });


//     return c.json(updatedUser);
//   } catch (error) {
//     if (error.code === 'P2025') {
//       return c.json({ message: 'Utilisateur non trouvé' }, 404);
//     }
//     if (error.name === 'ZodError') {
//       return c.json({ message: 'Validation échouée', errors: error.errors }, 400);
//     }
//     console.error(error);
//     return c.json({ message: 'Erreur lors de la mise à jour de l’utilisateur' }, 500);
//   }
// };


// export const userRoute= async (c) => {
//   try {
//     const id = parseInt(c.req.param('id'))
//     const body = await c.req.json()

//     // Mettre à jour dans Prisma
//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: {
//         nom: body.nom,
//         prenom: body.prenom,
//         email: body.email,
//         telephone: body.telephone,
//         image: body.image, // si tu as ajouté image
//         status: body.status // si tu as ajouté status
//       }
//     })

//     return c.json(updatedUser)
//   } catch (error) {
//     console.error(error)
//     return c.json({ message: 'Erreur lors de la mise à jour de l’utilisateur' }, 500)
//   }
// }