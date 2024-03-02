import { prisma } from "../database/prisma-client";
import {  ContactCreateData, IContacts, IContactsRepository } from "../interfaces/contacts.interface";

class ContactsRespositoryPrisma implements IContactsRepository{

    async create(data: ContactCreateData): Promise<IContacts> {
        const result = await prisma.contacts.create({
            data:{
                email: data.email,
                name: data.name,
                phone: data.phone,
                userID: data.userID,
            }
        });
        return result
    }

    async findByEmailOrPhone(email:string, phone:string):Promise <IContacts | null>{
        const result = await prisma.contacts.findFirst({
            where:{
                OR:[
                    {email},
                    {phone},
                ],
            }
        });

        return result;
    }

    async findAllContacts(userID: string): Promise<IContacts[]> {
        const result = await prisma.contacts.findMany({
            where:{
                userID,
            },
        });
        return result;
    }

    async update({ id, name, phone, email }: IContacts): Promise<IContacts> {
        const result = await prisma.contacts.update({
            where:{
                id,
            },
            data:{
                email,
                name,
                phone,
            }
        });
        return result;
    }

    async delete(id: string): Promise<boolean> {
        const result = await prisma.contacts.delete({
            where: {
                id
            }
        });

        return result? true : false;
    }


}

export {ContactsRespositoryPrisma}