import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import {  createPersonnelSchema} from '../schemas/personnel.schema.js'


// inscription admin 
export const createPersonnel = async (c) => {
    try {

        const body = await c.req.json()
        const { prenom, nom, adresse, email, pass,telephone} = createPersonnelSchema.parse(body)
      
        const hashed = await bcrypt.hash(pass, 10)
      
        const user = await prisma.user.create({
          data: { prenom, nom, adresse, email, pass: hashed,telephone ,role : "personnel" },
        })
      
        return c.json({ id: user.id, email: user.email })

    } catch (error) {
        console.error('Erreur création personnel:', err) // ← important
        return c.json({ message: 'Erreur serveur', error: err.message }, 500)
    }
}

