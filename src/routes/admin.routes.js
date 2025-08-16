import { Hono } from 'hono'
import { createUser, getAllAdmins, getAllMedcins, getAllPersonnels, getAllUsers, getUserById, updateUser } from '../controllers/admin.controller.js'


export const adminRoutes = new Hono()
  .post('/create', createUser)
  .get('/listeUser', getAllUsers)
  .get('/listeAdmin', getAllAdmins)
  .get('/listeMedcin', getAllMedcins)
  .get('/listePersonnel', getAllPersonnels)
  .get('/recup/:id', getUserById)
  .put('/update/:id', updateUser)