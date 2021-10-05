import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Container,
    Aside,
    Main,
    Carousel,
    CarouselItem,
    Image,
    Form,
    FormItem,
    Input,
    Button,
    ButtonGroup,
    Progress,
    Message,
    Header,
    Footer,
    Loading,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    Alert,
    ColorPicker
} from 'element-ui';

Vue.prototype.$message = Message;

[
    Container,
    Aside,
    Main,
    Carousel,
    CarouselItem,
    Image,
    Form,
    FormItem,
    Input,
    Button,
    ButtonGroup,
    Progress,
    Header,
    Footer,
    Loading,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    Alert,
    ColorPicker
].reduce((res, cur) => res.use(cur), Vue);



