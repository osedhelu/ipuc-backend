import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarteraController } from './carteras.controller';
import { cartera, CarteraSchema } from './carteras.schema';
import { CarteraService } from './carteras.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: cartera.name, useFactory: () => {
        const schema = CarteraSchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }])
  ],
  controllers: [CarteraController],
  providers: [CarteraService]
})
export class CarteraModule { }
