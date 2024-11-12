# Starkli


## 账户
1. 创建密钥库文件，初始化 signer
    ```
    starkli signer keystore from-key keyfile.json
    ```
    提示输入私钥和密码，会生成一个加密后私钥文件（ keyfile.json）


2. 初始化账户
    ```
    starkli account oz init account.json --keystore keyfile.json 
    ```
    使用  OpenZeppelin 类初始化账户，生成账户描述符文件（account.json）

    也可以使用 argent/braavos 类型账户，eg：starkli account argent init ...


3. 部署账户合约
    ```
    starkli account deploy --keystore keyfile.json account.json --rpc <RPC URL> 
    ```
    把合约部署到链上。上一步初始化时会计算出账户合约地址，需向该地址发送足够的 ETH/Stark 用以支付 gas


4. 对于已经部署的合约账户，可以直接获取账户描述符
    ```
    starkli account fetch <account address> --output account.json --rpc <RPC URL> 
    ```