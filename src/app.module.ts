import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './user.schema'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
