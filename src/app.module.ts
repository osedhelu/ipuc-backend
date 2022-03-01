import { Module } from '@nestjs/common';
import { routesModule } from './routes/routes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket.module';
import { ServiceModule } from './service/service.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.URL_MONGO,
    ),
    routesModule,
    SocketModule,
    ServiceModule,
  ],
})
export class AppModule { }
