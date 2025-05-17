import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ApiEndpoint = "users" | "transactions" | "auth" | "global"

export interface DelaySettings {
  enabled: boolean
  delays: Record<ApiEndpoint, number>
}

interface DelayStore extends DelaySettings {
  setDelay: (endpoint: ApiEndpoint, delay: number) => void
  setEnabled: (enabled: boolean) => void
  resetDelays: () => void
}

const DEFAULT_DELAYS: Record<ApiEndpoint, number> = {
  users: 300,
  transactions: 500,
  auth: 700,
  global: 0,
}

export const useDelayStore = create<DelayStore>()(
  persist(
    (set) => ({
      enabled: true,
      delays: { ...DEFAULT_DELAYS },
      setDelay: (endpoint, delay) =>
        set((state) => ({
          delays: {
            ...state.delays,
            [endpoint]: delay,
          },
        })),
      setEnabled: (enabled) => set({ enabled }),
      resetDelays: () => set({ delays: { ...DEFAULT_DELAYS } }),
    }),
    {
      name: "msw-delay-settings",
    },
  ),
)

export const getDelay = (endpoint: ApiEndpoint): number => {
  const store = useDelayStore.getState()
  if (!store.enabled) return 0

  // If global delay is set, it overrides individual endpoint delays
  if (store.delays.global > 0) return store.delays.global

  return store.delays[endpoint]
}
