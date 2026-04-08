/**
 * Datos estáticos compartidos
 */

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
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  VP: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  CC: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  "GH.ENT.PK.TIVA": [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  GW: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  CME: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  CMEDuo: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  AGW: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  SE1: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  SE2: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  DS: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  V700: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  S700: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  DS700: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ],
  DS710: [
    { nombre: "Presion Test mmHg", min: 400, max: 600 },
    { nombre: "Volumen ml", min: 19.4, max: 20.6 },
    { nombre: "Tiempo s", min: 14.4, max: 15.6 },
    { nombre: "Flujo ml/h", min: 48, max: 52 },
    { nombre: "Flujo ml/min", min: 0.8, max: 0.8667 },
    { nombre: "Flujo ul/min", min: 800, max: 866.7 }
  ]
};

export const valoresFamilia: Record<string, string[]> = {
  "999-900ES - BG121 Twins Dual Channel": ["CME"],
  "999-603BDES - BD BG (BG323)": ["CME"],
  "999-917ES - BG323 Classic": ["CME"],
  "999-600ES - BG323 Color Vision Multi-therapy": ["CME"],
  "999-603ES - BG323CV 3rd edition": ["CME"],
  "999-603NL - BG323CV 3rd edition": ["CME"],
  "999-680ES - BG545 Color Vision Epidural": ["CME"],
  "999-683BDES - BD BG Epi (BG545)": ["CME"],
  "999-620ES - BG575 Color Vision IV PCA": ["CME"],
  "999-800ES - BG595 Color Vision Nerve/wound": ["CME"],
  "999-803BDES - BD BG Pain (BG595)": ["CME"],
  "999-803ES - BG595CV 3rd edition": ["CME"],
  "80203UNS01-30 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS01-32 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS01-33 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS01-50 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS01-52 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS01-53 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-30 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-32 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-33 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-34 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-50 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-52 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-53 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-54 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-70 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-72 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS02-73 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-30 - ALARIS® GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-32 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-34 - ALARIS® GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-52 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-53 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-72 - ALARIS® GATEWAY WORKSTATION": ["AGW"],
  "80203UNS03-73 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-30 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-32 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-33 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-34 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-50 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-52 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-53 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-54 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-72 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80223UNS02-73 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80300UNS01-30 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80300UNS01-52 - ALARIS GATEWAY WORKSTATION": ["AGW"],
  "80300UNS01-53 - ALARIS GATEWAY WORKSTATION": ["AGW"],
};