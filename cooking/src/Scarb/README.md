# Scarb

Scarb：Cairo构建工具和包管理器


## 安装

建议通过 asdf 安装 Scarb，这是一个可以按项目管理多个语言运行时版本的 CLI 工具

asdf 安装：
```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.1
. "$HOME/.asdf/asdf.sh"
```

使用 asdf 安装 scarb：
```
asdf plugin add scarb
```

安装特定版本 scarb：
```
asdf install scarb 2.8.1
```


## 使用

使用 Scarb 创建项目：
```
scarb new hello_world
```

其它命令
```
scarb build
scarb test
scarb cairo-run
scarb fmt
```

## 配置

Scarb.toml


## 参考

- [Scarb 官方文档](https://docs.swmansion.com/scarb/docs.html)