import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a no existent car", () => {
    expect(async () => {
      const car_id = "1234";
      const specification_id = ["54321"];

      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "New Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 30,
      brand: "Brand",
      category_id: "category",
    });

    const specifications = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specification_id = [specifications.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });
    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
