"use client"

import type { ReactNode } from "react"

// This is a mock Stripe component for demonstration purposes
// In a real application, you would use the actual Stripe React components

export function Stripe({ children }: { children: ReactNode }) {
  return (
    <div className="border rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="card-number" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              id="card-number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="4242 4242 4242 4242"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="expiry-month" className="block text-sm font-medium">
                Expiry Month
              </label>
              <input
                id="expiry-month"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="MM"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="expiry-year" className="block text-sm font-medium">
                Expiry Year
              </label>
              <input
                id="expiry-year"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="YY"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="cvc" className="block text-sm font-medium">
                CVC
              </label>
              <input
                id="cvc"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
