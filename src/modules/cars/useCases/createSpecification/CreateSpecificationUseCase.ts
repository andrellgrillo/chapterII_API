import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    if (this.specificationsRepository.findByName(name)) {
      throw new Error("Specification already exist");
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
