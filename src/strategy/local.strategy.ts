
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(data): Promise<any> {
        const user = await this.authService.validateUser(data);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}