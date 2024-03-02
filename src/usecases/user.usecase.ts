import { IUser, IUserRepository, userCreate } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase{
    private userRepository: IUserRepository;

    constructor(){
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({name, email}:userCreate): Promise<IUser>{
        const verifyIfUserExists = await this.userRepository.findByEmail(email);
        if(verifyIfUserExists){
            throw new Error("User already exists");
        }
        const result = await this.userRepository.create({name, email});
        
        return result;
    }
}

export {UserUseCase}