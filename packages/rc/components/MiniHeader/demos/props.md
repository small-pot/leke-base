## props
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| logo | logo的http链接，不需要展示logo时传入null | string \| null | https://static.leke.cn/images/common/logo/mini-header-logo-new-2.png |
| userInfo | 用户信息，未登录时传入null，对应接口地址：/auth/global/tutor/common/getMiniMenu.htm | object \| null | _ |
| messageCount | 消息数量，对应接口地址：/auth/global/notice/common/todo/findNoticeAndAfficheNum.htm| number | _ |

支持原生 input 的其他所有属性。