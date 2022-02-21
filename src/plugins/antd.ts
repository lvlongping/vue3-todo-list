import type { App } from 'vue';
import {
  Button,
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  Upload,
  DatePicker,
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
  app
    .use(Form)
    .use(Upload)
    .use(Button)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(DatePicker);
}
