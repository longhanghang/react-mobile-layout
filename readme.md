### 基础架构说明

#### 1 运行环境

node

#### 2 技术栈

webpack4x+react+antd-mobile

#### 3 目录结构解释

项目分为build,public,src

##### build : webpack的配置文件

    1 webpack.base.js: 告诉webpack 输入和输出，以及构建时需要的loder和插件
    2 webpack.dev.js：本地启动项目，使用的是webpack-dev-server，原理是代理内存中构建好的文件
    3 webpack.build.js:打包文件，其中包括 uat,sit,dev,prod
    4 webpack.dll.js:将第三方稳定库打成一个包存成dll，通过映射关系去查找对应的函数，后面再次打包的时候就不用再打这个稳定库，提升了构建的速度

##### public : 存放模板文件

##### src : 存放项目相关所有的文件

    1  api 请求接口的芳芳统一放到这个文件夹中
    2  axios 使用axios封装请求
    3  common 存放项目中公共的文件
    4  components 存放公共组件
    5  pages 存放业务组件（h5页面）
    6  redux 存放redux相关文件
    7  router 存放路由文件
    8  utils  存放工具类
    9  nativetools存放原生交互的方法

#### 快速上手

##### 本地运行

1 将项目拉下来
2 全局安装node环境
3 进入项目根目录，执行npm install,安装依赖包
4 执行 npm run dll 生成dll文件
5 npm run start 本地跑起来

##### 打包

1 npm run build:dev  打包dev环境
2 npm run build:sit  打包sit环境
3 npm run build:uat  打包uat环境
4 npm run build:prod 打包prod环境
 