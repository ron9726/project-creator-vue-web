import type { RouteRecordRaw } from 'vue-router';
const routes = [
  {
    path: 'test-page',
    name: 'testPage',
    component: () => import('@/views/template.vue'),
    meta: {
      title: '测试页面',
      icon: 'avatar',
    },
  },
];
const fullRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: routes,
  },
];

export default fullRoutes;
