import { prisma } from '../config/db.js'
import { createSpecialiteSchema, specialitesArraySchema } from '../schemas/specialite.schema.js'


/* ---------------- Register ---------------- */
export const createSpecialite = async (c) => {
    try{
  const body = await c.req.json()
  const { libelle} = createSpecialiteSchema.parse(body)

  const spec = await prisma.specialite.create({
    data: { libelle},
  })

  return c.json({ id: spec.id, libelle: spec.libelle })
    } catch (err) {
    console.error('Erreur création spécialité:', err) // ← important
    return c.json({ message: 'Erreur serveur', error: err.message }, 500)
  }
}
/* ---------------- Login ---------------- */
export const getAllSpecialites = async (c) => {
  try {
    const specialites = await prisma.specialite.findMany({
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
    const result = specialitesArraySchema.parse(specialites);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération spécialités:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};

