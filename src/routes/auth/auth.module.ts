import { env } from '@config/envitoment.prod';
import { ethMiddeleware } from '@middleware/eth.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@routes/user/user.module';
import { JwtStrategy } from '@strategy/jwt.strategy';
import { LocalStrategy } from '@strategy/local.strategy';
import { AuthService } from 'src/service/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: env.jwtSecret,
    signOptions: { expiresIn: env.accessTokenExpires },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ethMiddeleware)
      .forRoutes('auth/eth');
  }
}
