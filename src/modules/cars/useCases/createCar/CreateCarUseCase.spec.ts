import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able create a new car", async () => {
    await createCarUseCase.execute({
      name: "New Car",
      description: "New Car",
      daily_rate: 5,
      license_plate: "ABC1454",
      fine_amount: 100,
      brand: "Brand",
      category_id: "1a2s3d6f4g6h9y8t7r4e1w2q1a2s3d6f5g4h",
    });
  });

  it("shoould not able to create a  car with exists licenses plates", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "New Car",
        description: "New Car",
        daily_rate: 5,
        license_plate: "ABC1454",
        fine_amount: 100,
        brand: "Brand",
        category_id: "1a2s3d6f4g6h9y8t7r4e1w2q1a2s3d6f5g4h",
      });

      await createCarUseCase.execute({
        name: "New Car2",
        description: "New Car",
        daily_rate: 5,
        license_plate: "ABC1454",
        fine_amount: 100,
        brand: "Brand",
        category_id: "1a2s3d6f4g6h9y8t7r4e1w2q1a2s3d6f5g4h",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available false by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });
    expect(car.isAvailable).toBe(true);
  });
});
