const hash = "as;sdfww92bfhbasdfbbsahdf";
const crypto = require("crypto");
export const generatechainToken = (data: any) => {
    const keys = Object.keys(data);
    let seed = "";
    keys.forEach((resp) => {
        seed += data[resp];
    });
    return crypto.createHmac("sha256", hash).update(seed).digest("hex");
};
export const validateChainToken = (token: string, data: any) =>
    generatechainToken(data) === token;



// import * as jwt from "jsonwebtoken";
// // import { LoginModel } from "models/index";
// // import { r } from "./response.utils";
// // import { _console } from "./winston.utils";
// // const LoginMod = new LoginModel();
// import { eth_verify } from "./eth-validate.utils";
// const SEED_TOKEN =
//     process.env.SEED_TOKEN || "ScodicsUdyasOcOjIbErjIcNawshichMadOpcupmiact";
// export const GenerateToken = (data: any) => {
//     return jwt.sign(
//         {
//             data,
//         },
//         SEED_TOKEN,
//         {
//             expiresIn: 10080,
//         }
//     );
// };
// export const middlewareJWT = async (req: any, res: any, next: any) => {
//     try {
//         const hash = req.headers.authorization;
//         const token1 = hash.split(" ")[1];
//         const b = new Buffer(token1, "base64");
//         const { token, id } = JSON.parse(b.toString());
//         const enToken: any = await LoginMod.validarToken(id, token);
//         return jwt.verify(enToken, SEED_TOKEN, (err: any, resp: any) => {
//             if (resp !== undefined) {
//                 const { data } = resp;

//                 if (err) {
//                     return r._401(res, err);
//                 } else {
//                     req.my_data = data;
//                     next();
//                 }
//             } else {
//                 return r._401(res, "unauthorized");
//             }
//         });
//     } catch (err) {
//         return r._400(res, "you need a token");
//     }
// };
// export const web3Token = async (req: any, res: any, next: any) => {
//     try {
//         const hash = req.headers.jwtweb3;
//         hash.split(" ")[0]
//         const token1 = hash.split(" ")[1];
//         req.eth = eth_verify(token1);
//         next();
//     } catch (err) {
//         r._400(res, err);
//     }
// };
// export const ValidateToken = async (cadenatoken: any): Promise<any> => {
//     const b = new Buffer(cadenatoken, "base64");
//     const { token, id } = JSON.parse(b.toString());
//     const enToken: any = await LoginMod.validarToken(id, token);
//     if (enToken) {
//         return jwt.verify(enToken, SEED_TOKEN);
//     }
// };
