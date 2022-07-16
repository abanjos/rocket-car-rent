import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    // receive info from form (need DTO)
    create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
