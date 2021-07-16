import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

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
