export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const ROUTES = {
  home: "/",
  library: "/",
  myPlan: "/my-plan",
  workout: (id: number | string) => `/workout/${id}`,
  HOME: "/",
  MY_PLAN: "/my-plan",
  WORKOUT: (id: number | string) => `/workout/${id}`,
} as const;