import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateScpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);
const createSpecificationController = new CreateScpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
