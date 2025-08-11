import { z } from 'zod'


export const registerSchema = z.object({
  prenom:  z.string().min(2),
  nom:     z.string().min(2),
  adresse: z.string().min(5),
  email:   z.string().email(),
  pass:z.string().min(6),
  telephone:z.string().min(9),
  specialiteId:z.int(),
})


export const loginSchema = z.object({
  email:    z.string().email(),
  pass: z.string().min(6),
})