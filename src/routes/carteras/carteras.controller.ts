import { MessageResponse } from '@interfaces/httpResponse';
import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { cartera } from './carteras.schema';
import { CarteraService } from './carteras.service';
@ApiBearerAuth()
@ApiTags('carteras')
@Controller('carteras')
export class CarteraController {
    constructor(private readonly _service: CarteraService) { }
    @Get()
    async getPaise(): Promise<MessageResponse> {
        try {

            const data = await this._service.get()
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)
        }
    }
    @Post()
    async addDetils(@Body() body: cartera) {
        try {
            const data = await this._service.add(body)
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)

        }


    }
    @Put('/:key')
    async update(@Body() body: any, @Param() param: any) {
        try {
            const data = await this._service.update(body, param.key)
            throw new HttpException(data, 201)
        } catch (e) {
            throw new HttpException(e, 201)
        }

    }
}
