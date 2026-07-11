import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // -------------------------
  // State
  // -------------------------

  const [flags, setFlags] = useState([])

  const [selectedFile, setSelectedFile] = useState(null)
  const [rowsChecked, setRowsChecked] = useState(0)
  const [rulesLoaded, setRulesLoaded] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState("")
  
  // -------------------------
  // Effects
  // -------------------------

  useEffect(() => {
    async function fetchFlags() {
      const response = await fetch("http://localhost:5000/api/flags")

      const data = await response.json()

      setFlags(data)
    }

    fetchFlags()
  }, [])

  function handleFileChange(event) {
    const file = event.target.files[0]

    setSelectedFile(file)
  }

  async function handleUpload() {
    if (!selectedFile) {
      return
    }

    try {
      setIsUploading(true)
      setUploadMessage("Uploading workbook...")

      const formData = new FormData()

      formData.append("workbook", selectedFile)

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Workbook upload failed.")
      }

      const data = await response.json()

      setRowsChecked(data.rowsChecked)
      setRulesLoaded(data.rulesLoaded)
      setUploadMessage(data.message)

      const flagsResponse = await fetch(
        "http://localhost:5000/api/flags"
      )

      const flagsData = await flagsResponse.json()

      setFlags(flagsData)
    } catch (error) {
      console.error(error)
      setUploadMessage("Something went wrong while analyzing the workbook.")
    } finally {
      setIsUploading(false)
    }
  }

  // -------------------------
  // Calculations
  // -------------------------

  const totalFlags = flags.length
  const errorCount = flags.filter(
    (flag) => flag.severity === "Error"
  ).length
  const warningCount = flags.filter(
    (flag) => flag.severity === "Warning"
  ).length
  const openCount = flags.filter(
    (flag) => flag.status === "Open"
  ).length

  // -------------------------
  // Render
  // -------------------------

  return (
    <main>
      <h1>HMIS Data Quality Dashboard</h1>

      <p>Live flags from PostgreSQL</p>

      <section className="upload-section">
        <h2>Upload HMIS Workbook</h2>

        <p>Select an Excel workbook to analyze.</p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p className="selected-file">
            Selected file: <strong>{selectedFile.name}</strong>
          </p>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? "Analyzing..." : "Analyze Workbook"}
        </button>

        {uploadMessage && (
          <p className="upload-message">
            {uploadMessage}
          </p>
        )}
      </section>

      <section className="kpi-grid">

        <div className="kpi-card">
          <h2>{rowsChecked}</h2>
          <p>Rows Checked</p>
        </div>

        <div className="kpi-card">
          <h2>{totalFlags}</h2>
          <p>Total Flags</p>
        </div>

        <div className="kpi-card">
          <h2>{errorCount}</h2>
          <p>Errors</p>
        </div>

        <div className="kpi-card">
          <h2>{warningCount}</h2>
          <p>Warnings</p>
        </div>

        <div className="kpi-card">
          <h2>{openCount}</h2>
          <p>Open</p>
        </div>

        <div className="kpi-card">
          <h2>{rulesLoaded}</h2>
          <p>Rules Loaded</p>
        </div>

      </section>

      <table>
        <thead>
          <tr>
            <th>Excel Row</th>
            <th>User</th>
            <th>Client ID</th>
            <th>Intake ID</th>
            <th>Project ID</th>
            <th>Agency</th>
            <th>Rule</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {flags.map((flag) => (
            <tr key={flag.id}>
              <td>{flag.excel_row}</td>
              <td>{flag.entered_by}</td>
              <td>{flag.client_id}</td>
              <td>{flag.intake_id}</td>
              <td>{flag.project_id}</td>
              <td>{flag.agency}</td>
              <td>{flag.rule_id}</td>
              <td>{flag.category}</td>
              <td>
                <span
                  className={
                    flag.severity === "Error"
                      ? "severity-error"
                      : "severity-warning"
                  }
                >
                  {flag.severity}
                </span>
              </td>
              <td>{flag.status}</td>
              <td>{flag.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default App
