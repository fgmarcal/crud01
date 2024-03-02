export interface IContacts{
    id:string;
    name:string;
    email:string;
    phone:string;
    userID?:string;
}

export interface ContactCreate{
    name:string;
    email:string;
    phone:string;
    userEmail:string;
}

export interface ContactCreateData{
    name:string;
    email:string;
    phone:string;
    userID:string;
}

export interface IContactsRepository{
    create(data: ContactCreateData): Promise<IContacts>;
    findByEmailOrPhone(email:string, phone:string):Promise <IContacts | null>
    findAllContacts(userID: string): Promise<IContacts[]>;
    update({id, name, phone, email}:IContacts) : Promise <IContacts>;
    delete(id:string) :Promise<boolean>;
}