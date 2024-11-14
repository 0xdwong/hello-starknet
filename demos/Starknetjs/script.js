const { getTokenBalance } = require('./token');
const { ETH_ADDRESS, STARK_ADDRESS } = require('./constants');

const address = require('./address');


async function gettokenBalance() {
    const owner = "0x4ce01b681d23ae848817139a18328f125e0141b0885974d441f03ae186ca43"; // 替换为要查询的地址

    const token = ETH_ADDRESS;

    return await getTokenBalance(owner, token);
}

function getChecksumAddress() {
    const address = '0x4ce01b681d23ae848817139a18328f125e0141b0885974d441f03ae186ca43';

    // 0x004CE01b681d23Ae848817139a18328f125E0141B0885974d441F03AE186ca43
    return address.getChecksumAddress(address);
}

async function main() {
    let result;

    // result = await gettokenBalance();

    result = getChecksumAddress();


    console.log(result);
}


main();