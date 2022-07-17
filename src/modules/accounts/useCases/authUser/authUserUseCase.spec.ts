import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "../../repositories/mocks/UsersRepositoryMock";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthUserUseCase } from "./authUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let authUserUseCase: AuthUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryMock = new UsersRepositoryMock();
        createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
        authUserUseCase = new AuthUserUseCase(usersRepositoryMock);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000132",
            email: "user@testemail.com",
            password: "1234",
            name: "usertest",
            username: "usernametest",
        };
        await createUserUseCase.execute(user);

        const result = await authUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authUserUseCase.execute({
                email: "email@testeamil.com",
                password: "password1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be not able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "usertest",
                email: "email@testemail.com",
                password: "1234",
                driver_license: "9999",
                username: "usernamehehe",
            };

            await createUserUseCase.execute(user);
            await authUserUseCase.execute({
                email: user.email,
                password: "98788",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
