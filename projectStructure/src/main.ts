import { createApp } from 'vue';
import App from './App.vue';
import SvgIcon from '@/components/base/svgIcon.vue';
import { createPinia } from 'pinia';
import { useUserStore, useRouterStore } from './stores';
import { routerFactory, auth } from './router';
import routes from './utils/routes';
import { message } from 'ant-design-vue';
import 'ant-design-vue/lib/message/style/css';
import '@/assets/style/css/baseFont.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.getRouter = () => router;
  store.baseAPI = (callback) => import('@/api/baseAPI').then((module) => module.default).then((api) => callback(api));
  store.roleAPI = (callback) => import('@/api/roleAPI').then((module) => module.default).then((api) => callback(api));
});
app.use(pinia);

const routerStore = useRouterStore();
const userStore = useUserStore();
const whiteList = ['/login', '/404'];
const router = routerFactory.setStore(routerStore, userStore).registerRoutes(routes).setWhiteList(whiteList).generateRouter(true);
router.onError((err) => {
  if (err.message) {
    message.info(err.message);
  }
});
routerStore.setMenus(routes[0].children);
app.use(router);
app.use(auth, {
  userStore,
  errorHandler() {
    message.info('您无此操作的权限!');
  },
});
app.component(SvgIcon.name, SvgIcon);
app.mount('#app');
