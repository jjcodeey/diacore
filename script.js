const STORAGE_KEY = "diacore-demo-store-v1";
const SESSION_KEY = "diacore-demo-session-v1";
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DIETARY_COUNSELING_TOPICS = [
	"Renal Diet Counseling",
	"Fluid Restriction Counseling",
	"Sodium Restriction Counseling",
	"Potassium Management Counseling",
	"Phosphorus Management Counseling",
	"Phosphate Binder Education",
	"Protein Intake Counseling",
	"Calorie/Energy Intake Counseling",
	"Diabetic Renal Diet Counseling",
	"Food Label Reading Education",
	"Meal Planning Counseling",
	"Interdialytic Weight Gain Counseling",
	"Thirst Management Counseling",
	"Anemia Nutrition Counseling",
	"Malnutrition Prevention Counseling",
	"Constipation/Dietary Fiber Counseling",
	"Supplement/Herbal Product Safety Counseling",
	"Post-Dialysis Nutrition Counseling",
	"Family/Caregiver Nutrition Education",
	"Dietary Adherence Counseling",
	"Laboratory-Based Nutrition Counseling",
	"Renal Dietitian Referral/Follow-up"
];
const LABORATORY_TESTS = [
	{ id: "hemoglobin", name: "CBC — Hemoglobin", range: (gender) => gender === "Male" ? "Male: 13.5–17.5 g/dL" : gender === "Female" ? "Female: 12.0–16.0 g/dL" : "Male: 13.5–17.5; Female: 12.0–16.0 g/dL", bounds: (gender) => gender === "Male" ? [13.5, 17.5] : gender === "Female" ? [12, 16] : null },
	{ id: "hematocrit", name: "CBC — Hematocrit", range: (gender) => gender === "Male" ? "Male: 41–53%" : gender === "Female" ? "Female: 36–46%" : "Male: 41–53%; Female: 36–46%", bounds: (gender) => gender === "Male" ? [41, 53] : gender === "Female" ? [36, 46] : null },
	{ id: "wbc", name: "CBC — WBC", range: () => "4,000–11,000 cells/µL", bounds: () => [4000, 11000] },
	{ id: "platelets", name: "CBC — Platelets", range: () => "150,000–450,000/µL", bounds: () => [150000, 450000] },
	{ id: "bun", name: "BUN (Blood Urea Nitrogen)", range: () => "7–20 mg/dL", bounds: () => [7, 20] },
	{ id: "creatinine", name: "Serum Creatinine", range: (gender) => gender === "Male" ? "Male: 0.7–1.3 mg/dL" : gender === "Female" ? "Female: 0.6–1.1 mg/dL" : "Male: 0.7–1.3; Female: 0.6–1.1 mg/dL", bounds: (gender) => gender === "Male" ? [0.7, 1.3] : gender === "Female" ? [0.6, 1.1] : null },
	{ id: "sodium", name: "Electrolytes — Sodium (Na⁺)", range: () => "135–145 mmol/L", bounds: () => [135, 145] },
	{ id: "potassium", name: "Electrolytes — Potassium (K⁺)", range: () => "3.5–5.0 mmol/L", bounds: () => [3.5, 5] },
	{ id: "chloride", name: "Electrolytes — Chloride (Cl⁻)", range: () => "98–106 mmol/L", bounds: () => [98, 106] },
	{ id: "calcium", name: "Calcium", range: () => "8.5–10.5 mg/dL", bounds: () => [8.5, 10.5] },
	{ id: "phosphorus", name: "Phosphorus", range: () => "2.5–4.5 mg/dL", bounds: () => [2.5, 4.5] },
	{ id: "albumin", name: "Albumin", range: () => "3.5–5.0 g/dL", bounds: () => [3.5, 5] },
	{ id: "fasting-glucose", name: "Blood Glucose (Fasting)", range: () => "70–99 mg/dL", bounds: () => [70, 99] },
	{ id: "hbsag", name: "Hepatitis B — HBsAg", range: () => "Nonreactive", qualitative: { normal: ["nonreactive", "negative"] } },
	{ id: "anti-hbs", name: "Hepatitis B — anti-HBs", range: () => "≥10 mIU/mL (protective immunity)", minimum: 10 },
	{ id: "anti-hcv", name: "Hepatitis C — Anti-HCV", range: () => "Nonreactive", qualitative: { normal: ["nonreactive", "negative"] } },
	{ id: "alp", name: "Alkaline Phosphatase (ALP)", range: () => "Approximately 44–147 U/L", bounds: () => [44, 147] },
	{ id: "pth", name: "PTH (Parathyroid Hormone)", range: () => "Approximately 10–65 pg/mL (normal kidney function)", bounds: () => [10, 65] },
	{ id: "ferritin", name: "Iron Studies — Ferritin", range: (gender) => gender === "Male" ? "Male: 30–400 ng/mL" : gender === "Female" ? "Female: 15–150 ng/mL" : "Male: 30–400; Female: 15–150 ng/mL", bounds: (gender) => gender === "Male" ? [30, 400] : gender === "Female" ? [15, 150] : null },
	{ id: "tsat", name: "Iron Studies — Transferrin Saturation (TSAT)", range: () => "20–50%", bounds: () => [20, 50] },
	{ id: "kt-v", name: "Kt/V (Hemodialysis)", range: () => "≥1.2 per session (thrice-weekly treatment)", minimum: 1.2 },
	{ id: "urr", name: "URR (Urea Reduction Ratio)", range: () => "≥65%", minimum: 65 },
	{ id: "predialysis-bun", name: "Pre-Dialysis BUN", range: () => "No single normal range; interpret with post-dialysis BUN" },
	{ id: "postdialysis-bun", name: "Post-Dialysis BUN", range: () => "No single normal range; interpret with pre-dialysis BUN" }
];
const LABORATORY_GROUPS = [
	{ title: "CBC (Complete Blood Count)", tests: [["hemoglobin", "Hemoglobin"], ["hematocrit", "Hematocrit"], ["wbc", "WBC"], ["platelets", "Platelets"]] },
	{ title: "BUN (Blood Urea Nitrogen)", tests: [["bun", "BUN"]] },
	{ title: "Serum Creatinine", tests: [["creatinine", "Serum Creatinine"]] },
	{ title: "Electrolytes", tests: [["sodium", "Sodium (Na⁺)"], ["potassium", "Potassium (K⁺)"], ["chloride", "Chloride (Cl⁻)"]] },
	{ title: "Calcium", tests: [["calcium", "Calcium"]] },
	{ title: "Phosphorus", tests: [["phosphorus", "Phosphorus"]] },
	{ title: "Albumin", tests: [["albumin", "Albumin"]] },
	{ title: "Blood Glucose (Fasting)", tests: [["fasting-glucose", "Blood Glucose (Fasting)"]] },
	{ title: "Hepatitis B Screening", tests: [["hbsag", "HBsAg"], ["anti-hbs", "anti-HBs"]] },
	{ title: "Hepatitis C Screening", tests: [["anti-hcv", "Anti-HCV"]] },
	{ title: "Alkaline Phosphatase (ALP)", tests: [["alp", "ALP"]] },
	{ title: "PTH (Parathyroid Hormone)", tests: [["pth", "PTH"]] },
	{ title: "Iron Studies", tests: [["ferritin", "Ferritin"], ["tsat", "Transferrin Saturation (TSAT)"]] },
	{ title: "Kt/V (Hemodialysis)", tests: [["kt-v", "Kt/V"]] },
	{ title: "URR (Urea Reduction Ratio)", tests: [["urr", "URR"]] },
	{ title: "Pre- and Post-Dialysis BUN", tests: [["predialysis-bun", "Pre-Dialysis BUN"], ["postdialysis-bun", "Post-Dialysis BUN"]] }
];
const DIALYSIS_ACCESS_TYPES = [
	{
		id: "AV Fistula",
		meaning: "A surgical connection between an artery and a vein, usually in the arm.",
		reason: "Often preferred for long-term dialysis because it uses the patient's own blood vessels and has lower infection and clotting risks."
	},
	{
		id: "AV Graft",
		meaning: "A synthetic tube placed under the skin to connect an artery and a vein.",
		reason: "An option when the patient's veins are not suitable for a fistula; it may be usable sooner, with higher infection and clotting risks."
	},
	{
		id: "Central Venous Catheter",
		meaning: "A flexible tube placed in a large vein, commonly in the neck, chest, or groin.",
		reason: "Used when dialysis is needed before a permanent access is ready; it is generally temporary and has higher infection risk."
	}
];
const HEMODIALYSIS_CATALOG = [
	{
		id: "core-equipment",
		title: "Core hemodialysis equipment",
		description: "Primary equipment used in hemodialysis",
		items: [
			["EQ-01", "Hemodialysis Machine", "Blood flow control, monitoring, and dialysate delivery", "1 unit", 250, 850],
			["EQ-02", "Water Treatment System (RO Unit)", "Production of purified water", "1 unit", 200, 700],
			["EQ-03", "Dialysis Recliner / Bed", "Patient positioning and patient care", "1 unit", 30, 100],
			["EQ-04", "Automated BP Monitor", "Vital sign monitoring", "1 unit", 5, 25],
			["EQ-05", "Clinical Digital Scale", "Weight measurement before and after dialysis", "1 unit", 8, 35],
			["EQ-06", "Defibrillator / Crash Cart", "Emergency standby", "1 unit", 15, 60],
			["EQ-07", "Microcentrifuge / Lab Equipment", "Blood sample processing", "1 unit", 5, 30]
		]
	},
	{
		id: "dialysis-circuit",
		title: "Dialysis circuit components",
		description: "Equipment components of the dialysis blood and dialysate circuit",
		items: [
			["CS-01", "Dialyzer (Artificial Kidney)", "", "1 piece", 1100, 1700],
			["CS-02", "Arterial & Venous Blood Tubing Set", "", "1 set", 150, 385],
			["CS-03", "Dialysate Concentrates (Acid + Bicarbonate)", "", "1 container", 150, 600]
		]
	},
	{
		id: "vascular-access",
		title: "Vascular access & cannulation",
		description: "Equipment used to access the patient's blood vessels",
		items: [
			["CS-04", "Fistula / Graft Needles", "", "2 needles", 88, 88],
			["CS-05", "Hemodialysis Catheter Kit", "", "1 kit", 2500, 5000, "+"],
			["CS-06", "Syringes (5-20 mL)", "", "2-4 pieces", 20, 80],
			["CS-07", "0.9% Saline Solution (1L bag/bottle)", "", "1-2 bottles", 90, 300]
		]
	},
	{
		id: "medications",
		title: "Medications & anticoagulants",
		description: "Medications and anticoagulants used during dialysis",
		items: [["CS-08", "Heparin / Anticoagulant", "", "1 vial (5 mL)", 80, 215]]
	},
	{
		id: "infection-control",
		title: "Infection control & dressing",
		description: "Equipment for infection prevention and protection of the access site",
		items: [
			["CS-09", "PPE Set", "Gloves, mask, gown, face shield", "1 set", 85, 135],
			["CS-10", "Antiseptic Swabs", "", "2-4 swabs", 20, 40],
			["CS-11", "Sterile Gauze + Hemostatic Pads", "", "1 pack", 25, 50],
			["CS-12", "Adhesive Fistula Band / Tape", "", "1 pack/portion", 20, 65],
			["CS-13", "Biohazard Bag + Sharps Container Portion", "", "1 session share", 15, 30]
		]
	}
];
const ADMIN_NUMBER_WORDS = [
	"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
	"eleven", "twelve", "thirteen", "fourteen"
];
const DOCTOR_ACCOUNT_IDS = new Set(["admin-02", "admin-03"]);
const SCHEDULE_NOTIFICATION_ACCOUNT_IDS = new Set(["admin-02", "admin-03", "admin-04", "admin-05"]);
const HEALTHCARE_TEAM_GROUPS = [
	{ heading: "CENTER ADMINISTRATOR", roles: [{ label: "Admin", position: "Admin", staffIds: ["admin-01"] }] },
	{ heading: "MEDICAL DOCTOR", roles: [{ label: "Nephrologist", position: "Nephrologist", staffIds: ["admin-02", "admin-03"] }] },
	{ heading: "CLINICAL TEAM", roles: [{ label: "Nurses", position: "Nurse", staffIds: ["admin-08", "admin-09"] }] },
	{ heading: "SUPPORT AND SERVICES", roles: [
		{ label: "Dietitian", position: "Dietitian", staffIds: ["admin-05", "admin-04"] },
		{ label: "Med tech", position: "Medtech", staffIds: ["admin-06"] },
		{ label: "Pharmacy", position: "Pharmacy", staffIds: ["admin-07"] }
	] },
	{ heading: "ADMINISTRATIVE TEAM", roles: [
		{ label: "Billing", position: "Billing", staffIds: ["admin-10"] },
		{ label: "Receptionist", position: "Receptionist", staffIds: ["admin-11"] }
	] }
];
const DEFAULT_ADMIN_ROLES = [
	{ name: "Bautista, Jaycel May", position: "Admin", email: "bautista@diacore.com", password: "bautista" },
	{ name: "Digay, Roose Charles H.", position: "Nephrologist", email: "digay@diacore.com", password: "digay" },
	{ name: "Perez, Danna Denise B.", position: "Nephrologist", email: "perezdanna@diacore.com", password: "perez" },
	{ name: "Alegria, Rose Angelica B.", position: "Dietitian", email: "alegria@diacore.com", password: "alegria" },
	{ name: "Perez, Kim Denielle T.", position: "Dietitian", email: "perezkim@diacore.com", password: "perez" },
	{ name: "Mostaza, April Gaile V.", position: "Medtech", email: "mostaza@diacore.com", password: "mostaza" },
	{ name: "Redera, Armando H.", position: "Pharmacy", email: "redera@diacore.com", password: "redera" },
	{ name: "Domingo, Jewel Althea F.", position: "Nurse", email: "domingo@diacore.com", password: "domingo" },
	{ name: "Isuela, Mary Jogie Leigh S.", position: "Nurse", email: "isuela@diacore.com", password: "isuela" },
	{ name: "Ebcas, Jonnah Mae A.", position: "Billing", email: "ebcas@diacore.com", password: "ebcas" },
	{ name: "Cordovez, Jenelyn Z.", position: "Receptionist", email: "cordovez@diacore.com", password: "cordovez" },
	{ name: "Zipagan, Mark Gracy A", position: "Biomedical Technician", email: "zipagan@diacore.com", password: "zipagan" },
	{ position: "Admin", emailPrefix: "admin", roleNumber: 13 },
	{ position: "Admin", emailPrefix: "admin", roleNumber: 14 }
];
const PRESCRIPTION_MEDICATIONS = [
	"Alteplase (Cathflo Activase)",
	"Darbepoetin Alfa (Aranesp)",
	"Calcitriol (Calcijex (IV), Rocaltrol (oral))",
	"Calcium Carbonate (Tums) – Phosphorus binder",
	"Calcium Carbonate (Tums) – Calcium supplement",
	"CeFAZolin (Ancef)",
	"Ceftazidime (Tazicef)",
	"Cinacalcet (Sensipar)",
	"CloNIDine (Catapress)",
	"Dextrose 50% (D50)",
	"Diphenhydramine (Benadryl)",
	"Etelcalcitide (Parsabiv)",
	"Glucose Tablets",
	"Heparin",
	"Iron Sucrose (Venofer)",
	"LiquaCel",
	"Loperamide Hydrochloride (Imodium)",
	"Midodrine (ProAmatine)",
	"Nitroglycerin (NTG)",
	"Ondansetron (Zofran)",
	"Paracalcitol (Zemplar)",
	"Patiromer (Veltassa)",
	"Sodium Citrate 4%",
	"Sodium Polystyrene (Kayexalate)",
	"Sodium Thiosulfate (STS)",
	"Sodium Zirconium Cyclosilicate (Lokelma)",
	"Vancomycin (Vancocin)"
];
const PRESCRIPTION_PAIN_MEDICATIONS = [
	"Acetaminophen (Tylenol)",
	"Topical Diclofenac 1.16%–1.5% Gel (Voltaren)",
	"Capsaicin 0.025%–0.075% Cream",
	"Gabapentin (Neurontin)",
	"Pregabalin (Lyrica)",
	"Hydromorphone (Dilaudid)",
	"Fentanyl",
	"Methadone",
	"Buprenorphine"
];
const PRESCRIPTION_VACCINES = [
	{ name: "Influenza Vaccine (Fluzone High Dose)", options: [] },
	{ name: "Hepatitis B Vaccine", options: ["Engerix-B", "Recombivax"] },
	{ name: "Pneumococcal Vaccine", options: ["PCV13", "Prevnar13", "PPSV23", "Pneumovax23"] },
	{ name: "Tuberculin Purified Protein Derivative (PPD) (Tubersol)", options: [] }
];

function createSeedAdmins() {
	return DEFAULT_ADMIN_ROLES.map((staff, index) => {
		const number = index + 1;
		const paddedNumber = String(number).padStart(2, "0");
		const name = staff.name || `DIACORE ${staff.position} ${paddedNumber}`;
		const email = staff.email || `${staff.emailPrefix}${staff.roleNumber}@diacore.com`;
		const password = staff.password || `admin${ADMIN_NUMBER_WORDS[index]}${number}`;
		return {
			id: `admin-${paddedNumber}`,
			username: `admin${paddedNumber}`,
			email,
			password,
			name,
			birthday: "",
			age: "",
			gender: "",
			position: staff.position,
			address: "",
			education: "",
			employmentId: `DC-${paddedNumber}`,
			photo: "",
			nursePhoto: ""
		};
	});
}

function createSeedEquipment() {
	return [
		{ id: "equipment-001", name: "Dialyzer", stock: 30, unitPrice: 350, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-002", name: "Bloodline set", stock: 30, unitPrice: 180, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-003", name: "AV fistula needle", stock: 60, unitPrice: 25, usedQuantity: 0, usedCost: 0 },
		{ id: "equipment-004", name: "Sterile gauze", stock: 100, unitPrice: 5, usedQuantity: 0, usedCost: 0 }
	];
}

function nextPatientNumber(patients) {
	const usedNumbers = new Set();
	let largestNumber = 0;
	patients.forEach((patient) => {
		const match = /^DC-(\d+)$/.exec(String(patient.patientNumber || ""));
		if (!match) return;
		const number = Number(match[1]);
		usedNumbers.add(number);
		largestNumber = Math.max(largestNumber, number);
	});
	let nextNumber = largestNumber + 1;
	while (usedNumbers.has(nextNumber)) nextNumber += 1;
	return `DC-${String(nextNumber).padStart(6, "0")}`;
}

function ensurePatientNumbers(patients) {
	const assignedNumbers = new Set();
	patients.forEach((patient) => {
		const patientNumber = String(patient.patientNumber || "");
		if (!/^DC-\d{6,}$/.test(patientNumber) || assignedNumbers.has(patientNumber)) {
			patient.patientNumber = nextPatientNumber(patients);
		}
		assignedNumbers.add(patient.patientNumber);
	});
}

function pharmacyDateOffset(days) {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
}

function createSeedPharmacySuppliers() {
	return [
		{ id: "supplier-001", name: "ABC Pharma Distribution", contactPerson: "Lea Santos", email: "orders@abcpharma.example", phone: "0917 555 0101", address: "Cainta, Rizal", status: "Active" },
		{ id: "supplier-002", name: "MedSupply Partners", contactPerson: "Ramon Cruz", email: "sales@medsupply.example", phone: "0917 555 0102", address: "Pasig City", status: "Active" },
		{ id: "supplier-003", name: "HealthLine Medical", contactPerson: "Mia Reyes", email: "support@healthline.example", phone: "0917 555 0103", address: "Quezon City", status: "Active" }
	];
}

function createSeedPharmacyMedicines() {
	const modules = [
		{
			name: "Module 1: Oral Medications",
			description: "Tablets, Capsules, Chewables",
			items: [
				["Calcium Carbonate", "Caltrate", "Phosphate Binder", "500 mg", "Tablet", 8.5, 1200, "2026-08-15"],
				["Sevelamer Carbonate", "Renvela", "Phosphate Binder", "800 mg", "Tablet", 85, 450, "2025-11-30"],
				["Lanthanum Carbonate", "Fosrenol", "Phosphate Binder", "500 mg", "Chewable Tablet", 120, 180, "2026-02-28"],
				["Calcitriol", "Rocaltrol", "Vitamin D Analog", "0.25 mcg", "Capsule", 32, 600, "2025-09-15"],
				["Cinacalcet", "Sensipar", "Calcimimetic", "30 mg", "Tablet", 210, 120, "2026-05-10"],
				["B-Complex Vitamins", "Nephrovit", "Renal Vitamin", "Standard Formulation", "Tablet", 6, 2000, "2027-01-20"],
				["Folic Acid", "Folart", "Vitamin Supplement", "5 mg", "Tablet", 4.5, 1500, "2026-10-05"],
				["Amlodipine", "Norvasc", "Antihypertensive", "10 mg", "Tablet", 15, 800, "2026-12-12"],
				["Carvedilol", "Dilatrend", "Beta-Blocker", "6.25 mg", "Tablet", 18.5, 500, "2025-10-18"],
				["Sodium Bicarbonate", "Sodium Bicarb", "Alkalinizing Agent", "650 mg", "Tablet", 3, 3000, "2027-03-30"]
			]
		},
		{
			name: "Module 2: Injectable Medications",
			description: "Ampoules, Vials, ESAs, Heparin, Insulins",
			items: [
				["Epoetin Alfa", "Epopen", "ESA", "4,000 IU/mL", "Prefilled Syringe", 450, 250, "2025-08-20"],
				["Darbepoetin Alfa", "Aranesp", "ESA", "20 mcg/0.5 mL", "Prefilled Syringe", 1850, 60, "2025-07-15"],
				["Heparin Sodium", "Hep-Lock", "Anticoagulant", "5,000 IU/mL (5 mL)", "Vial", 280, 150, "2026-04-12"],
				["Enoxaparin Sodium", "Clexane", "LMWH", "40 mg/0.4 mL", "Prefilled Syringe", 620, 80, "2025-12-01"],
				["Iron Sucrose", "Venofer", "Iron Supplement", "20 mg elemental Fe/mL (5 mL)", "Ampoule", 380, 200, "2026-09-30"],
				["Regular Human Insulin", "Humulin R", "Antidiabetic", "100 IU/mL (10 mL)", "Vial", 550, 35, "2025-10-15"],
				["Paricalcitol", "Zemplar", "Vitamin D Analog", "5 mcg/mL", "Ampoule", 890, 45, "2026-01-18"],
				["Loperamide", "Imodium", "Antidiarrheal", "2 mg/mL", "Ampoule", 45, 50, "2026-11-11"],
				["Hydralazine HCl", "Apresoline", "Antihypertensive", "20 mg/mL", "Ampoule", 125, 40, "2025-09-28"],
				["Diphenhydramine", "Benadryl", "Antihistamine", "50 mg/mL", "Ampoule", 65, 60, "2027-02-14"]
			]
		},
		{
			name: "Module 3: IV Solutions & Emergency Liquids",
			description: "Saline, Dextrose, Water for Injection",
			items: [
				["0.9% Sodium Chloride", "Normal Saline", "Isotonic IV Solution", "1,000 mL", "IV Bottle", 75, 800, "2027-05-10"],
				["0.9% Sodium Chloride", "Normal Saline", "Isotonic IV Solution", "500 mL", "IV Soft Bag", 62, 400, "2027-04-18"],
				["50% Dextrose in Water", "D50W", "Hypertonic Solution", "50 mL", "Vial / Ampoule", 85, 100, "2026-08-22"],
				["Sterile Water for Injection", "SWFI", "Diluent", "50 mL", "Vial", 42, 150, "2028-01-15"],
				["Bicarbonate Hemodialysis Concentrate", "Acid Concentrate", "Dialysate Fluid", "Part A (Acid), 10 L", "Container", 650, 120, "2026-03-31"],
				["Sodium Bicarbonate Powder", "Bicarb Powder", "Dialysate Buffer", "650 g", "Bag / Cartridge", 280, 250, "2026-06-30"],
				["5% Dextrose in 0.9% NaCl", "D5NS", "Maintenance IV Solution", "1,000 mL", "IV Bottle", 82, 80, "2027-02-20"],
				["Epinephrine", "Adrenaline", "Emergency Cardiac Vasopressor", "1 mg/mL (1:1000)", "Ampoule", 95, 50, "2025-11-15"],
				["Atropine Sulfate", "Atropine", "Emergency Anticholinergic", "1 mg/mL", "Ampoule", 55, 40, "2026-07-04"],
				["Calcium Gluconate", "CalGluconate", "Emergency Electrolyte", "10% (10 mL)", "Ampoule", 110, 60, "2026-10-19"]
			]
		},
		{
			name: "Module 4: Dialysis Consumables & Access",
			description: "Dialyzers, Bloodlines, AV Needles, Catheter Kits",
			items: [
				["High-Flux Dialyzer", "FX80", "Hemodialysis Filter", "1.8 m² Synthetic Membrane", "Piece", 1450, 150, "2027-09-30"],
				["Low-Flux Dialyzer", "F6HPS", "Hemodialysis Filter", "1.3 m² Polysulfone", "Piece", 1100, 80, "2027-08-15"],
				["Blood Tubing Set", "Bloodline AV", "Blood Conduit", "Arterial & Venous Set w/ Transducer", "Set", 320, 500, "2028-02-28"],
				["AV Fistula Needle", "AVN-16G", "Access Needle", "16G x 1 in Arterial (Red)", "Piece", 45, 1200, "2028-04-10"],
				["AV Fistula Needle", "AVN-16G-V", "Access Needle", "16G x 1 in Venous (Blue)", "Piece", 45, 1200, "2028-04-10"],
				["Temporary Hemodialysis Catheter", "Niagara", "Dual Lumen Catheter", "12 Fr x 20 cm Curved", "Kit", 2850, 25, "2026-11-20"],
				["Permanent Tunneled Catheter", "PermCath", "Long-Term Access", "14.5 Fr x 36 cm Dual Lumen", "Kit", 8500, 15, "2026-12-15"],
				["Transducer Protector", "TransProtector", "Safety Barrier", "0.2 Micron Hydrophobic", "Piece", 28, 800, "2028-06-30"],
				["Recirculation Connector", "Combiset", "Dialysis Accessory", "Luer-Lock Y-Connector", "Piece", 65, 200, "2027-10-05"],
				["Catheter Dressing Kit", "Dressing Set", "Sterile Access Care", "Chlorhexidine + Transparent Film", "Kit", 185, 150, "2026-05-12"]
			]
		},
		{
			name: "Module 5: Medical Disposables & PPE",
			description: "Syringes, Gauze, Tapes, Gloves, Masks",
			items: [
				["Disposable Syringe", "Terumo 10 mL", "Injectables / Flush", "10 mL Luer Lock w/o Needle", "Piece", 12, 1500, "2028-11-30"],
				["Disposable Syringe", "Terumo 3 mL", "Medication Admin", "3 mL 23G x 1 in Needle", "Piece", 8.5, 1200, "2028-10-15"],
				["Insulin Syringe", "Terumo U-100", "Insulin Admin", "1 mL 29G x 1/2 in", "Piece", 10, 500, "2028-08-20"],
				["Sterile Gauze Pads", "GauzePad 4x4", "Wound Dressing", "4 in x 4 in 12-Ply (Pack of 5)", "Pack", 18, 800, "2029-01-10"],
				["Surgical Micropore Tape", "Micropore 2 in", "Dressing Securing", "2 inches x 10 yards", "Roll", 110, 120, "2028-05-01"],
				["Nitrile Exam Gloves", "Safeskin", "Personal Protective", "Medium, Powder-Free", "Box (100 pcs)", 380, 80, "2027-07-15"],
				["Sterile Surgical Gloves", "Ansell", "Access Cannulation", "Size 7.5, Powder-Free", "Pair", 42, 300, "2027-03-22"],
				["Surgical Face Mask", "MaskPro 3P", "Personal Protective", "3-Ply Earloop Fluid Resistant", "Box (50 pcs)", 150, 60, "2028-12-31"],
				["Face Shield", "ProtectShield", "Personal Protective", "Clear Anti-Fog Full Face", "Piece", 35, 100, "2029-06-30"],
				["Disposable Isolation Gown", "IsoGown", "Personal Protective", "Fluid-Resistant Non-Woven", "Piece", 68, 250, "2028-09-18"]
			]
		},
		{
			name: "Module 6: Testing, Emergency & Cleaning Supplies",
			description: "Glucometer Strips, Airway Tubes, Disinfectants",
			items: [
				["Blood Glucose Test Strips", "Accu-Chek", "Diagnostic Test", "Guide Test Strips", "Box (50 strips)", 1250, 25, "2025-12-10"],
				["Endotracheal Tube", "ETT-Sterile", "Airway Emergency", "Size 7.5 mm Cuffed", "Piece", 145, 15, "2028-03-15"],
				["Oropharyngeal Airway", "Guedel", "Airway Emergency", "Size 3 (80 mm) Yellow", "Piece", 65, 20, "2029-02-28"],
				["Citric Acid Disinfectant", "Citrosteril", "Machine Heat Disinfection", "21% Liquid Concentrate (5 L)", "Canister", 1850, 18, "2026-08-31"],
				["Peracetic Acid Disinfectant", "Puristeril", "Dialyzer / Line Disinfectant", "3.5% Concentrate (5 L)", "Canister", 2100, 12, "2026-04-15"],
				["Sodium Hypochlorite 10%", "Bleach-HD", "Surface Disinfection", "Industrial Grade (1 Gallon)", "Bottle", 280, 30, "2026-01-30"],
				["70% Isopropyl Alcohol", "Alcogel-70", "Antiseptic", "500 mL w/ Pump Dispenser", "Bottle", 115, 80, "2027-11-20"],
				["Povidone Iodine 10%", "Betadine", "Skin Antiseptic", "500 mL Solution", "Bottle", 340, 25, "2026-09-12"],
				["AED Defibrillator Pads", "SmartPads", "Emergency Equipment", "Adult Adhesive Electrodes", "Set", 3200, 6, "2025-10-31"],
				["Suction Catheter", "SuctCath-14", "Airway Clearance", "14 Fr w/ Control Valve", "Piece", 22, 100, "2028-07-19"]
			]
		}
	];
	return modules.flatMap((module) => module.items.map((item, index) => {
		const itemCode = `HD-${String((modules.indexOf(module) * 10) + index + 1).padStart(3, "0")}`;
		return {
			id: `pharmacy-${itemCode.toLowerCase()}`,
			itemCode,
			module: module.name,
			moduleDescription: module.description,
			genericName: item[0],
			brandName: item[1],
			category: item[2],
			dosage: item[3],
			form: item[4],
			unit: item[4],
			unitPrice: item[5],
			quantity: item[6],
			reorderLevel: 0,
			supplierId: "",
			lotNumber: itemCode,
			expiryDate: item[7]
		};
	}));
}

function createSeedPharmacyBatches(medicines) {
	return medicines.map((medicine) => ({
		id: medicine.itemCode ? `batch-${medicine.itemCode.toLowerCase()}` : `batch-${medicine.id}`,
		medicineId: medicine.id,
		lotNumber: medicine.lotNumber,
		expiryDate: medicine.expiryDate,
		quantity: medicine.quantity,
		receivedAt: "",
		supplierId: medicine.supplierId
	}));
}

function createSeedMedtechRequests(patients) {
	const patientAt = (index) => patients[index % Math.max(patients.length, 1)];
	const today = new Date().toISOString().slice(0, 10);
	return [
		{ id: "lab-request-001", patientId: patientAt(0)?.id, testId: "hemoglobin", testName: "CBC — Hemoglobin", priority: "Routine", status: "Pending", specimenStatus: "Pending collection", requestDate: today, requestedBy: "Dr. Digay", specimenId: "SP-0001", specimenType: "Blood", condition: "Pending collection", section: "Hematology" },
		{ id: "lab-request-002", patientId: patientAt(1)?.id, testId: "potassium", testName: "Electrolytes — Potassium", priority: "STAT", status: "In Progress", specimenStatus: "Received", requestDate: today, requestedBy: "Dr. Perez", specimenId: "SP-0002", specimenType: "Blood", collectionTime: `${today}T09:15`, receivedTime: `${today}T09:28`, condition: "Acceptable", section: "Clinical Chemistry" },
		{ id: "lab-request-003", patientId: patientAt(2)?.id, testId: "bun", testName: "BUN", priority: "Routine", status: "Received", specimenStatus: "Received", requestDate: today, requestedBy: "Dr. Digay", specimenId: "SP-0003", specimenType: "Blood", collectionTime: `${today}T09:40`, receivedTime: `${today}T09:55`, condition: "Acceptable", section: "Clinical Chemistry" },
		{ id: "lab-request-004", patientId: patientAt(0)?.id, testId: "albumin", testName: "Albumin", priority: "Routine", status: "Pending", specimenStatus: "Pending collection", requestDate: today, requestedBy: "Dr. Perez", specimenId: "SP-0004", specimenType: "Blood", condition: "Pending collection", section: "Clinical Chemistry" },
		{ id: "lab-request-005", patientId: patientAt(1)?.id, testId: "hbsag", testName: "Hepatitis B — HBsAg", priority: "STAT", status: "Pending", specimenStatus: "Pending collection", requestDate: today, requestedBy: "Dr. Digay", specimenId: "SP-0005", specimenType: "Blood", condition: "Pending collection", section: "Serology" }
	].filter((request) => request.patientId);
}

function createSeedEquipmentCatalog() {
	const units = {
		"EQ-01": "session allocation", "EQ-02": "session allocation", "EQ-03": "session allocation",
		"EQ-04": "session allocation", "EQ-05": "session allocation", "EQ-06": "session allocation", "EQ-07": "session allocation",
		"CS-01": "piece", "CS-02": "set", "CS-03": "container", "CS-04": "needles", "CS-05": "kit",
		"CS-06": "session pack (2-4 pieces)", "CS-07": "session pack (1-2 bottles)", "CS-08": "vial (5 mL)",
		"CS-09": "set", "CS-10": "session pack (2-4 swabs)", "CS-11": "pack", "CS-12": "pack/portion", "CS-13": "session share"
	};
	return HEMODIALYSIS_CATALOG.map((category) => ({
		id: category.id,
		title: category.title,
		description: category.description,
		items: category.items.map(([code, name, purpose, , priceMin, priceMax, openEnded]) => ({
			id: makeId("equipment-item"),
			code,
			name,
			purpose,
			quantity: code === "CS-04" ? 2 : 1,
			unit: units[code],
			priceMin: code === "CS-04" ? 44 : priceMin,
			priceMax: code === "CS-04" ? 44 : priceMax,
			openEnded: openEnded === "+"
		}))
	}));
}

function createSeedStore() {
	const patients = [
		{
			id: "patient-001",
			name: "Aviana Bernardo",
			email: "aviana@gmail.com",
			password: "avianab",
			birthday: "1985-06-14",
			age: 41,
			gender: "Female",
			address: "Marikina City",
			dialysisType: "Hemodialysis",
			center: "Sumulong",
			dialysisDays: ["Monday", "Wednesday", "Friday"],
			timeIn: "07:00",
			timeOut: "11:00",
			accessSite: "AV fistula",
			registeredAt: "2026-09-01"
		},
		{
			id: "patient-002",
			name: "Jordan Santos",
			email: "patient02@diacore.demo",
			password: "PatientDemo02!",
			birthday: "1979-02-22",
			age: 47,
			gender: "Male",
			address: "Sumulong, Antipolo",
			dialysisType: "Peritoneal dialysis",
			center: "Sumulong",
			dialysisDays: ["Monday", "Wednesday", "Friday"],
			timeIn: "12:00",
			timeOut: "16:00",
			accessSite: "Peritoneal catheter",
			registeredAt: "2026-09-05"
		},
		{
			id: "patient-003",
			name: "Taylor Garcia",
			email: "patient03@diacore.demo",
			password: "PatientDemo03!",
			birthday: "1990-11-08",
			age: 35,
			gender: "Female",
			address: "Antipolo City",
			dialysisType: "Hemodialysis",
			center: "Sumulong",
			dialysisDays: ["Monday", "Wednesday", "Friday"],
			timeIn: "08:00",
			timeOut: "12:00",
			accessSite: "AV graft",
			registeredAt: "2026-09-10"
		}
	];
	ensurePatientNumbers(patients);
	const pharmacySuppliers = createSeedPharmacySuppliers();
	const pharmacyMedicines = createSeedPharmacyMedicines();

	return {
		admins: createSeedAdmins(),
		staffRosterVersion: 3,
		patients,
		announcements: [{ id: "announcement-001", title: "Welcome to DIACORE", body: "Please contact your dialysis center if you need help with your appointment.", createdAt: "2026-09-01", author: "DIACORE Admin" }],
		notes: [
			{ id: "note-001", patientId: "patient-001", date: "2026-09-20", text: "Patient completed scheduled hemodialysis session. Continue monitoring as directed by the care team." },
			{ id: "note-002", patientId: "patient-002", date: "2026-09-21", text: "Routine peritoneal dialysis follow-up recorded by the care team." }
		],
		nutritionAssessments: [],
		dietPlans: [],
		nutritionFollowUps: [],
		nursingCarePlans: [],
		nursingAssessments: [],
		treatmentMonitoring: [],
		dialysisSessions: [],
		medicationAdministrations: [],
		laboratoryFollowUps: [],
		patientEndorsements: [],
		prescriptions: [],
		pharmacyMedicines,
		pharmacySuppliers,
		pharmacyBatches: createSeedPharmacyBatches(pharmacyMedicines),
		pharmacyTransactions: [],
		pharmacyDeliveries: [],
		medtechRequests: createSeedMedtechRequests(patients),
		medtechResults: [],
		doctorSchedules: [],
		patientScheduleRequests: [],
		receptionAppointments: [],
		staffNotifications: [],
		contactMessages: [],
		laboratory: [],
		dietaryCounseling: [],
		materialUsage: [],
		bills: [
			{ id: "bill-001", patientId: "patient-001", description: "HEMODIALYSIS", amount: 2500, status: "Pending", method: "Cash", updatedAt: "2026-09-20", equipmentUsed: [] },
			{ id: "bill-002", patientId: "patient-002", description: "HEMODIALYSIS", amount: 1800, status: "Pending", method: "Cash", updatedAt: "2026-09-21", equipmentUsed: [] }
		],
		equipment: createSeedEquipment(),
		equipmentCatalog: createSeedEquipmentCatalog(),
		availableDays: ["Monday", "Wednesday", "Friday"],
		messages: [
			{ id: "message-001", patientId: "patient-001", senderId: "admin-01", senderRole: "admin", senderName: "Bautista, Jaycel May", text: "Your next appointment is on Monday.", sentAt: "2026-09-22 09:00" }
		],
		notifications: [],
		audit: [{ id: "audit-001", text: "Demo records initialized", date: "2026-09-01" }]
	};
}

function getStore() {
	try {
		const savedStore = localStorage.getItem(STORAGE_KEY);
		if (savedStore) {
			const store = JSON.parse(savedStore);
			const availableDays = Array.isArray(store.availableDays) ? store.availableDays : DAY_NAMES;
			let changed = false;
			if (!store.patients.some((patient) => patient.id === "patient-003")) {
				store.patients.push(createSeedStore().patients.find((patient) => patient.id === "patient-003"));
				changed = true;
			}
			const demoPatient = store.patients.find((patient) => patient.id === "patient-001");
			if (demoPatient && (
				demoPatient.name === "Alex Reyes"
				|| demoPatient.email === "patient01@diacore.demo"
				|| demoPatient.password === "PatientDemo01!"
				|| demoPatient.email === "aviana@gmail.com"
			)) {
				demoPatient.name = "Aviana Bernardo";
				demoPatient.email = "aviana@gmail.com";
				demoPatient.password = "avianab";
				changed = true;
			}
			if (!Array.isArray(store.laboratory)) {
				store.laboratory = [];
				changed = true;
			}
			if (!Array.isArray(store.dietaryCounseling)) {
				store.dietaryCounseling = [];
				changed = true;
			}
			["nutritionAssessments", "dietPlans", "nutritionFollowUps"].forEach((key) => {
				if (!Array.isArray(store[key])) {
					store[key] = [];
					changed = true;
				}
			});
			if (!Array.isArray(store.prescriptions)) {
				store.prescriptions = [];
				changed = true;
			}
			["nursingCarePlans", "nursingAssessments", "treatmentMonitoring", "dialysisSessions", "medicationAdministrations", "laboratoryFollowUps", "patientEndorsements"].forEach((key) => {
				if (!Array.isArray(store[key])) {
					store[key] = [];
					changed = true;
				}
			});
			if (!Number.isInteger(store.nurseSampleRecordsVersion) || store.nurseSampleRecordsVersion < 1) {
				store.nurseSampleRecordsVersion = 1;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 2) {
				["nursingAssessments", "treatmentMonitoring", "notes"].forEach((collection) => {
					store[collection].filter((record) => record.isSample).forEach((record) => {
						if (record.observedAt && /^\d{4}-\d{2}-\d{2}$/.test(record.observedAt)) {
							record.observedAt = `${record.observedAt}T00:00`;
						}
						if (collection === "notes" && record.createdAt && /^\d{4}-\d{2}-\d{2}$/.test(record.createdAt)) {
							record.createdAt = `${record.createdAt}T00:00`;
						}
					});
				});
				store.nurseSampleRecordsVersion = 2;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 3) {
				const sampleDate = new Date().toISOString().slice(0, 10);
				const administeredAt = new Date();
				administeredAt.setMinutes(administeredAt.getMinutes() - administeredAt.getTimezoneOffset());
				const sampleAdminTime = administeredAt.toISOString().slice(0, 16);
				const sampleMedicationOrders = [
					{ product: "Darbepoetin Alfa (Aranesp)", dosage: "40 mcg", route: "IV", frequency: "Once weekly" },
					{ product: "Calcium Carbonate (Tums) – Phosphorus binder", dosage: "667 mg", route: "Oral", frequency: "3 times daily with meals" },
					{ product: "Iron Sucrose (Venofer)", dosage: "100 mg", route: "IV", frequency: "Once weekly" }
				];
				store.patients.filter((patient) => /@diacore\.demo$/i.test(patient.email || "")).forEach((patient) => {
					const hasMedicationData = store.prescriptions.some((record) => record.patientId === patient.id && record.type === "medication")
						|| store.medicationAdministrations.some((record) => record.patientId === patient.id);
					if (hasMedicationData) return;
					sampleMedicationOrders.forEach((medication, index) => {
						const prescriptionId = `prescription-mar-${patient.id}-${index + 1}`;
						store.prescriptions.push({
							id: prescriptionId,
							patientId: patient.id,
							type: "medication",
							...medication,
							date: sampleDate,
							instructions: ""
						});
						store.medicationAdministrations.push({
							id: `med-admin-${patient.id}-${index + 1}`,
							patientId: patient.id,
							prescriptionId,
							...medication,
							administeredAt: sampleAdminTime,
							note: "",
							createdAt: new Date().toISOString(),
							nurseId: "demo",
							nurseName: "Nurse Demo"
						});
					});
				});
				store.nurseSampleRecordsVersion = 3;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 4) {
				const defaultScheduleDays = ["Monday", "Wednesday", "Friday"].filter((day) => availableDays.includes(day));
				const scheduleDays = defaultScheduleDays.length ? defaultScheduleDays : availableDays.slice(0, 3);
				const demoSchedules = {
					"patient-001": { timeIn: "07:00", timeOut: "11:00", accessSite: "AV fistula" },
					"patient-002": { timeIn: "12:00", timeOut: "16:00", accessSite: "Peritoneal catheter" },
					"patient-003": { timeIn: "08:00", timeOut: "12:00", accessSite: "AV graft" }
				};
				store.patients.filter((patient) => /@diacore\.demo$/i.test(patient.email || "")).forEach((patient) => {
					const schedule = demoSchedules[patient.id];
					if (!schedule) return;
					if (!patient.dialysisDays?.some((day) => availableDays.includes(day))) {
						patient.dialysisDays = scheduleDays;
						changed = true;
					}
					["timeIn", "timeOut", "accessSite"].forEach((key) => {
						if (!patient[key]) {
							patient[key] = schedule[key];
							changed = true;
						}
					});
				});
				store.nurseSampleRecordsVersion = 4;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 5) {
				const sampleDate = new Date().toISOString().slice(0, 10);
				const administeredAt = new Date();
				administeredAt.setMinutes(administeredAt.getMinutes() - administeredAt.getTimezoneOffset());
				const sampleAdminTime = administeredAt.toISOString().slice(0, 16);
				const sampleMedicationOrders = [
					{ product: "Darbepoetin Alfa (Aranesp)", dosage: "40 mcg", route: "IV", frequency: "Once weekly" },
					{ product: "Calcium Carbonate (Tums) – Phosphorus binder", dosage: "667 mg", route: "Oral", frequency: "3 times daily with meals" },
					{ product: "Iron Sucrose (Venofer)", dosage: "100 mg", route: "IV", frequency: "Once weekly" }
				];
				store.patients.filter((patient) => /@diacore\.demo$/i.test(patient.email || "")).forEach((patient) => {
					sampleMedicationOrders.forEach((medication, index) => {
						const prescriptionId = `prescription-mar-${patient.id}-${index + 1}`;
						let prescription = store.prescriptions.find((record) => record.id === prescriptionId && record.patientId === patient.id);
						if (!prescription) {
							prescription = {
								id: prescriptionId,
								patientId: patient.id,
								type: "medication",
								...medication,
								date: sampleDate,
								instructions: ""
							};
							store.prescriptions.push(prescription);
							changed = true;
						}
						if (store.medicationAdministrations.some((record) => record.patientId === patient.id && record.prescriptionId === prescription.id)) return;
						store.medicationAdministrations.push({
							id: `med-admin-${patient.id}-${index + 1}`,
							patientId: patient.id,
							prescriptionId: prescription.id,
							product: prescription.product,
							dosage: prescription.dosage,
							route: prescription.route,
							frequency: prescription.frequency || prescription.instructions || "",
							administeredAt: sampleAdminTime,
							note: "",
							createdAt: new Date().toISOString(),
							nurseId: "demo",
							nurseName: "Nurse Demo"
						});
						changed = true;
					});
				});
				store.nurseSampleRecordsVersion = 5;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 6) {
				const sampleDate = new Date().toISOString().slice(0, 10);
				const administeredAt = new Date();
				administeredAt.setMinutes(administeredAt.getMinutes() - administeredAt.getTimezoneOffset());
				const sampleAdminTime = administeredAt.toISOString().slice(0, 16);
				const sampleMedicationOrders = [
					{ product: "Darbepoetin Alfa (Aranesp)", dosage: "40 mcg", route: "IV", frequency: "Once weekly" },
					{ product: "Calcium Carbonate (Tums) – Phosphorus binder", dosage: "667 mg", route: "Oral", frequency: "3 times daily with meals" },
					{ product: "Iron Sucrose (Venofer)", dosage: "100 mg", route: "IV", frequency: "Once weekly" }
				];
				store.patients.forEach((patient) => {
						const hasMedicationData = store.prescriptions.some((record) => record.patientId === patient.id && record.type === "medication")
							|| store.medicationAdministrations.some((record) => record.patientId === patient.id);
						if (hasMedicationData) return;
					sampleMedicationOrders.forEach((medication, index) => {
						const prescriptionId = `prescription-mar-${patient.id}-${index + 1}`;
						let prescription = store.prescriptions.find((record) => record.id === prescriptionId && record.patientId === patient.id);
						if (!prescription) {
							prescription = {
								id: prescriptionId,
								patientId: patient.id,
								type: "medication",
								...medication,
								date: sampleDate,
								instructions: ""
							};
							store.prescriptions.push(prescription);
							changed = true;
						}
						if (store.medicationAdministrations.some((record) => record.patientId === patient.id && record.prescriptionId === prescription.id)) return;
						store.medicationAdministrations.push({
							id: `med-admin-${patient.id}-${index + 1}`,
							patientId: patient.id,
							prescriptionId: prescription.id,
							product: prescription.product,
							dosage: prescription.dosage,
							route: prescription.route,
							frequency: prescription.frequency || prescription.instructions || "",
							administeredAt: sampleAdminTime,
							note: "",
							createdAt: new Date().toISOString(),
							nurseId: "demo",
							nurseName: "Nurse Demo"
						});
						changed = true;
					});
				});
				store.nurseSampleRecordsVersion = 6;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 7) {
				const sampleDate = new Date().toISOString().slice(0, 10);
				const administeredAt = new Date();
				administeredAt.setMinutes(administeredAt.getMinutes() - administeredAt.getTimezoneOffset());
				const sampleAdminTime = administeredAt.toISOString().slice(0, 16);
				const sampleMedicationOrders = [
					{ product: "Epoetin Alfa", dosage: "4,000 IU", route: "Subcutaneous", frequency: "2/week" },
					{ product: "Calcium Acetate", dosage: "667 mg", route: "PO", frequency: "TID" },
					{ product: "Iron Sucrose", dosage: "100 mg", route: "IV", frequency: "1/week" }
				];
				store.patients.forEach((patient) => {
					const hasMedicationData = store.prescriptions.some((record) => record.patientId === patient.id && String(record.type).toLowerCase() === "medication")
						|| store.medicationAdministrations.some((record) => record.patientId === patient.id);
					if (hasMedicationData) return;
					sampleMedicationOrders.forEach((medication, index) => {
						const prescriptionId = `prescription-mar-v7-${patient.id}-${index + 1}`;
						store.prescriptions.push({
							id: prescriptionId,
							patientId: patient.id,
							type: "medication",
							...medication,
							date: sampleDate,
							instructions: ""
						});
						if (index < 2) {
							store.medicationAdministrations.push({
								id: `med-admin-v7-${patient.id}-${index + 1}`,
								patientId: patient.id,
								prescriptionId,
								...medication,
								administeredAt: sampleAdminTime,
								note: "",
								createdAt: new Date().toISOString(),
								nurseId: "NURSE-02",
								nurseName: "Nurse 02"
							});
						}
					});
					changed = true;
				});
				store.nurseSampleRecordsVersion = 7;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 8) {
				const sampleDate = new Date().toISOString().slice(0, 10);
				const administeredAt = new Date();
				administeredAt.setMinutes(administeredAt.getMinutes() - administeredAt.getTimezoneOffset());
				const sampleAdminTime = administeredAt.toISOString().slice(0, 16);
				const sampleMedicationOrders = [
					{ product: "Epoetin Alfa", dosage: "4,000 IU", route: "Subcutaneous", frequency: "2/week" },
					{ product: "Calcium Acetate", dosage: "667 mg", route: "PO", frequency: "TID" },
					{ product: "Iron Sucrose", dosage: "100 mg", route: "IV", frequency: "1/week" }
				];
				store.patients.forEach((patient) => {
					sampleMedicationOrders.forEach((medication, index) => {
						const prescriptionId = `prescription-mar-v7-${patient.id}-${index + 1}`;
						let prescription = store.prescriptions.find((record) => record.id === prescriptionId && record.patientId === patient.id);
						if (!prescription) {
							prescription = {
								id: prescriptionId,
								patientId: patient.id,
								type: "medication",
								...medication,
								date: sampleDate,
								instructions: "",
								isNurseMARSample: true
							};
							store.prescriptions.push(prescription);
							changed = true;
						} else if (!prescription.isNurseMARSample) {
							prescription.isNurseMARSample = true;
							changed = true;
						}
						const existingAdministration = store.medicationAdministrations.find((record) => record.patientId === patient.id && record.prescriptionId === prescriptionId);
						if (index < 2 && !existingAdministration) {
							store.medicationAdministrations.push({
								id: `med-admin-v7-${patient.id}-${index + 1}`,
								patientId: patient.id,
								prescriptionId,
								...medication,
								administeredAt: sampleAdminTime,
								note: "",
								createdAt: new Date().toISOString(),
								nurseId: "NURSE-02",
								nurseName: "Nurse 02"
							});
							changed = true;
						}
					});
				});
				store.nurseSampleRecordsVersion = 8;
				changed = true;
			}
			if (store.nurseSampleRecordsVersion < 9) {
				["nursingCarePlans", "nursingAssessments", "treatmentMonitoring", "laboratoryFollowUps", "patientEndorsements", "notes"].forEach((collection) => {
					const records = store[collection];
					store[collection] = records.filter((record) => !record.isSample);
					if (store[collection].length !== records.length) changed = true;
				});
				store.nurseSampleRecordsVersion = 9;
				changed = true;
			}
			if (!Array.isArray(store.doctorSchedules)) {
				store.doctorSchedules = [];
				changed = true;
			}
			if (!Array.isArray(store.patientScheduleRequests)) {
				store.patientScheduleRequests = [];
				changed = true;
			}
			["billingPayments", "billingReceipts", "philhealthClaims", "billingNotificationsRead"].forEach((key) => {
				if (!Array.isArray(store[key])) { store[key] = []; changed = true; }
			});
			if (!store.staffRecords || typeof store.staffRecords !== "object" || Array.isArray(store.staffRecords)) {
				store.staffRecords = {};
				changed = true;
			}
			if (!Array.isArray(store.receptionAppointments)) {
				store.receptionAppointments = [];
				changed = true;
			}
			if (!Array.isArray(store.staffNotifications)) {
				store.staffNotifications = [];
				changed = true;
			}
			if (!Array.isArray(store.contactMessages)) {
				store.contactMessages = [];
				changed = true;
			}
			if (!Array.isArray(store.materialUsage)) {
				store.materialUsage = [];
				changed = true;
			}
			if (Array.isArray(store.bills)) {
				store.bills.forEach((bill) => {
					if (bill.description !== "HEMODIALYSIS") {
						bill.description = "HEMODIALYSIS";
						changed = true;
					}
					if (!Array.isArray(bill.equipmentUsed)) {
						bill.equipmentUsed = [];
						changed = true;
					}
				});
			}
			const patientNumbersBeforeMigration = store.patients.map((patient) => patient.patientNumber);
			store.patients.forEach((patient) => {
				if (patient.center && patient.center !== "Sumulong") {
					patient.center = "Sumulong";
					changed = true;
				}
				if (patient.dialysisType !== "Hemodialysis") {
					patient.dialysisType = "Hemodialysis";
					changed = true;
				}
			});
			ensurePatientNumbers(store.patients);
			if (store.patients.some((patient, index) => patient.patientNumber !== patientNumbersBeforeMigration[index])) changed = true;
			const savedAdmins = Array.isArray(store.admins) ? store.admins : [];
			const seededAdmins = createSeedAdmins();
			const migrateLegacyStaffRoster = 			![1, 2, 3].includes(store.staffRosterVersion);
						const migrateStaffRoster = store.staffRosterVersion !== 3;
			store.admins = seededAdmins.map((admin) => {
				const savedAdmin = savedAdmins.find((entry) => entry.id === admin.id);
				if (!savedAdmin) {
					changed = true;
					return admin;
				}
				const accountNumber = Number(admin.id.slice("admin-".length));
				if (migrateLegacyStaffRoster && accountNumber <= 12) {
					if (savedAdmin.email !== admin.email || savedAdmin.password !== admin.password
						|| savedAdmin.username !== admin.username || savedAdmin.name !== admin.name
						|| savedAdmin.position !== admin.position) changed = true;
					return {
						...savedAdmin,
						email: admin.email,
						password: admin.password,
						username: admin.username,
						name: admin.name,
						position: admin.position
					};
				}
				const paddedNumber = String(accountNumber).padStart(2, "0");
				const legacyAdminEmail = `admin${accountNumber}@diacore.com`;
				const legacyAdminPassword = `admin${ADMIN_NUMBER_WORDS[accountNumber - 1]}${accountNumber}`;
				const previousDoctorEmail = `doctor${accountNumber}@diacore.com`;
				const previousDoctorPassword = `doctor${accountNumber}`;
				const savedEmail = String(savedAdmin.email || "").trim().toLowerCase();
				const isLegacyDefaultCredentials = savedEmail === legacyAdminEmail && savedAdmin.password === legacyAdminPassword;
				const isPreviousDoctorCredentials = accountNumber <= 3
					&& savedEmail === previousDoctorEmail
					&& savedAdmin.password === previousDoctorPassword;
				const email = isLegacyDefaultCredentials || isPreviousDoctorCredentials
					? admin.email
					: String(savedAdmin.email || admin.email).trim().toLowerCase();
				const password = isLegacyDefaultCredentials || isPreviousDoctorCredentials || typeof savedAdmin.password !== "string"
					? admin.password
					: savedAdmin.password;
				const previousDefaultNames = [`DIACORE Admin ${paddedNumber}`, ...(accountNumber <= 3 ? [`DIACORE Doctor ${paddedNumber}`] : [])];
				const name = previousDefaultNames.includes(savedAdmin.name) ? admin.name : savedAdmin.name;
				const previousDefaultPositions = accountNumber <= 3 ? ["Admin", "Doctor"] : ["Admin"];
				const previousRosterPositions = {
					"admin-01": ["Nephrologist", "Center Administrator/Admin"],
					"admin-07": ["Medtech"],
					"admin-10": ["Nurse"],
					"admin-11": ["Nurse"]
				};
				const isPreviousRosterPosition = migrateStaffRoster
					&& (previousRosterPositions[admin.id] || []).includes(savedAdmin.position);
				const position = isPreviousRosterPosition || previousDefaultPositions.includes(savedAdmin.position)
					? admin.position
					: savedAdmin.position;
				if (savedAdmin.email !== email || savedAdmin.password !== password || savedAdmin.username !== admin.username
					|| savedAdmin.name !== name || savedAdmin.position !== position) changed = true;
				return { ...savedAdmin, email, password, username: admin.username, name, position };
			});
			if (migrateStaffRoster) {
				store.staffRosterVersion = 3;
				changed = true;
			}
			if (savedAdmins.length !== seededAdmins.length) changed = true;
			if (!Array.isArray(store.equipment)) {
				store.equipment = createSeedEquipment();
				changed = true;
			} else {
				store.equipment = store.equipment.map((item) => ({
					...item,
					stock: Math.max(0, Number(item.stock) || 0),
					unitPrice: Math.max(0, Number(item.unitPrice) || 0),
					usedQuantity: Math.max(0, Number(item.usedQuantity) || 0),
					usedCost: Math.max(0, Number(item.usedCost) || 0)
				}));
			}
			if (!Array.isArray(store.equipmentCatalog)) {
				store.equipmentCatalog = createSeedEquipmentCatalog();
				changed = true;
			}
			if (!Array.isArray(store.pharmacyMedicines)) {
				store.pharmacyMedicines = createSeedPharmacyMedicines();
				changed = true;
			}
			if (!Array.isArray(store.pharmacySuppliers)) {
				store.pharmacySuppliers = createSeedPharmacySuppliers();
				changed = true;
			}
		["pharmacyBatches", "pharmacyTransactions", "pharmacyDeliveries", "medtechResults"].forEach((key) => {
				if (!Array.isArray(store[key])) {
					store[key] = key === "pharmacyBatches" ? createSeedPharmacyBatches(store.pharmacyMedicines) : [];
					changed = true;
				}
			});
		const masterMedicines = createSeedPharmacyMedicines();
		const existingItemCodes = new Set(store.pharmacyMedicines.map((medicine) => medicine.itemCode).filter(Boolean));
		const newMasterMedicines = masterMedicines.filter((medicine) => !existingItemCodes.has(medicine.itemCode));
		if (newMasterMedicines.length) {
			store.pharmacyMedicines.push(...newMasterMedicines);
			store.pharmacyBatches.push(...createSeedPharmacyBatches(newMasterMedicines));
			changed = true;
		}
		const legacyPharmacySeeds = {
			"medicine-001": ["Amoxicillin", "Amoxil"],
			"medicine-002": ["Amlodipine", "Norvasc"],
			"medicine-003": ["Epoetin Alfa", "Eprex"],
			"medicine-004": ["Iron Sucrose", "Venofer"],
			"medicine-005": ["Calcium Acetate", "PhosLo"],
			"medicine-006": ["Calcium Carbonate", "Tums"]
		};
		store.pharmacyMedicines.forEach((medicine) => {
			const legacyIdentity = legacyPharmacySeeds[medicine.id];
			if (legacyIdentity && !medicine.itemCode && medicine.genericName === legacyIdentity[0] && medicine.brandName === legacyIdentity[1] && !medicine.isArchived) {
				medicine.isArchived = true;
				store.pharmacyBatches.filter((batch) => batch.medicineId === medicine.id).forEach((batch) => { batch.isArchived = true; });
				changed = true;
			}
		});
		if (!Array.isArray(store.medtechRequests)) {
				store.medtechRequests = createSeedMedtechRequests(store.patients);
				changed = true;
			}
			store.medtechRequests.forEach((request) => {
				["collectionTime", "receivedTime"].forEach((key) => {
					if (/^\d{2}:\d{2}$/.test(String(request[key] || ""))) {
						request[key] = `${request.requestDate || new Date().toISOString().slice(0, 10)}T${request[key]}`;
						changed = true;
					}
				});
				if (!request.specimenStatus) {
					request.specimenStatus = request.status === "Pending" ? "Pending collection" : request.status === "Rejected" ? "Rejected" : "Received";
					changed = true;
				}
			});
			store.patients.forEach((patient) => {
				const validDays = (patient.dialysisDays || []).filter((day) => availableDays.includes(day));
				if (validDays.length !== (patient.dialysisDays || []).length) {
					patient.dialysisDays = validDays;
					changed = true;
				}
			});
			if (changed) saveStore(store);
			return store;
		}
		const store = createSeedStore();
		saveStore(store);
		return store;
	} catch (error) {
		console.error("DIACORE demo storage is unavailable", error);
		return createSeedStore();
	}
}

function saveStore(store) {
	const json = JSON.stringify(store);
	localStorage.setItem(STORAGE_KEY, json);
	if (remoteSync) {
		remoteSync.setDoc(remoteSync.ref, { json }).catch((error) => console.error("Firestore save failed", error));
	}
}

const FIREBASE_CONFIG = {
	apiKey: "AIzaSyDAikKBNxYr5u7xEiMUOsimtvvyU7HT5e0",
	authDomain: "diacore-ddd72.firebaseapp.com",
	projectId: "diacore-ddd72",
	storageBucket: "diacore-ddd72.firebasestorage.app",
	messagingSenderId: "365273530792",
	appId: "1:365273530792:web:1380c4f3754b47b6d15d9d",
	measurementId: "G-440QYQ0E3G"
};
let remoteSync = null;

// Firestore holds the shared copy; localStorage is only a local cache.
async function initRemoteSync() {
	try {
		const base = "https://www.gstatic.com/firebasejs/13.0.0/";
		const [{ initializeApp, getApps, getApp }, { getFirestore, doc, getDoc, setDoc, onSnapshot }] = await Promise.all([
			import(base + "firebase-app.js"),
			import(base + "firebase-firestore.js")
		]);
		const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
		const ref = doc(getFirestore(app), "diacore", "store");
		const snap = await getDoc(ref);
		if (snap.exists()) {
			localStorage.setItem(STORAGE_KEY, snap.data().json);
		} else {
			const local = localStorage.getItem(STORAGE_KEY) || JSON.stringify(createSeedStore());
			localStorage.setItem(STORAGE_KEY, local);
			await setDoc(ref, { json: local });
		}
		remoteSync = { ref, setDoc };
		onSnapshot(ref, (change) => {
			if (change.metadata.hasPendingWrites || !change.exists()) return;
			const json = change.data().json;
			if (json === localStorage.getItem(STORAGE_KEY)) return;
			localStorage.setItem(STORAGE_KEY, json);
			const active = document.activeElement;
			if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
			window.location.reload();
		});
	} catch (error) {
		console.error("Firestore sync unavailable, using local data only", error);
	}
}

function makeId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHTML(value) {
	return String(value ?? "").replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;"
	})[character]);
}

function formatTimeWithPeriod(value) {
	const time = String(value ?? "");
	const match = time.match(/^(\d{1,2}):(\d{2})$/);
	if (!match) return time;
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	if (hours > 23 || minutes > 59) return time;
	const period = hours < 12 ? "AM" : "PM";
	return `${hours % 12 || 12}:${match[2]} ${period}`;
}

function formatMoney(value) {
	return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function getLaboratoryReference(testId, gender) {
	const test = LABORATORY_TESTS.find((entry) => entry.id === testId);
	return test ? test.range(gender) : "Reference range not available";
}

function getLaboratoryStatus(testId, result, gender) {
	const test = LABORATORY_TESTS.find((entry) => entry.id === testId);
	const value = String(result || "").trim();
	if (!value) return { label: "Not entered", abnormal: false };
	if (!test) return { label: "No reference available", abnormal: false };
	if (test.qualitative) {
		const normalizedValue = value.toLowerCase();
		if (test.qualitative.normal.includes(normalizedValue)) return { label: "Normal", abnormal: false };
		if (["reactive", "positive", "detected"].includes(normalizedValue)) return { label: "Abnormal", abnormal: true };
		return { label: "Review result", abnormal: false };
	}
	const match = value.replace(/,/g, "").match(/[-+]?\d*\.?\d+/);
	if (!match) return { label: "Review result", abnormal: false };
	const numericValue = Number(match[0]);
	if (test.bounds) {
		const bounds = test.bounds(gender);
		if (!bounds) return { label: "Needs sex info", abnormal: false };
		if (numericValue < bounds[0]) return { label: "Below range", abnormal: true };
		if (numericValue > bounds[1]) return { label: "Above range", abnormal: true };
		return { label: "Normal", abnormal: false };
	}
	if (Number.isFinite(test.minimum)) {
		return numericValue < test.minimum
			? { label: "Below target", abnormal: true }
			: { label: "Meets target", abnormal: false };
	}
	return { label: "Interpret with paired result", abnormal: false };
}

function renderLaboratoryGroups(patient, records, editable) {
	const stripSex = (text) => text.replace(/^(Male|Female): /, "");
	const body = LABORATORY_GROUPS.map((group) => {
		const rows = group.tests.map(([testId, label]) => {
			const test = LABORATORY_TESTS.find((entry) => entry.id === testId);
			const male = stripSex(test.range("Male"));
			const female = stripSex(test.range("Female"));
			const bySex = male !== female;
			const latest = records.find((record) => (record.testId || LABORATORY_TESTS.find((entry) => entry.name === record.testName)?.id) === testId);
			const status = latest ? getLaboratoryStatus(testId, latest.results, latest.patientGender || patient.gender) : null;
			const resultCell = editable
				? `<input name="result-${testId}" aria-label="${escapeHTML(label)} result" placeholder="Result" autocomplete="off">`
				: escapeHTML(latest?.results || "Not recorded");
			const statusCell = editable
				? `<span class="laboratory-status" data-lab-status>—</span>`
				: `<span class="${status?.abnormal ? "laboratory-status-abnormal" : "laboratory-status"}">${escapeHTML(status?.label || "—")}</span>`;
			return `<tr data-lab-row="${testId}"><td>${escapeHTML(label)}</td><td>${bySex ? "Male<br>Female" : "All"}</td><td>${bySex ? `${escapeHTML(male)}<br>${escapeHTML(female)}` : escapeHTML(male)}</td><td>${resultCell}</td><td>${statusCell}</td></tr>`;
		}).join("");
		return `<tr class="laboratory-group-header"><th colspan="5">${escapeHTML(group.title)}</th></tr>${rows}`;
	}).join("");
	return `<div class="table-wrap laboratory-table-wrap"><table class="laboratory-results-table"><thead><tr><th>Test</th><th>Sex</th><th>Normal values</th><th>Result of patient</th><th>Status</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderLaboratoryRecords(records, patient) {
	if (!records.length) return `<p class="empty-state">No laboratory records for this patient yet.</p>`;
	const rows = records.map((record) => {
		const testId = record.testId || LABORATORY_TESTS.find((entry) => entry.name === record.testName)?.id || "";
		const test = LABORATORY_TESTS.find((entry) => entry.id === testId);
		const gender = record.patientGender || patient.gender;
		const status = getLaboratoryStatus(testId, record.results, gender);
		return `<tr><td>${escapeHTML(record.date)}</td><td>${escapeHTML(record.testName || test?.name || "Laboratory test")}</td><td>${escapeHTML(record.referenceRange || getLaboratoryReference(testId, gender))}</td><td>${escapeHTML(record.results)}</td><td class="${status.abnormal ? "laboratory-status-abnormal" : "laboratory-status"}">${escapeHTML(status.label)}</td></tr>${record.notes ? `<tr class="laboratory-note-row"><td colspan="5"><strong>Notes:</strong> ${escapeHTML(record.notes)}</td></tr>` : ""}`;
	}).join("");
	return `<div class="table-wrap laboratory-table-wrap"><table class="laboratory-results-table"><thead><tr><th>Date</th><th>Test</th><th>Normal values / reference</th><th>Result</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function updateLaboratoryEntryPreview(form, patient) {
	form.querySelectorAll("[data-lab-row]").forEach((row) => {
		const input = row.querySelector("input");
		const statusElement = row.querySelector("[data-lab-status]");
		const status = getLaboratoryStatus(row.dataset.labRow, input.value, patient.gender);
		statusElement.textContent = input.value.trim() ? status.label : "—";
		statusElement.className = status.abnormal && input.value.trim() ? "laboratory-status-abnormal" : "laboratory-status";
	});
}

function calculateEquipmentAmount(item) {
	const quantity = Math.max(0, Number(item.quantity) || 0);
	return {
		minimum: quantity * Math.max(0, Number(item.priceMin) || 0),
		maximum: quantity * Math.max(0, Number(item.priceMax) || 0),
		openEnded: quantity > 0 && Boolean(item.openEnded)
	};
}

function formatEquipmentRange(amount) {
	return `${formatMoney(amount.minimum)} - ${formatMoney(amount.maximum)}${amount.openEnded ? "+" : ""}`;
}

function getActivitySection(text) {
	const normalizedText = String(text || "").toLowerCase();
	if (/equipment|inventory|stock/.test(normalizedText)) return "equipment";
	if (/bill|payment/.test(normalizedText)) return "billing";
	if (/profile|patient information|account registered|patient record/.test(normalizedText)) return "profile";
	if (/schedule|availability/.test(normalizedText)) return "schedule";
	if (/nursing note|care note/.test(normalizedText)) return "notes";
	if (/laboratory|lab result|test result/.test(normalizedText)) return "laboratory";
	if (/dietary|nutrition counsel/.test(normalizedText)) return "dietary-nutrition";
	if (/announcement/.test(normalizedText)) return "announcements";
	if (/message/.test(normalizedText)) return "messages";
	return "general";
}

function getActivitySectionLabel(section) {
	return ({
		equipment: "Equipment & Inventory",
		billing: "Billing",
		profile: "Profile",
		schedule: "Schedule",
		notes: "Nursing notes",
		laboratory: "Laboratory",
		"dietary-nutrition": "Dietary & Nutrition Counseling",
		announcements: "Announcements",
		messages: "Messages",
		general: "General"
	})[section] || "General";
}

function groupActivities(entries) {
	const groups = new Map();
	entries.forEach((entry) => {
		const section = entry.section || getActivitySection(entry.text);
		if (!groups.has(section)) groups.set(section, []);
		groups.get(section).push(entry);
	});
	return groups;
}

function addAudit(store, text, section = getActivitySection(text)) {
	store.audit.unshift({ id: makeId("audit"), text, section, date: new Date().toLocaleString(), seenBy: [] });
	store.audit = store.audit.slice(0, 100);
}

function addNotification(store, patientId, text, section = getActivitySection(text)) {
	store.notifications.unshift({ id: makeId("notification"), patientId, text, section, date: new Date().toLocaleString(), read: false });
}

function setSession(role, userId) {
	localStorage.setItem(SESSION_KEY, JSON.stringify({ role, userId }));
}

function getSession() {
	try {
		return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
	} catch {
		return null;
	}
}

function setupAccountBackgroundVideo() {
	const video = document.querySelector("#account-background-video");
	if (!video) return;

	const forwardDuration = 6;
	const reverseFrameDuration = 1000 / 24;
	let isReversing = false;

	video.addEventListener("timeupdate", () => {
		if (isReversing || !Number.isFinite(video.duration) || video.currentTime < Math.min(forwardDuration, video.duration)) return;

		isReversing = true;
		video.pause();
		const reverseStart = video.currentTime;
		const reverseStartedAt = performance.now();
		let lastSeekAt = 0;

		function reverseFrame(now) {
			const targetTime = Math.max(0, reverseStart - (now - reverseStartedAt) / 1000);
			if (now - lastSeekAt >= reverseFrameDuration || targetTime === 0) {
				video.currentTime = targetTime;
				lastSeekAt = now;
			}
			if (targetTime === 0) {
				isReversing = false;
				video.play().catch((error) => console.error("Could not restart the account background video.", error));
				return;
			}
			window.requestAnimationFrame(reverseFrame);
		}

		window.requestAnimationFrame(reverseFrame);
	});
	video.addEventListener("error", () => console.error("Could not load the account background video.", video.error));
}

function setupLocationSearch() {
	const locationInput = document.querySelector("#location-query");
	if (!locationInput) return;
	const locations = [...document.querySelectorAll(".location-item")];
	const locationEmpty = document.querySelector("#location-empty");
	locationInput.addEventListener("input", () => {
		const query = locationInput.value.trim().toLowerCase();
		let visibleCount = 0;
		locations.forEach((location) => {
			const isMatch = location.dataset.location.includes(query);
			location.hidden = !isMatch;
			if (isMatch) visibleCount += 1;
		});
		locationEmpty.hidden = visibleCount > 0;
	});
}

function setupContactForm() {
	const form = document.querySelector("#contact-form");
	if (!form) return;
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const firstName = String(formData.get("firstName") || "").trim();
		const lastName = String(formData.get("lastName") || "").trim();
		const email = String(formData.get("email") || "").trim();
		const phone = String(formData.get("phone") || "").trim();
		const message = String(formData.get("message") || "").trim();
		const status = form.querySelector("[data-contact-form-status]");
		if (!firstName || !lastName || !email || !phone || !message) {
			status.textContent = "Please complete every field before sending.";
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			status.textContent = "Enter a valid email address.";
			return;
		}
		const store = getStore();
		if (!Array.isArray(store.contactMessages)) store.contactMessages = [];
		if (!Array.isArray(store.staffNotifications)) store.staffNotifications = [];
		const contactMessage = {
			id: makeId("contact-message"),
			firstName,
			lastName,
			email,
			phone,
			message,
			createdAt: new Date().toLocaleString()
		};
		store.contactMessages.unshift(contactMessage);
		store.admins.forEach((admin) => {
			store.staffNotifications.unshift({
				id: makeId("staff-notification"),
				recipientId: admin.id,
				contactMessageId: contactMessage.id,
				type: "contact-message",
				text: `New contact form message from ${firstName} ${lastName}.`,
				date: contactMessage.createdAt,
				read: false
			});
		});
		try {
			saveStore(store);
			status.textContent = "Your message has been sent to the DIACORE admin team.";
			form.reset();
		} catch (error) {
			console.error("Could not save the contact form message.", error);
			status.textContent = "Your message could not be saved. Please try again.";
		}
	});
}

function setupContactMap() {
	const mapButton = document.querySelector("[data-contact-map-open]");
	const mapDialog = document.querySelector("[data-contact-map-dialog]");
	if (!mapButton || !mapDialog) return;
	mapButton.addEventListener("click", () => mapDialog.showModal());
	mapDialog.querySelector("[data-contact-map-close]")?.addEventListener("click", () => mapDialog.close());
	mapDialog.addEventListener("click", (event) => {
		if (event.target === mapDialog) mapDialog.close();
	});
}

function setupAuth() {
	const patientRole = document.querySelector("#patient-role");
	if (!patientRole) return;
	document.querySelectorAll("[data-password-toggle]").forEach((button) => {
		button.addEventListener("click", () => {
			const passwordInput = document.getElementById(button.getAttribute("aria-controls"));
			const showPassword = passwordInput.type === "password";
			passwordInput.type = showPassword ? "text" : "password";
			button.textContent = showPassword ? "Hide" : "Show";
			button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
			button.setAttribute("aria-pressed", String(showPassword));
		});
	});

	const adminRole = document.querySelector("#admin-role");
	const patientTabs = document.querySelector("#patient-tabs");
	const adminTabs = document.querySelector("#admin-tabs");
	const signupForm = document.querySelector("#patient-signup-form");
	const patientLoginForm = document.querySelector("#patient-login-form");
	const adminLoginForm = document.querySelector("#admin-login-form");
	const signupTab = document.querySelector("#patient-signup-tab");
	const patientLoginTab = document.querySelector("#patient-login-tab");
	const recoveryDialog = document.querySelector("#account-recovery-dialog");
	const patientRecoveryForm = document.querySelector("#patient-recovery-form");
	const adminRecoveryForm = document.querySelector("#admin-recovery-form");
	const patientEmailHelp = document.querySelector("#patient-email-help");
	const recoveryTitle = document.querySelector("#account-recovery-title");
	const recoveryIntro = document.querySelector("#account-recovery-intro");
	const adminRecoveryEmailField = adminRecoveryForm.querySelector("[data-recovery-email-field]");
	const adminRecoveryPasswordField = adminRecoveryForm.querySelector("[data-recovery-password-field]");

	function resetRecoveryPasswordToggles() {
		recoveryDialog.querySelectorAll("[data-password-toggle]").forEach((button) => {
			const passwordInput = document.getElementById(button.getAttribute("aria-controls"));
			passwordInput.type = "password";
			button.textContent = "Show";
			button.setAttribute("aria-label", "Show password");
			button.setAttribute("aria-pressed", "false");
		});
	}

	function openAccountRecovery(mode) {
		const isAdmin = adminRole.classList.contains("active");
		const isEmailRecovery = mode === "email";
		patientRecoveryForm.reset();
		adminRecoveryForm.reset();
		resetRecoveryPasswordToggles();
		patientRecoveryForm.querySelector("[data-recovery-message]").textContent = "";
		adminRecoveryForm.querySelector("[data-recovery-message]").textContent = "";
		recoveryDialog.dataset.recoveryMode = mode;
		patientRecoveryForm.hidden = isAdmin || isEmailRecovery;
		adminRecoveryForm.hidden = !isAdmin;
		patientEmailHelp.hidden = isAdmin || !isEmailRecovery;
		recoveryTitle.textContent = isEmailRecovery ? "Change email" : "Change password";
		if (!isAdmin && isEmailRecovery) {
			recoveryIntro.textContent = "";
		} else if (isAdmin) {
			recoveryIntro.textContent = "Verify your admin account name and current password. Only the selected account's settings will be changed.";
			adminRecoveryEmailField.hidden = !isEmailRecovery;
			adminRecoveryEmailField.querySelector("input").disabled = !isEmailRecovery;
			adminRecoveryEmailField.querySelector("input").required = isEmailRecovery;
			adminRecoveryPasswordField.hidden = isEmailRecovery;
			adminRecoveryPasswordField.querySelector("input").disabled = isEmailRecovery;
			adminRecoveryPasswordField.querySelector("input").required = !isEmailRecovery;
		} else {
			recoveryIntro.textContent = "Enter your patient email and current password to choose a new password.";
		}
		recoveryDialog.showModal();
	}

	document.querySelectorAll("[data-account-recovery]").forEach((button) => {
		button.addEventListener("click", () => openAccountRecovery(button.dataset.accountRecovery));
	});
	recoveryDialog.querySelector(".account-recovery-close").addEventListener("click", () => recoveryDialog.close());
	recoveryDialog.addEventListener("click", (event) => {
		if (event.target === recoveryDialog) recoveryDialog.close();
	});
	patientRecoveryForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(patientRecoveryForm));
		const email = String(data.email).trim().toLowerCase();
		const store = getStore();
		const patient = store.patients.find((entry) => String(entry.email || "").trim().toLowerCase() === email && entry.password === String(data.currentPassword));
		const message = patientRecoveryForm.querySelector("[data-recovery-message]");
		if (!patient) {
			message.textContent = "The email address and current password do not match a patient account.";
			return;
		}
		patient.password = String(data.newPassword);
		addAudit(store, `Patient password updated: ${patient.name}`, "profile");
		saveStore(store);
		patientRecoveryForm.reset();
		resetRecoveryPasswordToggles();
		message.textContent = "Password updated. You can now log in with your new password.";
	});
	adminRecoveryForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(adminRecoveryForm));
		const adminName = String(data.adminName).trim().toLowerCase();
		const currentPassword = String(data.currentPassword);
		const store = getStore();
		const matchingAdmins = store.admins.filter((entry) => String(entry.name || "").trim().toLowerCase() === adminName && entry.password === currentPassword);
		const message = adminRecoveryForm.querySelector("[data-recovery-message]");
		if (matchingAdmins.length !== 1) {
			message.textContent = "The admin name and current password do not match one unique account.";
			return;
		}

		const admin = matchingAdmins[0];
		const email = String(data.newEmail || "").trim().toLowerCase();
		const newPassword = String(data.newPassword || "");
		if (email && [...store.admins, ...store.patients].some((account) => account.id !== admin.id && String(account.email || "").trim().toLowerCase() === email)) {
			message.textContent = "That email is already being used by another account.";
			return;
		}
		if (email) admin.email = email;
		if (newPassword) admin.password = newPassword;
		addAudit(store, `Admin login credentials updated: ${admin.name}`, "profile");
		saveStore(store);
		if (email) document.querySelector('#admin-login-form input[name="admin-email"]').value = email;
		adminRecoveryForm.reset();
		resetRecoveryPasswordToggles();
		message.textContent = "Admin account settings updated. You can now log in with your updated details.";
	});

	function showPatientForm(formName) {
		const showSignup = formName === "signup";
		signupForm.hidden = !showSignup;
		patientLoginForm.hidden = showSignup;
		signupTab.classList.toggle("active", showSignup);
		signupTab.setAttribute("aria-selected", String(showSignup));
		patientLoginTab.classList.toggle("active", !showSignup);
		patientLoginTab.setAttribute("aria-selected", String(!showSignup));
	}

	function showRole(role) {
		const isPatient = role === "patient";
		patientRole.classList.toggle("active", isPatient);
		patientRole.setAttribute("aria-pressed", String(isPatient));
		adminRole.classList.toggle("active", !isPatient);
		adminRole.setAttribute("aria-pressed", String(!isPatient));
		patientTabs.hidden = !isPatient;
		adminTabs.hidden = isPatient;
		signupForm.hidden = !isPatient || signupTab.getAttribute("aria-selected") !== "true";
		patientLoginForm.hidden = !isPatient || patientLoginTab.getAttribute("aria-selected") !== "true";
		adminLoginForm.hidden = isPatient;
	}

	patientRole.addEventListener("click", () => showRole("patient"));
	adminRole.addEventListener("click", () => showRole("admin"));
	signupTab.addEventListener("click", () => showPatientForm("signup"));
	patientLoginTab.addEventListener("click", () => showPatientForm("login"));

	signupForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(signupForm);
		const email = String(formData.get("patient-email")).trim().toLowerCase();
		const store = getStore();
		if (store.patients.some((patient) => patient.email === email && patient.password)) {
			signupForm.querySelector(".form-message").textContent = "An account already uses this email. Please log in.";
			return;
		}

		let patient = store.patients.find((entry) => entry.email === email);
		if (patient) {
			patient.name = String(formData.get("patient-name")).trim();
			patient.password = String(formData.get("patient-password"));
		} else {
			patient = {
				id: makeId("patient"),
				patientNumber: nextPatientNumber(store.patients),
				name: String(formData.get("patient-name")).trim(),
				email,
				password: String(formData.get("patient-password")),
				birthday: "",
				age: "",
				gender: "",
				address: "",
				dialysisType: "Hemodialysis",
				center: "Sumulong",
				dialysisDays: [],
				registeredAt: new Date().toISOString().slice(0, 10)
			};
			store.patients.push(patient);
		}
		addAudit(store, `Patient account registered: ${patient.name}`);
		setSession("patient", patient.id);
		saveStore(store);
		window.location.href = "patient.html";
	});

	patientLoginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(patientLoginForm);
		const email = String(formData.get("patient-login-email")).trim().toLowerCase();
		const password = String(formData.get("patient-login-password"));
		const patient = getStore().patients.find((entry) => String(entry.email || "").trim().toLowerCase() === email && entry.password === password);
		if (!patient) {
			patientLoginForm.querySelector(".form-message").textContent = "No matching patient account. Create an account first.";
			return;
		}
		setSession("patient", patient.id);
		window.location.href = "patient.html";
	});

	adminLoginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(adminLoginForm);
		const email = String(formData.get("admin-email")).trim().toLowerCase();
		const password = String(formData.get("admin-password"));
		const admin = getStore().admins.find((entry) => entry.email === email && entry.password === password);
		if (!admin) {
			adminLoginForm.querySelector(".form-message").textContent = "Invalid email or password. Use one of the 14 default demo accounts.";
			return;
		}
		setSession("admin", admin.id);
		window.location.href = "admin.html";
	});
}

function initLocationAndAuth() {
	setupLocationSearch();
	setupAuth();
	setupServicesSlider();
	setupContactForm();
	setupContactMap();
	setupAccountBackgroundVideo();

	const aboutDropdown = document.querySelector("#about-dropdown");
	const aboutDropdownToggle = document.querySelector("#about-dropdown-toggle");
	const aboutDetailSection = document.querySelector("#about-details");
	const aboutDetailClose = aboutDetailSection?.querySelector(".about-detail-close");
	const aboutDetailPages = [...document.querySelectorAll("[data-about-page-content]")];
	const educationSection = document.querySelector("#patient-education");
	const educationClose = educationSection?.querySelector(".education-detail-close");
	const educationTabs = [...document.querySelectorAll("[data-education-tab]")];
	const educationPanels = [...document.querySelectorAll("[data-education-panel]")];
	const educationLink = document.querySelector("[data-education-open]");
	const servicesLink = document.querySelector('.dc-nav a[href="#services"]');
	const servicesSection = document.querySelector('#services');
	const navLinks = document.querySelectorAll('.dc-nav a, .dc-header-action');

	function setAboutDropdownOpen(isOpen) {
		if (!aboutDropdown || !aboutDropdownToggle) return;
		aboutDropdown.classList.toggle("is-open", isOpen);
		aboutDropdownToggle.setAttribute("aria-expanded", String(isOpen));
	}

	function closeAboutPage() {
		if (!aboutDetailSection) return;
		aboutDetailSection.hidden = true;
		aboutDetailSection.classList.remove("is-open");
		document.body.classList.remove("about-open");
		aboutDropdown?.classList.remove("is-current");
	}

	function openAboutPage(pageName) {
		if (!aboutDetailSection) return;
		closeEducationPage();
		closeServicesPanel();
		aboutDetailPages.forEach((page) => {
			page.hidden = page.dataset.aboutPageContent !== pageName;
		});
		aboutDetailSection.hidden = false;
		aboutDetailSection.classList.add("is-open");
		document.body.classList.add("about-open");
		aboutDropdown?.classList.add("is-current");
		setAboutDropdownOpen(false);
		aboutDetailClose?.focus();
	}

	function closeEducationPage() {
		if (!educationSection) return;
		educationSection.hidden = true;
		educationSection.classList.remove("is-open");
		document.body.classList.remove("education-open");
	}

	function selectEducationTopic(topicName, shouldFocus = false) {
		const selectedTab = educationTabs.find((tab) => tab.dataset.educationTab === topicName);
		if (!selectedTab) return;
		educationTabs.forEach((tab) => {
			const isSelected = tab === selectedTab;
			tab.setAttribute("aria-selected", String(isSelected));
			tab.tabIndex = isSelected ? 0 : -1;
		});
		educationPanels.forEach((panel) => {
			panel.hidden = panel.dataset.educationPanel !== topicName;
		});
		if (shouldFocus) selectedTab.focus();
	}

	function openEducationPage(topicName) {
		if (!educationSection) return;
		closeAboutPage();
		closeServicesPanel();
		closeEducationPage();
		selectEducationTopic(topicName);
		educationSection.hidden = false;
		educationSection.classList.add("is-open");
		document.body.classList.add("education-open");
		selectEducationTopic(topicName, true);
	}

	function closeServicesPanel() {
		if (!servicesSection || !servicesLink) return;
		servicesSection.classList.remove('is-open');
		document.body.classList.remove('services-open');
		servicesLink.classList.remove('active');
		servicesLink.setAttribute('aria-expanded', 'false');
	}

	function openServicesPanel() {
		if (!servicesSection || !servicesLink) return;
		closeAboutPage();
		servicesSection.classList.add('is-open');
		document.body.classList.add('services-open');
		servicesLink.classList.add('active');
		servicesLink.setAttribute('aria-expanded', 'true');
	}

	if (servicesLink && servicesSection) {
		servicesLink.addEventListener('click', (event) => {
			event.preventDefault();
			const isOpen = servicesSection.classList.contains('is-open');
			if (isOpen) {
				closeServicesPanel();
			} else {
				openServicesPanel();
			}
		});

		navLinks.forEach((link) => {
			if (link === servicesLink) return;
			link.addEventListener('click', () => {
				if (servicesSection.classList.contains('is-open')) {
					closeServicesPanel();
				}
			});
		});
	}

	if (aboutDropdownToggle && aboutDropdown) {
		aboutDropdownToggle.addEventListener("click", () => {
			const isOpen = aboutDropdown.classList.contains("is-open");
			if (!isOpen && servicesSection?.classList.contains("is-open")) closeServicesPanel();
			setAboutDropdownOpen(!isOpen);
		});
		aboutDropdown.querySelectorAll("[data-about-page]").forEach((button) => {
			button.addEventListener("click", () => openAboutPage(button.dataset.aboutPage));
		});
		document.addEventListener("click", (event) => {
			if (!aboutDropdown.contains(event.target)) setAboutDropdownOpen(false);
		});
	}
	document.querySelectorAll("[data-about-page-trigger]").forEach((button) => {
		button.addEventListener("click", () => openAboutPage(button.dataset.aboutPageTrigger));
	});
	document.querySelectorAll("[data-education-topic]").forEach((button) => {
		button.addEventListener("click", () => openEducationPage(button.dataset.educationTopic));
	});
	educationTabs.forEach((tab, index) => {
		tab.addEventListener("click", () => selectEducationTopic(tab.dataset.educationTab));
		tab.addEventListener("keydown", (event) => {
			if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
			event.preventDefault();
			const nextIndex = event.key === "Home" ? 0
				: event.key === "End" ? educationTabs.length - 1
					: (index + (event.key === "ArrowRight" ? 1 : -1) + educationTabs.length) % educationTabs.length;
			selectEducationTopic(educationTabs[nextIndex].dataset.educationTab, true);
		});
	});
	if (educationLink) {
		educationLink.addEventListener("click", (event) => {
			event.preventDefault();
			openEducationPage(educationTabs[0]?.dataset.educationTab);
		});
	}
	if (educationClose) educationClose.addEventListener("click", closeEducationPage);
	if (aboutDetailClose) aboutDetailClose.addEventListener("click", closeAboutPage);
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeAboutPage();
			closeEducationPage();
			setAboutDropdownOpen(false);
		}
	});
	navLinks.forEach((link) => link.addEventListener("click", () => {
		closeAboutPage();
		if (link !== educationLink) closeEducationPage();
	}));
}

function setupServicesSlider() {
	const visual = document.querySelector('[data-service-visual]');
	if (!visual) return;

	const services = [
		{
			title: "In-Center Hemodialysis",
			description: "The core service where patients visit 2 to 3 times a week for a machine to filter waste and fluid from their blood.",
			source: "Source: Mayo Clinic",
			image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
			alt: "Healthcare professional providing care in a clinical setting"
		},
		{
			title: "Home Dialysis Support & Training",
			description: "Guidance and training programs for patients and caregivers transitioning to home hemodialysis or peritoneal dialysis (PD).",
			source: "",
			image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
			alt: "Care team discussing a patient's treatment plan"
		},
		{
			title: "Routine Lab Testing",
			description: "On-site blood collection and basic metabolic panels to monitor iron, potassium, and calcium levels.",
			source: "",
			image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=85",
			alt: "Clinical laboratory testing equipment"
		},
		{
			title: "Dietary & Nutritional Counseling",
			description: "Specialized guidance from a renal dietitian to manage strict fluid and food restrictions.",
			source: "",
			image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85",
			alt: "Fresh ingredients arranged for nutrition counseling"
		}
	];
	const title = document.querySelector('[data-service-title]');
	const description = document.querySelector('[data-service-description]');
	const source = document.querySelector('[data-service-source]');
	const image = document.querySelector('[data-service-image]');
	const caption = document.querySelector('[data-service-caption]');
	const counts = document.querySelectorAll('[data-service-count], [data-service-count-image]');
	const dots = [...document.querySelectorAll('[data-service-slide]')];
	let activeIndex = 0;
	let pointerStartX = null;

	function showService(index, direction) {
		activeIndex = (index + services.length) % services.length;
		const service = services[activeIndex];
		const count = `${String(activeIndex + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`;
		visual.classList.remove('is-sliding-next', 'is-sliding-previous');
		title.textContent = service.title;
		description.textContent = service.description;
		source.textContent = service.source;
		source.hidden = !service.source;
		image.src = service.image;
		image.alt = service.alt;
		void image.offsetWidth;
		visual.classList.add(direction > 0 ? 'is-sliding-next' : 'is-sliding-previous');
		caption.textContent = service.title;
		counts.forEach((element) => { element.textContent = count; });
		dots.forEach((dot, dotIndex) => {
			const isCurrent = dotIndex === activeIndex;
			dot.classList.toggle('is-current', isCurrent);
			if (isCurrent) dot.setAttribute('aria-current', 'true');
			else dot.removeAttribute('aria-current');
		});
	}

	document.querySelector('[data-service-previous]').addEventListener('click', () => showService(activeIndex - 1, -1));
	document.querySelector('[data-service-next]').addEventListener('click', () => showService(activeIndex + 1, 1));
	dots.forEach((dot) => dot.addEventListener('click', () => {
		const targetIndex = Number(dot.dataset.serviceSlide);
		const difference = targetIndex - activeIndex;
		const direction = Math.abs(difference) <= services.length / 2 ? Math.sign(difference) : -Math.sign(difference);
		if (difference !== 0) showService(targetIndex, direction);
	}));
	visual.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault();
			const direction = event.key === 'ArrowRight' ? 1 : -1;
			showService(activeIndex + direction, direction);
		}
	});
	visual.addEventListener('pointerdown', (event) => {
		pointerStartX = event.clientX;
	});
	visual.addEventListener('pointerup', (event) => {
		if (pointerStartX === null) return;
		const swipeDistance = event.clientX - pointerStartX;
		pointerStartX = null;
		if (Math.abs(swipeDistance) >= 45) {
			const direction = swipeDistance < 0 ? 1 : -1;
			showService(activeIndex + direction, direction);
		}
	});
	visual.addEventListener('pointercancel', () => { pointerStartX = null; });
}

const currentPage = document.body.dataset.page;
Promise.race([initRemoteSync(), new Promise((resolve) => setTimeout(resolve, 8000))]).then(() => {
	if (!currentPage || currentPage === "home") {
		initLocationAndAuth();
	} else {
		initPortal(currentPage);
	}
});

function initPortal(role) {
	const session = getSession();
	if (!session || session.role !== role) {
		window.location.replace("index.html#account");
		return;
	}

	let store = getStore();
	let currentUser = role === "admin"
		? store.admins.find((admin) => admin.id === session.userId)
		: store.patients.find((patient) => patient.id === session.userId);
	if (!currentUser) {
		localStorage.removeItem(SESSION_KEY);
		window.location.replace("index.html#account");
		return;
	}
	const isDoctor = role === "admin"
		&& (DOCTOR_ACCOUNT_IDS.has(currentUser.id) || ["Doctor", "Nephrologist"].includes(currentUser.position));
	const isNephrologist = role === "admin" && DOCTOR_ACCOUNT_IDS.has(currentUser.id);
	const isNurse = role === "admin" && currentUser.position === "Nurse";
	const isBiomedicalTechnician = role === "admin" && currentUser.position === "Biomedical Technician";
	const isDietitian = role === "admin" && currentUser.position === "Dietitian";
	const isMedtech = role === "admin" && currentUser.position === "Medtech";
	const isPharmacy = role === "admin" && currentUser.position === "Pharmacy";
	const isReceptionist = role === "admin" && currentUser.position === "Receptionist";
	const isBilling = role === "admin" && currentUser.position === "Billing";

	const viewContainer = document.querySelector("#portal-content");
	const menu = document.querySelector("#portal-menu");
	const menuToggle = document.querySelector("#menu-toggle");
	const menuClose = document.querySelector("#menu-close");
	const inCenterButton = document.querySelector("#in-center-button");
	const inCenterPanel = document.querySelector("#in-center-panel");
	const inCenterMinimize = document.querySelector("#in-center-minimize");
	let menuLinks = [...document.querySelectorAll("[data-view]")];
	const userLabel = document.querySelector("#portal-user");
	let activeMessagePatientId = role === "patient" ? currentUser.id : store.patients[0]?.id;
	let activeRecordPatientId = "";
	let activeOverviewPatientId = "";
	let dashboardPatientQuery = "";
	let activeBillingPatientId = "";
	let activeProfilePatientId = store.patients[store.patients.length - 1]?.id || "";
	let activeSchedulePatientId = store.patients[0]?.id || "";
	let activeNotePatientId = "";
	let activePrescriptionPatientId = "";
	let activeAssessmentPatientId = "";
	let activeEditingNoteId = "";
	let activeNurseRecordEdit = null;
	let activeEditingDoctorScheduleId = "";
	let activeLaboratoryPatientId = "";
	let activeDietaryPatientId = store.patients[0]?.id || "";
	let activeReceptionPatientId = "";
	let activeEditingReceptionAppointmentId = "";
	const receptionReportState = { type: "Appointments", from: "", to: "" };
	let activeEditingDietPlanId = "";
	let dietitianReportFrom = "";
	let dietitianReportTo = "";
	let dietitianReportType = "Patient nutrition summary";
	let pharmacyReportType = "Current inventory";
	let activeEditingPharmacyInventoryModule = "";
	let activeNursePatientId = store.patients[0]?.id || "";
	let activeNurseMARDate = "";
	let activeAccessPatientId = store.patients[0]?.id || "";
	let activeDoctorPatientId = "";
	let doctorAppointmentView = "upcoming";
	let activeReschedulingDoctorRequestId = "";
	let doctorScheduleEditorOpen = false;
	let profilePhotoDraft = currentUser.photo || "";
	let nursePhotoDraft = currentUser.nursePhoto || "";
	let nurseOwnPhotoDraft = currentUser.photo || "";
	let announcementPhotoDraft = "";
	let announcementPhotoReadId = 0;

	const isCenterAdmin = role === "admin" && currentUser.id === "admin-01";
	const BLANK_ADMIN_VIEWS = new Set(["staff-accounts", "roles", "departments", "audit-logs"]);
	const BLANK_DOCTOR_VIEWS = new Set(["laboratory-results", "clinical-notes", "my-patients", "medical-records", "dialysis-treatment", "patient-education"]);
	const BLANK_TECHNICIAN_VIEWS = new Set(["equipment-status", "maintenance-schedule", "repair-requests"]);
	const doctorViews = [
		["dashboard", "Dashboard"], ["profile", "My Profile"], ["my-patients", "My Patients"], ["appointments", "Appointments"],
		["medical-records", "Medical Records"], ["laboratory-results", "Laboratory Results"], ["clinical-notes", "Clinical Notes"],
		["dialysis-treatment", "Dialysis Treatment"], ["notifications", "Notification"], ["settings", "Settings"]
	];
	const nurseViews = [
		["dashboard", "Dashboard"], ["assigned-patients", "Assigned Patients"], ["dialysis-schedule", "Dialysis Schedule"],
		["medication-administration", "Medication Administration Records (MAR)"], ["nursing-care-plan", "Nursing Care Plan"],
		["nursing-assessment", "Nursing Assessment"], ["treatment-monitoring", "Treatment Monitoring"],
		["laboratory-results", "Laboratory Results"], ["nursing-notes", "Nursing Notes"],
		["patient-endorsement", "Patient Endorsement"], ["notifications", "Notifications"],
		["profile", "My Profile"], ["settings", "Settings"]
	];
	const nurseMenuIcons = {
		dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
		"assigned-patients": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
		"dialysis-schedule": '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h3M8 17h6"/>',
		"machine-inventory": '<path d="M5 3h14v18H5zM9 7h6M9 11h6M9 15h3"/><path d="M3 7h2M19 7h2M3 17h2M19 17h2"/>',
		"medication-administration": '<path d="m10.5 3.5 10 10a4.95 4.95 0 0 1-7 7l-10-10a4.95 4.95 0 0 1 7-7Z"/><path d="m8 6 10 10"/>',
		"nursing-care-plan": '<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z"/><path d="M12 8v6M9 11h6"/>',
		"nursing-assessment": '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
		"treatment-monitoring": '<path d="M3 12h4l2-6 4 12 2-6h6"/><circle cx="12" cy="12" r="10"/>',
		"laboratory-results": '<path d="M9 3h6M10 3v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3"/><path d="M8 15h8"/>',
		"nursing-notes": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
		"patient-endorsement": '<path d="M16 3h5v5M21 3l-7 7"/><path d="M8 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="M8 12h8M8 16h5"/>',
		notifications: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
		reports: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/><path d="M17 9h2v2"/>',
		profile: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
		settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.8Z"/>'
	};
	const technicianViews = [
		["dashboard", "Dashboard"], ["machine-inventory", "Dialysis Machine Inventory"], ["equipment-status", "Equipment Status"],
		["maintenance-schedule", "Maintenance Schedule"], ["inspection-logs", "Inspection Logs"], ["repair-requests", "Repair Requests"],
		["water-treatment", "Water Treatment Monitoring"], ["incident-reports", "Incident Reports"],
		["notifications", "Notifications"], ["profile", "My Profile"], ["settings", "Settings"]
	];
	const dietitianViews = [
		["dashboard", "Dashboard"], ["assigned-patients", "Assigned Patients"], ["nutrition-assessment", "Nutrition Assessment"],
		["diet-plans", "Diet Plans"], ["nutrition-counseling", "Nutrition Counseling"], ["follow-up-schedule", "Follow-up Schedule"],
		["patient-education-materials", "Patient Education Materials"], ["nutrition-reports", "Nutrition Reports"],
		["notifications", "Notifications"], ["profile", "My Profile"], ["settings", "Settings"]
	];
	const medtechViews = [
		["dashboard", "Laboratory Dashboard"], ["laboratory-requests", "Laboratory Requests"], ["specimen-tracking", "Specimen Tracking"],
		["pending-tests", "Pending Tests"], ["enter-laboratory-results", "Enter Laboratory Results"],
		["verified-results", "Verified Results"], ["laboratory-reports", "Laboratory Reports"],
		["notifications", "Notifications"], ["profile", "My Profile"], ["settings", "Settings"]
	];
	const pharmacyViews = [
		["dashboard", "Dashboard"], ["medication-inventory", "Medication Inventory"], ["expiry-monitoring", "Expiry Monitoring"],
		["medication-orders", "Medication Orders & Dispensing"], ["supplier-records", "Supplier Records"], ["inventory-reports", "Inventory Reports"],
		["profile", "My Profile"], ["notifications", "Notifications"], ["settings", "Settings"]
	];
	const receptionistViews = [
		["dashboard", "Dashboard"], ["reception-registration", "Patient Registration"], ["reception-directory", "Patient Directory"],
		["reception-appointments", "Appointments"], ["reception-dialysis-schedule", "Dialysis Schedule"], ["reception-queue", "Check in"],
		["reception-inquiries", "Contact Inquiries"], ["reception-reminders", "Appointment Reminders"], ["reception-reports", "Reports"],
		["reception-profile", "My Profile"], ["reception-settings", "Settings"]
	];
	const billingViews = [
		["dashboard", "Dashboard"], ["patient-billing", "Patient Billing"], ["billing-statement", "Billing Statement"],
		["payment-records", "Payment Records"], ["outstanding-balances", "Outstanding Balances"], ["philhealth-claims", "PhilHealth Claims"],
		["receipt-records", "Official Receipt Records"], ["billing-reports", "Billing Reports"], ["notifications", "Notifications"],
		["profile", "My Profile"], ["settings", "Settings"]
	];
	const adminViews = isCenterAdmin ? [
		["dashboard", "Dashboard Overview"], ["staff-accounts", "Staff Account Management"], ["roles", "Roles & Permissions"],
		["nurses", "Staff Directory"], ["departments", "Department Management"], ["schedule", "Schedules & Operations"],
		["equipment", "Equipment & Supplies Overview"], ["reports", "Operational Reports"], ["audit-logs", "Audit Logs"],
		["settings", "System Settings"], ["notifications", "Notifications"], ["profile", "My Profile"]
	] : isDoctor ? doctorViews : isNurse ? nurseViews : isBiomedicalTechnician ? technicianViews : isDietitian ? dietitianViews : isMedtech ? medtechViews : isPharmacy ? pharmacyViews : isReceptionist ? receptionistViews : isBilling ? billingViews : [
		["profile", "Admin Profile"], ["patients", "Patients Profile"], ["dashboard", "Dashboard"], ["schedule", "Schedule"], ["billing", "Billing"], ["equipment", "Equipment & Inventory"],
		["announcements", "Announcement"], ["reports", "Report"], ["notifications", "Notification"], ["messages", "Message"], ["nurses", "Healthcare Team"], ["settings", "Settings"]
	];
	const patientViews = [
		["announcements", "Announcement"], ["profile", "My Profile"], ["schedule", "Schedule"],
		["laboratory", "Laboratory"], ["billing", "Billing"], ["notifications", "Notification"],
		["messages", "Message"], ["nurses", "Care Team"], ["dietary-nutrition", "Dietary & Nutrition Counseling"],
		["settings", "Settings"]
	];
	const availableViews = role === "admin" ? adminViews : patientViews;
	if (isCenterAdmin || isDoctor || isNurse || isBiomedicalTechnician || isDietitian || isMedtech || isPharmacy || isReceptionist || isBilling) {
		const adminNav = document.querySelector(".portal-nav");
		adminNav.innerHTML = availableViews.map(([view, label]) => `<a href="#${view}" data-view="${view}">${isNurse ? `<svg class="nurse-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nurseMenuIcons[view] || ""}</svg>` : ""}<span>${escapeHTML(label)}</span></a>`).join("");
		menuLinks = [...document.querySelectorAll("[data-view]")];
	}
	if (isNurse) {
		document.body.classList.add("nurse-portal");
		document.querySelector(".portal-brand small").textContent = "NURSE PORTAL";
		document.querySelector(".menu-heading span").textContent = "NURSE MENU";
		document.querySelector("#menu-search-input").placeholder = "Search nurse menu";
		document.querySelector("#menu-search-input").setAttribute("aria-label", "Search nurse menu");
	}
	if (isDoctor) document.body.classList.add("doctor-portal");
	if (isDietitian) {
		document.body.classList.add("dietitian-portal");
		document.querySelector(".portal-brand small").textContent = "DIETITIAN PORTAL";
		document.querySelector(".menu-heading span").textContent = "DIETITIAN MENU";
		document.querySelector("#menu-search-input").placeholder = "Search dietitian menu";
		document.querySelector("#menu-search-input").setAttribute("aria-label", "Search dietitian menu");
	}
	if (isBilling) document.body.classList.add("billing-portal");
	if (isReceptionist) {
		document.body.classList.add("receptionist-portal");
		document.querySelector(".portal-brand small").textContent = "RECEPTIONIST PORTAL";
		document.querySelector(".menu-heading span").textContent = "RECEPTION MENU";
		document.querySelector("#menu-search-input").placeholder = "Search reception menu";
		document.querySelector("#menu-search-input").setAttribute("aria-label", "Search reception menu");
	}
	if (isMedtech || isPharmacy) {
		const portalLabel = isPharmacy ? "PHARMACY" : "MEDTECH";
		document.body.classList.add(isPharmacy ? "pharmacy-portal" : "medtech-portal");
		document.querySelector(".portal-brand small").textContent = `${portalLabel} PORTAL`;
		document.querySelector(".menu-heading span").textContent = `${portalLabel} MENU`;
		document.querySelector("#menu-search-input").placeholder = `Search ${portalLabel.toLowerCase()} menu`;
		document.querySelector("#menu-search-input").setAttribute("aria-label", `Search ${portalLabel.toLowerCase()} menu`);
	}
	const requestedView = window.location.hash.slice(1);
	let activeView = availableViews.some(([view]) => view === requestedView)
		? requestedView
		: role === "admin" ? "dashboard" : "announcements";
	let viewBeforeInCenter = activeView;
	userLabel.textContent = role === "admin" ? currentUser.name : currentUser.name;

	function refreshStore() {
		store = getStore();
		currentUser = role === "admin"
			? store.admins.find((admin) => admin.id === session.userId)
			: store.patients.find((patient) => patient.id === session.userId);
		if (role === "admin") userLabel.textContent = currentUser.name;
	}

	function markActiveViewRead() {
		let changed = false;
		if (role === "patient" && activeView === "notifications") {
			store.notifications.forEach((notification) => {
				if (notification.patientId === currentUser.id && !notification.read) {
					notification.read = true;
					changed = true;
				}
			});
		}
		if (role === "admin" && activeView === "reports") {
			store.audit.forEach((entry) => {
				if (!Array.isArray(entry.seenBy)) entry.seenBy = [];
				if (!entry.seenBy.includes(currentUser.id)) {
					entry.seenBy.push(currentUser.id);
					changed = true;
				}
			});
		}
		if (role === "admin" && activeView === "notifications") {
			store.staffNotifications.forEach((notification) => {
				if (notification.recipientId === currentUser.id && !notification.read) {
					notification.read = true;
					changed = true;
				}
			});
		}
		if (changed) saveStore(store);
	}

	function updateNavigationIndicators() {
		menuLinks.forEach((link) => {
			const view = link.dataset.view;
			const hasUnread = role === "patient" && view === "notifications"
				? store.notifications.some((notification) => notification.patientId === currentUser.id && !notification.read)
					|| store.bills.some((bill) => bill.patientId === currentUser.id && bill.status === "Pending")
				: role === "admin" && view === "notifications"
					? store.bills.some((bill) => bill.status === "Pending")
						|| store.staffNotifications.some((notification) => notification.recipientId === currentUser.id && !notification.read)
					: role === "admin" && view === "reports"
						? store.audit.some((entry) => Array.isArray(entry.seenBy) && !entry.seenBy.includes(currentUser.id))
						: false;
			const indicator = link.querySelector(".nav-indicator");
			if (hasUnread && !indicator) {
				const dot = document.createElement("span");
				dot.className = "nav-indicator";
				dot.setAttribute("aria-hidden", "true");
				link.append(dot);
			} else if (!hasUnread && indicator) {
				indicator.remove();
			}
			const label = availableViews.find(([availableView]) => availableView === view)?.[1] || link.textContent.trim();
			link.setAttribute("aria-label", hasUnread ? `${label}, new activity` : label);
		});
	}

	function renderDialysisCenterInfo() {
		const patient = store.patients.find((entry) => entry.id === activeAccessPatientId);
		if (!patient) return `<div class="in-center-article"><h3>Dialysis access and schedule</h3><p>Add a patient record before assigning dialysis access and days.</p></div>`;
		const availableDayOptions = store.availableDays.map((day) => `<label class="day-option"><input type="checkbox" name="accessDays" value="${escapeHTML(day)}" ${(patient.dialysisDays || []).includes(day) ? "checked" : ""}><span>${escapeHTML(day)}</span></label>`).join("");
		return `
			<div class="in-center-article">
				<h3>Assign dialysis access</h3>
				<label class="message-patient-select">Choose patient<select data-access-patient>${patientOptions(activeAccessPatientId)}</select></label>
				<p class="field-hint">Choose the access type discussed with the patient. Hover or focus a choice for its meaning and reason.</p>
				<div class="access-choice-grid" role="radiogroup" aria-label="Dialysis access type">
					${DIALYSIS_ACCESS_TYPES.map((access, index) => `<label class="access-choice"><input type="radio" name="accessSite" value="${escapeHTML(access.id)}" ${patient.accessSite === access.id ? "checked" : ""} aria-describedby="access-tip-${index}"><span>${escapeHTML(access.id)}</span><span class="access-choice-tooltip" id="access-tip-${index}" role="tooltip"><strong>Meaning</strong> ${escapeHTML(access.meaning)}<strong>Reason</strong> ${escapeHTML(access.reason)}</span></label>`).join("")}
				</div>
				<div class="access-schedule" data-access-schedule ${patient.accessSite ? "" : "hidden"}>
					<h4>Available schedule for ${escapeHTML(patient.name)}</h4>
					${availableDayOptions ? `<div class="day-grid">${availableDayOptions}</div>` : `<p class="empty-state">Set available center days in Admin Schedule first.</p>`}
					<button class="primary-button" type="button" data-save-access-assignment>Save dialysis information</button>
				</div>
			</div>
		`;
	}

	function openMenu(isOpen) {
		menu.classList.toggle("is-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	}

	menuToggle.addEventListener("click", () => openMenu(!menu.classList.contains("is-open")));
	menuClose.addEventListener("click", () => openMenu(false));
	if (inCenterButton && inCenterPanel && inCenterMinimize) {
		const inCenterForm = inCenterPanel.querySelector(".in-center-form");
		if (inCenterForm) inCenterForm.innerHTML = renderDialysisCenterInfo();
		function setInCenterOpen(isOpen) {
			inCenterPanel.hidden = !isOpen;
			inCenterButton.hidden = isOpen;
			inCenterButton.setAttribute("aria-expanded", String(isOpen));
			inCenterButton.classList.toggle("active", isOpen);
			if (isOpen && inCenterForm) inCenterForm.innerHTML = renderDialysisCenterInfo();
		}
		inCenterButton.addEventListener("click", () => setInCenterOpen(inCenterPanel.hidden));
		inCenterMinimize.addEventListener("click", () => setInCenterOpen(false));
		inCenterForm.addEventListener("change", (event) => {
			if (event.target.matches("[data-access-patient]")) {
				activeAccessPatientId = event.target.value;
				inCenterForm.innerHTML = renderDialysisCenterInfo();
			} else if (event.target.matches('input[name="accessSite"]')) {
				inCenterForm.querySelector("[data-access-schedule]").hidden = false;
			}
		});
		inCenterForm.addEventListener("click", (event) => {
			if (!event.target.matches("[data-save-access-assignment]")) return;
			const patient = store.patients.find((entry) => entry.id === activeAccessPatientId);
			const accessSite = inCenterForm.querySelector('input[name="accessSite"]:checked')?.value;
			if (!patient || !accessSite) return;
			patient.accessSite = accessSite;
			patient.dialysisDays = [...inCenterForm.querySelectorAll('input[name="accessDays"]:checked')]
				.map((input) => input.value)
				.filter((day) => store.availableDays.includes(day));
			addNotification(store, patient.id, `Your dialysis access and schedule were updated by the care team: ${patient.accessSite}; ${patient.dialysisDays.join(", ") || "no days assigned"}.`, "schedule");
			addAudit(store, `Dialysis access and schedule updated for ${patient.name}: ${patient.accessSite}`, "schedule");
			saveStore(store);
			refreshStore();
			inCenterForm.innerHTML = renderDialysisCenterInfo();
		});
	}
	menuLinks.forEach((link) => link.addEventListener("click", (event) => {
		event.preventDefault();
		activeView = link.dataset.view;
		openMenu(false);
		renderView();
	}));
	const menuSearchInput = document.querySelector("#menu-search-input");
	const menuSearchResults = document.querySelector("#menu-search-results");
	if (menuSearchInput && menuSearchResults) {
		const searchKeywords = {
			dashboard: "overview cases patients directory",
			billing: "bills payment invoice",
			equipment: "inventory supplies cost",
			profile: "account",
			settings: "account credentials password email gmail change",
			nurses: "care team staff",
			schedule: "days availability access",
			patients: "records notes nursing laboratory test results dietary nutrition counseling",
			announcements: "updates news",
			notifications: "pending bills outstanding balance payment due",
			reports: "activity log audit",
			messages: "chat inbox",
			notes: "nursing notes",
			laboratory: "lab results blood test cbc",
			"dietary-nutrition": "diet food nutrition counseling"
		};
		const openSearchResult = (view) => {
			activeView = view;
			menuSearchInput.value = "";
			menuSearchResults.hidden = true;
			menuSearchInput.setAttribute("aria-expanded", "false");
			renderView();
		};
		const renderSearchResults = () => {
			const query = menuSearchInput.value.trim().toLowerCase();
			const matches = query ? availableViews.filter(([view, label]) => `${label} ${searchKeywords[view] || ""}`.toLowerCase().includes(query)) : [];
			menuSearchResults.innerHTML = matches.length
				? matches.map(([view, label]) => `<li role="option"><button type="button" data-search-view="${escapeHTML(view)}">${escapeHTML(label)}</button></li>`).join("")
				: query ? `<li class="portal-search-empty">No menu match</li>` : "";
			menuSearchResults.hidden = !query;
			menuSearchInput.setAttribute("aria-expanded", String(Boolean(query)));
		};
		menuSearchInput.addEventListener("input", renderSearchResults);
		menuSearchInput.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				const firstResult = menuSearchResults.querySelector("[data-search-view]");
				if (firstResult) openSearchResult(firstResult.dataset.searchView);
			} else if (event.key === "Escape") {
				menuSearchInput.value = "";
				renderSearchResults();
			}
		});
		menuSearchResults.addEventListener("click", (event) => {
			const button = event.target.closest("[data-search-view]");
			if (button) openSearchResult(button.dataset.searchView);
		});
		document.addEventListener("click", (event) => {
			if (!event.target.closest("#menu-search")) menuSearchResults.hidden = true;
		});
	}
	document.querySelector("#logout-button").addEventListener("click", () => {
		localStorage.removeItem(SESSION_KEY);
		window.location.href = "index.html";
	});
	window.addEventListener("storage", (event) => {
		if (event.key !== STORAGE_KEY) return;
		const knownAnnouncementIds = new Set((store.announcements || []).map((entry) => entry.id));
		const newAnnouncement = role === "patient" ? (getStore().announcements || []).find((entry) => !knownAnnouncementIds.has(entry.id)) : null;
		if (newAnnouncement) showAnnouncementPopup(newAnnouncement);
		const shouldRender = role === "admin"
			? ["billing", "reports", "dashboard", "schedule", "notifications"].includes(activeView)
			: ["announcements", "billing", "notifications", "profile", "schedule"].includes(activeView);
		if (shouldRender || (role === "admin" && activeView === "patient-record")) renderView();
		else refreshStore();
	});

	function showAnnouncementPopup(announcement) {
		document.querySelector(".announcement-popup")?.remove();
		const popup = document.createElement("div");
		popup.className = "announcement-popup";
		popup.setAttribute("role", "alert");
		popup.innerHTML = `<div class="announcement-popup-card"><p class="portal-kicker">NEW ANNOUNCEMENT</p><h3>${escapeHTML(announcement.title)}</h3><p>${escapeHTML(announcement.body)}</p><div class="form-actions"><button class="primary-button" type="button" data-popup-view>View</button><button class="secondary-button" type="button" data-popup-close>Close</button></div></div>`;
		popup.addEventListener("click", (event) => {
			if (event.target.closest("[data-popup-view]")) {
				activeView = "announcements";
				renderView();
			}
			if (event.target.closest("[data-popup-view], [data-popup-close]") || event.target === popup) popup.remove();
		});
		document.body.appendChild(popup);
	}

	function renderView() {
		refreshStore();
		markActiveViewRead();
		updateNavigationIndicators();
		menuLinks.forEach((link) => link.classList.toggle("active", link.dataset.view === activeView));
		const title = activeView === "patient-record" ? "Patient Record" : availableViews.find(([view]) => view === activeView)?.[1] || "Dashboard";
		document.querySelector("#view-title").textContent = title;
		viewContainer.innerHTML = role === "admin" ? renderAdminView(activeView) : renderPatientView(activeView);
		const pageHeading = viewContainer.querySelector(":scope > .section-heading > div > h2");
		if (pageHeading && pageHeading.textContent.trim().toLowerCase() === title.trim().toLowerCase()) pageHeading.remove();
		if (role === "admin" && !isReceptionist && !isPharmacy && !isMedtech) {
			viewContainer.insertAdjacentHTML("afterbegin", `<div class="qr-scan-bar"><button class="secondary-button" type="button" data-open-qr-scanner>Scan patient QR</button></div>`);
			viewContainer.querySelector("[data-open-qr-scanner]").addEventListener("click", openQrScanner);
		}
		bindViewEvents();
	}

	function openQrScanner() {
		if (document.querySelector("#qr-scanner-modal")) return;
		const modal = document.createElement("div");
		modal.id = "qr-scanner-modal";
		modal.setAttribute("role", "dialog");
		modal.setAttribute("aria-label", "Scan patient QR code");
		modal.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px";
		modal.innerHTML = `<div style="background:#fff;border-radius:12px;padding:16px;max-width:420px;width:100%;display:grid;gap:10px"><h3 style="margin:0">Scan patient QR</h3><video playsinline muted style="width:100%;border-radius:8px;background:#000;max-height:50vh"></video><p class="field-hint" data-qr-status aria-live="polite">Starting camera...</p><form data-qr-manual style="display:flex;gap:8px"><input name="number" placeholder="Or type patient number" style="flex:1" autocomplete="off"><button class="primary-button" type="submit">Open</button></form><button class="secondary-button" type="button" data-qr-close>Close</button></div>`;
		document.body.appendChild(modal);
		const video = modal.querySelector("video");
		const status = modal.querySelector("[data-qr-status]");
		let stream = null;
		let closed = false;

		function close() {
			closed = true;
			if (stream) stream.getTracks().forEach((track) => track.stop());
			modal.remove();
		}

		function openPatient(rawValue) {
			const number = String(rawValue || "").trim().toLowerCase();
			const patient = number && store.patients.find((entry) => String(entry.patientNumber || "").toLowerCase() === number);
			if (!patient) {
				status.textContent = `No patient found for "${String(rawValue || "").trim()}".`;
				return false;
			}
			close();
			activeRecordPatientId = patient.id;
			activeView = "patient-record";
			renderView();
			return true;
		}

		modal.querySelector("[data-qr-close]").addEventListener("click", close);
		modal.querySelector("[data-qr-manual]").addEventListener("submit", (event) => {
			event.preventDefault();
			openPatient(new FormData(event.currentTarget).get("number"));
		});

		if (!("BarcodeDetector" in window) || !navigator.mediaDevices?.getUserMedia) {
			video.hidden = true;
			status.textContent = "Camera scanning is not supported in this browser. Type the patient number instead.";
			return;
		}
		const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
		navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(async (mediaStream) => {
			if (closed) {
				mediaStream.getTracks().forEach((track) => track.stop());
				return;
			}
			stream = mediaStream;
			video.srcObject = mediaStream;
			await video.play();
			status.textContent = "Point the camera at the patient's QR code.";
			const scan = async () => {
				if (closed) return;
				try {
					const codes = await detector.detect(video);
					if (codes.length && openPatient(codes[0].rawValue)) return;
				} catch (error) {
					console.error("QR detection failed", error);
				}
				setTimeout(scan, 400);
			};
			scan();
		}).catch(() => {
			video.hidden = true;
			status.textContent = "Camera unavailable. Allow camera access (requires https) or type the patient number.";
		});
	}

	function patientName(patientId) {
		return store.patients.find((patient) => patient.id === patientId)?.name || "Unknown patient";
	}

	function renderPatientInformationCard(patient, heading = "Patient information card") {
		const isVerified = Boolean(patient.id && store.patients.some((entry) => entry.id === patient.id));
		const sex = String(patient.gender || "Not provided");
		return `<section class="patient-id-card" aria-label="${escapeHTML(heading)}"><header class="patient-id-card-header"><img src="asset/logo.png" alt=""><div><p>MEDICAL INSTITUTION</p><h3>DiaCore Dialysis Center</h3><span>OFFICIAL PATIENT IDENTIFICATION CARD</span></div><span class="patient-id-verification ${isVerified ? "verified" : "unverified"}">${isVerified ? "✓ VERIFIED" : "NOT VERIFIED"}</span></header><div class="patient-id-card-body"><div class="patient-id-number"><span>PATIENT NUMBER</span><strong>${escapeHTML(patient.patientNumber || "Not assigned")}</strong></div><dl><div><dt>Patient name</dt><dd>${escapeHTML(patient.name || "Not provided")}</dd></div><div><dt>Age / Sex</dt><dd>${escapeHTML(patient.age ?? "Not provided")} / ${escapeHTML(sex)}</dd></div><div><dt>Contact no.</dt><dd>${escapeHTML(patient.contactNumber || "Not provided")}</dd></div><div><dt>Dialysis center</dt><dd>${escapeHTML(patient.center || "Not assigned")}</dd></div></dl></div><footer>Record status: ${isVerified ? "Patient record found in the system" : "Patient record not found"}</footer></section>`;
	}

	function renderAdminView(view) {
		if (isReceptionist) return renderReceptionistView(view);
		if (isBilling) return renderBillingView(view);
		if (isPharmacy) return renderPharmacyView(view);
		if (isDoctor) return renderDoctorView(view);
		if (isNurse) return renderNurseView(view);
		if (isBiomedicalTechnician) return renderTechnicianView(view);
		if (isDietitian) return renderDietitianView(view);
		if (isMedtech) return renderMedtechView(view);
		if (BLANK_ADMIN_VIEWS.has(view)) {
			const label = adminViews.find(([key]) => key === view)?.[1] || "";
			return `<div class="section-heading"><div><p class="portal-kicker">ADMINISTRATOR</p><h2>${escapeHTML(label)}</h2></div></div><div class="portal-panel"></div>`;
		}
		if (view === "dashboard") return renderAdminDashboard();
		if (view === "patient-record") return renderPatientRecord(activeRecordPatientId);
		if (view === "billing") return renderAdminBilling();
		if (view === "equipment") return renderEquipment();
		if (view === "profile") return renderAdminProfile();
		if (view === "settings") return `<div class="section-heading"><div><p class="portal-kicker">ADMIN ACCOUNT</p><h2>Settings</h2></div></div>${renderCredentialsForm()}`;
		if (view === "nurses") return renderNurses(true);
		if (view === "schedule") return renderAdminSchedule();
		if (view === "patients") return renderAdminPatients();
		if (view === "announcements") return renderAdminAnnouncements();
		if (view === "notifications") return renderAdminNotifications();
		if (view === "reports") return renderAdminReports();
		return renderMessages(true);
	}

	const billingState = { detailId: "", reportType: "Daily Billing Summary", from: "", to: "" };

	function billPaidAmount(bill) {
		return (store.billingPayments || []).filter((payment) => payment.billId === bill.id).reduce((total, payment) => total + (Number(payment.amount) || 0), 0);
	}

	function billBalance(bill) {
		return bill.status === "Paid" && !billPaidAmount(bill) ? 0 : Math.max(0, (Number(bill.amount) || 0) - billPaidAmount(bill));
	}

	function billingPatientNumber(patientId) {
		return store.patients.find((patient) => patient.id === patientId)?.patientNumber || patientId || "—";
	}

	function renderBillingView(view) {
		const title = billingViews.find(([key]) => key === view)?.[1] || "Dashboard";
		let content = "";
		switch (view) {
			case "patient-billing": content = renderBillingPatientBilling(); break;
			case "billing-statement": content = renderAdminBilling(); break;
			case "payment-records": content = renderBillingPayments(); break;
			case "outstanding-balances": content = renderBillingOutstanding(); break;
			case "philhealth-claims": content = renderBillingClaims(); break;
			case "receipt-records": content = renderBillingReceipts(); break;
			case "billing-reports": content = renderBillingReports(); break;
			case "notifications": content = renderBillingNotifications(); break;
			case "profile": content = renderAdminProfile(); break;
			case "settings": content = renderCredentialsForm(); break;
			default: content = renderBillingDashboard();
		}
		return `<div class="section-heading"><div><p class="portal-kicker">BILLING WORKSPACE</p><h2>${escapeHTML(title)}</h2></div><span class="demo-chip">BILLING STAFF</span></div>${content}`;
	}

	function renderBillingDashboard() {
		const payments = store.billingPayments || [];
		const today = new Date().toISOString().slice(0, 10);
		const revenue = payments.filter((payment) => payment.date === today).reduce((total, payment) => total + Number(payment.amount || 0), 0);
		const pending = store.bills.filter((bill) => billBalance(bill) > 0).length;
		const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); return date.toISOString().slice(0, 10); });
		const totals = days.map((day) => payments.filter((payment) => payment.date === day).reduce((total, payment) => total + Number(payment.amount || 0), 0));
		const max = Math.max(1, ...totals);
		const totalCollected = payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);
		const totalBilled = store.bills.reduce((total, bill) => total + Number(bill.amount || 0), 0);
		return `<div class="stat-grid"><article class="stat-card"><span>Total daily revenue</span><strong>${formatMoney(revenue)}</strong></article><article class="stat-card"><span>Processed bills</span><strong>${store.bills.length - pending}</strong></article><article class="stat-card"><span>Pending bills</span><strong>${pending}</strong></article><article class="stat-card"><span>Total patients billed</span><strong>${new Set(store.bills.map((bill) => bill.patientId)).size}</strong></article></div><section class="portal-panel"><h3>Revenue trend (last 7 days)</h3><div class="billing-chart">${totals.map((total, index) => `<div class="billing-bar"><span style="height:${Math.round(total / max * 100)}%" title="${formatMoney(total)}"></span><small>${days[index].slice(5)}</small></div>`).join("")}</div></section><section class="portal-panel"><h3>Quick analytics</h3><div class="stat-grid"><article class="stat-card"><span>Average bill amount</span><strong>${formatMoney(store.bills.length ? totalBilled / store.bills.length : 0)}</strong></article><article class="stat-card"><span>Total sessions billed</span><strong>${store.bills.length}</strong></article><article class="stat-card"><span>Collection rate</span><strong>${totalBilled ? Math.min(100, Math.round(totalCollected / totalBilled * 100)) : 0}%</strong></article></div></section>`;
	}

	function renderBillingPatientBilling() {
		const detail = store.bills.find((bill) => bill.id === billingState.detailId);
		const rows = store.bills.map((bill) => `<tr data-billing-row data-status="${billBalance(bill) > 0 ? "Pending" : "Paid"}" data-search="${escapeHTML(`${patientName(bill.patientId)} ${billingPatientNumber(bill.patientId)}`.toLowerCase())}"><td>${escapeHTML(bill.updatedAt || "")}</td><td>${escapeHTML(patientName(bill.patientId))}</td><td>${escapeHTML(billingPatientNumber(bill.patientId))}</td><td>${escapeHTML(bill.description || "HEMODIALYSIS")}</td><td>${formatMoney(bill.amount)}</td><td><span class="status-tag ${billBalance(bill) > 0 ? "pending" : "success"}">${billBalance(bill) > 0 ? "Pending" : "Paid"}</span></td><td><button class="table-action" type="button" data-billing-detail="${escapeHTML(bill.id)}">View</button></td></tr>`).join("");
		return `<section class="portal-panel"><h3>Patient billing records</h3><div class="form-grid"><label>Search<input type="search" data-billing-search placeholder="Patient name or ID"></label><label>Status<select data-billing-status><option value="">All Status</option><option>Pending</option><option>Paid</option></select></label></div>${store.bills.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date</th><th>Patient name</th><th>Patient ID</th><th>Description</th><th>Total amount</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">No billing records.</p>`}</section>${detail ? `<section class="portal-panel"><h3>Session details · ${escapeHTML(patientName(detail.patientId))}</h3><p>${renderBillEquipmentText(detail)}</p><p><strong>Total amount: ${formatMoney(detail.amount)}</strong> · Paid ${formatMoney(billPaidAmount(detail))} · Balance ${formatMoney(billBalance(detail))}</p></section>` : ""}`;
	}

	function renderBillingPayments() {
		const payments = (store.billingPayments || []).slice().reverse();
		const open = store.bills.filter((bill) => billBalance(bill) > 0);
		const total = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
		return `<section class="portal-panel"><h3>Record payment</h3>${open.length ? `<form id="billing-payment-form" class="form-grid"><label>Bill<select name="billId" required>${open.map((bill) => `<option value="${escapeHTML(bill.id)}">${escapeHTML(patientName(bill.patientId))} · balance ${formatMoney(billBalance(bill))}</option>`).join("")}</select></label><label>Amount (PHP)<input name="amount" type="number" min="0.01" step="0.01" required></label><label>Payment method<select name="method"><option>Cash</option><option>Card</option><option>GCash</option><option>Bank transfer</option></select></label><label>Date<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><label>Reference number<input name="reference"></label><label>Receipt type<select name="receiptType"><option>Official Receipt</option><option>Provisional Receipt</option></select></label><label class="full-width">Remarks<input name="remarks"></label><div class="form-actions"><button class="primary-button" type="submit">Save payment</button></div></form>` : `<p class="empty-state">No bills with outstanding balance.</p>`}</section><section class="portal-panel"><h3>Payment history</h3>${payments.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date</th><th>Patient</th><th>Patient ID</th><th>Amount</th><th>Method</th><th>Reference no.</th><th>Remarks</th></tr></thead><tbody>${payments.map((payment) => `<tr><td>${escapeHTML(payment.date)}</td><td>${escapeHTML(patientName(payment.patientId))}</td><td>${escapeHTML(billingPatientNumber(payment.patientId))}</td><td>${formatMoney(payment.amount)}</td><td>${escapeHTML(payment.method)}</td><td>${escapeHTML(payment.reference || "—")}</td><td>${escapeHTML(payment.remarks || "")}</td></tr>`).join("")}</tbody></table></div><p><strong>Total collected: ${formatMoney(total)}</strong></p>` : `<p class="empty-state">No payments recorded.</p>`}</section>`;
	}

	function renderBillingOutstanding() {
		const open = store.bills.filter((bill) => billBalance(bill) > 0);
		const today = new Date().toISOString().slice(0, 10);
		const overdue = (bill) => bill.status === "Overdue" || (bill.updatedAt && Math.floor((new Date(today) - new Date(bill.updatedAt)) / 86400000) > 30);
		const lastPayment = (bill) => (store.billingPayments || []).filter((payment) => payment.billId === bill.id).map((payment) => payment.date).sort().pop() || "—";
		return `<section class="portal-panel"><h3>Patients with outstanding balances</h3>${open.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient name</th><th>Patient ID</th><th>Total balance</th><th>Last payment</th><th>Status</th></tr></thead><tbody>${open.map((bill) => `<tr><td>${escapeHTML(patientName(bill.patientId))}</td><td>${escapeHTML(billingPatientNumber(bill.patientId))}</td><td>${formatMoney(billBalance(bill))}</td><td>${escapeHTML(lastPayment(bill))}</td><td><span class="status-tag pending">${overdue(bill) ? "Overdue" : "Pending"}</span></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No outstanding balances.</p>`}</section><div class="stat-grid"><article class="stat-card"><span>Total outstanding balance</span><strong>${formatMoney(open.reduce((total, bill) => total + billBalance(bill), 0))}</strong></article><article class="stat-card"><span>Overdue accounts</span><strong>${open.filter(overdue).length}</strong></article><article class="stat-card"><span>Pending accounts</span><strong>${open.filter((bill) => !overdue(bill)).length}</strong></article></div>`;
	}

	function renderBillingClaims() {
		const claims = store.philhealthClaims || [];
		const statuses = ["Pending", "Approved", "Returned for Correction"];
		return `<section class="portal-panel"><h3>Add PhilHealth claim</h3><form id="billing-claim-form" class="form-grid"><label>Patient<select name="patientId" required>${patientOptions("")}</select></label><label>Claim no.<input name="claimNo" required></label><label>Number of sessions<input name="sessions" type="number" min="1" required></label><label>Date submitted<input name="submitted" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><label>Status<select name="status">${statuses.map((status) => `<option>${status}</option>`).join("")}</select></label><div class="form-actions"><button class="primary-button" type="submit">Save claim</button></div></form></section><section class="portal-panel"><h3>PhilHealth claim tracking</h3>${claims.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Claim no.</th><th>Patient</th><th>Patient ID</th><th>Sessions</th><th>Status</th><th>Date submitted</th></tr></thead><tbody>${claims.map((claim) => `<tr><td>${escapeHTML(claim.claimNo)}</td><td>${escapeHTML(patientName(claim.patientId))}</td><td>${escapeHTML(billingPatientNumber(claim.patientId))}</td><td>${escapeHTML(claim.sessions)}</td><td><select data-billing-claim-status="${escapeHTML(claim.id)}">${statuses.map((status) => `<option ${claim.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></td><td>${escapeHTML(claim.submitted)}</td></tr>`).join("")}</tbody></table></div><p><strong>Sessions used: ${claims.filter((claim) => claim.status === "Approved").reduce((total, claim) => total + Number(claim.sessions || 0), 0)} of 45 yearly limit</strong></p>` : `<p class="empty-state">No claims recorded.</p>`}</section>`;
	}

	function renderBillingReceipts() {
		const receipts = (store.billingReceipts || []).slice().reverse();
		return `<section class="portal-panel"><div class="panel-heading"><h3>Official &amp; provisional receipt records</h3><button class="secondary-button" type="button" data-billing-export-receipts>Export records</button></div><div class="form-grid"><label>Type<select data-billing-receipt-type><option value="">All Types</option><option>Official Receipt</option><option>Provisional Receipt</option></select></label></div>${receipts.length ? `<div class="table-wrap"><table class="dietitian-table" data-billing-receipt-table><thead><tr><th>Date</th><th>OR/PR no.</th><th>Patient name</th><th>Amount</th><th>Type</th><th>Status</th></tr></thead><tbody>${receipts.map((receipt) => `<tr data-billing-receipt-row data-type="${escapeHTML(receipt.type)}"><td>${escapeHTML(receipt.date)}</td><td>${escapeHTML(receipt.number)}</td><td>${escapeHTML(patientName(receipt.patientId))}</td><td>${formatMoney(receipt.amount)}</td><td>${escapeHTML(receipt.type)}</td><td><span class="status-tag success">Issued</span></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No receipts issued yet.</p>`}</section>`;
	}

	function billingReportData() {
		const { reportType, from, to } = billingState;
		const inRange = (date) => (!from || date >= from) && (!to || date <= to);
		const payments = (store.billingPayments || []).filter((payment) => inRange(payment.date));
		const bills = store.bills.filter((bill) => inRange(bill.updatedAt || ""));
		if (reportType === "Collection Log") return { headers: ["Date", "Patient", "Amount", "Method", "Reference"], rows: payments.map((payment) => [payment.date, patientName(payment.patientId), formatMoney(payment.amount), payment.method, payment.reference || "—"]) };
		if (reportType === "Revenue Analytics") {
			const methods = {};
			payments.forEach((payment) => { methods[payment.method] = (methods[payment.method] || 0) + Number(payment.amount || 0); });
			return { headers: ["Payment Method", "Total Balance"], rows: Object.entries(methods).map(([method, amount]) => [method, formatMoney(amount)]) };
		}
		return { headers: ["Summary", "Value"], rows: [["Total billings", formatMoney(bills.reduce((total, bill) => total + Number(bill.amount || 0), 0))], ["Total collections", formatMoney(payments.reduce((total, payment) => total + Number(payment.amount || 0), 0))], ["Outstanding balances", formatMoney(store.bills.reduce((total, bill) => total + billBalance(bill), 0))], ["Bills processed", String(bills.length)], ["Payments received", String(payments.length)]] };
	}

	function renderBillingReports() {
		const types = ["Daily Billing Summary", "Weekly Billing Summary", "Monthly Billing Summary", "Collection Log", "Revenue Analytics"];
		const { headers, rows } = billingReportData();
		return `<section class="portal-panel"><h3>Generate reports</h3><div class="form-grid no-print"><label>Report type<select data-billing-report-type>${types.map((type) => `<option ${type === billingState.reportType ? "selected" : ""}>${type}</option>`).join("")}</select></label><label>From<input type="date" data-billing-report-from value="${escapeHTML(billingState.from)}"></label><label>To<input type="date" data-billing-report-to value="${escapeHTML(billingState.to)}"></label><div class="form-actions"><button class="primary-button" type="button" data-billing-print-report>Generate PDF</button></div></div><div class="reception-report-sheet"><h3>${escapeHTML(billingState.reportType)}</h3><div class="table-wrap"><table class="dietitian-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${headers.length}">No data for this period.</td></tr>`}</tbody></table></div></div></section>`;
	}

	function billingNotificationItems() {
		const items = [];
		store.bills.filter((bill) => billBalance(bill) > 0).forEach((bill) => items.push({ id: `bill-${bill.id}`, title: "Pending Billing Task", detail: `${patientName(bill.patientId)} · ${formatMoney(billBalance(bill))}`, date: bill.updatedAt || "" }));
		(store.billingPayments || []).forEach((payment) => items.push({ id: `pay-${payment.id}`, title: "Payment Received", detail: `${patientName(payment.patientId)} · ${formatMoney(payment.amount)}`, date: payment.date }));
		(store.philhealthClaims || []).forEach((claim) => items.push({ id: `claim-${claim.id}-${claim.status}`, title: `PhilHealth Claim ${claim.status}`, detail: `Claim No: ${claim.claimNo}`, date: claim.submitted }));
		return items.sort((first, second) => String(second.date).localeCompare(String(first.date)));
	}

	function renderBillingNotifications() {
		const read = new Set(store.billingNotificationsRead || []);
		const items = billingNotificationItems();
		return `<section class="portal-panel"><div class="panel-heading"><h3>Notifications</h3><button class="secondary-button" type="button" data-billing-mark-all>Mark all as read</button></div>${items.length ? `<ul class="activity-list">${items.map((item) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(item.title)}</strong> <span class="status-tag ${read.has(item.id) ? "success" : "pending"}">${read.has(item.id) ? "Read" : "New"}</span><small>${escapeHTML(item.detail)} · ${escapeHTML(item.date)}</small></div></li>`).join("")}</ul>` : `<p class="empty-state">No notifications.</p>`}</section>`;
	}

	function saveBillingPayment(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const bill = store.bills.find((entry) => entry.id === data.billId);
		const amount = Number(data.amount);
		if (!bill || !(amount > 0)) return;
		const payment = { id: makeId("payment"), billId: bill.id, patientId: bill.patientId, amount, method: data.method, date: data.date, reference: String(data.reference || "").trim(), remarks: String(data.remarks || "").trim() };
		store.billingPayments.push(payment);
		const prefix = data.receiptType === "Provisional Receipt" ? "PR" : "OR";
		store.billingReceipts.push({ id: makeId("receipt"), number: `${prefix}-${String(store.billingReceipts.length + 1).padStart(5, "0")}`, paymentId: payment.id, patientId: bill.patientId, amount, date: data.date, type: data.receiptType });
		if (billBalance(bill) <= 0) { bill.status = "Paid"; bill.updatedAt = data.date; }
		addAudit(store, `Payment recorded for ${patientName(bill.patientId)}`);
		saveStore(store);
		renderView();
	}

	function saveBillingClaim(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		store.philhealthClaims.push({ id: makeId("claim"), patientId: data.patientId, claimNo: String(data.claimNo).trim(), sessions: Number(data.sessions), submitted: data.submitted, status: data.status });
		addAudit(store, `PhilHealth claim ${data.claimNo} recorded`);
		saveStore(store);
		renderView();
	}
	function renderReceptionistView(view) {
		const title = receptionistViews.find(([key]) => key === view)?.[1] || "Dashboard";
		let content = "";
		switch (view) {
			case "dashboard": content = renderReceptionistDashboard(); break;
			case "reception-registration": content = renderReceptionistRegistration(); break;
			case "reception-directory": content = renderReceptionistDirectory(); break;
			case "reception-appointments": content = renderReceptionistAppointments(); break;
			case "reception-dialysis-schedule": content = renderReceptionistSchedule(); break;
			case "reception-queue": content = renderReceptionistQueue(); break;
			case "reception-inquiries": content = renderReceptionistInquiries() + renderReceptionistInquiryForm(); break;
			case "reception-reminders": content = renderReceptionistReminders(); break;
			case "reception-reports": content = renderReceptionistReports(); break;
			case "reception-profile": content = renderReceptionistProfile(); break;
			case "reception-settings": content = renderReceptionistSettings(); break;
			default: content = renderReceptionistDashboard();
		}
		return `<div class="section-heading"><div><p class="portal-kicker">RECEPTION WORKSPACE</p><h2>${escapeHTML(title)}</h2></div><span class="demo-chip">RECEPTIONIST</span></div>${content}`;
	}

	function renderReceptionistDashboard() {
		const today = new Date().toISOString().slice(0, 10);
		const todaysAppointments = store.receptionAppointments.filter((entry) => entry.date === today);
		const todayRegistered = store.patients.filter((patient) => patient.registeredAt === today).length;
		const checkedIn = todaysAppointments.filter((entry) => Boolean(entry.checkedInAt)).length;
		const waiting = todaysAppointments.filter((entry) => entry.queueStatus === "Waiting").length;
		const patientRows = store.patients.slice().sort((first, second) => first.name.localeCompare(second.name)).map((patient) => `<tr><td><strong>${escapeHTML(patient.name)}</strong></td><td>${escapeHTML(patient.patientNumber || "ID pending")}</td><td>${escapeHTML(patient.dialysisType || "Not recorded")}</td><td>${escapeHTML((patient.dialysisDays || []).join(", ") || "Not assigned")}</td><td>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "—"))}–${escapeHTML(formatTimeWithPeriod(patient.timeOut || "—"))}</td></tr>`).join("");
		return `<div class="stat-grid receptionist-stat-grid"><article class="stat-card"><span>Today's appointments</span><strong>${todaysAppointments.length}</strong></article><article class="stat-card"><span>Checked-in patients</span><strong>${checkedIn}</strong></article><article class="stat-card"><span>Waiting patients</span><strong>${waiting}</strong></article><article class="stat-card"><span>New registrations</span><strong>${todayRegistered}</strong></article></div><section class="portal-panel"><div class="panel-heading"><h3>Today's appointments</h3><button class="table-action" type="button" data-reception-view="reception-appointments">Manage appointments</button></div>${renderReceptionAppointmentTable(todaysAppointments)}</section><section class="portal-panel"><h3>Registered patients · ${store.patients.length}</h3>${store.patients.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Patient ID</th><th>Dialysis type</th><th>Dialysis days</th><th>Assigned time</th></tr></thead><tbody>${patientRows}</tbody></table></div>` : `<p class="empty-state">No registered patients yet.</p>`}</section><section class="portal-panel"><h3>Quick actions</h3><div class="reception-quick-actions"><button class="secondary-button" type="button" data-reception-view="reception-registration">Add New Patient</button><button class="secondary-button" type="button" data-reception-view="reception-queue">Open Check-in / Queue</button><button class="secondary-button" type="button" data-reception-view="reception-inquiries">View Contact Inquiries</button></div></section>`;
	}

	function renderReceptionistRegistration() {
		return `<section class="portal-panel"><h3>Add New Patient</h3><form id="reception-registration-form" class="form-grid"><label>Full name<input name="name" autocomplete="name" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Contact number<input name="contactNumber" type="tel" autocomplete="tel" required></label><label>Date of birth<input name="birthday" type="date"></label><label>Age<input name="age" type="number" min="0"></label><label>Sex<select name="gender"><option value="">Choose</option><option>Female</option><option>Male</option><option>Other</option></select></label><label>Address<input name="address" autocomplete="street-address"></label><label>Dialysis type<select name="dialysisType"><option>Hemodialysis</option></select></label><label>Center<select name="center"><option>Sumulong</option></select></label><div class="form-actions"><button class="primary-button" type="submit">Save patient</button></div></form></section>`;
	}

	function renderReceptionistDirectory() {
		const selected = store.patients.find((patient) => patient.id === activeReceptionPatientId);
		const rows = store.patients.map((patient) => `<tr data-reception-patient-row data-search="${escapeHTML(`${patient.name} ${patient.patientNumber || ""} ${patient.id}`.toLowerCase())}"><td><strong>${escapeHTML(patient.name)}</strong><small>${escapeHTML(patient.patientNumber || "ID pending")}</small></td><td>${escapeHTML(patient.contactNumber || "Not recorded")}</td><td>${escapeHTML(patient.email || "Not recorded")}</td><td>${escapeHTML(patient.dialysisType || "Not recorded")}</td><td><button class="table-action" type="button" data-reception-select-patient="${escapeHTML(patient.id)}">View / edit contact</button></td></tr>`).join("");
		return `<section class="portal-panel"><label class="dietitian-search">Search by patient ID or name<input type="search" data-reception-directory-search placeholder="Patient ID or name"></label><div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Contact number</th><th>Email</th><th>Dialysis type</th><th>Permitted action</th></tr></thead><tbody>${rows}</tbody></table></div>${store.patients.length ? "" : `<p class="empty-state">No registered patients yet.</p>`}</section>${selected ? `<section class="portal-panel"><h3>Basic profile · ${escapeHTML(selected.patientNumber || selected.name)}</h3><dl class="profile-details"><div><dt>Full name</dt><dd>${escapeHTML(selected.name)}</dd></div><div><dt>Patient ID</dt><dd>${escapeHTML(selected.patientNumber || "Not assigned")}</dd></div><div><dt>Dialysis type</dt><dd>${escapeHTML(selected.dialysisType || "Not recorded")}</dd></div><div><dt>Center</dt><dd>${escapeHTML(selected.center || "Not recorded")}</dd></div></dl><form id="reception-contact-form" class="form-grid"><input type="hidden" name="patientId" value="${escapeHTML(selected.id)}"><label>Contact number<input name="contactNumber" type="tel" value="${escapeHTML(selected.contactNumber || "")}" required></label><label>Email address<input name="email" type="email" value="${escapeHTML(selected.email || "")}" required></label><label class="full-width">Address<input name="address" value="${escapeHTML(selected.address || "")}"></label><div class="form-actions"><button class="primary-button" type="submit">Save contact details</button></div></form></section>` : ""}`;
	}

	function renderReceptionistAppointments() {
		const appointments = store.receptionAppointments.slice().sort((first, second) => `${first.date} ${first.time}`.localeCompare(`${second.date} ${second.time}`));
		const editing = store.receptionAppointments.find((entry) => entry.id === activeEditingReceptionAppointmentId);
		const today = new Date().toISOString().slice(0, 10);
		return `<section class="portal-panel"><h3>${editing ? "Edit appointment" : "Book appointment"}</h3><form id="reception-appointment-form" class="form-grid"><input type="hidden" name="appointmentId" value="${escapeHTML(editing?.id || "")}"><label>Patient<select name="patientId" required><option value="">Choose patient</option>${store.patients.map((patient) => `<option value="${escapeHTML(patient.id)}" ${editing?.patientId === patient.id ? "selected" : ""}>${escapeHTML(patient.name)} · ${escapeHTML(patient.patientNumber || patient.id)}</option>`).join("")}</select></label><label>Date<input name="date" type="date" ${editing ? "" : `min="${today}"`} value="${escapeHTML(editing?.date || "")}" required></label><label>Time<input name="time" type="time" value="${escapeHTML(editing?.time || "")}" required></label><label>Appointment type<select name="type">${["Dialysis", "Consultation", "Follow-up", "Other"].map((type) => `<option ${editing?.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update Appointment" : "Save Appointment"}</button>${editing ? `<button class="secondary-button" type="button" data-cancel-reception-appointment-edit>Cancel</button>` : ""}</div></form></section><section class="portal-panel"><h3>Appointment list</h3>${renderReceptionAppointmentTable(appointments)}</section>`;
	}

	function renderReceptionAppointmentTable(appointments) {
		if (!appointments.length) return `<p class="empty-state">No appointments recorded.</p>`;
		return `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date / time</th><th>Patient</th><th>Type</th><th>Status</th><th>Queue</th><th>Action</th></tr></thead><tbody>${appointments.map((entry) => `<tr><td>${escapeHTML(entry.date)}<small>${escapeHTML(formatTimeWithPeriod(entry.time))}</small></td><td>${escapeHTML(patientName(entry.patientId))}</td><td>${escapeHTML(entry.type || "Appointment")}</td><td>${escapeHTML(entry.status || "Scheduled")}</td><td>${entry.queueNumber ? `#${entry.queueNumber} · ${escapeHTML(entry.queueStatus || "Waiting")}` : escapeHTML(entry.queueStatus || "—")}</td><td>${renderReceptionAppointmentActions(entry)}</td></tr>`).join("")}</tbody></table></div>`;
	}

	function renderReceptionAppointmentActions(entry) {
		return `<button class="table-action" type="button" data-edit-reception-appointment="${escapeHTML(entry.id)}">Edit</button>`;
	}

	function receptionCheckInLabel(entry) {
		if (entry.status === "Cancelled") return "Cancelled";
		if (entry.status === "Completed" || entry.		queueStatus === "Completed") return "Complete";
		if (!entry.checkedInAt) return entry.status || "Scheduled";
		return entry.checkInAction === "Waiting" ? "Waiting" : "Check in";
	}

	function renderReceptionCheckInAction(entry) {
		if (entry.status === "Cancelled") return `<span class="status-tag pending">Cancelled</span>`;
		const label = receptionCheckInLabel(entry);
		const current = label === "Complete" ? "Complete" : label === "Waiting" ? "Waiting" : label === "Check in" ? "Check in" : "";
		return `<select aria-label="Check in action for ${escapeHTML(patientName(entry.patientId))}" data-reception-checkin-action="${escapeHTML(entry.id)}"><option value="" ${current ? "" : "selected"} disabled>Select action</option>${["Check in", "Waiting", "Complete"].map((action) => `<option ${current === action ? "selected" : ""}>${action}</option>`).join("")}</select>`;
	}

	function applyReceptionCheckInAction(appointmentId, action) {
		const appointment = store.receptionAppointments.find((entry) => entry.id === appointmentId);
		if (!appointment || appointment.status === "Cancelled" || !["Check in", "Waiting", "Complete"].includes(action)) return;
		if (action === "Complete" && !appointment.checkedInAt) {
			window.alert("Check in the patient first.");
			return renderView();
		}
		if (!appointment.checkedInAt) {
			const queueNumbers = store.receptionAppointments.filter((entry) => entry.date === appointment.date && Number.isInteger(entry.queueNumber)).map((entry) => entry.queueNumber);
			appointment.queueNumber = Math.max(0, ...queueNumbers) + 1;
			appointment.checkedInAt = new Date().toISOString();
		}
		if (action === "Complete") {
			appointment.status = "Completed";
			appointment.queueStatus = "Completed";
		} else {
			appointment.status = "Checked In";
			appointment.queueStatus = "Waiting";
		}
		appointment.checkInAction = action;
		addAudit(store, `Receptionist marked ${patientName(appointment.patientId)}: ${action}`);
		saveStore(store);
		renderView();
	}
	function receptionInboxItems() {
		const patientMessages = store.messages.filter((message) => message.senderRole === "patient").map((message) => ({ ref: message, source: "Patient", from: message.senderName, text: message.text, date: message.sentAt, patientId: message.patientId }));
		const staffMessages = store.messages.filter((message) => message.senderRole !== "patient" && message.senderId !== currentUser.id).map((message) => ({ ref: message, source: "Internal", from: message.senderName, text: message.text, date: message.sentAt, patientId: message.patientId }));
		const notices = store.staffNotifications.filter((entry) => entry.recipientId === currentUser.id).map((entry) => ({ ref: entry, source: entry.type === "internal" || entry.senderName ? "Internal" : "System", from: entry.senderName || "System", text: entry.text, date: entry.date, patientId: "" }));
		return [...patientMessages, ...staffMessages, ...notices].reverse();
	}

	function renderReceptionistSchedule() {
		const patients = store.patients.filter((patient) => (patient.dialysisDays || []).length).sort((first, second) => first.name.localeCompare(second.name));
		return `<section class="portal-panel"><p class="field-hint">Read-only schedule. Coordinate updates with the staff member authorized to change dialysis assignments.</p>${patients.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Patient ID</th><th>Dialysis days</th><th>Assigned time</th><th>Room / center</th></tr></thead><tbody>${patients.map((patient) => `<tr><td>${escapeHTML(patient.name)}</td><td>${escapeHTML(patient.patientNumber || patient.id)}</td><td>${escapeHTML((patient.dialysisDays || []).join(", "))}</td><td>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "—"))}–${escapeHTML(formatTimeWithPeriod(patient.timeOut || "—"))}</td><td>${escapeHTML(patient.room || patient.center || "Not assigned")}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No dialysis schedules have been assigned.</p>`}</section>`;
	}

	function renderReceptionistQueue() {
		const appointments = store.receptionAppointments.slice().sort((first, second) => first.date.localeCompare(second.date)
			|| (first.queueNumber || Number.POSITIVE_INFINITY) - (second.queueNumber || Number.POSITIVE_INFINITY)
			|| first.time.localeCompare(second.time));
		return `<section class="portal-panel"><h3>Check in · ${appointments.length}</h3><label class="dietitian-search">Search patient or patient ID<input type="search" data-reception-queue-search placeholder="Patient name or ID"></label>${appointments.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date</th><th>Patient ID</th><th>Patient</th><th>Appointment time</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>${appointments.map((entry) => `<tr data-reception-queue-row data-search="${escapeHTML(`${patientName(entry.patientId)} ${store.patients.find((patient) => patient.id === entry.patientId)?.patientNumber || ""}`.toLowerCase())}"><td>${escapeHTML(entry.date)}</td><td>${escapeHTML(store.patients.find((patient) => patient.id === entry.patientId)?.patientNumber || entry.patientId || "—")}</td><td>${escapeHTML(patientName(entry.patientId))}</td><td>${escapeHTML(formatTimeWithPeriod(entry.time))}</td><td>${escapeHTML(entry.type)}</td><td><span class="status-tag ${receptionCheckInLabel(entry) === "Scheduled" ? "pending" : "success"}">${escapeHTML(receptionCheckInLabel(entry))}</span></td><td>${renderReceptionCheckInAction(entry)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No appointments have been created yet.</p>`}</section>`;
	}

	function renderReceptionistInquiries() {
		const messages = store.contactMessages.slice().sort((first, second) => String(second.createdAt || "").localeCompare(String(first.createdAt || "")));
		return `<section class="portal-panel"><div class="panel-heading"><h3>Contact inquiries</h3><label class="inline-filter">Filter<select data-reception-inquiry-filter><option value="All">All</option><option value="Pending">Pending</option><option value="Answered">Answered</option></select></label></div>${messages.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date</th><th>Patient / sender</th><th>Contact</th><th>Inquiry</th><th>Status</th><th>Action</th></tr></thead><tbody>${messages.map((entry) => `<tr data-reception-inquiry-row data-status="${entry.status === "Answered" ? "Answered" : "Pending"}"><td>${escapeHTML(entry.createdAt || "—")}</td><td>${escapeHTML(`${entry.firstName || ""} ${entry.lastName || ""}`.trim() || "Visitor")}</td><td>${escapeHTML(entry.email || "—")}<small>${escapeHTML(entry.phone || "")}</small></td><td>${escapeHTML(entry.message || "—")}</td><td>${escapeHTML(entry.status || "Pending")}</td><td>${entry.status === "Answered" ? `<span class="status-tag success">Answered</span>` : `<button class="table-action" type="button" data-reception-inquiry-answered="${escapeHTML(entry.id)}">Mark Answered</button>`}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No contact inquiries recorded.</p>`}</section>`;
	}

	function renderReceptionistInquiryForm() {
		return `<section class="portal-panel"><h3>Record an inquiry</h3><form id="reception-inquiry-form" class="form-grid"><label>First name<input name="firstName" required></label><label>Last name<input name="lastName" required></label><label>Email<input name="email" type="email" required></label><label>Phone<input name="phone" type="tel"></label><label>Inquiry type<select name="type"><option>Schedule</option><option>Services</option><option>Billing</option><option>Other</option></select></label><label class="full-width">Question or details<textarea name="message" rows="3" required></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save inquiry</button></div></form></section>`;
	}

	function renderReceptionistReminders() {
		const today = new Date().toISOString().slice(0, 10);
		const upcoming = store.receptionAppointments.filter((entry) => entry.date >= today && entry.status !== "Cancelled").sort((first, second) => `${first.date} ${first.time}`.localeCompare(`${second.date} ${second.time}`));
		const inbox = receptionInboxItems();
		const isInboxRead = (item) => item.ref.read === true || (item.ref.readBy || []).includes(currentUser.id);
		return `<section class="portal-panel"><h3>Upcoming appointment reminders</h3>${upcoming.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date / time</th><th>Patient</th><th>Type</th><th>Status</th></tr></thead><tbody>${upcoming.map((entry) => `<tr><td>${escapeHTML(entry.date)}<small>${escapeHTML(formatTimeWithPeriod(entry.time))}</small></td><td>${escapeHTML(patientName(entry.patientId))}</td><td>${escapeHTML(entry.type)}</td><td>${escapeHTML(entry.status || "Scheduled")}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No upcoming appointment reminders.</p>`}</section><section class="portal-panel"><h3>Internal messages</h3>${inbox.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Source</th><th>From</th><th>Message</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>${inbox.map((item, index) => `<tr><td><span class="status-tag ${item.source === "Patient" ? "success" : "pending"}">${item.source}</span></td><td>${escapeHTML(item.from || "—")}</td><td>${escapeHTML(item.text)}</td><td>${escapeHTML(item.date || "")}</td><td><span class="status-tag ${isInboxRead(item) ? "success" : "pending"}">${isInboxRead(item) ? "Read" : "New"}</span></td><td><button class="table-action" type="button" data-reception-reply="${index}">Reply</button></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No internal messages available for this account.</p>`}</section><div id="reception-message-section">${renderMessages(true)}</div>`;
	}

	function receptionReportData() {
		const { type, from, to } = receptionReportState;
		const inRange = (date) => (!from || date >= from) && (!to || date <= to);
		const patientById = (id) => store.patients.find((patient) => patient.id === id);
		const idOf = (id) => patientById(id)?.patientNumber || id || "—";
		const appointments = store.receptionAppointments.filter((entry) => inRange(entry.date));
		const timeOf = (iso) => iso ? new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }) : "—";
		switch (type) {
			case "Patient Registration":
				return { headers: ["Patient ID", "Patient Name", "Registration Date", "Registration Status"], rows: store.patients.filter((patient) => inRange(String(patient.registeredAt || "").slice(0, 10))).map((patient) => [patient.patientNumber || "ID pending", patient.name, String(patient.registeredAt || "").slice(0, 10), patient.status || "Registered"]) };
			case "Attendance Report":
				return { headers: ["Patient ID", "Patient Name", "Appointment Date", "Appointment Time", "Check-in Time", "Attendance Status", "Remarks"], rows: appointments.map((entry) => [idOf(entry.patientId), patientName(entry.patientId), entry.date, formatTimeWithPeriod(entry.time), timeOf(entry.checkedInAt), entry.status === "Scheduled" ? (entry.date < new Date().toISOString().slice(0, 10) ? "No-show" : "Scheduled") : entry.status === "No Show" ? "No-show" : entry.status || "Scheduled", entry.remarks || ""]) };
			case "Patient List":
				return { headers: ["Patient ID", "Patient Name", "Contact", "Dialysis Days"], rows: store.patients.map((patient) => [patient.patientNumber || "ID pending", patient.name, patient.contactNumber || patient.phone || "—", (patient.dialysisDays || []).join(", ") || "—"]) };
			case "Cancellations":
				return { headers: ["Patient ID", "Patient Name", "Original Appointment Date", "Original Appointment Time", "Cancellation Date", "Cancellation Reason"], rows: appointments.filter((entry) => entry.status === "Cancelled").map((entry) => [idOf(entry.patientId), patientName(entry.patientId), entry.date, formatTimeWithPeriod(entry.time), String(entry.cancelledAt || "").slice(0, 10) || "—", entry.cancelReason || "Not recorded"]) };
			default:
				return { headers: ["Patient ID", "Patient Name", "Appointment Date", "Appointment Time", "Appointment Type", "Assigned Doctor", "Status"], rows: appointments.map((entry) => [idOf(entry.patientId), patientName(entry.patientId), entry.date, formatTimeWithPeriod(entry.time), entry.type || "Appointment", entry.doctor || "—", entry.status || "Scheduled"]) };
		}
	}

	function receptionReportCounts() {
		const { from, to } = receptionReportState;
		const inRange = (date) => (!from || date >= from) && (!to || date <= to);
		const appointments = store.receptionAppointments.filter((entry) => inRange(entry.date));
		return [
			["Appointments", appointments.length],
			["Registrations", store.patients.filter((patient) => inRange(String(patient.registeredAt || "").slice(0, 10))).length],
			["Attendance", appointments.filter((entry) => Boolean(entry.checkedInAt)).length],
			["Cancellations", appointments.filter((entry) => entry.status === "Cancelled").length]
		];
	}
	function renderReceptionistReports() {
		const { type, from, to } = receptionReportState;
		const { headers, rows } = receptionReportData();
		const types = ["Appointments", "Patient Registration", "Attendance Report", "Patient List", "Cancellations"];
		const period = from || to ? `${from || "start"} to ${to || "present"}` : "All dates";
		return `<div class="stat-grid receptionist-stat-grid">${receptionReportCounts().map(([label, count]) => `<article class="stat-card"><span>${label}</span><strong>${count}</strong></article>`).join("")}</div><section class="portal-panel"><div class="form-grid no-print"><label>Report type<select data-reception-report-type>${types.map((entry) => `<option ${entry === type ? "selected" : ""}>${entry}</option>`).join("")}</select></label><label>From<input type="date" data-reception-report-from value="${escapeHTML(from)}"></label><label>To<input type="date" data-reception-report-to value="${escapeHTML(to)}"></label><div class="form-actions"><button class="secondary-button" type="button" data-reception-export-report>Download PDF</button><button class="primary-button" type="button" data-reception-print-report>Print / Save as PDF</button></div></div><div class="reception-report-sheet"><h3>${escapeHTML(type.toUpperCase())}${type === "Attendance Report" ? "" : " REPORT"}</h3><p class="field-hint">Reporting period: ${escapeHTML(period)}</p>${rows.length ? `<div class="table-wrap"><table class="dietitian-table" data-reception-report-table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No records found for the selected report and date range.</p>`}<p class="field-hint">Total records: ${rows.length} · Prepared by: ${escapeHTML(currentUser.position)} · Generated ${escapeHTML(new Date().toLocaleString())}</p></div></section>`;
	}

	function renderReceptionistProfile() {
		return `<section class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${escapeHTML(currentUser.photo)}" alt="Receptionist profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile picture</p></div><form id="reception-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Email address<input name="email" type="email" value="${escapeHTML(currentUser.email)}" required></label><label>Contact number<input name="contactNumber" type="tel" value="${escapeHTML(currentUser.contactNumber || "")}"></label><label>Job position<input value="${escapeHTML(currentUser.position)}" readonly></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Images are stored with this account. Maximum 500 KB.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button></div></form></section>`;
	}

	function renderReceptionistSettings() {
		const preferences = currentUser.notificationPreferences || {};
		return `<section class="portal-panel"><h3>Notification preferences</h3><form id="reception-preferences-form" class="reception-preferences"><label><input type="checkbox" name="appointments" ${preferences.appointments !== false ? "checked" : ""}> Appointment reminders</label><label><input type="checkbox" name="inquiries" ${preferences.inquiries !== false ? "checked" : ""}> Contact inquiry updates</label><label><input type="checkbox" name="messages" ${preferences.messages !== false ? "checked" : ""}> Internal messages</label><div class="form-actions"><button class="primary-button" type="submit">Save preferences</button><button class="secondary-button" type="button" data-reception-view="reception-profile">Update profile</button></div></form></section>${renderCredentialsForm()}`;
	}

	const STAFF_RECORD_MODULES = {
		"equipment-status": { title: "Equipment Status", statusField: "status", fields: [["assetId", "Asset ID"], ["status", "Status", "select", ["Available", "Operational", "Under Maintenance", "Out of Service", "For Inspection"]], ["notes", "Remarks", "textarea"]] },
		"maintenance-schedule": { title: "Maintenance Schedule", statusField: "status", fields: [["assetId", "Asset ID"], ["activity", "Maintenance activity"], ["dueDate", "Due date", "date"], ["status", "Status", "select", ["Scheduled", "Completed", "Overdue"]], ["notes", "Notes", "textarea"]] },
		"inspection-logs": { title: "Inspection Logs", fields: [["assetId", "Asset ID"], ["date", "Date", "date"], ["checklist", "Inspection checklist", "textarea"], ["findings", "Findings", "textarea"], ["result", "Test result", "select", ["Passed", "Failed", "Needs follow-up"]], ["technician", "Technician name"]] },
		"repair-requests": { title: "Repair Requests", statusField: "status", numbered: "RR", fields: [["assetId", "Asset ID"], ["problem", "Reported problem", "textarea"], ["assignedTo", "Assigned technician"], ["status", "Status", "select", ["Open", "In Progress", "Resolved", "Closed"]], ["outcome", "Repair outcome"]] },
		"water-treatment": { title: "Water Treatment Monitoring", fields: [["date", "Date", "date"], ["measurement", "Measurement"], ["value", "Result value"], ["limit", "Approved limit"], ["personnel", "Responsible personnel"]], alert: (record) => Number(record.value) > Number(record.limit) },
		"incident-reports": { title: "Incident Reports", statusField: "status", fields: [["date", "Date", "date"], ["equipment", "Affected equipment"], ["details", "Incident details", "textarea"], ["actions", "Actions taken", "textarea"], ["status", "Review status", "select", ["Reported", "Under Review", "Corrective Action Done"]]] },
		"clinical-notes": { title: "Clinical Notes", statusField: "status", patient: true, fields: [["chiefComplaint", "Chief complaint", "textarea"], ["history", "History of present illness", "textarea"], ["physical", "Physical assessment", "textarea"], ["vitals", "Vital signs"], ["diagnosis", "Assessment and diagnosis", "textarea"], ["plan", "Treatment plan", "textarea"], ["prescriptions", "Prescriptions", "textarea"], ["followUp", "Follow-up instructions", "textarea"], ["status", "Note status", "select", ["Draft", "Finalized"]]] },
		"medical-records": { title: "Medical Records", patient: true, fields: [["category", "Record type", "select", ["Medical History", "Surgical History", "Allergies", "Medication History", "Vital Signs", "Treatment Plans", "Consultation History"]], ["date", "Date", "date"], ["details", "Details", "textarea"]] },
		"laboratory-results": { title: "Laboratory Results", statusField: "review", patient: true, fields: [["test", "Test name"], ["date", "Date requested", "date"], ["result", "Result value, unit and reference range", "textarea"], ["flag", "Flag", "select", ["Normal", "High", "Low", "Abnormal"]], ["remarks", "Laboratory remarks"], ["review", "Review", "select", ["Pending", "Acknowledged"]]] },
		"dialysis-treatment": { title: "Dialysis Treatment", statusField: "status", patient: true, fields: [["date", "Treatment date", "date"], ["session", "Session no. / time"], ["preAssessment", "Pre-dialysis assessment", "textarea"], ["postAssessment", "Post-dialysis assessment", "textarea"], ["machine", "Machine and station"], ["access", "Vascular access assessment"], ["ultrafiltration", "Ultrafiltration (prescribed / actual)"], ["complications", "Treatment complications", "textarea"], ["status", "Treatment status", "select", ["Scheduled", "In Progress", "Completed", "Discontinued"]]] }
	};

	function renderStaffRecordModule(key, kicker) {
		const config = STAFF_RECORD_MODULES[key];
		const records = (store.staffRecords[key] || []).slice().reverse();
		const input = ([name, label, type = "text", options = []]) => `<label class="${type === "textarea" ? "full-width" : ""}">${label}${type === "select" ? `<select name="${name}">${options.map((option) => `<option>${option}</option>`).join("")}</select>` : type === "textarea" ? `<textarea name="${name}" rows="2"></textarea>` : `<input name="${name}" type="${type}">`}</label>`;
		const columns = [...(config.patient ? [["patientId", "Patient"]] : []), ...config.fields];
		const cell = (record, [name]) => {
			if (name === "patientId") return escapeHTML(patientName(record.patientId));
			if (name === config.statusField) {
				const field = config.fields.find((entry) => entry[0] === name);
				return `<select data-staff-record-status="${escapeHTML(key)}|${escapeHTML(record.id)}|${name}">${field[3].map((option) => `<option ${record[name] === option ? "selected" : ""}>${option}</option>`).join("")}</select>`;
			}
			return escapeHTML(record[name] || "—");
		};
		return `<div class="section-heading"><div><p class="portal-kicker">${kicker}</p><h2>${config.title}</h2></div></div><section class="portal-panel"><h3>Add record</h3><form class="form-grid" data-staff-record-form="${key}">${config.patient ? `<label>Patient<select name="patientId" required>${patientOptions("")}</select></label>` : ""}${config.fields.map(input).join("")}<div class="form-actions"><button class="primary-button" type="submit">Save</button></div></form></section><section class="portal-panel"><h3>${config.title} records</h3>${records.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr>${config.numbered ? "<th>Request no.</th>" : ""}${columns.map(([, label]) => `<th>${label}</th>`).join("")}<th>Alert</th><th>Action</th></tr></thead><tbody>${records.map((record) => `<tr>${config.numbered ? `<td>${escapeHTML(record.number)}</td>` : ""}${columns.map((column) => `<td>${cell(record, column)}</td>`).join("")}<td>${config.alert?.(record) ? `<span class="status-tag pending">Over limit</span>` : "—"}</td><td><button class="table-action danger" type="button" data-staff-record-delete="${escapeHTML(key)}|${escapeHTML(record.id)}">Delete</button></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No records yet.</p>`}</section>`;
	}

	function renderDoctorPatients() {
		const today = new Date().toISOString().slice(0, 10);
		const selectedPatient = store.patients.find((patient) => patient.id === activeDoctorPatientId);
		const patientRows = store.patients
			.slice()
			.sort((first, second) => first.name.localeCompare(second.name))
			.map((patient) => {
				const nextAppointment = store.receptionAppointments
					.filter((entry) => entry.patientId === patient.id && entry.date >= today && entry.status !== "Cancelled")
					.sort((first, second) => `${first.date} ${first.time || ""}`.localeCompare(`${second.date} ${second.time || ""}`))[0];
				const searchText = `${patient.name} ${patient.patientNumber || ""} ${patient.id}`.toLowerCase();
				return `<tr data-doctor-patient-row data-search="${escapeHTML(searchText)}"><td><strong>${escapeHTML(patient.name)}</strong></td><td>${escapeHTML(patient.patientNumber || patient.id)}</td><td>${escapeHTML(patient.age ?? "—")}</td><td>${escapeHTML(patient.gender || "—")}</td><td>${escapeHTML(patient.contactNumber || "—")}</td><td>${nextAppointment ? `${escapeHTML(nextAppointment.date)} · ${escapeHTML(formatTimeWithPeriod(nextAppointment.time || ""))}` : "—"}</td><td><button class="table-action" type="button" data-doctor-open-patient="${escapeHTML(patient.id)}">View profile</button></td></tr>`;
			}).join("");
		const profile = selectedPatient
			? `<section class="portal-panel doctor-patient-profile"><div class="panel-heading"><div><p class="portal-kicker">PATIENT PROFILE</p><h3>${escapeHTML(selectedPatient.name)}</h3></div><span class="demo-chip">${escapeHTML(selectedPatient.patientNumber || "ID not assigned")}</span></div><dl class="profile-details"><div><dt>Age / Sex</dt><dd>${escapeHTML(selectedPatient.age ?? "Not recorded")} / ${escapeHTML(selectedPatient.gender || "Not recorded")}</dd></div><div><dt>Contact</dt><dd>${escapeHTML(selectedPatient.contactNumber || "Not recorded")}</dd></div><div><dt>Email</dt><dd>${escapeHTML(selectedPatient.email || "Not recorded")}</dd></div><div><dt>Dialysis type</dt><dd>${escapeHTML(selectedPatient.dialysisType || "Not recorded")}</dd></div><div><dt>Dialysis days</dt><dd>${escapeHTML((selectedPatient.dialysisDays || []).join(", ") || "Not assigned")}</dd></div><div><dt>Assigned time</dt><dd>${escapeHTML(formatTimeWithPeriod(selectedPatient.timeIn || "Not recorded"))}–${escapeHTML(formatTimeWithPeriod(selectedPatient.timeOut || "Not recorded"))}</dd></div></dl><div class="form-actions"><button class="secondary-button" type="button" data-go-view="medical-records">Open medical records</button><button class="secondary-button" type="button" data-go-view="clinical-notes">Open clinical notes</button></div></section>`
			: "";
		return `<div class="section-heading"><div><p class="portal-kicker">DOCTOR WORKSPACE</p><h2>My Patients</h2><p class="muted-copy">Review patient profiles and open their clinical records.</p></div><span class="demo-chip">${store.patients.length} PATIENTS</span></div><section class="portal-panel"><div class="doctor-table-toolbar"><h3>Patient directory</h3><label class="doctor-search">Search patients<input type="search" data-doctor-patient-search placeholder="Name or patient number"></label></div>${store.patients.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Name</th><th>Patient ID</th><th>Age</th><th>Sex</th><th>Contact</th><th>Next appointment</th><th>Action</th></tr></thead><tbody>${patientRows}</tbody></table></div><p class="empty-state" data-doctor-patient-empty hidden>No patients match this search.</p>` : `<p class="empty-state">No patients have been registered yet.</p>`}</section>${profile}`;
	}

	function saveStaffRecord(event) {
		event.preventDefault();
		const key = event.currentTarget.dataset.staffRecordForm;
		const record = { id: makeId("record"), createdBy: currentUser.id, createdAt: new Date().toISOString(), ...Object.fromEntries(new FormData(event.currentTarget)) };
		if (STAFF_RECORD_MODULES[key].numbered) record.number = `${STAFF_RECORD_MODULES[key].numbered}-${String((store.staffRecords[key] || []).length + 1).padStart(4, "0")}`;
		(store.staffRecords[key] = store.staffRecords[key] || []).push(record);
		addAudit(store, `${STAFF_RECORD_MODULES[key].title} record added by ${currentUser.name}`);
		saveStore(store);
		renderView();
	}
	function renderDoctorView(view) {
		if (view === "dashboard") return renderDoctorDashboard();
		if (view === "appointments") return renderDoctorSchedule();
		if (view === "notifications") return renderDoctorNotifications();
		if (view === "profile") return renderAdminProfile("My Profile");
		if (view === "settings") return `<div class="section-heading"><div><p class="portal-kicker">DOCTOR ACCOUNT</p><h2>Settings</h2></div></div>${renderCredentialsForm()}`;
		if (view === "my-patients") return renderDoctorPatients();
		if (STAFF_RECORD_MODULES[view]) return `<div class="doctor-record-view">${renderStaffRecordModule(view, "DOCTOR WORKSPACE")}</div>`;
		return "";
	}

	function renderNurseView(view) {
		if (view === "dashboard") return renderNurseDashboard();
		if (view === "assigned-patients") return renderNurseAssignedPatients();
		if (view === "dialysis-schedule") return renderNurseSchedule();
		if (view === "machine-inventory") return renderEquipment();
		if (view === "medication-administration") return renderNurseMedicationAdministration();
		if (view === "nursing-care-plan") return renderNurseCarePlans();
		if (view === "nursing-assessment") return renderNurseAssessments();
		if (view === "treatment-monitoring") return renderNurseTreatmentMonitoring();
		if (view === "laboratory-results") return renderNurseLaboratoryResults();
		if (view === "nursing-notes") return renderNurseNotes();
		if (view === "patient-endorsement") return renderNurseEndorsements();
		if (view === "reports") return renderAdminReports();
		if (view === "notifications") return renderNurseNotifications();
		if (view === "profile") return renderNurseProfile();
		if (view === "settings") return renderNurseSettings();
		return "";
	}

	function renderNurseNotifications() {
		const today = ["Sunday", ...DAY_NAMES][new Date().getDay()];
		const todayPatients = store.patients.filter((patient) => (patient.dialysisDays || []).includes(today));
		const todayDate = nurseDateKey();
		const upcomingSessions = getNurseUpcomingSessions();
		const missingNotes = todayPatients.filter((patient) => !store.notes.some((note) => note.patientId === patient.id && note.date === todayDate));
		const abnormalLabs = store.laboratory.filter((record) => getLaboratoryStatus(record.testId, record.results, record.patientGender).abnormal);
		const staffAlerts = store.staffNotifications.filter((notification) => notification.recipientId === currentUser.id && notification.type !== "contact-message");
		const preferences = currentUser.notificationPreferences || {};
		const items = [
			...(preferences.treatments === false ? [] : upcomingSessions.map(({ patient, date, weekday }) => ({ date: `${weekday} · ${date}`, text: `Upcoming dialysis treatment: ${patient.name} · ${formatTimeWithPeriod(patient.timeIn || "Time not recorded")}–${formatTimeWithPeriod(patient.timeOut || "Time not recorded")}` }))),
			...(preferences.documentation === false ? [] : missingNotes.map((patient) => ({ date: "Documentation", text: `No nursing note recorded today for ${patient.name}.` }))),
			...(preferences.clinicalAlerts === false ? [] : abnormalLabs.map((record) => ({ date: record.date, text: `Laboratory result needs review: ${patientName(record.patientId)} · ${record.testName}: ${record.results}` }))),
			...staffAlerts.map((notification) => ({ date: notification.date || "Staff alert", text: notification.message || notification.text || notification.type || "Staff notification" }))
		];
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Notifications</h2></div></div><section class="portal-panel"><p class="muted-copy">Upcoming treatments, pending documentation, and relevant clinical alerts. Review abnormal results with the care team according to center protocol.</p>${items.length ? `<ul class="activity-list">${items.map((item) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(item.text)}</strong><small>${escapeHTML(item.date)}</small></div></li>`).join("")}</ul>` : `<p class="empty-state">Walang nurse alerts o reminders sa ngayon.</p>`}</section>`;
	}

	function nurseDateKey(date = new Date()) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	}

	function getNurseUpcomingSessions() {
		const now = new Date();
		const days = ["Sunday", ...DAY_NAMES];
		return store.patients.flatMap((patient) => Array.from({ length: 7 }, (_, offset) => {
			const date = new Date(now);
			date.setDate(now.getDate() + offset);
			const weekday = days[date.getDay()];
			return (patient.dialysisDays || []).includes(weekday)
				? { patient, date: nurseDateKey(date), weekday }
				: null;
		}).filter(Boolean));
	}

	function nursePatientSelect(name = "patientId") {
		if (!store.patients.some((patient) => patient.id === activeNursePatientId)) {
			activeNursePatientId = store.patients[0]?.id || "";
		}
		return store.patients.length
			? `<label>Patient<select name="${name}" required>${patientOptions(activeNursePatientId)}</select></label>`
			: `<p class="empty-state">Walang patient records. Magdagdag muna ng patient record.</p>`;
	}

	function nurseDateTimeValue() {
		const now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		return now.toISOString().slice(0, 16);
	}

	function nurseRecordsTable(records, headers, renderRow) {
		return records.length
			? `<div class="table-wrap nurse-history-table-wrap"><table class="nurse-history-table"><thead><tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead><tbody>${records.map(renderRow).join("")}</tbody></table></div>`
			: `<p class="empty-state">Wala pang record para sa patient na ito.</p>`;
	}

	function nurseEditingRecord(collection, patientId) {
		if (!activeNurseRecordEdit || activeNurseRecordEdit.collection !== collection) return null;
		return store[collection].find((record) => record.id === activeNurseRecordEdit.id && record.patientId === patientId) || null;
	}

	function nurseRecordActions(record, collection) {
		return `<div class="nurse-record-actions"><button class="table-action" type="button" data-nurse-edit-record="${escapeHTML(record.id)}" data-nurse-record-collection="${collection}">Edit</button><button class="table-action danger" type="button" data-nurse-delete-record="${escapeHTML(record.id)}" data-nurse-record-collection="${collection}">Delete</button></div>`;
	}

	function ensureNurseMARStarterData() {
		const sampleMedicationOrders = [
			{ product: "Epoetin Alfa", dosage: "4,000 IU", route: "Subcutaneous", frequency: "2/week" },
			{ product: "Calcium Acetate", dosage: "667 mg", route: "PO", frequency: "TID" },
			{ product: "Iron Sucrose", dosage: "100 mg", route: "IV", frequency: "1/week" }
		];
		const sampleAdminTime = nurseDateTimeValue();
		let changed = false;
		store.patients.forEach((patient) => {
			if (patient.nurseMARStarterSeeded) return;
			sampleMedicationOrders.forEach((medication, index) => {
				const prescriptionId = `prescription-mar-v7-${patient.id}-${index + 1}`;
				let prescription = store.prescriptions.find((record) => record.id === prescriptionId && record.patientId === patient.id);
				if (!prescription) {
					prescription = {
						id: prescriptionId,
						patientId: patient.id,
						type: "medication",
						...medication,
						date: nurseDateKey(),
						instructions: "",
						isNurseMARSample: true
					};
					store.prescriptions.push(prescription);
				} else {
					prescription.isNurseMARSample = true;
				}
				const hasAdministration = store.medicationAdministrations.some((record) => record.patientId === patient.id && record.prescriptionId === prescriptionId);
				if (index < 2 && !hasAdministration) {
					store.medicationAdministrations.push({
						id: `med-admin-v7-${patient.id}-${index + 1}`,
						patientId: patient.id,
						prescriptionId,
						...medication,
						administeredAt: sampleAdminTime,
						note: "",
						createdAt: new Date().toISOString(),
						nurseId: "NURSE-02",
						nurseName: "Nurse 02"
					});
				}
			});
			patient.nurseMARStarterSeeded = true;
			changed = true;
		});
		if (changed) saveStore(store);
	}

	function saveNurseRecord(collection, id, patient, fields, message) {
		const record = id && store[collection].find((entry) => entry.id === id && entry.patientId === patient.id);
		if (id && !record) {
			window.alert("Hindi mahanap ang record para sa napiling patient. I-refresh at subukan ulit.");
			return false;
		}
		const nurseId = String(currentUser.nurseId || currentUser.id);
		if (record) {
			Object.assign(record, fields, {
				isSample: false,
				updatedAt: new Date().toISOString(),
				nurseId,
				nurseName: currentUser.name
			});
		} else {
			store[collection].unshift({
				id: makeId(collection),
				patientId: patient.id,
				...fields,
				createdAt: new Date().toISOString(),
				nurseId,
				nurseName: currentUser.name
			});
		}
		activeNurseRecordEdit = null;
		addAudit(store, `${message} ${record ? "updated" : "saved"} for ${patient.name}`, "profile");
		saveStore(store);
		renderView();
		return true;
	}

	function renderNurseAssignedPatients() {
		const rows = store.patients.map((patient) => `<tr data-nurse-patient-row data-patient-search="${escapeHTML([patient.name, patient.patientNumber, patient.dialysisType, patient.center].join(" ").toLowerCase())}"><td>${escapeHTML(patient.name)}</td><td>${escapeHTML(patient.patientNumber || "Not assigned")}</td><td>${escapeHTML(patient.dialysisType || "Not set")}</td><td>${escapeHTML(patient.center || "Not set")}</td><td>${escapeHTML((patient.dialysisDays || []).join(", ") || "No days assigned")}</td><td>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "Not recorded"))} – ${escapeHTML(formatTimeWithPeriod(patient.timeOut || "Not recorded"))}</td><td><button class="table-action" type="button" data-nurse-open-assessment="${escapeHTML(patient.id)}">Assess</button></td></tr>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Assigned Patients</h2></div></div><section class="portal-panel"><p class="muted-copy">Nurse access currently includes all registered patients, as requested. View only the patient details needed for care and treatment coordination.</p><label class="nurse-search">Search patient<input type="search" data-nurse-patient-filter placeholder="Name, patient ID, type, or center"></label>${store.patients.length ? `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Patient ID</th><th>Dialysis type</th><th>Center</th><th>Treatment days</th><th>Time</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div><p class="empty-state" data-nurse-patient-empty hidden>No patients match your search.</p>` : `<p class="empty-state">Walang patient records.</p>`}</section>`;
	}

	function renderNurseSchedule() {
		const weekday = ["Sunday", ...DAY_NAMES][new Date().getDay()];
		const todayDate = nurseDateKey();
		const scheduledPatients = store.patients.filter((patient) => (patient.dialysisDays || []).includes(weekday));
		const statusOptions = ["Scheduled", "Checked In", "In Treatment", "Completed", "Cancelled"];
		const todaySessions = scheduledPatients.map((patient) => {
			const session = store.dialysisSessions.find((entry) => entry.patientId === patient.id && entry.date === todayDate);
			const status = session?.status || "Scheduled";
			return `<li><span class="activity-mark"></span><div><strong>${escapeHTML(patient.name)}</strong><small>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "Time not recorded"))} – ${escapeHTML(formatTimeWithPeriod(patient.timeOut || "Time not recorded"))} · ${escapeHTML(patient.accessSite || "Access not recorded")}</small><form class="form-actions" data-nurse-session-status-form><input type="hidden" name="patientId" value="${escapeHTML(patient.id)}"><input type="hidden" name="date" value="${escapeHTML(todayDate)}"><label>Treatment status<select name="status">${statusOptions.map((option) => `<option ${option === status ? "selected" : ""}>${option}</option>`).join("")}</select></label><button class="secondary-button" type="submit">Update status</button>${session ? `<button class="table-action danger" type="button" data-nurse-delete-session="${escapeHTML(session.id)}" data-patient-id="${escapeHTML(patient.id)}" data-session-date="${escapeHTML(todayDate)}">Reset to Scheduled</button>` : ""}</form></div></li>`;
		}).join("");
		const roster = store.patients.slice().sort((a, b) => a.name.localeCompare(b.name)).map((patient) => `<tr><td>${escapeHTML(patient.name)}</td><td>${escapeHTML((patient.dialysisDays || []).join(", ") || "No days assigned")}</td><td>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "Not recorded"))} – ${escapeHTML(formatTimeWithPeriod(patient.timeOut || "Not recorded"))}</td><td>${escapeHTML(patient.accessSite || "Not recorded")}</td><td>${(patient.dialysisDays || []).includes(weekday) ? escapeHTML(store.dialysisSessions.find((entry) => entry.patientId === patient.id && entry.date === todayDate)?.status || "Scheduled") : "Upcoming / not today"}</td></tr>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Dialysis Schedule</h2></div></div><section class="portal-panel"><p class="muted-copy">Schedule is based on recurring patient dialysis days. Update today's treatment status as care progresses.</p><h3>Today · ${escapeHTML(weekday)}</h3>${scheduledPatients.length ? `<ul class="activity-list">${todaySessions}</ul>` : `<p class="empty-state">Walang dialysis schedule para sa araw na ito.</p>`}</section><section class="portal-panel"><h3>Patient treatment schedule</h3>${roster ? `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Assigned days</th><th>Time</th><th>Vascular access</th><th>Today's status</th></tr></thead><tbody>${roster}</tbody></table></div>` : `<p class="empty-state">Walang patient schedule.</p>`}</section>`;
	}

	function renderNurseMedicationAdministration() {
		ensureNurseMARStarterData();
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const nurseId = String(currentUser.nurseId || currentUser.id);
		const orders = patient ? store.prescriptions.filter((record) => record.patientId === patient.id && String(record.type).toLowerCase() === "medication") : [];
		const administrations = patient ? store.medicationAdministrations.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("medicationAdministrations", patient.id) : null;
		const selectedOrder = orders.find((order) => order.id === editing?.prescriptionId);
		const marDate = activeNurseMARDate || nurseDateKey();
		const canRecord = orders.length || editing;
		const administrationRows = orders.flatMap((order) => {
			const records = administrations.filter((record) => record.prescriptionId === order.id && String(record.administeredAt || "").slice(0, 10) === marDate);
			return records.length ? records.map((record) => ({ order, record })) : [{ order, record: null }];
		});
		const orderIds = new Set(orders.map((order) => order.id));
		const historicalRows = administrations.filter((record) => !orderIds.has(record.prescriptionId) && String(record.administeredAt || "").slice(0, 10) === marDate).map((record) => ({ order: record, record }));
		const rows = [...administrationRows, ...historicalRows].map(({ order, record }) => `<tr><td><strong>${escapeHTML(order.product)}</strong></td><td>${escapeHTML(order.dosage)}</td><td>${escapeHTML(order.route)}</td><td>${escapeHTML(order.frequency || order.instructions || "Not recorded")}</td><td><span class="mar-status ${record ? "given" : "pending"}">${record ? "Given" : "Pending"}</span></td><td>${record ? `<span>${escapeHTML(String(record.administeredAt).replace("T", " "))}</span><small class="mar-nurse-id">${escapeHTML(record.nurseName || "Nurse")} · ${escapeHTML(record.nurseId || "")}</small>` : "—"}</td><td>${record ? nurseRecordActions(record, "medicationAdministrations") : "—"}</td></tr>`).join("");
		return `<section class="portal-panel mar-panel">
				<div class="mar-toolbar"><form class="mar-patient-form" data-nurse-patient-form>${nursePatientSelect()}</form><label class="mar-date-field">Administration date<input type="date" data-nurse-mar-date value="${escapeHTML(marDate)}"></label></div>
				${patient ? `<div class="mar-table-heading"><h3>Medication orders · ${escapeHTML(patient.name)}</h3><span>${escapeHTML(patient.patientNumber || "Patient")}</span></div>${orders.length ? `<div class="table-wrap mar-table-wrap"><table class="mar-table"><thead><tr><th>Medication</th><th>Dosage</th><th>Route</th><th>Frequency</th><th>Status</th><th>Time given / nurse ID</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">Walang clinician-authorized medication orders para sa patient na ito.</p>`}<div class="mar-record-heading"><h3>Record Administration</h3>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel edit</button>` : ""}</div>${canRecord ? `<form id="nurse-mar-form" class="form-grid mar-entry-form"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Medication<select name="prescriptionId" required>${orders.map((order) => `<option value="${escapeHTML(order.id)}" ${order.id === (editing?.prescriptionId || orders[0]?.id) ? "selected" : ""}>${escapeHTML(order.product)} · ${escapeHTML(order.dosage)} · ${escapeHTML(order.route)} · ${escapeHTML(order.frequency || order.instructions || "Frequency not recorded")}</option>`).join("")}${editing && !selectedOrder ? `<option value="${escapeHTML(editing.prescriptionId || "")}" selected>${escapeHTML(editing.product)} · historical order</option>` : ""}</select></label><label>Time given<input name="administeredAt" type="datetime-local" value="${escapeHTML(editing?.administeredAt || (marDate === nurseDateKey() ? nurseDateTimeValue() : `${marDate}T08:00`))}" required></label><label>Nurse ID<input type="text" value="${escapeHTML(nurseId)}" readonly></label><label>Administration note<input name="note" type="text" maxlength="500" value="${escapeHTML(editing?.note || "")}" placeholder="Optional"></label><div class="form-actions full-width"><button class="primary-button" type="submit">${editing ? "Save changes" : "Save"}</button></div></form>` : `<p class="empty-state">Walang medication order na maaaring i-record para sa patient na ito.</p>`}` : `<p class="empty-state">Pumili ng patient para makita ang medication records.</p>`}
			</section>`;
	}

	function renderNurseCarePlans() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const records = patient ? store.nursingCarePlans.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("nursingCarePlans", patient.id) : null;
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Nursing Care Plan</h2></div></div><section class="portal-panel"><p class="field-hint">Document the care plan according to the care team's assessment and approved clinical workflow.</p><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<form id="nurse-care-plan-form" class="form-grid"><input type="hidden" name="carePlanId" value="${escapeHTML(editing?.id || "")}"><label>Assessment<textarea name="assessment" rows="2" required>${escapeHTML(editing?.assessment || "")}</textarea></label><label>Nursing diagnosis<textarea name="diagnosis" rows="2" required>${escapeHTML(editing?.diagnosis || "")}</textarea></label><label>Planning / goals<textarea name="planning" rows="2" required>${escapeHTML(editing?.planning || "")}</textarea></label><label>Implementation / interventions<textarea name="implementation" rows="2" required>${escapeHTML(editing?.implementation || "")}</textarea></label><label class="full-width">Evaluation / patient outcomes<textarea name="evaluation" rows="2" required>${escapeHTML(editing?.evaluation || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update care plan" : "Save care plan"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Saved care plans · ${escapeHTML(patient.name)}</h3>${nurseRecordsTable(records, ["Date and time", "Assessment", "Nursing diagnosis", "Planning / goals", "Implementation / interventions", "Evaluation / patient outcomes", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.updatedAt || record.createdAt)}</td><td>${escapeHTML(record.assessment)}</td><td>${escapeHTML(record.diagnosis)}</td><td>${escapeHTML(record.planning)}</td><td>${escapeHTML(record.implementation)}</td><td>${escapeHTML(record.evaluation)}</td><td>${escapeHTML(record.nurseName)} · ${escapeHTML(record.nurseId)}</td><td>${nurseRecordActions(record, "nursingCarePlans")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseAssessments() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const records = patient ? store.nursingAssessments.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("nursingAssessments", patient.id) : null;
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Nursing Assessment</h2></div></div><section class="portal-panel"><p class="field-hint">Record observed findings as documented; use the center's clinical protocol for interpretation and escalation.</p><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<form id="nurse-assessment-form" class="form-grid"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Date and time<input name="observedAt" type="datetime-local" value="${escapeHTML(editing?.observedAt || nurseDateTimeValue())}" required></label><label>Vital signs<input name="vitalSigns" maxlength="200" placeholder="As observed" value="${escapeHTML(editing?.vitalSigns || "")}"></label><label>Weight<input name="weight" maxlength="60" value="${escapeHTML(editing?.weight || "")}"></label><label>Edema<input name="edema" maxlength="120" value="${escapeHTML(editing?.edema || "")}"></label><label>Pain score<input name="painScore" maxlength="40" value="${escapeHTML(editing?.painScore || "")}"></label><label>Fatigue<input name="fatigue" maxlength="120" value="${escapeHTML(editing?.fatigue || "")}"></label><label>Lung sounds<input name="lungSounds" maxlength="160" value="${escapeHTML(editing?.lungSounds || "")}"></label><label class="full-width">Other findings<textarea name="otherFindings" rows="3">${escapeHTML(editing?.otherFindings || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update assessment" : "Save assessment"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Assessment history · ${escapeHTML(patient.name)}</h3>${nurseRecordsTable(records, ["Date and time", "Vital signs", "Weight", "Edema", "Pain score", "Fatigue", "Lung sounds", "Other findings", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.observedAt)}</td><td>${escapeHTML(record.vitalSigns || "—")}</td><td>${escapeHTML(record.weight || "—")}</td><td>${escapeHTML(record.edema || "—")}</td><td>${escapeHTML(record.painScore || "—")}</td><td>${escapeHTML(record.fatigue || "—")}</td><td>${escapeHTML(record.lungSounds || "—")}</td><td>${escapeHTML(record.otherFindings || "—")}</td><td>${escapeHTML(record.nurseName)} · ${escapeHTML(record.nurseId)}</td><td>${nurseRecordActions(record, "nursingAssessments")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseTreatmentMonitoring() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const records = patient ? store.treatmentMonitoring.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("treatmentMonitoring", patient.id) : null;
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Treatment Monitoring</h2></div></div><section class="portal-panel"><p class="field-hint">Record observations during treatment. Do not use this form to diagnose or recommend treatment changes.</p><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<form id="nurse-monitoring-form" class="form-grid"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Date and time<input name="observedAt" type="datetime-local" value="${escapeHTML(editing?.observedAt || nurseDateTimeValue())}" required></label><label>Vascular access type<input name="accessType" value="${escapeHTML(editing?.accessType ?? patient.accessSite ?? "")}" maxlength="100"></label><label>Bruit / thrill findings<input name="bruitThrill" maxlength="200" value="${escapeHTML(editing?.bruitThrill || "")}"></label><label>Patient response<input name="response" maxlength="300" value="${escapeHTML(editing?.response || "")}"></label><label class="full-width">Treatment observations<textarea name="observations" rows="3">${escapeHTML(editing?.observations || "")}</textarea></label><label class="full-width">Complications / concerns<textarea name="complications" rows="3">${escapeHTML(editing?.complications || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update monitoring record" : "Save monitoring record"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Monitoring history · ${escapeHTML(patient.name)}</h3>${nurseRecordsTable(records, ["Date and time", "Vascular access type", "Bruit / thrill", "Patient response", "Treatment observations", "Complications / concerns", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.observedAt)}</td><td>${escapeHTML(record.accessType || "—")}</td><td>${escapeHTML(record.bruitThrill || "—")}</td><td>${escapeHTML(record.response || "—")}</td><td>${escapeHTML(record.observations || "—")}</td><td>${escapeHTML(record.complications || "—")}</td><td>${escapeHTML(record.nurseName)} · ${escapeHTML(record.nurseId)}</td><td>${nurseRecordActions(record, "treatmentMonitoring")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseLaboratoryResults() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const results = patient ? store.laboratory.filter((record) => record.patientId === patient.id) : [];
		const followUps = patient ? store.laboratoryFollowUps.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("laboratoryFollowUps", patient.id) : null;
		const abnormal = results.filter((record) => getLaboratoryStatus(record.testId, record.results, record.patientGender || patient?.gender).abnormal);
		const selectedResult = results.find((record) => record.id === editing?.laboratoryId);
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Laboratory Results</h2></div></div><section class="portal-panel"><p class="field-hint">Results are displayed from the patient chart. Interpret and escalate according to the reporting laboratory and center protocol.</p><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<h3>Latest results · ${escapeHTML(patient.name)}</h3>${results.length ? renderLaboratoryRecords(results, patient) : `<p class="empty-state">Wala pang laboratory records.</p>`}${abnormal.length ? `<p class="field-hint">${abnormal.length} result(s) flagged for review based on stored reference information. This is not a diagnosis.</p>` : ""}<form id="nurse-lab-followup-form" class="form-grid"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Result to follow up<input name="testName" type="text" maxlength="160" value="${escapeHTML(editing?.testName || selectedResult?.testName || "")}" placeholder="Enter test or result name" required></label><label>Follow-up status<select name="status">${["Follow-up documented", "Escalated per protocol", "Care team notified"].map((status) => `<option ${status === (editing?.status || "Follow-up documented") ? "selected" : ""}>${status}</option>`).join("")}</select></label><label class="full-width">Follow-up note<textarea name="note" rows="3" required>${escapeHTML(editing?.note || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update follow-up" : "Save follow-up"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Follow-up history</h3>${nurseRecordsTable(followUps, ["Date and time", "Result / test", "Status", "Follow-up note", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.createdAt)}</td><td>${escapeHTML(record.testName)}</td><td>${escapeHTML(record.status)}</td><td>${escapeHTML(record.note)}</td><td>${escapeHTML(record.nurseName)} · ${escapeHTML(record.nurseId)}</td><td>${nurseRecordActions(record, "laboratoryFollowUps")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseNotes() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const records = patient ? store.notes.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("notes", patient.id) : null;
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Nursing Notes</h2></div></div><section class="portal-panel"><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<form id="nurse-note-form" class="form-grid"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Date and time<input name="createdAt" type="datetime-local" value="${escapeHTML(editing?.createdAt || nurseDateTimeValue())}" required></label><label class="full-width">Patient condition, care / interventions, and response<textarea name="text" rows="4" maxlength="2000" required>${escapeHTML(editing?.text || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update nursing note" : "Save nursing note"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Notes · ${escapeHTML(patient.name)}</h3>${nurseRecordsTable(records, ["Date and time", "Patient condition, care / interventions, and response", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.createdAt || record.date || "")}</td><td>${escapeHTML(record.text || renderNursingAssessment(record))}</td><td>${escapeHTML(record.nurseName || "—")} · ${escapeHTML(record.nurseId || "—")}</td><td>${nurseRecordActions(record, "notes")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseEndorsements() {
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const records = patient ? store.patientEndorsements.filter((record) => record.patientId === patient.id) : [];
		const editing = patient ? nurseEditingRecord("patientEndorsements", patient.id) : null;
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Patient Endorsement</h2></div></div><section class="portal-panel"><p class="field-hint">Record a shift handoff for the incoming nurse. Follow the center's approved handoff procedure.</p><form class="form-grid" data-nurse-patient-form>${nursePatientSelect()}</form>${patient ? `<form id="nurse-endorsement-form" class="form-grid"><input type="hidden" name="recordId" value="${escapeHTML(editing?.id || "")}"><label>Shift / incoming nurse<input name="shift" maxlength="120" placeholder="Optional" value="${escapeHTML(editing?.shift || "")}"></label><label class="full-width">Current condition<textarea name="condition" rows="2" required>${escapeHTML(editing?.condition || "")}</textarea></label><label class="full-width">Completed care<textarea name="completedCare" rows="2" required>${escapeHTML(editing?.completedCare || "")}</textarea></label><label class="full-width">Pending tasks<textarea name="pendingTasks" rows="2">${escapeHTML(editing?.pendingTasks || "")}</textarea></label><label class="full-width">Important concerns<textarea name="concerns" rows="2">${escapeHTML(editing?.concerns || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update endorsement" : "Save endorsement"}</button>${editing ? `<button class="secondary-button" type="button" data-nurse-cancel-record-edit>Cancel</button>` : ""}</div></form><h3>Endorsement history · ${escapeHTML(patient.name)}</h3>${nurseRecordsTable(records, ["Date and time", "Shift / incoming nurse", "Current condition", "Completed care", "Pending tasks", "Important concerns", "Nurse", "Actions"], (record) => `<tr><td>${escapeHTML(record.createdAt)}</td><td>${escapeHTML(record.shift || "—")}</td><td>${escapeHTML(record.condition)}</td><td>${escapeHTML(record.completedCare)}</td><td>${escapeHTML(record.pendingTasks || "—")}</td><td>${escapeHTML(record.concerns || "—")}</td><td>${escapeHTML(record.nurseName)} · ${escapeHTML(record.nurseId)}</td><td>${nurseRecordActions(record, "patientEndorsements")}</td></tr>`)}` : ""}</section>`;
	}

	function renderNurseProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE ACCOUNT</p><h2>My Profile</h2></div></div><section class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${escapeHTML(currentUser.photo)}" alt="Nurse profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="nurse-own-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Email<input type="email" value="${escapeHTML(currentUser.email)}" readonly></label><label>Contact number<input name="contactNumber" type="tel" value="${escapeHTML(currentUser.contactNumber || "")}" autocomplete="tel"></label><label>Nursing ID<input name="nurseId" value="${escapeHTML(currentUser.nurseId || currentUser.id)}" maxlength="60" required></label><label>Job position<input value="${escapeHTML(currentUser.position)}" readonly></label><label class="full-width">Profile picture<input id="nurse-own-photo-input" type="file" accept="image/*"><span class="field-hint">Images are stored in this browser only; maximum 500 KB.</span></label><button class="primary-button" type="submit">Save profile</button></form></section>`;
	}

	function renderNurseSettings() {
		const preferences = currentUser.notificationPreferences || {};
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE ACCOUNT</p><h2>Settings</h2></div></div><form id="nurse-preferences-form" class="portal-panel form-grid"><h3 class="full-width">Notification preferences</h3>${[["treatments", "Upcoming treatments"], ["documentation", "Pending documentation"], ["clinicalAlerts", "Clinical alerts"]].map(([key, label]) => `<label><input type="checkbox" name="${key}" ${preferences[key] !== false ? "checked" : ""}> ${label}</label>`).join("")}<button class="primary-button" type="submit">Save preferences</button></form>${renderCredentialsForm()}`;
	}

	function renderTechnicianView(view) {
		if (view === "dashboard") return renderTechnicianDashboard();
		if (view === "machine-inventory") return renderEquipment();
		if (view === "notifications") return renderAdminNotifications();
		if (view === "profile") return renderAdminProfile("My Profile");
		if (view === "settings") return `<div class="section-heading"><div><p class="portal-kicker">TECHNICAL SERVICES ACCOUNT</p><h2>Settings</h2></div></div>${renderCredentialsForm()}`;
		if (STAFF_RECORD_MODULES[view]) return renderStaffRecordModule(view, "TECHNICAL SERVICES");
		return "";
	}

	function renderTechnicianDashboard() {
		return `<div class="section-heading"><div><p class="portal-kicker">TECHNICAL SERVICES</p><h2>Technical Services Dashboard</h2></div><span class="demo-chip">TECHNICIAN</span></div><section class="portal-panel"><p class="muted-copy">Purpose: equipment readiness and maintenance documentation.</p></section>`;
	}

	function renderDietitianView(view) {
		if (view === "dashboard") return renderDietitianDashboard();
		if (view === "assigned-patients") return renderDietitianPatients();
		if (view === "nutrition-assessment") return renderDietitianAssessment();
		if (view === "diet-plans") return renderDietPlansAsTable();
		if (view === "nutrition-counseling") return renderDietitianCounselingAsTable();
		if (view === "follow-up-schedule") return renderDietitianFollowUps();
		if (view === "patient-education-materials") return renderDietitianEducation();
		if (view === "nutrition-reports") return renderDietitianReports();
		if (view === "notifications") return renderDietitianNotifications();
		if (view === "profile") return renderDietitianProfile();
		if (view === "settings") return `<div class="section-heading"><div><p class="portal-kicker">DIETITIAN ACCOUNT</p><h2>Settings</h2></div></div>${renderCredentialsForm()}`;
		return "";
	}

	function renderDietitianDashboard() {
		const today = new Date().toISOString().slice(0, 10);
		const pendingAssessments = store.patients.filter((patient) => !store.nutritionAssessments.some((record) => record.patientId === patient.id)).length;
		const activePlans = store.dietPlans.filter((plan) => plan.status === "Active").length;
		const upcoming = store.nutritionFollowUps.filter((entry) => entry.status === "Scheduled" && entry.date >= today);
		const needsReview = store.dietPlans.filter((plan) => plan.status === "Active" && plan.reviewDate && plan.reviewDate <= today).length;
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Dietitian Dashboard</h2><p class="muted-copy">${escapeHTML(currentUser.name)} · nutrition care overview</p></div><span class="demo-chip">DIETITIAN</span></div><div class="stat-grid dietitian-stat-grid">${[
			["Total patients", store.patients.length], ["Pending nutrition assessments", pendingAssessments],
			["Active diet plans", activePlans], ["Upcoming follow-ups", upcoming.length],
			["Plans requiring review", needsReview]
		].map(([label, count]) => `<article class="stat-card"><span>${escapeHTML(label)}</span><strong>${count}</strong></article>`).join("")}</div><section class="portal-panel"><div class="panel-heading"><div><p class="portal-kicker">PATIENT WORKLIST</p><h3>Patients needing nutrition review</h3></div><button class="secondary-button" type="button" data-dietitian-view="assigned-patients">View patients</button></div>${pendingAssessments || needsReview ? `<ul class="activity-list">${store.patients.filter((patient) => !store.nutritionAssessments.some((record) => record.patientId === patient.id) || store.dietPlans.some((plan) => plan.patientId === patient.id && plan.status === "Active" && plan.reviewDate && plan.reviewDate <= today)).map((patient) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(patient.name)}</strong><small>${store.nutritionAssessments.some((record) => record.patientId === patient.id) ? "Diet plan review due" : "Nutrition assessment needed"}</small></div><button class="table-action" type="button" data-open-dietitian-patient="${escapeHTML(patient.id)}" data-open-dietitian-view="nutrition-assessment">Open</button></li>`).join("")}</ul>` : `<p class="empty-state">No patients currently need a nutrition review.</p>`}</section><section class="portal-panel"><div class="panel-heading"><h3>Upcoming follow-ups</h3><button class="secondary-button" type="button" data-dietitian-view="follow-up-schedule">Manage schedule</button></div>${upcoming.length ? `<div class="doctor-schedule-list">${upcoming.slice(0, 5).map((entry) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">${escapeHTML(entry.date)} · ${escapeHTML(entry.time || "Time not set")}</p><h4>${escapeHTML(patientName(entry.patientId))}</h4><p>${escapeHTML(entry.purpose || "Nutrition follow-up")}</p></div></article>`).join("")}</div>` : `<p class="empty-state">No upcoming follow-ups are scheduled.</p>`}</section>`;
	}

	function dietitianPatientField(selectedId = activeDietaryPatientId, label = "Patient", trackSelection = true) {
		return `<label>${label}<select name="patientId" ${trackSelection ? "data-dietitian-patient" : ""} required>${patientOptions(selectedId)}</select></label>`;
	}

	function renderDietitianPatients() {
		const plans = store.dietPlans;
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION WORKSPACE</p><h2>Assigned Patients</h2></div><span class="demo-chip">${store.patients.length} PATIENTS</span></div><section class="portal-panel"><p class="field-hint">Search by patient name or ID. Patient details are read from the shared patient records; allergies and food preferences show only when recorded.</p><label class="dietitian-search">Search patients<input type="search" data-dietitian-patient-search placeholder="Patient ID or name"></label><div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Age / sex</th><th>Dialysis schedule</th><th>Allergies / preferences</th><th>Diet plan status</th><th>Actions</th></tr></thead><tbody>${store.patients.map((patient) => {
			const plan = plans.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0];
			return `<tr data-dietitian-patient-row data-patient-search="${escapeHTML(`${patient.name} ${patient.patientNumber || ""} ${patient.id}`.toLowerCase())}"><td><strong>${escapeHTML(patient.name)}</strong><small>${escapeHTML(patient.patientNumber || patient.id)}</small></td><td>${escapeHTML(patient.age || "—")} / ${escapeHTML(patient.gender || "—")}</td><td>${escapeHTML((patient.dialysisDays || []).join(", ") || "Not recorded")}<small>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "—"))}–${escapeHTML(formatTimeWithPeriod(patient.timeOut || "—"))}</small></td><td>${escapeHTML(patient.allergies || "Not recorded")}<small>${escapeHTML(patient.foodPreferences || "Preferences not recorded")}</small></td><td><span class="status-tag ${plan?.status === "Active" ? "success" : "pending"}">${escapeHTML(plan?.status || "No plan")}</span></td><td><button class="table-action" type="button" data-open-dietitian-patient="${escapeHTML(patient.id)}" data-open-dietitian-view="nutrition-assessment">Assess</button><button class="table-action" type="button" data-open-dietitian-patient="${escapeHTML(patient.id)}" data-open-dietitian-view="diet-plans">Plan</button></td></tr>`;
		}).join("")}</tbody></table></div><p class="empty-state" data-dietitian-patient-empty hidden>No patients match your search.</p></section>`;
	}

	function renderDietitianAssessment() {
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return `<section class="portal-panel"><p class="empty-state">No patient records are available.</p></section>`;
		const assessments = store.nutritionAssessments.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.date).localeCompare(String(a.date)));
		const latest = assessments[0];
		const labs = store.laboratory.filter((record) => record.patientId === patient.id).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Nutrition Assessment</h2></div><span class="demo-chip">PATIENT CARE RECORD</span></div><section class="portal-panel"><form class="form-grid" data-dietitian-patient-filter>${dietitianPatientField(patient.id)}</form><div class="dietitian-info-grid"><article><h3>Patient information</h3><dl class="profile-details"><div><dt>Patient ID</dt><dd>${escapeHTML(patient.patientNumber || patient.id)}</dd></div><div><dt>Full name</dt><dd>${escapeHTML(patient.name)}</dd></div><div><dt>Age / sex</dt><dd>${escapeHTML(patient.age || "Not recorded")} / ${escapeHTML(patient.gender || "Not recorded")}</dd></div><div><dt>Dialysis</dt><dd>${escapeHTML(patient.dialysisType || "Not recorded")}</dd></div><div><dt>Schedule</dt><dd>${escapeHTML((patient.dialysisDays || []).join(", ") || "Not recorded")}</dd></div><div><dt>Allergies</dt><dd>${escapeHTML(patient.allergies || "Not recorded")}</dd></div></dl></article><article><h3>Recent laboratory results</h3>${labs.length ? `<ul class="dietitian-compact-list">${labs.slice(0, 5).map((record) => `<li><strong>${escapeHTML(record.testName || record.testId || "Lab result")}</strong><span>${escapeHTML(record.date || "Date not recorded")} · ${escapeHTML(typeof record.results === "string" ? record.results : JSON.stringify(record.results || {}))}</span></li>`).join("")}</ul>` : `<p class="empty-state">No laboratory results are available yet.</p>`}</article></div></section><section class="portal-panel"><h3>${latest ? "Update nutrition assessment" : "New nutrition assessment"} · ${escapeHTML(patient.name)}</h3><form id="dietitian-assessment-form" class="form-grid"><label>Assessment date<input name="date" type="date" value="${escapeHTML(latest?.date || new Date().toISOString().slice(0, 10))}" required></label><label>Height (cm)<input name="height" type="number" min="1" step="0.1" value="${escapeHTML(latest?.height || "")}"></label><label>Current weight (kg)<input name="weight" type="number" min="0" step="0.1" value="${escapeHTML(latest?.weight || "")}"></label><label>Dry weight (kg)<input name="dryWeight" type="number" min="0" step="0.1" value="${escapeHTML(latest?.dryWeight || "")}"></label><label>Dietary intake<textarea name="dietaryIntake" rows="2">${escapeHTML(latest?.dietaryIntake || "")}</textarea></label><label>Appetite<textarea name="appetite" rows="2">${escapeHTML(latest?.appetite || "")}</textarea></label><label>Allergies / food intolerances<input name="allergies" value="${escapeHTML(latest?.allergies || patient.allergies || "")}"></label><label>Fluid intake<input name="fluidIntake" value="${escapeHTML(latest?.fluidIntake || "")}"></label><label>Available laboratory results<textarea name="labResults" rows="2" placeholder="Record values and dates from the chart">${escapeHTML(latest?.labResults || "")}</textarea></label><label>Nutrition problems<textarea name="problems" rows="2">${escapeHTML(latest?.problems || "")}</textarea></label><label>Nutrition goals<textarea name="goals" rows="2">${escapeHTML(latest?.goals || "")}</textarea></label><label>Recommended interventions<textarea name="interventions" rows="2">${escapeHTML(latest?.interventions || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save assessment</button></div></form></section><section class="portal-panel"><h3>Assessment history</h3>${assessments.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Date</th><th>Height / weight</th><th>BMI</th><th>Problems / goals</th></tr></thead><tbody>${assessments.map((entry) => `<tr><td>${escapeHTML(entry.date)}</td><td>${escapeHTML(entry.height || "—")} cm / ${escapeHTML(entry.weight || "—")} kg</td><td>${escapeHTML(entry.bmi || "—")}</td><td>${escapeHTML(entry.problems || "—")}<small>${escapeHTML(entry.goals || "")}</small></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No nutrition assessment has been recorded.</p>`}</section>`;
	}

	function renderDietPlans() {
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return `<section class="portal-panel"><p class="empty-state">No patient records are available.</p></section>`;
		const editing = store.dietPlans.find((entry) => entry.id === activeEditingDietPlanId);
		const plans = store.dietPlans.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Diet Plans</h2></div></div><section class="portal-panel"><form class="form-grid" data-dietitian-patient-filter>${dietitianPatientField(patient.id)}</form><p class="field-hint">Enter individualized targets based on the patient's assessed needs and the care team's clinical guidance.</p><form id="diet-plan-form" class="form-grid"><input type="hidden" name="planId" value="${escapeHTML(editing?.id || "")}"><label>Status<select name="status">${["Active", "Draft", "Under review", "Archived"].map((state) => `<option ${state === (editing?.status || "Active") ? "selected" : ""}>${state}</option>`).join("")}</select></label><label>Next review date<input name="reviewDate" type="date" value="${escapeHTML(editing?.reviewDate || "")}"></label><label>Daily calorie requirements<input name="calories" value="${escapeHTML(editing?.calories || "")}" placeholder="e.g. 1800 kcal"></label><label>Daily protein requirements<input name="protein" value="${escapeHTML(editing?.protein || "")}" placeholder="e.g. 60 g"></label><label>Sodium recommendation<input name="sodium" value="${escapeHTML(editing?.sodium || "")}"></label><label>Potassium recommendation<input name="potassium" value="${escapeHTML(editing?.potassium || "")}"></label><label>Phosphorus recommendation<input name="phosphorus" value="${escapeHTML(editing?.phosphorus || "")}"></label><label>Fluid recommendation<input name="fluid" value="${escapeHTML(editing?.fluid || "")}"></label><label class="full-width">Meal plan / food recommendations<textarea name="mealPlan" rows="4">${escapeHTML(editing?.mealPlan || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Update diet plan" : "Save diet plan"}</button>${editing ? `<button class="secondary-button" type="button" data-cancel-diet-plan-edit>Cancel</button>` : ""}</div></form></section><section class="portal-panel"><h3>Plans · ${escapeHTML(patient.name)}</h3>${plans.length ? `<div class="doctor-schedule-list">${plans.map((plan) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">${escapeHTML(plan.status)} · Updated ${escapeHTML(plan.updatedAt || "")}</p><h4>Nutrition plan${plan.reviewDate ? ` · Review ${escapeHTML(plan.reviewDate)}` : ""}</h4><p>Calories: ${escapeHTML(plan.calories || "—")} · Protein: ${escapeHTML(plan.protein || "—")}</p><p>Sodium: ${escapeHTML(plan.sodium || "—")} · Potassium: ${escapeHTML(plan.potassium || "—")} · Phosphorus: ${escapeHTML(plan.phosphorus || "—")} · Fluid: ${escapeHTML(plan.fluid || "—")}</p><p>${escapeHTML(plan.mealPlan || "No meal recommendations recorded.")}</p></div><div class="form-actions"><button class="table-action" type="button" data-edit-diet-plan="${escapeHTML(plan.id)}">Edit</button><button class="table-action danger" type="button" data-delete-diet-plan="${escapeHTML(plan.id)}">Delete</button></div></article>`).join("")}</div>` : `<p class="empty-state">No diet plans have been saved for this patient.</p>`}</section>`;
	}

	function renderDietitianCounseling() {
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return `<section class="portal-panel"><p class="empty-state">No patient records are available.</p></section>`;
		const records = store.dietaryCounseling.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.date).localeCompare(String(a.date)));
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Nutrition Counseling</h2></div></div><section class="portal-panel"><form class="form-grid" data-dietitian-patient-filter>${dietitianPatientField(patient.id)}</form><h3>Document counseling · ${escapeHTML(patient.name)}</h3><form id="dietitian-counseling-form" class="form-grid"><label>Counseling date<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><label>Counseling type<select name="sessionType">${["Initial", "Follow-up", "Reinforcement", "Group"].map((type) => `<option>${type}</option>`).join("")}</select></label><label class="full-width">Topics discussed<textarea name="topic" rows="2" required></textarea></label><label class="full-width">Dietary advice<textarea name="counseling" rows="3" required></textarea></label><label>Suggested food alternatives<textarea name="alternatives" rows="2"></textarea></label><label>Patient concerns<textarea name="concerns" rows="2"></textarea></label><label>Next counseling date<input name="nextDate" type="date"></label><div class="form-actions"><button class="primary-button" type="submit">Save counseling session</button></div></form></section><section class="portal-panel"><h3>Counseling history</h3>${records.length ? `<div class="doctor-schedule-list">${records.map((entry) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">${escapeHTML(entry.date)} · ${escapeHTML(entry.sessionType || "Counseling")}</p><h4>${escapeHTML(entry.topic)}</h4><p>${escapeHTML(entry.counseling)}</p>${entry.alternatives ? `<p><strong>Food alternatives:</strong> ${escapeHTML(entry.alternatives)}</p>` : ""}${entry.concerns ? `<p><strong>Patient concerns:</strong> ${escapeHTML(entry.concerns)}</p>` : ""}${entry.nextDate ? `<p><strong>Next counseling:</strong> ${escapeHTML(entry.nextDate)}</p>` : ""}</div></article>`).join("")}</div>` : `<p class="empty-state">No counseling sessions recorded.</p>`}</section>`;
	}

	function renderDietPlansAsTable() {
		const html = renderDietPlans();
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return html;
		const plans = store.dietPlans.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
		const resultsStart = html.lastIndexOf('<section class="portal-panel"><h3>Plans');
		if (resultsStart < 0) return html;
		const rows = plans.map((plan) => `<tr><td>${escapeHTML(plan.updatedAt || "Not recorded")}</td><td><span class="status-tag ${plan.status === "Active" ? "success" : "pending"}">${escapeHTML(plan.status || "—")}</span></td><td>${escapeHTML(plan.reviewDate || "—")}</td><td>Calories: ${escapeHTML(plan.calories || "—")}<small>Protein: ${escapeHTML(plan.protein || "—")}</small><small>Sodium: ${escapeHTML(plan.sodium || "—")}</small><small>Potassium: ${escapeHTML(plan.potassium || "—")}</small><small>Phosphorus: ${escapeHTML(plan.phosphorus || "—")}</small><small>Fluid: ${escapeHTML(plan.fluid || "—")}</small></td><td>${escapeHTML(plan.mealPlan || "No meal recommendations recorded.")}</td><td><button class="table-action" type="button" data-edit-diet-plan="${escapeHTML(plan.id)}">Edit</button><button class="table-action danger" type="button" data-delete-diet-plan="${escapeHTML(plan.id)}">Delete</button></td></tr>`).join("");
		const results = `<section class="portal-panel"><h3>Plans · ${escapeHTML(patient.name)}</h3>${plans.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Updated</th><th>Status</th><th>Next review</th><th>Daily targets</th><th>Meal plan / food recommendations</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">No diet plans have been saved for this patient.</p>`}</section>`;
		return html.slice(0, resultsStart) + results;
	}

	function renderDietitianCounselingAsTable() {
		const html = renderDietitianCounseling();
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return html;
		const records = store.dietaryCounseling.filter((entry) => entry.patientId === patient.id).sort((a, b) => String(b.date).localeCompare(String(a.date)));
		const resultsStart = html.lastIndexOf('<section class="portal-panel"><h3>Counseling history</h3>');
		if (resultsStart < 0) return html;
		const rows = records.map((entry) => `<tr><td>${escapeHTML(entry.date || "—")}</td><td>${escapeHTML(entry.sessionType || "Counseling")}</td><td>${escapeHTML(entry.topic || "—")}</td><td>${escapeHTML(entry.counseling || "—")}</td><td>${escapeHTML(entry.alternatives || "—")}</td><td>${escapeHTML(entry.concerns || "—")}</td><td>${escapeHTML(entry.nextDate || "—")}</td></tr>`).join("");
		const results = `<section class="portal-panel"><h3>Counseling history</h3>${records.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Counseling date</th><th>Counseling type</th><th>Topics discussed</th><th>Dietary advice</th><th>Food alternatives</th><th>Patient concerns</th><th>Next counseling</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">No counseling sessions recorded.</p>`}</section>`;
		return html.slice(0, resultsStart) + results;
	}

	function renderDietitianFollowUps() {
		const entries = store.nutritionFollowUps.slice().sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Follow-up Schedule</h2></div></div><section class="portal-panel"><h3>Schedule nutrition follow-up</h3><form id="dietitian-followup-form" class="form-grid">${dietitianPatientField(activeDietaryPatientId, "Patient", false)}<label>Appointment date<input name="date" type="date" min="${new Date().toISOString().slice(0, 10)}" required></label><label>Appointment time<input name="time" type="time" required></label><label>Purpose of follow-up<input name="purpose" maxlength="180" required></label><label>Patient concerns<textarea name="concerns" rows="2"></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Schedule follow-up</button></div></form></section><section class="portal-panel"><h3>Appointments</h3>${entries.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Date / time</th><th>Purpose</th><th>Previous concerns</th><th>Status</th></tr></thead><tbody>${entries.map((entry) => `<tr><td>${escapeHTML(patientName(entry.patientId))}</td><td>${escapeHTML(entry.date)}<small>${escapeHTML(formatTimeWithPeriod(entry.time))}</small></td><td>${escapeHTML(entry.purpose)}</td><td>${escapeHTML(entry.concerns || "—")}</td><td><select aria-label="Follow-up status" data-followup-status="${escapeHTML(entry.id)}">${["Scheduled", "Completed", "Cancelled", "Missed"].map((state) => `<option ${entry.status === state ? "selected" : ""}>${state}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No nutrition follow-ups are scheduled.</p>`}</section>`;
	}

	function sanitizeDietitianEducationHTML(source) {
		const allowedTags = new Set(["ARTICLE", "H1", "H2", "H3", "H4", "P", "UL", "OL", "LI", "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TH", "TD", "BR", "STRONG", "EM", "U", "S", "BLOCKQUOTE", "HR", "DIV", "SPAN", "SUB", "SUP"]);
		const container = document.createElement("div");
		container.innerHTML = String(source || "");
		const clean = (parent) => [...parent.childNodes].forEach((node) => {
			if (node.nodeType !== Node.ELEMENT_NODE) return;
			if (!allowedTags.has(node.tagName)) {
				node.replaceWith(document.createTextNode(node.textContent || ""));
				return;
			}
			[...node.attributes].forEach((attribute) => node.removeAttribute(attribute.name));
			clean(node);
		});
		clean(container);
		return container.innerHTML;
	}

	function renderDietitianEducation() {
		if (typeof store.dietitianEducationContent !== "string") {
			store.dietitianEducationContent = document.querySelector("#dietitian-education-default")?.innerHTML.trim() || "";
		}
		const content = sanitizeDietitianEducationHTML(store.dietitianEducationContent);
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT RESOURCES</p><h2>Patient Education Materials</h2></div></div><section class="portal-panel dietitian-document-panel"><form id="dietitian-education-form"><div class="form-actions dietitian-document-actions"><button class="primary-button" type="submit">Save document</button><button class="secondary-button" type="button" data-download-dietitian-document>Download PDF</button></div><div class="dietitian-document-editor" contenteditable="true" role="textbox" aria-label="Editable renal grocery list and nutrition guide" aria-multiline="true" data-dietitian-document-editor>${content}</div><p class="field-hint" data-dietitian-document-status aria-live="polite">Edits are saved when you select Save document.</p></form></section>`;
	}

	function saveDietitianEducation(event) {
		event.preventDefault();
		if (!isDietitian) return;
		const editor = viewContainer.querySelector("[data-dietitian-document-editor]");
		const status = viewContainer.querySelector("[data-dietitian-document-status]");
		if (!editor || !status) return;
		store.dietitianEducationContent = sanitizeDietitianEducationHTML(editor.innerHTML);
		editor.innerHTML = store.dietitianEducationContent;
		addAudit(store, `Dietitian education document updated by ${currentUser.name}`, "dietary-nutrition");
		saveStore(store);
		status.textContent = "Document saved.";
	}

	async function downloadDietitianEducation() {
		const editor = viewContainer.querySelector("[data-dietitian-document-editor]");
		if (!editor) return;
		if (typeof window.html2pdf !== "function") {
			window.alert("PDF export is unavailable. Check your internet connection and try again.");
			return;
		}
		const originalStyles = {
			width: editor.style.width,
			maxWidth: editor.style.maxWidth,
			margin: editor.style.margin,
			padding: editor.style.padding,
			background: editor.style.background
		};
		Object.assign(editor.style, { width: "186mm", maxWidth: "none", margin: "0", padding: "0", background: "#fff" });
		const downloadButton = viewContainer.querySelector("[data-download-dietitian-document]");
		const status = viewContainer.querySelector("[data-dietitian-document-status]");
		if (downloadButton) {
			downloadButton.disabled = true;
			downloadButton.textContent = "Preparing PDF…";
		}
		try {
			const pdfBlob = await window.html2pdf().set({
				margin: [12, 12, 14, 12],
				image: { type: "jpeg", quality: 0.98 },
				html2canvas: { scale: 1.5, useCORS: true, backgroundColor: "#ffffff" },
				jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
				pagebreak: { mode: ["css", "legacy"], avoid: ["h1", "h2", "h3", "tr"] }
			}).from(editor).toPdf().outputPdf("blob");
			const url = URL.createObjectURL(pdfBlob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "Patient Education Materials.pdf";
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1000);
			if (status) status.textContent = "PDF downloaded.";
		} catch (error) {
			console.error("Could not create the dietitian education PDF.", error);
			if (status) status.textContent = "PDF export failed. Check your connection and try again.";
		} finally {
			if (downloadButton) {
				downloadButton.disabled = false;
				downloadButton.textContent = "Download PDF";
			}
			Object.assign(editor.style, originalStyles);
		}
	}

	function renderDietitianReports() {
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId) || store.patients[0];
		if (!patient) return `<section class="portal-panel"><p class="empty-state">No patient records are available.</p></section>`;
		const withinRange = (date) => (!dietitianReportFrom || date >= dietitianReportFrom) && (!dietitianReportTo || date <= dietitianReportTo);
		const assessments = store.nutritionAssessments.filter((entry) => entry.patientId === patient.id && withinRange(entry.date || ""));
		const plans = store.dietPlans.filter((entry) => entry.patientId === patient.id && withinRange(entry.updatedAt || entry.reviewDate || ""));
		const counseling = store.dietaryCounseling.filter((entry) => entry.patientId === patient.id && withinRange(entry.date || ""));
		const reportBody = dietitianReportType === "Assessment history"
			? assessments.map((entry) => `<article><h4>Assessment · ${escapeHTML(entry.date)}</h4><p>Height: ${escapeHTML(entry.height || "—")} cm · Weight: ${escapeHTML(entry.weight || "—")} kg · BMI: ${escapeHTML(entry.bmi || "—")}</p><p>${escapeHTML(entry.problems || "No problems recorded")} ${escapeHTML(entry.goals || "")}</p></article>`).join("")
			: dietitianReportType === "Diet plan"
				? plans.map((entry) => `<article><h4>${escapeHTML(entry.status)} diet plan · ${escapeHTML(entry.reviewDate || "No review date")}</h4><p>${escapeHTML(entry.mealPlan || "No meal plan details")}</p><p>Calories: ${escapeHTML(entry.calories || "—")} · Protein: ${escapeHTML(entry.protein || "—")} · Sodium: ${escapeHTML(entry.sodium || "—")} · Potassium: ${escapeHTML(entry.potassium || "—")} · Phosphorus: ${escapeHTML(entry.phosphorus || "—")} · Fluid: ${escapeHTML(entry.fluid || "—")}</p></article>`).join("")
				: dietitianReportType === "Counseling history"
					? counseling.map((entry) => `<article><h4>${escapeHTML(entry.date)} · ${escapeHTML(entry.topic)}</h4><p>${escapeHTML(entry.counseling)}</p><p>${escapeHTML(entry.alternatives || "")} ${escapeHTML(entry.concerns || "")}</p></article>`).join("")
				: `<div class="dietitian-report-grid"><article><h4>Latest assessment</h4><p>${assessments.length ? `${escapeHTML(assessments[assessments.length - 1].date)} · ${escapeHTML(assessments[assessments.length - 1].problems || "No nutrition problems recorded")}` : "No assessment recorded in selected range."}</p></article><article><h4>Current diet plan</h4><p>${plans.length ? `${escapeHTML(plans[plans.length - 1].status)} · ${escapeHTML(plans[plans.length - 1].mealPlan || "No meal plan details")}` : "No diet plan recorded in selected range."}</p></article><article><h4>Counseling history</h4><p>${counseling.length} session(s) · ${escapeHTML(counseling[counseling.length - 1]?.date || "No session recorded")}</p></article></div>`;
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Nutrition Reports</h2></div><button class="secondary-button" type="button" data-print-report>Print report</button></div><section class="portal-panel"><form class="form-grid" data-dietitian-report-filter>${dietitianPatientField(patient.id)}<label>From date<input type="date" name="fromDate" value="${escapeHTML(dietitianReportFrom)}" data-report-date-filter></label><label>To date<input type="date" name="toDate" value="${escapeHTML(dietitianReportTo)}" data-report-date-filter></label><label>Report type<select name="reportType" data-report-date-filter>${["Patient nutrition summary", "Assessment history", "Diet plan", "Counseling history"].map((type) => `<option ${type === dietitianReportType ? "selected" : ""}>${type}</option>`).join("")}</select></label></form></section><section class="portal-panel dietitian-report" id="dietitian-report"><p class="portal-kicker">${escapeHTML(dietitianReportType.toUpperCase())}</p><h3>${escapeHTML(patient.name)} · ${escapeHTML(patient.patientNumber || patient.id)}</h3><p class="field-hint">Date range: ${escapeHTML(dietitianReportFrom || "Any")} to ${escapeHTML(dietitianReportTo || "Any")}</p>${reportBody || `<p class="empty-state">No records match this report and date range.</p>`}<p class="field-hint">This report is a summary of records entered in this system, not a medical diagnosis.</p></section>`;
	}

	function renderDietitianNotifications() {
		const today = new Date().toISOString().slice(0, 10);
		const recent = new Date();
		recent.setDate(recent.getDate() - 7);
		const recentDate = recent.toISOString().slice(0, 10);
		const alerts = [
			...store.patients.filter((patient) => !store.nutritionAssessments.some((entry) => entry.patientId === patient.id)).map((patient) => ({ patientId: patient.id, title: "Pending nutrition assessment", detail: patient.name, view: "nutrition-assessment" })),
			...store.dietPlans.filter((plan) => plan.status === "Active" && plan.reviewDate && plan.reviewDate <= today).map((plan) => ({ patientId: plan.patientId, title: "Diet plan due for review", detail: patientName(plan.patientId), view: "diet-plans" })),
			...store.nutritionFollowUps.filter((entry) => entry.status === "Scheduled" && entry.date >= today).map((entry) => ({ patientId: entry.patientId, title: "Upcoming nutrition follow-up", detail: `${patientName(entry.patientId)} · ${entry.date} ${entry.time || ""}`, view: "follow-up-schedule" })),
			...store.laboratory.filter((entry) => entry.date >= recentDate).map((entry) => ({ patientId: entry.patientId, title: "New laboratory results available", detail: `${patientName(entry.patientId)} · ${entry.testName || entry.testId || "Laboratory result"} · ${entry.date}`, view: "nutrition-assessment" }))
		];
		return `<div class="section-heading"><div><p class="portal-kicker">NUTRITION SERVICES</p><h2>Notifications</h2></div><span class="demo-chip">${alerts.length} ITEMS</span></div><section class="portal-panel">${alerts.length ? `<ul class="dietitian-notification-list">${alerts.map((alert) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(alert.title)}</strong><small>${escapeHTML(alert.detail)}</small></div><button class="table-action" type="button" data-open-dietitian-patient="${escapeHTML(alert.patientId)}" data-open-dietitian-view="${alert.view}">Open</button></li>`).join("")}</ul>` : `<p class="empty-state">No nutrition reminders at this time.</p>`}</section>`;
	}

	function renderDietitianProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">DIETITIAN ACCOUNT</p><h2>My Profile</h2></div></div><section class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${escapeHTML(currentUser.photo)}" alt="Dietitian profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="dietitian-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Email<input type="email" value="${escapeHTML(currentUser.email)}" readonly></label><label>Position<input value="${escapeHTML(currentUser.position)}" readonly></label><label>Employee ID<input name="employmentId" value="${escapeHTML(currentUser.employmentId || currentUser.id)}"></label><label>Contact details<input name="contactNumber" type="tel" value="${escapeHTML(currentUser.contactNumber || "")}"></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Images are stored with this account in app data.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button></div></form></section>`;
	}

	function activePharmacyMedicines() {
		return store.pharmacyMedicines.filter((medicine) => !medicine.isArchived);
	}

	function pharmacyQuantity(medicineId) {
		const batches = store.pharmacyBatches.filter((batch) => batch.medicineId === medicineId && !batch.isArchived);
		return batches.length ? batches.reduce((total, batch) => total + Math.max(0, Number(batch.quantity) || 0), 0) : 0;
	}

	function pharmacyExpiryStatus(expiryDate) {
		const days = Math.ceil((new Date(`${expiryDate}T00:00:00`).getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000);
		if (days < 0) return { days, label: "Expired", className: "danger" };
		if (days <= 30) return { days, label: "Expiring Soon", className: "pending" };
		return { days, label: "Safe", className: "success" };
	}

	function renderPharmacyView(view) {
		const title = pharmacyViews.find(([key]) => key === view)?.[1] || "Dashboard";
		let content = "";
		switch (view) {
			case "dashboard": content = renderPharmacyDashboard(); break;
			case "medication-inventory": content = renderPharmacyInventory(); break;
			case "expiry-monitoring": content = renderPharmacyExpiry(); break;
			case "medication-orders": content = renderPharmacyOrders(); break;
			case "supplier-records": content = renderPharmacySuppliers(); break;
			case "inventory-reports": content = renderPharmacyReports(); break;
			case "notifications": content = renderPharmacyNotifications(); break;
			case "profile": content = renderPharmacyProfile(); break;
			case "settings": content = renderPharmacySettings(); break;
			default: content = renderPharmacyDashboard();
		}
		return `<div class="section-heading"><div><p class="portal-kicker">PHARMACY SERVICES</p><h2>${escapeHTML(title)}</h2></div><span class="demo-chip">PHARMACIST</span></div>${content}`;
	}

	function renderPharmacyDashboard() {
		const medicines = activePharmacyMedicines();
		const orders = store.prescriptions.filter((record) => String(record.type).toLowerCase() === "medication" && !record.isNurseMARSample);
		const today = new Date().toISOString().slice(0, 10);
		const lowStock = medicines.filter((medicine) => pharmacyQuantity(medicine.id) > 0 && pharmacyQuantity(medicine.id) <= Number(medicine.reorderLevel || 0));
		const outOfStock = medicines.filter((medicine) => pharmacyQuantity(medicine.id) === 0);
		const nearExpiry = store.pharmacyBatches.filter((batch) => {
			const status = pharmacyExpiryStatus(batch.expiryDate);
			return !batch.isArchived && status.days >= 0 && status.days <= 30 && Number(batch.quantity) > 0;
		});
		const dispensedToday = store.pharmacyTransactions.filter((entry) => entry.type === "Dispensing" && !entry.reversedAt && entry.date === today);
		const recent = store.pharmacyTransactions.slice().sort((a, b) => String(b.createdAt || b.date || "").localeCompare(String(a.createdAt || a.date || ""))).slice(0, 5);
		return `<div class="stat-grid pharmacy-stat-grid"><article class="stat-card"><span>Total medicines</span><strong>${medicines.length}</strong></article><article class="stat-card"><span>Low-stock items</span><strong>${lowStock.length}</strong></article><article class="stat-card"><span>Out of stock</span><strong>${outOfStock.length}</strong></article><article class="stat-card"><span>Near expiry</span><strong>${nearExpiry.length}</strong></article><article class="stat-card"><span>Medication orders</span><strong>${orders.length}</strong></article><article class="stat-card"><span>Dispensed today</span><strong>${dispensedToday.length}</strong></article></div><section class="portal-panel"><h3>Stock overview</h3>${medicines.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Medicine</th><th>Quantity</th><th>Reorder level</th><th>Status</th></tr></thead><tbody>${medicines.map((medicine) => { const quantity = pharmacyQuantity(medicine.id); const status = quantity === 0 ? "Out of Stock" : quantity <= Number(medicine.reorderLevel || 0) ? "Low Stock" : "In Stock"; return `<tr><td>${escapeHTML(medicine.genericName)}<small>${escapeHTML(medicine.brandName || "")}</small></td><td>${quantity} ${escapeHTML(medicine.unit)}</td><td>${escapeHTML(medicine.reorderLevel || 0)}</td><td><span class="status-tag ${quantity === 0 ? "danger" : quantity <= Number(medicine.reorderLevel || 0) ? "pending" : "success"}">${status}</span></td></tr>`; }).join("")}</tbody></table></div>` : `<p class="empty-state">No medicines in inventory.</p>`}</section><section class="portal-panel"><div class="panel-heading"><h3>Recent pharmacy activity</h3><button class="table-action" type="button" data-go-view="medication-orders">Medication orders</button></div>${recent.length ? `<ul class="activity-list">${recent.map((entry) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(entry.type || "Delivery")} · ${escapeHTML(pharmacyMedicineName(entry.medicineId))}</strong><small>${escapeHTML(entry.date || entry.createdAt || "")}${entry.quantity ? ` · ${escapeHTML(entry.quantity)} ${escapeHTML(entry.unit || "")}` : ""}</small></div></li>`).join("")}</ul>` : `<p class="empty-state">No pharmacy transactions recorded.</p>`}</section>`;
	}

	function pharmacyMedicineName(medicineId) {
		const medicine = store.pharmacyMedicines.find((entry) => entry.id === medicineId);
		return medicine ? `${medicine.genericName}${medicine.brandName ? ` (${medicine.brandName})` : ""}` : "Medicine";
	}

	function renderPharmacyInventory() {
		const medicines = activePharmacyMedicines();
		const supplierOptions = store.pharmacySuppliers.map((supplier) => `<option value="${escapeHTML(supplier.id)}">${escapeHTML(supplier.name)}</option>`).join("");
		const moduleNames = [...new Set(medicines.map((medicine) => medicine.module || "Additional Inventory"))];
		const categories = [...new Set(medicines.map((medicine) => medicine.category).filter(Boolean))];
		const categoryOptions = (selectedCategory) => categories.map((category) => `<option value="${escapeHTML(category)}" ${category === selectedCategory ? "selected" : ""}>${escapeHTML(category)}</option>`).join("");
		const formatInventoryValue = (value) => Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		const tableRows = moduleNames.map((moduleName) => {
			const moduleMedicines = medicines.filter((medicine) => (medicine.module || "Additional Inventory") === moduleName);
			const description = moduleMedicines.find((medicine) => medicine.moduleDescription)?.moduleDescription;
			const isEditing = activeEditingPharmacyInventoryModule === moduleName;
			const moduleControls = isEditing
				? `<div class="pharmacy-module-actions"><button class="table-action" type="button" data-pharmacy-module-save="${escapeHTML(moduleName)}">Save module</button><button class="table-action danger" type="button" data-pharmacy-module-cancel>Cancel</button></div>`
				: `<button class="table-action" type="button" data-pharmacy-module-edit="${escapeHTML(moduleName)}" ${activeEditingPharmacyInventoryModule ? "disabled" : ""}>Edit</button>`;
			return `<tr class="pharmacy-module-row" data-pharmacy-module-header="${escapeHTML(moduleName)}"><th colspan="10"><div class="pharmacy-module-heading"><span>${escapeHTML(moduleName)}${description ? `<small>${escapeHTML(description)}</small>` : ""}</span>${moduleControls}</div></th></tr>${moduleMedicines.map((medicine) => {
				const quantity = pharmacyQuantity(medicine.id);
				const totalValue = quantity * Number(medicine.unitPrice || 0);
				const searchText = `${medicine.itemCode || ""} ${medicine.genericName} ${medicine.brandName || ""} ${medicine.category} ${medicine.dosage} ${medicine.form}`.toLowerCase();
				const expiryDate = medicine.expiryDate || store.pharmacyBatches.find((batch) => batch.medicineId === medicine.id && !batch.isArchived)?.expiryDate || "";
				const editableCell = (field, value, type = "text", attributes = "") => `<input type="${type}" data-pharmacy-field="${field}" value="${escapeHTML(value ?? "")}" ${attributes} required>`;
				return `<tr data-pharmacy-medicine-row data-pharmacy-module="${escapeHTML(moduleName)}" data-medicine-id="${escapeHTML(medicine.id)}" data-search="${escapeHTML(searchText)}" data-category="${escapeHTML(medicine.category)}"><td>${escapeHTML(medicine.itemCode || "—")}</td><td>${isEditing ? editableCell("genericName", medicine.genericName) : escapeHTML(medicine.genericName)}</td><td>${isEditing ? editableCell("brandName", medicine.brandName || "") : escapeHTML(medicine.brandName || "—")}</td><td>${isEditing ? `<select data-pharmacy-field="category" required>${categoryOptions(medicine.category)}</select>` : escapeHTML(medicine.category)}</td><td>${isEditing ? editableCell("dosage", medicine.dosage, "text") : escapeHTML(medicine.dosage || "—")}</td><td>${isEditing ? editableCell("form", medicine.form || medicine.unit, "text") : escapeHTML(medicine.form || medicine.unit || "—")}</td><td class="pharmacy-number-cell">${isEditing ? editableCell("unitPrice", medicine.unitPrice, "number", 'min="0" step="0.01"') : formatInventoryValue(medicine.unitPrice)}</td><td class="pharmacy-number-cell">${isEditing ? editableCell("quantity", quantity, "number", 'min="0" step="1"') : quantity.toLocaleString("en-PH")}</td><td class="pharmacy-number-cell">${formatInventoryValue(totalValue)}</td><td>${isEditing ? editableCell("expiryDate", expiryDate, "date") : escapeHTML(expiryDate || "—")}</td></tr>`;
			}).join("")}`;
		}).join("");
		return `<section class="portal-panel pharmacy-inventory-panel"><div class="panel-heading"><div><h3>Master pharmacy &amp; inventory list</h3><p class="field-hint">Prices and stock quantities follow the supplied master list. Stock and total value update when inventory changes.</p></div><span class="demo-chip">${medicines.filter((medicine) => medicine.itemCode).length} ITEMS</span></div><div class="form-grid pharmacy-filter-row"><label>Search inventory<input type="search" data-pharmacy-search placeholder="Item ID, generic name, brand, or category"></label><label>Category<select data-pharmacy-category><option value="">All categories</option>${categories.map((category) => `<option>${escapeHTML(category)}</option>`).join("")}</select></label></div><div class="table-wrap"><table class="dietitian-table pharmacy-inventory-table"><thead><tr><th>Item ID</th><th>Generic Name</th><th>Brand Name</th><th>Category</th><th>Strength / Specification</th><th>Dosage Form / Unit</th><th>Price per Unit (PHP)</th><th>Stock Quantity</th><th>Total Value (PHP)</th><th>Expiration Date</th></tr></thead><tbody>${tableRows}</tbody></table></div></section><section class="portal-panel"><h3>Record stock transaction</h3><form id="pharmacy-stock-form" class="form-grid"><label>Medicine<select name="medicineId" required>${medicines.map((medicine) => `<option value="${escapeHTML(medicine.id)}">${escapeHTML(medicine.itemCode ? `${medicine.itemCode} · ` : "")}${escapeHTML(medicine.genericName)} · ${escapeHTML(medicine.brandName || "")}</option>`).join("")}</select></label><label>Transaction type<select name="type"><option>Delivery</option><option>Stock Adjustment</option></select></label><label>Direction<select name="direction"><option>Add</option><option>Remove</option></select></label><label>Quantity<input name="quantity" type="number" min="1" step="1" required></label><label>Lot / batch number<input name="lotNumber" maxlength="80" required></label><label>Expiration date<input name="expiryDate" type="date" required></label><label>Supplier<select name="supplierId"><option value="">Choose supplier</option>${supplierOptions}</select></label><label>Reference / notes<input name="notes" maxlength="180"></label><div class="form-actions"><button class="primary-button" type="submit">Save stock transaction</button></div></form></section><section class="portal-panel"><h3>Add medicine</h3><form id="pharmacy-medicine-form" class="form-grid"><label>Generic name<input name="genericName" required></label><label>Brand name<input name="brandName"></label><label>Category<input name="category" required></label><label>Dosage<input name="dosage" required></label><label>Form<input name="form" required></label><label>Unit<input name="unit" placeholder="tablets, capsules, vials" required></label><label>Unit price<input name="unitPrice" type="number" min="0" step="0.01" required></label><label>Reorder level<input name="reorderLevel" type="number" min="0" step="1" value="10" required></label><label>Initial quantity<input name="quantity" type="number" min="0" step="1" value="0" required></label><label>Initial lot number<input name="lotNumber" required></label><label>Initial expiry date<input name="expiryDate" type="date" required></label><label>Supplier<select name="supplierId"><option value="">Choose supplier</option>${supplierOptions}</select></label><div class="form-actions"><button class="primary-button" type="submit">Add medicine</button></div></form></section>`;
	}

	function renderPharmacyExpiry() {
		const batches = store.pharmacyBatches.filter((batch) => !batch.isArchived).slice().sort((first, second) => first.expiryDate.localeCompare(second.expiryDate));
		return `<section class="portal-panel"><div class="panel-heading"><h3>Batch expiry monitoring · ${batches.length}</h3><label>Filter status<select data-pharmacy-expiry-filter><option value="">All statuses</option><option>Expired</option><option>Expiring Soon</option><option>Safe</option></select></label></div>${batches.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Batch / lot</th><th>Medicine</th><th>Expiration date</th><th>Remaining quantity</th><th>Days before expiry</th><th>Status</th></tr></thead><tbody>${batches.map((batch) => { const status = pharmacyExpiryStatus(batch.expiryDate); return `<tr data-pharmacy-batch-row data-status="${escapeHTML(status.label)}"><td>${escapeHTML(batch.lotNumber || batch.id)}</td><td>${escapeHTML(pharmacyMedicineName(batch.medicineId))}</td><td>${escapeHTML(batch.expiryDate)}</td><td>${escapeHTML(batch.quantity)}</td><td>${status.days}</td><td><span class="status-tag ${status.className}">${status.label}</span></td></tr>`; }).join("")}</tbody></table></div>` : `<p class="empty-state">No medicine batches are available.</p>`}</section>`;
	}

	function renderPharmacyOrders() {
		const orders = store.prescriptions.filter((record) => String(record.type).toLowerCase() === "medication" && !record.isNurseMARSample);
		return `<section class="portal-panel"><p class="field-hint">Dispense only against a valid clinician-authorized prescription. Each dispense can be undone once; reversals restore the original batch and remain in the activity ledger.</p>${orders.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Order / patient</th><th>Medicine</th><th>Prescription</th><th>Prescriber</th><th>Status</th><th>Dispensing</th></tr></thead><tbody>${orders.map((order) => {
			const ordered = Math.max(1, Number(order.quantity) || 1);
			const dispensed = Math.max(0, Number(order.dispensedQuantity) || 0);
			const remaining = Math.max(0, ordered - dispensed);
			const orderName = String(order.product || "").toLowerCase();
			const matchingMedicine = activePharmacyMedicines().find((medicine) => orderName.includes(String(medicine.genericName || "").toLowerCase()) || (medicine.brandName && orderName.includes(medicine.brandName.toLowerCase())));
			const batches = matchingMedicine ? store.pharmacyBatches.filter((batch) => batch.medicineId === matchingMedicine.id && !batch.isArchived && Number(batch.quantity) > 0 && pharmacyExpiryStatus(batch.expiryDate).days >= 0) : [];
			const activeDispenses = store.pharmacyTransactions.filter((entry) => entry.type === "Dispensing" && entry.orderId === order.id && !entry.reversedAt).sort((first, second) => String(second.createdAt || "").localeCompare(String(first.createdAt || "")));
			const latestDispense = activeDispenses[0];
			const undoButton = latestDispense ? `<button class="table-action danger pharmacy-undo-dispense" type="button" data-undo-dispense-order="${escapeHTML(order.id)}" data-undo-dispense-transaction="${escapeHTML(latestDispense.id)}">Undo last dispense</button>` : "";
			const dispenseForm = remaining > 0 && batches.length ? `<form class="pharmacy-dispense-form" data-dispense-order="${escapeHTML(order.id)}"><select name="batchId" aria-label="Stock batch">${batches.map((batch) => `<option value="${escapeHTML(batch.id)}">${escapeHTML(batch.lotNumber)} · ${escapeHTML(batch.quantity)} left · exp ${escapeHTML(batch.expiryDate)}</option>`).join("")}</select><input name="quantity" type="number" min="1" max="${Math.min(remaining, ...batches.map((batch) => Number(batch.quantity)))}" value="1" aria-label="Quantity to dispense" required><button class="table-action" type="submit">Dispense</button></form>` : remaining === 0 ? `<span class="status-tag success">Fully dispensed</span>` : `<span class="field-hint">No matching unexpired stock</span>`;
			return `<tr><td>${escapeHTML(order.id)}<small>${escapeHTML(patientName(order.patientId))} · ${escapeHTML(store.patients.find((patient) => patient.id === order.patientId)?.patientNumber || "")}</small></td><td>${escapeHTML(order.product)}<small>Ordered ${ordered} · Dispensed ${dispensed} · Remaining ${remaining}</small></td><td>${escapeHTML(order.dosage)} · ${escapeHTML(order.route)}<small>${escapeHTML(order.frequency || order.instructions || "As prescribed")}</small></td><td>${escapeHTML(order.provider || "Not recorded")}</td><td>${escapeHTML(order.pharmacyStatus || "Pending")}${order.dispensedAt ? `<small>${escapeHTML(order.dispensedAt)} · ${escapeHTML(order.pharmacistName || "")} · ID ${escapeHTML(order.pharmacistId || "")}</small>` : ""}</td><td><div class="pharmacy-dispense-actions">${dispenseForm}${undoButton}</div></td></tr>`;
		}).join("")}</tbody></table></div>` : `<p class="empty-state">No medication orders are recorded.</p>`}</section>`;
	}

	function renderPharmacySuppliers() {
		const suppliers = store.pharmacySuppliers;
		return `<section class="portal-panel"><h3>Add supplier</h3><form id="pharmacy-supplier-form" class="form-grid"><label>Supplier / company name<input name="name" required></label><label>Contact person<input name="contactPerson" required></label><label>Email<input name="email" type="email"></label><label>Phone<input name="phone" type="tel"></label><label class="full-width">Address<input name="address"></label><div class="form-actions"><button class="primary-button" type="submit">Save supplier</button></div></form></section><section class="portal-panel"><h3>Supplier records · ${suppliers.length}</h3>${suppliers.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Supplier</th><th>Contact person</th><th>Contact details</th><th>Address</th><th>Medicines supplied</th><th>Last delivery</th><th>Total orders</th><th>Status</th></tr></thead><tbody>${suppliers.map((supplier) => { const medicines = activePharmacyMedicines().filter((medicine) => medicine.supplierId === supplier.id); const deliveries = store.pharmacyDeliveries.filter((delivery) => delivery.supplierId === supplier.id).sort((a, b) => b.date.localeCompare(a.date)); return `<tr><td>${escapeHTML(supplier.name)}</td><td>${escapeHTML(supplier.contactPerson || "—")}</td><td>${escapeHTML(supplier.email || "—")}<small>${escapeHTML(supplier.phone || "")}</small></td><td>${escapeHTML(supplier.address || "—")}</td><td>${medicines.length ? medicines.map((medicine) => escapeHTML(medicine.genericName)).join(", ") : "—"}</td><td>${escapeHTML(deliveries[0]?.date || "—")}</td><td>${deliveries.length}</td><td><span class="status-tag ${supplier.status === "Active" ? "success" : "pending"}">${escapeHTML(supplier.status || "Active")}</span></td></tr>`; }).join("")}</tbody></table></div>` : `<p class="empty-state">No supplier records are available.</p>`}</section>`;
	}

	function pharmacyReportData() {
		const medicines = activePharmacyMedicines();
		const batches = store.pharmacyBatches.filter((batch) => !batch.isArchived);
		const transactions = store.pharmacyTransactions;
		const month = new Date().toISOString().slice(0, 7);
		switch (pharmacyReportType) {
			case "Low Stock": return medicines.filter((medicine) => pharmacyQuantity(medicine.id) > 0 && pharmacyQuantity(medicine.id) <= Number(medicine.reorderLevel || 0)).map((medicine) => ({ date: "—", type: "Low Stock", medicine: pharmacyMedicineName(medicine.id), batch: "—", quantity: pharmacyQuantity(medicine.id), status: "Reorder" }));
			case "Out of Stock": return medicines.filter((medicine) => pharmacyQuantity(medicine.id) === 0).map((medicine) => ({ date: "—", type: "Out of Stock", medicine: pharmacyMedicineName(medicine.id), batch: "—", quantity: 0, status: "Out of Stock" }));
			case "Expired Medicines":
			case "Near-Expiry": return batches.filter((batch) => pharmacyReportType === "Expired Medicines" ? pharmacyExpiryStatus(batch.expiryDate).days < 0 : pharmacyExpiryStatus(batch.expiryDate).days >= 0 && pharmacyExpiryStatus(batch.expiryDate).days <= 30).map((batch) => ({ date: batch.expiryDate, type: pharmacyExpiryStatus(batch.expiryDate).label, medicine: pharmacyMedicineName(batch.medicineId), batch: batch.lotNumber, quantity: batch.quantity, status: pharmacyExpiryStatus(batch.expiryDate).label }));
			case "Deliveries": return transactions.filter((entry) => entry.type === "Delivery").map((entry) => ({ date: entry.date, type: entry.type, medicine: pharmacyMedicineName(entry.medicineId), batch: entry.lotNumber || "—", quantity: entry.quantity, status: entry.notes || entry.status || "Recorded" }));
			case "Dispensing": return transactions.filter((entry) => entry.type === "Dispensing" && !entry.reversedAt).map((entry) => ({ date: entry.date, type: entry.type, medicine: pharmacyMedicineName(entry.medicineId), batch: entry.lotNumber || "—", quantity: entry.quantity, status: entry.notes || entry.status || "Recorded" }));
			case "Dispensing Reversals": return transactions.filter((entry) => entry.type === "Dispensing Reversal").map((entry) => ({ date: entry.date, type: entry.type, medicine: pharmacyMedicineName(entry.medicineId), batch: entry.lotNumber || "—", quantity: entry.quantity, status: entry.notes || "Dispense undone" }));
			case "Stock Adjustment": return transactions.filter((entry) => entry.type === pharmacyReportType).map((entry) => ({ date: entry.date, type: entry.type, medicine: pharmacyMedicineName(entry.medicineId), batch: entry.lotNumber || "—", quantity: entry.quantity, status: entry.notes || entry.status || "Recorded" }));
			case "Monthly Summary": return transactions.filter((entry) => String(entry.date).startsWith(month)).map((entry) => ({ date: entry.date, type: entry.type, medicine: pharmacyMedicineName(entry.medicineId), batch: entry.lotNumber || "—", quantity: entry.quantity, status: entry.notes || "Recorded" }));
			default: return medicines.flatMap((medicine) => batches.filter((batch) => batch.medicineId === medicine.id).map((batch) => ({ date: batch.expiryDate, type: medicine.category, medicine: pharmacyMedicineName(medicine.id), batch: batch.lotNumber, quantity: batch.quantity, status: pharmacyExpiryStatus(batch.expiryDate).label })));
		}
	}

	function renderPharmacyReports() {
		const data = pharmacyReportData();
		const options = ["Current inventory", "Low Stock", "Out of Stock", "Expired Medicines", "Near-Expiry", "Deliveries", "Dispensing", "Dispensing Reversals", "Stock Adjustment", "Monthly Summary"];
		return `<div class="section-heading"><div><p class="portal-kicker">PHARMACY SERVICES</p><h2>Inventory Reports</h2></div><div class="form-actions"><button class="secondary-button" type="button" data-pharmacy-report-export>Export CSV</button><button class="secondary-button" type="button" data-pharmacy-report-print>Print</button></div></div><section class="portal-panel"><label>Report type<select data-pharmacy-report-type>${options.map((option) => `<option ${option === pharmacyReportType ? "selected" : ""}>${option}</option>`).join("")}</select></label><div class="stat-grid pharmacy-stat-grid"><article class="stat-card"><span>${escapeHTML(pharmacyReportType)} records</span><strong>${data.length}</strong></article><article class="stat-card"><span>Total units</span><strong>${data.reduce((total, entry) => total + (Number(entry.quantity) || 0), 0)}</strong></article></div>${data.length ? `<div class="table-wrap"><table class="dietitian-table" data-pharmacy-report-table><thead><tr><th>Date / expiry</th><th>Type</th><th>Medicine</th><th>Batch</th><th>Quantity</th><th>Status / details</th></tr></thead><tbody>${data.map((entry) => `<tr><td>${escapeHTML(entry.date)}</td><td>${escapeHTML(entry.type)}</td><td>${escapeHTML(entry.medicine)}</td><td>${escapeHTML(entry.batch)}</td><td>${escapeHTML(entry.quantity)}</td><td>${escapeHTML(entry.status)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No records match this report.</p>`}</section>`;
	}

	function renderPharmacyNotifications() {
		const alerts = [];
		const preferences = currentUser.notificationPreferences || {};
		activePharmacyMedicines().forEach((medicine) => {
			const quantity = pharmacyQuantity(medicine.id);
			if (quantity === 0 && preferences.outOfStock !== false) alerts.push({ title: "Out-of-stock medicine", detail: `${pharmacyMedicineName(medicine.id)} · ${quantity} ${medicine.unit}`, view: "medication-inventory" });
			else if (quantity <= Number(medicine.reorderLevel || 0) && preferences.lowStock !== false) alerts.push({ title: "Low-stock alert", detail: `${pharmacyMedicineName(medicine.id)} · ${quantity} ${medicine.unit} remaining`, view: "medication-inventory" });
		});
		store.pharmacyBatches.filter((batch) => !batch.isArchived).forEach((batch) => {
			const expiry = pharmacyExpiryStatus(batch.expiryDate);
			if (expiry.days <= 30 && preferences.expiry !== false) alerts.push({ title: expiry.label === "Expired" ? "Expired medicine" : "Near-expiry medicine", detail: `${pharmacyMedicineName(batch.medicineId)} · ${batch.lotNumber} · ${expiry.days} days`, view: "expiry-monitoring" });
		});
		store.prescriptions.filter((record) => String(record.type).toLowerCase() === "medication" && !record.isNurseMARSample && !record.pharmacyStatus && preferences.orders !== false).forEach((order) => alerts.push({ title: "New medication order", detail: `${patientName(order.patientId)} · ${order.product}`, view: "medication-orders" }));
		if (preferences.deliveries !== false) store.pharmacyDeliveries.slice(0, 10).forEach((delivery) => alerts.push({ title: "New medicine delivery", detail: `${pharmacyMedicineName(delivery.medicineId)} · ${delivery.quantity} received`, view: "inventory-reports" }));
		return `<div class="section-heading"><div><p class="portal-kicker">PHARMACY SERVICES</p><h2>Notifications</h2></div><span class="demo-chip">${alerts.length} ALERTS</span></div><section class="portal-panel">${alerts.length ? `<ul class="dietitian-notification-list">${alerts.map((alert) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(alert.title)}</strong><small>${escapeHTML(alert.detail)}</small></div><button class="table-action" type="button" data-go-view="${escapeHTML(alert.view)}">Open</button></li>`).join("")}</ul>` : `<p class="empty-state">No pharmacy alerts or reminders.</p>`}</section>`;
	}

	function renderPharmacyProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">PHARMACY ACCOUNT</p><h2>My Profile</h2></div></div><section class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${escapeHTML(currentUser.photo)}" alt="Pharmacist profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="pharmacy-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Email<input name="email" type="email" value="${escapeHTML(currentUser.email)}" required></label><label>Contact number<input name="contactNumber" type="tel" value="${escapeHTML(currentUser.contactNumber || "")}"></label><label>Job position<input value="${escapeHTML(currentUser.position)}" readonly></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Maximum 500 KB.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button><button class="secondary-button" type="button" data-go-view="settings">Change password</button></div></form></section>`;
	}

	function renderPharmacySettings() {
		const preferences = currentUser.notificationPreferences || {};
		return `<div class="section-heading"><div><p class="portal-kicker">PHARMACY ACCOUNT</p><h2>Settings</h2></div></div><section class="portal-panel"><h3>Notification preferences</h3><form id="pharmacy-preferences-form" class="form-grid">${[["orders", "New medication orders"], ["lowStock", "Low-stock alerts"], ["outOfStock", "Out-of-stock alerts"], ["expiry", "Near-expiry alerts"], ["deliveries", "New deliveries"]].map(([key, label]) => `<label><input type="checkbox" name="${key}" ${preferences[key] !== false ? "checked" : ""}> ${label}</label>`).join("")}<button class="primary-button" type="submit">Save preferences</button></form></section>${renderCredentialsForm()}`;
	}

	function savePharmacyStock(event) {
		event.preventDefault();
		if (!isPharmacy) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const medicine = activePharmacyMedicines().find((entry) => entry.id === data.medicineId);
		const quantity = Number(data.quantity);
		if (!medicine || !Number.isInteger(quantity) || quantity <= 0) return;
		const transactionType = data.type === "Delivery" ? "Delivery" : "Stock Adjustment";
		let batchId = "";
		if (data.direction === "Add") {
			const batch = store.pharmacyBatches.find((entry) => entry.medicineId === medicine.id && !entry.isArchived && entry.lotNumber === data.lotNumber && entry.expiryDate === data.expiryDate);
			if (batch) {
				batch.quantity = Number(batch.quantity || 0) + quantity;
				batchId = batch.id;
			} else {
				const newBatch = { id: makeId("batch"), medicineId: medicine.id, lotNumber: String(data.lotNumber || "").trim(), expiryDate: data.expiryDate, quantity, supplierId: data.supplierId || medicine.supplierId, receivedAt: new Date().toISOString() };
				store.pharmacyBatches.unshift(newBatch);
				batchId = newBatch.id;
			}
			if (transactionType === "Delivery") store.pharmacyDeliveries.unshift({ id: makeId("delivery"), medicineId: medicine.id, supplierId: data.supplierId || medicine.supplierId, batchId, quantity, date: new Date().toISOString().slice(0, 10), createdAt: new Date().toISOString() });
		} else {
			const availableBatches = store.pharmacyBatches.filter((batch) => batch.medicineId === medicine.id && !batch.isArchived && pharmacyExpiryStatus(batch.expiryDate).days >= 0 && Number(batch.quantity) > 0).sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));
			if (availableBatches.reduce((total, batch) => total + Number(batch.quantity), 0) < quantity) {
				window.alert("The requested quantity is greater than available unexpired stock.");
				return;
			}
			let remaining = quantity;
			availableBatches.forEach((batch) => {
				const used = Math.min(remaining, Number(batch.quantity));
				batch.quantity -= used;
				remaining -= used;
			});
		}
		store.pharmacyTransactions.unshift({ id: makeId("pharmacy-transaction"), type: transactionType, direction: data.direction, medicineId: medicine.id, batchId, quantity, unit: medicine.unit, lotNumber: String(data.lotNumber || "").trim(), date: new Date().toISOString().slice(0, 10), pharmacistId: currentUser.id, pharmacistName: currentUser.name, notes: String(data.notes || "").trim(), createdAt: new Date().toISOString() });
		addAudit(store, `${transactionType} ${data.direction.toLowerCase()} ${quantity} ${medicine.unit} of ${medicine.genericName}`, "inventory");
		saveStore(store);
		renderView();
	}

	function savePharmacyInventoryModule(moduleName) {
		if (!isPharmacy || activeEditingPharmacyInventoryModule !== moduleName) return;
		const rows = [...viewContainer.querySelectorAll("[data-pharmacy-medicine-row]")]
			.filter((row) => row.dataset.pharmacyModule === moduleName);
		const categories = new Set(activePharmacyMedicines().map((medicine) => medicine.category).filter(Boolean));
		const updates = [];
		for (const row of rows) {
			const medicine = store.pharmacyMedicines.find((entry) => entry.id === row.dataset.medicineId && !entry.isArchived);
			const fields = Object.fromEntries([...row.querySelectorAll("[data-pharmacy-field]")].map((field) => [field.dataset.pharmacyField, field]));
			if (!medicine || Object.values(fields).some((field) => !field.checkValidity())) {
				Object.values(fields).find((field) => !field.checkValidity())?.reportValidity();
				window.alert("Check the required inventory values before saving this module.");
				return;
			}
			const values = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value.trim()]));
			const unitPrice = Number(values.unitPrice);
			const quantity = Number(values.quantity);
			if (!categories.has(values.category) || !Number.isFinite(unitPrice) || unitPrice < 0 || !Number.isInteger(quantity) || quantity < 0) {
				window.alert("Choose a listed category and enter a valid price and whole-number stock quantity.");
				return;
			}
			const currentQuantity = pharmacyQuantity(medicine.id);
			if (quantity < currentQuantity && store.pharmacyBatches
				.filter((batch) => batch.medicineId === medicine.id && !batch.isArchived)
				.reduce((total, batch) => total + Math.max(0, Number(batch.quantity) || 0), 0) < currentQuantity) {
				window.alert(`The current stock for ${medicine.genericName} could not be verified. No changes were saved.`);
				return;
			}
			updates.push({ medicine, values, unitPrice, quantity, currentQuantity });
		}
		if (!rows.length) {
			window.alert("No inventory rows were found for this module. No changes were saved.");
			return;
		}
		const createdAt = new Date().toISOString();
		updates.forEach(({ medicine, values, unitPrice, quantity, currentQuantity }) => {
			medicine.genericName = values.genericName;
			medicine.brandName = values.brandName;
			medicine.category = values.category;
			medicine.dosage = values.dosage;
			medicine.form = values.form;
			medicine.unit = values.form;
			medicine.unitPrice = unitPrice;
			medicine.expiryDate = values.expiryDate;
			if (values.expiryDate !== "") {
				const primaryBatch = store.pharmacyBatches.find((batch) => batch.medicineId === medicine.id && !batch.isArchived && batch.lotNumber === medicine.lotNumber);
				if (primaryBatch) primaryBatch.expiryDate = values.expiryDate;
			}
			if (quantity !== currentQuantity) {
				const direction = quantity > currentQuantity ? "Add" : "Remove";
				let remaining = Math.abs(quantity - currentQuantity);
				const adjustedBatches = [];
				const defaultLotNumber = medicine.lotNumber || medicine.itemCode || medicine.id;
				if (direction === "Add") {
					let batch = store.pharmacyBatches.find((entry) => entry.medicineId === medicine.id && !entry.isArchived && entry.lotNumber === medicine.lotNumber);
					if (batch) {
						batch.quantity = Number(batch.quantity || 0) + remaining;
					} else {
						batch = {
							id: makeId("batch"),
							medicineId: medicine.id,
							lotNumber: defaultLotNumber,
							expiryDate: values.expiryDate,
							quantity: remaining,
							supplierId: medicine.supplierId || "",
							receivedAt: createdAt
						};
						store.pharmacyBatches.unshift(batch);
					}
					adjustedBatches.push({ batch, quantity: remaining });
				} else {
					const batches = store.pharmacyBatches
						.filter((batch) => batch.medicineId === medicine.id && !batch.isArchived && Number(batch.quantity) > 0)
						.sort((first, second) => String(first.expiryDate || "").localeCompare(String(second.expiryDate || "")));
					for (const batch of batches) {
						const removed = Math.min(remaining, Number(batch.quantity));
						batch.quantity = Number(batch.quantity) - removed;
						remaining -= removed;
						if (removed > 0) adjustedBatches.push({ batch, quantity: removed });
						if (remaining === 0) break;
					}
				}
				adjustedBatches.forEach(({ batch, quantity: adjustedQuantity }) => {
					store.pharmacyTransactions.unshift({
						id: makeId("pharmacy-transaction"),
						type: "Stock Adjustment",
						direction,
						medicineId: medicine.id,
						batchId: batch.id,
						lotNumber: batch.lotNumber || defaultLotNumber,
						quantity: adjustedQuantity,
						unit: medicine.unit,
						date: createdAt.slice(0, 10),
						pharmacistId: currentUser.id,
						pharmacistName: currentUser.name,
						notes: `Stock quantity updated while editing ${moduleName}`,
						createdAt
					});
				});
			}
		});
		activeEditingPharmacyInventoryModule = "";
		addAudit(store, `Pharmacy inventory module updated: ${moduleName}`, "inventory");
		saveStore(store);
		renderView();
	}

	function savePharmacyMedicine(event) {
		event.preventDefault();
		if (!isPharmacy) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const quantity = Number(data.quantity);
		const medicine = { id: makeId("medicine"), genericName: String(data.genericName || "").trim(), brandName: String(data.brandName || "").trim(), category: String(data.category || "").trim(), dosage: String(data.dosage || "").trim(), form: String(data.form || "").trim(), quantity, unit: String(data.unit || "").trim(), unitPrice: Number(data.unitPrice) || 0, reorderLevel: Number(data.reorderLevel) || 0, supplierId: data.supplierId || "" };
		store.pharmacyMedicines.unshift(medicine);
		store.pharmacyBatches.unshift({ id: makeId("batch"), medicineId: medicine.id, lotNumber: String(data.lotNumber || "").trim(), expiryDate: String(data.expiryDate || ""), quantity, supplierId: medicine.supplierId, receivedAt: new Date().toISOString() });
		addAudit(store, `Medicine added to pharmacy inventory: ${medicine.genericName}`, "inventory");
		saveStore(store);
		renderView();
	}

	function savePharmacySupplier(event) {
		event.preventDefault();
		if (!isPharmacy) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const supplier = { id: makeId("supplier"), name: String(data.name || "").trim(), contactPerson: String(data.contactPerson || "").trim(), email: String(data.email || "").trim(), phone: String(data.phone || "").trim(), address: String(data.address || "").trim(), status: "Active" };
		store.pharmacySuppliers.unshift(supplier);
		addAudit(store, `Pharmacy supplier added: ${supplier.name}`, "inventory");
		saveStore(store);
		renderView();
	}

	function dispensePharmacyOrder(event) {
		event.preventDefault();
		if (!isPharmacy) return;
		const form = event.currentTarget;
		const order = store.prescriptions.find((entry) => entry.id === form.dataset.dispenseOrder && String(entry.type).toLowerCase() === "medication");
		const data = Object.fromEntries(new FormData(form));
		const batch = store.pharmacyBatches.find((entry) => entry.id === data.batchId);
		const medicine = batch && activePharmacyMedicines().find((entry) => entry.id === batch.medicineId);
		const orderName = String(order?.product || "").toLowerCase();
		const matchesOrder = medicine && (orderName.includes(medicine.genericName.toLowerCase()) || (medicine.brandName && orderName.includes(medicine.brandName.toLowerCase())));
		const quantity = Number(data.quantity);
		const prescribedQuantity = Math.max(1, Number(order?.quantity) || 1);
		const alreadyDispensed = Math.max(0, Number(order?.dispensedQuantity) || 0);
		const remainingOrderQuantity = Math.max(0, prescribedQuantity - alreadyDispensed);
		if (!order || remainingOrderQuantity === 0 || !batch || batch.isArchived || !matchesOrder || pharmacyExpiryStatus(batch.expiryDate).days < 0 || !Number.isInteger(quantity) || quantity <= 0 || quantity > Number(batch.quantity) || quantity > remainingOrderQuantity) {
			window.alert("Check the authorized order, matching unexpired medicine batch, and available quantity before dispensing.");
			return;
		}
		batch.quantity -= quantity;
		const totalDispensed = alreadyDispensed + quantity;
		Object.assign(order, { pharmacyStatus: totalDispensed >= prescribedQuantity ? "Dispensed" : "Partially Dispensed", dispensedQuantity: totalDispensed, dispensedAt: new Date().toISOString(), pharmacistId: currentUser.id, pharmacistName: currentUser.name, dispensedBatchId: batch.id });
		const createdAt = new Date().toISOString();
		store.pharmacyTransactions.unshift({ id: makeId("pharmacy-transaction"), type: "Dispensing", medicineId: medicine.id, batchId: batch.id, lotNumber: batch.lotNumber, quantity, unit: medicine.unit, orderId: order.id, patientId: order.patientId, date: createdAt.slice(0, 10), pharmacistId: currentUser.id, pharmacistName: currentUser.name, createdAt });
		addAudit(store, `Medication dispensed for ${patientName(order.patientId)}: ${medicine.genericName} · ${quantity} ${medicine.unit}`, "inventory");
		saveStore(store);
		renderView();
	}

	function undoDispensePharmacyOrder(event) {
		if (!isPharmacy) return;
		const button = event.currentTarget;
		const order = store.prescriptions.find((entry) => entry.id === button.dataset.undoDispenseOrder && String(entry.type).toLowerCase() === "medication");
		const transaction = store.pharmacyTransactions.find((entry) => entry.id === button.dataset.undoDispenseTransaction && entry.type === "Dispensing" && entry.orderId === order?.id && !entry.reversedAt);
		if (!order || !transaction) {
			window.alert("This dispense can no longer be undone. Refresh the order list and try again.");
			return;
		}
		const latestActiveDispense = store.pharmacyTransactions
			.filter((entry) => entry.type === "Dispensing" && entry.orderId === order.id && !entry.reversedAt)
			.sort((first, second) => String(second.createdAt || "").localeCompare(String(first.createdAt || "")))[0];
		const activeDispensedQuantity = store.pharmacyTransactions
			.filter((entry) => entry.type === "Dispensing" && entry.orderId === order.id && !entry.reversedAt)
			.reduce((total, entry) => total + (Number(entry.quantity) || 0), 0);
		const batch = store.pharmacyBatches.find((entry) => entry.id === transaction.batchId && !entry.isArchived);
		const quantity = Number(transaction.quantity);
		const dispensedQuantity = Math.max(0, Number(order.dispensedQuantity) || 0);
		if (latestActiveDispense?.id !== transaction.id || activeDispensedQuantity !== dispensedQuantity || !batch || !Number.isInteger(quantity) || quantity <= 0 || dispensedQuantity < quantity) {
			window.alert("The latest dispense or its inventory batch could not be verified, so no changes were made.");
			return;
		}
		const medicine = store.pharmacyMedicines.find((entry) => entry.id === transaction.medicineId);
		if (!medicine) {
			window.alert("The medicine record for this dispense is unavailable, so no changes were made.");
			return;
		}
		const createdAt = new Date().toISOString();
		batch.quantity = Number(batch.quantity || 0) + quantity;
		transaction.reversedAt = createdAt;
		transaction.reversedBy = currentUser.id;
		transaction.reversedByName = currentUser.name;
		const remainingDispensed = store.pharmacyTransactions
			.filter((entry) => entry.type === "Dispensing" && entry.orderId === order.id && !entry.reversedAt)
			.reduce((total, entry) => total + (Number(entry.quantity) || 0), 0);
		const latestRemainingDispense = store.pharmacyTransactions
			.filter((entry) => entry.type === "Dispensing" && entry.orderId === order.id && !entry.reversedAt)
			.sort((first, second) => String(second.createdAt || "").localeCompare(String(first.createdAt || "")))[0];
		const prescribedQuantity = Math.max(1, Number(order.quantity) || 1);
		Object.assign(order, {
			pharmacyStatus: remainingDispensed === 0 ? "Pending" : remainingDispensed >= prescribedQuantity ? "Dispensed" : "Partially Dispensed",
			dispensedQuantity: remainingDispensed,
			dispensedAt: latestRemainingDispense?.createdAt || "",
			pharmacistId: latestRemainingDispense?.pharmacistId || "",
			pharmacistName: latestRemainingDispense?.pharmacistName || "",
			dispensedBatchId: latestRemainingDispense?.batchId || ""
		});
		store.pharmacyTransactions.unshift({
			id: makeId("pharmacy-transaction"),
			type: "Dispensing Reversal",
			direction: "Add",
			medicineId: medicine.id,
			batchId: batch.id,
			lotNumber: batch.lotNumber,
			quantity,
			unit: medicine.unit,
			orderId: order.id,
			patientId: order.patientId,
			reversalOfTransactionId: transaction.id,
			date: createdAt.slice(0, 10),
			pharmacistId: currentUser.id,
			pharmacistName: currentUser.name,
			createdAt
		});
		addAudit(store, `Medication dispense undone for ${patientName(order.patientId)}: ${medicine.genericName} · ${quantity} ${medicine.unit}`, "inventory");
		saveStore(store);
		renderView();
	}

	function saveMedtechSpecimen(requestId) {
		if (!isMedtech) return;
		const row = viewContainer.querySelector(`[data-medtech-specimen-row="${CSS.escape(requestId)}"]`);
		const request = store.medtechRequests.find((entry) => entry.id === requestId);
		if (!row || !request) return;
		const specimenUpdates = Object.fromEntries([...row.querySelectorAll("[data-specimen-field]")].map((field) => [field.dataset.specimenField, field.value]));
		if (specimenUpdates.status === "Rejected" && !String(specimenUpdates.rejectionReason || "").trim()) {
			window.alert("Enter the reason for rejecting this specimen.");
			return;
		}
		const { status: specimenStatus, ...specimenFields } = specimenUpdates;
		Object.assign(request, specimenFields, { specimenStatus });
		if (specimenStatus === "Rejected") {
			request.status = "Rejected";
			request.rejectionReason = String(specimenUpdates.rejectionReason || "").trim();
		} else if (specimenStatus === "Completed" && request.status !== "Pending Verification" && request.status !== "Released") {
			request.status = "Completed";
		} else if (["Collected", "Received", "Processing"].includes(specimenStatus) && request.status === "Pending") {
			request.status = "In Progress";
		}
		request.assignedMedtech = currentUser.name;
		addAudit(store, `Specimen updated: ${request.specimenId || request.id}`, "laboratory");
		saveStore(store);
		renderView();
	}

	function saveMedtechResult(event) {
		event.preventDefault();
		if (!isMedtech) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const request = store.medtechRequests.find((entry) => entry.id === data.requestId);
		if (!request || !String(data.value || "").trim()) return;
		const result = { id: makeId("medtech-result"), requestId: request.id, patientId: request.patientId, testId: request.testId, testName: request.testName, value: String(data.value).trim(), unit: String(data.unit || "").trim(), referenceRange: String(data.referenceRange || "").trim(), notes: String(data.notes || "").trim(), status: data.status, enteredBy: currentUser.name, enteredAt: new Date().toISOString(), verifiedBy: "", verifiedAt: "", releaseStatus: "Pending" };
		store.medtechResults.unshift(result);
		request.status = data.status === "Pending Verification" ? "Pending Verification" : "In Progress";
		request.assignedMedtech = currentUser.name;
		addAudit(store, `Laboratory result ${data.status.toLowerCase()}: ${request.testName} · ${patientName(request.patientId)}`, "laboratory");
		saveStore(store);
		renderView();
	}

	function savePharmacyProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const email = String(data.email || "").trim().toLowerCase();
		if ([...store.admins, ...store.patients].some((account) => account.id !== currentUser.id && String(account.email || "").trim().toLowerCase() === email)) {
			window.alert("That email address is already in use.");
			return;
		}
		Object.assign(currentUser, { name: String(data.name || "").trim(), email, contactNumber: String(data.contactNumber || "").trim(), photo: profilePhotoDraft });
		addAudit(store, `Pharmacist profile updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function savePharmacyPreferences(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		currentUser.notificationPreferences = Object.fromEntries(["orders", "lowStock", "outOfStock", "expiry", "deliveries"].map((key) => [key, formData.has(key)]));
		saveStore(store);
		renderView();
	}

	function saveMedtechProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		Object.assign(currentUser, { name: String(data.name || "").trim(), employmentId: String(data.employmentId || "").trim(), contactNumber: String(data.contactNumber || "").trim(), photo: profilePhotoDraft });
		addAudit(store, `MedTech profile updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function downloadPharmacyReport() {
		const rows = [...viewContainer.querySelectorAll("[data-pharmacy-report-table] tr")].map((row) => [...row.cells].map((cell) => cell.innerText.trim()));
		downloadCSV("diacore-pharmacy-report.csv", rows);
	}

	function downloadMedtechReport() {
		const rows = [...viewContainer.querySelectorAll(".dietitian-table tr")].map((row) => [...row.cells].map((cell) => cell.innerText.trim()));
		downloadCSV("diacore-laboratory-report.csv", rows);
	}

	function downloadCSV(filename, rows) {
		const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	function renderMedtechView(view) {
		const title = medtechViews.find(([key]) => key === view)?.[1] || "Laboratory Dashboard";
		let content = "";
		switch (view) {
			case "dashboard": content = renderMedtechDashboard(); break;
			case "laboratory-requests": content = renderMedtechRequests(); break;
			case "specimen-tracking": content = renderMedtechSpecimens(); break;
			case "pending-tests": content = renderMedtechPendingTests(); break;
			case "enter-laboratory-results": content = renderMedtechResultEntry(); break;
			case "verified-results": content = renderMedtechVerifiedResults(); break;
			case "laboratory-reports": content = renderMedtechReports(); break;
			case "notifications": content = renderMedtechNotifications(); break;
			case "profile": content = renderMedtechProfile(); break;
			case "settings": content = renderCredentialsForm(); break;
			default: content = renderMedtechDashboard();
		}
		return content;
	}

	function renderMedtechDashboard() {
		const requests = store.medtechRequests;
		const results = store.medtechResults;
		const pending = requests.filter((request) => ["Pending", "Received", "In Progress", "Processing"].includes(request.status)).length;
		const completed = requests.filter((request) => ["Completed", "Verified", "Released"].includes(request.status)).length;
		const verification = results.filter((result) => result.status === "Pending Verification").length;
		const today = new Date().toISOString().slice(0, 10);
		const todayRequests = requests.filter((request) => request.requestDate === today).length;
		const recent = [...requests].sort((a, b) => String(b.requestDate).localeCompare(String(a.requestDate))).slice(0, 5);
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY SERVICES</p><h2>Laboratory Dashboard</h2></div><span class="demo-chip">MEDTECH</span></div><div class="stat-grid"><article class="stat-card"><span>Total laboratory requests</span><strong>${requests.length}</strong></article><article class="stat-card"><span>Pending tests</span><strong>${pending}</strong></article><article class="stat-card"><span>Completed tests</span><strong>${completed}</strong></article><article class="stat-card"><span>Results for verification</span><strong>${verification}</strong></article></div><section class="portal-panel"><h3>Daily laboratory statistics · ${today}</h3><div class="stat-grid"><article class="stat-card"><span>Requests today</span><strong>${todayRequests}</strong></article><article class="stat-card"><span>STAT requests</span><strong>${requests.filter((request) => request.priority === "STAT" && request.status !== "Completed" && request.status !== "Released").length}</strong></article><article class="stat-card"><span>Specimens needing collection</span><strong>${requests.filter((request) => !request.collectionTime && request.status !== "Rejected").length}</strong></article></div></section><section class="portal-panel"><div class="panel-heading"><h3>Recent laboratory activity</h3><button class="table-action" type="button" data-go-view="laboratory-requests">View requests</button></div>${recent.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Request date</th><th>Patient</th><th>Test</th><th>Priority</th><th>Status</th></tr></thead><tbody>${recent.map((request) => `<tr><td>${escapeHTML(request.requestDate || "—")}</td><td>${escapeHTML(patientName(request.patientId))}</td><td>${escapeHTML(request.testName)}</td><td>${escapeHTML(request.priority)}</td><td>${escapeHTML(request.status)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No laboratory requests are available.</p>`}</section>`;
	}

	function medtechRequestRows(requests, includeAction = false) {
		return requests.map((request) => `<tr><td>${escapeHTML(request.id)}</td><td>${escapeHTML(patientName(request.patientId))}<small>${escapeHTML(store.patients.find((patient) => patient.id === request.patientId)?.patientNumber || "")}</small></td><td>${escapeHTML(request.testName)}</td><td>${escapeHTML(request.requestDate)}</td><td><span class="status-tag ${request.priority === "STAT" ? "pending" : "success"}">${escapeHTML(request.priority)}</span></td><td>${escapeHTML(request.status)}</td>${includeAction ? `<td><button class="table-action" type="button" data-go-view="enter-laboratory-results">Open</button></td>` : ""}</tr>`).join("");
	}

	function renderMedtechRequests() {
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY WORKFLOW</p><h2>Laboratory Requests</h2></div></div><section class="portal-panel"><div class="form-grid medtech-filter-row"><label>Search requests<input type="search" data-medtech-request-search placeholder="Patient, test, or request number"></label><label>Priority<select data-medtech-request-priority><option value="">All priorities</option><option>Routine</option><option>STAT</option></select></label><label>Status<select data-medtech-request-status><option value="">All statuses</option>${["Pending", "Received", "In Progress", "Pending Verification", "Completed", "Rejected"].map((status) => `<option>${status}</option>`).join("")}</select></label></div>${store.medtechRequests.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Request number</th><th>Patient</th><th>Requested test</th><th>Request date</th><th>Priority</th><th>Status</th><th>Action</th></tr></thead><tbody>${store.medtechRequests.map((request) => `<tr data-medtech-request-row data-search="${escapeHTML(`${request.id} ${patientName(request.patientId)} ${request.testName}`.toLowerCase())}" data-priority="${escapeHTML(request.priority)}" data-status="${escapeHTML(request.status)}"><td>${escapeHTML(request.id)}</td><td>${escapeHTML(patientName(request.patientId))}<small>${escapeHTML(store.patients.find((patient) => patient.id === request.patientId)?.patientNumber || "")}</small></td><td>${escapeHTML(request.testName)}</td><td>${escapeHTML(request.requestDate)}</td><td><span class="status-tag ${request.priority === "STAT" ? "pending" : "success"}">${escapeHTML(request.priority)}</span></td><td>${escapeHTML(request.status)}</td><td><button class="table-action" type="button" data-medtech-start-request="${escapeHTML(request.id)}" ${["Completed", "Pending Verification", "Released", "Rejected"].includes(request.status) ? "disabled" : ""}>${request.status === "In Progress" ? "Processing" : "Open"}</button></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No laboratory requests are available.</p>`}</section>`;
	}

	function renderMedtechSpecimens() {
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY WORKFLOW</p><h2>Specimen Tracking</h2></div></div><section class="portal-panel"><p class="field-hint">Record specimen collection, receipt, condition, section, and rejection reasons according to laboratory procedure.</p>${store.medtechRequests.length ? `<div class="table-wrap"><table class="dietitian-table medtech-specimen-table"><thead><tr><th>Specimen / request</th><th>Patient / test</th><th>Type</th><th>Collection / received</th><th>Condition / section</th><th>Status / reason</th><th>Save</th></tr></thead><tbody>${store.medtechRequests.map((request) => `<tr data-medtech-specimen-row="${escapeHTML(request.id)}"><td>${escapeHTML(request.specimenId || request.id)}</td><td>${escapeHTML(patientName(request.patientId))}<small>${escapeHTML(request.testName)}</small></td><td><input data-specimen-field="specimenType" value="${escapeHTML(request.specimenType || "Blood")}" aria-label="Specimen type"></td><td><input type="datetime-local" data-specimen-field="collectionTime" value="${escapeHTML(request.collectionTime || "")}" aria-label="Collection time"><input type="datetime-local" data-specimen-field="receivedTime" value="${escapeHTML(request.receivedTime || "")}" aria-label="Received time"></td><td><select data-specimen-field="condition" aria-label="Specimen condition">${["Acceptable", "Hemolyzed", "Insufficient", "Leaking", "Other"].map((value) => `<option ${request.condition === value ? "selected" : ""}>${value}</option>`).join("")}</select><input data-specimen-field="section" value="${escapeHTML(request.section || "")}" placeholder="Lab section" aria-label="Laboratory section"></td><td><select data-specimen-field="status" aria-label="Specimen status">${["Pending collection", "Collected", "Received", "Processing", "Rejected", "Completed"].map((value) => `<option ${(request.specimenStatus || request.condition) === value ? "selected" : ""}>${value}</option>`).join("")}</select><textarea data-specimen-field="rejectionReason" rows="2" placeholder="Reason if rejected" aria-label="Rejection reason">${escapeHTML(request.rejectionReason || "")}</textarea></td><td><button class="table-action" type="button" data-medtech-save-specimen="${escapeHTML(request.id)}">Save</button></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No specimens are awaiting tracking.</p>`}</section>`;
	}

	function renderMedtechPendingTests() {
		const requests = store.medtechRequests.filter((request) => !["Completed", "Verified", "Released", "Rejected"].includes(request.status));
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY WORKFLOW</p><h2>Pending Tests</h2></div></div><section class="portal-panel"><div class="form-grid medtech-filter-row"><label>Priority<select data-medtech-pending-priority><option value="">All priorities</option><option>Routine</option><option>STAT</option></select></label><label>Status<select data-medtech-pending-status><option value="">All statuses</option>${["Pending", "Received", "In Progress", "Pending Verification"].map((status) => `<option>${status}</option>`).join("")}</select></label></div>${requests.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient ID</th><th>Test name</th><th>Request date</th><th>Priority</th><th>Specimen status</th><th>Assigned MedTech</th><th>Delay reason</th></tr></thead><tbody>${requests.map((request) => `<tr data-medtech-pending-row data-priority="${escapeHTML(request.priority)}" data-status="${escapeHTML(request.status)}"><td>${escapeHTML(store.patients.find((patient) => patient.id === request.patientId)?.patientNumber || request.patientId)}</td><td>${escapeHTML(request.testName)}</td><td>${escapeHTML(request.requestDate)}</td><td>${escapeHTML(request.priority)}</td><td>${escapeHTML(request.specimenStatus || "Pending collection")}</td><td>${escapeHTML(request.assignedMedtech || "Unassigned")}</td><td>${escapeHTML(request.delayReason || "—")}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">There are no pending tests.</p>`}</section>`;
	}

	function renderMedtechResultEntry() {
		const requests = store.medtechRequests.filter((request) => !["Completed", "Verified", "Released", "Rejected"].includes(request.status));
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY WORKFLOW</p><h2>Enter Laboratory Results</h2></div></div><section class="portal-panel"><p class="field-hint">Save findings as a draft, then submit them for verification by authorized review personnel. Enter only results from completed laboratory testing.</p><form id="medtech-result-form" class="form-grid"><label class="full-width">Laboratory request<select name="requestId" required><option value="">Choose a request</option>${requests.map((request) => `<option value="${escapeHTML(request.id)}">${escapeHTML(request.id)} · ${escapeHTML(patientName(request.patientId))} · ${escapeHTML(request.testName)} · ${escapeHTML(request.priority)}</option>`).join("")}</select></label><label>Result value<input name="value" maxlength="180" required></label><label>Unit<input name="unit" maxlength="60" placeholder="As reported"></label><label>Reference range<input name="referenceRange" maxlength="120" placeholder="As reported by the laboratory"></label><label>Entry status<select name="status"><option>Draft</option><option>Pending Verification</option></select></label><label class="full-width">Result notes<textarea name="notes" rows="3"></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save result</button></div></form></section><section class="portal-panel"><h3>Recent entries awaiting verification</h3>${store.medtechResults.some((result) => result.status === "Pending Verification") ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Patient</th><th>Test</th><th>Result</th><th>Entered</th><th>Status</th></tr></thead><tbody>${store.medtechResults.filter((result) => result.status === "Pending Verification").map((result) => `<tr><td>${escapeHTML(patientName(result.patientId))}</td><td>${escapeHTML(result.testName)}</td><td>${escapeHTML(result.value)} ${escapeHTML(result.unit || "")}</td><td>${escapeHTML(result.enteredAt)}</td><td>${escapeHTML(result.status)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No results are awaiting verification.</p>`}</section>`;
	}

	function renderMedtechVerifiedResults() {
		const results = store.medtechResults.filter((result) => result.status === "Verified");
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY WORKFLOW</p><h2>Verified Results</h2></div></div><section class="portal-panel"><p class="field-hint">Results appear here after verification by authorized review personnel. Release is restricted to authorized staff.</p>${results.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Report ID</th><th>Patient</th><th>Test</th><th>Result</th><th>Verified by</th><th>Verified date/time</th><th>Release status</th></tr></thead><tbody>${results.map((result) => `<tr><td>${escapeHTML(result.id)}</td><td>${escapeHTML(patientName(result.patientId))}</td><td>${escapeHTML(result.testName)}</td><td>${escapeHTML(result.value)} ${escapeHTML(result.unit || "")}</td><td>${escapeHTML(result.verifiedBy || "Authorized reviewer")}</td><td>${escapeHTML(result.verifiedAt || "—")}</td><td>${escapeHTML(result.releaseStatus || "Pending release")}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No verified laboratory results are available.</p>`}</section>`;
	}

	function renderMedtechReports() {
		const requests = store.medtechRequests;
		const rows = requests.map((request) => {
			const result = store.medtechResults.find((entry) => entry.requestId === request.id);
			return `<tr><td>${escapeHTML(request.id)}</td><td>${escapeHTML(patientName(request.patientId))}</td><td>${escapeHTML(store.patients.find((patient) => patient.id === request.patientId)?.patientNumber || request.patientId)}</td><td>${escapeHTML(request.testName)}</td><td>${escapeHTML(result?.value || "Not entered")}${result?.unit ? ` ${escapeHTML(result.unit)}` : ""}</td><td>${escapeHTML(result?.referenceRange || "Not recorded")}</td><td>${escapeHTML(request.collectionTime || "Not recorded")}</td><td>${escapeHTML(result?.releasedAt || "Not released")}</td><td>${escapeHTML(result?.releaseSignatory || result?.verifiedBy || "Not assigned")}</td><td>${escapeHTML(result?.releaseStatus || request.status || "Pending")}</td></tr>`;
		}).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY SERVICES</p><h2>Laboratory Reports</h2></div><div class="form-actions"><button class="secondary-button" type="button" data-medtech-report-print>Print report</button><button class="secondary-button" type="button" data-medtech-report-export>Export CSV</button></div></div><section class="portal-panel"><p class="field-hint">Reports include request details, recorded results, reference ranges, collection/release dates, authorized signatory, and report status.</p>${requests.length ? `<div class="table-wrap"><table class="dietitian-table"><thead><tr><th>Request ID</th><th>Patient</th><th>Patient ID</th><th>Test</th><th>Result</th><th>Reference range</th><th>Collection date/time</th><th>Release date</th><th>Authorized signatory</th><th>Report status</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">No laboratory report records are available.</p>`}</section>`;
	}

	function renderMedtechNotifications() {
		const pending = store.medtechRequests.filter((request) => !["Completed", "Verified", "Released", "Rejected"].includes(request.status));
		const statRequests = pending.filter((request) => request.priority === "STAT");
		const abnormalResults = store.laboratory.filter((record) => getLaboratoryStatus(record.testId, record.results, record.patientGender).abnormal);
		const awaitingVerification = store.medtechResults.filter((result) => result.status === "Pending Verification");
		const alerts = [
			...pending.map((request) => ({ title: `${request.priority} laboratory request`, detail: `${patientName(request.patientId)} · ${request.testName} · ${request.status}`, view: "laboratory-requests" })),
			...statRequests.map((request) => ({ title: "STAT request reminder", detail: `${patientName(request.patientId)} · ${request.testName}`, view: "pending-tests" })),
			...awaitingVerification.map((result) => ({ title: "Result awaiting verification", detail: `${patientName(result.patientId)} · ${result.testName}`, view: "enter-laboratory-results" })),
			...abnormalResults.map((result) => ({ title: "Result flagged for protocol review", detail: `${patientName(result.patientId)} · ${result.testName}: ${result.results}`, view: "laboratory-reports" }))
		];
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY SERVICES</p><h2>Notifications</h2></div></div><section class="portal-panel"><h3>Laboratory alerts and reminders</h3>${alerts.length ? `<ul class="dietitian-notification-list">${alerts.map((alert) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(alert.title)}</strong><small>${escapeHTML(alert.detail)}</small></div><button class="table-action" type="button" data-go-view="${escapeHTML(alert.view)}">Open</button></li>`).join("")}</ul>` : `<p class="empty-state">No laboratory alerts or reminders.</p>`}</section>`;
	}

	function renderMedtechProfile() {
		return `<div class="section-heading"><div><p class="portal-kicker">LABORATORY ACCOUNT</p><h2>My Profile</h2></div></div><section class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${escapeHTML(currentUser.photo)}" alt="MedTech profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="medtech-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Employee ID<input name="employmentId" value="${escapeHTML(currentUser.employmentId || currentUser.id)}"></label><label>Email<input value="${escapeHTML(currentUser.email)}" readonly></label><label>Contact number<input name="contactNumber" type="tel" value="${escapeHTML(currentUser.contactNumber || "")}"></label><label>Job position<input value="${escapeHTML(currentUser.position)}" readonly></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Maximum 500 KB.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button></div></form></section>${renderCredentialsForm()}`;
	}

	function renderDoctorDashboard() {
		const today = new Date().toISOString().slice(0, 10);
		const now = new Date();
		const todayAppointments = store.receptionAppointments
			.filter((entry) => entry.date === today && entry.status !== "Cancelled")
			.sort((first, second) => String(first.time || "").localeCompare(String(second.time || "")));
		const upcomingAppointments = store.receptionAppointments
			.filter((entry) => entry.date >= today && entry.status !== "Cancelled")
			.sort((first, second) => `${first.date} ${first.time || ""}`.localeCompare(`${second.date} ${second.time || ""}`))
			.slice(0, 5);
		const consultations = store.receptionAppointments.filter((entry) => entry.date >= today
			&& entry.status !== "Cancelled"
			&& /consultation|follow-up/i.test(entry.type || ""));
		const pendingLabResults = store.medtechRequests.filter((request) => !["Completed", "Verified", "Released", "Rejected"].includes(request.status)).length;
		const abnormalResults = store.laboratory.filter((record) => getLaboratoryStatus(
			record.testId || LABORATORY_TESTS.find((entry) => entry.name === record.testName)?.id || "",
			record.results,
			record.patientGender || store.patients.find((patient) => patient.id === record.patientId)?.gender
		).abnormal);
		const patientsRequiringReview = new Set(abnormalResults.map((record) => record.patientId)).size;
		const hour = now.getHours();
		const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
		const [familyName, givenName] = currentUser.name.split(",").map((part) => part.trim());
		const displayName = givenName ? `${givenName} ${familyName}` : familyName;
		const notifications = [
			...store.patientScheduleRequests.map((request) => ({
				type: "appointment",
				text: `New appointment request from ${request.patientName || patientName(request.patientId)} (${store.patients.find((patient) => patient.id === request.patientId)?.patientNumber || "Patient"})`,
				detail: `${request.date} · ${formatTimeWithPeriod(request.startTime || "")}`,
				date: request.createdAt || request.date,
				order: request.createdAt || request.date
			})),
			...store.laboratory.map((record) => ({
				type: "laboratory",
				text: `Lab result available for ${patientName(record.patientId)} (${store.patients.find((patient) => patient.id === record.patientId)?.patientNumber || "Patient"})`,
				detail: `${record.testName || "Laboratory test"} · ${record.date || "Date not recorded"}`,
				date: record.createdAt || record.date,
				order: record.createdAt || record.date
			})),
			...abnormalResults.map((record) => ({
				type: "review",
				text: `Patient requires clinical review: ${patientName(record.patientId)} (${store.patients.find((patient) => patient.id === record.patientId)?.patientNumber || "Patient"})`,
				detail: `${record.testName || "Laboratory result"} · ${record.date || "Date not recorded"}`,
				date: record.createdAt || record.date,
				order: record.createdAt || record.date
			})),
			...upcomingAppointments.filter((entry) => /dialysis/i.test(entry.type || "")).map((entry) => ({
				type: "dialysis",
				text: `Dialysis schedule reminder for ${patientName(entry.patientId)} (${store.patients.find((patient) => patient.id === entry.patientId)?.patientNumber || "Patient"})`,
				detail: `${entry.date} · ${formatTimeWithPeriod(entry.time || "")}`,
				date: entry.date,
				order: `${entry.date} ${entry.time || ""}`
			}))
		].sort((first, second) => String(second.order).localeCompare(String(first.order))).slice(0, 4);
		const notificationRows = notifications.map((notification) => {
			const timestamp = new Date(notification.date);
			const includesTime = /[T ]\d{1,2}:\d{2}/.test(String(notification.date));
			const timeLabel = !includesTime || Number.isNaN(timestamp.getTime())
				? notification.detail
				: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			return `<tr><td><span class="doctor-notification-indicator ${notification.type}" aria-hidden="true"></span>${escapeHTML(notification.text)}</td><td>${escapeHTML(notification.detail)}</td><td>${escapeHTML(timeLabel)}</td></tr>`;
		}).join("");
		const dashboardDate = now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
		return `<section class="doctor-dashboard"><header class="doctor-dashboard-welcome"><div><h2>${greeting}, Dr. ${escapeHTML(displayName)}!</h2><p>Here’s your daily overview.</p></div><time datetime="${today}">${escapeHTML(dashboardDate)}</time></header><div class="doctor-dashboard-stats"><article class="doctor-dashboard-stat patients"><div><span>Total Patients</span><strong>${store.patients.length}</strong></div></article><article class="doctor-dashboard-stat appointments"><div><span>Today’s Appointments</span><strong>${todayAppointments.length}</strong></div></article><article class="doctor-dashboard-stat labs"><div><span>Pending Lab Results</span><strong>${pendingLabResults}</strong></div></article><article class="doctor-dashboard-stat consultations"><div><span>Upcoming Consultations</span><strong>${consultations.length}</strong></div></article><article class="doctor-dashboard-stat reviews"><div><span>Patients Requiring Clinical Review</span><strong>${patientsRequiringReview}</strong></div></article></div><section class="doctor-dashboard-recent"><header><h3>Recent Notifications</h3><button type="button" data-go-view="notifications">View All</button></header>${notifications.length ? `<div class="table-wrap"><table class="dietitian-table doctor-dashboard-notifications-table"><thead><tr><th>Notification</th><th>Details</th><th>Time</th></tr></thead><tbody>${notificationRows}</tbody></table></div>` : `<p class="empty-state">No recent notifications.</p>`}</section></section>`;
	}

	function renderDoctorNotifications() {
		const today = nurseDateKey();
		const appointmentRequests = store.patientScheduleRequests
			.slice()
			.sort((first, second) => `${second.date} ${second.startTime}`.localeCompare(`${first.date} ${first.startTime}`));
		const upcomingAppointments = store.receptionAppointments
			.filter((entry) => entry.date >= today && entry.status !== "Cancelled")
			.sort((first, second) => `${first.date} ${first.time || ""}`.localeCompare(`${second.date} ${second.time || ""}`))
			.slice(0, 5);
		const abnormalResults = store.laboratory.filter((record) => getLaboratoryStatus(record.testId || LABORATORY_TESTS.find((entry) => entry.name === record.testName)?.id || "", record.results, record.patientGender || store.patients.find((patient) => patient.id === record.patientId)?.gender).abnormal);
		const requestRows = appointmentRequests.map((request) => {
			const status = request.status || "Pending";
			const statusClass = status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
			return `<tr><td>${escapeHTML(request.patientName || patientName(request.patientId))}</td><td>${escapeHTML(request.date)}</td><td>${escapeHTML(formatTimeWithPeriod(request.startTime || ""))}–${escapeHTML(formatTimeWithPeriod(request.endTime || ""))}</td><td>${escapeHTML(request.details || "Appointment")}</td><td><span class="doctor-status-chip ${statusClass}">${escapeHTML(status)}</span></td><td><button class="table-action" type="button" data-go-view="appointments">Review</button></td></tr>`;
		}).join("");
		const appointmentRows = upcomingAppointments.map((entry) => {
			const status = entry.status || "Scheduled";
			const statusClass = status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
			return `<tr><td>${escapeHTML(patientName(entry.patientId))}</td><td>${escapeHTML(entry.date)}</td><td>${escapeHTML(formatTimeWithPeriod(entry.time || ""))}</td><td>${escapeHTML(entry.type || "Appointment")}</td><td><span class="doctor-status-chip ${statusClass}">${escapeHTML(status)}</span></td></tr>`;
		}).join("");
		const abnormalRows = abnormalResults.map((record) => `<tr><td>${escapeHTML(patientName(record.patientId))}</td><td>${escapeHTML(record.testName || "Laboratory test")}</td><td>${escapeHTML(record.results || "Not recorded")}</td><td>${escapeHTML(record.date || "Date not recorded")}</td><td><button class="table-action" type="button" data-go-view="laboratory-results">Open results</button></td></tr>`).join("");
		const notificationCount = appointmentRequests.length + upcomingAppointments.length + abnormalResults.length;
		return `<div class="section-heading"><div><p class="portal-kicker">DOCTOR WORKSPACE</p><h2>Notifications</h2><p class="muted-copy">Appointment updates and clinical items that may need your attention.</p></div><span class="demo-chip">${notificationCount} ITEMS</span></div><section class="portal-panel"><div class="panel-heading"><h3>Appointment requests</h3><button class="table-action" type="button" data-go-view="appointments">Open appointments</button></div>${requestRows ? `<div class="table-wrap"><table class="dietitian-table doctor-record-table"><thead><tr><th>Patient</th><th>Date</th><th>Requested time</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead><tbody>${requestRows}</tbody></table></div>` : `<p class="empty-state">No appointment requests.</p>`}</section><section class="portal-panel"><div class="panel-heading"><h3>Upcoming appointments</h3><button class="table-action" type="button" data-go-view="appointments">View schedule</button></div>${appointmentRows ? `<div class="table-wrap"><table class="dietitian-table doctor-record-table"><thead><tr><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th></tr></thead><tbody>${appointmentRows}</tbody></table></div>` : `<p class="empty-state">No upcoming appointments.</p>`}</section><section class="portal-panel"><div class="panel-heading"><h3>Laboratory results for review</h3><button class="table-action" type="button" data-go-view="laboratory-results">Open results</button></div>${abnormalRows ? `<div class="table-wrap"><table class="dietitian-table doctor-record-table"><thead><tr><th>Patient</th><th>Test</th><th>Result</th><th>Date</th><th>Action</th></tr></thead><tbody>${abnormalRows}</tbody></table></div>` : `<p class="empty-state">No results are flagged outside the configured reference ranges.</p>`}</section>`;
	}

	function renderNurseDashboard() {
		const weekday = ["Sunday", ...DAY_NAMES][new Date().getDay()];
		const todayPatients = store.patients.filter((patient) => (patient.dialysisDays || []).includes(weekday));
		const todayDate = nurseDateKey();
		const pendingNotes = todayPatients.filter((patient) => !store.notes.some((note) => note.patientId === patient.id && note.date === todayDate)).length;
		const upcomingSessions = getNurseUpcomingSessions().sort((first, second) => first.date.localeCompare(second.date));
		const groupedSessions = new Map();
		upcomingSessions.forEach((session) => {
			const patientSessions = groupedSessions.get(session.patient.id) || [];
			patientSessions.push(session);
			groupedSessions.set(session.patient.id, patientSessions);
		});
		const upcomingSchedule = [...groupedSessions.values()].map((sessions) => {
			const patient = sessions[0].patient;
			const assignedDays = sessions
				.map(({ weekday: sessionDay }) => sessionDay)
				.filter((sessionDay, index, days) => days.indexOf(sessionDay) === index);
			const nextDate = sessions[0].date;
			return `<li><span class="activity-mark"></span><div><strong>${escapeHTML(patient.name)}</strong><small>${escapeHTML(assignedDays.join(", "))} · ${escapeHTML(formatTimeWithPeriod(patient.timeIn || "Time not recorded"))}–${escapeHTML(formatTimeWithPeriod(patient.timeOut || "Time not recorded"))} · ${escapeHTML(patient.accessSite || "Access not recorded")} · Next: ${escapeHTML(nextDate)}</small></div></li>`;
		}).join("");
		const preferences = currentUser.notificationPreferences || {};
		const alertCount = (preferences.clinicalAlerts === false ? 0 : store.laboratory.filter((record) => getLaboratoryStatus(record.testId, record.results, record.patientGender).abnormal).length)
			+ store.staffNotifications.filter((notification) => notification.recipientId === currentUser.id && notification.type !== "contact-message").length;
		const cards = [
			["Assigned patients", store.patients.length],
			["Upcoming dialysis sessions", upcomingSessions.length],
			["Pending nursing notes", pendingNotes],
			["Patient monitoring alerts", alertCount]
		];
		return `<div class="section-heading"><div><p class="portal-kicker">NURSE WORKSPACE</p><h2>Nurse Dashboard</h2><p class="muted-copy">${escapeHTML(currentUser.name)}</p></div><span class="demo-chip">NURSE</span></div><section class="portal-panel"><h3>Overview ng nursing activities</h3><div class="stat-grid">${cards.map(([label, count]) => `<article class="stat-card"><span>${escapeHTML(label)}</span><strong>${count}</strong></article>`).join("")}</div><p class="muted-copy">Counts use registered patient schedules, expected notes for today's scheduled patients, and alerts from available clinical records.</p></section><section class="portal-panel"><h3>Upcoming dialysis schedule</h3>${upcomingSessions.length ? `<ul class="activity-list">${upcomingSchedule}</ul>` : `<p class="empty-state">Walang naka-assign na dialysis schedule sa susunod na pitong araw.</p>`}</section>`;
	}

	function renderAdminDashboard() {
		const matchingPatients = store.patients.filter((patient) => 		[patient.name, patient.email, patient.dialysisType, patient.center, patient.patientNumber]
			.join(" ").toLowerCase().includes(dashboardPatientQuery));
		return `<div class="section-heading"><div><p class="portal-kicker">OVERVIEW</p><h2>Dialysis cases</h2></div><span class="demo-chip">LOCAL DEMO DATA</span></div>
			<div class="stat-grid"><article class="stat-card"><span>REGISTERED PATIENTS</span><strong>${store.patients.length}</strong></article><article class="stat-card"><span>TOTAL CASE RECORDS</span><strong>${store.notes.length}</strong></article><article class="stat-card"><span>PENDING BILLS</span><strong>${store.bills.filter((bill) => bill.status === "Pending").length}</strong></article><article class="stat-card"><span>ANNOUNCEMENTS</span><strong>${store.announcements.length}</strong></article></div>
			<div class="portal-panel"><div class="nurse-directory-toolbar"><h3>Patient directory (${store.patients.length})</h3><label class="nurse-search">Search patients<input id="dashboard-patient-search" type="search" value="${escapeHTML(dashboardPatientQuery)}" placeholder="Name, email, type, center, or patient number"></label></div>${matchingPatients.length ? patientTable(matchingPatients, false, true) : store.patients.length ? "" : `<p class="empty-state">No patient records yet.</p>`}<p class="empty-state" data-dashboard-search-empty ${matchingPatients.length || !store.patients.length ? "hidden" : ""}>No patients match your search.</p></div>`;
	}

	function patientTable(patients, actions = true, showRecord = false) {
		if (!patients.length) return `<p class="empty-state">No patient records yet.</p>`;
		return `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Email</th><th>Dialysis type</th><th>Center</th><th>Pending bills / balance</th>${actions ? "<th>Actions</th>" : ""}</tr></thead><tbody>${patients.map((patient) => {
			const pendingBills = store.bills.filter((bill) => bill.patientId === patient.id && bill.status === "Pending");
			const balance = pendingBills.reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
			const pendingSummary = pendingBills.length
				? showRecord
					? `<button class="table-action" type="button" data-view-patient-billing="${escapeHTML(patient.id)}" aria-label="View ${pendingBills.length} pending bills for ${escapeHTML(patient.name)}, balance ${formatMoney(balance)}">${pendingBills.length} pending · ${formatMoney(balance)}</button>`
					: `${pendingBills.length} pending · ${formatMoney(balance)}`
				: "No pending bills";
			return `<tr${showRecord ? ` data-patient-search="${escapeHTML([patient.name, patient.email, patient.dialysisType, patient.center, patient.patientNumber].join(" ").toLowerCase())}"` : ""}><td>${escapeHTML(patient.name)}${showRecord ? ` <button class="table-action" data-view-patient-record="${escapeHTML(patient.id)}">View record</button>` : ""}</td><td>${escapeHTML(patient.email)}</td><td>${escapeHTML(patient.dialysisType || "Not set")}</td><td>${escapeHTML(patient.center || "Not set")}</td><td>${pendingSummary}</td>${actions ? `<td><button class="table-action" data-edit-patient="${escapeHTML(patient.id)}">Edit</button><button class="table-action danger" data-delete-patient="${escapeHTML(patient.id)}">Delete</button></td>` : ""}</tr>`;
		}).join("")}</tbody></table></div>`;
	}

	function renderPatientRecord(patientId) {
		const patient = store.patients.find((entry) => entry.id === patientId);
		if (!patient) return `<div class="section-heading"><div><p class="portal-kicker">PATIENT RECORD</p><h2>Record unavailable</h2></div><button class="secondary-button" type="button" data-back-to-dashboard>Back to dashboard</button></div><div class="portal-panel"><p class="empty-state">This patient record may have been removed.</p></div>`;
		const recordFields = [
			["Full name", patient.name], ["Email", patient.email], ["Birthday", patient.birthday], ["Age", patient.age],
			["Gender", patient.gender], ["Home address", patient.address], ["Dialysis type", patient.dialysisType],
			["Center", patient.center], ["Dialysis access", patient.accessSite],
			["Assigned dialysis days", (patient.dialysisDays || []).join(", ")], ["Registered", patient.registeredAt]
		];
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT RECORD · VIEW ONLY</p><h2>${escapeHTML(patient.name)}</h2></div><button class="secondary-button" type="button" data-back-to-dashboard>Back to dashboard</button></div><div class="portal-panel"><dl class="profile-details">${recordFields.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value || "Not provided")}</dd></div>`).join("")}</dl></div>`;
	}

	function patientOptions(selectedId = "") {
		return store.patients.map((patient) => `<option value="${escapeHTML(patient.id)}" ${patient.id === selectedId ? "selected" : ""}>${escapeHTML(patient.name)}</option>`).join("");
	}

	function renderPatientSearch(searchId, selectedPatientId) {
		const selectedPatient = store.patients.find((patient) => patient.id === selectedPatientId);
		return `<div class="patient-search-control"><label for="${searchId}-patient-search">Search patient by name</label><input id="${searchId}-patient-search" type="search" data-patient-search-input="${searchId}" value="${escapeHTML(selectedPatient?.name || "")}" placeholder="Type a patient name" autocomplete="off" aria-controls="${searchId}-patient-results" aria-expanded="false"><ul id="${searchId}-patient-results" class="patient-search-results" role="listbox" hidden></ul></div>`;
	}

	function renderNursingAssessment(note) {
		const phases = [["Before", note.before], ["During", note.during], ["After", note.after]]
			.filter(([, value]) => String(value || "").trim());
		if (!phases.length) return `<p>${escapeHTML(note.text || "")}</p>`;
		return `<div class="nursing-assessment-list">${phases.map(([phase, value]) => `<section><h4>${escapeHTML(phase)}</h4><p>${escapeHTML(value)}</p></section>`).join("")}</div>`;
	}

	function renderAssessmentDocument(documentation, index, editable = false) {
		const fields = [
			["vitalSignsBefore", "Vital signs before dialysis", "vitals-before"],
			["vitalSignsAfter", "Vital signs after dialysis", "vitals-after"],
			["weightBefore", "Weight before dialysis", "text"],
			["weightAfter", "Weight after dialysis", "text"],
			["signsSymptoms", "Signs & symptoms", "textarea"],
			["overallCondition", "Overall condition", "textarea"]
		];
		return `<fieldset class="assessment-document" data-assessment-document><legend>Documentation ${index + 1}</legend>${editable ? `<label>Date<input type="date" data-assessment-field="date" value="${escapeHTML(documentation.date || new Date().toISOString().slice(0, 10))}"></label>` : `<p class="portal-kicker">${escapeHTML(documentation.date || "Date not provided")}</p>`}<div class="assessment-document-fields">${fields.map(([name, label, type]) => {
			const value = String(documentation[name] || "");
			if (type === "vitals-before" || type === "vitals-after") {
				const vitalName = type === "vitals-before" ? "Vital signs before dialysis" : "Vital signs after dialysis";
				const vitalFields = [
					["Temperature", "temperature", "°C"],
					["Respiratory rate", "respiratoryRate", "breaths/min"],
					["Pulse rate", "pulseRate", "bpm"],
					["Blood pressure", "bloodPressure", "mmHg"],
					["O2SAT", "o2sat", "%"]
				];
				const values = vitalFields.map(([vitalLabel, field, unit]) => {
					const fieldName = `${name}${field[0].toUpperCase()}${field.slice(1)}`;
					const fieldValue = String(documentation[fieldName] || "");
					return editable
						? `<label>${vitalLabel}<input type="text" inputmode="decimal" data-assessment-field="${fieldName}" value="${escapeHTML(fieldValue)}" placeholder="${unit}"></label>`
						: fieldValue.trim() ? `<section><h4>${vitalLabel}</h4><p>${escapeHTML(fieldValue)} ${unit}</p></section>` : "";
				}).join("");
				const legacyFieldName = `${name}Legacy`;
				const legacyValue = String(documentation[legacyFieldName] || value);
				return `<section class="assessment-vitals"><h4>${vitalName}</h4>${legacyValue.trim() ? editable ? `<label>Previous vital-sign notes<textarea data-assessment-field="${legacyFieldName}" rows="2">${escapeHTML(legacyValue)}</textarea></label>` : `<section><h4>Previous vital-sign notes</h4><p>${escapeHTML(legacyValue)}</p></section>` : ""}<div class="assessment-vitals-fields">${values}</div></section>`;
			}
			return editable
				? `<label>${label}${type === "textarea" ? `<textarea data-assessment-field="${name}" rows="3">${escapeHTML(value)}</textarea>` : `<input type="text" data-assessment-field="${name}" value="${escapeHTML(value)}" placeholder="e.g. 65 kg">`}</label>`
				: value.trim() ? `<section><h4>${label}</h4><p>${escapeHTML(value)}</p></section>` : "";
		}).join("")}</div></fieldset>`;
	}

	function renderPatientOverview(patient) {
		const assessment = patient.assessment || {};
		const previousAssessment = [["Before dialysis", assessment.before], ["During dialysis", assessment.during], ["After dialysis", assessment.after]]
			.filter(([, value]) => String(value || "").trim());
		const notes = store.notes.filter((note) => note.patientId === patient.id);
		const labRecords = store.laboratory.filter((record) => record.patientId === patient.id);
		const dietary = store.dietaryCounseling.filter((record) => record.patientId === patient.id);
		const clinicalNotes = isNephrologist ? "" : `<div class="portal-panel"><h3>Nursing notes</h3>${notes.length ? `<div class="notes-list">${notes.map((note) => `<article class="note-card"><p class="portal-kicker">${escapeHTML(note.date)}</p>${renderNursingAssessment(note)}</article>`).join("")}</div>` : `<p class="empty-state">No nursing notes for this patient yet.</p>`}</div>`;
		return `${renderPatientInformationCard(patient)}
			<div class="portal-panel"><h3>Patient assessment</h3>${previousAssessment.length ? `<section class="previous-assessment"><h4>Previous assessment notes</h4><div class="nursing-assessment-list">${previousAssessment.map(([phase, value]) => `<section><h4>${phase}</h4><p>${escapeHTML(value)}</p></section>`).join("")}</div></section>` : ""}${assessment.documents?.length ? `<div class="assessment-document-list">${assessment.documents.map((documentation, index) => renderAssessmentDocument(documentation, index)).join("")}</div>` : `<p class="empty-state">No assessment documentation saved yet.</p>`}</div>
			${clinicalNotes}
			<div class="portal-panel"><h3>Laboratory</h3>${renderLaboratoryGroups(patient, labRecords, false)}${labRecords.length ? `<h3>Laboratory history</h3>${renderLaboratoryRecords(labRecords, patient)}` : ""}</div>
			<div class="portal-panel"><h3>Dietary &amp; Nutrition Counseling</h3>${dietary.length ? `<div class="notes-list">${dietary.map((record) => `<article class="note-card"><p class="portal-kicker">${escapeHTML(record.date)}</p><h4>${escapeHTML(record.topic)}</h4><p>${escapeHTML(record.counseling)}</p></article>`).join("")}</div>` : `<p class="empty-state">No dietary and nutrition counseling records for this patient yet.</p>`}</div>`;
	}

	function renderDoctorPrescriptions() {
		const patient = store.patients.find((entry) => entry.id === activePrescriptionPatientId);
		const records = patient ? store.prescriptions.filter((record) => record.patientId === patient.id && !record.isNurseMARSample) : [];
		const medicationOptions = PRESCRIPTION_MEDICATIONS.map((name) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("");
		const painMedicationOptions = PRESCRIPTION_PAIN_MEDICATIONS.map((name) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("");
		const vaccineOptions = PRESCRIPTION_VACCINES.map(({ name }) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("");
		return `<div class="portal-panel"><h3>Prescription drugs &amp; vaccines</h3><p class="field-hint">Record only medications and vaccines authorized by the treating clinician. Enter the dosage, route, frequency, and quantity exactly as ordered; this form does not calculate or recommend them.</p>${renderPatientSearch("prescription", activePrescriptionPatientId)}${patient ? `<form id="prescription-form" class="form-grid"><label>Record type<select name="recordType" data-prescription-type><option value="medication">Medication</option><option value="vaccine">Vaccine</option></select></label><label data-prescription-medication-field>Medication<select name="medication" required><option value="">Choose a medication</option><optgroup label="General medications">${medicationOptions}</optgroup><optgroup label="Medication for pain">${painMedicationOptions}</optgroup></select></label><label data-prescription-vaccine-field hidden>Vaccine<select name="vaccine" disabled><option value="">Choose a vaccine</option>${vaccineOptions}</select></label><label data-prescription-option-field hidden>Vaccine option<select name="vaccineOption" disabled></select></label><label>Dosage (as prescribed)<input name="dosage" type="text" maxlength="120" placeholder="Enter exact prescribed dosage" required></label><label>Route (as prescribed)<input name="route" type="text" maxlength="80" placeholder="Enter prescribed route" required></label><label data-prescription-frequency-field>Frequency (as prescribed)<input name="frequency" type="text" maxlength="120" placeholder="Enter exact prescribed frequency"></label><label data-prescription-quantity-field>Quantity prescribed<input name="quantity" type="number" min="1" step="1" value="1" required></label><label>Date<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><label class="full-width">Prescription instructions (as ordered)<textarea name="instructions" rows="3" placeholder="Enter clinician-authorized instructions"></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save to patient record</button></div></form><h3>Medication and vaccine records for ${escapeHTML(patient.name)}</h3>${records.length ? `<div class="notes-list">${records.map((record) => `<article class="note-card"><div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(record.date)}</p><h4>${escapeHTML(record.product)}</h4><span class="muted-copy">${record.type === "vaccine" ? "Vaccine" : "Medication"}${record.provider ? ` · Recorded by ${escapeHTML(record.provider)}` : ""}</span></div><button class="table-action danger" type="button" data-delete-prescription="${escapeHTML(record.id)}">Delete</button></div><p><strong>Dosage:</strong> ${escapeHTML(record.dosage || "Not recorded")} · <strong>Route:</strong> ${escapeHTML(record.route || "Not recorded")}${record.quantity ? ` · <strong>Quantity:</strong> ${escapeHTML(record.quantity)}` : ""}${record.frequency ? ` · <strong>Frequency:</strong> ${escapeHTML(record.frequency)}` : ""}</p>${record.instructions ? `<p>${escapeHTML(record.instructions)}</p>` : ""}</article>`).join("")}</div>` : `<p class="empty-state">No medication or vaccine records for this patient yet.</p>`}` : `<p class="empty-state">Search and select a patient to record a medication or vaccine.</p>`}</div>`;
	}

	function updatePrescriptionForm() {
		const form = viewContainer.querySelector("#prescription-form");
		if (!form) return;
		const isVaccine = form.elements.recordType.value === "vaccine";
		const medicationField = form.querySelector("[data-prescription-medication-field]");
		const medicationSelect = form.elements.medication;
		const vaccineField = form.querySelector("[data-prescription-vaccine-field]");
		const vaccineSelect = form.elements.vaccine;
		const frequencyField = form.querySelector("[data-prescription-frequency-field]");
		const quantityField = form.querySelector("[data-prescription-quantity-field]");
		const frequencyInput = form.elements.frequency;
		medicationField.hidden = isVaccine;
		medicationSelect.disabled = isVaccine;
		medicationSelect.required = !isVaccine;
		vaccineField.hidden = !isVaccine;
		vaccineSelect.disabled = !isVaccine;
		vaccineSelect.required = isVaccine;
		frequencyField.hidden = isVaccine;
		frequencyInput.disabled = isVaccine;
		frequencyInput.required = !isVaccine;
		quantityField.hidden = isVaccine;
		form.elements.quantity.disabled = isVaccine;
		form.elements.quantity.required = !isVaccine;
		if (isVaccine) {
			medicationSelect.value = "";
		} else {
			vaccineSelect.value = "";
		}
		updatePrescriptionVaccineOptions();
	}

	function updatePrescriptionVaccineOptions() {
		const form = viewContainer.querySelector("#prescription-form");
		if (!form) return;
		const vaccineSelect = form.elements.vaccine;
		const optionField = form.querySelector("[data-prescription-option-field]");
		const optionSelect = form.elements.vaccineOption;
		const vaccine = PRESCRIPTION_VACCINES.find((entry) => entry.name === vaccineSelect.value);
		const options = vaccine?.options || [];
		optionField.hidden = options.length === 0;
		optionSelect.disabled = options.length === 0 || form.elements.recordType.value !== "vaccine";
		optionSelect.required = options.length > 0;
		optionSelect.innerHTML = `<option value="">Choose an option</option>${options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}`;
	}

	function renderAdminPatients(editPatient = null) {
		const overviewPatient = store.patients.find((entry) => entry.id === activeOverviewPatientId);
		const patient = editPatient || {};
		const notePatient =  store.patients.find((entry) => entry.id === activeNotePatientId);
		const editingNote = store.notes.find((note) => note.id === activeEditingNoteId && note.patientId === activeNotePatientId);
		const patientNotes = notePatient ? store.notes.filter((note) => note.patientId === notePatient.id) : [];
		const laboratoryPatient = store.patients.find((entry) => entry.id === activeLaboratoryPatientId);
		const laboratoryRecords = laboratoryPatient ? store.laboratory.filter((record) => record.patientId === laboratoryPatient.id) : [];
		const dietaryPatient = store.patients.find((entry) => entry.id === activeDietaryPatientId);
		const dietaryRecords = dietaryPatient ? store.dietaryCounseling.filter((record) => record.patientId === dietaryPatient.id) : [];
		const assessmentPatient = store.patients.find((entry) => entry.id === activeAssessmentPatientId);
		const assessment = assessmentPatient?.assessment || {};
		const assessmentDocuments = [{}];
		const previousAssessment = [["Before dialysis", assessment.before], ["During dialysis", assessment.during], ["After dialysis", assessment.after]]
			.filter(([, value]) => String(value || "").trim());
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT RECORDS</p><h2>Patients Profile</h2></div><span class="demo-chip">ADMIN ONLY</span></div>
			<div class="portal-panel"><h3>Search all patient records</h3><p class="muted-copy">Search a patient name to see their ID card, assessment, laboratory, and dietary &amp; nutrition counseling records.</p><div class="overview-search-row">${renderPatientSearch("overview", activeOverviewPatientId)}<button class="primary-button" type="button" data-overview-search>Show all records</button>${overviewPatient ? `<button class="secondary-button" type="button" data-overview-clear>Clear</button>` : ""}</div></div>
			${overviewPatient ? renderPatientOverview(overviewPatient) : ""}
			<div class="portal-panel"><h3>${patient.id ? "Edit patient" : "Add patient record"}</h3><form id="admin-patient-form" class="form-grid"><input type="hidden" name="patientId" value="${escapeHTML(patient.id || "")}"><label>Full name<input name="name" value="${escapeHTML(patient.name || "")}" required></label><label>Email<input type="email" name="email" value="${escapeHTML(patient.email || "")}" required></label><label>Birthday<input type="date" name="birthday" value="${escapeHTML(patient.birthday || "")}"></label><label>Age<input type="number" min="0" name="age" value="${escapeHTML(patient.age || "")}"></label><label>Gender<select name="gender"><option value="">Choose</option>${["Female", "Male", "Other"].map((value) => `<option ${patient.gender === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Contact number<input type="tel" name="contactNumber" value="${escapeHTML(patient.contactNumber || "")}" autocomplete="tel"></label><label>Dialysis type<select name="dialysisType">${["Hemodialysis"].map((value) => `<option ${patient.dialysisType === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Center<select name="center">${["Sumulong"].map((value) => `<option ${patient.center === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Home address<input name="address" value="${escapeHTML(patient.address || "")}"></label><div class="form-actions"><button class="primary-button" type="submit">${patient.id ? "Save patient" : "Add patient"}</button>${patient.id ? `<button class="secondary-button" type="button" data-cancel-patient-edit>Cancel</button>` : ""}</div>			</form></div>
						<div class="portal-panel"><h3>Patient assessment</h3>${renderPatientSearch("assessment", activeAssessmentPatientId)}${assessmentPatient ? `<form id="assessment-form" class="form-grid"><div id="assessment-document-list" class="assessment-document-list full-width">${assessmentDocuments.map((documentation, index) => renderAssessmentDocument(documentation, index, true)).join("")}</div><div class="form-actions full-width"><button class="secondary-button" type="button" data-add-assessment-document>Add another documentation</button><button class="primary-button" type="submit">Save assessment</button></div></form>${previousAssessment.length ? `<section class="previous-assessment"><h4>Previous assessment notes</h4><div class="nursing-assessment-list">${previousAssessment.map(([phase, value]) => `<section><h4>${phase}</h4><p>${escapeHTML(value)}</p></section>`).join("")}</div></section>` : ""}<h4>Saved assessment records for ${escapeHTML(assessmentPatient.name)}</h4>${assessment.documents?.length ? `<div class="assessment-document-list">${assessment.documents.map((documentation, index) => renderAssessmentDocument(documentation, index)).join("")}</div>` : `<p class="empty-state">No assessment documentation saved yet.</p>`}` : `<p class="empty-state">Search and select a patient to add or edit an assessment.</p>`}</div>
			${isNephrologist ? renderDoctorPrescriptions() : `<div class="portal-panel"><h3>Nursing notes</h3>${renderPatientSearch("note", activeNotePatientId)}${notePatient ? `<form id="nursing-note-form" class="form-grid"><input type="hidden" name="noteId" value="${escapeHTML(editingNote?.id || "")}"><label class="full-width">Note<textarea name="text" rows="4" required>${escapeHTML(editingNote?.text || "")}</textarea></label><div class="form-actions"><button class="primary-button" type="submit">${editingNote ? "Save changes" : "Save note"}</button>${editingNote ? `<button class="secondary-button" type="button" data-cancel-note-edit>Cancel</button>` : ""}</div></form><h3>Notes for ${escapeHTML(notePatient.name)}</h3>${patientNotes.length ? `<div class="notes-list">${patientNotes.map((note) => `<article class="note-card"><div class="panel-heading"><p class="portal-kicker">${escapeHTML(note.date)}</p><span><button class="table-action" data-edit-note="${escapeHTML(note.id)}">Edit</button><button class="table-action danger" data-delete-note="${escapeHTML(note.id)}">Delete</button></span></div>${renderNursingAssessment(note)}</article>`).join("")}</div>` : `<p class="empty-state">No nursing notes for this patient yet.</p>`}` : `<p class="empty-state">Search and select a patient to add or edit nursing notes.</p>`}</div>`}
			<div class="portal-panel"><h3>Laboratory</h3>${renderPatientSearch("laboratory", activeLaboratoryPatientId)}${laboratoryPatient ? `<p class="field-hint">Reference ranges are general guidance and may vary by laboratory and clinical context, especially for dialysis patients. Confirm results with the reporting laboratory and care team.</p><form id="laboratory-form" class="form-grid"><label>Date<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><div class="full-width">${renderLaboratoryGroups(laboratoryPatient, [], true)}</div><label class="full-width">Additional notes<textarea name="notes" rows="2"></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save laboratory result</button></div></form><h3>Laboratory results for ${escapeHTML(laboratoryPatient.name)}</h3>${renderLaboratoryRecords(laboratoryRecords, laboratoryPatient)}` : `<p class="empty-state">Search and select a patient to add laboratory results.</p>`}</div>
			<div class="portal-panel"><h3>Dietary &amp; Nutrition Counseling</h3>${renderPatientSearch("dietary", activeDietaryPatientId)}${dietaryPatient ? `<form id="dietary-form" class="form-grid"><label>Counseling topic<select name="topic" required><option value="">Choose a counseling topic</option>${DIETARY_COUNSELING_TOPICS.map((topic) => `<option value="${escapeHTML(topic)}">${escapeHTML(topic)}</option>`).join("")}</select></label><label>Date<input name="date" type="date" value="${new Date().toISOString().slice(0, 10)}" required></label><label class="full-width">Counseling notes and recommendations<textarea name="counseling" rows="4" required></textarea></label><div class="form-actions"><button class="primary-button" type="submit">Save counseling</button></div></form><h3>Counseling records for ${escapeHTML(dietaryPatient.name)}</h3>${dietaryRecords.length ? `<div class="notes-list">${dietaryRecords.map((record) => `<article class="note-card"><p class="portal-kicker">${escapeHTML(record.date)}</p><h4>${escapeHTML(record.topic)}</h4><p>${escapeHTML(record.counseling)}</p></article>`).join("")}</div>` : `<p class="empty-state">No dietary and nutrition counseling records for this patient yet.</p>`}` : `<p class="empty-state">Search and select a patient to add dietary and nutrition counseling.</p>`}</div>
			<div class="portal-panel"><div class="panel-heading"><h3>Patient directory (${store.patients.length})</h3></div>${patientTable(store.patients)}</div>`;
	}

	function renderAdminBilling(editBill = null) {
		const bill = editBill || {};
		if (bill.patientId) activeBillingPatientId = bill.patientId;
		const billingPatient = store.patients.find((patient) => patient.id === activeBillingPatientId);
		const visibleBills = activeBillingPatientId
			? store.bills.filter((entry) => entry.patientId === activeBillingPatientId)
			: store.bills;
		const patientMaterialUsage = billingPatient ? store.materialUsage.filter((entry) => entry.patientId === billingPatient.id) : [];
		const materialOptions = (store.equipmentCatalog || []).flatMap((category) => category.items.map((item) => `<option value="${escapeHTML(item.id)}">${escapeHTML(item.code)} · ${escapeHTML(item.name)} (${escapeHTML(item.unit)})</option>`)).join("");
		const selectedEquipmentIds = new Set((bill.equipmentUsed || []).map((item) => typeof item === "string" ? item : item.id));
		const equipmentChoices = (store.equipmentCatalog || []).flatMap((category) => category.items.map((item) => `<label class="billing-equipment-option"><input type="checkbox" name="equipmentUsed" value="${escapeHTML(item.id)}" data-price="${Number(item.priceMin) || 0}" ${selectedEquipmentIds.has(item.id) ? "checked" : ""}><span>${escapeHTML(item.code)} · ${escapeHTML(item.name)} <small>${escapeHTML(item.unit)}</small><br><strong>${item.priceMin === item.priceMax ? formatMoney(item.priceMin) : `${formatMoney(item.priceMin)} – ${formatMoney(item.priceMax)}`}${item.openEnded ? "+" : ""}</strong></span></label>`)).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">PAYMENTS</p><h2>Billing</h2></div><span class="demo-chip">DEMO ONLY · NO REAL PAYMENTS</span></div>
			<div class="portal-panel"><h3>${bill.id ? "Edit bill" : "Add bill"}</h3><form id="admin-bill-form" class="form-grid"><input type="hidden" name="billId" value="${escapeHTML(bill.id || "")}"><label>Patient<select name="patientId" required>${patientOptions(bill.patientId || activeBillingPatientId)}</select></label><label>Description<input value="HEMODIALYSIS" readonly><input type="hidden" name="description" value="HEMODIALYSIS"></label><label>Total amount (PHP)<input type="number" name="amount" min="0" step="0.01" value="${escapeHTML(bill.amount || "")}" required><small class="field-hint">Auto-computed from checked equipment (lowest listed price). You can still adjust it.</small></label><label>Status<select name="status">${["Pending", "Paid", "Overdue"].map((value) => `<option ${bill.status === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>${(() => {
				const isInsurance = String(bill.method || "").startsWith("Health insurance");
				const provider = String(bill.method || "").replace("Health insurance - ", "");
				return `<label>Mode of payment<select name="method">${["Cash", "QR PH", "Bank transfer", "Health insurance"].map((value) => `<option ${(value === "Health insurance" ? isInsurance : bill.method === value) ? "selected" : ""}>${value}</option>`).join("")}</select></label><label id="admin-bill-insurance" ${isInsurance ? "" : "hidden"}>Health insurance<select name="insuranceProvider" ${isInsurance ? "" : "disabled"}>${["YAKAP", "PhilHealth"].map((value) => `<option ${provider === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>`;
			})()}<fieldset class="billing-equipment-fieldset full-width"><legend>Equipment used for this session</legend><div class="billing-equipment-options">${equipmentChoices || `<p class="empty-state">No equipment is available in the catalog.</p>`}</div></fieldset><div class="form-actions"><button class="primary-button" type="submit">${bill.id ? "Save bill" : "Add bill"}</button>${bill.id ? `<button class="secondary-button" type="button" data-cancel-bill-edit>Cancel</button>` : ""}</div></form></div>
			<div class="portal-panel"><label class="message-patient-select">Show bills for<select id="billing-patient-filter"><option value="">All patients</option>${patientOptions(activeBillingPatientId)}</select></label>${billingPatient ? `<button class="secondary-button" type="button" data-download-billing-summary="${escapeHTML(billingPatient.id)}">Download ${escapeHTML(billingPatient.name)} billing summary (PDF)</button><p class="field-hint">The browser print dialog will open; choose “Save as PDF” to download the file.</p><section class="billing-materials"><h3>Materials used for ${escapeHTML(billingPatient.name)}</h3>${materialOptions ? `<form id="material-usage-form" class="form-grid"><label>Material<select name="equipmentItemId" required><option value="">Choose material</option>${materialOptions}</select></label><label>Quantity used<input type="number" name="quantity" min="1" step="1" required></label><label>Date used<input type="date" name="date" value="${new Date().toISOString().slice(0, 10)}" required></label><div class="form-actions"><button class="primary-button" type="submit">Record material use</button></div></form>` : `<p class="empty-state">No materials are available in the equipment catalog.</p>`}${patientMaterialUsage.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Material</th><th>Quantity</th></tr></thead><tbody>${patientMaterialUsage.map((entry) => `<tr><td>${escapeHTML(entry.date)}</td><td>${escapeHTML(entry.code)} · ${escapeHTML(entry.name)}</td><td>${escapeHTML(entry.quantity)} ${escapeHTML(entry.unit)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No materials have been recorded for this patient.</p>`}</section>` : ""}<h3>Patient bills</h3>${renderBillsTable(visibleBills, true)}</div>`;
	}

	function renderEquipment() {
		const categories = store.equipmentCatalog || [];
		const itemRow = (item, category) => {
			const formId = `equipment-form-${item.id}`;
			return `<tr>
				<td><input form="${escapeHTML(formId)}" name="code" value="${escapeHTML(item.code)}" aria-label="Code" required></td>
				<td><input form="${escapeHTML(formId)}" name="name" value="${escapeHTML(item.name)}" aria-label="Item name" required></td>
				<td><input form="${escapeHTML(formId)}" name="purpose" value="${escapeHTML(item.purpose)}" aria-label="Description used"></td>
				<td><input form="${escapeHTML(formId)}" name="quantity" type="number" min="0" step="1" value="${escapeHTML(item.quantity)}" aria-label="Quantity" required></td>
				<td><input form="${escapeHTML(formId)}" name="unit" value="${escapeHTML(item.unit)}" aria-label="Unit" required></td>
				<td><input form="${escapeHTML(formId)}" name="price" type="number" min="0" step="0.01" value="${escapeHTML(item.priceMin ?? 0)}" aria-label="Price (PHP)" required></td>
				<td><form id="${escapeHTML(formId)}" class="equipment-item-form form-actions" data-item-id="${escapeHTML(item.id)}" data-category-id="${escapeHTML(category.id)}"><button class="primary-button" type="submit">Save</button><button class="table-action danger" type="button" data-delete-catalog-item="${escapeHTML(item.id)}">Delete</button></form></td>
			</tr>`;
		};
		const renderCategory = (category) => `<section class="portal-panel equipment-category" data-category-id="${escapeHTML(category.id)}">
			<div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(category.description)}</p><h3>${escapeHTML(category.title)}</h3></div></div>
			${category.items.length ? `<div class="table-wrap"><table class="equipment-table"><thead><tr><th>Code</th><th>Item name</th><th>Description used</th><th>Quantity</th><th>Unit</th><th>Price (PHP)</th><th>Actions</th></tr></thead><tbody>${category.items.map((item) => itemRow(item, category)).join("")}</tbody></table></div>` : `<p class="empty-state">No items in this category.</p>`}
		</section>`;
		const coreMarkup = categories.filter((category) => category.id === "core-equipment").map(renderCategory).join("");
		const consumablesMarkup = categories.filter((category) => category.id !== "core-equipment").map(renderCategory).join("");
		const categoryOptions = categories.map((category) => `<option value="${escapeHTML(category.id)}">${escapeHTML(category.title)}</option>`).join("");
		return `<div class="section-heading"><div>		<p class="portal-kicker">INVENTORY</p><h2>Equipment & Inventory</h2></div></div>
					<p class="muted-copy">Edit item details and quantities. Changes are stored in this browser when saved.</p>
			<div class="section-heading equipment-consumables-heading"><div><p class="portal-kicker">Disposable / single-use items used in each dialysis session</p><h2>Hemodialysis consumables</h2></div></div>
			${consumablesMarkup}
			${coreMarkup}
			<section class="portal-panel"><h3>Add new item</h3><form id="equipment-add-form" class="equipment-item-form equipment-add-form">
				<div class="equipment-item-fields">
					<label>Category<select name="categoryId" required>${categoryOptions}</select></label>
					<label>Code<input name="code" placeholder="e.g. CS-14" required></label>
					<label>Item name<input name="name" required></label>
					<label>Description / use<input name="purpose"></label>
					<label>Quantity<input name="quantity" type="number" min="0" step="1" value="1" required></label>
					<label>Unit<input name="unit" value="unit" required></label>
					<label>Price (PHP)<input name="price" type="number" min="0" step="0.01" value="0" required></label>
				</div>
				<div class="equipment-item-footer"><button class="primary-button" type="submit">Add item</button></div>
			</form></section>`;
	}

	function renderBillsTable(bills, adminView) {
		if (!bills.length) return `<p class="empty-state">No bills recorded.</p>`;
		return `<div class="table-wrap"><table><thead><tr><th>Patient</th><th>Description</th><th>Equipment used</th><th>Amount</th><th>Status</th><th>Mode of payment</th><th>Updated</th>${adminView ? "<th>Actions</th>" : ""}</tr></thead><tbody>${bills.map((bill) => `<tr><td>${escapeHTML(patientName(bill.patientId))}</td><td>${escapeHTML(bill.description || "HEMODIALYSIS")}</td><td>${renderBillEquipmentText(bill)}</td><td>${formatMoney(bill.amount)}</td><td><span class="status-tag ${bill.status === "Paid" ? "success" : "pending"}">${escapeHTML(bill.status)}</span></td><td>${escapeHTML(bill.method || "Cash")}${adminView && bill.requestedMethod ? `<br><span class="status-tag pending">Requested mode: ${escapeHTML(bill.requestedMethod)} · approval needed</span>` : ""}</td><td>${escapeHTML(bill.updatedAt || "")}</td>${adminView ? `<td>${bill.requestedMethod ? `<button class="table-action" data-approve-method="${escapeHTML(bill.id)}">Approve payment mode</button>` : ""}<button class="table-action" data-edit-bill="${escapeHTML(bill.id)}">Edit</button><button class="table-action danger" data-delete-bill="${escapeHTML(bill.id)}">Delete</button></td>` : ""}</tr>`).join("")}</tbody></table></div>`;
	}

	function renderBillEquipmentText(bill) {
		const equipment = Array.isArray(bill.equipmentUsed) ? bill.equipmentUsed : [];
		return equipment.length
			? equipment.map((item) => typeof item === "string" ? item : `${item.code ? `${item.code} · ` : ""}${item.name || "Equipment"}${item.quantity ? ` (${item.quantity} ${item.unit || "unit"})` : ""}`).map(escapeHTML).join("<br>")
			: "Not recorded";
	}

	function renderAdminProfile(title = "Admin Profile") {
		const staffPositions = ["Admin", "Staff/Admin", "Nephrologist", "Doctor", "Dietitian", "Medtech", "Nurse", "Biomedical Technician", "Pharmacy", "Billing", "Receptionist"];
		return `<div class="section-heading"><div><p class="portal-kicker">${title === "My Profile" ? "DOCTOR ACCOUNT" : "ADMIN ACCOUNT"}</p><h2>${escapeHTML(title)}</h2></div></div><div class="portal-panel profile-panel"><div class="profile-photo-wrap">${currentUser.photo ? `<img class="profile-photo" src="${currentUser.photo}" alt="Admin profile photo">` : `<div class="profile-photo placeholder-photo">${escapeHTML(currentUser.name.slice(0, 1))}</div>`}<p>Profile photo</p></div><form id="admin-profile-form" class="form-grid"><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Birthday<input type="date" name="birthday" value="${escapeHTML(currentUser.birthday)}"></label><label>Age<input type="number" min="0" name="age" value="${escapeHTML(currentUser.age)}"></label><label>Gender<select name="gender"><option value="">Choose</option>${["Female", "Male", "Other"].map((value) => `<option ${currentUser.gender === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Position<select name="position">${staffPositions.map((value) => `<option ${currentUser.position === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Home address<input name="address" value="${escapeHTML(currentUser.address)}"></label><label>Education background<input name="education" value="${escapeHTML(currentUser.education)}"></label><label>Employment ID / Medical staff no.<input name="employmentId" value="${escapeHTML(currentUser.employmentId)}"></label><label class="full-width">Profile picture<input id="profile-photo-input" type="file" accept="image/*"><span class="field-hint">Images are stored in this browser only.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save profile</button><button class="secondary-button" type="button" data-clear-profile>		Delete profile info</button></div></form></div>`;
	}

	function renderCredentialsForm() {
		const emailField = role === "admin" || role === "patient"
			? `<label class="full-width">Login email<input name="email" type="email" value="${escapeHTML(currentUser.email)}" autocomplete="email" required></label>`
			: "";
		const instructions = "Enter your current password to change your login email or password.";
		const newPasswordRequirement = " (leave blank to keep your current password)";
		return `<section class="portal-panel"><h3>Login credentials</h3><p class="muted-copy">${instructions}</p><form id="credentials-form" class="form-grid">${emailField}<label class="full-width">Current password<span class="password-input-wrap"><input id="credential-current-password" name="currentPassword" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" data-credential-password-toggle aria-controls="credential-current-password" aria-label="Show password" aria-pressed="false">Show</button></span></label><label class="full-width">New password<span class="muted-copy">${newPasswordRequirement}</span><span class="password-input-wrap"><input id="credential-new-password" name="newPassword" type="password" minlength="8" autocomplete="new-password"><button class="password-toggle" type="button" data-credential-password-toggle aria-controls="credential-new-password" aria-label="Show password" aria-pressed="false">Show</button></span></label><div class="form-actions"><button class="primary-button" type="submit">Update login details</button></div><p class="field-hint" data-credentials-message aria-live="polite"></p></form></section>`;
	}

	function renderNurses(adminView) {
		const teamMembers = store.admins.filter((admin) => admin.id === "admin-01" || (admin.position !== "Admin" && admin.position !== "Staff/Admin"));
		const canEditNurseListing = adminView && currentUser.position === "Nurse";
		const renderTeamMember = (admin) => `<li class="nurse-grid-item" data-nurse-name="${escapeHTML(`${admin.name} ${admin.position}`.toLowerCase())}">${admin.nursePhoto ? `<button class="nurse-photo-button" type="button" data-nurse-photo="${escapeHTML(admin.nursePhoto)}" data-nurse-photo-name="${escapeHTML(admin.name)}" aria-label="View photo of ${escapeHTML(admin.name)}"><img class="nurse-avatar" src="${escapeHTML(admin.nursePhoto)}" alt=""></button>` : `<span class="nurse-avatar nurse-avatar-placeholder" aria-hidden="true">${escapeHTML(admin.name.slice(0, 1))}</span>`}<span class="nurse-name">${escapeHTML(admin.name)}<small>${escapeHTML(admin.position)}</small></span></li>`;
		const groupMarkup = HEALTHCARE_TEAM_GROUPS.map((group) => {
			const roleMarkup = group.roles.map((teamRole) => {
				const preferredOrder = new Map(teamRole.staffIds.map((staffId, index) => [staffId, index]));
				const members = teamMembers
					.filter((member) => member.position === teamRole.position && (teamRole.position !== "Admin" || preferredOrder.has(member.id)))
					.sort((first, second) => (preferredOrder.get(first.id) ?? Number.MAX_SAFE_INTEGER)
						- (preferredOrder.get(second.id) ?? Number.MAX_SAFE_INTEGER)
						|| first.name.localeCompare(second.name, undefined, { sensitivity: "base" }));
				return members.length
					? `<section class="nurse-team-role"><h4>${escapeHTML(teamRole.label)}</h4><ul class="nurse-grid">${members.map(renderTeamMember).join("")}</ul></section>`
					: "";
			}).join("");
			return roleMarkup ? `<section class="nurse-team-group"><h3>${escapeHTML(group.heading)}</h3>${roleMarkup}</section>` : "";
		}).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">CARE TEAM</p><h2>Healthcare Team</h2></div><span class="demo-chip">${teamMembers.length} REGISTERED TEAM MEMBERS</span></div>${canEditNurseListing ? `<form id="nurse-profile-form" class="portal-panel form-grid nurse-editor"><h3 class="full-width">Your nurse listing</h3><label>Full name<input name="name" value="${escapeHTML(currentUser.name)}" required></label><label>Profile picture<input id="nurse-photo-input" type="file" accept="image/*"><span class="field-hint">Separate from your admin profile photo; maximum 500 KB.</span></label><div class="form-actions"><button class="primary-button" type="submit">Save listing</button></div></form>` : ""}<div class="portal-panel"><div class="nurse-directory-toolbar"><h3>Care team directory</h3><label class="nurse-search" for="nurse-search">Search team<input id="nurse-search" type="search" placeholder="Search by name or role"></label></div><div class="nurse-team-groups">${groupMarkup}</div><p id="nurse-search-empty" class="empty-state" ${teamMembers.length ? "hidden" : ""}>No healthcare team members registered yet.</p></div><dialog id="nurse-photo-dialog" class="nurse-photo-dialog" aria-label="Nurse photo preview"><button class="nurse-photo-close" type="button" aria-label="Close photo preview">×</button><img id="nurse-photo-full" alt=""></dialog>`;
	}

	function dayCheckboxes(selectedDays, availableOnly = false) {
		return DAY_NAMES.filter((day) => !availableOnly || store.availableDays.includes(day)).map((day) => `<label class="day-option"><input type="checkbox" name="days" value="${day}" ${selectedDays.includes(day) ? "checked" : ""}><span>${day}</span></label>`).join("");
	}

	function renderAdminSchedule() {
		const selectedPatient = store.patients.find((patient) => patient.id === activeSchedulePatientId) || store.patients[0];
		const accessOptions = DIALYSIS_ACCESS_TYPES.map((access) => `<option value="${escapeHTML(access.id)}" ${selectedPatient?.accessSite === access.id ? "selected" : ""}>${escapeHTML(access.id)}</option>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">CENTER AVAILABILITY</p><h2>Schedule</h2></div></div><div class="portal-panel"><form id="availability-form"><label class="message-patient-select">Patient time record<select id="schedule-patient-select">${patientOptions(activeSchedulePatientId)}</select></label><dl class="profile-details schedule-patient-times"><div><dt>Time in</dt><dd data-schedule-time-in>${escapeHTML(formatTimeWithPeriod(selectedPatient?.timeIn || "Not recorded"))}</dd></div><div><dt>Time out</dt><dd data-schedule-time-out>${escapeHTML(formatTimeWithPeriod(selectedPatient?.timeOut || "Not recorded"))}</dd></div></dl><h3>Available dialysis days</h3><p class="muted-copy">Set the days patients can be assigned to at this center.</p><div class="day-grid">${dayCheckboxes(store.availableDays)}</div><button class="primary-button" type="submit">Save availability</button></form></div><div class="portal-panel"><h3>Patient dialysis schedule</h3><form id="assignment-form" class="form-grid"><input type="hidden" name="patientId" value="${escapeHTML(selectedPatient?.id || "")}"><label>Dialysis access<select name="accessSite" id="schedule-access-select"><option value="">Choose access type</option>${accessOptions}</select></label><label>Time in<input name="timeIn" type="time" value="${escapeHTML(selectedPatient?.timeIn || "")}"></label><label>Time out<input name="timeOut" type="time" value="${escapeHTML(selectedPatient?.timeOut || "")}"></label><div class="full-width"><span class="field-label">Assigned dialysis days</span><div id="assignment-days" class="day-grid">${dayCheckboxes(selectedPatient?.dialysisDays || [], true)}</div></div><button class="primary-button" type="submit">Save patient schedule</button></form><div class="schedule-roster">${store.patients.map((patient) => `<div class="roster-row"><strong>${escapeHTML(patient.name)}</strong><span>${escapeHTML(patient.center || "Center not set")}</span><span>${escapeHTML(patient.accessSite || "Access not set")}</span><span>${(patient.dialysisDays || []).map(escapeHTML).join(", ") || "No days assigned"}</span><span>${escapeHTML(formatTimeWithPeriod(patient.timeIn || "Not recorded"))} - ${escapeHTML(formatTimeWithPeriod(patient.timeOut || "Not recorded"))}</span></div>`).join("")}</div></div>`;
	}

	function renderDoctorAppointmentList() {
		const today = nurseDateKey();
		const requests = store.patientScheduleRequests.filter((request) => !request.linkedAppointmentId);
		const appointments = store.receptionAppointments.map((entry) => ({ ...entry, recordType: "appointment", rowId: `appointment-${entry.id}` }));
		const pendingRequests = requests.map((request) => ({
			...request,
			patientName: request.patientName || patientName(request.patientId),
			type: "Appointment request",
			status: request.status || "Pending",
			recordType: "request",
			rowId: `request-${request.id}`
		}));
		const allRows = [...appointments, ...pendingRequests]
			.filter((entry) => doctorAppointmentView === "upcoming"
				? entry.date >= today && entry.status !== "Cancelled" && entry.status !== "Rejected"
				: entry.date < today || ["Completed", "Cancelled", "Rejected"].includes(entry.status))
			.sort((first, second) => `${first.date} ${first.time || first.startTime || ""}`.localeCompare(`${second.date} ${second.time || second.startTime || ""}`));
		const rows = allRows.map((entry) => {
			const isRequest = entry.recordType === "request";
			const patient = store.patients.find((person) => person.id === entry.patientId);
			const time = isRequest
				? `${formatTimeWithPeriod(entry.startTime || "")}${entry.endTime ? `–${formatTimeWithPeriod(entry.endTime)}` : ""}`
				: formatTimeWithPeriod(entry.time || "");
			const reason = isRequest ? entry.details || "Consultation" : entry.type || "Appointment";
			const action = isRequest && (entry.status || "Pending") === "Pending"
				? `<span class="doctor-appointment-actions"><button class="doctor-action-approve" type="button" data-doctor-approve-request="${escapeHTML(entry.id)}">Approve</button><button class="table-action" type="button" data-doctor-reschedule-request="${escapeHTML(entry.id)}">Reschedule</button></span>`
				: `<button class="table-action" type="button" data-doctor-open-patient="${escapeHTML(entry.patientId)}">View</button>`;
			const statusClass = String(entry.status || "Scheduled").toLowerCase().replace(/[^a-z0-9]+/g, "-");
			const expandedForm = isRequest && activeReschedulingDoctorRequestId === entry.id
				? `<tr class="doctor-reschedule-row"><td colspan="6"><form class="doctor-reschedule-form" data-doctor-reschedule-form="${escapeHTML(entry.id)}"><strong>Reschedule request</strong><label>Date<input type="date" name="date" min="${today}" value="${escapeHTML(entry.date)}" required></label><label>Start time<input type="time" name="startTime" value="${escapeHTML(entry.startTime || "")}" required></label><label>End time<input type="time" name="endTime" value="${escapeHTML(entry.endTime || "")}" required></label><button class="primary-button" type="submit">Save new time</button><button class="secondary-button" type="button" data-cancel-doctor-reschedule>Cancel</button></form></td></tr>`
				: "";
			return `<tr data-doctor-appointment-row data-search="${escapeHTML(`${entry.patientName || patient?.name || ""} ${patient?.patientNumber || ""} ${reason}`.toLowerCase())}" data-status="${escapeHTML(entry.status || "Scheduled")}" data-date="${escapeHTML(entry.date)}"><td><strong>${escapeHTML(entry.patientName || patient?.name || "Unknown patient")}</strong></td><td>${escapeHTML(patient?.patientNumber || entry.patientId || "—")}</td><td>${escapeHTML(entry.date)}<small>${escapeHTML(time)}</small></td><td>${escapeHTML(reason)}</td><td><span class="doctor-status-chip ${statusClass}">${escapeHTML(entry.status || "Scheduled")}</span></td><td>${action}</td></tr>${expandedForm}`;
		}).join("");
		const statusOptions = [...new Set(allRows.map((entry) => entry.status || "Scheduled"))].sort().map((status) => `<option value="${escapeHTML(status)}">${escapeHTML(status)}</option>`).join("");
		const pendingCount = requests.filter((request) => (request.status || "Pending") === "Pending").length;
		return `<section class="portal-panel doctor-appointments-panel"><div class="doctor-appointments-heading"><div><p class="portal-kicker">DOCTOR WORKSPACE</p><h2>Appointments</h2></div><span class="demo-chip">${allRows.length} ${doctorAppointmentView === "upcoming" ? "UPCOMING" : "HISTORY"}${pendingCount ? ` · ${pendingCount} PENDING` : ""}</span></div><div class="doctor-appointment-tabs" role="group" aria-label="Appointment list"><button type="button" data-doctor-appointment-tab="upcoming" aria-pressed="${doctorAppointmentView === "upcoming"}">Upcoming</button><button type="button" data-doctor-appointment-tab="history" aria-pressed="${doctorAppointmentView === "history"}">History</button></div><div class="doctor-appointment-filters"><label class="doctor-appointment-search"><span class="visually-hidden">Search by patient name or ID</span><input type="search" data-doctor-appointment-search placeholder="Search by patient name or ID"></label><label><span class="visually-hidden">Filter by appointment status</span><select data-doctor-appointment-status><option value="">All statuses</option>${statusOptions}</select></label><label><span class="visually-hidden">Filter by date</span><input type="date" data-doctor-appointment-date aria-label="Filter by date"></label></div>${rows ? `<div class="table-wrap"><table class="dietitian-table doctor-appointments-table"><thead><tr><th>Patient Name</th><th>Patient ID</th><th>Date &amp; Time</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div><p class="empty-state" data-doctor-appointments-empty hidden>No appointments match these filters.</p>` : `<p class="empty-state">${doctorAppointmentView === "upcoming" ? "No upcoming appointments or requests." : "No appointment history."}</p>`}</section>`;
	}

	function renderDoctorSchedule() {
		const editing = store.doctorSchedules.find((entry) => entry.id === activeEditingDoctorScheduleId && entry.doctorId === currentUser.id);
		const schedules = store.doctorSchedules
			.filter((entry) => entry.doctorId === currentUser.id)
			.sort((first, second) => `${first.date} ${first.startTime}`.localeCompare(`${second.date} ${second.startTime}`));
		const scheduleCards = schedules.length
			? `<div class="table-wrap"><table class="dietitian-table doctor-availability-table"><thead><tr><th>Date</th><th>Available schedule</th><th>Time</th><th>Location / details</th><th>Action</th></tr></thead><tbody>${schedules.map((entry) => `<tr><td>${escapeHTML(entry.date)}</td><td><strong>${escapeHTML(entry.title)}</strong></td><td>${escapeHTML(formatTimeWithPeriod(entry.startTime))}–${escapeHTML(formatTimeWithPeriod(entry.endTime))}</td><td>${escapeHTML(entry.details || "—")}</td><td><span class="doctor-appointment-actions"><button class="table-action" type="button" data-edit-doctor-schedule="${escapeHTML(entry.id)}">Edit</button><button class="table-action danger" type="button" data-delete-doctor-schedule="${escapeHTML(entry.id)}">Delete</button></span></td></tr>`).join("")}</tbody></table></div>`
			: `<p class="empty-state">No doctor availability has been published yet.</p>`;
		const scheduleForm = doctorScheduleEditorOpen || editing
			? `<form id="doctor-schedule-form" class="form-grid doctor-schedule-editor"><input type="hidden" name="scheduleId" value="${escapeHTML(editing?.id || "")}"><label>Schedule title<input name="title" maxlength="120" value="${escapeHTML(editing?.title || "")}" placeholder="e.g. Nephrology clinic" required></label><label>Date<input name="date" type="date" value="${escapeHTML(editing?.date || new Date().toISOString().slice(0, 10))}" required></label><label>Start time<input name="startTime" type="time" value="${escapeHTML(editing?.startTime || "")}" required></label><label>End time<input name="endTime" type="time" value="${escapeHTML(editing?.endTime || "")}" required></label><label class="full-width">Location / details<input name="details" maxlength="240" value="${escapeHTML(editing?.details || "")}" placeholder="Clinic location or patient information"></label><div class="form-actions"><button class="primary-button" type="submit">${editing ? "Save changes" : "Publish schedule"}</button><button class="secondary-button" type="button" data-cancel-doctor-schedule-edit>Cancel</button></div></form>`
			: "";
		return `${renderDoctorAppointmentList()}<section class="portal-panel doctor-available-schedule" id="doctor-availability"><div class="panel-heading"><div><p class="portal-kicker">DOCTOR AVAILABILITY</p><h3>Doctor’s Available Schedule</h3></div><button class="primary-button" type="button" data-doctor-manage-schedule>${doctorScheduleEditorOpen || editing ? "Close editor" : "Manage Schedule"}</button></div><p class="field-hint">Published availability is visible to patients.</p>${scheduleCards}${scheduleForm}</section>`;
	}

	function renderAdminAnnouncements() {
		announcementPhotoDraft = "";
		announcementPhotoReadId += 1;
		return `<div class="section-heading"><div><p class="portal-kicker">PATIENT UPDATES</p><h2>Announcements</h2></div><span class="demo-chip">ADMIN POSTS · VISIBLE TO ALL PATIENTS</span></div><div class="portal-panel"><h3>Publish an announcement</h3><form id="announcement-form" class="form-grid"><label>Title<input name="title" required></label><label class="full-width">Update<textarea name="body" rows="4" required></textarea></label><label class="full-width">Photo (optional)<input name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif" data-announcement-photo><span class="field-hint">JPG, PNG, WEBP, or GIF · maximum 500 KB</span></label><img class="announcement-image announcement-image-preview" data-announcement-preview alt="Announcement photo preview" hidden><button class="primary-button" type="submit">Publish announcement</button><p class="form-message full-width" data-announcement-message aria-live="polite"></p></form></div>${renderAnnouncementList(store.announcements, true)}`;
	}

	function renderAnnouncementList(announcements, adminView) {
		if (!announcements.length) return `<div class="portal-panel"><p class="empty-state">No announcements yet.</p></div>`;
		return `<div class="announcement-list">${announcements.map((announcement) => `<article class="portal-panel announcement-card"><div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(announcement.date || announcement.createdAt || "")}</p><h3>${escapeHTML(announcement.title)}</h3></div>${adminView ? `<button class="table-action danger" data-delete-announcement="${escapeHTML(announcement.id)}">Delete</button>` : ""}</div><p>${escapeHTML(announcement.body)}</p>${announcement.photo ? `<img class="announcement-image" src="${escapeHTML(announcement.photo)}" alt="Photo for ${escapeHTML(announcement.title)}" loading="lazy">` : ""}<span class="muted-copy">Posted by ${escapeHTML(announcement.author || "DIACORE Admin")}</span></article>`).join("")}</div>`;
	}

	function renderAdminReports() {
		const activityGroups = groupActivities(store.audit);
		const groupedActivity = [...activityGroups].map(([section, entries]) => `<div class="portal-panel"><h3>${getActivitySectionLabel(section)}</h3><ul class="activity-list">${entries.map((entry) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(entry.text)}</strong><small>${escapeHTML(entry.date)}</small></div></li>`).join("")}</ul></div>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">ACTIVITY LOG</p><h2>Reports</h2></div></div><div class="stat-grid"><article class="stat-card"><span>REGISTERED PATIENTS</span><strong>${store.patients.length}</strong></article><article class="stat-card"><span>UPDATES / EVENTS</span><strong>${store.audit.length}</strong></article><article class="stat-card"><span>UNREAD PATIENT NOTIFICATIONS</span><strong>${store.notifications.filter((note) => !note.read).length}</strong></article></div>${groupedActivity || `<div class="portal-panel"><p class="empty-state">No activity recorded.</p></div>`}`;
	}

	function renderAdminNotifications() {
		const patientsWithPendingBills = store.patients.map((patient) => ({
			patient,
			bills: store.bills.filter((bill) => bill.patientId === patient.id && bill.status === "Pending")
		})).filter(({ bills }) => bills.length);
		const scheduleRequests = store.staffNotifications
			.filter((notification) => SCHEDULE_NOTIFICATION_ACCOUNT_IDS.has(currentUser.id) && notification.recipientId === currentUser.id && notification.type === "patient-schedule-request")
			.map((notification) => ({
				notification,
				request: store.patientScheduleRequests.find((request) => request.id === notification.requestId)
			}))
			.filter(({ request }) => request);
		const contactSubmissions = store.staffNotifications
			.filter((notification) => notification.recipientId === currentUser.id && notification.type === "contact-message")
			.map((notification) => ({
				notification,
				message: store.contactMessages.find((entry) => entry.id === notification.contactMessageId)
			}))
			.filter(({ message }) => message);
		const pendingBillCount = patientsWithPendingBills.reduce((count, entry) => count + entry.bills.length, 0);
		const totalBalance = patientsWithPendingBills.reduce((total, entry) => total
			+ entry.bills.reduce((patientTotal, bill) => patientTotal + (Number(bill.amount) || 0), 0), 0);
		const patientNotices = patientsWithPendingBills.map(({ patient, bills }) => {
			const patientBalance = bills.reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
			return `<article class="portal-panel announcement-card"><div class="panel-heading"><div><p class="portal-kicker">${bills.length} PENDING ${bills.length === 1 ? "BILL" : "BILLS"} · BALANCE ${formatMoney(patientBalance)}</p><h3>${escapeHTML(patient.name)}</h3></div></div><ul class="activity-list">${bills.map((bill) => `<li><span class="activity-mark"></span><div><strong>${escapeHTML(bill.description)} · ${formatMoney(bill.amount)}</strong><small>${bill.requestedMethod ? `Payment method requested: ${escapeHTML(bill.requestedMethod)}` : `Updated ${escapeHTML(bill.updatedAt || "date not provided")}`}</small></div></li>`).join("")}</ul></article>`;
		}).join("");
		const scheduleRequestNotices = scheduleRequests.map(({ notification, request }) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">${escapeHTML(notification.date)} · PATIENT APPOINTMENT REQUEST</p><h4>${escapeHTML(request.patientName)}</h4><p><strong>${escapeHTML(request.date)} · ${escapeHTML(formatTimeWithPeriod(request.startTime))}–${escapeHTML(formatTimeWithPeriod(request.endTime))}</strong></p>${request.details ? `<p>${escapeHTML(request.details)}</p>` : ""}</div></article>`).join("");
		const contactMessageNotices = contactSubmissions.map(({ notification, message }) => `<article class="portal-panel announcement-card"><div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(notification.date)} · CONTACT FORM MESSAGE</p><h3>${escapeHTML(message.firstName)} ${escapeHTML(message.lastName)}</h3></div></div><p><strong>Email:</strong> ${escapeHTML(message.email)}<br><strong>Phone:</strong> ${escapeHTML(message.phone)}</p><p>${escapeHTML(message.message).replace(/\n/g, "<br>")}</p></article>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">CARE TEAM &amp; BILLING UPDATES</p><h2>Notifications</h2></div></div>${contactSubmissions.length ? `<div class="portal-panel"><h3>Contact form messages</h3><div class="announcement-list">${contactMessageNotices}</div></div>` : ""}${scheduleRequests.length || SCHEDULE_NOTIFICATION_ACCOUNT_IDS.has(currentUser.id) ? `<div class="portal-panel"><h3>Patient appointment schedule requests</h3><p class="field-hint">Patient-submitted requests are read-only here. They cannot be edited from the admin portal.</p>${scheduleRequestNotices ? `<div class="doctor-schedule-list">${scheduleRequestNotices}</div>` : `<p class="empty-state">No appointment schedule requests yet.</p>`}</div>` : ""}<div class="stat-grid"><article class="stat-card"><span>PENDING BILLS</span><strong>${pendingBillCount}</strong></article><article class="stat-card"><span>TOTAL OUTSTANDING BALANCE</span><strong>${formatMoney(totalBalance)}</strong></article></div>${patientNotices || `<div class="portal-panel"><p class="empty-state">There are no pending patient bills.</p></div>`}`;
	}

	function renderMessages(adminView) {
		if (adminView && !store.patients.some((patient) => patient.id === activeMessagePatientId)) activeMessagePatientId = store.patients[0]?.id;
		const threadMessages = store.messages.filter((message) => message.patientId === activeMessagePatientId);
		return `<div class="section-heading"><div><p class="portal-kicker">CARE TEAM</p><h2>Messages</h2></div></div><div class="portal-panel message-layout">${adminView ? `<label class="message-patient-select">Choose patient<select id="message-patient-select">${patientOptions(activeMessagePatientId)}</select></label>` : ""}<div class="message-thread" id="message-thread">${threadMessages.length ? threadMessages.map((message) => `<div class="message-bubble ${message.senderRole === role ? "mine" : "theirs"}"><span>${escapeHTML(message.senderName)}</span><p>${escapeHTML(message.text)}</p><small>${escapeHTML(message.sentAt)}</small></div>`).join("") : `<p class="empty-state">No messages yet. Start a conversation with the care team.</p>`}</div><form id="message-form" class="message-compose"><label class="visually-hidden" for="message-text">Message</label><textarea id="message-text" name="text" rows="2" placeholder="Write a message" required></textarea><button class="primary-button" type="submit">Send</button></form></div>`;
	}

	function renderPatientView(view) {
		if (view === "announcements") return `<div class="section-heading"><div><p class="portal-kicker">DIACORE UPDATES</p><h2>Announcements</h2></div></div>${renderAnnouncementList(store.announcements, false)}`;
		if (view === "profile") return renderPatientProfile();
		if (view === "settings") return `<div class="section-heading"><div><p class="portal-kicker">ACCOUNT SETTINGS</p><h2>Settings</h2></div></div>${renderCredentialsForm()}`;
		if (view === "nurses") return renderNurses(false);
		if (view === "laboratory") return renderPatientLaboratory();
		if (view === "dietary-nutrition") return renderPatientDietaryCounseling();
		if (view === "schedule") return renderPatientSchedule();
		if (view === "billing") return renderPatientBilling();
		if (view === "notifications") return renderPatientNotifications();
		return renderMessages(false);
	}

	function renderPatientProfile() {
		const assessmentDocuments = currentUser.assessment?.documents || [];
		const patientAssessment = assessmentDocuments.length
			? `<section class="portal-panel"><h3>Dialysis assessment</h3><div class="assessment-document-list">${assessmentDocuments.map((documentation, index) => renderAssessmentDocument(documentation, index)).join("")}</div></section>`
			: "";
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR INFORMATION</p><h2>My Profile</h2></div></div>${renderPatientInformationCard(currentUser, "My patient card")}${patientAssessment}<section class="portal-panel patient-qr-panel"><div><h3>Your patient QR code</h3><p class="muted-copy">This QR code contains your patient number only. Show it to the care team for future record verification.</p><strong>${escapeHTML(currentUser.patientNumber)}</strong></div><div id="patient-qr-code" class="patient-qr-code" data-patient-number="${escapeHTML(currentUser.patientNumber)}" role="img" aria-label="QR code for patient number ${escapeHTML(currentUser.patientNumber)}"></div><p class="field-hint" data-patient-qr-message aria-live="polite"></p></section><p class="field-hint">Your profile information is view-only. Contact an administrator to request changes.</p>`;
	}

	function renderPatientLaboratory() {
		const records = store.laboratory.filter((record) => record.patientId === currentUser.id);
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR CARE RECORD</p><h2>Laboratory</h2></div></div><div class="portal-panel"><p class="field-hint">Reference ranges are general guidance and may vary by laboratory and clinical context, especially for dialysis patients. Confirm results with your care team.</p>${renderLaboratoryGroups(currentUser, records, false)}<h3>Laboratory history</h3>${renderLaboratoryRecords(records, currentUser)}</div>`;
	}

	function renderPatientDietaryCounseling() {
		const records = store.dietaryCounseling.filter((record) => record.patientId === currentUser.id);
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR CARE RECORD</p><h2>Dietary &amp; Nutrition Counseling</h2></div></div>${records.length ? `<div class="notes-list">${records.map((record) => `<article class="portal-panel note-card"><p class="portal-kicker">${escapeHTML(record.date)}</p><h3>${escapeHTML(record.topic)}</h3><p>${escapeHTML(record.counseling)}</p></article>`).join("")}</div>` : `<div class="portal-panel"><p class="empty-state">There are no dietary and nutrition counseling records for your account yet.</p></div>`}`;
	}

	function renderPatientSchedule() {
		const assignedDays = (currentUser.dialysisDays || []).filter((day) => store.availableDays.includes(day));
		const doctorSchedules = [...store.doctorSchedules].sort((first, second) => `${first.date} ${first.startTime}`.localeCompare(`${second.date} ${second.startTime}`));
		const requests = store.patientScheduleRequests
			.filter((request) => request.patientId === currentUser.id)
			.sort((first, second) => `${second.date} ${second.startTime}`.localeCompare(`${first.date} ${first.startTime}`));
		const requestList = requests.length
			? `<div class="doctor-schedule-list">${requests.map((request) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">REQUESTED ${escapeHTML(request.createdAt)}</p><h4>${escapeHTML(request.date)} · ${escapeHTML(formatTimeWithPeriod(request.startTime))}–${escapeHTML(formatTimeWithPeriod(request.endTime))}</h4>${request.details ? `<p>${escapeHTML(request.details)}</p>` : ""}<p class="field-hint">Sent to your doctor and dietitian care team. This request is read-only.</p></div></article>`).join("")}</div>`
			: `<p class="empty-state">You have not submitted an appointment request.</p>`;
		const today = new Date();
		const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR APPOINTMENTS</p><h2>Schedule</h2></div></div><section class="portal-panel patient-dialysis-info"><p class="portal-kicker">YOUR DIALYSIS INFORMATION</p><dl class="profile-details"><div><dt>Dialysis center</dt><dd>${escapeHTML(currentUser.center || "Not assigned")}</dd></div><div><dt>Access type</dt><dd>${escapeHTML(currentUser.accessSite || "Not assigned")}</dd></div><div><dt>Dialysis type</dt><dd>${escapeHTML(currentUser.dialysisType || "Not set")}</dd></div></dl><h3>Your assigned schedule</h3>${assignedDays.length ? `<div class="day-grid patient-day-grid">${assignedDays.map((day) => `<div class="day-option available selected"><span>${escapeHTML(day)}</span><strong>Dialysis session</strong></div>`).join("")}</div>` : `<p class="empty-state">Your dialysis access and schedule have not been assigned yet. Please contact your care team.</p>`}<div class="patient-time-form"><dl class="profile-details"><div><dt>Time in</dt><dd>${escapeHTML(formatTimeWithPeriod(currentUser.timeIn || "Not set"))}</dd></div><div><dt>Time out</dt><dd>${escapeHTML(formatTimeWithPeriod(currentUser.timeOut || "Not set"))}</dd></div></dl></div><p class="field-hint">This information is view-only and is set by your dialysis center.</p></section><section class="portal-panel"><h3>Request an appointment</h3><p class="field-hint">Choose a preferred date and time. Your request will be sent to your doctor and dietitian; it is not a confirmed appointment.</p><form id="patient-schedule-request-form" class="portal-form"><label>Preferred date<input name="date" type="date" min="${minDate}" required></label><div class="form-row"><label>Time in<input name="startTime" type="time" aria-label="Appointment time in" required></label><label>Time out<input name="endTime" type="time" aria-label="Appointment time out" required></label></div><label>Notes (optional)<textarea name="details" rows="3" maxlength="500" placeholder="Add a short note for your care team"></textarea></label><button class="primary-button" type="submit">Send appointment request</button></form></section><section class="portal-panel"><h3>Your appointment requests</h3>${requestList}</section><section class="portal-panel"><h3>Doctor clinic schedule</h3><p class="field-hint">Published by the doctors. This schedule is view-only.</p>${doctorSchedules.length ? `<div class="doctor-schedule-list">${doctorSchedules.map((entry) => `<article class="doctor-schedule-card"><div><p class="portal-kicker">${escapeHTML(entry.date)} · ${escapeHTML(formatTimeWithPeriod(entry.startTime))}–${escapeHTML(formatTimeWithPeriod(entry.endTime))}</p><h4>${escapeHTML(entry.title)}</h4><p class="muted-copy">Dr. ${escapeHTML(entry.doctorName || "DIACORE doctor")}</p>${entry.details ? `<p>${escapeHTML(entry.details)}</p>` : ""}</div></article>`).join("")}</div>` : `<p class="empty-state">No doctor schedules have been published yet.</p>`}</section>`;
	}

	function renderPatientBilling() {
		const bills = store.bills.filter((bill) => bill.patientId === currentUser.id);
		const totalBilled = bills.reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const totalPaid = bills.filter((bill) => bill.status === "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const balance = bills.filter((bill) => bill.status !== "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		return `<div class="section-heading"><div><p class="portal-kicker">YOUR ACCOUNT</p><h2>Billing</h2></div><span class="demo-chip">DEMO · NO REAL PAYMENTS</span></div><section class="portal-panel patient-billing-summary"><div class="panel-heading"><div><p class="portal-kicker">BILLING SUMMARY</p><h3>Summary of your bills</h3></div><button class="secondary-button" type="button" data-download-billing-csv ${bills.length ? "" : "disabled"}>Download spreadsheet (CSV)</button></div><div class="patient-billing-totals"><div><span>Total billed</span><strong>${formatMoney(totalBilled)}</strong></div><div><span>Total paid</span><strong>${formatMoney(totalPaid)}</strong></div><div><span>Outstanding balance</span><strong>${formatMoney(balance)}</strong></div></div><p class="field-hint">This is a read-only summary of bills entered by the care team. The spreadsheet opens in Excel-compatible apps.</p>${bills.length ? `<div class="table-wrap"><table class="patient-billing-table"><thead><tr><th>Date</th><th>Description</th><th>Equipment used</th><th>Amount</th><th>Status</th><th>Payment method</th></tr></thead><tbody>${bills.map((bill) => `<tr><td>${escapeHTML(bill.updatedAt || "Not provided")}</td><td>${escapeHTML(bill.description || "HEMODIALYSIS")}</td><td>${renderBillEquipmentText(bill)}</td><td>${formatMoney(bill.amount)}</td><td><span class="status-tag ${bill.status === "Paid" ? "success" : "pending"}">${escapeHTML(bill.status)}</span></td><td>${escapeHTML(bill.method || "Cash")}${bill.requestedMethod ? `<br><span class="status-tag pending">Requested: ${escapeHTML(bill.requestedMethod)}</span>` : ""}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty-state">No bills are assigned to your account.</p>`}</section>${bills.length ? `<div class="patient-bill-list">${bills.map((bill) => `<article class="portal-panel patient-bill" data-patient-bill>
			<div data-bill-details>
				<div class="panel-heading"><div><p class="portal-kicker">${escapeHTML(bill.updatedAt || "")}</p><h3>${escapeHTML(bill.description || "HEMODIALYSIS")}</h3></div><strong class="bill-amount">${formatMoney(bill.amount)}</strong></div>
				<p><strong>Equipment used:</strong><br>${renderBillEquipmentText(bill)}</p>
				<p>Status: <span class="status-tag ${bill.status === "Paid" ? "success" : "pending"}">${escapeHTML(bill.status)}</span></p>
				<p>Approved mode of payment: <strong>${escapeHTML(bill.method || "Cash")}</strong></p>
				${bill.requestedMethod ? `<p>Requested mode of payment: <strong>${escapeHTML(bill.requestedMethod)}</strong> <span class="status-tag pending">Awaiting admin approval</span></p>` : ""}
				${bill.status !== "Paid" ? `<form class="patient-payment-form" data-bill-id="${escapeHTML(bill.id)}"><label>Mode of payment<select name="method" data-payment-method>${["Cash", "QR PH", "Bank transfer"].map((value) => `<option ${((bill.requestedMethod || bill.method || "Cash") === value) ? "selected" : ""}>${value}</option>`).join("")}</select></label><div class="payment-method-details full-width" data-payment-details="Cash" ${((bill.requestedMethod || bill.method || "Cash") === "Cash") ? "" : "hidden"}><p>Cash payment will be recorded after the care team confirms receipt. No payment is processed by this demo.</p></div><div class="payment-method-details full-width qrph-placeholder" data-payment-details="QR PH" ${((bill.requestedMethod || bill.method || "Cash") === "QR PH") ? "" : "hidden"}><div class="qrph-placeholder-box" role="img" aria-label="QR PH payment code not configured">QR PH<br>QR CODE NOT SET UP</div><p><strong>QR PH payments are not available yet.</strong> The center's official QR PH code has not been provided. Do not send payment using a placeholder.</p></div><div class="payment-method-details full-width" data-payment-details="Bank transfer" ${((bill.requestedMethod || bill.method || "Cash") === "Bank transfer") ? "" : "hidden"}><p class="bank-transfer-notice"><strong>Account name:</strong> Johnrey<br><strong>Bank account:</strong> 999-444-555<br><strong>Bank:</strong> BPI</p><p class="field-hint">This demo does not verify bank transfers. The bill remains pending until the care team confirms the payment.</p></div><button class="secondary-button" type="submit">Request payment method</button></form><a class="secondary-button health-insurance-button" href="health-insurance.html">Health insurance</a>` : `<p class="field-hint">This bill has been paid.</p>`}
				<button class="secondary-button billing-print-button" type="button" data-print-bill="${escapeHTML(bill.id)}">Print / Save as PDF</button>
			</div>
		</article>`).join("")}</div>` : ""}`;
	}

	function renderPatientNotifications() {
		const ownNotifications = store.notifications.filter((note) => note.patientId === currentUser.id).map((note) => ({ ...note, section: note.section || getActivitySection(note.text) }));
		const pendingBills = store.bills.filter((bill) => bill.patientId === currentUser.id && bill.status === "Pending");
		const billNotices = pendingBills.map((bill) => ({ id: `bill-${bill.id}`, section: "billing", text: `You have a pending payment of ${formatMoney(bill.amount)} for ${bill.description}.`, date: bill.updatedAt }));
		const allNotifications = [...ownNotifications, ...billNotices];
		const notificationGroups = [...groupActivities(allNotifications)].map(([section, entries]) => `<div class="portal-panel"><h3>${getActivitySectionLabel(section)}</h3><ul class="activity-list">${entries.map((note) => `<li><span class="activity-mark ${note.read ? "read" : ""}"></span><div><strong>${escapeHTML(note.text)}</strong><small>${escapeHTML(note.date)}</small></div></li>`).join("")}</ul></div>`).join("");
		return `<div class="section-heading"><div><p class="portal-kicker">ACCOUNT ACTIVITY</p><h2>Notifications</h2></div></div>${notificationGroups || `<div class="portal-panel"><p class="empty-state">You're all caught up.</p></div>`}`;
	}

	function bindViewEvents() {
		viewContainer.querySelectorAll("[data-doctor-appointment-tab]").forEach((button) => button.addEventListener("click", () => {
			doctorAppointmentView = button.dataset.doctorAppointmentTab;
			renderView();
		}));
		const filterDoctorAppointments = () => {
			const query = (viewContainer.querySelector("[data-doctor-appointment-search]")?.value || "").trim().toLowerCase();
			const status = viewContainer.querySelector("[data-doctor-appointment-status]")?.value || "";
			const date = viewContainer.querySelector("[data-doctor-appointment-date]")?.value || "";
			let visibleRows = 0;
			viewContainer.querySelectorAll("[data-doctor-appointment-row]").forEach((row) => {
				row.hidden = !row.dataset.search.includes(query)
					|| Boolean(status && row.dataset.status !== status)
					|| Boolean(date && row.dataset.date !== date);
				if (!row.hidden) visibleRows += 1;
				const detailsRow = row.nextElementSibling;
				if (detailsRow?.classList.contains("doctor-reschedule-row")) detailsRow.hidden = row.hidden;
			});
			const emptyState = viewContainer.querySelector("[data-doctor-appointments-empty]");
			if (emptyState) emptyState.hidden = visibleRows > 0;
		};
		viewContainer.querySelector("[data-doctor-appointment-search]")?.addEventListener("input", filterDoctorAppointments);
		viewContainer.querySelector("[data-doctor-appointment-status]")?.addEventListener("change", filterDoctorAppointments);
		viewContainer.querySelector("[data-doctor-appointment-date]")?.addEventListener("change", filterDoctorAppointments);
		viewContainer.querySelectorAll("[data-doctor-approve-request]").forEach((button) => button.addEventListener("click", () => approveDoctorAppointmentRequest(button.dataset.doctorApproveRequest)));
		viewContainer.querySelectorAll("[data-doctor-reschedule-request]").forEach((button) => button.addEventListener("click", () => {
			activeReschedulingDoctorRequestId = button.dataset.doctorRescheduleRequest;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-doctor-reschedule-form]").forEach((form) => form.addEventListener("submit", saveDoctorAppointmentReschedule));
		viewContainer.querySelectorAll("[data-cancel-doctor-reschedule]").forEach((button) => button.addEventListener("click", () => {
			activeReschedulingDoctorRequestId = "";
			renderView();
		}));
		viewContainer.querySelector("[data-doctor-manage-schedule]")?.addEventListener("click", () => {
			const closingEditor = doctorScheduleEditorOpen || Boolean(activeEditingDoctorScheduleId);
			doctorScheduleEditorOpen = !closingEditor;
			if (closingEditor) activeEditingDoctorScheduleId = "";
			renderView();
		});
		viewContainer.querySelector("[data-doctor-patient-search]")?.addEventListener("input", (event) => {
			const query = event.currentTarget.value.trim().toLowerCase();
			let visibleRows = 0;
			viewContainer.querySelectorAll("[data-doctor-patient-row]").forEach((row) => {
				row.hidden = !row.dataset.search.includes(query);
				if (!row.hidden) visibleRows += 1;
			});
			const emptyState = viewContainer.querySelector("[data-doctor-patient-empty]");
			if (emptyState) emptyState.hidden = visibleRows > 0;
		});
		viewContainer.querySelectorAll("[data-doctor-open-patient]").forEach((button) => button.addEventListener("click", () => {
			activeDoctorPatientId = button.dataset.doctorOpenPatient;
			activeView = "my-patients";
			renderView();
		}));
		viewContainer.querySelectorAll("[data-reception-view]").forEach((button) => button.addEventListener("click", () => {
			activeView = button.dataset.receptionView;
			renderView();
		}));
		const receptionDirectorySearch = viewContainer.querySelector("[data-reception-directory-search]");
		if (receptionDirectorySearch) receptionDirectorySearch.addEventListener("input", () => {
			const query = receptionDirectorySearch.value.trim().toLowerCase();
			viewContainer.querySelectorAll("[data-reception-patient-row]").forEach((row) => { row.hidden = !row.dataset.search.includes(query); });
		});
		viewContainer.querySelectorAll("[data-reception-checkin-action]").forEach((select) => select.addEventListener("change", () => applyReceptionCheckInAction(select.dataset.receptionCheckinAction, select.value)));
		const receptionInquiryFilter = viewContainer.querySelector("[data-reception-inquiry-filter]");
		if (receptionInquiryFilter) receptionInquiryFilter.addEventListener("change", () => {
			viewContainer.querySelectorAll("[data-reception-inquiry-row]").forEach((row) => { row.hidden = receptionInquiryFilter.value !== "All" && row.dataset.status !== receptionInquiryFilter.value; });
		});
		viewContainer.querySelectorAll("[data-reception-reply]").forEach((button) => button.addEventListener("click", () => {
			const item = receptionInboxItems()[Number(button.dataset.receptionReply)];
			if (!item) return;
			if (item.ref.read !== undefined) item.ref.read = true;
			else item.ref.readBy = [...new Set([...(item.ref.readBy || []), currentUser.id])];
			if (item.patientId) activeMessagePatientId = item.patientId;
			saveStore(store);
			renderView();
			viewContainer.querySelector("#reception-message-section")?.scrollIntoView({ behavior: "smooth" });
		}));
		const receptionQueueSearch = viewContainer.querySelector("[data-reception-queue-search]");
		if (receptionQueueSearch) receptionQueueSearch.addEventListener("input", () => {
			const query = receptionQueueSearch.value.trim().toLowerCase();
			viewContainer.querySelectorAll("[data-reception-queue-row]").forEach((row) => { row.hidden = !row.dataset.search.includes(query); });
		});
		viewContainer.querySelectorAll("[data-reception-select-patient]").forEach((button) => button.addEventListener("click", () => {
			activeReceptionPatientId = button.dataset.receptionSelectPatient;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-edit-reception-appointment]").forEach((button) => button.addEventListener("click", () => {
			activeEditingReceptionAppointmentId = button.dataset.editReceptionAppointment;
			renderView();
		}));
		viewContainer.querySelector("[data-cancel-reception-appointment-edit]")?.addEventListener("click", () => {
			activeEditingReceptionAppointmentId = "";
			renderView();
		});
		viewContainer.querySelectorAll("[data-reception-inquiry-answered]").forEach((button) => button.addEventListener("click", () => {
			const message = store.contactMessages.find((entry) => entry.id === button.dataset.receptionInquiryAnswered);
			if (!message) return;
			message.status = "Answered";
			message.answeredAt = new Date().toISOString();
			addAudit(store, `Contact inquiry answered by ${currentUser.name}`);
			saveStore(store);
			renderView();
		}));
		[["type", "[data-reception-report-type]"], ["from", "[data-reception-report-from]"], ["to", "[data-reception-report-to]"]].forEach(([key, selector]) => viewContainer.querySelector(selector)?.addEventListener("change", (event) => { receptionReportState[key] = event.target.value; renderView(); }));
		viewContainer.querySelectorAll("[data-staff-record-form]").forEach((form) => form.addEventListener("submit", saveStaffRecord));
		viewContainer.querySelectorAll("[data-staff-record-status]").forEach((select) => select.addEventListener("change", () => {
			const [key, id, field] = select.dataset.staffRecordStatus.split("|");
			const record = (store.staffRecords[key] || []).find((entry) => entry.id === id);
			if (!record) return;
			record[field] = select.value;
			saveStore(store);
			renderView();
		}));
		viewContainer.querySelectorAll("[data-staff-record-delete]").forEach((button) => button.addEventListener("click", () => {
			const [key, id] = button.dataset.staffRecordDelete.split("|");
			store.staffRecords[key] = (store.staffRecords[key] || []).filter((entry) => entry.id !== id);
			saveStore(store);
			renderView();
		}));
		const billingFilter = () => {
			const query = (viewContainer.querySelector("[data-billing-search]")?.value || "").trim().toLowerCase();
			const status = viewContainer.querySelector("[data-billing-status]")?.value || "";
			viewContainer.querySelectorAll("[data-billing-row]").forEach((row) => { row.hidden = !row.dataset.search.includes(query) || Boolean(status && row.dataset.status !== status); });
		};
		viewContainer.querySelector("[data-billing-search]")?.addEventListener("input", billingFilter);
		viewContainer.querySelector("[data-billing-status]")?.addEventListener("change", billingFilter);
		viewContainer.querySelectorAll("[data-billing-detail]").forEach((button) => button.addEventListener("click", () => { billingState.detailId = button.dataset.billingDetail; renderView(); }));
		viewContainer.querySelectorAll("[data-billing-claim-status]").forEach((select) => select.addEventListener("change", () => {
			const claim = store.philhealthClaims.find((entry) => entry.id === select.dataset.billingClaimStatus);
			if (!claim) return;
			claim.status = select.value;
			saveStore(store);
			renderView();
		}));
		viewContainer.querySelector("[data-billing-receipt-type]")?.addEventListener("change", (event) => viewContainer.querySelectorAll("[data-billing-receipt-row]").forEach((row) => { row.hidden = Boolean(event.target.value && row.dataset.type !== event.target.value); }));
		viewContainer.querySelector("[data-billing-export-receipts]")?.addEventListener("click", () => {
			const rows = [["Date", "OR/PR No.", "Patient", "Amount", "Type"], ...store.billingReceipts.map((receipt) => [receipt.date, receipt.number, patientName(receipt.patientId), receipt.amount, receipt.type])];
			const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
			const link = document.createElement("a");
			link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
			link.download = "diacore-receipt-records.csv";
			link.click();
		});
		[["reportType", "[data-billing-report-type]"], ["from", "[data-billing-report-from]"], ["to", "[data-billing-report-to]"]].forEach(([key, selector]) => viewContainer.querySelector(selector)?.addEventListener("change", (event) => { billingState[key] = event.target.value; renderView(); }));
		viewContainer.querySelector("[data-billing-print-report]")?.addEventListener("click", () => window.print());
		viewContainer.querySelector("[data-billing-mark-all]")?.addEventListener("click", () => {
			store.billingNotificationsRead = billingNotificationItems().map((item) => item.id);
			saveStore(store);
			renderView();
		});
		const receptionExportButton = viewContainer.querySelector("[data-reception-export-report]");
		if (receptionExportButton) receptionExportButton.addEventListener("click", downloadReceptionReportPDF);
		const receptionPrintButton = viewContainer.querySelector("[data-reception-print-report]");
		if (receptionPrintButton) receptionPrintButton.addEventListener("click", () => window.print());
		const applyPharmacyInventoryFilters = () => {
			const search = (viewContainer.querySelector("[data-pharmacy-search]")?.value || "").trim().toLowerCase();
			const category = viewContainer.querySelector("[data-pharmacy-category]")?.value || "";
			viewContainer.querySelectorAll("[data-pharmacy-medicine-row]").forEach((row) => {
				row.hidden = !row.dataset.search.includes(search) || Boolean(category && row.dataset.category !== category);
			});
			viewContainer.querySelectorAll(".pharmacy-module-row").forEach((header) => {
				let row = header.nextElementSibling;
				let hasVisibleItems = false;
				while (row && !row.classList.contains("pharmacy-module-row")) {
					if (row.matches("[data-pharmacy-medicine-row]") && !row.hidden) hasVisibleItems = true;
					row = row.nextElementSibling;
				}
				header.hidden = !hasVisibleItems;
			});
		};
		viewContainer.querySelector("[data-pharmacy-search]")?.addEventListener("input", applyPharmacyInventoryFilters);
		viewContainer.querySelector("[data-pharmacy-category]")?.addEventListener("change", applyPharmacyInventoryFilters);
		viewContainer.querySelectorAll("[data-pharmacy-module-edit]").forEach((button) => button.addEventListener("click", () => {
			if (!isPharmacy || activeEditingPharmacyInventoryModule) return;
			activeEditingPharmacyInventoryModule = button.dataset.pharmacyModuleEdit;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-pharmacy-module-save]").forEach((button) => button.addEventListener("click", () => savePharmacyInventoryModule(button.dataset.pharmacyModuleSave)));
		viewContainer.querySelectorAll("[data-pharmacy-module-cancel]").forEach((button) => button.addEventListener("click", () => {
			activeEditingPharmacyInventoryModule = "";
			renderView();
		}));
		const pharmacyExpiryFilter = viewContainer.querySelector("[data-pharmacy-expiry-filter]");
		if (pharmacyExpiryFilter) pharmacyExpiryFilter.addEventListener("change", () => viewContainer.querySelectorAll("[data-pharmacy-batch-row]").forEach((row) => { row.hidden = Boolean(pharmacyExpiryFilter.value && row.dataset.status !== pharmacyExpiryFilter.value); }));
		const applyMedtechRequestFilters = () => {
			const search = (viewContainer.querySelector("[data-medtech-request-search]")?.value || "").trim().toLowerCase();
			const priority = viewContainer.querySelector("[data-medtech-request-priority]")?.value || "";
			const status = viewContainer.querySelector("[data-medtech-request-status]")?.value || "";
			viewContainer.querySelectorAll("[data-medtech-request-row]").forEach((row) => { row.hidden = !row.dataset.search.includes(search) || Boolean(priority && row.dataset.priority !== priority) || Boolean(status && row.dataset.status !== status); });
		};
		["[data-medtech-request-search]", "[data-medtech-request-priority]", "[data-medtech-request-status]"].forEach((selector) => viewContainer.querySelector(selector)?.addEventListener("input", applyMedtechRequestFilters));
		["[data-medtech-request-priority]", "[data-medtech-request-status]"].forEach((selector) => viewContainer.querySelector(selector)?.addEventListener("change", applyMedtechRequestFilters));
		const applyMedtechPendingFilters = () => {
			const priority = viewContainer.querySelector("[data-medtech-pending-priority]")?.value || "";
			const status = viewContainer.querySelector("[data-medtech-pending-status]")?.value || "";
			viewContainer.querySelectorAll("[data-medtech-pending-row]").forEach((row) => { row.hidden = Boolean(priority && row.dataset.priority !== priority) || Boolean(status && row.dataset.status !== status); });
		};
		["[data-medtech-pending-priority]", "[data-medtech-pending-status]"].forEach((selector) => viewContainer.querySelector(selector)?.addEventListener("change", applyMedtechPendingFilters));
		viewContainer.querySelectorAll("[data-medtech-start-request]").forEach((button) => button.addEventListener("click", () => {
			const request = store.medtechRequests.find((entry) => entry.id === button.dataset.medtechStartRequest);
			if (!request || ["Completed", "Pending Verification", "Released", "Rejected"].includes(request.status)) return;
			request.status = "In Progress";
			request.assignedMedtech = currentUser.name;
			addAudit(store, `Laboratory request started: ${request.id} · ${request.testName}`, "laboratory");
			saveStore(store);
			renderView();
		}));
		viewContainer.querySelectorAll("[data-medtech-save-specimen]").forEach((button) => button.addEventListener("click", () => saveMedtechSpecimen(button.dataset.medtechSaveSpecimen)));
		const pharmacyReportTypeSelect = viewContainer.querySelector("[data-pharmacy-report-type]");
		if (pharmacyReportTypeSelect) pharmacyReportTypeSelect.addEventListener("change", () => { pharmacyReportType = pharmacyReportTypeSelect.value; renderView(); });
		viewContainer.querySelector("[data-pharmacy-report-export]")?.addEventListener("click", downloadPharmacyReport);
		viewContainer.querySelector("[data-pharmacy-report-print]")?.addEventListener("click", () => window.print());
		viewContainer.querySelector("[data-medtech-report-print]")?.addEventListener("click", () => window.print());
		viewContainer.querySelector("[data-medtech-report-export]")?.addEventListener("click", downloadMedtechReport);
		const patientQr = viewContainer.querySelector("#patient-qr-code");
		if (patientQr) {
			const message = viewContainer.querySelector("[data-patient-qr-message]");
			if (typeof window.QRCode === "function") {
				new window.QRCode(patientQr, {
					text: patientQr.dataset.patientNumber,
					width: 176,
					height: 176,
					colorDark: "#10283f",
					colorLight: "#ffffff",
					correctLevel: window.QRCode.CorrectLevel.M
				});
			} else if (message) {
				message.textContent = "QR code could not be loaded. Check your internet connection and reload this page.";
			}
		}
		viewContainer.querySelectorAll("[data-credential-password-toggle]").forEach((button) => button.addEventListener("click", () => {
			const passwordInput = document.getElementById(button.getAttribute("aria-controls"));
			const showPassword = passwordInput.type === "password";
			passwordInput.type = showPassword ? "text" : "password";
			button.textContent = showPassword ? "Hide" : "Show";
			button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
			button.setAttribute("aria-pressed", String(showPassword));
		}));
		viewContainer.querySelectorAll("[data-go-view]").forEach((button) => button.addEventListener("click", () => {
			activeView = button.dataset.goView;
			renderView();
		}));
		const dashboardPatientSearch = viewContainer.querySelector("#dashboard-patient-search");
		if (dashboardPatientSearch) dashboardPatientSearch.addEventListener("input", (event) => {
			dashboardPatientQuery = event.currentTarget.value.trim().toLowerCase();
			const rows = [...viewContainer.querySelectorAll("[data-patient-search]")];
			let visibleCount = 0;
			rows.forEach((row) => {
				const isMatch = row.dataset.patientSearch.includes(dashboardPatientQuery);
				row.hidden = !isMatch;
				if (isMatch) visibleCount += 1;
			});
			viewContainer.querySelector("[data-dashboard-search-empty]").hidden = visibleCount > 0 || rows.length === 0;
		});
		viewContainer.querySelectorAll("[data-view-patient-record]").forEach((button) => button.addEventListener("click", () => {
			activeRecordPatientId = button.dataset.viewPatientRecord;
			activeView = "patient-record";
			renderView();
		}));
		viewContainer.querySelectorAll("[data-view-patient-billing]").forEach((button) => button.addEventListener("click", () => {
			activeBillingPatientId = button.dataset.viewPatientBilling;
			activeView = "billing";
			renderView();
		}));
		viewContainer.querySelectorAll("[data-patient-search-input]").forEach((input) => input.addEventListener("input", () => {
			const searchId = input.dataset.patientSearchInput;
			const results = viewContainer.querySelector(`#${searchId}-patient-results`);
			const query = input.value.trim().toLowerCase();
			if (!query) {
				results.hidden = true;
				input.setAttribute("aria-expanded", "false");
				return;
			}
			const matches = store.patients.filter((patient) => String(patient.name || "").toLowerCase().includes(query));
			results.innerHTML = matches.length
				? matches.map((patient) => `<li role="presentation"><button type="button" role="option" data-select-search-patient="${searchId}" data-patient-id="${escapeHTML(patient.id)}">${escapeHTML(patient.name)} <small>${escapeHTML(patient.patientNumber || "")}</small></button></li>`).join("")
				: `<li class="patient-search-empty" role="option">No patients found.</li>`;
			results.hidden = false;
			input.setAttribute("aria-expanded", "true");
			results.querySelectorAll("[data-select-search-patient]").forEach((button) => button.addEventListener("click", () => {
				const patientId = button.dataset.patientId;
				switch (button.dataset.selectSearchPatient) {
					case "assessment":
						activeAssessmentPatientId = patientId;
						break;
					case "note":
						activeNotePatientId = patientId;
						activeEditingNoteId = "";
						break;
					case "prescription":
						activePrescriptionPatientId = patientId;
						break;
					case "laboratory":
						activeLaboratoryPatientId = patientId;
						break;
					case "dietary":
						activeDietaryPatientId = patientId;
						break;
					case "overview":
						activeOverviewPatientId = patientId;
						break;
					default:
						return;
				}
				renderView();
			}));
		}));
		const overviewSearchButton = viewContainer.querySelector("[data-overview-search]");
		if (overviewSearchButton) overviewSearchButton.addEventListener("click", () => {
			const query = viewContainer.querySelector("#overview-patient-search").value.trim().toLowerCase();
			const match = query && store.patients.find((patient) => String(patient.name || "").toLowerCase() === query)
				|| store.patients.find((patient) => [patient.name, patient.patientNumber].join(" ").toLowerCase().includes(query));
			if (!query || !match) {
				window.alert(query ? "No patient found." : "Type a patient name first.");
				return;
			}
			activeOverviewPatientId = match.id;
			renderView();
		});
		const overviewClearButton = viewContainer.querySelector("[data-overview-clear]");
		if (overviewClearButton) overviewClearButton.addEventListener("click", () => {
			activeOverviewPatientId = "";
			renderView();
		});
		const addAssessmentDocumentButton = viewContainer.querySelector("[data-add-assessment-document]");
		if (addAssessmentDocumentButton) addAssessmentDocumentButton.addEventListener("click", () => {
			const documentList = viewContainer.querySelector("#assessment-document-list");
			const index = documentList.querySelectorAll("[data-assessment-document]").length;
			documentList.insertAdjacentHTML("beforeend", renderAssessmentDocument({}, index, true));
		});
		viewContainer.querySelectorAll("[data-back-to-dashboard]").forEach((button) => button.addEventListener("click", () => {
			activeView = "dashboard";
			renderView();
		}));

		const formHandlers = {
			"admin-profile-form": saveAdminProfile,
			"reception-registration-form": savePatient,
			"reception-contact-form": saveReceptionContact,
			"reception-appointment-form": saveReceptionAppointment,
			"reception-inquiry-form": saveReceptionInquiry,
			"reception-profile-form": saveReceptionistProfile,
			"billing-payment-form": saveBillingPayment,
			"billing-claim-form": saveBillingClaim,
			"reception-preferences-form": saveReceptionistPreferences,
			"dietitian-profile-form": saveDietitianProfile,
			"credentials-form": updateCredentials,
			"nurse-profile-form": saveNurseProfile,
			"nurse-own-profile-form": saveNurseOwnProfile,
			"nurse-preferences-form": saveNursePreferences,
			"nurse-mar-form": saveNurseMedicationAdministration,
			"nurse-care-plan-form": saveNurseCarePlan,
			"nurse-assessment-form": saveNurseAssessment,
			"nurse-monitoring-form": saveNurseTreatmentMonitoring,
			"nurse-lab-followup-form": saveNurseLaboratoryFollowUp,
			"nurse-note-form": saveNurseNote,
			"nurse-endorsement-form": saveNurseEndorsement,
			"equipment-add-form": addCatalogEquipmentItem,
			"admin-patient-form": savePatient,
			"material-usage-form": saveMaterialUsage,
			"nursing-note-form": saveNursingNote,
			"laboratory-form": saveLaboratoryRecord,
			"dietary-form": saveDietaryCounseling,
			"dietitian-assessment-form": saveDietitianAssessment,
			"diet-plan-form": saveDietPlan,
			"dietitian-counseling-form": saveDietitianCounseling,
			"dietitian-followup-form": saveDietitianFollowUp,
			"dietitian-education-form": saveDietitianEducation,
			"pharmacy-stock-form": savePharmacyStock,
			"pharmacy-medicine-form": savePharmacyMedicine,
			"pharmacy-supplier-form": savePharmacySupplier,
			"pharmacy-profile-form": savePharmacyProfile,
			"pharmacy-preferences-form": savePharmacyPreferences,
			"medtech-result-form": saveMedtechResult,
			"medtech-profile-form": saveMedtechProfile,
			"assessment-form": saveAssessment,
			"admin-bill-form": saveBill,
			"availability-form": saveAvailability,
			"assignment-form": saveAssignment,
			"doctor-schedule-form": saveDoctorSchedule,
			"patient-schedule-request-form": submitPatientScheduleRequest,
			"announcement-form": saveAnnouncement,
			"prescription-form": savePrescription,
			"message-form": sendMessage
		};
		Object.entries(formHandlers).forEach(([id, handler]) => {
			const form = document.querySelector(`#${id}`);
			if (form) form.addEventListener("submit", handler);
		});
		viewContainer.querySelectorAll("[data-dispense-order]").forEach((form) => form.addEventListener("submit", dispensePharmacyOrder));
		viewContainer.querySelectorAll("[data-undo-dispense-order]").forEach((button) => button.addEventListener("click", undoDispensePharmacyOrder));
		viewContainer.querySelectorAll("[data-dietitian-patient]").forEach((select) => select.addEventListener("change", () => {
			activeDietaryPatientId = select.value;
			activeEditingDietPlanId = "";
			renderView();
		}));
		const dietitianPatientSearch = viewContainer.querySelector("[data-dietitian-patient-search]");
		if (dietitianPatientSearch) dietitianPatientSearch.addEventListener("input", () => {
			const query = dietitianPatientSearch.value.trim().toLowerCase();
			let matches = 0;
			viewContainer.querySelectorAll("[data-dietitian-patient-row]").forEach((row) => {
				row.hidden = !row.dataset.patientSearch.includes(query);
				if (!row.hidden) matches += 1;
			});
			viewContainer.querySelector("[data-dietitian-patient-empty]").hidden = matches > 0;
		});
		viewContainer.querySelectorAll("[data-open-dietitian-patient]").forEach((button) => button.addEventListener("click", () => {
			activeDietaryPatientId = button.dataset.openDietitianPatient;
			activeView = button.dataset.openDietitianView || "nutrition-assessment";
			renderView();
		}));
		viewContainer.querySelectorAll("[data-dietitian-view]").forEach((button) => button.addEventListener("click", () => {
			activeView = button.dataset.dietitianView;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-edit-diet-plan]").forEach((button) => button.addEventListener("click", () => {
			activeEditingDietPlanId = button.dataset.editDietPlan;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-cancel-diet-plan-edit]").forEach((button) => button.addEventListener("click", () => {
			activeEditingDietPlanId = "";
			renderView();
		}));
		viewContainer.querySelectorAll("[data-delete-diet-plan]").forEach((button) => button.addEventListener("click", () => {
			const plan = store.dietPlans.find((entry) => entry.id === button.dataset.deleteDietPlan);
			if (!plan || !window.confirm("Delete this diet plan?")) return;
			store.dietPlans = store.dietPlans.filter((entry) => entry.id !== plan.id);
			addAudit(store, `Diet plan deleted for ${patientName(plan.patientId)}`, "dietary-nutrition");
			saveStore(store);
			renderView();
		}));
		viewContainer.querySelectorAll("[data-followup-status]").forEach((select) => select.addEventListener("change", () => {
			const followUp = store.nutritionFollowUps.find((entry) => entry.id === select.dataset.followupStatus);
			if (!followUp) return;
			followUp.status = select.value;
			saveStore(store);
		}));
		const dietitianDocumentEditor = viewContainer.querySelector("[data-dietitian-document-editor]");
		if (dietitianDocumentEditor) dietitianDocumentEditor.addEventListener("input", () => {
			viewContainer.querySelector("[data-dietitian-document-status]").textContent = "Unsaved changes.";
		});
		viewContainer.querySelectorAll("[data-download-dietitian-document]").forEach((button) => button.addEventListener("click", downloadDietitianEducation));
		viewContainer.querySelectorAll("[data-print-education], [data-print-report]").forEach((button) => button.addEventListener("click", () => window.print()));
		const reportFilter = viewContainer.querySelector("[data-dietitian-report-filter]");
		if (reportFilter) reportFilter.addEventListener("change", (event) => {
			if (event.target.name === "fromDate") dietitianReportFrom = event.target.value;
			if (event.target.name === "toDate") dietitianReportTo = event.target.value;
			if (event.target.name === "reportType") dietitianReportType = event.target.value;
			if (event.target.name !== "patientId") renderView();
		});
		viewContainer.querySelectorAll("[data-nurse-session-status-form]").forEach((form) => form.addEventListener("submit", saveNurseDialysisSessionStatus));
		viewContainer.querySelectorAll("[data-nurse-delete-session]").forEach((button) => button.addEventListener("click", () => {
			deleteNurseDialysisSession(button.dataset.nurseDeleteSession, button.dataset.patientId, button.dataset.sessionDate);
		}));
		viewContainer.querySelectorAll("[data-nurse-patient-form] select[name='patientId']").forEach((select) => select.addEventListener("change", () => {
			activeNursePatientId = select.value;
			activeNurseRecordEdit = null;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-nurse-mar-date]").forEach((input) => input.addEventListener("change", () => {
			if (!input.value) return;
			activeNurseMARDate = input.value;
			if (activeNurseRecordEdit?.collection === "medicationAdministrations") activeNurseRecordEdit = null;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-nurse-edit-record]").forEach((button) => button.addEventListener("click", () => {
			const collection = button.dataset.nurseRecordCollection;
			const allowedCollections = ["medicationAdministrations", "nursingCarePlans", "nursingAssessments", "treatmentMonitoring", "laboratoryFollowUps", "notes", "patientEndorsements"];
			if (!isNurse || !allowedCollections.includes(collection)) return;
			activeNurseRecordEdit = { collection, id: button.dataset.nurseEditRecord };
			renderView();
		}));
		viewContainer.querySelectorAll("[data-nurse-delete-record]").forEach((button) => button.addEventListener("click", () => {
			deleteNurseRecord(button.dataset.nurseRecordCollection, button.dataset.nurseDeleteRecord);
		}));
		viewContainer.querySelectorAll("[data-nurse-cancel-record-edit]").forEach((button) => button.addEventListener("click", () => {
			activeNurseRecordEdit = null;
			renderView();
		}));
		const nursePatientFilter = viewContainer.querySelector("[data-nurse-patient-filter]");
		if (nursePatientFilter) nursePatientFilter.addEventListener("input", () => {
			const query = nursePatientFilter.value.trim().toLowerCase();
			const rows = [...viewContainer.querySelectorAll("[data-nurse-patient-row]")];
			let matches = 0;
			rows.forEach((row) => {
				row.hidden = !row.dataset.patientSearch.includes(query);
				if (!row.hidden) matches += 1;
			});
			viewContainer.querySelector("[data-nurse-patient-empty]").hidden = matches > 0;
		});
		viewContainer.querySelectorAll("[data-nurse-open-assessment]").forEach((button) => button.addEventListener("click", () => {
			activeNursePatientId = button.dataset.nurseOpenAssessment;
			activeView = "nursing-assessment";
			renderView();
		}));
		const nurseOwnPhotoInput = viewContainer.querySelector("#nurse-own-photo-input");
		if (nurseOwnPhotoInput) nurseOwnPhotoInput.addEventListener("change", readNurseOwnProfilePhoto);
		viewContainer.querySelectorAll("[data-edit-doctor-schedule]").forEach((button) => button.addEventListener("click", () => {
			const entry = store.doctorSchedules.find((schedule) => schedule.id === button.dataset.editDoctorSchedule && schedule.doctorId === currentUser.id);
			if (!entry) return;
			activeEditingDoctorScheduleId = entry.id;
			doctorScheduleEditorOpen = true;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-delete-doctor-schedule]").forEach((button) => button.addEventListener("click", () => deleteDoctorSchedule(button.dataset.deleteDoctorSchedule)));
		const cancelDoctorScheduleEdit = viewContainer.querySelector("[data-cancel-doctor-schedule-edit]");
		if (cancelDoctorScheduleEdit) cancelDoctorScheduleEdit.addEventListener("click", () => {
			activeEditingDoctorScheduleId = "";
			doctorScheduleEditorOpen = false;
			renderView();
		});
		const prescriptionTypeSelect = viewContainer.querySelector("[data-prescription-type]");
		if (prescriptionTypeSelect) prescriptionTypeSelect.addEventListener("change", updatePrescriptionForm);
		const vaccineSelect = viewContainer.querySelector("#prescription-form [name='vaccine']");
		if (vaccineSelect) vaccineSelect.addEventListener("change", updatePrescriptionVaccineOptions);
		viewContainer.querySelectorAll("[data-delete-prescription]").forEach((button) => button.addEventListener("click", () => deletePrescription(button.dataset.deletePrescription)));
		const announcementPhotoInput = viewContainer.querySelector("[data-announcement-photo]");
		if (announcementPhotoInput) announcementPhotoInput.addEventListener("change", () => {
			const file = announcementPhotoInput.files?.[0];
			const preview = viewContainer.querySelector("[data-announcement-preview]");
			const message = viewContainer.querySelector("[data-announcement-message]");
			const submitButton = viewContainer.querySelector("#announcement-form button[type='submit']");
			const readId = ++announcementPhotoReadId;
			announcementPhotoDraft = "";
			preview.hidden = true;
			preview.removeAttribute("src");
			message.textContent = "";
			if (!file) {
				submitButton.disabled = false;
				return;
			}
			if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
				message.textContent = "Choose a JPG, PNG, WEBP, or GIF image.";
				announcementPhotoInput.value = "";
				submitButton.disabled = false;
				return;
			}
			if (file.size > 500000) {
				message.textContent = "Please choose an image smaller than 500 KB.";
				announcementPhotoInput.value = "";
				submitButton.disabled = false;
				return;
			}
			submitButton.disabled = true;
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				if (readId !== announcementPhotoReadId) return;
				if (typeof reader.result !== "string") {
					message.textContent = "The selected image could not be read. Please try another image.";
					submitButton.disabled = false;
					return;
				}
				announcementPhotoDraft = reader.result;
				preview.src = announcementPhotoDraft;
				preview.hidden = false;
				submitButton.disabled = false;
			});
			reader.addEventListener("error", () => {
				if (readId !== announcementPhotoReadId) return;
				message.textContent = "The selected image could not be read. Please try another image.";
				announcementPhotoInput.value = "";
				submitButton.disabled = false;
			});
			reader.readAsDataURL(file);
		});
		const billMethodSelect = viewContainer.querySelector("#admin-bill-form select[name='method']");
		const billAmountInput = viewContainer.querySelector("#admin-bill-form input[name='amount']");
		viewContainer.querySelectorAll("#admin-bill-form input[name='equipmentUsed']").forEach((checkbox) => checkbox.addEventListener("change", () => {
			const total = [...viewContainer.querySelectorAll("#admin-bill-form input[name='equipmentUsed']:checked")]
				.reduce((sum, input) => sum + (Number(input.dataset.price) || 0), 0);
			billAmountInput.value = total.toFixed(2);
		}));
		const billInsuranceLabel = viewContainer.querySelector("#admin-bill-insurance");
		if (billMethodSelect && billInsuranceLabel) {
			billMethodSelect.addEventListener("change", () => {
				const isInsurance = billMethodSelect.value === "Health insurance";
				billInsuranceLabel.hidden = !isInsurance;
				billInsuranceLabel.querySelector("select").disabled = !isInsurance;
			});
		}
		const laboratoryForm = viewContainer.querySelector("#laboratory-form");
		const laboratoryPatient = store.patients.find((patient) => patient.id === activeLaboratoryPatientId);
		if (laboratoryForm && laboratoryPatient) {
			laboratoryForm.addEventListener("input", () => updateLaboratoryEntryPreview(laboratoryForm, laboratoryPatient));
			laboratoryForm.addEventListener("change", () => updateLaboratoryEntryPreview(laboratoryForm, laboratoryPatient));
		}

		viewContainer.querySelectorAll(".equipment-item-form").forEach((form) => form.addEventListener("input", () => {
			updateEquipmentItemPreview(form);
			updateEquipmentTotals();
		}));
		viewContainer.querySelectorAll(".equipment-item-form:not(#equipment-add-form)").forEach((form) => form.addEventListener("submit", saveCatalogEquipmentItem));
		viewContainer.querySelectorAll("[data-delete-catalog-item]").forEach((button) => button.addEventListener("click", () => deleteCatalogEquipmentItem(button.dataset.deleteCatalogItem)));
		updateEquipmentTotals();

		viewContainer.querySelectorAll(".patient-payment-form").forEach((form) => {
			const methodSelect = form.querySelector("[data-payment-method]");
			methodSelect.addEventListener("change", () => {
				form.querySelectorAll("[data-payment-details]").forEach((details) => {
					details.hidden = details.dataset.paymentDetails !== methodSelect.value;
				});
			});
			form.addEventListener("submit", savePaymentMethod);
		});
		viewContainer.querySelectorAll("[data-print-bill]").forEach((button) => button.addEventListener("click", () => printBillingStatement(button.dataset.printBill)));
		const billingSpreadsheetButton = viewContainer.querySelector("[data-download-billing-csv]");
		if (billingSpreadsheetButton) billingSpreadsheetButton.addEventListener("click", downloadPatientBillingSpreadsheet);
		viewContainer.querySelectorAll("[data-download-billing-summary]").forEach((button) => button.addEventListener("click", () => printPatientBillingSummary(button.dataset.downloadBillingSummary)));
		viewContainer.querySelectorAll(".equipment-edit-form").forEach((form) => form.addEventListener("submit", saveEquipmentItem));
		viewContainer.querySelectorAll(".equipment-use-form").forEach((form) => {
			form.addEventListener("input", updateEquipmentUsageCost);
			form.addEventListener("submit", recordEquipmentUsage);
		});
		viewContainer.querySelectorAll(".equipment-restock-form").forEach((form) => form.addEventListener("submit", restockEquipment));
		viewContainer.querySelectorAll("[data-delete-equipment]").forEach((button) => button.addEventListener("click", () => deleteEquipmentItem(button.dataset.deleteEquipment)));
		viewContainer.querySelectorAll("[data-edit-patient]").forEach((button) => button.addEventListener("click", () => {
			const patient = store.patients.find((entry) => entry.id === button.dataset.editPatient);
			activeProfilePatientId = patient?.id || "";
			viewContainer.innerHTML = renderAdminPatients(patient);
			bindViewEvents();
		}));
		viewContainer.querySelectorAll("[data-delete-patient]").forEach((button) => button.addEventListener("click", () => deletePatient(button.dataset.deletePatient)));
		viewContainer.querySelectorAll("[data-cancel-patient-edit]").forEach((button) => button.addEventListener("click", renderView));
		viewContainer.querySelectorAll("[data-edit-bill]").forEach((button) => button.addEventListener("click", () => {
			const bill = store.bills.find((entry) => entry.id === button.dataset.editBill);
			viewContainer.innerHTML = renderAdminBilling(bill);
			bindViewEvents();
		}));
		const billingPatientFilter = viewContainer.querySelector("#billing-patient-filter");
		if (billingPatientFilter) billingPatientFilter.addEventListener("change", () => {
			activeBillingPatientId = billingPatientFilter.value;
			renderView();
		});
		viewContainer.querySelectorAll("[data-delete-bill]").forEach((button) => button.addEventListener("click", () => deleteBill(button.dataset.deleteBill)));
		viewContainer.querySelectorAll("[data-approve-method]").forEach((button) => button.addEventListener("click", () => approvePaymentMethod(button.dataset.approveMethod)));
		viewContainer.querySelectorAll("[data-cancel-bill-edit]").forEach((button) => button.addEventListener("click", renderView));
		viewContainer.querySelectorAll("[data-delete-announcement]").forEach((button) => button.addEventListener("click", () => deleteAnnouncement(button.dataset.deleteAnnouncement)));
		viewContainer.querySelectorAll("[data-edit-note]").forEach((button) => button.addEventListener("click", () => {
			activeEditingNoteId = button.dataset.editNote;
			renderView();
		}));
		viewContainer.querySelectorAll("[data-delete-note]").forEach((button) => button.addEventListener("click", () => deleteNursingNote(button.dataset.deleteNote)));
		viewContainer.querySelectorAll("[data-cancel-note-edit]").forEach((button) => button.addEventListener("click", () => {
			activeEditingNoteId = "";
			renderView();
		}));
		const patientSelect = document.querySelector("#schedule-patient-select");
		if (patientSelect) patientSelect.addEventListener("change", () => {
			activeSchedulePatientId = patientSelect.value;
			const patient = store.patients.find((entry) => entry.id === activeSchedulePatientId);
			document.querySelector("[data-schedule-time-in]").textContent = formatTimeWithPeriod(patient?.timeIn || "Not recorded");
			document.querySelector("[data-schedule-time-out]").textContent = formatTimeWithPeriod(patient?.timeOut || "Not recorded");
			document.querySelector('#assignment-form [name="timeIn"]').value = patient?.timeIn || "";
			document.querySelector('#assignment-form [name="timeOut"]').value = patient?.timeOut || "";
			document.querySelector('#assignment-form [name="patientId"]').value = patient?.id || "";
			document.querySelector("#assignment-days").innerHTML = dayCheckboxes(patient?.dialysisDays || [], true);
			document.querySelector("#schedule-access-select").value = patient?.accessSite || "";
		});
		const messagePatientSelect = document.querySelector("#message-patient-select");
		if (messagePatientSelect) messagePatientSelect.addEventListener("change", () => {
			activeMessagePatientId = messagePatientSelect.value;
			renderView();
		});
		const photoInput = document.querySelector("#profile-photo-input");
		if (photoInput) photoInput.addEventListener("change", readProfilePhoto);
		const nursePhotoInput = document.querySelector("#nurse-photo-input");
		if (nursePhotoInput) nursePhotoInput.addEventListener("change", readNursePhoto);
		const nurseSearch = document.querySelector("#nurse-search");
		if (nurseSearch) nurseSearch.addEventListener("input", filterNurses);
		const nursePhotoDialog = document.querySelector("#nurse-photo-dialog");
		if (nursePhotoDialog) {
			viewContainer.querySelectorAll("[data-nurse-photo]").forEach((button) => button.addEventListener("click", () => {
				const fullPhoto = nursePhotoDialog.querySelector("#nurse-photo-full");
				fullPhoto.src = button.dataset.nursePhoto;
				fullPhoto.alt = `Photo of ${button.dataset.nursePhotoName}`;
				nursePhotoDialog.showModal();
			}));
			nursePhotoDialog.querySelector(".nurse-photo-close").addEventListener("click", () => nursePhotoDialog.close());
			nursePhotoDialog.addEventListener("click", (event) => {
				if (event.target === nursePhotoDialog) nursePhotoDialog.close();
			});
		}
		const clearProfileButton = document.querySelector("[data-clear-profile]");
		if (clearProfileButton) clearProfileButton.addEventListener("click", clearAdminProfile);
	}

	function readProfilePhoto(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > 500000) {
			window.alert("Please choose a profile image smaller than 500 KB.");
			event.target.value = "";
			return;
		}
		const reader = new FileReader();
		reader.addEventListener("load", () => { profilePhotoDraft = String(reader.result); });
		reader.readAsDataURL(file);
	}

	function saveAdminProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		Object.assign(currentUser, data, { photo: profilePhotoDraft });
		addAudit(store, `Admin profile updated: ${currentUser.name}`);
		saveStore(store);
		renderView();
	}

	function saveDietitianProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		Object.assign(currentUser, {
			name: String(data.name || "").trim(),
			employmentId: String(data.employmentId || "").trim(),
			contactNumber: String(data.contactNumber || "").trim(),
			photo: profilePhotoDraft
		});
		addAudit(store, `Dietitian profile updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function updateCredentials(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form));
		const email = data.email === undefined ? "" : String(data.email).trim().toLowerCase();
		const message = form.querySelector("[data-credentials-message]");
		if (String(data.currentPassword) !== currentUser.password) {
			message.textContent = "Current password is incorrect.";
			return;
		}
		if (email) {
			const emailInUse = [...store.admins, ...store.patients].some((account) => account.id !== currentUser.id && String(account.email || "").toLowerCase() === email);
			if (emailInUse) {
				message.textContent = "That email is already being used by another account.";
				return;
			}
			currentUser.email = email;
		}
		if (data.newPassword) currentUser.password = String(data.newPassword);
		addAudit(store, `${role === "admin" ? "Admin" : "Patient"} login credentials updated`, "profile");
		saveStore(store);
		const emailDisplay = viewContainer.querySelector("[data-profile-email]");
		if (emailDisplay && email) emailDisplay.textContent = email;
		form.elements.currentPassword.value = "";
		form.elements.newPassword.value = "";
		message.textContent = "Login credentials updated.";
	}

	function readNursePhoto(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > 500000) {
			window.alert("Please choose a profile image smaller than 500 KB.");
			event.target.value = "";
			return;
		}
		const reader = new FileReader();
		reader.addEventListener("load", () => { nursePhotoDraft = String(reader.result); });
		reader.readAsDataURL(file);
	}

	function saveNurseProfile(event) {
		event.preventDefault();
		if (role !== "admin") return;
		const name = String(new FormData(event.currentTarget).get("name") || "").trim();
		if (!name) return;
		Object.assign(currentUser, { name, nursePhoto: nursePhotoDraft });
		addAudit(store, `Nurse directory listing updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function getEquipmentFormValues(form) {
		const data = Object.fromEntries(new FormData(form));
		return {
			code: String(data.code || "").trim(),
			name: String(data.name || "").trim(),
			purpose: String(data.purpose || "").trim(),
			quantity: Number(data.quantity),
			unit: String(data.unit || "").trim(),
			priceMin: Number(data.price),
			priceMax: Number(data.price),
			openEnded: false
		};
	}

	function validateEquipmentForm(form, values, itemId = "") {
		if (!values.code || !values.name || !values.unit || !Number.isInteger(values.quantity) || values.quantity < 0 		 || !Number.isFinite(values.priceMin) || values.priceMin < 0) {
					window.alert("Check the item code, name, unit, quantity, and price.");
			return false;
		}
		const duplicateCode = store.equipmentCatalog.some((category) => category.items.some((item) => item.id !== itemId && item.code.toLowerCase() === values.code.toLowerCase()));
		if (duplicateCode) {
			window.alert("That item code is already in use.");
			return false;
		}
		return true;
	}

	function updateEquipmentItemPreview(form) {
		const output = form.querySelector("[data-item-total]");
		if (!output) return;
		output.textContent = formatEquipmentRange(calculateEquipmentAmount(getEquipmentFormValues(form)));
	}

	function updateEquipmentTotals() {
		const coreTotalOutput = viewContainer.querySelector('[data-session-total="core"]');
		const consumablesTotalOutput = viewContainer.querySelector('[data-session-total="consumables"]');
		const allTotalOutput = viewContainer.querySelector('[data-session-total="all"]');
		if (!coreTotalOutput || !consumablesTotalOutput || !allTotalOutput) return;

		const categoryTotals = new Map();
		const groupTotals = {
			core: { minimum: 0, maximum: 0, openEnded: false },
			consumables: { minimum: 0, maximum: 0, openEnded: false }
		};
		viewContainer.querySelectorAll(".equipment-item-form:not(#equipment-add-form)").forEach((form) => {
			const amount = calculateEquipmentAmount(getEquipmentFormValues(form));
			const categoryId = form.dataset.categoryId;
			const group = form.dataset.costGroup;
			if (!categoryTotals.has(categoryId)) categoryTotals.set(categoryId, { minimum: 0, maximum: 0, openEnded: false });
			[categoryTotals.get(categoryId), groupTotals[group]].forEach((totals) => {
				totals.minimum += amount.minimum;
				totals.maximum += amount.maximum;
				totals.openEnded ||= amount.openEnded;
			});
		});
		viewContainer.querySelectorAll(".equipment-category").forEach((category) => {
			const totals = categoryTotals.get(category.dataset.categoryId) || { minimum: 0, maximum: 0, openEnded: false };
			category.querySelector("[data-category-total]").textContent = formatEquipmentRange(totals);
		});
		const allTotals = {
			minimum: groupTotals.core.minimum + groupTotals.consumables.minimum,
			maximum: groupTotals.core.maximum + groupTotals.consumables.maximum,
			openEnded: groupTotals.core.openEnded || groupTotals.consumables.openEnded
		};
		coreTotalOutput.textContent = formatEquipmentRange(groupTotals.core);
		consumablesTotalOutput.textContent = formatEquipmentRange(groupTotals.consumables);
		allTotalOutput.textContent = formatEquipmentRange(allTotals);
	}

	function addCatalogEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const values = getEquipmentFormValues(form);
		if (!validateEquipmentForm(form, values)) return;
		const category = store.equipmentCatalog.find((entry) => entry.id === form.elements.categoryId.value);
		if (!category) return;
		category.items.unshift({ id: makeId("equipment-item"), ...values });
		addAudit(store, `Equipment catalog item added: ${values.code} ${values.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function saveCatalogEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const itemId = form.dataset.itemId;
		const values = getEquipmentFormValues(form);
		if (!validateEquipmentForm(form, values, itemId)) return;
		const category = store.equipmentCatalog.find((entry) => entry.id === form.dataset.categoryId);
		const item = category?.items.find((entry) => entry.id === itemId);
		if (!item) return;
		Object.assign(item, values);
		addAudit(store, `Equipment catalog item updated: ${values.code} ${values.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function deleteCatalogEquipmentItem(itemId) {
		const category = store.equipmentCatalog.find((entry) => entry.items.some((item) => item.id === itemId));
		const item = category?.items.find((entry) => entry.id === itemId);
		if (!category || !item || !window.confirm(`Delete ${item.code} ${item.name} from the catalog?`)) return;
		category.items = category.items.filter((entry) => entry.id !== itemId);
		addAudit(store, `Equipment catalog item deleted: ${item.code} ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function saveEquipmentItem(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		if (!item) return;
		const data = Object.fromEntries(new FormData(form));
		const name = String(data.name || "").trim();
		const unitPrice = Number(data.unitPrice);
		if (!name || !Number.isFinite(unitPrice) || unitPrice < 0) return;
		Object.assign(item, { name, unitPrice });
		addAudit(store, `Equipment item updated: ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function updateEquipmentUsageCost(event) {
		const form = event.currentTarget;
		const quantity = Math.max(0, Number(new FormData(form).get("quantity")) || 0);
		const output = form.querySelector("output");
		output.textContent = formatMoney(quantity * Number(output.dataset.unitPrice));
	}

	function recordEquipmentUsage(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		const quantity = Number(new FormData(form).get("quantity"));
		if (!item || !Number.isInteger(quantity) || quantity <= 0) return;
		if (quantity > item.stock) {
			window.alert(`Only ${item.stock} units of ${item.name} are in stock.`);
			return;
		}
		const cost = quantity * item.unitPrice;
		item.stock -= quantity;
		item.usedQuantity += quantity;
		item.usedCost += cost;
		addAudit(store, `Equipment used: ${quantity} ${item.name} (${formatMoney(cost)})`, "equipment");
		saveStore(store);
		renderView();
	}

	function saveMaterialUsage(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeBillingPatientId);
		const itemId = String(formData.get("equipmentItemId") || "");
		const item = (store.equipmentCatalog || []).flatMap((category) => category.items).find((entry) => entry.id === itemId);
		const quantity = Number(formData.get("quantity"));
		const date = String(formData.get("date") || "");
		if (!patient || !item || !Number.isInteger(quantity) || quantity <= 0 || !date) {
			window.alert("Select a patient and material, then enter a valid quantity and date.");
			return;
		}
		store.materialUsage.unshift({
			id: makeId("material-usage"),
			patientId: patient.id,
			equipmentItemId: item.id,
			code: item.code,
			name: item.name,
			quantity,
			unit: item.unit,
			date
		});
		addAudit(store, `Material use recorded for ${patient.name}: ${quantity} ${item.unit} ${item.name}`, "billing");
		saveStore(store);
		renderView();
	}

	function restockEquipment(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const item = store.equipment.find((entry) => entry.id === form.dataset.equipmentId);
		const quantity = Number(new FormData(form).get("quantity"));
		if (!item || !Number.isInteger(quantity) || quantity <= 0) return;
		item.stock += quantity;
		addAudit(store, `Equipment restocked: ${quantity} ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function deleteEquipmentItem(itemId) {
		const item = store.equipment.find((entry) => entry.id === itemId);
		if (!item || !window.confirm(`Delete ${item.name} from inventory?`)) return;
		store.equipment = store.equipment.filter((entry) => entry.id !== itemId);
		addAudit(store, `Equipment item deleted: ${item.name}`, "equipment");
		saveStore(store);
		renderView();
	}

	function filterNurses(event) {
		const query = event.currentTarget.value.trim().toLowerCase();
		const nurseItems = [...viewContainer.querySelectorAll(".nurse-grid-item")];
		let visibleCount = 0;
		nurseItems.forEach((item) => {
			const matches = item.dataset.nurseName.includes(query);
			item.hidden = !matches;
			if (matches) visibleCount += 1;
		});
		viewContainer.querySelectorAll(".nurse-team-group").forEach((group) => {
			group.hidden = !group.querySelector(".nurse-grid-item:not([hidden])");
		});
		document.querySelector("#nurse-search-empty").hidden = visibleCount > 0;
	}

	function clearAdminProfile() {
		Object.assign(currentUser, { name: currentUser.username, birthday: "", age: "", gender: "", address: "", education: "", employmentId: "", photo: "" });
		profilePhotoDraft = "";
		addAudit(store, `Admin profile cleared: ${currentUser.username}`);
		saveStore(store);
		renderView();
	}

	function saveReceptionContact(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const patient = store.patients.find((entry) => entry.id === data.patientId);
		if (!patient) return;
		const email = String(data.email || "").trim().toLowerCase();
		if (store.patients.some((entry) => entry.id !== patient.id && String(entry.email || "").trim().toLowerCase() === email)) {
			window.alert("That email address is already assigned to another patient.");
			return;
		}
		Object.assign(patient, {
			contactNumber: String(data.contactNumber || "").trim(),
			email,
			address: String(data.address || "").trim()
		});
		addAudit(store, `Receptionist updated permitted contact details for ${patient.name}`);
		saveStore(store);
		renderView();
	}

	function saveReceptionAppointment(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const patient = store.patients.find((entry) => entry.id === data.patientId);
		if (!patient) return;
		const appointmentId = String(data.appointmentId || "");
		if (store.receptionAppointments.some((entry) => entry.id !== appointmentId && entry.patientId === patient.id && entry.date === data.date && entry.time === data.time && entry.status !== "Cancelled")) {
			window.alert("This patient already has an appointment at that time.");
			return;
		}
		if (appointmentId) {
			const appointment = store.receptionAppointments.find((entry) => entry.id === appointmentId);
			if (!appointment) {
				window.alert("This appointment could not be found. Please refresh the appointment list and try again.");
				activeEditingReceptionAppointmentId = "";
				renderView();
				return;
			}
			Object.assign(appointment, {
				patientId: patient.id,
				date: String(data.date || ""),
				time: String(data.time || ""),
				type: String(data.type || "Appointment")
			});
			addAudit(store, `Receptionist updated appointment for ${patient.name}`);
			addNotification(store, patient.id, `Your ${appointment.type.toLowerCase()} is scheduled for ${appointment.date} at ${formatTimeWithPeriod(appointment.time)}.`, "schedule");
			activeEditingReceptionAppointmentId = "";
			saveStore(store);
			renderView();
			return;
		}
		const appointment = {
			id: makeId("reception-appointment"),
			patientId: patient.id,
			date: String(data.date || ""),
			time: String(data.time || ""),
			type: String(data.type || "Appointment"),
			status: "Scheduled",
			queueStatus: "",
			createdAt: new Date().toISOString(),
			createdBy: currentUser.id
		};
		store.receptionAppointments.unshift(appointment);
		addAudit(store, `Receptionist booked ${appointment.type.toLowerCase()} for ${patient.name}`);
		addNotification(store, patient.id, `Your ${appointment.type.toLowerCase()} is scheduled for ${appointment.date} at ${formatTimeWithPeriod(appointment.time)}.`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveReceptionInquiry(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		store.contactMessages.unshift({
			id: makeId("contact-message"),
			firstName: String(data.firstName || "").trim(),
			lastName: String(data.lastName || "").trim(),
			email: String(data.email || "").trim(),
			phone: String(data.phone || "").trim(),
			type: String(data.type || "Other"),
			message: String(data.message || "").trim(),
			status: "Pending",
			createdAt: new Date().toISOString(),
			createdBy: currentUser.id
		});
		addAudit(store, `Receptionist recorded a ${String(data.type || "other").toLowerCase()} inquiry`);
		saveStore(store);
		renderView();
	}

	async function downloadReceptionReportPDF(event) {
		const sheet = viewContainer.querySelector(".reception-report-sheet");
		if (!sheet) return;
		if (typeof window.html2pdf !== "function") {
			window.alert("PDF export is unavailable. Check your connection and try again.");
			return;
		}
		const button = event.currentTarget;
		button.disabled = true;
		button.textContent = "Preparing PDF…";
		try {
			const blob = await window.html2pdf().set({
				margin: [12, 10, 12, 10],
				image: { type: "jpeg", quality: 0.98 },
				html2canvas: { scale: 1.5, useCORS: true, backgroundColor: "#ffffff" },
				jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
				pagebreak: { mode: ["css", "legacy"], avoid: ["tr"] }
			}).from(sheet).toPdf().outputPdf("blob");
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `diacore-${receptionReportState.type.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1000);
		} catch (error) {
			console.error("Could not create the report PDF.", error);
			window.alert("PDF export failed. Please try again.");
		} finally {
			button.disabled = false;
			button.textContent = "Download PDF";
		}
	}


	function saveReceptionistProfile(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const email = String(data.email || "").trim().toLowerCase();
		if ([...store.admins, ...store.patients].some((account) => account.id !== currentUser.id && String(account.email || "").trim().toLowerCase() === email)) {
			window.alert("That email address is already in use.");
			return;
		}
		Object.assign(currentUser, {
			name: String(data.name || "").trim(),
			email,
			contactNumber: String(data.contactNumber || "").trim(),
			photo: profilePhotoDraft
		});
		addAudit(store, `Receptionist profile updated: ${currentUser.name}`);
		saveStore(store);
		renderView();
	}

	function saveReceptionistPreferences(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		currentUser.notificationPreferences = {
			appointments: formData.has("appointments"),
			inquiries: formData.has("inquiries"),
			messages: formData.has("messages")
		};
		addAudit(store, `Receptionist notification preferences updated: ${currentUser.name}`);
		saveStore(store);
		renderView();
	}

	function savePatient(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const existing = store.patients.find((patient) => patient.id === data.patientId);
		if (existing) {
			Object.assign(existing, data);
			activeProfilePatientId = existing.id;
			addAudit(store, `Patient information updated: ${existing.name}`);
			addNotification(store, existing.id, "Your profile information was updated by DIACORE.", "profile");
		} else {
			const patient = { ...data, id: makeId("patient"), patientNumber: nextPatientNumber(store.patients), password: "", dialysisDays: [], registeredAt: new Date().toISOString().slice(0, 10) };
			store.patients.push(patient);
			activeProfilePatientId = patient.id;
			addAudit(store, `Patient record added: ${patient.name}`);
		}
		saveStore(store);
		renderView();
	}

	function saveNursingNote(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const text = String(formData.get("text") || "").trim();
		if (!text) return;
		const patient = store.patients.find((entry) => entry.id === activeNotePatientId);
		if (!patient) return;
		const noteId = String(formData.get("noteId") || "");
		const existingNote = store.notes.find((note) => note.id === noteId && note.patientId === patient.id);
		if (existingNote) {
			Object.assign(existingNote, { before: "", during: "", after: "", text, date: new Date().toISOString().slice(0, 10) });
			addAudit(store, `Nursing note updated for ${patient.name}`);
		} else {
			store.notes.unshift({ id: makeId("note"), patientId: patient.id, date: new Date().toISOString().slice(0, 10), text });
			addAudit(store, `Nursing note added for ${patient.name}`);
		}
		activeEditingNoteId = "";
		saveStore(store);
		renderView();
	}

	function getNursePatient() {
		if (!isNurse) {
			window.alert("This workflow is available only to a nurse account.");
			return null;
		}
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		if (!patient) window.alert("Pumili ng valid na patient record bago mag-save.");
		return patient;
	}

	function deleteNurseRecord(collection, recordId) {
		const allowedCollections = ["medicationAdministrations", "nursingCarePlans", "nursingAssessments", "treatmentMonitoring", "laboratoryFollowUps", "notes", "patientEndorsements"];
		if (!isNurse || !allowedCollections.includes(collection)) return;
		const record = store[collection].find((entry) => entry.id === recordId && entry.patientId === activeNursePatientId);
		const patient = store.patients.find((entry) => entry.id === activeNursePatientId);
		const recordLabel = collection === "medicationAdministrations" ? "medication administration" : "nursing";
		if (!record || !patient || !window.confirm(`Delete this ${recordLabel} record for ${patient.name}?`)) return;
		store[collection] = store[collection].filter((entry) => entry.id !== recordId);
		if (activeNurseRecordEdit?.id === recordId) activeNurseRecordEdit = null;
		addAudit(store, `${collection} record deleted for ${patient.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function deleteNurseDialysisSession(sessionId, patientId, date) {
		const weekday = ["Sunday", ...DAY_NAMES][new Date().getDay()];
		const patient = store.patients.find((entry) => entry.id === patientId);
		const session = store.dialysisSessions.find((entry) => entry.id === sessionId && entry.patientId === patientId && entry.date === date);
		if (!isNurse || !patient || date !== nurseDateKey() || !(patient.dialysisDays || []).includes(weekday) || !session) return;
		if (!window.confirm(`Reset today's treatment status for ${patient.name} to Scheduled?`)) return;
		store.dialysisSessions = store.dialysisSessions.filter((entry) => entry.id !== sessionId);
		addAudit(store, `Dialysis treatment status reset for ${patient.name}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveNurseDialysisSessionStatus(event) {
		event.preventDefault();
		if (!isNurse) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const patient = store.patients.find((entry) => entry.id === data.patientId);
		const today = nurseDateKey();
		const weekday = ["Sunday", ...DAY_NAMES][new Date().getDay()];
		const validStatuses = ["Scheduled", "Checked In", "In Treatment", "Completed", "Cancelled"];
		if (!patient || data.date !== today || !(patient.dialysisDays || []).includes(weekday) || !validStatuses.includes(data.status)) {
			window.alert("Hindi valid ang treatment session o status para i-update.");
			return;
		}
		let session = store.dialysisSessions.find((entry) => entry.patientId === patient.id && entry.date === today);
		if (session) {
			session.status = data.status;
			session.updatedAt = new Date().toISOString();
			session.updatedBy = currentUser.id;
		} else {
			session = {
				id: makeId("dialysis-session"),
				patientId: patient.id,
				date: today,
				status: data.status,
				updatedAt: new Date().toISOString(),
				updatedBy: currentUser.id
			};
			store.dialysisSessions.unshift(session);
		}
		addAudit(store, `Dialysis treatment status updated for ${patient.name}: ${data.status}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveNurseMedicationAdministration(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const order = store.prescriptions.find((entry) => entry.id === data.prescriptionId && entry.patientId === patient.id && String(entry.type).toLowerCase() === "medication");
		const existing = store.medicationAdministrations.find((entry) => entry.id === data.recordId && entry.patientId === patient.id);
		const validHistoricalOrder = existing && existing.prescriptionId === data.prescriptionId;
		if ((!order && !validHistoricalOrder) || !data.administeredAt) {
			window.alert("Pumili ng valid na medication order at administration time.");
			return;
		}
		const selectedOrder = order || existing;
		saveNurseRecord("medicationAdministrations", String(data.recordId || ""), patient, {
			prescriptionId: String(data.prescriptionId),
			product: selectedOrder.product,
			dosage: selectedOrder.dosage,
			route: selectedOrder.route,
			frequency: selectedOrder.frequency || selectedOrder.instructions || "",
			administeredAt: String(data.administeredAt),
			note: String(data.note || "").trim()
		}, `Medication administration for ${patient.name}: ${selectedOrder.product}`);
	}

	function saveNurseCarePlan(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const fields = ["assessment", "diagnosis", "planning", "implementation", "evaluation"];
		if (fields.some((field) => !String(data[field] || "").trim())) {
			window.alert("Kumpletuhin ang bawat bahagi ng ADPIE care plan.");
			return;
		}
		const carePlanData = Object.fromEntries(fields.map((field) => [field, String(data[field]).trim()]));
		saveNurseRecord("nursingCarePlans", String(data.carePlanId || ""), patient, carePlanData, "Nursing care plan");
	}

	function saveNurseAssessment(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const fields = ["vitalSigns", "weight", "edema", "painScore", "fatigue", "lungSounds", "otherFindings"];
		if (!data.observedAt || !fields.some((field) => String(data[field] || "").trim())) {
			window.alert("Maglagay ng oras at kahit isang assessment finding bago mag-save.");
			return;
		}
		saveNurseRecord("nursingAssessments", String(data.recordId || ""), patient, {
			...Object.fromEntries(fields.map((field) => [field, String(data[field] || "").trim()])),
			observedAt: String(data.observedAt),
		}, "Nursing assessment");
	}

	function saveNurseTreatmentMonitoring(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const fields = ["accessType", "bruitThrill", "response", "observations", "complications"];
		if (!data.observedAt || !fields.some((field) => String(data[field] || "").trim())) {
			window.alert("Maglagay ng oras at kahit isang treatment observation bago mag-save.");
			return;
		}
		saveNurseRecord("treatmentMonitoring", String(data.recordId || ""), patient, {
			...Object.fromEntries(fields.map((field) => [field, String(data[field] || "").trim()])),
			observedAt: String(data.observedAt),
		}, "Dialysis treatment monitoring");
	}

	function saveNurseLaboratoryFollowUp(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const allowedStatuses = ["Follow-up documented", "Escalated per protocol", "Care team notified"];
		const note = String(data.note || "").trim();
		const testName = String(data.testName || "").trim();
		const result = store.laboratory.find((entry) => entry.patientId === patient.id && entry.testName === testName);
		if (!testName || !allowedStatuses.includes(data.status) || !note) {
			window.alert("Ilagay ang result o test name, valid na status, at follow-up note.");
			return;
		}
		saveNurseRecord("laboratoryFollowUps", String(data.recordId || ""), patient, {
			laboratoryId: result?.id || "",
			testName,
			status: data.status,
			note
		}, `Laboratory follow-up for ${patient.name}: ${testName}`);
	}

	function saveNurseNote(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const text = String(data.text || "").trim();
		if (!text || !data.createdAt) {
			window.alert("Ilagay ang note at date/time bago mag-save.");
			return;
		}
		saveNurseRecord("notes", String(data.recordId || ""), patient, {
			date: String(data.createdAt).slice(0, 10),
			createdAt: String(data.createdAt),
			text
		}, "Nursing note");
	}

	function saveNurseEndorsement(event) {
		event.preventDefault();
		const patient = getNursePatient();
		if (!patient) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const condition = String(data.condition || "").trim();
		const completedCare = String(data.completedCare || "").trim();
		if (!condition || !completedCare) {
			window.alert("Ilagay ang current condition at completed care bago mag-save.");
			return;
		}
		saveNurseRecord("patientEndorsements", String(data.recordId || ""), patient, {
			shift: String(data.shift || "").trim(),
			condition,
			completedCare,
			pendingTasks: String(data.pendingTasks || "").trim(),
			concerns: String(data.concerns || "").trim()
		}, "Patient endorsement");
	}

	function readNurseOwnProfilePhoto(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/") || file.size > 500000) {
			window.alert("Pumili ng image file na hindi lalampas sa 500 KB.");
			event.target.value = "";
			return;
		}
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			if (typeof reader.result !== "string") {
				window.alert("Hindi mabasa ang napiling profile picture. Subukan muli.");
				return;
			}
			nurseOwnPhotoDraft = reader.result;
		});
		reader.addEventListener("error", () => window.alert("Hindi mabasa ang napiling profile picture. Subukan muli."));
		reader.readAsDataURL(file);
	}

	function saveNurseOwnProfile(event) {
		event.preventDefault();
		if (!isNurse) return;
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const name = String(data.name || "").trim();
		const nurseId = String(data.nurseId || "").trim();
		if (!name) {
			window.alert("Ilagay ang pangalan bago mag-save.");
			return;
		}
		if (!nurseId) {
			window.alert("Ilagay ang Nursing ID bago mag-save.");
			return;
		}
		const previousName = currentUser.name;
		const previousNurseId = String(currentUser.nurseId || currentUser.id);
		const nurseRecordCollections = [
			"medicationAdministrations",
			"nursingCarePlans",
			"nursingAssessments",
			"treatmentMonitoring",
			"laboratoryFollowUps",
			"notes",
			"patientEndorsements"
		];
		nurseRecordCollections.forEach((collection) => {
			if (!Array.isArray(store[collection])) return;
			store[collection].forEach((record) => {
				const belongsToNurse = record.nurseId === currentUser.id
					|| record.nurseId === previousNurseId
					|| (!record.nurseId && record.nurseName === previousName);
				if (!belongsToNurse || record.isSample || record.isNurseMARSample) return;
				record.nurseId = nurseId;
				record.nurseName = name;
			});
		});
		Object.assign(currentUser, { name, nurseId, contactNumber: String(data.contactNumber || "").trim(), photo: nurseOwnPhotoDraft });
		addAudit(store, `Nurse profile updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function saveNursePreferences(event) {
		event.preventDefault();
		if (!isNurse) return;
		const formData = new FormData(event.currentTarget);
		currentUser.notificationPreferences = {
			treatments: formData.has("treatments"),
			documentation: formData.has("documentation"),
			clinicalAlerts: formData.has("clinicalAlerts")
		};
		addAudit(store, `Nurse notification preferences updated: ${currentUser.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function saveLaboratoryRecord(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeLaboratoryPatientId);
		if (!patient) return;
		const notes = String(formData.get("notes") || "").trim();
		const date = String(formData.get("date") || "");
		const entered = LABORATORY_TESTS.map((test) => ({ test, results: String(formData.get(`result-${test.id}`) || "").trim() })).filter((entry) => entry.results);
		if (!entered.length) {
			window.alert("Enter at least one laboratory result.");
			return;
		}
		[...entered].reverse().forEach(({ test, results }) => {
			store.laboratory.unshift({
				id: makeId("laboratory"),
				patientId: patient.id,
				patientGender: patient.gender || "",
				testId: test.id,
				testName: test.name,
				referenceRange: getLaboratoryReference(test.id, patient.gender),
				date,
				results,
				notes
			});
		});
		addAudit(store, `Laboratory results added for ${patient.name}: ${entered.map((entry) => entry.test.name).join(", ")}`, "laboratory");
		saveStore(store);
		renderView();
	}

	function savePrescription(event) {
		event.preventDefault();
		if (!isNephrologist) {
			window.alert("Prescription records are available only to nephrologist accounts.");
			return;
		}
		const patient = store.patients.find((entry) => entry.id === activePrescriptionPatientId);
		if (!patient) return;
		const formData = new FormData(event.currentTarget);
		const type = String(formData.get("recordType") || "");
		const medication = String(formData.get("medication") || "");
		const vaccine = PRESCRIPTION_VACCINES.find((entry) => entry.name === String(formData.get("vaccine") || ""));
		const vaccineOption = String(formData.get("vaccineOption") || "");
		let product = "";
		if (type === "medication" && (PRESCRIPTION_MEDICATIONS.includes(medication) || PRESCRIPTION_PAIN_MEDICATIONS.includes(medication))) {
			product = medication;
		} else if (type === "vaccine" && vaccine && (!vaccine.options.length || vaccine.options.includes(vaccineOption))) {
			product = vaccine.options.length ? `${vaccine.name} (${vaccineOption})` : vaccine.name;
		}
		if (!product) {
			window.alert("Choose a valid medication or vaccine and its required option.");
			return;
		}
		const dosage = String(formData.get("dosage") || "").trim();
		const route = String(formData.get("route") || "").trim();
		const frequency = String(formData.get("frequency") || "").trim();
		const quantity = type === "medication" ? Number(formData.get("quantity")) : 1;
		if (!dosage || !route || (type === "medication" && (!frequency || !Number.isInteger(quantity) || quantity <= 0))) {
			window.alert("Enter the dosage, route, frequency, and prescribed quantity exactly as specified in the clinician's order.");
			return;
		}
		const record = {
			id: makeId("prescription"),
			patientId: patient.id,
			type,
			product,
			dosage,
			route,
			frequency,
			quantity,
			date: String(formData.get("date") || ""),
			instructions: String(formData.get("instructions") || "").trim(),
			provider: currentUser.name,
			providerId: currentUser.id
		};
		store.prescriptions.unshift(record);
		addAudit(store, `${type === "vaccine" ? "Vaccine" : "Medication"} recorded for ${patient.name}: ${product}`, "profile");
		saveStore(store);
		renderView();
	}

	function saveDietaryCounseling(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId);
		if (!patient) return;
		const record = {
			id: makeId("dietary"),
			patientId: patient.id,
			topic: String(formData.get("topic") || "").trim(),
			date: String(formData.get("date") || ""),
			counseling: String(formData.get("counseling") || "").trim()
		};
		store.dietaryCounseling.unshift(record);
		addAudit(store, `Dietary and nutrition counseling added for ${patient.name}`, "dietary-nutrition");
		saveStore(store);
		renderView();
	}

	function saveDietitianAssessment(event) {
		event.preventDefault();
		if (!isDietitian) return;
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId);
		if (!patient) {
			window.alert("Choose a valid patient before saving the nutrition assessment.");
			return;
		}
		const data = Object.fromEntries(formData);
		const height = Number(data.height) || 0;
		const weight = Number(data.weight) || 0;
		const assessment = {
			id: makeId("nutrition-assessment"),
			patientId: patient.id,
			dietitianId: currentUser.id,
			date: String(data.date || ""),
			height: String(data.height || ""),
			weight: String(data.weight || ""),
			dryWeight: String(data.dryWeight || ""),
			bmi: height > 0 && weight > 0 ? (weight / ((height / 100) ** 2)).toFixed(1) : "",
			dietaryIntake: String(data.dietaryIntake || "").trim(),
			appetite: String(data.appetite || "").trim(),
			allergies: String(data.allergies || "").trim(),
			fluidIntake: String(data.fluidIntake || "").trim(),
			labResults: String(data.labResults || "").trim(),
			problems: String(data.problems || "").trim(),
			goals: String(data.goals || "").trim(),
			interventions: String(data.interventions || "").trim(),
			createdAt: new Date().toISOString()
		};
		store.nutritionAssessments.unshift(assessment);
		patient.allergies = assessment.allergies;
		addAudit(store, `Nutrition assessment recorded for ${patient.name}`, "dietary-nutrition");
		saveStore(store);
		renderView();
	}

	function saveDietPlan(event) {
		event.preventDefault();
		if (!isDietitian) return;
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId);
		if (!patient) {
			window.alert("Choose a valid patient before saving a diet plan.");
			return;
		}
		const data = Object.fromEntries(formData);
		const planId = String(data.planId || "");
		const existing = store.dietPlans.find((entry) => entry.id === planId && entry.patientId === patient.id);
		const plan = {
			...(existing || { id: makeId("diet-plan"), patientId: patient.id, createdAt: new Date().toISOString(), dietitianId: currentUser.id }),
			status: String(data.status || "Draft"),
			reviewDate: String(data.reviewDate || ""),
			calories: String(data.calories || "").trim(),
			protein: String(data.protein || "").trim(),
			sodium: String(data.sodium || "").trim(),
			potassium: String(data.potassium || "").trim(),
			phosphorus: String(data.phosphorus || "").trim(),
			fluid: String(data.fluid || "").trim(),
			mealPlan: String(data.mealPlan || "").trim(),
			updatedAt: new Date().toISOString()
		};
		if (existing) Object.assign(existing, plan);
		else store.dietPlans.unshift(plan);
		activeEditingDietPlanId = "";
		addAudit(store, `Diet plan ${existing ? "updated" : "created"} for ${patient.name}`, "dietary-nutrition");
		saveStore(store);
		renderView();
	}

	function saveDietitianCounseling(event) {
		event.preventDefault();
		if (!isDietitian) return;
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === activeDietaryPatientId);
		if (!patient) {
			window.alert("Choose a valid patient before saving a counseling session.");
			return;
		}
		const record = {
			id: makeId("dietary"),
			patientId: patient.id,
			dietitianId: currentUser.id,
			topic: String(formData.get("topic") || "").trim(),
			date: String(formData.get("date") || ""),
			sessionType: String(formData.get("sessionType") || "Initial"),
			counseling: String(formData.get("counseling") || "").trim(),
			alternatives: String(formData.get("alternatives") || "").trim(),
			concerns: String(formData.get("concerns") || "").trim(),
			nextDate: String(formData.get("nextDate") || "")
		};
		if (!record.topic || !record.counseling) return;
		store.dietaryCounseling.unshift(record);
		if (record.nextDate) {
			store.nutritionFollowUps.unshift({
				id: makeId("nutrition-followup"),
				patientId: patient.id,
				dietitianId: currentUser.id,
				date: record.nextDate,
				time: "",
				purpose: "Nutrition counseling follow-up",
				concerns: record.concerns,
				status: "Scheduled",
				createdAt: new Date().toISOString()
			});
		}
		addAudit(store, `Nutrition counseling documented for ${patient.name}`, "dietary-nutrition");
		saveStore(store);
		renderView();
	}

	function saveDietitianFollowUp(event) {
		event.preventDefault();
		if (!isDietitian) return;
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === String(formData.get("patientId") || ""));
		if (!patient) {
			window.alert("Choose a valid patient before scheduling a follow-up.");
			return;
		}
		store.nutritionFollowUps.unshift({
			id: makeId("nutrition-followup"),
			patientId: patient.id,
			dietitianId: currentUser.id,
			date: String(formData.get("date") || ""),
			time: String(formData.get("time") || ""),
			purpose: String(formData.get("purpose") || "").trim(),
			concerns: String(formData.get("concerns") || "").trim(),
			status: "Scheduled",
			createdAt: new Date().toISOString()
		});
		addAudit(store, `Nutrition follow-up scheduled for ${patient.name}`, "dietary-nutrition");
		saveStore(store);
		renderView();
	}

	function saveAssessment(event) {
		event.preventDefault();
		const patient = store.patients.find((entry) => entry.id === activeAssessmentPatientId);
		if (!patient) return;
		const documents = [...event.currentTarget.querySelectorAll("[data-assessment-document]")].map((documentElement) => {
			const documentation = {};
			documentElement.querySelectorAll("[data-assessment-field]").forEach((field) => {
				documentation[field.dataset.assessmentField] = field.value.trim();
			});
			return documentation;
		}).filter((documentation) => Object.entries(documentation).some(([field, value]) => field !== "date" && value));
		if (!documents.length) {
			window.alert("Enter at least one assessment detail before saving.");
			return;
		}
		patient.assessment = {
			...(patient.assessment || {}),
			documents: [...(patient.assessment?.documents || []), ...documents]
		};
		addAudit(store, `Assessment updated for ${patient.name}`, "profile");
		saveStore(store);
		renderView();
	}

	function deleteNursingNote(noteId) {
		const note = store.notes.find((entry) => entry.id === noteId && entry.patientId === activeNotePatientId);
		const patient = store.patients.find((entry) => entry.id === activeNotePatientId);
		if (!note || !patient || !window.confirm("Delete this nursing note? It will also be removed from the patient's notes.")) return;
		store.notes = store.notes.filter((entry) => entry.id !== noteId);
		if (activeEditingNoteId === noteId) activeEditingNoteId = "";
		addAudit(store, `Nursing note deleted for ${patient.name}`);
		saveStore(store);
		renderView();
	}

	function deletePrescription(recordId) {
		if (!isNephrologist) return;
		const record = store.prescriptions.find((entry) => entry.id === recordId && entry.patientId === activePrescriptionPatientId);
		const patient = store.patients.find((entry) => entry.id === activePrescriptionPatientId);
		if (!record || !patient || !window.confirm(`Delete ${record.product} from ${patient.name}'s record?`)) return;
		store.prescriptions = store.prescriptions.filter((entry) => entry.id !== recordId);
		addAudit(store, `${record.type === "vaccine" ? "Vaccine" : "Medication"} record deleted for ${patient.name}: ${record.product}`, "profile");
		saveStore(store);
		renderView();
	}

	function deletePatient(patientId) {
		const patient = store.patients.find((entry) => entry.id === patientId);
		if (!patient || !window.confirm(`Delete ${patient.name} and their demo records?`)) return;
		store.patients = store.patients.filter((entry) => entry.id !== patientId);
		store.notes = store.notes.filter((entry) => entry.patientId !== patientId);
		store.prescriptions = store.prescriptions.filter((entry) => entry.patientId !== patientId);
		store.laboratory = store.laboratory.filter((entry) => entry.patientId !== patientId);
		store.dietaryCounseling = store.dietaryCounseling.filter((entry) => entry.patientId !== patientId);
		store.materialUsage = store.materialUsage.filter((entry) => entry.patientId !== patientId);
		store.bills = store.bills.filter((entry) => entry.patientId !== patientId);
		store.messages = store.messages.filter((entry) => entry.patientId !== patientId);
		store.notifications = store.notifications.filter((entry) => entry.patientId !== patientId);
		addAudit(store, `Patient record deleted: ${patient.name}`);
		saveStore(store);
		renderView();
	}

	function saveBill(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData);
		const selectedEquipmentIds = formData.getAll("equipmentUsed").map(String);
		const equipmentCatalogItems = (store.equipmentCatalog || []).flatMap((category) => category.items);
		const equipmentUsed = selectedEquipmentIds.map((itemId) => equipmentCatalogItems.find((item) => item.id === itemId))
			.filter(Boolean)
			.map((item) => ({ id: item.id, code: item.code, name: item.name, unit: item.unit }));
		const existing = store.bills.find((bill) => bill.id === data.billId);
		const billData = { patientId: data.patientId, description: "HEMODIALYSIS", equipmentUsed, amount: Number(data.amount), status: data.status, method: data.method === "Health insurance" ? `Health insurance - ${data.insuranceProvider}` : data.method, updatedAt: new Date().toISOString().slice(0, 10) };
		if (existing) Object.assign(existing, billData);
		else store.bills.unshift({ ...billData, id: makeId("bill") });
		const patient = store.patients.find((entry) => entry.id === data.patientId);
		addNotification(store, data.patientId, `Your bill was updated by DIACORE: ${formatMoney(data.amount)} (${data.status}).`);
		addAudit(store, `Bill updated for ${patient?.name || "patient"}`);
		saveStore(store);
		renderView();
	}

	function deleteBill(billId) {
		const bill = store.bills.find((entry) => entry.id === billId);
		if (!bill || !window.confirm("Delete this bill?")) return;
		store.bills = store.bills.filter((entry) => entry.id !== billId);
		addNotification(store, bill.patientId, `A bill for ${bill.description} was removed from your account.`);
		addAudit(store, `Bill deleted for ${patientName(bill.patientId)}`);
		saveStore(store);
		renderView();
	}

	function approvePaymentMethod(billId) {
		const bill = store.bills.find((entry) => entry.id === billId && entry.requestedMethod);
		if (!bill) return;
		bill.method = bill.requestedMethod;
		delete bill.requestedMethod;
		bill.updatedAt = new Date().toISOString().slice(0, 10);
		addNotification(store, bill.patientId, `Your requested mode of payment for ${bill.description} was approved: ${bill.method}.`);
		addAudit(store, `Mode of payment ${bill.method} approved for ${patientName(bill.patientId)}`);
		saveStore(store);
		renderView();
	}

	function saveAvailability(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		store.availableDays = formData.getAll("days");
		addAudit(store, `Available schedule updated: ${store.availableDays.join(", ") || "no days"}`);
		store.patients.forEach((patient) => {
			patient.dialysisDays = (patient.dialysisDays || []).filter((day) => store.availableDays.includes(day));
		});
		saveStore(store);
		renderView();
	}

	function submitPatientScheduleRequest(event) {
		event.preventDefault();
		if (role !== "patient") {
			window.alert("Only patients can submit appointment requests.");
			return;
		}
		const form = event.currentTarget;
		const formData = new FormData(form);
		const date = String(formData.get("date") || "");
		const startTime = String(formData.get("startTime") || "");
		const endTime = String(formData.get("endTime") || "");
		const details = String(formData.get("details") || "").trim();
		const today = new Date();
		const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
		if (!date || date < minDate || !startTime || !endTime || endTime <= startTime) {
			window.alert("Enter a valid date and time. The date cannot be in the past, and the end time must be later than the start time.");
			return;
		}
		const request = {
			id: makeId("patient-schedule-request"),
			patientId: currentUser.id,
			patientName: currentUser.name,
			date,
			startTime,
			endTime,
			details,
			createdAt: new Date().toLocaleString()
		};
		store.patientScheduleRequests.unshift(request);
		SCHEDULE_NOTIFICATION_ACCOUNT_IDS.forEach((recipientId) => {
			const recipient = store.admins.find((admin) => admin.id === recipientId);
			if (!recipient) return;
			store.staffNotifications.unshift({
				id: makeId("staff-notification"),
				recipientId,
				requestId: request.id,
				type: "patient-schedule-request",
				text: `${currentUser.name} requested an appointment for ${date}, ${startTime}–${endTime}.`,
				date: request.createdAt,
				read: false
			});
		});
		saveStore(store);
		window.alert("Your appointment request was sent to the doctor and dietitian care team.");
		renderView();
	}

	function saveDoctorSchedule(event) {
		event.preventDefault();
		if (!isDoctor) {
			window.alert("Only doctor accounts can publish doctor schedules.");
			return;
		}
		const formData = new FormData(event.currentTarget);
		const scheduleId = String(formData.get("scheduleId") || "");
		const title = String(formData.get("title") || "").trim();
		const date = String(formData.get("date") || "");
		const startTime = String(formData.get("startTime") || "");
		const endTime = String(formData.get("endTime") || "");
		const details = String(formData.get("details") || "").trim();
		if (!title || !date || !startTime || !endTime || endTime <= startTime) {
			window.alert("Enter a title, date, and valid start and end times. End time must be later than start time.");
			return;
		}
		const existing = scheduleId
			? store.doctorSchedules.find((entry) => entry.id === scheduleId && entry.doctorId === currentUser.id)
			: null;
		if (scheduleId && !existing) {
			window.alert("That schedule could not be found under your doctor account.");
			return;
		}
		const schedule = {
			id: existing?.id || makeId("doctor-schedule"),
			doctorId: currentUser.id,
			doctorName: currentUser.name,
			title,
			date,
			startTime,
			endTime,
			details
		};
		if (existing) {
			Object.assign(existing, schedule);
		} else {
			store.doctorSchedules.push(schedule);
		}
		activeEditingDoctorScheduleId = "";
		addAudit(store, `Doctor schedule ${existing ? "updated" : "published"} by ${currentUser.name}: ${title}`, "schedule");
		saveStore(store);
		renderView();
	}

	function approveDoctorAppointmentRequest(requestId) {
		if (!isDoctor) {
			window.alert("Only doctor accounts can approve appointment requests.");
			return;
		}
		const request = store.patientScheduleRequests.find((entry) => entry.id === requestId && !entry.linkedAppointmentId);
		if (!request || (request.status && request.status !== "Pending")) return;
		const patient = store.patients.find((entry) => entry.id === request.patientId);
		if (!patient) {
			window.alert("The patient for this request could not be found.");
			return;
		}
		const duplicateAppointment = store.receptionAppointments.some((entry) => entry.patientId === request.patientId
			&& entry.date === request.date
			&& entry.time === request.startTime
			&& entry.status !== "Cancelled");
		if (duplicateAppointment) {
			window.alert("This patient already has an appointment at the requested time.");
			return;
		}
		const appointment = {
			id: makeId("appointment"),
			patientId: request.patientId,
			date: request.date,
			time: request.startTime,
			type: "Consultation",
			status: "Scheduled",
			requestId: request.id,
			createdAt: new Date().toISOString(),
			createdBy: currentUser.id
		};
		store.receptionAppointments.unshift(appointment);
		request.status = "Approved";
		request.linkedAppointmentId = appointment.id;
		request.reviewedAt = new Date().toISOString();
		request.reviewedBy = currentUser.id;
		addNotification(store, patient.id, `Your appointment request for ${request.date} at ${formatTimeWithPeriod(request.startTime)} was approved.`);
		addAudit(store, `Doctor approved appointment request for ${patient.name}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveDoctorAppointmentReschedule(event) {
		event.preventDefault();
		if (!isDoctor) {
			window.alert("Only doctor accounts can reschedule appointment requests.");
			return;
		}
		const requestId = event.currentTarget.dataset.doctorRescheduleForm;
		const request = store.patientScheduleRequests.find((entry) => entry.id === requestId && !entry.linkedAppointmentId);
		if (!request || (request.status && request.status !== "Pending")) {
			window.alert("This appointment request is no longer available to reschedule.");
			activeReschedulingDoctorRequestId = "";
			renderView();
			return;
		}
		const data = Object.fromEntries(new FormData(event.currentTarget));
		const date = String(data.date || "");
		const startTime = String(data.startTime || "");
		const endTime = String(data.endTime || "");
		if (!date || date < nurseDateKey() || !startTime || !endTime || endTime <= startTime) {
			window.alert("Choose a date that is not in the past and an end time later than the start time.");
			return;
		}
		const previousDate = request.date;
		const previousStartTime = request.startTime;
		request.date = date;
		request.startTime = startTime;
		request.endTime = endTime;
		request.updatedAt = new Date().toISOString();
		request.rescheduledBy = currentUser.id;
		activeReschedulingDoctorRequestId = "";
		addNotification(store, request.patientId, `Your appointment request was rescheduled from ${previousDate} at ${formatTimeWithPeriod(previousStartTime)} to ${date} at ${formatTimeWithPeriod(startTime)}. Please confirm the updated time with your care team.`);
		addAudit(store, `Doctor rescheduled appointment request for ${patientName(request.patientId)}`, "schedule");
		saveStore(store);
		renderView();
	}

	function deleteDoctorSchedule(scheduleId) {
		if (!isDoctor) return;
		const schedule = store.doctorSchedules.find((entry) => entry.id === scheduleId && entry.doctorId === currentUser.id);
		if (!schedule || !window.confirm(`Delete "${schedule.title}" from your published schedule?`)) return;
		store.doctorSchedules = store.doctorSchedules.filter((entry) => entry.id !== scheduleId);
		if (activeEditingDoctorScheduleId === scheduleId) activeEditingDoctorScheduleId = "";
		addAudit(store, `Doctor schedule deleted by ${currentUser.name}: ${schedule.title}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveAssignment(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const patient = store.patients.find((entry) => entry.id === formData.get("patientId"));
		if (!patient) return;
		patient.accessSite = String(formData.get("accessSite") || "");
		patient.timeIn = String(formData.get("timeIn") || "");
		patient.timeOut = String(formData.get("timeOut") || "");
		patient.dialysisDays = formData.getAll("days").filter((day) => store.availableDays.includes(day));
		addNotification(store, patient.id, `Your dialysis access and schedule were updated: ${patient.accessSite || "access not set"}; ${patient.dialysisDays.join(", ") || "no days assigned"}; time ${patient.timeIn || "not set"} - ${patient.timeOut || "not set"}.`, "schedule");
		addAudit(store, `Dialysis access and schedule updated for ${patient.name}`, "schedule");
		saveStore(store);
		renderView();
	}

	function saveAnnouncement(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = Object.fromEntries(new FormData(form));
		const photoInput = form.querySelector("[data-announcement-photo]");
		const message = form.querySelector("[data-announcement-message]");
		if (photoInput.files?.length && !announcementPhotoDraft) {
			message.textContent = "Wait for the photo preview to finish loading before publishing.";
			return;
		}
		const announcement = { id: makeId("announcement"), title: String(data.title).trim(), body: String(data.body).trim(), photo: announcementPhotoDraft, createdAt: new Date().toISOString().slice(0, 10), author: currentUser.name };
		const previousAnnouncements = store.announcements;
		const previousNotifications = store.notifications;
		const previousAudit = store.audit;
		store.announcements = [announcement, ...store.announcements];
		store.notifications = [...store.notifications];
		store.audit = [...store.audit];
		store.patients.forEach((patient) => addNotification(store, patient.id, `New announcement: ${announcement.title}`));
		addAudit(store, `Announcement posted: ${announcement.title}`);
		try {
			saveStore(store);
		} catch (error) {
			store.announcements = previousAnnouncements;
			store.notifications = previousNotifications;
			store.audit = previousAudit;
			console.error("Announcement could not be saved", error);
			message.textContent = "The announcement could not be saved. The browser may be out of storage space; try a smaller photo.";
			return;
		}
		announcementPhotoDraft = "";
		announcementPhotoReadId += 1;
		renderView();
	}

	function deleteAnnouncement(announcementId) {
		const announcement = store.announcements.find((entry) => entry.id === announcementId);
		if (!announcement || !window.confirm("Delete this announcement?")) return;
		store.announcements = store.announcements.filter((entry) => entry.id !== announcementId);
		addAudit(store, `Announcement deleted: ${announcement.title}`);
		saveStore(store);
		renderView();
	}

	function sendMessage(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const text = String(formData.get("text")).trim();
		if (!text || !activeMessagePatientId) return;
		store.messages.push({ id: makeId("message"), patientId: activeMessagePatientId, senderId: currentUser.id, senderRole: role, senderName: currentUser.name, text, sentAt: new Date().toLocaleString() });
		if (role === "admin") addNotification(store, activeMessagePatientId, `New message from ${currentUser.name}.`);
		addAudit(store, `Message sent ${role === "admin" ? `to ${patientName(activeMessagePatientId)}` : `by ${currentUser.name}`}`);
		saveStore(store);
		renderView();
	}

	function printBillingStatement(billId) {
		const bill = store.bills.find((entry) => entry.id === billId && entry.patientId === currentUser.id);
		if (!bill) return;

		const personalInfo = [
			["Patient name", currentUser.name],
			["Email", currentUser.email],
			["Birthday", currentUser.birthday],
			["Age", currentUser.age],
			["Gender", currentUser.gender],
			["Address", currentUser.address],
			["Dialysis type", currentUser.dialysisType],
			["Center", currentUser.center]
		].map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value || "Not provided")}</dd></div>`).join("");
		const printWindow = window.open("", "_blank", "width=850,height=900");
		if (!printWindow) {
			window.alert("Allow pop-ups for this site to print or save your billing statement as PDF.");
			return;
		}

		printWindow.opener = null;
		printWindow.addEventListener("load", () => {
			printWindow.focus();
			printWindow.print();
		}, { once: true });
		printWindow.document.write(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Billing statement - ${escapeHTML(currentUser.name)}</title>
				<style>
					@page { size: A4; margin: 18mm; }
					* { box-sizing: border-box; }
					body { margin: 0; color: #17324a; font: 14px/1.5 Arial, sans-serif; }
					main { max-width: 760px; margin: 0 auto; }
					header { padding-bottom: 18px; border-bottom: 2px solid #168f99; }
					.brand { color: #10283f; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
					h1 { margin: 24px 0 4px; color: #10283f; font-size: 28px; }
					.reference, .generated { color: #647a8c; font-size: 11px; }
					h2 { margin: 25px 0 10px; padding-bottom: 7px; border-bottom: 1px solid #dce5eb; color: #087f89; font-size: 13px; text-transform: uppercase; }
					dl { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
					dl div { padding: 9px 0; border-bottom: 1px solid #edf1f3; }
					dt { color: #708697; font-size: 10px; }
					dd { margin: 3px 0 0; color: #17324a; font-weight: 600; overflow-wrap: anywhere; }
					.amount { margin: 18px 0; padding: 16px; background: #f3f7f9; color: #10283f; font-size: 19px; font-weight: 700; }
					.generated { margin-top: 25px; padding-top: 12px; border-top: 1px solid #dce5eb; }
					@media screen { body { padding: 32px 20px; background: #f3f7f9; } main { padding: 32px; background: #fff; } }
					@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
				</style>
			</head>
			<body>
				<main>
					<header><div class="brand">DIACORE DIALYSIS CENTER</div><h1>Billing statement</h1><div class="reference">Statement reference: ${escapeHTML(bill.id)}</div></header>
					<h2>Patient information</h2>
					<dl>${personalInfo}</dl>
					<h2>Bill details</h2>
					<dl>
						<div><dt>Description</dt><dd>${escapeHTML(bill.description || "HEMODIALYSIS")}</dd></div>
						<div><dt>Status</dt><dd>${escapeHTML(bill.status)}</dd></div>
						<div><dt>Mode of payment</dt><dd>${escapeHTML(bill.method || "Cash")}</dd></div>
						<div><dt>Last updated</dt><dd>${escapeHTML(bill.updatedAt || "Not provided")}</dd></div>
					</dl>
					<h2>Equipment used for this session</h2>
					<p>${renderBillEquipmentText(bill)}</p>
					<div class="amount">Amount due: ${escapeHTML(formatMoney(bill.amount))}</div>
					<p class="generated">Generated ${escapeHTML(new Date().toLocaleString())}. Demo billing statement for personal reference; not an official receipt.</p>
				</main>
			</body>
			</html>`);
		printWindow.document.close();
	}

	function downloadPatientBillingSpreadsheet() {
		if (role !== "patient" || !currentUser?.id) return;
		const patientBills = store.bills.filter((bill) => bill.patientId === currentUser.id);
		if (!patientBills.length) {
			window.alert("There are no bills to download.");
			return;
		}
		const totalBilled = patientBills.reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const totalPaid = patientBills.filter((bill) => bill.status === "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const balance = patientBills.filter((bill) => bill.status !== "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const csvCell = (value) => {
			let text = String(value ?? "");
			if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
			return `"${text.replace(/"/g, '""')}"`;
		};
		const rows = [
			["DIACORE Dialysis Center — Patient Billing Summary"],
			["Patient", currentUser.name],
			["Patient number", currentUser.patientNumber || "Not assigned"],
			[],
			["Date", "Description", "Equipment used", "Amount (PHP)", "Status", "Approved payment method", "Requested payment method"],
			...patientBills.map((bill) => [
				bill.updatedAt || "",
				bill.description || "HEMODIALYSIS",
				(Array.isArray(bill.equipmentUsed) ? bill.equipmentUsed : []).map((item) => typeof item === "string" ? item : `${item.code ? `${item.code} · ` : ""}${item.name || "Equipment"}`).join("; ") || "Not recorded",
				Number(bill.amount) || 0,
				bill.status || "",
				bill.method || "Cash",
				bill.requestedMethod || ""
			]),
			[],
			["Total billed (PHP)", totalBilled],
			["Total paid (PHP)", totalPaid],
			["Outstanding balance (PHP)", balance],
			[],
			["Read-only export. Contact the care team about any billing questions."]
		];
		const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const downloadUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");
		const safePatientNumber = String(currentUser.patientNumber || "patient").replace(/[^a-zA-Z0-9-]/g, "");
		link.href = downloadUrl;
		link.download = `diacore-billing-${safePatientNumber}.csv`;
		document.body.append(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
	}

	function printPatientBillingSummary(patientId) {
		if (role !== "admin") return;
		const patient = store.patients.find((entry) => entry.id === patientId);
		if (!patient) {
			window.alert("The selected patient record could not be found.");
			return;
		}
		const bills = store.bills.filter((bill) => bill.patientId === patient.id);
		const materialUsage = store.materialUsage.filter((entry) => entry.patientId === patient.id);
		const totalBilled = bills.reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const totalPaid = bills.filter((bill) => bill.status === "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const balance = bills.filter((bill) => bill.status !== "Paid").reduce((total, bill) => total + (Number(bill.amount) || 0), 0);
		const billRows = bills.length
			? bills.map((bill) => `<tr><td>${escapeHTML(bill.updatedAt || "Not provided")}</td><td>${escapeHTML(bill.description || "HEMODIALYSIS")}</td><td>${escapeHTML((Array.isArray(bill.equipmentUsed) ? bill.equipmentUsed : []).map((item) => typeof item === "string" ? item : `${item.code ? `${item.code} · ` : ""}${item.name || "Equipment"}`).join(", ") || "Not recorded")}</td><td>${escapeHTML(bill.status)}</td><td>${escapeHTML(bill.method || "Cash")}</td><td>${escapeHTML(formatMoney(bill.amount))}</td></tr>`).join("")
			: `<tr><td colspan="6">No bills recorded.</td></tr>`;
		const materialRows = materialUsage.length
			? materialUsage.map((entry) => `<tr><td>${escapeHTML(entry.date || "Not provided")}</td><td>${escapeHTML(entry.code)} · ${escapeHTML(entry.name)}</td><td>${escapeHTML(entry.quantity)} ${escapeHTML(entry.unit)}</td></tr>`).join("")
			: `<tr><td colspan="3">No materials recorded for this patient.</td></tr>`;
		const printWindow = window.open("", "_blank", "width=900,height=900");
		if (!printWindow) {
			window.alert("Allow pop-ups for this site to download the billing summary as PDF.");
			return;
		}
		printWindow.opener = null;
		printWindow.addEventListener("load", () => {
			printWindow.focus();
			printWindow.print();
		}, { once: true });
		printWindow.document.write(`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${escapeHTML(patient.name)} - DIACORE Billing Summary</title>
				<style>
					@page { size: A4; margin: 16mm; }
					* { box-sizing: border-box; }
					body { margin: 0; color: #17324a; font: 12px/1.5 Arial, sans-serif; }
					main { max-width: 850px; margin: 0 auto; }
					header { padding-bottom: 16px; border-bottom: 2px solid #168f99; }
					.brand { color: #10283f; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
					.brand-row { display: flex; align-items: center; gap: 12px; }
					.logo { width: 56px; height: 56px; object-fit: contain; }
					h1 { margin: 20px 0 4px; color: #10283f; font-size: 25px; }
					h2 { margin: 24px 0 8px; padding-bottom: 6px; border-bottom: 1px solid #dce5eb; color: #087f89; font-size: 13px; text-transform: uppercase; }
					.patient-meta, .totals { color: #647a8c; font-size: 11px; }
					table { width: 100%; border-collapse: collapse; }
					th, td { padding: 8px 7px; border-bottom: 1px solid #e5ecef; text-align: left; vertical-align: top; }
					th { background: #f3f7f9; color: #536d7f; font-size: 10px; text-transform: uppercase; }
					.totals { margin-top: 16px; padding: 12px; background: #f3f7f9; display: flex; justify-content: space-between; gap: 12px; }
					.totals strong { color: #10283f; }
					.note { margin-top: 10px; color: #647a8c; font-size: 10px; }
					@media screen { body { padding: 28px 20px; background: #f3f7f9; } main { padding: 28px; background: #fff; } }
					@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
				</style>
			</head>
			<body><main>
				<header><div class="brand-row"><img class="logo" src="${escapeHTML(new URL("asset/logo.png", window.location.href).href)}" alt=""><div class="brand">DIACORE DIALYSIS CENTER</div></div><h1>Patient billing summary</h1><div class="patient-meta">${escapeHTML(patient.name)} · Patient no. ${escapeHTML(patient.patientNumber || "Not assigned")} · ${escapeHTML(patient.center || "Center not assigned")}</div></header>
				<h2>Billing records</h2>
				<table><thead><tr><th>Date</th><th>Description</th><th>Equipment used</th><th>Status</th><th>Payment method</th><th>Amount</th></tr></thead><tbody>${billRows}</tbody></table>
				<div class="totals"><span>Total billed: <strong>${escapeHTML(formatMoney(totalBilled))}</strong></span><span>Total paid: <strong>${escapeHTML(formatMoney(totalPaid))}</strong></span><span>Balance: <strong>${escapeHTML(formatMoney(balance))}</strong></span></div>
				<h2>Materials used</h2>
				<table><thead><tr><th>Date used</th><th>Material</th><th>Quantity</th></tr></thead><tbody>${materialRows}</tbody></table>
				<p class="note">Material quantities are recorded for reference and are not separately priced in this summary. Generated ${escapeHTML(new Date().toLocaleString())}. Demo summary; not an official receipt.</p>
			</main></body></html>`);
		printWindow.document.close();
	}

	function savePaymentMethod(event) {
		event.preventDefault();
		const billId = event.currentTarget.dataset.billId;
		const bill = store.bills.find((entry) => entry.id === billId && entry.patientId === currentUser.id && entry.status !== "Paid");
		if (!bill) return;
		const method = String(new FormData(event.currentTarget).get("method") || "");
		if (!["Cash", "QR PH", "Bank transfer"].includes(method)) {
			window.alert("Choose Cash, QR PH, or Bank transfer.");
			return;
		}
		bill.requestedMethod = method;
		bill.paymentMethodRequestedAt = new Date().toISOString().slice(0, 10);
		addNotification(store, currentUser.id, `Your request to use ${method} as your mode of payment for ${bill.description} was sent to the admin for approval. No payment was processed.`, "billing");
		addAudit(store, `${method} mode of payment requested by ${currentUser.name}`, "billing");
		saveStore(store);
		renderView();
	}

	renderView();
}
