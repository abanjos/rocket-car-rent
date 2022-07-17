import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    // receive info from form (need DTO)
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };
