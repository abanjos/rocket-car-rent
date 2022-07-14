import { inject, injectable } from "tsyringe";

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
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryExist = await this.categoriesRepository.findByName(name);

        if (categoryExist) {
            throw new Error("Category Already exist!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
