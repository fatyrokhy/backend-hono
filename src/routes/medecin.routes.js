import { Hono } from 'hono'
import { createMedecin } from '../controllers/medecin.controller.js'


export const medecinRoutes = new Hono()
  .post('/create', createMedecin)
