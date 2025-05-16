"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { getFormattedDateTime, prepareChartDataForExport } from "@/app/lib/export-utils"
import { FileSpreadsheet, FileText, FileType, Loader2 } from "lucide-react"

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
  data: any[]
  metrics: string[]
  dimension: string
  reportName: string
  metricNames: Record<string, string>
}

export function ExportDialog({
  isOpen,
  onClose,
  data,
  metrics,
  dimension,
  reportName,
  metricNames,
}: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf">("excel")
  const [fileName, setFileName] = useState(`${reportName.replace(/\s+/g, "-").toLowerCase()}-${getFormattedDateTime()}`)
  const [includeTitle, setIncludeTitle] = useState(true)
  const [includeTimestamp, setIncludeTimestamp] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)

      // Prepare data for export
      const exportData = prepareChartDataForExport(data, metrics, dimension, metricNames)

      // Generate export options
      const options = {
        fileName,
        sheetName: "Report Data",
        title: includeTitle ? reportName : undefined,
        subtitle: includeTimestamp ? `Generated on ${new Date().toLocaleString()}` : undefined,
      }

      // Perform the export
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate processing time
      exportData(exportData, exportFormat, options)

      // Close the dialog
      onClose()
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>Choose your preferred format and options for exporting this report.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="export-format">Export Format</Label>
            <RadioGroup
              id="export-format"
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as "csv" | "excel" | "pdf")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-1 cursor-pointer">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-1 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  CSV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-1 cursor-pointer">
                  <FileType className="h-4 w-4" />
                  PDF
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file-name">File Name</Label>
            <Input
              id="file-name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="report-name"
            />
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-title"
                checked={includeTitle}
                onCheckedChange={(checked) => setIncludeTitle(!!checked)}
              />
              <Label htmlFor="include-title" className="cursor-pointer">
                Include report title
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-timestamp"
                checked={includeTimestamp}
                onCheckedChange={(checked) => setIncludeTimestamp(!!checked)}
              />
              <Label htmlFor="include-timestamp" className="cursor-pointer">
                Include timestamp
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>Export</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
