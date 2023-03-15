/**
 * 获取第一个能够访问的页面的routeLocationRaw,如果没有则退出登录并返回登录页的routeLocationRaw
 * @returns 路由地址
 */
function getFirstAccessiblePage(store) {
	//打平路由表，并且只要叶子节点
	const flattedRoutes = (function flat(src) {
		const resultArr: any = [];
		src.forEach((v) => {
			if (v.meta.parentRoute) {
				return;
			}
			const temp = {
				name: v.name,
				needRight: v.meta.needRight,
			};
			if (v.children?.length) {
				resultArr.push(...flat(v.children));
			} else {
				resultArr.push(temp);
			}
		});
		return resultArr;
	})(store.menus);

	const rightList = store.rightList;
	const firstAccessiblePage = flattedRoutes.find((v) => {
		const needRight = v.needRight;
		if (!needRight || rightList.includes(needRight) || rightList?.[0] === "*:*:*") {
			return true;
		}
		return false;
	});
	if (firstAccessiblePage) {
		return { name: firstAccessiblePage.name };
	}
	store.removeToken();
	store.clearUserInfo();
	store.clearRightList();
	return "/unauthorized";
}

function hasRight(targetRight, rightList) {
	if (!targetRight) {
		return true; //如果目标页面没有权限（不需要权限）
	}
	return rightList.includes(targetRight) || rightList?.[0] === "*:*:*";
}

function createNormalBeforeEach(store, routes, whiteList: string[] = []) {
	return async function (to, from) {
		if (!store.menus) {
			store.setMenus(routes);
		}
		let routeLocationRaw;
		let validated = true;
		// 判断 token 是否存在
		if (store.token) {
			if (!store.userInfo) {
				await store.setUserInfo();
			}
			if (to.path === "/login") {
				// 因存在 token 直接跳转至 '/'
				routeLocationRaw = "/";
			} else {
				if (to.matched.length === 0) {
					// 没有匹配的情况下跳转404
					routeLocationRaw = "/404";
				}
			}
		} else if (whiteList.indexOf(to.path) === -1) {
			// 如果页面需要登录
			routeLocationRaw = `/login?redirect=${to.fullPath}`;
		}
		if (validated) {
			//如果是有效路由
			return routeLocationRaw;
		}
		//如果不是有效路由就终止
		return validated;
	};
}

function createBeforeEachWithAC(app, store, routes, whiteList: string[] = []) {
	return async function (to, from) {
		if (!store.menus) {
			store.setMenus(routes);
		}
		let routeLocationRaw;
		let validated = true;
		if (store.token) {
			//目标页面权限
			if (!store.userInfo) {
				await store.setUserInfo();
			}
			if (to.path === "/login") {
				routeLocationRaw = getFirstAccessiblePage(store);
			} else {
				const targetRight = to.meta.needRight || undefined;
				const userRightList = store.getters["user/rightList"];
				if (!hasRight(targetRight, userRightList)) {
					if (from.path === "/" || from.path === "/login") {
						routeLocationRaw = getFirstAccessiblePage(store);
					} else {
						throw new Error(`您没有访问[ ${to.meta.title} ]页面的权限`);
					}
				}
			}
		} else if (whiteList.indexOf(to.path) === -1) {
			// 如果页面需要登录
			routeLocationRaw = `/login?redirect=${to.fullPath}`;
		}
		if (validated) {
			//如果是有效路由
			return routeLocationRaw;
		}
		//如果不是有效路由就终止
		return validated;
	};
}

/**
 * store:{
 *  getter:{
 *    menus()
 *    uesrInfo()
 * 		token()
 * 	  rightList()
 *  },
 *  action:{
 * 	 setMenu()
 *   setUserInfo()
 * 	 removeToken()
 *   clearUserInfo()
 * 	 clearRightList()
 *  }
 *
 * }
 */

const navigationGuardsFactory = {
	createNormalBeforeEach,
	createBeforeEachWithAC,
};

export default navigationGuardsFactory;
