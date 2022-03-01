import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductosController } from './productos.controller';
import { product, ProductSchema } from './productos.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: product.name, useFactory: () => {
        const schema = ProductSchema;
        schema.plugin(require('mongoose-unique-validator'), {
          message: "{PATH} debe de ser único",
        });
        return schema
      }
    }])
  ],
  controllers: [ProductosController],
  providers: [ProductService]
})
export class PaisesModule { }
