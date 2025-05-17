# Using Mock Service Worker (MSW) in Development

This guide explains how to use Mock Service Worker (MSW) for API mocking during development.

## Overview

Mock Service Worker (MSW) allows you to develop your frontend without needing a backend running. It intercepts API requests during development and returns mock responses, which is especially useful for:

1. Frontend development without a backend
2. Working with APIs that are still in development
3. Testing edge cases that are hard to reproduce with a real backend
4. Offline development

## How It Works

In development mode, MSW:
1. Registers a service worker that intercepts network requests
2. Uses the same handlers defined for testing
3. Returns mock responses based on those handlers
4. Provides a visual indicator that MSW is active

## Using MSW in Development

### MSW Indicator

When MSW is active, you'll see an "MSW Active" indicator in the bottom right corner of the page. You can:

- **Click the indicator** to toggle MSW on/off
- When active, API requests will be intercepted
- When inactive, API requests will go to the real backend

### Modifying Mock Responses

You can modify the mock responses in `__tests__/mocks/handlers.ts`. These changes will affect both tests and development mode.

### Adding New Endpoints

To add new endpoints:

1. Open `__tests__/mocks/handlers.ts`
2. Add new handlers for your endpoints
3. Follow the existing patterns for consistency

Example:
\`\`\`typescript
// Add a new endpoint
http.get(`${API_URL}/products`, async () => {
  await delay(150)
  return HttpResponse.json([
    { id: "1", name: "Product 1", price: 99.99 },
    { id: "2", name: "Product 2", price: 149.99 },
  ])
})
\`\`\`

## Development vs. Production

MSW is **only enabled in development mode**. In production:

- The service worker is not registered
- All API requests go to your real backend
- No MSW code is included in the production bundle

## Bypassing MSW for Specific Requests

If you need to bypass MSW for specific requests during development:

\`\`\`typescript
// Add a custom header to bypass MSW
const response = await fetch('/api/data', {
  headers: {
    'x-msw-bypass': 'true'
  }
})
\`\`\`

## Troubleshooting

### Requests Not Being Mocked

If your requests aren't being mocked:

1. Check that the MSW indicator shows "MSW Active"
2. Verify that the URL in your fetch call matches the URL in your handler
3. Check the browser console for any MSW-related errors
4. Make sure you're using the correct HTTP method (GET, POST, etc.)

### Service Worker Issues

If you encounter service worker issues:

1. Clear your browser cache and service workers
2. Restart your development server
3. Check that the `mockServiceWorker.js` file is being served correctly

## Best Practices

1. **Keep Handlers Organized**: Group handlers by resource type
2. **Match API Specifications**: Ensure mock responses match your API specifications
3. **Test Edge Cases**: Create handlers for error scenarios to test your error handling
4. **Use TypeScript**: Define types for your API responses for better type safety
5. **Document Changes**: Keep your team informed about changes to mock handlers
\`\`\`

Let's create an example component that uses the API with MSW:
