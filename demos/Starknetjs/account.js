require('dotenv').config();
const { ec, stark, hash, CallData, Account, RpcProvider, constants, getChecksumAddress } = require('starknet');
const { ArgentXAccountClassHash, OZAccountClassHash } = require('./constants');



async function createArgentAccount() {
    let privateKey = stark.randomAddress();
    privateKey = process.env.PRIVATE_KEY

    const type = 'argent';

    return await _createAccount(privateKey, type);
}

async function createOZAccount() {
    let privateKey = stark.randomAddress();
    privateKey = process.env.PRIVATE_KEY

    const type = 'oz';

    return await _createAccount(privateKey, type);
}

async function _createAccount(privateKey, type) {
    const publicKey = ec.starkCurve.getStarkKey(privateKey);

    const constructorCallData = _getConstructorCalldata(publicKey, type);
    if (!constructorCallData) {
        console.log('not supported type');
        return;
    }

    const accountClassHash = _accountClassHash(type);
    if (!constructorCallData) {
        console.log('not account hash');
        return;
    }

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
    // const nodeUrl = process.env.PROVIDER_URL || constants.NetworkName.SN_SEPOLIA;
    // const provider = new RpcProvider({ nodeUrl });
    // const account = new Account(provider, contractAddress, privateKey);

    // const payload = {
    //     'classHash': accountClassHash,
    //     'constructorCalldata': constructorCallData,
    //     'contractAddress': contractAddress,
    //     'addressSalt': publicKey,
    // };

    // const { transaction_hash, contract_address } = await account.deployAccount(payload);
    // console.log('✅ wallet deployed at:', contract_address);
    // console.log('deploy transaction hash:', transaction_hash);
}

function _accountClassHash(type) {
    let classHash;
    switch (type) {
        case 'argent':
            classHash = ArgentXAccountClassHash;
            break;
        case 'oz':
            classHash = OZAccountClassHash;
            break;
        default:
            break;
    }

    return classHash;
}


function _getConstructorCalldata(publicKey, type) {
    let constructorCalldata;
    switch (type) {
        case 'argent':
            constructorCalldata = _constructArgentXAccountData(publicKey);
            break;
        case 'oz':
            constructorCalldata = _constructOZAccountData(publicKey);
            break;
        default:
            break;
    }

    return constructorCalldata;
}

function _constructArgentXAccountData(publicKey) {
    const constructorCallData = CallData.compile({
        owner: publicKey,
        guardian: '0',
    });

    return constructorCallData;
}

function _constructOZAccountData(publicKey) {
    const constructorCallData = CallData.compile({
        publicKey: publicKey
    });

    return constructorCallData;
}

async function main() {
    await createArgentAccount();

    // await createOZAccount();
}

main();