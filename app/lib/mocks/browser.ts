import { setupWorker } from "msw/browser"
import { handlers } from "../../../__tests__/mocks/handlers"

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
