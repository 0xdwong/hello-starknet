require('dotenv').config();
const { ec, stark, hash, CallData, Account, RpcProvider, constants, getChecksumAddress } = require('starknet');


async function createArgentAccount() {
    let privateKey = stark.randomAddress();

    const publicKey = ec.starkCurve.getStarkKey(privateKey);

    const constructorCallData = _constructArgentXAccountData(publicKey);

    const accountClassHash = process.env.ArgentXAccountClassHash;

    // calculate address
    const contractAddress = getChecksumAddress(hash.calculateContractAddressFromHash(
        publicKey,
        accountClassHash,
        constructorCallData,
        0
    ));

    console.log('privateKey=', privateKey);
    console.log('publicKey=', publicKey);
    console.log('address=', contractAddress);

    // deploy
    const nodeUrl = process.env.PROVIDER_URL || constants.NetworkName.SN_SEPOLIA;
    const provider = new RpcProvider({ nodeUrl });
    const account = new Account(provider, contractAddress, privateKey);

    const payload = {
        'classHash': accountClassHash,
        'constructorCalldata': constructorCallData,
        'contractAddress': contractAddress,
        'addressSalt': publicKey,
    };

    const { transaction_hash, contract_address } = await account.deployAccount(payload);
    console.log('✅ wallet deployed at:', contract_address);
    console.log('deploy transaction hash:', transaction_hash);
}

function _constructArgentXAccountData(publicKey) {
    const constructorCallData = CallData.compile({
        owner: publicKey,
        guardian: '0',
    });

    return constructorCallData;
}

async function main() {
    await createArgentAccount();
}

main();