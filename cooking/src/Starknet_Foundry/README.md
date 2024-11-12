# Starknet Foundry



## sncast
- 申明合约
```
sncast \
    --account ./account.json \
    --keystore ./keyfile.json \
    declare \
    --url  https://starknet-sepolia.public.blastapi.io/rpc/v0_7 \
    --fee-token eth \
    --contract-name <contract name>
```

部署合约
```
sncast \
    --account ./account.json \
    --keystore ./keyfile.json \
    deploy \
    --url  https://starknet-sepolia.public.blastapi.io/rpc/v0_7 \
    --fee-token eth \
    --class-hash <contract class-hash>
```