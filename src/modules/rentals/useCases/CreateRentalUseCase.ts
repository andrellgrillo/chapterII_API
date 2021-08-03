import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minHour = 24;
    const carUnavailable = await this.rentalsRepository.findByOpenRentalCar(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car not available", 400);
    }

    const rentalOpenUser = await this.rentalsRepository.findByOpenRentalUser(
      user_id
    );

    if (rentalOpenUser) {
      throw new AppError("User already a open rental car", 400);
    }

    const dateNow = this.dateProvider.now();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minHour) {
      throw new AppError("Minimal hour to rental is 24h", 400);
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    return rental;
  }
}

export { CreateRentalUseCase };
