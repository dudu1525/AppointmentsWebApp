const symptomToSpecialtyMap: Record<string, string[]> = {
  //Cardiology 
  'heart': ['cardiology'],
  'cardiac': ['cardiology'],
  'chest': ['cardiology', 'pulmonology'],
  'palpitation': ['cardiology'],
  'arrhythmia': ['cardiology'],
  'pulse': ['cardiology'],
  'blood pressure': ['cardiology'],
  'hypertension': ['cardiology'],
  'angina': ['cardiology'],
  'cardiovascular': ['cardiology'],
  
  //Pulmonology 
  'breathing': ['pulmonology', 'cardiology'],
  'breath': ['pulmonology'],
  'lung': ['pulmonology'],
  'respiratory': ['pulmonology'],
  'cough': ['pulmonology', 'general practice'],
  'wheez': ['pulmonology'],
  'asthma': ['pulmonology'],
  'bronch': ['pulmonology'],
  'pneumonia': ['pulmonology'],
  'shortness of breath': ['pulmonology', 'cardiology'],
  'dyspnea': ['pulmonology', 'cardiology'],
  
  //Gastroenterology
  'stomach': ['gastroenterology'],
  'abdomen': ['gastroenterology'],
  'belly': ['gastroenterology'],
  'digestion': ['gastroenterology'],
  'digestive': ['gastroenterology'],
  'nausea': ['gastroenterology', 'general practice'],
  'vomit': ['gastroenterology', 'general practice'],
  'diarrhea': ['gastroenterology'],
  'constipation': ['gastroenterology'],
  'bowel': ['gastroenterology'],
  'intestin': ['gastroenterology'],
  'crohn': ['gastroenterology'],
  'ibs': ['gastroenterology'],
  'acid reflux': ['gastroenterology'],
  'heartburn': ['gastroenterology'],
  'bloat': ['gastroenterology'],
  'gastro': ['gastroenterology'],
  'liver': ['gastroenterology', 'hepatology'],
  'gallbladder': ['gastroenterology'],
  'pancrea': ['gastroenterology', 'endocrinology'],
  
  //Neurology
  'head': ['neurology', 'general practice'],
  'headache': ['neurology', 'general practice'],
  'migraine': ['neurology'],
  'dizz': ['neurology', 'ENT'],
  'vertigo': ['neurology', 'ENT'],
  'seizure': ['neurology'],
  'epilep': ['neurology'],
  'tremor': ['neurology'],
  'parkinson': ['neurology'],
  'alzheimer': ['neurology'],
  'dementia': ['neurology'],
  'memory': ['neurology', 'psychiatry'],
  'numb': ['neurology', 'orthopedics'],
  'tingling': ['neurology'],
  'paralysis': ['neurology'],
  'stroke': ['neurology'],
  'brain': ['neurology'],
  'nerve': ['neurology'],
  'sclerosis': ['neurology'],
  
  //Orthopedics
  'bone': ['orthopedics'],
  'joint': ['orthopedics', 'rheumatology'],
  'fracture': ['orthopedics'],
  'sprain': ['orthopedics'],
  'arthritis': ['rheumatology', 'orthopedics'],
  'back': ['orthopedics', 'neurology'],
  'spine': ['orthopedics', 'neurology'],
  'knee': ['orthopedics'],
  'hip': ['orthopedics'],
  'shoulder': ['orthopedics'],
  'elbow': ['orthopedics'],
  'wrist': ['orthopedics'],
  'ankle': ['orthopedics'],
  'muscle': ['orthopedics', 'sports medicine'],
  'tendon': ['orthopedics'],
  'ligament': ['orthopedics'],
  
  //Dermatology
  'skin': ['dermatology'],
  'rash': ['dermatology', 'general practice'],
  'itch': ['dermatology'],
  'acne': ['dermatology'],
  'eczema': ['dermatology'],
  'psoriasis': ['dermatology'],
  'mole': ['dermatology'],
  'wart': ['dermatology'],
  'hives': ['dermatology', 'allergy'],
  'burn': ['dermatology', 'general practice'],
  'blister': ['dermatology'],
  'dermat': ['dermatology'],
  'melanoma': ['dermatology', 'oncology'],
  
  //Urology
  'urine': ['urology', 'nephrology'],
  'urinary': ['urology'],
  'bladder': ['urology'],
  'kidney': ['nephrology', 'urology'],
  'prostate': ['urology'],
  'penis': ['urology'],
  'testicle': ['urology'],
  'erectile': ['urology'],
  'incontinence': ['urology'],
  
  //Nephrology
  'renal': ['nephrology'],
  'dialysis': ['nephrology'],
  
  //Gynecology
  'pregnancy': ['obstetrics'],
  'pregnant': ['obstetrics'],
  'prenatal': ['obstetrics'],
  'labor': ['obstetrics'],
  'delivery': ['obstetrics'],
  'menstrual': ['gynecology'],
  'period': ['gynecology'],
  'menstruation': ['gynecology'],
  'vagina': ['gynecology'],
  'ovary': ['gynecology'],
  'uterus': ['gynecology'],
  'cervix': ['gynecology'],
  'pelvic': ['gynecology', 'urology'],
  'menopause': ['gynecology'],
  'breast': ['gynecology', 'oncology'],
  
  //Endocrinology
  'thyroid': ['endocrinology'],
  'diabetes': ['endocrinology'],
  'hormone': ['endocrinology'],
  'endocrine': ['endocrinology'],
  'metabolism': ['endocrinology'],
  'pituitary': ['endocrinology'],
  'adrenal': ['endocrinology'],
  'insulin': ['endocrinology'],
  'glucose': ['endocrinology'],
  'sugar': ['endocrinology', 'general practice'],
  
  // ENT (Otolaryngology)
  'ear': ['ENT'],
  'hearing': ['ENT'],
  'deaf': ['ENT'],
  'tinnitus': ['ENT'],
  'nose': ['ENT'],
  'sinus': ['ENT'],
  'throat': ['ENT'],
  'tonsil': ['ENT'],
  'voice': ['ENT'],
  'hoarse': ['ENT'],
  'smell': ['ENT', 'neurology'],
  'taste': ['ENT', 'neurology'],
  'snore': ['ENT', 'sleep medicine'],
  'apnea': ['ENT', 'pulmonology'],
  
  //Ophthalmology
  'eye': ['ophthalmology'],
  'vision': ['ophthalmology'],
  'sight': ['ophthalmology'],
  'blind': ['ophthalmology'],
  'cataract': ['ophthalmology'],
  'glaucoma': ['ophthalmology'],
  'retina': ['ophthalmology'],
  'conjunctivitis': ['ophthalmology'],
  'pink eye': ['ophthalmology'],
  
  //Psychiatry
  'depression': ['psychiatry'],
  'anxiety': ['psychiatry'],
  'panic': ['psychiatry'],
  'bipolar': ['psychiatry'],
  'schizophrenia': ['psychiatry'],
  'psychosis': ['psychiatry'],
  'mental': ['psychiatry'],
  'mood': ['psychiatry'],
  'suicidal': ['psychiatry', 'emergency'],
  'insomnia': ['psychiatry', 'sleep medicine'],
  'sleep': ['psychiatry', 'sleep medicine', 'neurology'],
  'stress': ['psychiatry', 'general practice'],
  'adhd': ['psychiatry'],
  'autism': ['psychiatry', 'pediatrics'],
  
  //Rheumatology
  'lupus': ['rheumatology'],
  'rheumatoid': ['rheumatology'],
  'autoimmune': ['rheumatology'],
  'inflammation': ['rheumatology', 'general practice'],
  'gout': ['rheumatology'],
  'fibromyalgia': ['rheumatology'],
  
  //Oncology
  'cancer': ['oncology'],
  'tumor': ['oncology'],
  'chemotherapy': ['oncology'],
  'radiation': ['oncology'],
  'malignant': ['oncology'],
  'lymphoma': ['oncology', 'hematology'],
  'leukemia': ['oncology', 'hematology'],
  
  //Hematology
  'blood': ['hematology', 'general practice'],
  'anemia': ['hematology'],
  'bleeding': ['hematology', 'emergency'],
  'clot': ['hematology', 'cardiology'],
  'hemophilia': ['hematology'],
  
  // Infectious Disease
  'infection': ['infectious disease', 'general practice'],
  'fever': ['infectious disease', 'general practice'],
  'flu': ['infectious disease', 'general practice'],
  'covid': ['infectious disease', 'pulmonology'],
  'hiv': ['infectious disease'],
  'hepatitis': ['infectious disease', 'gastroenterology'],
  
  // Allergy & Immunology
  'allergy': ['allergy', 'immunology'],
  'allergic': ['allergy', 'immunology'],
  'anaphylaxis': ['allergy', 'emergency'],
  
  //Pediatrics
  'child': ['pediatrics'],
  'infant': ['pediatrics'],
  'baby': ['pediatrics'],
  'newborn': ['pediatrics'],
  'growth': ['pediatrics', 'endocrinology'],
  'development': ['pediatrics', 'neurology'],
  
  //Geriatrics
  'elderly': ['geriatrics'],
  'aging': ['geriatrics'],
  
  //General Symptoms
  'pain': ['general practice'],
  'fatigue': ['general practice'],
  'tired': ['general practice'],
  'weakness': ['general practice'],
  'weight loss': ['general practice', 'endocrinology'],
  'weight gain': ['general practice', 'endocrinology'],
  'swelling': ['general practice'],
  'cold': ['general practice'],

};

const mapSymptomsToSpecialties = (symptomsArray: string[]): string[] => {
  const specialties = new Set<string>();
  
  symptomsArray.forEach(symptom => {
    const lowerSymptom = symptom.toLowerCase().trim();
    

    for (const [key, specs] of Object.entries(symptomToSpecialtyMap)) {
      if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
        specs.forEach(spec => specialties.add(spec));
      }
    }
  });
  

  if (specialties.size === 0) {
    specialties.add('general practice');
  }
  
  return Array.from(specialties);
};


export { symptomToSpecialtyMap, mapSymptomsToSpecialties };