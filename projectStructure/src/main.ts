import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/base/svgIcon.vue";
import { createPinia } from "pinia";
import { useUserStore, useRouterStore } from "./stores";
import { routerFactory, auth } from "./router";
import routes from "./utils/routes";
import { message } from "ant-design-vue";
import "ant-design-vue/lib/message/style/css";
import "ant-design-vue/lib/upload/style/css";
import "ant-design-vue/lib/table/style/index.less";
import "ant-design-vue/lib/checkbox/style/css";
import "ant-design-vue/lib/modal/style/css";
import "ant-design-vue/lib/pagination/style/css";
import "@/assets/style/css/baseFont.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const routerStore = useRouterStore();
const userStore = useUserStore();
const whiteList = ["/", "/test-page"];
const router = routerFactory
	.setStore(routerStore, userStore)
	.registerRoutes(routes)
	.setWhiteList(whiteList)
	.generateRouter();
router.onError((err) => {
	message.info(err.message);
});
routerStore.setMenus(routes[0].children);
app.use(router);
app.use(auth, {
	userStore,
	errorHandler() {
		message.info("您无此操作的权限!");
	},
});
app.component(SvgIcon.name, SvgIcon);
app.mount("#app");
