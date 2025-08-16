import { Hono } from 'hono'
import { createPersonnel } from '../controllers/personnel.controller.js'


export const personnelRoutes = new Hono()
  .post('/create', createPersonnel)
