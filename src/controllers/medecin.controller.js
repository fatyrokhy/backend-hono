import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { createMedecinSchema } from '../schemas/medecin.schema.js'


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
