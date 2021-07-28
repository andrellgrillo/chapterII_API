import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTo,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async list(): Promise<Specification[]> {
    const spec = await this.specifications;
    return spec;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTo): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = await this.specifications.filter((spec) =>
      ids.includes(spec.id)
    );
    return specs;
  }
}

export default SpecificationsRepositoryInMemory;
