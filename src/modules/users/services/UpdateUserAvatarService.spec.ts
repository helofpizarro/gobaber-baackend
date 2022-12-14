import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UdateUserAvatarService from './UpdateUserAvatarService'


let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider

 let updateUserAvatar: UdateUserAvatarService 

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

     updateUserAvatar = new UdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )
  })
  it('should be able to create a new user', async () => {
   

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should delete old avatar when updating new one', async () => {


    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

   
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg')


   await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg',
    })
    ).rejects.toBeInstanceOf(AppError)
  })

  

})
