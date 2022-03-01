import { iToken, Login } from '@interfaces/login.interface';
import { Controller, Post, UseGuards, Request, Body, Get, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard, JwtAuthGuard } from '@guard/index';
import { AuthService } from 'src/service/auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() data: Login) {
        try {
            console.log(`${data}`)
            return await this.authService.validateUser(data);
        } catch (e) {
            console.log(',,,,,,,,,,,,,,,,,,,,,', e)
            throw new HttpException(e, 400)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
    @Post('eth')
    validateToken(@Request() req, @Body() data: iToken) {
        return this.authService.validateEth(req.eth.address)

    }
    @Post('deleteSeccion')
    activeSocketTransaccion(@Body() data: { from: boolean }) {
        return this.authService.deleteseccion(data.from)

    }

}
