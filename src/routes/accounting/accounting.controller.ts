import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { enumStatus, walletType } from '@interfaces/balance';
import { MessageResponse } from '@interfaces/httpResponse';
import { Body, Controller, Delete, Get, HttpException, Logger, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
class dtInfoBalance {
    @ApiProperty({ default: null, required: false })
    wallet: walletType;
    @ApiProperty({ default: null, required: false })
    cuenta: string
}
let logger = new Logger('accounting')
class iAccountant {
    @ApiProperty({ default: '' })
    to: string;
    @ApiProperty({ default: 300 })
    amount: number;
    @ApiProperty({ default: 'BTC10004' })
    btcRef: string;
    @ApiProperty({ default: walletType.DISPONIBLE })
    wallet: walletType
    @ApiProperty({ default: '' })
    fecha: Date
}
class iTransacion {
    @ApiProperty({ default: '' })
    from: string;
    @ApiProperty({ default: 300 })
    amount: number;
    @ApiProperty({ default: walletType.DISPONIBLE })
    toWallet: walletType;
    @ApiProperty({ default: walletType.DISPONIBLE })
    fromWallet: walletType
}


@ApiBearerAuth()
@ApiTags('transaccion')
@Controller('transaccion')
export class __Controller {
    constructor(private readonly _service: AccountingService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getBalanceUser(@Request() req: any): Promise<MessageResponse> {
        try {
            const data = await this._service.AllBalance()
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addBalance(@Body() data: iAccountant) {
        try {
            const info = await this._service.addBalance({
                amount: data.amount,
                id: data.to,
                status: enumStatus.complete,
                wallet: data.wallet,
                btcRef: data.btcRef,
                fecha: data.fecha
            })
            return {
                ok: true,
                data: info
            }

        } catch (e) {
            logger.error(e)
            throw new HttpException(e, 400)
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post('/transfer')
    async emitTransaccion(@Body() data: iTransacion, @Request() req: any) {
        try {
            const info = this._service.createTransaction({
                amount: data.amount,
                from: data.from,
                to: req.user._id,
                fromWallet: data.fromWallet,
                toWallet: data.toWallet,
                origin: '',
                ref: ''
            })

            return {
                ok: true,
                data: info
            }
        } catch (e) {
            logger.error(e)
            throw new HttpException(e, 400)
        }

    }
    // @UseGuards(JwtAuthGuard)
    // @Post('/retiro')
    // async Retirar(@Request() req: any) {
    //     try {
    //         return await this._service.pagarSaldo(req.user)
    //     } catch (e) {
    //         logger.error(e)
    //         throw new HttpException(e, 400)
    //     }

    // }
    @UseGuards(JwtAuthGuard)
    @Post('/infoBalance')
    async GetInfoBalance(@Request() req: any, @Body() body: dtInfoBalance) {
        try {
            return { ok: true, data: await this._service.getCuentaT({ cuenta: body.cuenta, w: body.wallet }) }
        } catch (e) {

            logger.error(e)
            throw new HttpException(e, 400)
        }

    }
}
