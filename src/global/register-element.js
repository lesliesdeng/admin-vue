import {
  Table,
  TableColumn,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Message,
  Dialog,
  Form,
  FormItem,
  Pagination,
  Button,
  Row,
  Col,
  Switch,
  Select,
  Option,
  DatePicker,
  Drawer,
  Tree,
  Tooltip
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const components = [
  Table,
  TableColumn,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Message,
  Dialog,
  Form,
  FormItem,
  Pagination,
  Button,
  Row,
  Col,
  Switch,
  Select,
  Option,
  DatePicker,
  Drawer,
  Tree,
  Tooltip
];

function registerElement(app) {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}

export default registerElement;
