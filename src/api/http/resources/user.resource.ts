import {User} from "../../models/user";


export class UserResource {
    id: number;
    name: string;
    email: string;
    role: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role.name;
    }

    public static collection(users: User[]): UserResource[] {
        return users.map((user) => new UserResource(user));
    }
}
