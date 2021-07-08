import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    if (this.categoriesRepository.findByName(name)) {
      throw new Error(" Category already exist!");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
