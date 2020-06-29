import { IUser } from "../interfaces/user.interface";

export class User {

    public id = '';
    public username: String = '';
    public email: string = '';
    public password: string = '';

    constructor(username: string, email: string, passsword: string) {
        this.id = '0';
        this.username = username;
        this.email = email;
        this.password = passsword;
    }
}