import { getRepository, Repository } from "typeorm";

import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findByOpenRentalCar(car_id: string): Promise<Rental> {
    const openRentalCar = await this.repository.findOne({ car_id });
    return openRentalCar;
  }

  async findByOpenRentalUser(user_id: string): Promise<Rental> {
    const openRentalUser = await this.repository.findOne({ user_id });
    return openRentalUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalsDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      // start_date: new Date(),
    });

    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
