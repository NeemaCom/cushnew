// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { afterEach, beforeAll, afterAll, jest } from "@jest/globals"
import { server } from "./__tests__/mocks/server"

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }))

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}))

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Suppress console errors during tests
const originalConsoleError = console.error
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Warning: ReactDOM.render is no longer supported")) {
    return
  }
  originalConsoleError(...args)
}

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks()
})
