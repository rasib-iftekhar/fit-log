export const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export const ROUTES = {
  home: "/",
  library: "/",
  myPlan: "/my-plan",
  workout: (id: number | string) => `/workout/${id}`,
} as const;