import { MessageResponse } from '@interfaces/httpResponse';
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { __Service } from './__.service';
@ApiBearerAuth()
@ApiTags('sample')
@Controller('sample')
export class __Controller {
    constructor(private readonly _service: __Service) { }
    @Get()
    async get(): Promise<MessageResponse> {
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
    async post(@Body() body: any): Promise<MessageResponse> {
        try {
            const data = await this._service.post(body)
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)
        }
    }
    @Put('/:key')
    async update(@Body() body: any, @Param() param: any): Promise<MessageResponse> {
        try {
            const data = await this._service.update(param.key, body)
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)
        }
    }
    @Delete('/:key')
    async delete(@Param() param: any): Promise<MessageResponse> {
        try {
            const data = await this._service.delete(param.key)
            return {
                ok: true,
                data
            }
        } catch (e) {
            throw new HttpException(e, 400)
        }
    }
}
