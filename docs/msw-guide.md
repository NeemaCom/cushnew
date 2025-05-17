# Mock Service Worker (MSW) Guide

This guide explains how to use Mock Service Worker (MSW) for API mocking in tests.

## Overview

Mock Service Worker (MSW) is a library that uses service workers to intercept actual HTTP requests made by your application and return mock responses. This approach has several advantages:

- Tests your actual API call implementation, not mocked functions
- No need to modify your application code for testing
- Works with any API client (fetch, axios, etc.)
- Can be used for both testing and development

## Project Setup

Our project uses MSW v2 for API mocking in tests. The setup includes:

1. **Handlers**: Define mock API responses in `__tests__/mocks/handlers.ts`
2. **Server**: Set up the MSW server in `__tests__/mocks/server.ts`
3. **Jest Setup**: Configure MSW in `jest.setup.js`

## Using MSW in Tests

### Basic Usage

MSW is automatically set up for all tests. You don't need to do anything special to use it:

\`\`\`typescript
import { userApi } from '@/lib/api-client'

test('fetches users', async () => {
  const users = await userApi.getUsers()
  expect(users).toHaveLength(3)
})
\`\`\`

### Overriding Handlers for Specific Tests

You can override handlers for specific tests to test different scenarios:

\`\`\`typescript
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

test('handles API errors', async () => {
  // Override the handler for this test only
  server.use(
    http.get('https://api.example.com/users', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )
  
  // Now the API will return a 500 error
  await expect(userApi.getUsers()).rejects.toThrow()
})
\`\`\`

### Testing Different Response Scenarios

You can test how your components handle different API responses:

\`\`\`typescript
test('shows error message when API fails', async () => {
  server.use(
    http.get('https://api.example.com/users', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )
  
  render(<UserList />)
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
\`\`\`

## Best Practices

1. **Organize Handlers by Resource**: Group handlers by resource type (users, transactions, etc.)
2. **Add Realistic Delays**: Use `await delay(ms)` to simulate realistic API response times
3. **Test Error Scenarios**: Override handlers to test how your app handles API errors
4. **Reset Handlers After Each Test**: MSW automatically resets handlers after each test
5. **Use Typed Responses**: Define TypeScript interfaces for your API responses

## Common Patterns

### Testing Loading States

\`\`\`typescript
test('shows loading state', async () => {
  // Add a longer delay to ensure loading state is visible
  server.use(
    http.get('https://api.example.com/users', async () => {
      await delay(500)
      return HttpResponse.json([...])
    })
  )
  
  render(<UserList />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})
\`\`\`

### Testing Pagination

\`\`\`typescript
test('handles pagination', async () => {
  server.use(
    http.get('https://api.example.com/users', ({ request }) => {
      const url = new URL(request.url)
      const page = url.searchParams.get('page') || '1'
      
      if (page === '1') {
        return HttpResponse.json([/* page 1 data */])
      } else {
        return HttpResponse.json([/* page 2 data */])
      }
    })
  )
  
  // Test pagination logic
})
\`\`\`

### Testing Form Submissions

\`\`\`typescript
test('submits form successfully', async () => {
  render(<UserForm />)
  
  // Fill out form
  await userEvent.type(screen.getByLabelText(/name/i), 'New User')
  await userEvent.type(screen.getByLabelText(/email/i), 'new@example.com')
  
  // Submit form
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  // Check success message
  await waitFor(() => {
    expect(screen.getByText(/user created/i)).toBeInTheDocument()
  })
})
\`\`\`

## Troubleshooting

### Unhandled Requests

If you see warnings about unhandled requests:

1. Check the URL in your API call matches the URL in your handler
2. Make sure you're using the correct HTTP method (GET, POST, etc.)
3. Add a handler for that specific request

### Response Not Being Mocked

If your response isn't being mocked:

1. Check for typos in the URL
2. Ensure the request is being intercepted (check network tab)
3. Verify that MSW is properly set up in your test environment
