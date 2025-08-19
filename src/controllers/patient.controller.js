import { prisma } from '../config/db.js';
import { createPatientSchema, patientArraySchema } from '../schemas/patient.schema.js';

/* ---------------- Create Patient ---------------- */
export const createPatient = async (c) => {
  try {
    const body = await c.req.json();

    if (body.dateNaissance) {
    body.dateNaissance = new Date(body.dateNaissance);
    }
    
    // Validation du corps de la requête
    const { prenom,nom,adresse,email,telephone,sexe,dateNaissance,isActive
    } = createPatientSchema.parse(body);

    const patient = await prisma.patient.create({
      data: { prenom,nom, adresse,email,telephone,sexe,dateNaissance,
        isActive
      },
    });

    return c.json({
      id: patient.id,
      prenom: patient.prenom,
      nom: patient.nom,
      email: patient.email,
      telephone: patient.telephone,
      sexe: patient.sexe,
      dateNaissance: patient.dateNaissance,
      isActive: patient.isActive
    });
  } catch (err) {
    console.error('Erreur création patient:', err);
    return c.json({ message: 'Erreur serveur', error: err.message }, 500);
  }
};

/* ---------------- Get All Patients ---------------- */
export const getAllPatients = async (c) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { id: 'asc' },
    });

    // Validation de la sortie
    const result = patientArraySchema.parse(patients);

    return c.json(result);
  } catch (err) {
    console.error('Erreur récupération patients:', err);
    return c.json({ message: 'Erreur serveur' }, 500);
  }
};
