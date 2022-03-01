import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { fnGenerar, GeneratePassword, TreeList } from '@utils/index';
import { MessageResponse } from '@interfaces/httpResponse';
import { User } from '@routes/user/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly _user: Model<User>) { }
  async list(): Promise<MessageResponse> {
    try {
      const data = await this._user.find().populate("");
      return { ok: true, data };
    } catch (error) {
      return { ok: false, message: error };
    }
  }
  async idAdmin(): Promise<any> {
    const user = await this._user.findOne({ role: "EMPRESA" });
    return user?._id;
  }

  async save(user: User) {
    const password = await GeneratePassword(
      user.password,
      user.password_compare
    );
    //TODO: CAS-42 tener en cuenta que el usuario debe tener un rol y un z
    const User: User = {
      username: user.username,
      email: user.email,
      password,
      lastname: user.lastname,
      estado: user.estado,
      name: user.name,
      role: await this.getRoll(),
    };
    return await this._user.create(User);

  }
  async Patrocinador(id: any) {
    if (id === undefined) {
      return await this.idAdmin();
    } else {
      return id === "nuevo" ? await this.idAdmin() : id;
    }
  }
  async edit(): Promise<MessageResponse> {
    return { ok: true };
  }
  async MyData(data: User): Promise<MessageResponse> {
    return {
      ok: true,
    };
  }
  async MyInfo(id: any): Promise<MessageResponse> {
    const user = await this._user.find().countDocuments();
    if (user === 0) {
      return { ok: false, data: { MyID: "init", _id: null } };
    } else {
      if (id === "nuevo") {
        return {
          ok: true,
          data: { MyID: "init", _id: await this.idAdmin() },
        };
      } else {
        const aa = await this._user.findById({ _id: id });
        return {
          ok: true,
          data: aa,
        };
      }
    }
  }
  async InfoForUser(id: any): Promise<MessageResponse> {
    const _id = id !== "nuevo" ? id : null;
    const user = await this._user.findOne({ _id }).countDocuments();
    if (user !== 0) {
      const data = await this._user.findOne({ _id }, "username");
      return { ok: true, data };
    } else {
      const data = await this._user.findOne(
        { _id: await this.idAdmin() },
        "username"
      );
      return { ok: true, data };
    }
  }
  async miRama(MyID: any) {
    const UserPo = await this._user.find({
      MyID: { $regex: `${MyID}.*`, $options: "$i" },
    });

    const data = JSON.parse(JSON.stringify(UserPo));

    const nuevo = TreeList({
      data,
      idKey: "MyID",
      parentKey: "PadreID",
      childrenKey: "children",
    });
    return nuevo;
  }
  //traer todos los usuarios con sus saldo consultar una blockchain para hacer esto 
  async miRamaNoTreeList(MyID: any): Promise<MessageResponse> {
    const data = await this._user.find(
      {
        MyID: { $regex: `${MyID}.*`, $options: "$i" },
      },
      "nombre apellidos pais celular patrocinador username email MyID"
    ).populate({
      path: "pais",
      select: "name iso2 phone_code",
    });
    const a2 = JSON.parse(JSON.stringify(data));
    const newData = a2.filter((resp: any) => {
      // resp.saldo = chainModel.getBalanceOfAddress(resp._id);
      const patro = a2.filter(
        (resp11: any) => resp11._id === resp.patrocinador
      );
      resp.patrocinador = patro[0];
      return resp;
    });
    return {
      ok: true,
      data: newData,
    };
  }
  async MisDirectos(id: string) {
    const data = await this._user.find(
      {
        patrocinador: id,
      },
      "nombre apellidos pais celular patrocinador username email MyID"
    ).populate({
      path: "pais",
      select: "name iso2 phone_code",
    });
    return {
      ok: true,
      data,
    };
  }
  // async ValidarUsuario(id: any) {
  //   const data = await this._user.findOne(
  //     {
  //       address_wallet: id,
  //     },
  //     "username email MyID PadreID nombre apellidos celular role estado pais btcRelaciones"
  //   );
  //   if (data) {
  //     // const token_hash = GenerateToken(data);
  //     // this.saveTokenAcce(data?._id, token_hash);
  //     // const token = new Buffer(
  //       // JSON.stringify({ id: data._id, token: encriptToken(token_hash) })
  //     // );
  //     return {
  //       token: token.toString("base64"),
  //       menu: this.listMenuRol(data.role),
  //     };
  //   } else {
  //     return false;
  //   }
  // }
  async getRoll(): Promise<string> {
    const cont = await this._user.findOne({ role: "EMPRESA" }).countDocuments();
    if (cont === 0) {
      return "EMPRESA";
    } else {
      return "USUARIO";
    }
  }
  async findOne(username: string): Promise<User | undefined> {
    return await this._user.findOne({ username }, 'username email MyID PadreID password nombre apellidos celular role estado patrocinador pais btcRelaciones');
  }
  async findOneWallet(address_wallet: string): Promise<User | undefined> {
    return await this._user.findOne({ address_wallet }, 'username email MyID PadreID password nombre apellidos celular role estado patrocinador pais btcRelaciones');
  }
}
