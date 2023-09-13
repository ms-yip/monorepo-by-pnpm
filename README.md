全局安装pnpm
npm install -g pnpm

目标： 
1. 组织项目架构：
根项目@monorepo/root 、 packages（子项目）包含 @monorepo/package-a 、@monorepo/package-b、@monorepo/package-c
2. package-b 引入@monorepo/package-a、@monorepo/package-c

具体步骤：
1. 根项目创建
```
  mkdir @monorepo/root
  cd monorepo
  pnpm init
```
修改package.json
```
{
  "name": "@monorepo/root",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "scripts": {
    "dev": "node index.js",
  }
}
```

添加：pnpm-workspace.yaml
```
packages:
    // packages目录下的所有子目录
    - 'packages/*'
    // components目录下的所有子目录
    - 'components/*'
    // 排除test目录下的包
    - '!**/test/**'
```
如果不使用单独文件，可以在package.json添加
"workspaces": {
    "packages": ["packages/*"]
  }

为所有包 安装依赖 
pnpm install

pnpm add react -wD // pnpm 提供了 -w, --workspace-root 参数，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。可以加上 -D 参数，表示这是一个开发依赖，会装到 pacakage.json 中的 devDependencies 中


给某个package单独安装指定依赖
--filter 参数跟着的是package下的 package.json 的 name 字段，并不是目录名。
pnpm add react --filter @monorepo/package-a(name)


模块之间相互安装依赖（指定模块）--filter
pnpm add @monorepo/package-a --filter @monorepo/package-b




当执行了pnpm publish后，会把基于的workspace的依赖变成外部依赖


一个 monorepo 往往是一个整体的项目，所以我们需要同时执行多个指令，在 pnpm 中，可以通过-C进行配置：
"start": "pnpm -C ./packages/server start:server & pnpm -C ./packages/web dev",

 git 合码后，项目的依赖变化比较大，可以配置一条 clean 指令
 "scripts": {
    "clean": "rm -rf node_modules **/*/node_modules",
  }
  再次执行pnpm install也会同时为根目录和所有 package 安装需要的依赖。

