import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecord } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

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

const registeredRoutes: RouteRecord[] = [];

function registerRoutes(routeRecords: RouteRecord[]) {
	Array.prototype.push.apply(registeredRoutes, routeRecords);
}

function generateRouter(
	beforeGuard: () => any,
	errorHandler: (error: any, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => any
) {
	const router = createRouter({
		history: createWebHistory(),
		routes: registeredRoutes,
	});
	beforeGuard && router.beforeEach(beforeGuard);
	errorHandler && router.onError(errorHandler);
	return router;
}

const routerFactory = {
	registerRoutes,
	generateRouter,
};

export default routerFactory;
