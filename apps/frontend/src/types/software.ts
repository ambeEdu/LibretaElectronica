export interface CalibrationRange {
  nombre: string;
  min: number | string;
  max: number | string;
}

export const softwarePorFamilia: Record<string, string[]> = {
  GP: ["2.3.4", "2.1.14", "5.1.1"],
  VP: ["1.4.9"],
  CC: ["4.1.8", "4.3.6", "4.3.9", "4.1.4", "5.0.20"],
  "GH.ENT.PK.TIVA": ["4.1.8", "4.1.4", "4.3.6", "4.3.9", "3.5.2", "3.4.5", "5.0.25", "4.4.0", "4.4.11"],
  GW: ["V6R1"],
  CME: [
    "BGCV_CFN_09S",
    "BGCV_CFN_11N",
    "BGCV_CFN_12I1",
    "BGCV_CFN_12N1",
    "BGCV_CFN_12S",
    "BGCV_CFN_22C",
    "BGCV_CFN_24G1",
    "BGCV_CFN_24N2",
    "BGCV_CFN_24P1",
    "BGCV_CFN_24R1",
    "BGCV_CFN_25N1",
    "BGCV_CFN_25PFM0",
    "BGCV_CFN_25R1",
    "BGCV_CFN_25T2",
    "DOSEPRO161",
    "DOSEPRO18",
    "DOSEPRO19",
    "DOSEPRO20",
    "DOSEPRO201",
    "DOSEPRO23",
    "BGCV_CFN_25A2"
  ],
  CMEDuo: ["TWINCV_TPN_031ES2"],
  AGW: ["1.3.2", "1.6.1", "1.2", "1.3.1", "1.6"],
  SE1: ["2.80", "4.54"],
  SE2: ["2.80", "4.54"],
  DS: ["N/A"],
  V700: ["2.6.1.0001", "2.7.0.0110", "2.7.1.0001"],
  S700: ["1.10.0.0099", "1.10.1.0001"],
  DS700: ["1.3.0.0001", "1.4.0.0041"],
  DS710: ["1.3.0.0001", "1.4.0.0012"]
};

export const calibracionesPorFamilia: Record<string, CalibrationRange[]> = {
  GP: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Pumping Eficience Test", min: 60, max: 120 }
  ],
  VP: [
    { nombre: "Presion Test mmHg", min: 460, max: 540 },
    { nombre: "Volumen ml", min: 9.7, max: 10.3 },
    { nombre: "Pumping Eficience Test", min: 60, max: 112 }
  ],
  CC: [
    { nombre: "Linear Speed", min: 147, max: 151 },
    { nombre: "Oclusión 3kg", min: 2.4, max: 3.8 },
    { nombre: "Presión 50", min: 40, max: 60 },
    { nombre: "Presión 750", min: 710, max: 790 }
  ],
  "GH.ENT.PK.TIVA": [
    { nombre: "Linear Speed", min: 147, max: 151 },
    { nombre: "Oclusión 3kg", min: 2.4, max: 3.8 }
  ],
  CME: [
    { nombre: "14PSI", min: 8, max: 16 },
    { nombre: "Volumen", min: 24.625, max: 25.375 }
  ],
  CMEDuo: [
    { nombre: "14PSI", min: 8, max: 16 },
    { nombre: "Volumen", min: 24.625, max: 25.375 }
  ],
  SE1: [
    { nombre: "Presión mmHg", min: 200, max: 400 },
    { nombre: "Volumen", min: "Según sistema", max: "" }
  ],
  SE2: [
    { nombre: "Presión mmHg", min: 200, max: 400 },
    { nombre: "Volumen", min: "Según sistema", max: "" }
  ],
  GW: [
    { nombre: "Presion mmHg", min: 350, max: 650 },
    { nombre: "Volumen ml", min: 19.7, max: 21.7 }
  ],
  V700: [
    { nombre: "Presion mmHg", min: 80, max: 370 },
    { nombre: "Volumen ml", min: 4.85, max: 5.15 }
  ],
  S700: [
    { nombre: "Presion mmHg", min: 80, max: 370 },
    { nombre: "Volumen ml", min: 4.9, max: 5.1 }
  ]
};