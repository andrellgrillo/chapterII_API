import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationUseCase {
  constructor(private speficicationRepository: ISpecificationsRepository) {}
  execute(): Specification[] {
    const specification = this.speficicationRepository.list();
    return specification;
  }
}

export { ListSpecificationUseCase };
