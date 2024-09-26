# Starknet Devnet

## 简单上手
安装：
```
cargo install starknet-devnet
```

运行节点：
```
starknet-devnet
```

环境变量
```
SEED=10 starknet-devnet
```

从文件加载配置
```
source .my-env-file && starknet-devnet
```

RPC 调用(获取账户余额)：
```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "devnet_getAccountBalance",
    "params": {
        "address": "<address>",
        "unit": "WEI",
        "block_tag": "latest"
    }
}' http://127.0.0.1:5050/
```

## 参考
- [Starknet Devnet 官方文档](https://0xspaceshard.github.io/starknet-devnet-rs/docs/intro)