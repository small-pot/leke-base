---    
title: API
---
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headers | 请求头 | object | {"Content-Type": "multipart/form-data"} |
| name | 发到后台的文件参数名 | string | file |
| multiple | 对应input原生multiple属性 | boolean | false |
| accept | 对应input原生accept属性 | string | - |
| url | 上传的后端接口路径 | ()=>void | - | 
| onSuccess | 上传成功后的回调 | (any)=>void | - | 
| onFail | 上传失败后的回调 | (any)=>void | - |
| onUploadProgress | 上传进度事件 | (any)=>void | - |
