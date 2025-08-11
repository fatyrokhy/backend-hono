import { z } from 'zod'

export const createMedecinSchema = z.object({
  prenom:  z.string().min(2,"Le prénom doit contenir minimun 2 caractères"),
  nom:     z.string().min(2,"Le nom doit contenir minimun 2 caractères"),
  adresse: z.string().min(5,"L'adresse' doit contenir minimun 5 caractères"),
  email:   z.string().email(),
  pass:z.string().min(6,"Le mot de pass doit contenir minimun 6 caractères"),
  telephone:z.string().min(9,"Le numéro de téléphone doit contenir minimun 9 caractères"),
  specialiteId: z.number().int()
})

export const medecinSchema = z.object({
  prenom:  z.string(),
  nom:     z.string(),
  adresse: z.string(),
  email:   z.string(),
  telephone:z.string(),
  specialiteId: z.number().int()
})

export const medecinArraySchema = z.array(medecinSchema);