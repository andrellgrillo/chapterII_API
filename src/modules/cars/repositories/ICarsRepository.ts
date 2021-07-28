import { ICarsDTO } from "../dtos/ICarsDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
  create(data: ICarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
