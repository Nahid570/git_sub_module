
export const onExaminationData = {
    observations: [],
    generalExaminations: {
        bloodGroup: '',
        bloodPressure: { systolic: '', diastolic: '' },
        pulseInfo: { pulse: '', pulseUnit: 'PM', pulseType: '' },
        temperatureInfo: { temperature: '', temperatureUnit: 'F', temperatureType: '' },
        weightInfo: {
            weight: '',
            weightUnit: 'KG',
            weightShowInPrescription: ''
        },
        heightInfo: {
            feet: '',
            inch: '',
            heightUnit: 'Ft',
            heightShowInPrescription: ''
        },
        idealWeightInfo: {
            idealWeight: '',
            idealWeightUnit: 'Ft'
        },
        idealBmi: '',
        targetDailyCalory: '',
        diabetes: ''
    },
    ocularExamination: {
        visualAcuity: {
            val: '',
            var: ''
        },
        pl: {
            present: false,
            absent: false,
        },
        fc: '',
        hm: {
            present: false,
            absent: false,
        },
        colorVision: {
            normal: false,
            deficit: false,
            red: false,
            blue: false,
            green: false
        },
        pr: {
            first: false,
            second: false,
            third: false,
            fourth: false
        },
        ocularMotility: {
            od: {
                first: false,
                second: false,
                third: false,
                fourth: false,
                fifth: false,
                sixth: false
            },
            os: {
                first: false,
                second: false,
                third: false,
                fourth: false,
                fifth: false,
                sixth: false
            },
        },
        angleEvaluationBefore: {
            od: {
                first: '',
                second: '',
                third: '',
                fourth: '',
            },
            os: {
                first: '',
                second: '',
                third: '',
                fourth: '',
            }
        },
        angleEvaluationAfter: {
            od: {
                first: '',
                second: '',
                third: '',
                fourth: '',
            },
            os: {
                first: '',
                second: '',
                third: '',
                fourth: '',
            }
        },
        iop: {
            high: '',
            low: ''
        }
    },
    gyneExamination: {
        pae_uterus: '',
        paeUterusNote: '',
        foetalMovementPresent: '',
        foetalMovementAbsent: '',
        foetalMovementNote: '',
        fhsPresent: '',
        fhsAbsent: '',
        fhsNote: '',
        cervixNote: '',
        bmeUterusNote: '',
        fornixNote: '',
    },
    dentalExamination: {
        patientType: 'adult',
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: []
    }
}