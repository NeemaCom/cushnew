"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ApiEndpoint, useDelayStore } from "@/app/lib/mocks/delay-store"
import { Badge } from "@/components/ui/badge"

export function DelayControls() {
  const { delays, enabled, setDelay, setEnabled, resetDelays } = useDelayStore()
  const [activeTab, setActiveTab] = useState<ApiEndpoint>("global")

  const handleDelayChange = (value: number[]) => {
    setDelay(activeTab, value[0])
  }

  const formatDelay = (delay: number) => {
    if (delay === 0) return "No delay"
    if (delay < 1000) return `${delay}ms`
    return `${(delay / 1000).toFixed(1)}s`
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">API Response Delays</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch id="delay-enabled" checked={enabled} onCheckedChange={setEnabled} />
            <Label htmlFor="delay-enabled">
              {enabled ? <Badge variant="default">Enabled</Badge> : <Badge variant="outline">Disabled</Badge>}
            </Label>
          </div>
        </div>
        <CardDescription>Adjust mock API response times to test loading states</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ApiEndpoint)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
          </TabsList>

          {(["global", "users", "transactions", "auth"] as ApiEndpoint[]).map((endpoint) => (
            <TabsContent key={endpoint} value={endpoint} className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Delay: {formatDelay(delays[endpoint])}</span>
                </div>
                <Slider
                  value={[delays[endpoint]]}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={handleDelayChange}
                  disabled={!enabled || (endpoint !== "global" && delays.global > 0)}
                />
                {endpoint === "global" && delays.global > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Global delay overrides individual endpoint delays
                  </p>
                )}
                {endpoint !== "global" && delays.global > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Individual delays are disabled when global delay is set
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={resetDelays}>
          Reset to Defaults
        </Button>
        <div className="text-xs text-muted-foreground">Settings are saved between sessions</div>
      </CardFooter>
    </Card>
  )
}
