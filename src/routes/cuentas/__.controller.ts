import { MessageResponse } from '@interfaces/httpResponse';
import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Accounts } from './__.schema';
import { AccountService } from './__.service';
@ApiBearerAuth()
@ApiTags('account')
@Controller('account')
export class __Controller {
    constructor(private readonly _service: AccountService) { }
    @Get()
    async getPaise(): Promise<MessageResponse> {
        try {
            const data = await this._service._List()
            return {
                ok: true,
                data
            }

        } catch (e) {
            throw new HttpException(e, 400)

        }
    }
    @Get('/details')
    async getonDetails(): Promise<MessageResponse> {
        try {
            const data = await this._service.onDetails()
            return {
                ok: true,
                data
            }

        } catch (e) {
            throw new HttpException(e, 400)

        }
    }
    @Post()
    async addAcounts(@Body() body: Accounts): Promise<MessageResponse> {
        try {
            return {
                ok: true,
                data: await this._service.addAcounts(body)
            }
        } catch (e) {
            throw new HttpException(e, 400)

        }
    }
    @Put('/:key')
    async editAcounts(@Body() body: any, @Param() parms: any): Promise<MessageResponse> {
        try {
            const data = await this._service.update(body, parms.key)
            return {
                ok: true,
                data
            }

        } catch (e) {
            throw new HttpException(e, 400)
        }
    }
    @Get('/balance/all')
    async getAllbalance() {
        try {
            const data = await this._service.allBalance()
            return {
                ok: true,
                data
            }

        } catch (e) {

            throw new HttpException(e, 400)

        }

    }
}
