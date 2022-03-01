import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaisesService } from 'src/service/paises.service';
import { PaisesController } from './paises.controller';
import { country, countrySchema } from './paises.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: country.name, useFactory: () => {
        const schema = countrySchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }])
  ],
  controllers: [PaisesController],
  providers: [PaisesService]
})
export class PaisesModule { }
