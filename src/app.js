import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'


import { authRoutes }    from './routes/auth.routes.js'
import { specialiteRoutes } from './routes/specialite.routes.js'
import { adminRoutes} from './routes/admin.routes.js'
import { patientRoutes } from './routes/patient.routes.js'
import { dashboardAdminRoutes } from './routes/dahboardAdmin.routes.js'
import { SwaggerStaticApp } from './swagger.static.js'


export const app = new Hono()
  .use('*', logger())
  .use('*', cors())

const swaggerApp = new SwaggerStaticApp();

/* --------- Sous‑apps --------- */
app.route('/auth',     authRoutes)
app.route('/specialite',     specialiteRoutes)
app.route('/admin',     adminRoutes)
app.route('/patient',     patientRoutes)
app.route('/dashboardAdmin',   dashboardAdminRoutes)
app.route('/docs',  swaggerApp.getApp())
// app.listen({ port: 3000 })

/* --------- Endpoints simples --------- */
app.get('/test', (c) => c.json({ ok: true }))
app.get('/',     (c) => c.text('API up ✔️'))