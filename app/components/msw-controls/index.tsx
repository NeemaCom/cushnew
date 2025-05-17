"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { DelayControls } from "./delay-controls"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function MswControls() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="default" size="sm" className="rounded-full h-10 px-4 shadow-lg flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>API Controls</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Mock API Controls</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <DelayControls />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
