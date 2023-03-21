<template>
	<div>
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in" appear style="height: 100%">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "AlphaRouterView",
	setup() {
		const router = useRouter();
		const currentRoute = router.currentRoute as any;
		return {
			currentRoute,
		};
	},
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
	opacity: 0;
	transform: translateX(30px);
}

.fade-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}
</style>
