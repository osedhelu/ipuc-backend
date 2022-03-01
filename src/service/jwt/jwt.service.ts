import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';
import { WsException } from '@nestjs/websockets';
import { User } from '@routes/user/user.schema';
import { env } from '@config/envitoment.prod';
import { UserService } from '../user.service';
import { MessageResponse } from '@interfaces/httpResponse';

@Injectable()
export class JwtService {

    private logger: Logger = new Logger('jwt.Service');
    constructor(private readonly usersService: UserService) { }
    /**
     * Generates a new JWT token
     *
     * @param {User} user - The user to create the payload for the JWT
     * @returns {Promise} tokens - The access and the refresh token
     */
    async generateToken(user: User): Promise<any> {
        const payload = {
            sub: {
                _id: user._id,
                email: user.email,
                username: user.username
            },
            iss: os.hostname()
        };
        const accessToken = await jwt.sign(payload, env.jwtSecret, {
            expiresIn: env.accessTokenExpires
        });
        const refreshToken = await jwt.sign(payload, env.jwtSecret, {
            expiresIn: env.refreshTokenExpires
        });
        return { accessToken, refreshToken };
    }

    /**
     * Validates the token
     *
     * @param {string} token - The JWT token to validate
     * @param {boolean} isWs - True to handle WS exception instead of HTTP exception (default: false)
     */
    async verify(token: any, isWs: boolean = false): Promise<MessageResponse> {
        try {
            const payload = <User>jwt.verify(token, env.jwtSecret);
            const user = await this.usersService.findOne(payload.username);
            if (!user) {
                return {
                    ok: false,
                    message: 'este token no es verdadero'
                }
            }
            return {
                ok: true,
                data: user
            }
        } catch (err) {
            return {
                ok: false,
                message: err
            }
        }
    }

}
