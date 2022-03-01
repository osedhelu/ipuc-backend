import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { __Controller } from './__.controller';
import { __, __Schema } from './__.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: __.name, useFactory: () => {
        const schema = __Schema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }])
  ],
  controllers: [__Controller],
  providers: [__]
})
export class PaisesModule { }
