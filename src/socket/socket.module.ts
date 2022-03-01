import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { AppGateway } from './AppGateway/app.gateway';

@Module({
    imports: [ServiceModule],
    providers: [AppGateway]
})
export class SocketModule { }
