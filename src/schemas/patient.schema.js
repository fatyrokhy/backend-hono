import { z } from "zod";

// Enum sexe
export const sexeEnum = z.enum(["homme", "femme"]);

// Schema pour créer un patient
export const createPatientSchema = z.object({
  prenom:       z.string().min(2, "Le prénom doit contenir minimum 2 caractères"),
  nom:          z.string().min(2, "Le nom doit contenir minimum 2 caractères"),
  adresse:      z.string().min(5, "L'adresse doit contenir minimum 5 caractères"),
  email:        z.string().email("Email invalide"),
  telephone:    z.string().min(9, "Le numéro de téléphone doit contenir minimum 9 caractères"),
  sexe:         sexeEnum,
  dateNaissance:z.date(),
  isActive:     z.boolean().optional()
});

// Schema patient pour lecture (sans validation des champs requis)
export const patientSchema = z.object({
  id:           z.number().int(),
  prenom:       z.string(),
  nom:          z.string(),
  adresse:      z.string(),
  email:        z.string(),
  telephone:    z.string(),
  sexe:         sexeEnum,
  dateNaissance:z.date(),
  isActive:     z.boolean()
});

// Tableau de patients
export const patientArraySchema = z.array(patientSchema);
