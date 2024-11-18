require('dotenv').config();
const { ec, stark, hash, CallData, Account, RpcProvider, constants, getChecksumAddress, EthSigner } = require('starknet');
const { ArgentXAccountClassHash, OZAccountClassHash } = require('./constants');


async function createArgentAccount(privateKey, deploy = false) {
    if (!privateKey) stark.randomAddress();

    const type = 'argent';

    return await _createAccount(privateKey, type, deploy);
}

async function createOZAccount(privateKey, deploy = false) {
    if (!privateKey) stark.randomAddress();

    const type = 'oz';

    return await _createAccount(privateKey, type, deploy);
}

async function _createAccount(privateKey, type, deploy = false) {
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
    if (deploy) {
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
        console.log('✅ wallet deployed at:', getChecksumAddress(contract_address));
        console.log('deploy transaction hash:', transaction_hash);
    }
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

// async function createEthAccount(privateKey,deploy=false) {
//     const ethSigner = new EthSigner(privateKey);
//     const ethFullPublicKey = await ethSigner.getPubKey();

//     // 将公钥转换为 felt 范围内的值
//     const publicKeyFelt = BigInt(ethFullPublicKey) & ((1n << 251n) - 1n);

//     const accountClassHash = '0x23e416842ca96b1f7067693892ed00881d97a4b0d9a4c793b75cb887944d98d';

//     const ethAccountAbi = [
//         {
//             "name": "constructor",
//             "type": "constructor",
//             "inputs": [
//                 {
//                     "name": "public_key",
//                     "type": "felt"
//                 }
//             ]
//         }
//     ];

//     const myCallData = new CallData(ethAccountAbi);

//     const accountETHconstructorCalldata = myCallData.compile('constructor', {
//         public_key: publicKeyFelt.toString(), // 使用处理后的公钥
//     });

//     const salt = publicKeyFelt.toString();
//     const contractAddress = hash.calculateContractAddressFromHash(
//         salt,
//         accountClassHash,
//         accountETHconstructorCalldata,
//         0
//     );

//     console.log('Pre-calculated ETH account address =', contractAddress);

//     if (deploy) {
//         const nodeUrl = process.env.PROVIDER_URL || constants.NetworkName.SN_SEPOLIA;
//         const provider = new RpcProvider({ nodeUrl });

//         const ethAccount = new Account(provider, contractAddress, ethSigner);
//         const deployPayload = {
//             classHash: accountClassHash,
//             constructorCalldata: accountETHconstructorCalldata,
//             addressSalt: salt,
//         };

//         const { suggestedMaxFee: feeDeploy } = await ethAccount.estimateAccountDeployFee(deployPayload);
//         console.log('Estimated fee:', feeDeploy.toString());

//         const maxFee = stark.estimatedFeeToMaxFee(feeDeploy, 100);
//         console.log('Max fee:', maxFee.toString());

//         const { transaction_hash, contract_address } = await ethAccount.deployAccount(
//             deployPayload,
//             { maxFee }
//         );

//         await provider.waitForTransaction(transaction_hash);
//         console.log('✅ New Ethereum account final address =', getChecksumAddress(contract_address));
//     }
// }