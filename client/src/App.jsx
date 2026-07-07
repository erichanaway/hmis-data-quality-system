import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [flags, setFlags] = useState([])

  useEffect(() => {
    async function fetchFlags() {
      const response = await fetch("http://localhost:5000/api/flags")

      const data = await response.json()

      setFlags(data)
    }

    fetchFlags()
  }, [])

  return (
    <main>
      <h1>HMIS Data Quality Dashboard</h1>

      <p>Component loaded. Ready to fetch flags.</p>

      <p>Total flags: {flags.length}</p>
    </main>
  )
}

export default App
