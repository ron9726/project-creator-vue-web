import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/style/css/baseFont.css';
import SvgIcon from '@/components/base/svgIcon.vue';
import 'ant-design-vue/lib/message/style/css';
import 'ant-design-vue/lib/upload/style/css';
import 'ant-design-vue/lib/table/style/index.less';
import 'ant-design-vue/lib/checkbox/style/css';
import 'ant-design-vue/lib/modal/style/css';
import 'ant-design-vue/lib/pagination/style/css';
import { createPinia } from 'pinia';
import { useUserStore, useRouterStore } from './stores';
import { routerFactory } from './router';
import routes from './utils/routes';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const routerStore = useRouterStore();
const userStore = useUserStore();
const whiteList = ['/', '/test-page'];
routerStore.setMenus(routes[0].children);
app.use(routerFactory.setStore(routerStore, userStore).registerRoutes(routes).setWhiteList(whiteList).generateRouter());

app.component(SvgIcon.name, SvgIcon);

app.mount('#app');
