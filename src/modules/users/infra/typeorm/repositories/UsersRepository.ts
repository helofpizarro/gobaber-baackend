import { getRepository, Not, Repository } from 'typeorm'

import User from '../entities/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO'

// Data Trnasfer Object

class UserRepository implements IUserRepository  {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne(id)

      return user

    }

    public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({ 
        where: {email}
      })

      return user
    }
    
    public async findAllProviders({except_user_id}: IFindAllProviders): Promise<User[]> {
        let users: User[]

        if(except_user_id){
           users = await this.ormRepository.find({
            where: {
              id: Not(except_user_id)
            }
          })
        } else {
           users = await this.ormRepository.find()
        }
        return users  
    }
    

    public async create({
      name,
      email,
      password,
    }: ICreateUserDTO): Promise<User> {
      const user = this.ormRepository.create({ name, email, password })
  
      await this.ormRepository.save(user)
  
      return user
    }
  

  public async save(user: User): Promise<User | undefined>{
    return this.ormRepository.save(user)
  }
}

export default UserRepository
