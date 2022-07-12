import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

/*
 * [] - Define return type
 * [] - Define error return
 * [] - Acess the repository
 * [] - Return something
 */

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryExist = this.categoriesRepository.findByName(name);

        if (categoryExist) {
            throw new Error("Category Already exist!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };