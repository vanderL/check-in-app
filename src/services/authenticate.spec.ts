import { describe, expect, it } from 'vitest'

import { FakeUsersRepository } from '@/repositories/fakes/fake-users-repository'
import { AuthenticateService } from './authenticateService'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new FakeUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'fulano@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new FakeUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await expect(() =>
      sut.execute({
        email: 'fulano@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new FakeUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'fulano@email.com',
        password: '7777777',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
