// import { env } from '@config/envitoment.prod';
import { Module } from '@nestjs/common';
import { UserModule } from '@routes/user/user.module';
import { JwtService } from './jwt/jwt.service';

const proExt = [
  JwtService
]
@Module({
  imports: [UserModule],
  providers: proExt,
  exports: proExt,
})
export class ServiceModule { }
