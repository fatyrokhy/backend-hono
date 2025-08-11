import { Hono } from 'hono'
import { createSpecialite, getAllSpecialites } from '../controllers/specialite.controller.js'


export const specialiteRoutes = new Hono()
  .post('/create', createSpecialite)
  .get('/liste', getAllSpecialites)
