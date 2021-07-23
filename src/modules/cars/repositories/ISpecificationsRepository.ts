import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTo {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTo): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDTo };
