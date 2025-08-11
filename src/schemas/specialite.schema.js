import { z } from 'zod'


export const createSpecialiteSchema = z.object({
  libelle:     z.string().min(5),
})
export const SpecialiteSchema = z.object({
  id:     z.int(),
  libelle:     z.string(),
})

export const specialitesArraySchema = z.array(SpecialiteSchema);

