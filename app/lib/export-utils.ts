import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

// Type definitions
type ExportFormat = "csv" | "excel" | "pdf"

interface ExportOptions {
  fileName: string
  sheetName?: string
  title?: string
  subtitle?: string
}

// Function to export data to CSV
export function exportToCSV(data: any[], options: ExportOptions): void {
  try {
    // Convert data to CSV format
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","), // Header row
      ...data.map((row) =>
        headers
          .map((header) => {
            // Handle values that might contain commas by wrapping in quotes
            const value = row[header]?.toString() || ""
            return value.includes(",") ? `"${value}"` : value
          })
          .join(","),
      ),
    ].join("\n")

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${options.fileName}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Error exporting to CSV:", error)
    throw new Error("Failed to export data to CSV")
  }
}

// Function to export data to Excel
export function exportToExcel(data: any[], options: ExportOptions): void {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, options.sheetName || "Report Data")

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `${options.fileName}.xlsx`)
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    throw new Error("Failed to export data to Excel")
  }
}

// Function to export data to PDF
export function exportToPDF(data: any[], options: ExportOptions): void {
  try {
    // Create a new PDF document
    const doc = new jsPDF()

    // Add title and subtitle if provided
    if (options.title) {
      doc.setFontSize(16)
      doc.text(options.title, 14, 15)
    }

    if (options.subtitle) {
      doc.setFontSize(12)
      doc.text(options.subtitle, 14, 25)
    }

    // Prepare data for autoTable
    const headers = Object.keys(data[0])
    const rows = data.map((row) => headers.map((header) => row[header]))

    // Add table to the PDF
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: options.title ? 30 : 10,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [66, 66, 66] },
    })

    // Save the PDF
    doc.save(`${options.fileName}.pdf`)
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    throw new Error("Failed to export data to PDF")
  }
}

// Main export function that handles all formats
export function exportData(data: any[], format: ExportFormat, options: ExportOptions): void {
  switch (format) {
    case "csv":
      exportToCSV(data, options)
      break
    case "excel":
      exportToExcel(data, options)
      break
    case "pdf":
      exportToPDF(data, options)
      break
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}

// Function to prepare chart data for export
export function prepareChartDataForExport(
  data: any[],
  metrics: string[],
  dimension: string,
  metricNames: Record<string, string>,
): any[] {
  return data.map((item) => {
    const exportItem: Record<string, any> = {
      [dimension]: item[dimension],
    }

    metrics.forEach((metric) => {
      exportItem[metricNames[metric] || metric] = item[metric]
    })

    return exportItem
  })
}

// Function to get current date and time formatted for filenames
export function getFormattedDateTime(): string {
  const now = new Date()
  return now.toISOString().replace(/[:.]/g, "-").slice(0, 19)
}
