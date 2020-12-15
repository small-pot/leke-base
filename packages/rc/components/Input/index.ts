/*
 * @Description: Input组件、TextArea组件 文档地址https://docs.qq.com/doc/DWXNYVUh6bnR4UnNH
 * @Author: linchaoting
 * @Date: 2020-12-08 09:17:50
 * @LastEditTime: 2020-12-14 11:55:20
 */

import InternalInput,{InputProps} from './Input';
import TextArea from './TextArea';
import InputNumber from './InputNumber';
interface InputType extends React.FC<InputProps> {
  TextArea: typeof TextArea;
  InputNumber: typeof InputNumber;
}

const Input  = InternalInput as InputType;
Input.TextArea = TextArea;
Input.InputNumber = InputNumber;

export default Input;
