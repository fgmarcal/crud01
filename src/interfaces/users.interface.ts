export interface IUser{
    id:string;
    email:string;
    name:string;
    createdAt: Date;
    updatedAt: Date;
}

export interface userCreate{
    email:string;
    name:string;
}

export interface IUserRepository{
    create(data:userCreate):Promise<IUser>;
    findByEmail(email:string): Promise<IUser | null>;
}