import { Hono } from 'hono'
import {  statsPatients } from '../controllers/dashboardAdmin.controller.js'


export const dashboardAdminRoutes = new Hono()
  .get('/statsPatient', statsPatients)
