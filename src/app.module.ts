import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./User/User.module";
import { AuthModule } from "./Auth/Auth.module";
import { UserDeletedLogModule } from "./UserDeletedLog/UserDeletedLog.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    UserDeletedLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
