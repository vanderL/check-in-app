import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticateService'

export function MakeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
