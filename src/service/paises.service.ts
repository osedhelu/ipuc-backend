import { MessageResponse } from '@interfaces/httpResponse';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { country } from '@routes/paises/paises.schema';
import { Paisjson } from '@utils/paises.list';
import { Model } from 'mongoose';

@Injectable()
export class PaisesService {
    constructor(@InjectModel(country.name) private readonly _schema: Model<country>) { }
    async ListPaises(): Promise<MessageResponse> {
        try {
            const count = await this._schema.find().countDocuments();
            if (count >= 1) {
                const paises = await this._schema.find();
                return {
                    ok: true,
                    data: paises,
                };
            } else {
                const paises = await this._schema.create(Paisjson);
                return {
                    ok: true,
                    data: paises,
                };
            }
        } catch (err) {
            return {
                ok: false,
                message: err,
            };
        }
    }
}
