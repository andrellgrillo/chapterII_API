import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able ti lista all available cars", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ECO-2478",
      fine_amount: 100,
      brand: "Car Brand",
      category_id: "category_id",
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list  all available cars  by brand", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car Description",
      daily_rate: 140.0,
      license_plate: "ECO-2478",
      fine_amount: 100,
      brand: "Car_Brand_Test",
      category_id: "category_id",
    });
    const cars = await listCarsUseCase.execute({
      brand: "Car_Brand_Test",
    });
    expect(cars).toEqual([car]);
  });
});
