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
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Row,
    Col
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
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Row,
    Col
].reduce((res, cur) => res.use(cur), Vue);



