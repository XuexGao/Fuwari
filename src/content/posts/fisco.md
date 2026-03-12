---
title: FISCO+WeBase 私有区块链基建
published: 2026-03-11T17:23:10
description: 区块链比赛内部文档
image: ../assets/images/fisco.png
draft: false
lang: ""
---
> [!TIP]
> GIthub镜像：
> ```bash
> https://gh.072103.xyz/
> ```
> 
> 配置系统代理：
> ```bash
> export http_proxy="http://192.168.124.7:10808"
> export https_proxy="http://192.168.124.7:10808"
> export socks_proxy="http://192.168.124.7:10808"
> ```

# 参考文献

https://fisco-bcos-documentation.readthedocs.io/

# 前置

基底Linux： https://releases.ubuntu.com/releases/20.04/

更改APT源为中科大源
```bash
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list
```

安装依赖
```bash
sudo apt install -y openssl curl wget sudo nano unzip
```

# FISCO-BCOS

创建操作目录
```bash
cd && mkdir -p fisco && cd fisco
```


下载脚本
```bash\
curl -LO https://github.com/FISCO-BCOS/FISCO-BCOS/releases/download/v2.11.0/build_chain.sh && chmod u+x build_chain.sh
```

生成节点配置（1群组4节点）
```bash
bash build_chain.sh -l 127.0.0.1:4 -p 30300,20200,8545
```

- -l：`:` 前为节点IP，后为节点数量
- -p：指定起始端口，分别是 `p2p_port` , `channel_port` , `jsonrpc_port` 

启动所有节点

```bash
bash nodes/127.0.0.1/start_all.sh
```

检查进程是否启动。应该有4个进程输出

```bash
ps -ef | grep fisco-bcos
```

查看节点 `node0` 心跳。应该会不断输出信息

```bash
tail -f nodes/127.0.0.1/node0/log/log* | grep connected
```

查看节点 `node0` 是否共识。应该输出带有 `++++Generating seal` 的日志

```bash
tail -f nodes/127.0.0.1/node0/log/log*  | grep +++
```

# 安装Java（8-11）

卸载曾经安装的高版本Java（如果有）
```bash
apt remove default-jdk
```

进入一个干净的目录
```bash
cd
```

下载OpenJDK 11
```bash
wget https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz
```

解压JDK

```bash
tar -xzvf openjdk-11.0.2_linux-x64_bin.tar.gz
```

清理压缩包
```bash
rm -rf openjdk-11.0.2_linux-x64_bin.tar.gz
```

重命名JDK
```bash
mv jdk-11.0.2 jdk11
```

设置环境变量

```bash
nano /etc/profile
```

```bash
export JAVA_HOME=/root/jdk11
export PATH=$JAVA_HOME/bin:$PATH
```

重载当前终端以读取新的环境变量

```bash
source /etc/profile
```

# FISCO Console

下载控制台文件

```bash
cd ~/fisco && curl -LO https://github.com/FISCO-BCOS/console/releases/download/v2.9.2/download_console.sh && bash download_console.sh
```

将示例配置文件转换为生产配置文件。若节点未采用默认端口，请将文件中的20200替换成节点对应的channel端口。
```bash
cp -n console/conf/config-example.toml console/conf/config.toml
```

将节点证书导入控制台
```bash
cp -r nodes/127.0.0.1/sdk/* console/conf/
```

启动控制台
```bash
cd ~/fisco/console && bash start.sh
```

退出
```bash
quit
```

# 部署智能合约

默认会自带一个 `contracts/solidity/HelloWorld.sol` 合约

在控制台中部署它
```bash
deploy HelloWorld
```

```sql
[group:1]> deploy HelloWorld
transaction hash: 0xa61bca19f2f430b25a360ae2e9d81a0eeb00e4d1f29b9d26ff3c80c4eaa75417
contract address: 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8
currentAccount: 0x7cd4ac523fd64e08d9d1c4821f855c349c84e546
```

查看当前块高
```bash
getBlockNumber
```

```sql
[group:1]> getBlockNumber
1
```

调用 `get` 接口获取 `name` 变量，此处的合约地址是deploy指令返回的 `contract addresss` 地址

```sql
call HelloWorld 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8 get
```

```sql
[group:1]> call HelloWorld 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8 get
---------------------------------------------------------------------------------------------
Return code: 0
description: transaction executed successfully
Return message: Success
---------------------------------------------------------------------------------------------
Return value size:1
Return types: (STRING)
Return values:(Hello, World!)
---------------------------------------------------------------------------------------------

```

调用 `set` 接口 **设置** `name` 变量
```sql
call HelloWorld 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8 set "Hello, FISCO"
```

```sql
[group:1]> call HelloWorld 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8 set "Hello, FISCO"
transaction hash: 0x20c6f22caa280860848891b975451f9af47405f7b3dbef61da05bf0321803842
---------------------------------------------------------------------------------------------
transaction status: 0x0
description: transaction executed successfully
---------------------------------------------------------------------------------------------
Transaction inputs:
Input value size:1
Input types: (STRING)
Input values:(Hello, FISCO)
---------------------------------------------------------------------------------------------
Receipt message: Success
Return message: Success
Return values:[]
---------------------------------------------------------------------------------------------
Event logs
Event: {}
```

查看当前块高，由于 **写链** 了，块高度应当加一
```sql
[group:1]> getBlockNumber
2
```

再次调用 `get` 接口获取 `name` 变量，应当已变更
```sql
[group:1]> call HelloWorld 0xc91ffa536bfba03a4c06a435f54366e7dcb01db8 get
---------------------------------------------------------------------------------------------
Return code: 0
description: transaction executed successfully
Return message: Success
---------------------------------------------------------------------------------------------
Return value size:1
Return types: (STRING)
Return values:(Hello, FISCO)
---------------------------------------------------------------------------------------------
```


# 安装MariaDB（MySQL）

```bash
apt install mariadb-server
```

测试是否能进入MySQL CLI
```bash
mysql -uroot -p123456
```

退出
```bash
exit
```

# 配置数据库
创建webase用户
```sql
GRANT ALL PRIVILEGES ON *.* TO 'webase'@localhost IDENTIFIED BY '123456' WITH GRANT OPTION;
```

让webase用户可以访问所有数据库
```sql
GRANT ALL PRIVILEGES ON *.* TO 'webase'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

# 配置Python3

安装UV
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

重载环境变量
```bash
source ~/.bashrc
```

安装Python3.8
```bash
uv python install 3.8
```

创建虚拟环境
```bash
uv venv
```

安装PyMySQL
```bash
uv pip install PyMySQL
```
# WeBASE WebUI 部署

进入干净目录
```bash
cd ~/fisco
```

拉取部署脚本
```bash
wget https://github.com/WeBankBlockchain/WeBASELargeFiles/releases/download/v1.5.5/webase-deploy.zip
```

解压安装包
```bash
unzip webase-deploy.zip
```

删除压缩包
```bash
rm webase-deploy.zip
```

进入目录
```bash
cd webase-deploy
```

配置配置文件。更改 `mysql.user` `mysql.password` `sign.mysql.user` `sign.mysql.password` 。其中user为 `root` ，password为 `123456`
```bash
nano common.properties
```

安装
```bash
uv run deploy.py installAll
```

启动
```bash
uv run deploy.py startAll
```

查看WebUI，端口 5000
![](../assets/images/fisco-1.png)