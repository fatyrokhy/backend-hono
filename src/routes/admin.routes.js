import { Hono } from 'hono'
import { createUser, getAllAdmins, getAllMedcins, getAllPersonnels, getAllUsers, getUserById, getUserByTel, restoreUser, softDeleteUser, updateUser } from '../controllers/admin.controller.js'


export const adminRoutes = new Hono()
  .post('/create', createUser)
  .get('/listeUser', getAllUsers)
  .get('/listeAdmin', getAllAdmins)
  .get('/listeMedcin', getAllMedcins)
  .get('/listePersonnel', getAllPersonnels)
  .get('/recup/:id', getUserById)
  .get('/userByTel/:telephone', getUserByTel)
  .put('/update/:id', updateUser)
  .patch('/desactiver/:id', softDeleteUser )
  .patch('/restaurer/:id', restoreUser )