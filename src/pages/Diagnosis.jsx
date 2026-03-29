import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { analyzeComprehensiveSymptoms } from "../services/api"

export default function Diagnosis() {
  const [result, setResult] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function run() {
      if (!location.state || !location.state.payload) {
        navigate("/dashboard")
        return
      }

      const data = await analyzeComprehensiveSymptoms(location.state.payload)
      setResult(data)
    }

    run()
  }, [location, navigate])

  if (!result) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <h2>AI is analyzing your health data...</h2>
    </div>
  )

  return (
    <div className="container fade-in result-container">
      <div className="result-header text-center mb-5">
        <h1>Assessment Complete</h1>
        <h2 className={`condition-tag ${result.overallSeverity === 'Severe' ? 'severe' : 'mild'}`}>
          Suspected: {result.condition}
        </h2>
      </div>

      <div className="result-grid">
        <div className="card glassmorphism mb-4">
          <h3>🩺 AI Analysis</h3>
          <p><strong>Severity:</strong> {result.overallSeverity}</p>
          <p>{result.aiExplanation}</p>
          <p className="advice-text mt-3"><strong>Advice:</strong> {result.advice}</p>
        </div>

        <div className="card glassmorphism mb-4">
          <h3>💊 Suggested Medications</h3>
          <ul className="medic-list">
            {result.medications.map((med, idx) => <li key={idx}>{med}</li>)}
          </ul>
        </div>

        <div className="card glassmorphism mb-4">
          <h3>🌿 Natural Remedies & Care</h3>
          <ul className="remedy-list">
            {result.remedies.map((rem, idx) => <li key={idx}>{rem}</li>)}
          </ul>
        </div>

        {result.hospitals && result.hospitals.length > 0 && (
          <div className="card glassmorphism alert-card fade-in mt-4">
            <h3 className="alert-heading">⚠ Severe Condition Detected</h3>
            <p className="alert-text">
              We strongly recommend visiting a hospital immediately based on the severity of your symptoms.
            </p>
            <h4 className="mt-4 mb-3">Nearby Hospitals:</h4>
            <div className="hospital-list">
              {result.hospitals.map((hosp, idx) => (
                <div key={idx} className="hospital-card">
                  <h5>{hosp.name}</h5>
                  <p className="text-muted">{hosp.type} • {hosp.distance} away</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center mt-5 mb-5">
        <button className="btn primary-btn" onClick={() => navigate("/dashboard")}>
          Start New Assessment
        </button>
      </div>
    </div>
  )
}