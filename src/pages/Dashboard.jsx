import { useState } from "react"
import SymptomSelector from "../components/SymptomSelector"
import DurationInput from "../components/DurationInput"
import PatientProfileForm from "../components/PatientProfileForm"
import { useNavigate } from "react-router-dom"
import { categoriesData } from "../data/mockDatabase"

export default function Dashboard() {
  const [step, setStep] = useState(1)
  const [assessmentData, setAssessmentData] = useState({
    category: "",
    symptoms: [],
    duration: null,
    profile: null
  })

  const navigate = useNavigate()

  const handleSymptomsNext = (data) => {
    setAssessmentData({ ...assessmentData, category: data.category, symptoms: data.symptoms })
    setStep(2)
  }

  const handleDurationNext = (data) => {
    setAssessmentData({ ...assessmentData, duration: data })
    setStep(3)
  }

  const handleProfileSubmit = (data) => {
    const finalData = { ...assessmentData, profile: data }
    setAssessmentData(finalData)
    // Pass the collected state to the diagnosis page
    navigate("/diagnosis", { state: { payload: finalData } })
  }

  return (
    <div className="container dashboard-container fade-in">
      <div className="dashboard-header text-center">
        <h1>Health Assessment</h1>
        <p className="subtitle">Let's get to know your symptoms better.</p>
        
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <div className="wizard-content mt-5">
        {step === 1 && <SymptomSelector categories={categoriesData} onNext={handleSymptomsNext} />}
        {step === 2 && <DurationInput onNext={handleDurationNext} onBack={() => setStep(1)} />}
        {step === 3 && <PatientProfileForm onSubmit={handleProfileSubmit} onBack={() => setStep(2)} />}
      </div>
    </div>
  )
}