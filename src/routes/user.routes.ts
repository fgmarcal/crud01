import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { userCreate } from "../interfaces/users.interface";

export async function userRoutes(fastify:FastifyInstance){

    const userUseCase = new UserUseCase();
    fastify.post<{Body: userCreate}>("/", async (request, reply) => {
        const {name, email} = request.body;
        try {
            const data = await userUseCase.create({
                name,
                email,
            });
            return  reply.send(data).status(200);
        } catch (error) {
            reply.send(error).status(500);
        }
    });

    fastify.get('/', (request, reply) =>{
        
        reply.send({hello :"hello"});
    })
}