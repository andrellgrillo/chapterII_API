import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

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
    expect(async () =>{
      await createCarUseCase.execute({
        name: "New Car",
        description: "New Car",
        daily_rate: 5,
        license_plate: "ABC1454",
        fine_amount: 100,
        brand: "Brand",
        category_id: "1a2s3d6f4g6h9y8t7r4e1w2q1a2s3d6f5g4h",
    }) 
  })
});
