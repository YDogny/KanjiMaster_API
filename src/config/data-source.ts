
import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";
import { UserEntity } from "../contexts/user/entities/User.entity";

export const db = new DataSource({
  type: "mysql",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  charset: "utf8mb4",

  logging: true,

  synchronize: false,

  entities: [UserEntity],
});
