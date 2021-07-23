import { Category } from "@modules/cars/entities/Categories";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    const categories = await this.categories;
    return categories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(
      (category) => category.name === name
    );
    return category;
  }
}

export { CategoriesRepositoryInMemory };
