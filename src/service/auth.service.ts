
import { Login } from '@interfaces/login.interface';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '@utils/password';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    private logger: Logger = new Logger('auth service');
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(user: Login): Promise<any> {
        const data = await this.usersService.findOne(user.username);
        if (data) {
            const aa = await validatePassword(user.password, data.password)
            if (user && aa) {
                const { ...result }: any = data;
                const { password, ...ss } = result['_doc']
                return await this.login(ss)
            } else {
                return Promise.reject('Authentication failed')
            }

        } else {
            this.logger.error({
                ok: false,
                message: 'no hay usuario'
            })
            return Promise.reject('Authentication failed')
            // throw new Error()
        }
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign(user),
            data: user
        };
    }
    async validateEth(wallet) {
        const data = await this.usersService.findOneWallet(wallet);
        if (data) {
            const { ...result }: any = data;
            const { password, ...ss } = result['_doc']
            return await this.login(ss)

        } else {
            this.logger.error({ code: 339, message: 'usuario no registrado' })
            throw new HttpException({ code: 339, message: 'usuario no registrado' }, 401)
        }

    }
    async deleteseccion(from) {
        this.logger.warn('hay que hacer la desconecion')
        // this._eth.socketTransaccion.forEach((e) => {
        //     if (
        //         e.from === from
        //     ) {
        //         e.ss.unsubscribe(function (error, success) {
        //             if (success) {
        //                 console.log(success)
        //                 this._eth.socketTransaccion = this._eth.socketTransaccion.filter((i) => i.from !== from); // filtramos
        //                 console.log(this._eth.socketTransaccion.length)
        //                 return Promise.resolve('eliminar session')
        //             }
        //         });
        //     }

        // })
    }
}
