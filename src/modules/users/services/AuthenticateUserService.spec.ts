import FakeUsersRopository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

let fakesUsersRopository: FakeUsersRopository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService

describe('AuthenticateUser', () => {
    beforeEach(() => {
      fakesUsersRopository = new FakeUsersRopository()
      fakeHashProvider = new FakeHashProvider()
  
      
      authenticateUser = new  AuthenticateUserService(fakesUsersRopository, fakeHashProvider)
       
    })

  it('should be able to authenticate', async () => {

   const user = await fakesUsersRopository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '12345'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
    })

    it('should be able to authenticate with non existing user', async () => {  
     await expect(authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '12345'
    })).rejects.toBeInstanceOf(AppError)
      })

      it('should be able to authenticate with  wrong password', async () => {
  
        await createUser.execute({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '12345',
        })
    
    
       await expect(authenticateUser.execute({
          email: 'johndoe@example.com',
          password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError)
        })

})
