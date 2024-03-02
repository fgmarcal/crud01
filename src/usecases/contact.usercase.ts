import { prisma } from "../database/prisma-client";
import { ContactCreate, IContacts, IContactsRepository } from "../interfaces/contacts.interface";
import { IUserRepository } from "../interfaces/users.interface";
import { ContactsRespositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase{
    private contactRepository: IContactsRepository;
    private userRepository: IUserRepository
    constructor() {
        this.contactRepository = new ContactsRespositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({email, name, phone, userEmail}:ContactCreate){
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error("user not found");
        }

        const verifyIfContactExists = await this.contactRepository.findByEmailOrPhone(email, phone);
        if(verifyIfContactExists){
            throw new Error("Contact already exists");
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userID: user.id
        });
        return contact;
    }

    async listAllContacts(userEmail: string){
        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error('User not found');
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;
    }

    async update({id, name, phone, email}:IContacts){
        const data = await this.contactRepository.update({
            name,
            id,
            phone,
            email,
        });

        return data;
    }

    async delete(id:string){
        const data = await this.contactRepository.delete(id);
        return data;
    }

}

export {ContactUseCase};