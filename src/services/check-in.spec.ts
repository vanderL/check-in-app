import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { FakeCheckInsRepository } from '@/repositories/fakes/fake-check-ins-repository'
import { CheckInService } from './check-in'
import { FakeGymsRepository } from '@/repositories/fakes/fake-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: FakeCheckInsRepository
let gymsRepository: FakeGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new FakeCheckInsRepository()
    gymsRepository = new FakeGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      latitude: new Decimal(2),
      longitude: new Decimal(3),
      phone: '85981214026',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })
})
