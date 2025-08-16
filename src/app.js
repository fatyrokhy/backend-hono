import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'


import { authRoutes }    from './routes/auth.routes.js'
import { specialiteRoutes } from './routes/specialite.routes.js'
import { adminRoutes} from './routes/admin.routes.js'
import { medecinRoutes } from './routes/medecin.routes.js'
import { personnelRoutes } from './routes/personnel.routes.js'


export const app = new Hono()
  .use('*', logger())
  .use('*', cors())


/* --------- Sous‑apps --------- */
app.route('/auth',     authRoutes)
app.route('/specialite',     specialiteRoutes)
app.route('/admin',     adminRoutes)
app.route('/medecin',     medecinRoutes)
app.route('/personnel',     personnelRoutes)


/* --------- Endpoints simples --------- */
app.get('/test', (c) => c.json({ ok: true }))
app.get('/',     (c) => c.text('API up ✔️'))