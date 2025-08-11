import { Hono } from 'hono'
import { createMedecin, getAllMedecins } from '../controllers/medecin.controller.js'


export const medecinRoutes = new Hono()
  .post('/create', createMedecin)
  .get('/liste', getAllMedecins)
