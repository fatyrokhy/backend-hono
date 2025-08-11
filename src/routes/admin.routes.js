import { Hono } from 'hono'
import { createAdmin, getAllAdmins } from '../controllers/admin.controller.js'


export const adminRoutes = new Hono()
  .post('/create', createAdmin)
  .get('/liste', getAllAdmins)
