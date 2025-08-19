import { Hono } from 'hono'
import { createPatient, getAllPatients } from '../controllers/patient.controller.js'


export const patientRoutes = new Hono()
  .post('/create', createPatient)
  .get('/liste', getAllPatients)
