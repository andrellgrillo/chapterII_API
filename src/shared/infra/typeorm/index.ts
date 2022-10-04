import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      // host: "localhost",
      host: "mysql.planexconativ.com.br",
      database:
        process.env.NODE_ENV === "test"
          ? "planexconativ"
          : defaultOptions.database,
    })
  );
};
