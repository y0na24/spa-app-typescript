export const ROUTER_PATHS = {
  HOME: "/",
  CART: "/cart",
  NOT_FOUND: "/404",
} as const;

type Routes = typeof ROUTER_PATHS
export type Route = Routes[keyof Routes]

const paths = Object.values(ROUTER_PATHS)
export const isRoute = (str: string): str is Route => {
  return paths.includes(str as Route)
}
