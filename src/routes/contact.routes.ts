import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usercase";
import { ContactCreate, IContacts } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middleware/auth.middleware";

export async function contactRoutes(fastify:FastifyInstance){
    const contactUseCase = new ContactUseCase();
    fastify.addHook('preHandler', authMiddleware);
    fastify.post<{Body: ContactCreate}>("/", async (request, reply) => {
        const {name, email, phone, userEmail} = request.body;
        const emailUser = request.headers['email'];
        try {
            const data = await contactUseCase.create({
                email,
                name,
                phone,
                userEmail:emailUser
            });
            return  reply.send(data).status(200);
        } catch (error) {
            reply.send(error).status(500);
        }
    });

    fastify.get("/", async(request, reply) =>{
        const emailUser = request.headers['email'];
        try {
            const data = await contactUseCase.listAllContacts(emailUser);
            return reply.send(data).status(200);
        } catch (error) {
            reply.send(error).status(500);
        }
    });

    fastify.put<{Body : IContacts, Params: {id: string}}>("/:id", async (request, reply) =>{
        const { id } = request.params;
        const {name, email, phone} = request.body;
        try {
            const data = await contactUseCase.update({
                id,
                name,
                phone,
                email,
            });
            return reply.send(data).status(201);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.delete<{Params: {id: string}}>("/:id", async(request, reply) =>{
        const { id } = request.params;
        try {
            const data = await contactUseCase.delete(id);
            return reply.send(data).status(200);
        } catch (error) {
            reply.send(error).status(500);
        }
    });

}