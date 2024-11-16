/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/Home` | `/(tabs)` | `/(tabs)/(home)` | `/(tabs)/(home)/Home` | `/(tabs)/Home` | `/(tabs)/Schedule` | `/Home` | `/Login` | `/Schedule` | `/_sitemap`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
