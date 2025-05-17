function generateMockData(metrics: string[], dimensions: string[], filters: string[]): any[] {
  const numRows = 10 // You can adjust the number of rows as needed
  const mockData = []

  for (let i = 0; i < numRows; i++) {
    const row: { [key: string]: any } = {}

    dimensions.forEach((dimension) => {
      row[dimension] = `Dimension ${dimension} - ${i + 1}` // Example dimension data
    })

    metrics.forEach((metric) => {
      row[metric] = Math.floor(Math.random() * 1000) // Example metric data
    })

    mockData.push(row)
  }

  return mockData
}

export { generateMockData }
