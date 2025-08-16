import { z } from 'zod'

export const createUserSchema = z.object({
  prenom:  z.string().min(2,"Le prénom doit contenir minimun 2 caractères"),
  nom:     z.string().min(2,"Le nom doit contenir minimun 2 caractères"),
  adresse: z.string().min(5,"L'adresse' doit contenir minimun 5 caractères"),
  email:   z.string().email(),
  pass:z.string().min(6,"Le mot de pass doit contenir minimun 6 caractères"),
  telephone:z.string().min(9,"Le numéro de téléphone doit contenir minimun 9 caractères"),
  role:z.string().min(5,"Choisissez un rôle"), 
  specialiteId: z.number().int().nullable(),
  image:z.string().min(5,"Choisissez une image"), 
  isActive:z.boolean().optional().default(true)
})

export const userSchema = z.object({
  id:  z.int(),
  prenom:  z.string(),
  nom:     z.string(),
  adresse: z.string(),
  email:   z.string(),
  telephone:z.string(),
  role:z.string(),
  specialiteId: z.number().int().nullable(),
  image:z.string(),
  isActive:z.boolean().optional().default(true)
})
export const userArraySchema = z.array(userSchema);

export const updateUserSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional(),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").optional(),
  email: z.string().email("Email invalide").optional(),
  telephone: z.string().min(9, "Numéro invalide").optional(),
  adresse: z.string().optional(),
  specialiteId: z.number().nullable().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional()
});

