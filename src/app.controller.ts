import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RedisContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './user.schema'
import { SignupDto, SigninDto } from './dto'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  private readonly logger = new Logger('UserMicroservice');
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @MessagePattern({ type: 'get' })
  async get(@Payload() id: string, @Ctx() context: RedisContext): Promise<User> {
    this.logger.log(`Channel: ${context.getChannel()}, action: find user by id`)
    const user: User = await this.appService.get(id)
    return user
  }

  @MessagePattern({ type: 'delete' })
  async delete(@Payload() id: string, @Ctx() context: RedisContext): Promise<void> {
    this.logger.log(`Channel: ${context.getChannel()}, action: update user`)
    await this.appService.delete(id)
  }

  @MessagePattern({ type: 'signup' })
  async signup(@Payload() userData: SignupDto, @Ctx() context: RedisContext): Promise<string> {
    this.logger.log(`Channel: ${context.getChannel()}, action: signup user`)
    await this.authService.signup(userData)
    return 'created'
  }

  @MessagePattern({ type: 'signin' })
  async signin(@Payload() userData: SigninDto, @Ctx() context: RedisContext): Promise<string> {
    this.logger.log(`Channel: ${context.getChannel()}, action: signin user`)
    const { token } = await this.authService.signin(userData)
    return token
  }

  @MessagePattern({ type: 'getUsername' })
  async getUsername(@Payload() username: string, @Ctx() context: RedisContext): Promise<User> {
    this.logger.log(`Channel: ${context.getChannel()}, action: find user by username`)
    const user: User = await this.appService.getUsername(username)
    return user
  }

  @MessagePattern({ type: 'getEmail' })
  async getEmail(@Payload() email: string, @Ctx() context: RedisContext): Promise<User> {
    this.logger.log(`Channel: ${context.getChannel()}, action: find user by email`)
    const user: User = await this.appService.getEmail(email)
    return user
  }

}
