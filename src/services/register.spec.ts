import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'

import { FakeUsersRepository } from '@/repositories/fakes/fake-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new FakeUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new FakeUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new FakeUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'fulano@email.com'

    await registerService.execute({
      name: 'Fulano de Tal',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'Fulano de Tal',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
