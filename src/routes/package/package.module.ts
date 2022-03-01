import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { ServiceModule } from 'src/service/service.module';
import { PackageService } from 'src/service/package.service';

@Module({
    imports: [ServiceModule],
    controllers: [PackageController],
    providers: [PackageService],
    exports: [PackageService]
})
export class PackageModule { }
