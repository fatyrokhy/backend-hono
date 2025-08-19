import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { createUserSchema, updateUserSchema, userArraySchema } from '../schemas/admin.schema.js'

// liste users
export const getAllUsers = async (c) => {
  try {
    const admin = await prisma.user.findMany({
      orderBy: { id: 'desc' },
    });
    const result = userArraySchema.parse(admin);
    console.log(result);
    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération users:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};

// création de user
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

// Récupération d'un utilisateur par id
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
// Récupération d'un utilisateur par tel
export const getUserByTel = async (c) => {
  try {
    const tel = c.req.query('telephone'); // récupère :telephone de l’URL
    const statut = c.req.query('statut'); 

    const isActiveFilter = statut === 'true';


    console.log('telephone:', tel, 'isActive:', isActiveFilter);

    const users = await prisma.user.findMany({
      where: {
        telephone: {
          startsWith: tel
        },
        isActive: isActiveFilter
      }
    });

    console.log(users);

    if (!users || users.length === 0) {
      return c.json({ message: 'Utilisateur non trouvé' }, 404);
    }

    return c.json(users);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Erreur lors de la récupération de l’utilisateur' }, 500);
  }
};


export const updateUser = async (c) => {
  try {
    const id = parseInt(c.req.param('id')); // <-- récupère l’ID de l’URL
    if (!id) return c.json({ message: 'ID manquant' }, 400);

    const body = await c.req.json();
    console.log(body);

    const data = updateUserSchema.parse(body);
    const { pass, ...rest } = data;

    const updateData = { ...rest };

    if (pass) {
      updateData.pass = await bcrypt.hash(pass, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData
    });

    return c.json(user);
  } catch (err) {
    console.error('Erreur modification user:', err);
    return c.json({ message: 'Erreur serveur', error: err.message }, 500);
  }
};

// Désactiver User
export const softDeleteUser = async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (!id) return c.json({ message: 'ID manquant' }, 400);

    const user = await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });

    return c.json({ message: `Utilisateur ${user.nom} supprimé` });
  } catch (err) {
    console.error('Erreur soft-delete:', err);
    return c.json({ message: 'Erreur serveur', error: err.message }, 500);
  }
};

//Restaurer user
export const restoreUser = async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: true }
    });
    return c.json({ message: `Utilisateur ${user.nom} restauré` });
  } catch (err) {
    console.error('Erreur restore:', err);
    return c.json({ message: 'Erreur serveur', error: err.message }, 500);
  }
};

// export const updateUser = async (c) => {
//   try {
//     const body = await c.req.json();
//     console.log(body);

//     // Validation
//     const data = updateUserSchema.parse(body);
//     const { id, pass, ...rest } = data;

//     if (!id) return c.json({ message: 'ID manquant pour mise à jour' }, 400);

//     // Préparer les données à mettre à jour
//     const updateData = { ...rest };

//     if (pass) {
//       updateData.pass = await bcrypt.hash(pass, 10);
//     }

//     const user = await prisma.user.update({
//       where: { id },
//       data: updateData
//     });

//     return c.json(user);
//   } catch (err) {
//     console.error('Erreur modification user:', err);
//     return c.json({ message: 'Erreur serveur', error: err.message }, 500);
//   }
// };

// export const updateUser = async (c) => {
//   try {
//     const body = await c.req.json();
//     console.log(body);
//     const { prenom, nom, adresse, email, pass, telephone, role, specialiteId, image, isActive } =
//       updateUserSchema.parse(body);

//     const hashed = await bcrypt.hash(pass, 10);

//     const user = await prisma.user.update({
//       data: {prenom,nom,adresse,email,pass: hashed,telephone,role,specialiteId,image,isActive
//       },
//     });

//     return c.json(user);
//   } catch (err) {
//     console.error('Erreur modification user:', err);
//     return c.json({ message: 'Erreur serveur', error: err.message }, 500);
//   }
// };

// export const updateUsers = async (c) => {
//   try {
//     const body = await c.req.json();
    
//     // Validation avec Zod
//     const data = updateUserSchema.parse(body);
//         console.log(body);

//     const { id, ...updateData } = data;
//     console.log("ID:", id, "updateData:", updateData);
//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: updateData
//     });

//     return c.json(updatedUser);
//   } catch (error) {
//     if (error.code === 'P2025') return c.json({ message: 'Utilisateur non trouvé' }, 404);
//     if (error.name === 'ZodError') return c.json({ message: 'Validation échouée', errors: error.errors }, 400);
//     console.error(error);
//     return c.json({ message: 'Erreur serveur' }, 500);
//   }
// };

// export const updateUsere = async (c) => {
//   try {
//     const id = parseInt(c.req.param('id')); // Récupère l'ID depuis l'URL
//     const body = await c.req.json();

//     // Validation Zod (sans l'ID dans le schéma car il vient de l'URL)
//     const data = updateUserSchema.parse(body);

//     console.log("Mise à jour de l'utilisateur ID:", id, data);

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data
//     });

//     return c.json(updatedUser);
//   } catch (error) {
//     if (error.code === 'P2025') return c.json({ message: 'Utilisateur non trouvé' }, 404);
//     if (error.name === 'ZodError') return c.json({ 
//       message: 'Échec de la validation', 
//       errors: error.errors 
//     }, 400);
//     console.error(error);
//     return c.json({ message: 'Erreur serveur' }, 500);
//   }
// };


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