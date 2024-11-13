const { getTokenBalance } = require('./token');
const { ETH_ADDRESS, STARK_ADDRESS } = require('./constants');


async function main() {
    // 使用示例
    const owner = "0x4ce01b681d23ae848817139a18328f125e0141b0885974d441f03ae186ca43"; // 替换为要查询的地址
    const token = ETH_ADDRESS;

    const result = await getTokenBalance(owner, token);
    console.log(result);
}


main();