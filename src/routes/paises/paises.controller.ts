import { MessageResponse } from '@interfaces/httpResponse';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaisesService } from 'src/service/paises.service';
@ApiBearerAuth()
@ApiTags('country')
@Controller('country')
export class PaisesController {
    constructor(private readonly _service: PaisesService) { }
    @Get()
    async getPaise(): Promise<MessageResponse> {
        return await this._service.ListPaises()
    }
}
