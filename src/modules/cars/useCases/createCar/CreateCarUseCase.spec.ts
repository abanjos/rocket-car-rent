import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryMock } from "../../repositories/mocks/CarsRepositoryMock";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryMock: CarsRepositoryMock;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryMock = new CarsRepositoryMock();
        createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "car name",
            description: "car description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "tester",
            category_id: "982392832",
        });

        expect(car).toHaveProperty("id");
    });

    it("should be able to create a new car with exist license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car name",
                description: "car description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 100,
                brand: "tester",
                category_id: "982392832",
            });

            await createCarUseCase.execute({
                name: "car name2",
                description: "car description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 100,
                brand: "tester",
                category_id: "982392832",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("car should be created with available true by deafault", async () => {
        const car = await createCarUseCase.execute({
            name: "car name",
            description: "car description",
            daily_rate: 100,
            license_plate: "ABCD-1234",
            fine_amount: 100,
            brand: "tester",
            category_id: "982392832",
        });

        console.log(car);

        expect(car.available).toBe(true);
    });
});
