const BASE = "https://health-ai-backend-production-eafd.up.railway.app/api"

export async function getCategories(){

  const res = await fetch(`${BASE}/categories`)
  return res.json()

}

export async function getSymptoms(category){

  const res = await fetch(`${BASE}/symptoms/${category}`)
  return res.json()

}

export async function analyzeSymptoms(symptoms){

  const res = await fetch(`${BASE}/diagnosis/analyze`,{

    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({symptoms})

  })

  return res.json()

}

import { hospitalsData } from "../data/mockDatabase"

export async function analyzeComprehensiveSymptoms(payload) {
  // Mock AI response delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  const { category, symptoms, duration, profile } = payload
  let severityScore = 0

  symptoms.forEach(sym => {
    if (sym.severity === "Severe") severityScore += 3
    else if (sym.severity === "Moderate") severityScore += 2
    else severityScore += 1
  })

  const isSevere = severityScore > (symptoms.length * 1.5) || profile.age > 65

  // Deduce suspected condition based on the category
  let suspectedCondition = "General Illness"
  let medications = []
  let remedies = []
  
  if (category.toLowerCase().includes("respiratory") || category.toLowerCase().includes("fever")) {
    suspectedCondition = isSevere ? "Pneumonia / Severe Influenza" : "Viral Infection / Common Cold"
    medications = ["Paracetamol 500mg (For fever & body aches)", "Cetirizine 10mg (For runny nose/allergies)", "Cough Syrup (SOS)"]
    remedies = ["Drink plenty of warm fluids", "Steam inhalation twice daily", "Honey with ginger for throat relief", "Rest"]
  } else if (category.toLowerCase().includes("physical") || category.toLowerCase().includes("weakness")) {
    suspectedCondition = isSevere ? "Acute Myalgia / Migraine" : "General Fatigue / Muscle Sprain"
    medications = ["Ibuprofen 400mg (For pain relief)", "Muscle Relaxants (if prescribed)"]
    remedies = ["Adequate rest and sleep", "Hot/Cold compress on affected areas", "Epsom salt bath", "Stay hydrated"]
  } else if (category.toLowerCase().includes("stomach") || category.toLowerCase().includes("digestion")) {
    suspectedCondition = isSevere ? "Severe Gastroenteritis / Food Poisoning" : "Mild Indigestion / Acid Reflux"
    medications = ["Antacids (For acidity/bloating)", "Loperamide (SOS for diarrhea)", "Ondansetron (For severe nausea)"]
    remedies = ["Oral Rehydration Salts (ORS)", "BRAT Diet (Bananas, Rice, Applesauce, Toast)", "Maintain strict hydration", "Avoid spicy foods"]
  } else if (category.toLowerCase().includes("skin")) {
    suspectedCondition = isSevere ? "Severe Allergic Reaction / Eczema Flare" : "Mild Contact Dermatitis / Rash"
    medications = ["Topical Hydrocortisone cream 1%", "Oral Antihistamines (e.g. Loratadine)"]
    remedies = ["Apply Aloe Vera gel to calm skin", "Take cool oatmeal baths", "Avoid scented soaps and tight clothing"]
  } else {
    suspectedCondition = "Undetermined Condition (Needs Medical Review)"
    medications = ["Paracetamol 500mg (If fever/pain is present)"]
    remedies = ["Get plenty of rest", "Drink at least 2L of water daily", "Monitor symptoms closely"]
  }

  const advice = isSevere 
    ? "Your symptoms indicate a severe condition. Do not rely solely on home remedies. Please visit a doctor immediately."
    : "Your symptoms appear manageable. Try the home remedies and rest. If symptoms persist beyond 3 days, consult a physician."

  return {
    condition: suspectedCondition,
    overallSeverity: isSevere ? "Severe" : "Moderate/Mild",
    aiExplanation: `Based on your profile (Age: ${profile.age}, Weight: ${profile.weight}kg) and ${symptoms.length} reported symptoms under the "${category}" category over ${duration.value} ${duration.unit}, the condition seems to be ${isSevere ? 'Severe' : 'Manageable at home'}.`,
    medications,
    remedies,
    advice,
    hospitals: isSevere ? hospitalsData.slice(0, 3) : [] // Recommend exactly 3 nearby hospitals if severe
  }
}

