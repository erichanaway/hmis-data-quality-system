import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // -------------------------
  // State
  // -------------------------

  const [flags, setFlags] = useState([])

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

      <section className="kpi-grid">
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
      </section>

      <table>
        <thead>
          <tr>
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
