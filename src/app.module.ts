import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { typeOrmAsyncConfig, typeOrmConfig } from './config/typeorm.config';




@Module({
  imports: [
      UsersModule,
      AuthModule,
      TypeOrmModule.forRoot(typeOrmConfig),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
