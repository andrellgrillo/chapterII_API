import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private speficicationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specification = await this.speficicationRepository.list();
    return specification;
  }
}

export { ListSpecificationUseCase };
