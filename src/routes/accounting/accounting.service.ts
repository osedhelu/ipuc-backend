import { env } from '@config/envitoment.prod';
import { enumStatus, typeDetailBalnce, walletType } from '@interfaces/balance';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generatechainToken, validateChainToken } from '@utils/token.utils';
import { Model } from 'mongoose';
import { balance } from './schemas/balance.schema';
import { _balanceD } from './schemas/balanceDetails.schema';
@Injectable()
export class AccountingService {
    constructor(@InjectModel(balance.name) private readonly _balance: Model<balance>,
        @InjectModel(_balanceD.name) private readonly _balanceDetail: Model<_balanceD>,
    ) { }
    async calculateBalance(_user: string, w: walletType): Promise<number> {
        const data = await this._balance.findOne({ user: _user, wallet: w, completed: 1 }).sort({ _id: -1 });
        if (!data) return 0;
        const { debito, credito, prevBalance, cuenta, wallet, chainToken } = data;
        if (validateChainToken(chainToken, { debito, credito, prevBalance, cuenta, wallet })) return prevBalance + debito - credito;
        return 0;
    }
    async calculateBalanceGeneral(_cu: string): Promise<number> {
        const data = await this._balance.findOne({ completed: 1 }).sort({ _id: -1 });
        if (!data) return 0;
        const { debito, credito, prevBalance, cuenta, wallet, chainToken, prevBalanceGeneral } = data;
        if (validateChainToken(chainToken, { debito, credito, prevBalance, cuenta, wallet })) return prevBalanceGeneral + debito - credito;
        return 0;
    }

    /**
     * @addBalance nos permira agregar saldo a un usuario
     * @id {string}
     * @amount {number}
     */

    async addBalance({
        id,
        amount,
        status,
        btcRef,
        wallet,
        origin,
        fecha
    }: {
        id: string;
        amount: number;
        status: enumStatus;
        wallet: any;
        fecha: Date;
        origin: string
        btcRef?: string;
    }): Promise<balance> {
        const detail = await this._balanceDetail.create({
            amount,
            to: id,
            from: "metamask",
            type: typeDetailBalnce.recarga,
            status,
        });
        const prevBalance = await this.calculateBalance(id, wallet);
        const prevBalanceGeneral = await this.calculateBalanceGeneral(id);

        const data = {
            debito: amount,
            credito: 0,
            prevBalance,
            cuenta: id,
            wallet,
        };
        return (await this._balance.create({
            ...data,
            chainToken: generatechainToken(data),
            detail: detail._id,
            btcRef: `RC#${btcRef}`,
            completed: 1,
            origin,
            fecha,
            prevBalanceGeneral
        }))
    }

    /**
     * 
     * @to usuario que recibe 
     * @from usuario que emite 
     * @returns 
     */
    async createTransaction(
        {
            from,
            to,
            amount,
            fromWallet,
            toWallet,
            origin,
            ref,
            fecha
        }: {
            from: string,
            to: any,
            amount: number,
            fromWallet: any,
            toWallet: any,
            ref: string,
            origin: string,
            fecha: Date
        }

    ): Promise<balance> {
        const detail = await this._balanceDetail.create({
            from,
            to,
            amount,
            type: typeDetailBalnce.transaccion,
            status: enumStatus.complete,
        });
        // descontar el dinero
        const prevBalanceFrom = await this.calculateBalance(from, fromWallet)
        const prevBalanceGeneralFrom = await this.calculateBalanceGeneral(from)
        console.log('xxxxxxxxxxxxxx', prevBalanceFrom)
        console.log('1111111111:', from)
        console.log('2222222222:', fromWallet)
        const balanceFrom = {
            debito: 0,
            credito: amount,
            prevBalance: prevBalanceFrom,
            cuenta: from,
            wallet: fromWallet,
        };
        await this._balance.create({
            ...balanceFrom,
            chainToken: generatechainToken(balanceFrom),
            detail: detail._id,
            completed: 1,
            origin,
            btcRef: `CE#${ref}`,
            prevBalanceGeneral: prevBalanceGeneralFrom,
            fecha
        });

        console.log()
        if (to !== 'SALIDA') {
            const prevBalanceTo = await this.calculateBalance(to, toWallet);
            const balanceTo = {
                debito: amount,
                credito: 0,
                prevBalance: prevBalanceTo,
                cuenta: to,
                wallet: toWallet,
            };
            return (await this._balance.create({
                ...balanceTo,
                chainToken: generatechainToken(balanceTo),
                completed: 1,
                detail: detail._id,
                origin,
                btcRef: `RC#${ref}`,
                prevBalanceGeneral: prevBalanceGeneralFrom - amount,
                fecha
            }));
        }

    }

    // /**
    //  * @getWallet - traer el balance de una persona
    //  * @user {string} id del usuario a consultar
    //  */
    // async getWallet(user: string) {
    //     try {
    //         return {
    //             ok: true, data: {
    //                 ahorro: await this.calculateBalance(user, walletType.AHORRO),
    //                 disponible: await this.calculateBalance(user, walletType.DISPONIBLE),
    //                 reservado: await this.calculateBalance(user, walletType.RESERVADO),
    //                 token_value: env.YAZUSDT
    //             }
    //         }
    //     }
    //     catch (e: any) {
    //         throw new HttpException(e, 400)
    //     }
    // }


    async getCuentaT({ cuenta, w }: { cuenta: string, w: any }) {
        return JSON.parse(
            JSON.stringify(
                await this._balance.find({ cuenta, wallet: w, completed: 1 })
                    .sort({ _id: 1 })
                    .populate({ path: "detail" })
                    .populate({ path: "cuenta", select: 'username', })
            )
        );



    }

    async AllBalance(): Promise<any> {
        return await this._balance.find({ completed: 1 })
            .sort({ _id: -1 })
            .populate({
                path: 'detail',
            })
            .populate({ path: "cuenta", select: 'description name' })
            .populate({
                path: "wallet", select: 'description name'
            })
    }
    getUltimosRegistros({ cuenta, w }) {
        return this._balance.find({ user: cuenta, wallet: w, completed: 1 }).sort({ $natural: -1 }).limit(1);
    }
}


