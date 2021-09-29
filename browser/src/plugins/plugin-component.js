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
    Message
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
    Progress
].reduce((res, cur) => res.use(cur), Vue);



