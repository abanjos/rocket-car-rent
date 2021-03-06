import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        category_id,
        brand,
        daily_rate,
        description,
        fine_amount,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            category_id,
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
        });

        this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }
}

export { CarsRepository };
