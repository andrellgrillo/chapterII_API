import { container } from "tsyringe";

import { IDateProvider } from "./DateProviders/IDateProviders";
import { DayjsDateProvider } from "./DateProviders/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
