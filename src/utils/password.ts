import { compareSync, hashSync } from "bcryptjs";
// import { _console } from "./winston.utils";
export const validatePassword = async (pass1: any, hash: any): Promise<any> => {
    return compareSync(pass1, hash);
};

export const GeneratePassword = (pass1: any, pass2: any): any => {
    if (pass1.length > 6) {
        if (pass1 === pass2) {
            return hashSync(pass1, 10);
        } else {

            throw new Error('password_compare: no correcto')
        }

    } else {
        throw new Error('password: tiene que tener mas de 7')

    }
};
export const encriptToken = (token: any) => {
    const hash = hashSync(token, 10);
    return hash;
};

