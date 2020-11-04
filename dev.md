## 工程介绍
*  整个项目使用package.json中的workspace管理，所有依赖共享
*  website为官网工程
*  packages中是发布至npm中的源码工程
*  tsetUtil是jest通用测试方法
*  通过tsconfig中的path与website中webpack的alias配置依赖路径解析

## 命令行
```
{
    "build:icons": gulp打包packages/icons          
    "build:hooks": gulp打包packages/hooks  
    "build:rc": gulp打包packages/rc
    "build:website": webpack打包website
    "build": 按先后顺序打包icons，hooks，rc
    "dev:website": 官网开发环境
    "dev": 先打包icons，然后启动开发环境
    "test": 启动单元测试，输出覆盖率文档
    "test:update": 更快单元测试快照
    "lint": 代码规范校验
    "fix": 自动格式化代码规范
    "tsc": ts类型校验
}
注意：
1.当添加svg至icons中时，需执行npm run build:icons
2.commit会对代码进行校验（tsc与fix），未通过无法提交代码，请大家注意代码规范与ts类型，必要时可通过eslint-disable
```

## 单元测试
*  在每个组件或者hook文件夹下创建__test__文件夹，测试用例都放在其中，包括内部逻辑测试与demo测试（已封装好方法，调用就行）
*  使用[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)编写组件测试用例
*  使用[@testing-library/react-hooks](https://react-hooks-testing-library.com/reference/api/)编写hooks测试用例
*  使用[@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event)可以模拟dom事件

## demos
*  在每个组件或者hook文件夹下创建demos文件夹
*  demos使用.md文件，支持html语法
*  demos应该包括核心功能渲染与参数描述，hooks还需对result进行描述，如果包含http请求，还需添加mock数据
*  [demos输出规范](https://gitlab.leke.cn/frontend/fe-basics/leke-base/-/blob/master/packages/rc/components/MiniHeader/demos/index.ts)

## 官网理由配置
每个事业线可以创建一个group，一个group大概是这样
```
{
    title:'通用',
    keys:[
        'useResolve'  //组件名或hooks名
    ]
}
通过import(`path/${key}/demos/index.ts`)的形式按需加载
```

## git
```
推荐每个事业线都创建一个dev与pro分支，如：homework-dev，homework-pro。
一个组件或者hooks通常只有一人维护，在同一分支上开发基本不会有冲突。
dev=>pro=>master,最终由郭全凯合并master并进行publish
```

