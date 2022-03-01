import { MessageResponse } from '@interfaces/httpResponse';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Paisjson } from '@utils/paises.list';
import { Model } from 'mongoose';
import { __ } from './__.schema';

@Injectable()
export class __Service {
    constructor(@InjectModel(__.name) private readonly _schema: Model<__>) { }
    async get(): Promise<any> {
        return await this._schema.find();
    }
    async post(data: any): Promise<any> {
        return await this._schema.create(data)
    }
    async update(key: any, data: any): Promise<any> {
        return await this._schema.updateOne(
            { _id: key },
            {
                $set: data,
            },
        );

    }
    async delete(key: any): Promise<any> {
        return await this._schema.remove(
            { _id: key }
        );

    }
}

