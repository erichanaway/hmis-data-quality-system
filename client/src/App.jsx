import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [flags, setFlags] = useState([])

  useEffect(() => {
    console.log("Component loaded")
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
