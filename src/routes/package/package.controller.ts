import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PackageService } from 'src/service/package.service';

@Controller('package')
@ApiBearerAuth()
@ApiTags('package')
export class PackageController {
    constructor(private readonly _service: PackageService) { }
    @Get()
    getPackage() {
        return this._service.getPackages()
    }
}
