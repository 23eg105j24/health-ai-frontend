import { useState } from "react";

export default function PatientProfileForm({ onSubmit, onBack }) {
  const [profile, setProfile] = useState({
    age: "",
    gender: "Male",
    weight: "",
    existingDiseases: "",
    allergies: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = () => {
    if (!profile.age || !profile.weight) {
      alert("Please fill in age and weight accurately.");
      return;
    }
    onSubmit(profile);
  };

  return (
    <div className="card glassmorphism fade-in">
      <h2>Step 3: 👤 Patient Profile</h2>
      <p className="subtitle">Help us understand your health context for better suggestions.</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Age</label>
          <input 
            type="number" 
            name="age" 
            value={profile.age} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Years" 
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={profile.gender} onChange={handleChange} className="form-control">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Weight (kg)</label>
          <input 
            type="number" 
            name="weight" 
            value={profile.weight} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="kg"
            min="1"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Existing Diseases / Medical Conditions (optional)</label>
        <input 
          type="text" 
          name="existingDiseases" 
          value={profile.existingDiseases} 
          onChange={handleChange} 
          className="form-control" 
          placeholder="e.g. Asthma, Diabetes... (leave blank if none)" 
        />
      </div>

      <div className="form-group">
        <label>Allergies (optional)</label>
        <input 
          type="text" 
          name="allergies" 
          value={profile.allergies} 
          onChange={handleChange} 
          className="form-control" 
          placeholder="e.g. Peanut, Penicillin... (leave blank if none)" 
        />
      </div>

      <div className="button-group mt-5">
        <button className="btn secondary-btn" onClick={onBack}>Back</button>
        <button className="btn primary-btn" onClick={handleSubmit}>Submit Analysis</button>
      </div>
    </div>
  );
}
