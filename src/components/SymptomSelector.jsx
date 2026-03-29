import { useState } from "react";

export default function SymptomSelector({ categories, onNext }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [symptomsData, setSymptomsData] = useState([]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((c) => c.id === categoryId);
    setSelectedCategory(category);
    
    if (category) {
      setSymptomsData(category.symptoms.map(sym => ({ name: sym, selected: false, severity: "Mild" })));
    } else {
      setSymptomsData([]);
    }
  };

  const handleSymptomToggle = (index) => {
    const newData = [...symptomsData];
    newData[index].selected = !newData[index].selected;
    setSymptomsData(newData);
  };

  const handleSeverityChange = (index, severity) => {
    const newData = [...symptomsData];
    newData[index].severity = severity;
    setSymptomsData(newData);
  };

  const handleNext = () => {
    if (!selectedCategory) {
      alert("Please select a valid category.");
      return;
    }
    const selectedSymptoms = symptomsData.filter(s => s.selected);
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom to proceed.");
      return;
    }
    
    // Pass back the Category name alongside the chosen symptoms
    onNext({ category: selectedCategory.name, symptoms: selectedSymptoms });
  };

  return (
    <div className="card glassmorphism">
      <h2>Step 1: What type of issue are you experiencing?</h2>
      <div className="form-group">
        <label>Primary Symptom Category</label>
        <select onChange={handleCategoryChange} defaultValue="" className="form-control">
          <option value="" disabled>Select a category first (e.g. Skin, Stomach, Pains...)</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="symptoms-list fade-in">
          <h3>Common Symptoms for: {selectedCategory.name}</h3>
          <p className="subtitle">Check all that apply and adjust their severity levels.</p>
          
          <div className="mt-4">
            {symptomsData.map((sym, index) => (
              <div key={index} className={`symptom-item ${sym.selected ? 'selected' : ''}`}>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={sym.selected} 
                    onChange={() => handleSymptomToggle(index)} 
                  />
                  <span>{sym.name}</span>
                </label>
                
                {sym.selected && (
                  <div className="severity-selector fade-in">
                    <label>Severity:</label>
                    <select 
                      value={sym.severity} 
                      onChange={(e) => handleSeverityChange(index, e.target.value)}
                      className="form-control inline-select"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="btn primary-btn mt-4" onClick={handleNext}>Next Step</button>
    </div>
  );
}
