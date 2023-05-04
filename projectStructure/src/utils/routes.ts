import type { RouteRecordRaw } from "vue-router";
declare module "vue-router" {
	interface RouteMeta {
		title: String;
		icon?: String;
		hidden?: Boolean;
		needRight?: String;
		parentRoute?: {
			title: String;
			name?: String;
			path: String;
		};
	}
}
const routes: RouteRecordRaw[] = [
	{
		path: "system",
		name: "system",
		redirect: "/system/user",
		meta: {
			title: "系统管理",
			icon: "avatar",
		},
		children: [
			{
				path: "user",
				name: "user",
				component: () => import("@/views/system/user/index.vue"),
				meta: {
					title: "用户管理",
					needRight: "system:user:list",
				},
			},
			{
				path: "role",
				name: "role",
				component: () => import("@/views/system/role/index.vue"),
				meta: {
					title: "角色管理",
					needRight: "system:role:list",
				},
			},
		],
	},
	{
		path: "log",
		name: "log",
		redirect: "/log/login",
		meta: {
			title: "日志管理",
			icon: "avatar",
		},
		children: [
			{
				path: "login",
				name: "loginLog",
				component: () => import("@/views/log/loginLog/index.vue"),
				meta: {
					title: "登录日志",
					needRight: "monitor:logininfor:list",
				},
			},
			{
				path: "operation",
				name: "operationLog",
				component: () => import("@/views/log/operationLog/index.vue"),
				meta: {
					title: "操作日志",
					needRight: "monitor:operlog:list",
				},
			},
		],
	},
];
const fullRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Layout",
		redirect: "/system/user",
		component: () => import("@/layout/index.vue"),
		children: routes,
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
	},
	{
		path: "/404",
		name: "404",
		component: () => undefined,
	},
	{
		path: "/unauthorized",
		name: "unauthorized",
		component: () => import("@/views/unauthorized/index.vue"),
	},
	{
		path: "/force-change",
		name: "forceChange",
		component: () => import("@/views/system/firstLogin/index.vue"),
	},
];

export default fullRoutes;
