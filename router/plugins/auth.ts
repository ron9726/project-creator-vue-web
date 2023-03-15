//全局注册鉴权指令
export default {
	install(app, { store, errorHandler }) {
		app.directive("needRight", (el: HTMLButtonElement, binding, vnode) => {
			const userRights: String[] = store.getters["user/rightList"];
			if (userRights.length && userRights[0] === "*:*:*") {
				return;
			}
			const targetRight: String = binding.arg.replaceAll("_", ":");
			const parent = el.parentNode;
			if (!userRights.includes(targetRight) && !Object.keys(parent!).includes("authFlag")) {
				const wrapper = document.createElement("div");
				Object.defineProperty(wrapper, "authFlag", { value: true, writable: true, enumerable: true });
				wrapper.style.display = "inline-block";
				wrapper.style.cursor = "pointer";
				wrapper.addEventListener("click", () => {
					errorHandler();
				});
				function findBtnAndDisableIt(root: HTMLButtonElement) {
					if (root.nodeName === "BUTTON") {
						root.disabled = true;
						root.style.pointerEvents = "none";
						if (!(root.parentNode === parent)) {
							(root.parentNode as HTMLElement)!.style.pointerEvents = "none";
						}
					} else if (root.children.length) {
						for (let i = 0; i < root.children.length; i++) {
							findBtnAndDisableIt(root.children[i] as HTMLButtonElement);
						}
					}
				}
				findBtnAndDisableIt(el);
				parent?.insertBefore(wrapper, el);
				wrapper.appendChild(el);
			}
		});
	},
};
