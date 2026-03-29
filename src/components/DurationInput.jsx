import { useState } from "react";

export default function DurationInput({ onNext, onBack }) {
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("Days");

  const handleNext = () => {
    if (!durationValue || parseInt(durationValue) <= 0) {
      alert("Please enter a valid duration.");
      return;
    }
    onNext({ value: parseInt(durationValue), unit: durationUnit });
  };

  return (
    <div className="card glassmorphism fade-in">
      <h2>Step 2: ⏱ Duration of Symptoms</h2>
      <p className="subtitle">How long have you been experiencing these symptoms?</p>
      
      <div className="form-group duration-group">
        <input 
          type="number" 
          value={durationValue} 
          onChange={(e) => setDurationValue(e.target.value)} 
          placeholder="e.g. 3"
          className="form-control"
          min="1"
        />
        <select 
          value={durationUnit} 
          onChange={(e) => setDurationUnit(e.target.value)}
          className="form-control unit-select"
        >
          <option value="Hours">Hours</option>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
          <option value="Months">Months</option>
        </select>
      </div>

      <div className="button-group mt-4">
        <button className="btn secondary-btn" onClick={onBack}>Back</button>
        <button className="btn primary-btn" onClick={handleNext}>Next Step</button>
      </div>
    </div>
  );
}
