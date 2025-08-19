import bcrypt from 'bcrypt'
import { prisma } from '../config/db.js'
import { signToken } from '../utils/jwt.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'


/* ---------------- Register ---------------- */
export const register = async (c) => {
  const body = await c.req.json()
  const { prenom, nom, adresse, email, pass,telephone,specialiteId } = registerSchema.parse(body)


  const hashed = await bcrypt.hash(pass, 10)


  const user = await prisma.user.create({
    data: { prenom, nom, adresse, email, pass: hashed,telephone ,specialiteId,role : "medecin" },
  })


  return c.json({ id: user.id, email: user.email })
}
/* ---------------- Login ---------------- */
export const login = async (c) => {
  try{

  
  const body = await c.req.json()
  
  const { email, pass } = loginSchema.parse(body)   // ← corrigé
  
  
  const user = await prisma.user.findUnique({ where: { email } })
  
 if (!user) {
      return c.json({ message: 'Invalid credentials' }, 401);
    }

   const passwordMatch = await bcrypt.compare(pass, user.pass);
   console.log(passwordMatch);
   
    if (!passwordMatch) {
      return c.json({ message: 'Invalid credentials' }, 401);
    }
  const token = signToken({ userId: user.id ,prenom: user.prenom, nom: user.nom ,role: user.role, image: user.image   })
  return c.json({ token},200)

}  catch (err) {
    console.error('Login error:', err);
    return c.json({ message: 'Server error' }, 500);
  }
}

