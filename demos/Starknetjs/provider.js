require('dotenv').config();
const { RpcProvider, constants } = require('starknet');

const nodeUrl = process.env.PROVIDER_URL || constants.NetworkName.SN_SEPOLIA;

const provider = new RpcProvider({ nodeUrl });

module.exports = { provider }