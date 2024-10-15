require('dotenv').config();
const { RpcProvider, constants, Account, EthSigner } = require('starknet');

const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
// const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
// // or
// const provider = new RpcProvider(); // Sepolia


async function main() {
    const resp = await provider.getSpecVersion();
    // console.log('rpc version =', resp);

    const privateKey = process.env.PRIVATE_KEY;
    const accountAddress = process.env.ACCOUNT_ADDRESS;

    const account = new Account(provider, accountAddress, privateKey);
    // console.log('====account====', account);

    const myEthSigner = new EthSigner(privateKey);
    const myEthAccount = new Account(provider, accountAddress, myEthSigner);
    console.log('====myEthAccount====', myEthAccount);

}

main().then(() => {
    process.exit(0);
}).catch((err) => {
    console.error(err)
})