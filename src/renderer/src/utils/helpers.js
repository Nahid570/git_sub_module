import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styled, { css } from 'styled-components';

export const IV_INFUSION_ARRAY = process.env.REACT_APP_INFUSION_ARRAY || [
  'iv infusion',
];
export const TAB_CAP_ARRAY = process.env.REACT_APP_TAB_CAP_ARRAY || [
  'tablet',
  'mups tablet',
  'capsule',
  'injection',
  'sached powder',
  'dispersible tablet',
  'chewable tablet',
  'xr tablet',
  'orodispersible tablet',
];
export const POWDER_SYRUP_ARRAY = process.env.REACT_APP_POWDER_SYRUP_ARRAY || [
  'inhaler',
  'powder for suspension',
  'mouth wash',
  'powder for suspension',
  'gargle & mouth wash',
  'ointment',
  'oral suspension',
  'cream',
  'syrup',
  'inhalation solution',
  'powder for suspension',
  'suspension',
  'oral paste',
  'solution',
  'suppository',
  'oral gel',
  'vaginal suppository',
];

export const MEDICINE_TYPES = [
  'Capsule',
  'Tablet',
  'Powder For Suspension',
  'Syrup',
  'Suspension',
  'Paediatric Drops',
  'Lotion',
  'Ointment',
  'Oral Saline',
  'Cream',
  'Gel',
  'Suppository',
  'Solution',
  'Eye and Ear Drops',
  'IM Injection',
  'IV Injection',
  'IV/IM Injection',
  'Injection',
  'Eye, Ear & Nasal Drops',
  'Vaginal Tablet',
  'Eye Drops',
  'Hand Rub',
  'Oral Gel',
  'Powder',
  'Gargle & Mouth Wash',
  'Oral Solution',
  'Xr Tablet',
  'Sr Tablet',
  'Eye Ointment',
  'Raw Materials',
  'Pellets',
  'Mouth Wash',
  'Sr Capsule',
  'Aerosol Inhalation',
  'Inhaler',
  'Inhalation Solution',
  'IV Infusion',
  'Ors Tablet',
  'Dispersible Tablet',
  'Orodispersible Tablet',
  'Nebuliser Solution',
  'Oral Paste',
  'Nasal Spray',
  'Spray',
  'Dr Tablet',
  'Inhalation Aerosol',
  'Cozycap',
  'Inhalation Capsule',
  'Nasal Drops',
  'Chewable Tablet',
  'Topical Solution',
  'Cr Tablet',
  'Er Tablet',
  'Scalp Lotion',
  'Oral Drops',
  'Granules For Suspension',
  'Oral Suspension',
  'Pellets For Suspension',
  'Sachet',
  'Elixir',
  'Linctus',
  'Mups Tablet',
  'Liquid',
  'Sached Powder',
  'Emulsion',
  'Ear Drop',
  'Eye & Nasal Drops',
  'Shampoo',
  'Ophthalmic Emulsion',
  'Eye Gel',
  'Solution For Injection',
  'Nebuliser Suspension',
  'Soft Gelatin Capsule',
  'Solution For Infusion',
  'Odt Tablet',
  'Irrigation Solution',
  'Rectal Ointment',
  'Resperitory Solution',
  'Vaginal Cream',
  'Respirator Suspension',
  'Oral Soluble Film',
  'Emulgel',
  'Mouth Dissolving Tablet',
  'Rapid Tablet',
  'Effervescent Tablet',
  'Powder for Pedriatric Drop',
  'Effervescent Granules',
  'Mouth Wash Antiseptic',
  'Syringe',
  'Dialysis Solution',
  'Per Rectal',
  'Vaginal Gel',
  'Pr Tablet',
  'Dr Granules For Suspension',
  'Er Capsule',
  'Bolus',
  'Vaccine',
  'Gas',
  'Tincture',
  'Scrub',
  'Blood bag',
  'Pvc Bag',
  'Powder for Solution',
  'Ear Spray',
  'Blood Tubing Set',
  'Needle for Syringe',
  'Butterfly',
  'Powder For Oral Solution',
  'Oral Granules',
  'Oral Emulsion',
  'Eye Cleanser Solution',
  'Eye and Ear Ointment',
  'Extended Release Capsule',
  'Vaginal Pessary',
  'Gum',
  'Oral Dental Gel',
  'Topical Suspension',
  'Cr Capsule',
  'Md Tablet',
  'Inhalation Liquid',
  'Viscoelastic Solution',
  'Drops',
  'Vaginal Suppository',
  'Water Soluble Powder',
  'Dry Powder Inhaler',
  'Scalp Ointment',
  'Sprinkle Capsule',
  'M R Capsule',
  'M R Tablet',
  'Repacking',
  'inhaler',
  'powder for suspension',
  'mouth wash',
  'gargle & mouth wash',
  'ointment',
  'oral suspension',
  'cream',
  'syrup',
  'inhalation solution',
  'suspension',
  'oral paste',
  'solution',
  'suppository',
  'oral gel',
  'vaginal suppository',
];

export const MEDICINE_TYPES_SHORTS = {
  '': '',
  'Dosage Form': 'Tab.',
  Tablet: 'Tab.',
  'Vaginal Tablet': 'Tab.',
  'Xr Tablet': 'Tab.',
  'Sr Tablet': 'Tab.',
  'Ors Tablet': 'Tab.',
  'Dispersible Tablet': 'Tab.',
  'Orodispersible Tablet': 'Tab.',
  'Dr Tablet': 'Tab.',
  'Chewable Tablet': 'Tab.',
  'Cr Tablet': 'Tab.',
  'Er Tablet': 'Tab.',
  'Mups Tablet': 'Tab.',
  'Odt Tablet': 'Tab.',
  'Mouth Dissolving Tablet': 'Tab.',
  'Rapid Tablet': 'Tab.',
  'Effervescent Tablet': 'Tab.',
  'FC Tablet': 'Tab.',
  'EC Tablet': 'Tab.',
  'MR Tablet': 'Tab.',
  'Pr Tablet': 'Tab.',
  'Md Tablet': 'Tab.',
  'Sublingual Tablet': 'Tab.',
  'M R Tablet': 'Tab.',
  Capsule: 'Cap.',
  'Sr Capsule': 'Cap.',
  'Inhalation Capsule': 'Cap.',
  'Soft Gelatin Capsule': 'Cap.',
  'DR Capsule': '',
  'Dry Powder Inhalation Capsule': 'Cap.',
  'Er Capsule': 'Cap.',
  'Extended Release Capsule': 'Cap.',
  'Cr Capsule': 'Cap.',
  'Sprinkle Capsule': 'Cap.',
  'M R Capsule': 'Cap.',
  Cozycap: 'Cap.',
  'Aerosol Inhalation': 'Inhaler',
  'Inhalation Aerosol': 'Inhaler',
  'Inhalation Solution': 'Inhaler',
  'Inhalation Liquid': 'Inhaler',
  'Dry Powder Inhaler': 'Inhaler',
  'Blood bag': 'Blood bag',
  'Blood Tubing Set': 'Blood Tubing Set',
  Butterfly: 'Butterfly',
  Bolus: 'Bolus',
  'Pvc Bag': 'Pvc Bag',
  Cream: 'Cream',
  'Vaginal Cream': 'Cream',
  'Paediatric Drops': 'Drops',
  'Eye and Ear Drops': 'Drops',
  'Eye, Ear & Nasal Drops': 'Drops',
  'Eye Drops': 'Drops',
  'Nasal Drops': 'Drops',
  'Oral Drops': 'Drops',
  'Ear Drop': 'Drops',
  'Eye & Nasal Drops': 'Drops',
  Drops: 'Drops',
  'Powder for Pedriatric Drop': 'Powder for Pedriatric Drop',
  'Dialysis Solution': 'Dialysis Solution',
  'Eye Ointment': 'Eye Ointment',
  Elixir: 'Elixir',
  Emulsion: 'Emulsion',
  'Ophthalmic Emulsion': 'Ophthalmic Emulsion',
  'Effervescent Granules': 'Effervescent Granules',
  'Ear Spray': 'Ear Spray',
  'Oral Emulsion': 'Oral Emulsion',
  'Eye Cleanser Solution': 'Eye Cleanser Solution',
  'Eye and Ear Ointment': 'Eye and Ear Ointment',
  Ointment: 'Ointment',
  'Rectal Ointment': 'Rectal Ointment',
  'Scalp Ointment': 'Scalp Ointment',
  'Granules For Suspension': 'Granules For Suspension',
  'Pellets For Suspension': 'Pellets For Suspension',
  'Solution For Infusion': 'Solution For Infusion',
  'Oral Soluble Film': 'Oral Soluble Film',
  'Powder for Solution': 'Powder for Solution',
  'Powder for Sachet': 'Powder for Sachet',
  'Needle for Syringe': 'Needle for Syringe',
  'Powder For Oral Solution': 'Powder For Oral Solution',
  Gel: 'Gel',
  'Oral Gel': 'Gel',
  'Eye Gel': 'Gel',
  'Vaginal Gel': 'Gel',
  'Oral Dental Gel': 'Gel',
  'Gargle & Mouth Wash': 'Gargle & Mouth Wash',
  'Oral Granules': 'Oral Granules',
  Gum: 'Gum',
  Gas: 'Gas',
  'Hand Rub': 'Hand Rub',
  'IM Injection': 'Inj.',
  'IV Injection': 'Inj.',
  'IV/IM Injection': 'Inj.',
  Injection: 'Inj.',
  'Solution For Injection': 'Inj.',
  'Liquid Injection': 'Inj.',
  'Pre-filled Syringe Injection': 'Inj.',
  'IV Infusion': 'IV Infusion',
  'Irrigation Solution': 'Irrigation Solution',
  Lotion: 'Lotion',
  'Scalp Lotion': 'Scalp Lotion',
  Linctus: 'Linctus',
  Liqulabel: 'Liquid',
  Licap: 'Licap',
  'Mouth Wash': 'Mouth Wash',
  'Mouth Wash Antiseptic': 'Mouth Wash Antiseptic',
  'Raw Materials': 'Raw Materials',
  'Nasal Spray': 'Nasal Spray',
  Spray: 'Spray',
  'Nebuliser Solution': 'Nebuliser Solution',
  'Nebuliser Suspension': 'Nebuliser Suspension',
  'Oral Saline': 'Oral Saline',
  Pellets: 'Pellets',
  'Oral Paste': 'Oral Paste',
  'Per Rectal': 'Per Rectal',
  Sachet: 'Powder',
  Powder: 'Powder',
  'Vaginal Pessary': 'Vaginal Pessary',
  'Water Soluble Powder': 'Water Soluble Powder',
  'Resperitory Solution': 'Resperitory Solution',
  'Respirator Suspension': 'Respirator Suspension',
  'Respirator Solution': 'Respirator Solution',
  Repacking: 'Repacking',
  'Powder For Suspension': 'Susp.',
  'Dr Granules For Suspension': 'Susp.',
  Syrup: 'Syrp.',
  Suspension: 'Suspension',
  Suppository: 'Suppository',
  Solution: 'Solution',
  'Topical Solution': 'Topical Solution',
  'Sached Powder': 'Sached Powder',
  Shampoo: 'Shampoo',
  Syringe: 'Syringe',
  Scrub: 'Scrub',
  'Topical Suspension': 'Topical Suspension',
  Tincture: 'Tincture',
  Vaccine: 'Vaccine',
  'Viscoelastic Solution': 'Viscoelastic Solution',
  'Vaginal Suppository': 'Vaginal Suppository',
};

export const QTY_SCHEDULES = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
];

export const DURATION_UNITS = ['দিন', 'রাত', 'সপ্তাহ', 'মাস', 'বছর', 'চলবে'];

export const sizeConverter = (totalWidth, val) => {
  let value = 0;
  value = (11 / totalWidth) * val;
  return value.toFixed(2);
};

export const patientSizeConverter = (totalWidth, val, totalPadding) => {
  let value = ((11 - totalPadding) / totalWidth) * val;
  return value; //.toFixed(2);
};

export const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  if (!str.length) return '';
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export const userRole = (userRole) => {
  // converting lowercase
  if (!userRole.length) return '';
  return userRole.toLowerCase();
};

export const ageCount = (dob) => {
  if (isNaN(dob)) {
    const startDate = moment(moment(), 'DD-MM-YYYY');
    const endDate = moment(moment(dob), 'DD-MM-YYYY');
    return startDate.diff(endDate, 'years');
  }
  return dob;
};

export const ageConvertToDate = (age) => {
  return age ? moment().subtract(age, 'years').format('YYYY-MM-DD') : '';
};

export const ageConvertToDateTime = (ages) => {
  let { years, months, days, hours } = ages;
  let result = moment().subtract({
    years: years || 0,
    months: months || 0,
    days: days || 0,
    hours: hours || 0,
  });
  return result.format('YYYY-MM-DD HH:mm:ss');
};

export const separateDateTime = (dateStr, isAfterSave = true) => {
  const targetDate = moment(dateStr);
  const currentDate = moment();
  if (isAfterSave === 'new' || isAfterSave == true) {
    targetDate.subtract(1, 'year');
  }
  const years = currentDate.diff(targetDate, 'years');
  const months = currentDate.diff(targetDate, 'months') % 12;
  const days = currentDate.diff(targetDate, 'days') % moment().daysInMonth();
  const hours = currentDate.diff(targetDate, 'hours') % 24;

  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
  };
};

export const getAvatarName = (name) => {
  let result = '';
  if (name?.length) {
    result = name.split(' ');

    if (result.length > 2) {
      result = [result[0], result[1]];
    }
    result = result.map((str) => str[0]).join('');
  }
  return result;
};

export const convertToLower = (str) => {
  // converting lowercase
  if (!str.length) return '';
  return str.toLowerCase();
};

export const checkDoctorDept = (specialtyName, specialtyId, specialties) => {
  return (
    specialties &&
    specialties?.some(
      (specialty) =>
        specialty.id == specialtyId &&
        specialty.name.toLowerCase() === specialtyName,
    )
  );
};

export const countOccurrencesOf = (word, search) => {
  let count = 0;
  if (word) {
    count = word.split('').filter((el) => el.includes(search)).length;
  }
  return count;
};

export const bsaBmiCalculation = (
  feet,
  inch,
  heightUnit,
  weight,
  weightUnit,
) => {
  let result = { bsa: '', bmi: '' };
  if (feet > 0 && weight > 0) {
    let heightVal = feet;
    if (heightUnit === 'Ft') {
      heightVal = feet * 12 + (inch ? Number(inch) : 0);
      heightVal = heightVal * 2.54;
    }
    const weightVal = weightUnit === 'Pound' ? weight / 0.4535 : weight;
    result.bsa = Math.sqrt((weightVal * heightVal) / 3600);
    result.bmi = weightVal / Math.pow(heightVal / 100, 2);
  }
  return result;
};

export const deleteConfirmation = (removeClickAction, id) => {
  const options = {
    top: 0,
    bottom: 100,
    left: 0,
    title: 'Delete',
    message: 'Are you sure want to delete?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => removeClickAction(id),
      },
      {
        label: 'No',
        onClick: () => console.log('No delete'),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: 'overlay-custom-class-name',
  };
  confirmAlert(options);
};

export const isExistHistory = (selectedHistories, type) => {
  if (type === 'medical' && selectedHistories?.medical?.length > 0) {
    return true;
  } else if (
    type === 'drugs' &&
    (selectedHistories?.drugs?.D_H.length ||
      selectedHistories?.drugs?.D_A?.length)
  ) {
    return true;
  } else if (
    type === 'investigations' &&
    selectedHistories?.investigations?.length
  ) {
    return true;
  } else if (
    type === 'personal' &&
    (selectedHistories?.personal?.smoker ||
      selectedHistories?.personal?.alcoholic ||
      selectedHistories?.personal?.tobacco)
  ) {
    return true;
  } else if (type === 'family' && selectedHistories?.family) {
    return true;
  } else if (type === 'gynecology' && selectedHistories?.gynecology) {
    return true;
  } else if (type === 'surgical' && selectedHistories?.surgical) {
    return true;
  } else if (type === 'others' && selectedHistories?.others) {
    return true;
  }
  return false;
};

export const isExistAnyHistory = (selectedHistories) => {
  if (
    isExistHistory(selectedHistories, 'medical') ||
    isExistHistory(selectedHistories, 'drugs') ||
    isExistHistory(selectedHistories, 'investigations') ||
    isExistHistory(selectedHistories, 'personal') ||
    isExistHistory(selectedHistories, 'family') ||
    isExistHistory(selectedHistories, 'gynecology') ||
    isExistHistory(selectedHistories, 'surgical') ||
    isExistHistory(selectedHistories, 'others')
  ) {
    return true;
  }
  return false;
};

export const isExistGeneralExaminationData = (generalExaminations) => {
  if (
    generalExaminations &&
    (generalExaminations?.bloodGroup ||
      !Object.values(generalExaminations?.bloodPressure).includes('') ||
      generalExaminations?.pulseInfo?.pulse ||
      generalExaminations?.pulseInfo?.pulseType ||
      generalExaminations?.temperatureInfo?.temperature ||
      generalExaminations?.temperatureInfo?.temperatureType ||
      generalExaminations?.weightInfo?.weight ||
      generalExaminations?.weightInfo?.weight ||
      generalExaminations?.weightInfo?.weight ||
      generalExaminations?.heightInfo?.feet ||
      generalExaminations?.heightInfo?.inch ||
      generalExaminations?.idealWeightInfo?.idealWeight ||
      generalExaminations?.idealBmi ||
      generalExaminations?.targetDailyCalory ||
      generalExaminations?.diabetes)
  ) {
    return true;
  }
  return false;
};

export const isExistObservationData = (observations) => {
  if (observations?.length > 0) {
    return true;
  }
  return false;
};

export const isExistAnyOnExamination = (selectedOnExamination) => {
  if (
    isExistGeneralExaminationData(selectedOnExamination?.generalExaminations) ||
    isExistOcularData(selectedOnExamination?.ocularExamination) ||
    isExistObservationData(selectedOnExamination?.observations) ||
    isExistAnyDentalData(selectedOnExamination?.dentalExamination) ||
    isExistAnyCardiologyData(selectedOnExamination?.systemicExamination) ||
    isExistAnyGyneData(selectedOnExamination?.gyneExamination) ||
    isExistAnyBreastData(selectedOnExamination?.breastExamination)
  ) {
    return true;
  }
  return false;
};

export const isExistOcularData = (ocularExamination) => {
  if (
    ocularExamination &&
    (ocularExamination?.visualAcuity?.val ||
      ocularExamination?.visualAcuity?.var ||
      ocularExamination?.pl?.present ||
      ocularExamination?.pl?.absent ||
      ocularExamination?.fc ||
      ocularExamination?.fc ||
      ocularExamination?.hm?.present ||
      ocularExamination?.hm?.absent ||
      Object.values(ocularExamination?.pr).includes(true) ||
      Object.values(ocularExamination?.colorVision).includes(true) ||
      Object.values(ocularExamination?.ocularMotility?.od).includes(true) ||
      Object.values(ocularExamination?.ocularMotility?.os).includes(true) ||
      Object.values(ocularExamination?.angleEvaluationBefore?.od).some(
        (val) => val !== '',
      ) ||
      Object.values(ocularExamination?.angleEvaluationBefore?.os).some(
        (val) => val !== '',
      ) ||
      Object.values(ocularExamination?.angleEvaluationAfter?.od).some(
        (val) => val !== '',
      ) ||
      Object.values(ocularExamination?.angleEvaluationAfter?.os).some(
        (val) => val !== '',
      ) ||
      ocularExamination?.iop?.high ||
      ocularExamination?.iop?.low)
  ) {
    return true;
  }
  return false;
};

export const englishToBanglaNumber = (number) =>
  number.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

export const isExistEyeGlassTable = (selectedEyeGlass) => {
  if (
    selectedEyeGlass?.isPlano ||
    selectedEyeGlass?.leftPlano ||
    selectedEyeGlass?.rightPlano ||
    Object.values(selectedEyeGlass.r).some((item) => item !== '') ||
    Object.values(selectedEyeGlass.l).some((item) => item !== '')
  ) {
    return true;
  }
  return false;
};

export const isExistAnyEyeGlass = (selectedEyeGlass) => {
  if (
    isExistEyeGlassTable(selectedEyeGlass) ||
    selectedEyeGlass?.add === '' ||
    selectedEyeGlass?.lens === '' ||
    selectedEyeGlass?.pd === ''
  ) {
    return true;
  }
  return false;
};

export const isExistAnyDentalData = (dentalExamination) => {
  if (
    dentalExamination?.topLeft?.length ||
    dentalExamination?.topRight?.length ||
    dentalExamination?.bottomLeft?.length ||
    dentalExamination?.bottomRight?.length
  ) {
    return true;
  }
  return false;
};

export const isExistAnyRehabData = (selectedRehabilitation) => {
  if (
    selectedRehabilitation?.orthoses?.length ||
    selectedRehabilitation?.exercises?.length ||
    selectedRehabilitation?.physicalTherapies?.length
  ) {
    return true;
  }
  return false;
};

export const samplePatientItemData = () => {
  return {
    name: 'name',
    label: {
      labelName: 'Patient Name',
      properties: {
        paddingTop: {
          quantity: 0,
          unit: 'in',
        },
        paddingBottom: {
          quantity: 0,
          unit: 'in',
        },
        paddingLeft: {
          quantity: 0,
          unit: 'in',
        },
        paddingRight: {
          quantity: 0,
          unit: 'in',
        },
        isHidden: false,
      },
    },
    value: {
      properties: {
        paddingTop: {
          quantity: 0,
          unit: 'in',
        },
        paddingBottom: {
          quantity: 0,
          unit: 'in',
        },
        paddingLeft: {
          quantity: 0,
          unit: 'in',
        },
        paddingRight: {
          quantity: 0,
          unit: 'in',
        },
      },
    },
    width: 2,
    unit: 'in',
    borderTop: false,
    borderBottom: false,
    borderLeft: false,
    borderRight: false,
    isHidden: false,
    rowNumber: 1,
  };
};

export const getSpecialityName = (specialties, specialityId) => {
  let result = specialties.find((item) => item.id === specialityId);
  return result ? result.name : '';
};

export const arrayIntoSubArray = (inputArr, chunkSize) => {
  let results = [];
  while (inputArr.reverse().length) {
    results.push(inputArr.splice(0, chunkSize));
  }
  return results;
};

export const isExistAnyCardiologyData = (systemicExamination) => {
  return (
    systemicExamination?.jvp?.status ||
    systemicExamination?.lph?.status ||
    systemicExamination?.palpableP2?.status ||
    systemicExamination?.lungBase?.crepitation ||
    systemicExamination?.lungBase?.raised ||
    systemicExamination?.lungBase?.rhonchi ||
    systemicExamination?.lungBase?.normal ||
    systemicExamination?.murmur?.systolic ||
    systemicExamination?.murmur?.diastolic ||
    systemicExamination?.heartSound?.s1 ||
    systemicExamination?.heartSound?.s2 ||
    systemicExamination?.apexBeatNote ||
    systemicExamination?.rsNote ||
    systemicExamination?.gsNote ||
    systemicExamination?.cnsNote ||
    systemicExamination?.showCoronary ||
    systemicExamination?.showAngiogram
  );
};

export const isExistAnyOncologyData = (systemicExamination) => {
  return (
    systemicExamination?.aucResult ||
    systemicExamination?.cnsIpiResult ||
    systemicExamination?.mmIssResult
  );
};

// export const aucCalculation = (g, a, w, s, t) =>
//   g && a && w > 0 && s > 0 && t > 0
//     ? (
//         ((140 - a) / s) *
//         (g === 'male' ? 1 : 0.85) *
//         (w / 72) *
//         (t * (214.8 + 25))
//       ).toFixed(2)
//     : undefined

export const aucCalculation = (
  gender,
  age,
  weight,
  serumCreatinine,
  targetAUC,
) => {
  if (
    gender &&
    age &&
    parseFloat(weight) > 0 &&
    parseFloat(serumCreatinine) > 0 &&
    parseFloat(targetAUC) > 0
  ) {
    let result =
      ((140 - age) / serumCreatinine) *
      (gender === 'male' ? 1 : 0.85) *
      (weight / 72);
    result = targetAUC * (result + 25);
    return result.toFixed(2);
  }
};

export const mmIssCalculation = (first, second) => {
  switch (first + ',' + second) {
    case '< 3.5 mg/L,>= 3.5 g/dL':
      return { stage: 'Stage I', survivalMonths: 62 };
    case '< 3.5 mg/L,< 3.5 g/dL':
    case '3.5 - 5.4 mg/L,>= 3.5 g/dL':
    case '3.5 - 5.4 mg/L,< 3.5 g/dL':
      return { stage: 'Stage II', survivalMonths: 44 };
    case '> 5.4 mg/L,>= 3.5 g/dL':
    case '> 5.4 mg/L,< 3.5 g/dL':
      return { stage: 'Stage III', survivalMonths: 29 };
  }
};

export const cnsIpiTotalPoint = (selectedData) => {
  console.log(selectedData);
  return (
    selectedData?.cnsAge +
    selectedData?.annArborStage +
    selectedData?.ecogStatus +
    selectedData?.extranodal +
    selectedData?.serumLevel
  );
};

export const cnsIpiRiskLevelStatus = (totalPoint) => {
  let result = {};
  switch (totalPoint) {
    case 0:
    case 1:
      result = {
        risk: 'Low risk',
        os: '91%',
        pfs: '87%',
        year3Os: 'OS for 3 years',
        year5Os: '73% OS for 5 years ',
        year3Pfs: 'PFS for 3 years',
        year5OPfs: 'EFS 81% for 3 years',
      };
      break;
    case 2:
      result = {
        risk: 'Low-intermediate risk',
        os: '81%',
        pfs: '75%',
        year3Os: 'OS for 3 years',
        year5Os: 'OS 51% for 5 years',
        year3Pfs: 'PFS for 3 years',
        year5OPfs: 'EFS 69% for years',
      };
      break;
    case 3:
      result = {
        risk: 'High-intermediate risk',
        os: '65%',
        pfs: '59%',
        year3Os: 'OS for 3 years',
        year5Os: 'OS 43% for 5 years',

        year3Pfs: 'PFS for 3 years',
        year5OPfs: 'EFS 53% for 3 years',
      };
      break;
    case 4:
    case 5:
      result = {
        risk: 'High risk',
        os: '59%',
        pfs: '50%',
        year3Os: 'OS for 3 years',
        year5Os: 'OS for 26% for 5 years',

        year3Pfs: 'PFS for 3 years',
        year5OPfs: 'EFS 50% for 3 years',
      };
      break;
  }
  return result;
};

export const oncologyList = () => {
  return [
    { value: 'kidney', label: 'Kidney' },
    { value: 'bladder', label: 'Bladder' },
    { value: 'cervical', label: 'Cervical' },
    { value: 'ovarian', label: 'Ovarian' },
    {
      value: 'uterine_carcinomas_and_carcinosarcoma',
      label: 'Uterine carcinomas and carcinosarcoma',
    },
    { value: 'uterine_sarcoma', label: 'Uterine sarcoma' },
    { value: 'prosstate', label: 'Prosstate' },
  ];
};

export const clearLungBase = () => {
  return {
    crepitation: false,
    raised: false,
    rhonchi: false,
    normal: false,
    note: '',
  };
};

export const clearSystemicData = (selectedData, itemName) => {
  switch (itemName) {
    case 'jvp':
    case 'lph':
    case 'palpableP2':
      selectedData[itemName]['status'] = '';
      selectedData[itemName]['note'] = '';
      break;
    case 'murmur':
      selectedData[itemName] = {
        systolic: false,
        diastolic: false,
        note: '',
      };
      break;
    case 'lungBase':
      selectedData[itemName] = clearLungBase();
      break;
    case 'heartSound':
      selectedData[itemName]['s1'] = '';
      selectedData[itemName]['s2'] = '';
      selectedData[itemName]['murmur'] = '';
      break;
    case 'apexBeatNote':
    case 'rsNote':
    case 'gsNote':
    case 'cnsNote':
      selectedData[itemName] = '';
      break;
  }
  return selectedData;
};

export const isExistAnyGyneData = (gyneData) => {
  return (
    gyneData?.sfh ||
    gyneData?.fhsPresent ||
    gyneData?.fhsAbsent ||
    gyneData?.presentation ||
    gyneData?.nad ||
    gyneData?.uterus ||
    gyneData?.wkSize ||
    gyneData?.os ||
    gyneData?.cervix ||
    gyneData?.effacement ||
    gyneData?.station ||
    gyneData?.mumbrance ||
    gyneData?.showPresent ||
    gyneData?.showAbsent ||
    gyneData?.inspectionNad ||
    gyneData?.lump ||
    gyneData?.pseCervix ||
    gyneData?.bmeUterus ||
    gyneData?.bmeWkSize ||
    gyneData?.fornix ||
    gyneData?.cmtPresent ||
    gyneData?.cmtAbsent ||
    gyneData?.bleedingAbsent ||
    gyneData?.bleedingPresent
  );
};

export const isExistAnyBreastData = (breastData) => {
  return (
    Object.values(breastData?.lump || {}).includes(true) ||
    Object.values(breastData?.lumpPosition || {}).some((item) => item) ||
    breastData?.size
  );
};

export const getPatientIdForDoctor = (idList, userInfo) => {
  let patientId = '';
  idList?.forEach((item) => {
    if (item.doctorId === userInfo.id) {
      patientId = item.patientId;
    }
  });
  return patientId;
};

export const agePrint = (ages, unitProperties) => {
  let { years, months, days, hours } = unitProperties || {};
  let result = '';
  if (ages?.years && years?.enabled) {
    result = result + ' ' + ages?.years + ' ' + years?.label;
  }
  if (ages?.months && months?.enabled) {
    result = result + ' ' + ages?.months + ' ' + months?.label;
  }
  if (ages?.days && days?.enabled) {
    result = result + ' ' + ages?.days + ' ' + days?.label;
  }
  if (ages?.hours && hours?.enabled) {
    result = result + ' ' + ages?.hours + ' ' + hours?.label;
  }
  return result;
};

export const isExistAnyInfertilityData = (data) => {
  return data && (data?.man?.length > 0 || data?.woman?.length > 0);
};

export const isFemaleSelected = (email) => {
  const emails = [
    'farhanaaktari33bcs@gmail.com',
    'hafsazakia02@gmail.com',
    'salma.a.munmun@gmail.com',
    'tahuraali26@gmail.com',
  ];
  return emails.includes(email);
};

export const itemSettingStyle = (settingsData) => {
  const {
    capitalize,
    uppercase,
    lowercase,
    bold,
    italic,
    underline,
    fontSize,
    color,
    fontFamily,
  } = settingsData;
  return {
    ...(capitalize && { textTransform: 'capitalize' }),
    ...(uppercase && { textTransform: 'uppercase' }),
    ...(lowercase && { textTransform: 'lowercase' }),
    ...(bold && { fontWeight: 'bold' }),
    ...(italic && { fontStyle: 'italic' }),
    ...(underline && { textDecoration: 'underline' }),
    ...(fontSize && { fontSize }),
    ...(color && { color }),
    ...(fontFamily && { fontFamily }),
  };
};

export const styledComponent = (settingsData) => {
  const {
    capitalize,
    uppercase,
    lowercase,
    bold,
    italic,
    underline,
    fontSize,
    color,
    fontFamily,
  } = settingsData;
  const properties = {
    ...(capitalize && { textTransform: 'capitalize' }),
    ...(uppercase && { textTransform: 'uppercase' }),
    ...(lowercase && { textTransform: 'lowercase' }),
    ...(bold && { fontWeight: 'bold' }),
    ...(italic && { fontStyle: 'italic' }),
    ...(underline && { textDecoration: 'underline' }),
    ...(fontSize && { fontSize }),
    ...(color && { color }),
    ...(fontFamily && { fontFamily }),
  };
  return styled.span`
    ${properties}
  `;
};

export const medicineType = (typeName) => {
  return TAB_CAP_ARRAY.includes(convertToLower(typeName));
};

export const getRxLineClasses = (element, type = '') => {
  let classNames = '';
  if (type === 'rx-schedule') {
    classNames = 'medicine-schedule';
  } else if (type === 'rx-instruction') {
    classNames = 'medicine-instruction';
  }

  if (element?.lineDraw) {
    if (element?.lineType === 'dash') {
      classNames += ' background-dash';
    } else if (element?.lineType === 'dot') {
      classNames += ' background-dot';
    } else if (element?.lineType === 'hiphen') {
      classNames += ' background-hiphen';
    } else if (element?.lineType === 'none') {
      classNames = '';
    }
  }
  return classNames;
};

export const formatOldPrescriptionData = (medicines) => {
  if (medicines?.length > 0 && medicines[0]?.hasOwnProperty('itemDetails')) {
    return medicines;
  }
  return medicines?.map((medicine) => ({
    name: medicine?.name,
    id: medicine.id,
    companyName: medicine?.companyName,
    brandName: medicine?.brandName,
    genericName: medicine?.genericName,
    strength: medicine?.strength,
    type: medicine?.type,
    altName: medicine?.altName,
    createdBy: medicine?.createdBy,
    priority: medicine?.priority,
    itemDetails: [
      {
        quantitiesField: medicine?.quantitiesField,
        schedule: medicine?.schedule,
        scheduleUnit: medicine?.scheduleUnit,
        quantities: medicine?.quantities,
        quantity: medicine?.quantity,
        quantityUnit: medicine?.quantityUnit,
        times: medicine?.times,
        timesUnit: medicine?.timesUnit,
        duration: medicine?.duration,
        durationUnit: medicine?.durationUnit,
        instructions: medicine?.instructions,
      },
    ],
  }));
};

export const pagePrintStyle = (prescriptionSetting, actualWidth) => {
  return {
    height:
      prescriptionSetting?.page?.height?.quantity +
      prescriptionSetting?.page?.height?.unit,
    width: '100%',
    paddingLeft:
      sizeConverter(
        actualWidth,
        prescriptionSetting?.page?.marginLeft?.quantity,
      ) + prescriptionSetting?.page?.marginLeft?.unit,
    paddingRight:
      sizeConverter(
        actualWidth,
        prescriptionSetting?.page?.marginRight?.quantity,
      ) + prescriptionSetting?.page?.marginRight?.unit,
  };
};

export const leftSidePrintStyle = (prescriptionSetting) => {
  return {
    boxSizing: 'borderBox',
    width:
      prescriptionSetting?.prescriptionBody?.leftContent?.width?.quantity +
      prescriptionSetting?.prescriptionBody?.leftContent?.width?.unit,
    marginLeft:
      prescriptionSetting?.prescriptionBody?.leftContent?.marginLeft?.quantity +
      prescriptionSetting?.prescriptionBody?.leftContent?.marginLeft?.unit,
    marginRight:
      prescriptionSetting?.prescriptionBody?.leftContent?.marginRight
        ?.quantity +
      prescriptionSetting?.prescriptionBody?.leftContent?.marginRight?.unit,
    marginTop:
      prescriptionSetting?.prescriptionBody?.leftContent?.marginTop?.quantity +
      prescriptionSetting?.prescriptionBody?.leftContent?.marginTop?.unit,
    marginBottom:
      prescriptionSetting?.prescriptionBody?.leftContent?.marginBottom
        ?.quantity +
      prescriptionSetting?.prescriptionBody?.leftContent?.marginBottom?.unit,
  };
};

export const rightSidePrintStyle = (prescriptionSetting) => {
  return {
    boxSizing: 'borderBox',
    paddingLeft: '30px',
    width:
      prescriptionSetting?.prescriptionBody?.rightContent?.width?.quantity +
      prescriptionSetting?.prescriptionBody?.rightContent?.width?.unit,
    marginLeft:
      prescriptionSetting?.prescriptionBody?.rightContent?.marginLeft
        ?.quantity +
      prescriptionSetting?.prescriptionBody?.rightContent?.marginLeft?.unit,
    marginRight:
      prescriptionSetting?.prescriptionBody?.rightContent?.marginRight
        ?.quantity +
      prescriptionSetting?.prescriptionBody?.rightContent?.marginRight?.unit,
    marginTop:
      prescriptionSetting?.prescriptionBody?.rightContent?.marginTop?.quantity +
      prescriptionSetting?.prescriptionBody?.rightContent?.marginTop?.unit,
    marginBottom:
      prescriptionSetting?.prescriptionBody?.rightContent?.marginBottom
        ?.quantity +
      prescriptionSetting?.prescriptionBody?.rightContent?.marginBottom?.unit,
  };
};

export const leftOrRightItems = (prescriptionItems, itemType) => {
  let resultLeftOrRightItems = [];
  for (let itemKey in prescriptionItems?.items) {
    if (
      prescriptionItems?.items[itemKey]?.position === itemType &&
      prescriptionItems?.items[itemKey].enabled
    ) {
      resultLeftOrRightItems.push({
        ...prescriptionItems?.items[itemKey],
        name: itemKey,
      });
    }
  }
  return resultLeftOrRightItems.sort(
    (a, b) => parseInt(a.order) - parseInt(b.order),
  );
};

export const defaultGeneralData = () => {
  return {
    bloodGroup: '',
    bloodPressure: { systolic: '', diastolic: '' },
    pulseInfo: { pulse: '', pulseUnit: 'PM', pulseType: '' },
    temperatureInfo: {
      temperature: '',
      temperatureUnit: 'F',
      temperatureType: '',
    },
    weightInfo: {
      weight: '',
      weightUnit: 'KG',
      weightShowInPrescription: '',
    },
    heightInfo: {
      feet: '',
      inch: '',
      heightUnit: 'Ft',
      heightShowInPrescription: '',
    },
    idealWeightInfo: {
      idealWeight: '',
      idealWeightUnit: 'KG',
    },
    bsa: '',
    showBsa: false,
    bmi: '',
    showBmi: false,
    idealBmi: '',
    targetDailyCalory: '',
    diabetes: '',
  };
};

export const calculatePatientLabelPadding = (
  data,
  paddingItem,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  actualWidth,
  totalPadding,
  isPad,
) => {
  let result = {
    [paddingLeft]:
      patientSizeConverter(
        actualWidth,
        data[paddingItem]?.properties[paddingLeft]?.quantity,
        totalPadding,
      ) + data[paddingItem]?.properties[paddingLeft]?.unit,
    [paddingRight]:
      patientSizeConverter(
        actualWidth,
        data[paddingItem]?.properties[paddingRight]?.quantity,
        totalPadding,
      ) + data[paddingItem]?.properties[paddingRight]?.unit,
    [paddingTop]:
      data[paddingItem]?.properties[paddingTop]?.quantity +
      data[paddingItem]?.properties[paddingTop]?.unit,
    [paddingBottom]:
      data[paddingItem]?.properties[paddingBottom]?.quantity +
      data[paddingItem]?.properties[paddingBottom]?.unit,
  };
  if (paddingItem === 'value') {
    let width = data.width;
    if (!data?.label?.properties?.isHidden) {
      if (data.unit === 'in') {
        width = data.width - 0.6;
      }
    }
    result.width =
      patientSizeConverter(actualWidth, width, totalPadding) + data.unit;
  }
  if (paddingItem === 'label' && isPad && !data?.label?.properties?.isHidden) {
    result.width = '0.6in';
  }
  return result;
};
