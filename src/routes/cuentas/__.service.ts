import { MessageResponse } from '@interfaces/httpResponse';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountingService } from '@routes/accounting/accounting.service';
import { Model } from 'mongoose';
import { Accounts } from './__.schema';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Accounts.name) private readonly _schema: Model<Accounts>,
        @Inject(forwardRef(() => AccountingService))
        private readonly _balance: AccountingService
    ) { }
    async _List(): Promise<any> {
        return await this._schema.find();
    }

    async onDetails() {
        return JSON.parse(JSON.stringify(await this._schema.find().populate('refDetails').sort({ _id: -1 })));
    }
    async addAcounts(data: any) {
        return await this._schema.create(data)
    }
    async update(data: any, id) {
        console.log('xxxxxxxxxxxxxxxxxxxx', data)
        return await this._schema.updateOne(
            { _id: id },
            {
                $set: data,

            },
        );

    }
    async allBalance() {
        const aa = await this.onDetails()
        let balance = []
        let totalBalance = 0
        for (let i = 0; i < aa.length; i++) {
            const cuenta = aa[i];
            for (let ref = 0; ref < cuenta.refDetails.length; ref++) {
                const pro = cuenta.refDetails[ref]
                const zBa = await this._balance.calculateBalance(cuenta._id, pro._id)
                totalBalance += zBa
                balance.push({
                    cuenta: cuenta.name,
                    wallet: pro.name,
                    balance: zBa
                })
            }
        }
        return {
            total: totalBalance,
            cuenta: balance
        } 

    }

}

