const { Contract } = require('starknet');
const { provider } = require('./provider');
const { formatUnits } = require('ethers');


// ERC20 的 ABI
const ERC20_ABI = [
    {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "account", type: "felt" }],
        outputs: [{ name: "balance", type: "Uint256" }],
        stateMutability: "view"
    },
    {
        name: "decimals",
        type: "function",
        inputs: [],
        outputs: [{ name: "decimals", type: "felt" }],
        stateMutability: "view"
    }
];

async function getTokenBalance(owner, token) {
    try {
        const tokenContract = new Contract(ERC20_ABI, token, provider);

        // 并行获取余额和小数位数
        const [resp1, resp2] = await Promise.all([
            tokenContract.balanceOf(owner),
            tokenContract.decimals(),
        ]);

        const balance = resp1.balance;
        const decimals = resp2.decimals;
        return formatUnits(balance, decimals); // 转换余额为可读格式
    } catch (error) {
        console.error("获取余额失败:", error);
        throw error;
    }
}


module.exports = {
    getTokenBalance,
}