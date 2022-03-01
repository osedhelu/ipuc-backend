import { MessageResponse } from '@interfaces/httpResponse';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Paisjson } from '@utils/paises.list';
import { Model, Types } from 'mongoose';
import { cartera } from './carteras.schema';

@Injectable()
export class CarteraService {
    constructor(@InjectModel(cartera.name) private readonly _schema: Model<cartera>) { }
    async get(): Promise<any> {
        return await this._schema.find();
    }


    async add(data: any) {
        return await this._schema.create(data)
    }
    async update(data: any, id) {
        return await this._schema.updateOne(
            { _id: id },
            {
                $set: data,

            },
        );

    }
    async delete(id: any) {
        return await this._schema.remove(
            { _id: id },
        );

    }
}

