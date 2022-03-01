import { HttpException } from "@nestjs/common";
const Base64 = require('base-64');
const EthUtil = require("ethereumjs-util");
const parseAsHeaders = require("parse-headers")
const toHex = require('to-hex')

export const eth_verify = (token: any) => {
    if (!token || !token.length) {
        throw new HttpException("Token required.", 401);
    }

    try {
        var base64_decoded = Base64.decode(token);
    } catch (error) {
        throw new HttpException("Token malformed (must be base64 encoded)", 401);
    }

    if (!base64_decoded || !base64_decoded.length) {
        throw new HttpException("Token malformed (must be base64 encoded)", 401);
    }

    try {
        var { body, signature } = JSON.parse(base64_decoded);
    } catch (error) {
    }

    if (!body || !body.length) {
        throw new HttpException("Token malformed (empty message)", 401);
    }

    if (!signature || !signature.length) {
        throw new HttpException("Token malformed (empty signature)", 401);
    }

    const msgBuffer = EthUtil.toBuffer("0x" + toHex(body));
    const msgHash = EthUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer: any = EthUtil.toBuffer(signature);
    const signatureParams = EthUtil.fromRpcSig(signatureBuffer);
    const publicKey = EthUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    );
    const addressBuffer = EthUtil.publicToAddress(publicKey);
    const address = EthUtil.bufferToHex(addressBuffer);

    const parsed_body = parseAsHeaders(body);
    const date: any = parsed_body["expire-date"];
    if (parsed_body["expire-date"] && new Date(date) < new Date()) {
        throw new HttpException("Token expired", 401);
    }

    return { address: address, body: parsed_body };
};
