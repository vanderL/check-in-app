import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from '@/http/controllers/gyms/search'
import { nearby } from '@/http/controllers/gyms/nearby'
import { create } from '@/http/controllers/check-ins/create'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('gyms/:gymId/check-ins', create)
}
