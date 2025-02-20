import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const {
    data: user,
    error,
    status,
    refresh,
    clear,
  } = useFetch("/api/v1/profile");

  return { user, status, error, refresh, clear };
});
