import { Specification } from "../models/Specification";

interface ICreateSpecificationDTo {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create({ name, description }: ICreateSpecificationDTo): void;
}

export { ISpecificationsRepository, ICreateSpecificationDTo };
