# crm代码内容

## 代码运行

通过nvm切换node版本到大版本 10或者12
nvm alias default v5.0.0 // 切换nvm 默认版本

公司查看管理

## React.component

```jsx
// 创建 React.component 的通用写法
interface IProps {
  marketActivity?: MarketActivityModel
  shopInfo?: { alias: string; kdtId: number }
  basicInfo?: BasicInfoModel
  dynamic?: DynamicModel
}
interface IState {
  pageSize: number
  noMore: boolean
  activeKey: string | string[]
}
// IProps 和 IState 用来约束传入的类型
class Coupon extends React.Component<IProps, IState> {
    state: IState = {
        pageSize: 10,
        noMore: false,
        activeKey: []
    }
}
export default Coupon


```