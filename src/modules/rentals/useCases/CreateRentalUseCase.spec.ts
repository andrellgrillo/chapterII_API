import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "11111",
      car_id: "22222",
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not able to create a nre rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "111111",
        car_id: "222222",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "111111",
        car_id: "222222",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "111112",
        car_id: "222222",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "111111",
        car_id: "222222",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new rental if there is expected return minor of the 24h", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "111112",
        car_id: "222222",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
