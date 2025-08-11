import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { createMedecinSchema, medecinArraySchema } from '../schemas/medecin.schema.js'


// inscription medecin 
export const createMedecin = async (c) => {
    try {

        const body = await c.req.json()
        const { prenom, nom, adresse, email, pass,telephone,specialiteId} = createMedecinSchema.parse(body)
      
        const hashed = await bcrypt.hash(pass, 10)
      
        const user = await prisma.user.create({
          data: { prenom, nom, adresse, email, pass: hashed,telephone,specialiteId,role : "medecin" },
        })
      
        return c.json({ id: user.id, email: user.email })

    } catch (err) {
        console.error('Erreur création medecin:', err) 
        return c.json({ message: 'Erreur serveur', error: err.message }, 500)
    }
}
// liste medecin
export const getAllMedecins = async (c) => {
  try {
    const medecin = await prisma.user.findMany({
      where: { role: "medecin" },
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
  const   result = medecinArraySchema.parse(medecin);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération medecin :', err)
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};