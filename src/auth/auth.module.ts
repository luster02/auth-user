import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service';
import { IEnvironmentVariables } from '../config/config.interface'
import { ConfigModule } from '../config/config.module';
import { UserSchema } from '../user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService<IEnvironmentVariables>) {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule { }
