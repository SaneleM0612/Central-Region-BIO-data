// Configured URL for Google Apps Script Web App
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2DSaUQkTfDoPITNtCy43azlLt0BDw2XNH6TuwyVxj3Df9fzOoIThoDypHK76otECFMQ/exec";

export const CLUSTER_MAINPLACES = {
  'Free State': [
    'Bloemfontein', 'Botshabelo', 'Thabatsho', 'Parys', 'Ficksberg', 
    'Betleham', 'Senekal', 'Welkom', 'Virginia', 'Kroostad', 
    'Frankfort', 'Odendaalsrus'
  ],
  'North West': [
    'Klerksdorp', 'Mafikeng', 'Lichtenburg', 'Porchefstroom', 'Khuma', 
    'Taung', 'Ganyesa', 'Sasolburg', 'Orkney', 'Volmarenstad', 'Tigane'
  ],
  'Northern Cape': [
    'Kimberly', 'Barkley West', 'Kuman', 'Khathu', 'Pampierstad', 
    'Danielskuil', 'Haartswaterr', 'Promise Land'
  ]
} as const;

export const VALIDATION_LIMITS = {
  IDENTITY_NUMBER: 13,
  MOMO_NUMBER: 11,
  CONTACT_NUMBER: 11,
} as const;