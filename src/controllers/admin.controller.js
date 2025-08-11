import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { adminArraySchema, createAdminSchema } from '../schemas/admin.schema.js'


// inscription admin 
export const createAdmin = async (c) => {
    try {

        const body = await c.req.json()
        const { prenom, nom, adresse, email, pass,telephone} = createAdminSchema.parse(body)
      
        const hashed = await bcrypt.hash(pass, 10)
      
        const user = await prisma.user.create({
          data: { prenom, nom, adresse, email, pass: hashed,telephone ,role : "admin" },
        })
      
        return c.json({ id: user.id, email: user.email })

    } catch (error) {
        console.error('Erreur création admin:', err) // ← important
        return c.json({ message: 'Erreur serveur', error: err.message }, 500)
    }
}
// liste Admin
export const getAllAdmins = async (c) => {
  try {
    const admin = await prisma.user.findMany({
      where: { role: "admin" },
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
    const result = adminArraySchema.parse(admin);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération spécialités:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};