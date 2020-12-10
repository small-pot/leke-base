/*
 * @Description: Input组件、TextArea组件 文档地址https://docs.qq.com/doc/DWXNYVUh6bnR4UnNH
 * @Author: linchaoting
 * @Date: 2020-12-08 09:17:50
 * @LastEditTime: 2020-12-10 15:10:53
 */

import InternalInput,{InputProps} from './Input';
import TextArea from './TextArea';
interface InputType extends React.FC<InputProps> {
  TextArea: typeof TextArea;
}

const Input  = InternalInput as InputType;
Input.TextArea = TextArea;

export default Input;
