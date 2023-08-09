import { beforeEach, describe, expect, it } from 'vitest'
import { FakeCheckInsRepository } from '@/repositories/fakes/fake-check-ins-repository'
import { CheckInService } from './check-in'

let checkInsRepository: FakeCheckInsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new FakeCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
