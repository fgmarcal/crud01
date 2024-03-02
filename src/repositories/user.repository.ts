import { prisma } from "../database/prisma-client";
import { IUser, IUserRepository, userCreate } from "../interfaces/users.interface";

class UserRepositoryPrisma implements IUserRepository {

    async create(data: userCreate): Promise<IUser> {
        
        const result = await prisma.user.create({
            data:{
                name: data.name,
                email: data.email,
            }
        });
        return result;
    }

    async findByEmail(email: string): Promise<IUser | null>{
        const result = await prisma.user.findFirst({
            where:{
                email,
            }
        });
        return result || null;
    }

}

export {UserRepositoryPrisma};