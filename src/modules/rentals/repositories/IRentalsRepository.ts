import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";
import { Rental } from "../infra/typeorm/entities/Rentals";

interface IRentalsRepository {
  create(data: ICreateRentalsDTO): Promise<Rental>;
  findByOpenRentalCar(car_id: string): Promise<Rental>;
  findByOpenRentalUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
