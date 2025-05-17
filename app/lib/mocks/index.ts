// Initialize MSW in development mode
export async function initMocks() {
  if (typeof window === "undefined") {
    return
  }

  // Check if we're in development mode
  if (process.env.NODE_ENV === "development") {
    // Dynamically import the worker
    const { worker } = await import("./browser")

    // Start the worker
    await worker.start({
      onUnhandledRequest: "bypass", // Don't warn about unhandled requests
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    })

    console.log("[MSW] Mock Service Worker started")

    // Add MSW indicator to the page
    const mswIndicator = document.createElement("div")
    mswIndicator.id = "msw-indicator"
    mswIndicator.innerHTML = "MSW Active"
    mswIndicator.style.position = "fixed"
    mswIndicator.style.bottom = "12px"
    mswIndicator.style.right = "12px"
    mswIndicator.style.backgroundColor = "#0070f3"
    mswIndicator.style.color = "white"
    mswIndicator.style.padding = "8px 12px"
    mswIndicator.style.borderRadius = "4px"
    mswIndicator.style.fontSize = "12px"
    mswIndicator.style.fontWeight = "bold"
    mswIndicator.style.zIndex = "9999"
    document.body.appendChild(mswIndicator)

    // Add toggle functionality
    mswIndicator.addEventListener("click", async () => {
      if (mswIndicator.innerHTML === "MSW Active") {
        await worker.stop()
        mswIndicator.innerHTML = "MSW Inactive"
        mswIndicator.style.backgroundColor = "#666"
        console.log("[MSW] Mock Service Worker stopped")
      } else {
        await worker.start()
        mswIndicator.innerHTML = "MSW Active"
        mswIndicator.style.backgroundColor = "#0070f3"
        console.log("[MSW] Mock Service Worker started")
      }
    })
  }
}
