import 'vue-router';
declare module 'vue-router' {
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
