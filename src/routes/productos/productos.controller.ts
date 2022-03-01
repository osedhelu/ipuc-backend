import { MessageResponse } from '@interfaces/httpResponse';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductosController {
    constructor(private readonly _service: ProductService) { }
    @Get()
    async getPaise(): Promise<MessageResponse> {
        return await this._service.ListPaises()
    }
}
