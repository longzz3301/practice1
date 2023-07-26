import { Count, Filter, Where, repository } from "@loopback/repository";
import { UserRepository } from "../repositories";
import { del, get, param, patch, post, put, requestBody, response } from "@loopback/rest";
import { User } from "../models";
import { count } from "console";


export class userController {
    constructor(
        @repository(UserRepository)
        public userRepository : UserRepository
    ) {}



    @post('/creatUser') //create user
    @response(200,{

    })
    async create(
        @requestBody({

        })
        user: User
    ) : Promise<User> {
        return this.userRepository.create(user)
    }




    @get('/getAllUser') //get all user 
    @response(200,{

    })
    
    async find(
        @param.filter(User) filter?: Filter<User>
    ): Promise<(User )[] > {
        console.log(filter)
        return this.userRepository.find(filter);
    }

    @get('/userId/{id}') // get user by Id
    @response(200, {
        
    })
    async findById(
        @param.path.string('id') id:string ,
        @param.filter(User)  filter?: Filter<User>
       
    ) :Promise<User> {
        return this.userRepository.findById(id,filter)
    }

    @patch('/findbyIdAndUpdate/{id}') // find user by id and update user
    @response(200, {
        

    })
    async updateById(
        @param.path.string('id') id:string ,
        @requestBody({

        })
        user : User,
    ) :Promise<User> {
        await this.userRepository.updateById(id,user)
        console.log(user)
        return user
        
    }



    @patch('/updateAll') //update all user in db
    @response(200,{

    })
    async  updateAll(
        @requestBody({

        })
        user:User ,
        @param.where(User) where?:Where<User> ,
    ) : Promise<Count> {
        return this.userRepository.updateAll(user,where)
    }


    @get('/getVipUser') // get user vs dk duoi 18 tuoi
    @response(200,{

    })
    async getVipUser() :Promise<(User)[]> {
        
        const where = {age: {lt :18} }
        return this.userRepository.find({where})
    }


    @get('/countList')  // count nhg doi tuong co age = 8
    async countList (
        // @param.where(User) where?:Where<User>
        
    ):Promise<Count> {
        const where = {age:{eq:8} }
        return this.userRepository.count(where)
    }

    @put('/replaceById/{id}') // replace User = id
    async replaceUser(
        @param.path.string('id') id:string ,
        @requestBody() user:User

    ):Promise<User> {
        await this.userRepository.replaceById(id, user)
        return user
        
    }
    
    @del('/deleteUserById/{id}') // xoa User bang id 
    async DeleteUser(
        @param.path.string('id') id:string ,
        // @requestBody() user:User

    ) :Promise<string> {
        await this.userRepository.deleteById(id)
        const status = 'delete succes'
        return status
    }
    
    
}