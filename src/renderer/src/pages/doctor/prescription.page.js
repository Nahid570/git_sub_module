import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  pagePrintStyle,
  leftOrRightItems,
  separateDateTime,
  isFemaleSelected,
  isExistAnyHistory,
  isExistAnyEyeGlass,
  leftSidePrintStyle,
  isExistAnyRehabData,
  rightSidePrintStyle,
  ageConvertToDateTime,
  getPatientIdForDoctor,
  isExistAnyOnExamination,
  formatOldPrescriptionData,
  isExistAnyInfertilityData,
} from '../../utils/helpers';
import '../../print.css';
import { useReactToPrint } from 'react-to-print';
import { useGetRequest } from '../../hooks/useGetRequest';
import {
  getRequest,
  patchRequest,
  postRequest,
} from '../../utils/axiosRequests';
import { onExaminationData } from '../../pages/doctor/onExaminationData';
import PrescriptionTop from '../../components/doctors/prescriptionTop';
import PrescriptionHeader from '../../components/doctors/prescriptionHeader';
import PrescriptionFooter from '../../components/doctors/prescriptionFooter';
import PatientSection from '../../components/doctors/patientSection';
import ChiefComplainModal from '../../components/doctors/modals/chiefComplain';
import ChiefComplainView from '../../components/doctors/partials/views/chiefComplain';
import HistoryModal from '../../components/doctors/modals/history';
import DiagnosisModal from '../../components/doctors/modals/diagnosis';
import OnExaminationModal from '../../components/doctors/modals/onExamination';
import AdviceModal from '../../components/doctors/modals/advice';
import SpecialNoteModal from '../../components/doctors/modals/specialNote';
import FollowUpModal from '../../components/doctors/modals/followUp';
import RxModal from '../../components/doctors/modals/rx';
import InvestigationModal from '../../components/doctors/modals/investigation';
import EyeGlassModal from '../../components/doctors/modals/eyeGlass';
import Header from '../../components/doctors/partials/Header';
import PrescriptionSaveBtns from '../../components/doctors/partials/prescriptionSaveBtns';
import RxView from '../../components/doctors/partials/rxView';
import DiagnosisView from '../../components/doctors/partials/diagnosisView';
import EyeGlassView from '../../components/doctors/partials/views/eyeGlassView';
import HistoryView from '../../components/doctors/partials/historyView';
import TemplateModal from '../../components/doctors/modals/templateModal';
import RehabilitationView from '../../components/doctors/partials/views/rehabilitationView';
import RehabilitationModal from '../../components/doctors/modals/rehabilitation';
import InfertilityModal from '../../components/doctors/modals/infertility';
import InfertilityView from '../../components/doctors/partials/views/infertility';
import InvestigationView from '../../components/doctors/partials/views/investigation';
import AdviceView from '../../components/doctors/partials/views/advice';
import FollowUpView from '../../components/doctors/partials/views/followUp';
import SpecialNoteView from '../../components/doctors/partials/views/specialNoteView';
import SignatureView from '../../components/doctors/partials/views/signatureView';
import OnExaminationView from '../../components/doctors/partials/views/onExamination';
import loadingImg from '../../img/saved.gif';

function Prescription() {
  const printRef = useRef(null);
  const userInfo = useSelector((state) => state.authReducer.data);
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const header = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.header,
  );
  const footer = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.footer,
  );
  const prescriptionSetting = useSelector(
    (state) =>
      state?.prescriptionReducer?.prescriptionInfo?.prescriptionSettings,
  );
  const isPad = prescriptionSetting?.isPadPrescription;
  const prescriptionItems = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.prescriptionItems,
  );
  const [appointments, setAppointments] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [printStatus, setPrintStatus] = useState(false);
  const location = useLocation();
  const [showChiefComplain, setShowChiefComplain] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [note, setNote] = useState('');
  const [isTemplateModal, setIsTemplateModal] = useState(false);
  const [showOnExamination, setShowOnExamination] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showSpecialNote, setShowSpecialNote] = useState(false);
  const [showInfertility, setShowInfertility] = useState(false);
  const [showRehabilitation, setShowRehabilitation] = useState(false);
  const [showEyeGlass, setShowEyeGlass] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showRx, setShowRx] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [selectedChiefComplains, setSelectedChiefComplains] = useState([]);
  const [selectedComplainGroups, setSelectedComplainGroups] = useState([]);
  const [selectedAdvices, setSelectedAdvices] = useState([]);
  const [selectedAdvicesGroups, setSelectedAdvicesGroups] = useState([]);
  const [specialNote, setSpecialNote] = useState('');
  const [selectedInfertilities, setSelectedInfertilities] = useState({});
  const [selectedHistoryTab, setSelectedHistoryTab] = useState('medical');
  const [selectedOnExaminationTab, setSelectedOnExaminationTab] = useState(
    'observation',
  );
  const [
    selectedInfertilityWomenGroups,
    setSelectedInfertilityWomenGroups,
  ] = useState([]);
  const [
    selectedInfertilityManGroups,
    setSelectedInfertilityManGroups,
  ] = useState([]);
  const [selectedRehabilitation, setSelectedRehabilitation] = useState({
    orthoses: [],
    exercises: [],
    physicalTherapies: [],
  });
  const [selectedFollowUps, setSelectedFollowUps] = useState([]);
  const [selectedEyeGlass, setSelectedEyeGlass] = useState({
    isPlano: false,
    leftPlano: false,
    rightPlano: false,
    r: { sph: '', cyl: '', axis: '' },
    l: { sph: '', cyl: '', axis: '' },
    remarks: [],
  });
  const [selectedDiagnosisGroups, setSelectedDiagnosisGroups] = useState([]);
  const [selectedInvestigations, setSelectedInvestigations] = useState([]);
  const [
    selectedInvestigationGroups,
    setSelectedInvestigationGroups,
  ] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
  const [selectedHistories, setSelectedHistories] = useState({});
  const [selectedOnExamination, setSelectedOnExamination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentStatus, setAppointmentStatus] = useState(false);
  const [editMedicineId, setEditMedicineId] = useState('');
  const currentDate = moment().format('YYYY-MM-DD');
  ///////////////////Medicine related/////////////////////////
  const perPage = 25;
  const [totalItem, setTotalItem] = useState(0);
  const [medicines, setMedicines] = useState([]);
  const [medicinesInSearch, setMedicinesInSearch] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedMedicineGroups, setSelectedMedicineGroups] = useState([]);
  const [medicineGroups, setMedicineGroups] = useState([]);
  //////////////////////////attachments///////////////////////////
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  ////////////////////////////////////////////////////////
  const [patientList, setPatientList] = useState([]);
  const [errors, setErrors] = useState({});
  const [prescriptionId, setPrescriptionId] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [editDob, setEditDob] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    id: '',
    name: '',
    dob: {
      years: '',
      months: '',
      days: '',
      hours: '',
    },
    phoneNumber: '',
    gender: isFemaleSelected(userInfo?.email) ? 'female' : 'male',
    status: 'created',
    nid: '',
    patientId: '',
    doctorId: userInfo.id,
    organizationId: activeOrganization.id,
  });
  const [appointmentInfo, setAppointmentInfo] = useState({
    id: '',
    patientId: '',
    status: '',
    appointmentDateTime: '',
    organizationId: activeOrganization.id,
  });

  const resetPrescription = (templateSelect = false) => {
    setSelectedChiefComplains([]);
    setSelectedComplainGroups([]);
    setSelectedDiagnosis([]);
    setSelectedDiagnosisGroups([]);
    setSelectedAdvices([]);
    setSelectedAdvicesGroups([]);
    setSelectedFollowUps([]);
    setSelectedMedicines([]);
    setSelectedMedicineGroups([]);
    setSelectedInvestigations([]);
    setSelectedInvestigationGroups([]);
    setSelectedInfertilities({});
    setSelectedInfertilityManGroups([]);
    setSelectedInfertilityWomenGroups([]);
    setSelectedEyeGlass({
      isPlano: false,
      leftPlano: false,
      r: { sph: '', cyl: '', axis: '' },
      l: { sph: '', cyl: '', axis: '' },
      remarks: [],
    });
    setSelectedRehabilitation({
      orthoses: [],
      exercises: [],
      physicalTherapies: [],
    });
    setSelectedHistories({});
    setSelectedOnExamination({});
    if (!templateSelect) {
      setPatientInfo({
        ...patientInfo,
        id: '',
        name: '',
        dob: {},
        phoneNumber: '',
        gender: isFemaleSelected(userInfo?.email) ? 'female' : 'male',
        status: 'created',
        nid: '',
        patientId: '',
        doctorId: userInfo.id,
        organizationId: activeOrganization.id,
      });
    }
    setAppointmentInfo({
      id: '',
      patientId: '',
      status: '',
      appointmentDateTime: '',
      organizationId: activeOrganization.id,
      reset: false,
    });
    setPrescriptionId('');
    setEditDob(null);
    setSpecialNote('');
  };

  const callbackPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const settingPatientData = (patient) => {
    setPatientInfo({
      ...patientInfo,
      id: patient?.id,
      name: patient?.name,
      dob: patient?.dob,
      gender: patient?.gender,
      phoneNumber: patient?.phoneNumber,
      patientId: getPatientIdForDoctor(patient?.patientIdForDoctor, userInfo),
    });
  };

  useEffect(() => {
    const history = location?.state?.history;
    setEditDob(location?.state?.dob);
    if (history === 'editFromHistory') {
      let patientHistory = location?.state?.prescription;
      let patientData = patientHistory?.patientId;
      patientData.dob = separateDateTime(patientData?.dob);
      settingPatientData(patientData);
      setSpecialNote(patientHistory?.specialNote);
      setNote(location?.state?.note);

      setAppointmentInfo({
        id: patientHistory?.appointmentId?.id,
        patientId: patientHistory?.patientId?.id,
        status: 'completed',
        appointmentDateTime: patientHistory?.appointmentId?.appointmentDateTime,
        organizationId: activeOrganization.id,
      });
      setPrescriptionId(patientHistory.id);
      setAppointmentDateTime(
        patientHistory?.appointmentId?.appointmentDateTime,
      );
      patientHistory?.chiefComplains
        ? setSelectedChiefComplains([...patientHistory?.chiefComplains])
        : setSelectedChiefComplains([]);
      patientHistory?.diagnoses
        ? setSelectedDiagnosis([...patientHistory?.diagnoses])
        : setSelectedDiagnosis([]);
      patientHistory?.advices
        ? setSelectedAdvices([...patientHistory?.advices])
        : setSelectedAdvices([]);
      patientHistory?.followUps
        ? setSelectedFollowUps([...patientHistory?.followUps])
        : setSelectedFollowUps([]);
      setSelectedMedicines([...patientHistory?.medicines]);
      patientHistory?.histories
        ? setSelectedHistories({ ...patientHistory?.histories })
        : setSelectedHistories({});
      patientHistory?.onExaminations
        ? setSelectedOnExamination({ ...patientHistory?.onExaminations })
        : setSelectedOnExamination({});
      patientHistory?.investigations
        ? setSelectedInvestigations([...patientHistory?.investigations])
        : setSelectedInvestigations([]);
      patientHistory?.eyeGlass
        ? setSelectedEyeGlass({ ...patientHistory?.eyeGlass })
        : setSelectedEyeGlass({});
      patientHistory?.infertilities
        ? setSelectedInfertilities({ ...patientHistory?.infertilities })
        : setSelectedInfertilities({});
      patientHistory?.rehabilitation
        ? setSelectedRehabilitation({ ...patientHistory?.rehabilitation })
        : setSelectedRehabilitation({});
      const rehabData = patientHistory?.rehabilitation
        ? patientHistory.rehabilitation
        : selectedRehabilitation;
      setSelectedRehabilitation({ ...rehabData });
    } else if (history === 'editFromList') {
      let appointmentData = location?.state?.appointmentInfo;
      let patientData = appointmentData?.patientId;
      patientData.dob = separateDateTime(patientData?.dob);
      settingPatientData(patientData);

      setAppointmentInfo({
        id: appointmentData?.id,
        patientId: appointmentData?.patientId?.id,
        status: 'completed',
        appointmentDateTime: appointmentData?.appointmentDateTime,
        organizationId: activeOrganization.id,
      });
      setAppointmentDateTime(appointmentData?.appointmentDateTime);
    } else if (history === 'new') {
      setPatientInfo({
        ...location?.state?.patientData,
        dob: separateDateTime(location?.state?.patientData?.dob),
        status: 'created',
        doctorId: userInfo.id,
        organizationId: activeOrganization.id,
      });
    } else if (history === 'completed') {
      let appointment = location?.state?.appointmentInfo;
      let patientData = appointment?.patientId;
      patientData.dob = separateDateTime(patientData?.dob);
      settingPatientData(patientData);
      setSpecialNote(patientData?.specialNote);

      setAppointmentInfo({
        ...appointmentInfo,
        id: appointment.id,
        patientId: appointment.patientId.id,
        status: appointment.status,
        appointmentDateTime: appointment.appointmentDateTime,
      });
    } else if (history === 'onlyAppointment') {
      let appointment = location?.state?.appointment;
      let patientData = appointment?.patientId;
      patientData.dob = separateDateTime(patientData?.dob);
      settingPatientData(patientData);
      appointmentInfo.id = appointment?.id;
      appointmentInfo.patientId = appointment?.patientId.id;
      appointmentInfo.status = appointment?.status;
      appointmentInfo.appointmentDateTime = appointment?.appointmentDateTime;
      setAppointmentInfo({ ...appointmentInfo });
    }
    getAppointments();
  }, []);

  useEffect(() => {
    if (patientInfo?.search === 'yes') {
      setSelectedChiefComplains([]);
      setSelectedDiagnosis([]);
      setSelectedMedicines([]);
      setSelectedAdvices([]);
      setSelectedFollowUps([]);
      setSelectedEyeGlass({
        isPlano: false,
        leftPlano: false,
        r: { sph: '', cyl: '', axis: '' },
        l: { sph: '', cyl: '', axis: '' },
        remarks: [],
      });
      setSelectedRehabilitation({
        orthoses: [],
        exercises: [],
        physicalTherapies: [],
      });
      setSelectedHistories({});
      setSelectedOnExamination(onExaminationData);
      setSelectedInvestigations([]);
      // get last prescription info
      if (patientInfo?.id !== '') {
        getPatientPrescriptionLast();
      }
    }
  }, [patientInfo]);

  useEffect(() => {
    if (
      location?.state?.appointmentInfo?.id &&
      location?.state?.appointmentInfo?.patientId?.id &&
      appointmentInfo?.reset !== false
    ) {
      getPatientAppointmentAndPrescription();
    }
  }, [appointmentInfo]);

  const {
    isLoading: isMedicineLoading,
    refetch: getMedicineList,
  } = useGetRequest(
    'getMedicines',
    `medicines?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setMedicines([...medicines, ...data.data]);
      } else {
        setMedicines(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  const {
    isLoading: isInstructionLoading,
    refetch: getInstructionList,
  } = useGetRequest(
    'instructionList',
    `instructions`,
    (data) => {
      setInstructions(data.data);
    },
    (e) => {
      console.log(e);
    },
  );
  useEffect(() => {
    getMedicineList();
  }, [currentPage]);

  useEffect(() => {
    getInstructionList();
    getRequest('prescriptions/groups?organizationId=' + activeOrganization.id)
      .then((data) => {
        setMedicineGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePrintStatus = (status) => {
    setPrintStatus(status);
  };
  const closeOnExaminationModal = () => {
    setShowOnExamination(false);
  };
  const handleOnExaminations = (selectedOnExaminations) => {
    setSelectedOnExamination({ ...selectedOnExaminations });
  };

  const settingPrescriptionData = (prescription) => {
    resetPrescription(true);
    setPrescriptionData(prescription);
  };

  const setPrescriptionData = (prescription) => {
    prescription?.chiefComplains
      ? setSelectedChiefComplains([...prescription?.chiefComplains])
      : setSelectedChiefComplains([]);
    prescription?.diagnoses
      ? setSelectedDiagnosis([...prescription?.diagnoses])
      : setSelectedDiagnosis([]);
    prescription?.advices
      ? setSelectedAdvices([...prescription?.advices])
      : setSelectedAdvices([]);
    prescription?.followUps
      ? setSelectedFollowUps([...prescription?.followUps])
      : setSelectedFollowUps([]);
    // prescription?.medicines
    //   ? setSelectedMedicines([...prescription?.medicines])
    //   : setSelectedMedicines([]);
    prescription?.medicines
      ? setSelectedMedicines([
          ...formatOldPrescriptionData(prescription?.medicines),
        ])
      : setSelectedMedicines([]);
    prescription?.histories
      ? setSelectedHistories({ ...prescription?.histories })
      : setSelectedHistories({});
    prescription?.onExaminations
      ? setSelectedOnExamination({ ...prescription?.onExaminations })
      : setSelectedOnExamination({});
    prescription?.infertilities
      ? setSelectedInfertilities({ ...prescription?.infertilities })
      : setSelectedInfertilities({});
    prescription?.investigations
      ? setSelectedInvestigations([...prescription?.investigations])
      : setSelectedInvestigations([]);
    prescription?.eyeGlass
      ? setSelectedEyeGlass({ ...prescription?.eyeGlass })
      : setSelectedEyeGlass({});
    prescription?.rehabilitation
      ? setSelectedRehabilitation({ ...prescription?.rehabilitation })
      : setSelectedRehabilitation({});
  };

  const getPatientPrescriptionLast = () => {
    const url = `prescriptions?organizationId=${activeOrganization.id}&patientId=${patientInfo.id}`;
    getRequest(url)
      .then((data) => {
        let content = data.data;
        let length = content.length;
        if (length) {
          let prescription =
            length > 0 ? (length === 1 ? content[0] : content[length - 1]) : {};
          setPrescriptionId(prescription.id);
          setPrescriptionData(prescription);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    isLoading: isAppointmentLoading,
    refetch: getAppointments,
  } = useGetRequest(
    'get-appointments',
    `appointments?organizationId=${activeOrganization.id}&doctorId=${userInfo.id}&appointmentStatus=new&startDate=${currentDate}&endDate=${currentDate}`,
    (data) => {
      setAppointments(data.appointments);
      setAppointmentCount(data.total);
    },
    (e) => {
      console.log(e.message);
    },
  );
  const {
    isLoading: isPatientAppointment,
    refetch: getPatientAppointmentAndPrescription,
  } = useGetRequest(
    'getPatientLastPrescription',
    'prescriptions?organizationId=' +
      activeOrganization.id +
      '&appointmentId=' +
      location?.state?.appointmentInfo?.id +
      '&patientId=' +
      location?.state?.appointmentInfo?.patientId?.id,
    (data) => {
      let content = data.data;
      let length = content.length;
      if (length) {
        let prescription =
          length > 0 ? (length === 1 ? content[0] : content[length - 1]) : {};
        setPrescriptionId(prescription?.id);
        setPrescriptionData(prescription);
        setSpecialNote(prescription?.specialNote);
        setNote(data?.note?.note);
      }
    },
    (error) => {
      console.log(error, 'error');
    },
  );

  const handleSubmit = async (submitType) => {
    toast.dismiss();
    setLoadingStatus(true);
    if (
      patientInfo.id === '' ||
      patientInfo.search === 'yes' ||
      patientInfo.status === 'created'
    ) {
      patientInfo.organizationId = activeOrganization.id;
      patientInfo.dob = patientInfo.id
        ? editDob
        : ageConvertToDateTime(patientInfo.dob);

      await postRequest('patients', patientInfo)
        .then((data) => {
          patientInfo.dob = patientInfo.id
            ? separateDateTime(data.dob)
            : separateDateTime(data.dob, 'new');
          patientInfo.id = data.id;
          patientInfo.patientId = data?.patientId;
          patientInfo.patientIdForDoctor = data?.patientIdForDoctor;
          setEditDob(data.dob);
          settingPatientData(patientInfo);
          appointmentInfo.patientId = data.id;
          setAppointmentInfo({
            ...appointmentInfo,
            reset: false,
          });
        })
        .catch((error) => {
          setLoadingStatus(false);
          const errorMsg = error.message.split(',');
          toast.error(errorMsg[0], {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }

    if (patientInfo.id !== '' && appointmentInfo.status !== 'new') {
      appointmentInfo.status = 'completed';
      appointmentInfo.organizationId = activeOrganization.id;
      appointmentInfo.appointmentDateTime = moment().format('YYYY-MM-DD HH:mm');

      const requestUrl =
        appointmentInfo.id &&
        moment(appointmentDateTime).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD')
          ? patchRequest('appointments/' + appointmentInfo.id, appointmentInfo)
          : postRequest('appointments', appointmentInfo);

      await requestUrl
        .then((data) => {
          appointmentInfo.id = data.id;
          setAppointmentInfo({
            ...appointmentInfo,
            reset: false,
          });
          setAppointmentStatus(data.status);
          setAppointmentDateTime(data.appointmentDateTime);
        })
        .catch((error) => {
          setLoadingStatus(false);
          console.log(error);
        });
    }
    let formData = new FormData();
    if (appointmentInfo.id !== '') {
      let prescriptionArr = {
        patientId: patientInfo.id,
        appointmentId: appointmentInfo.id,
        note: { note },
        organizationId: activeOrganization.id,
        chiefComplains: selectedChiefComplains,
        onExaminations: selectedOnExamination,
        diagnoses: selectedDiagnosis,
        histories: selectedHistories,
        medicines: selectedMedicines,
        advices: selectedAdvices,
        rehabilitation: selectedRehabilitation,
        followUps: selectedFollowUps,
        investigations: selectedInvestigations,
        eyeGlass: selectedEyeGlass,
        infertilities: selectedInfertilities,
        specialNote: specialNote,
        medicineIds: selectedMedicines.length
          ? selectedMedicines.map((item) => item.id)
          : [],
      };
      const requestPrescription =
        prescriptionId &&
        moment(appointmentDateTime).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD')
          ? patchRequest('prescriptions/' + prescriptionId, prescriptionArr)
          : postRequest('prescriptions', prescriptionArr);

      await requestPrescription
        .then((data) => {
          setAppointmentStatus('completed');
          // setNote('');
          if (file) {
            formData.append('name', title);
            formData.append('patientId', patientInfo.id);
            formData.append('prescriptionId', data.id);
            formData.append('file', file);
            handleSubmitAttachment(formData);
          }
          setPrescriptionId(data.id);

          if (submitType === 'saveAndPrint') {
            setLoadingStatus(false);
            callbackPrint();
          } else {
            // toast.success('Successfully created', {
            //   position: toast.POSITION.TOP_RIGHT,
            // });
            setTimeout(function () {
              setLoadingStatus(false);
            }, 1500);
          }
        })
        .catch((error) => {
          setLoadingStatus(false);
          console.log(error);
        });
    }
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handleSubmitAttachment = (formData) => {
    postRequest('attachments', formData).then((data) => {
      console.log(data);
    });
  };

  const actualWidth = prescriptionSetting?.page?.width?.quantity;

  const closeModalOutside = () => {
    setShowChiefComplain(false);
    setShowHistory(false);
    setShowInvestigation(false);
    setShowOnExamination(false);
    setShowDiagnosis(false);
    setShowAdvice(false);
    setShowInfertility(false);
    setShowRx(false);
    setShowFollowUp(false);
    setShowEyeGlass(false);
    setShowRehabilitation(false);
    setShowSpecialNote(false);
    setEditMedicineId('');
    setSelectedOnExaminationTab('observation');
  };

  const deletePrescriptionItem = (type, itemId) => {
    if (type === 'diagnosis') {
      setSelectedDiagnosis(
        selectedDiagnosis.filter((diagnosis) => diagnosis.id !== itemId),
      );
    } else if (type === 'investigation') {
      setSelectedInvestigations(
        selectedInvestigations.filter(
          (investigation) => investigation.name !== itemId,
        ),
      );
    } else if (type === 'chiefComplain') {
      setSelectedChiefComplains(
        selectedChiefComplains.filter((chief) => chief.name !== itemId),
      );
    } else if (type === 'rx') {
      const result = selectedMedicines.filter(
        (medicine) => medicine.id !== itemId,
      );
      setSelectedMedicines([...result]);
    } else if (type === 'advice') {
      setSelectedAdvices(
        selectedAdvices.filter((advice) => advice.id !== itemId),
      );
    } else if (type === 'followup') {
      setSelectedFollowUps(
        selectedFollowUps.filter((followup) => followup !== itemId),
      );
    } else if (type === 'onExamination') {
      const observations = [
        ...selectedOnExamination.observations.filter(
          (observation) => observation.name !== itemId,
        ),
      ];
      selectedOnExamination.observations = observations;
      setSelectedOnExamination({ ...selectedOnExamination });
    } else if (type === 'eyeGlassTable') {
      setSelectedEyeGlass({
        isPlano: false,
        leftPlano: false,
        r: { sph: '', cyl: '', axis: '' },
        l: { sph: '', cyl: '', axis: '' },
        remarks: [],
      });
    } else if (type === 'eyeGlassRemark') {
      const result = selectedEyeGlass.remarks.filter(
        (remark) => remark !== itemId,
      );
      setSelectedEyeGlass({ ...selectedEyeGlass, remarks: result });
    }
  };

  const chiefComplainView = (element, type) => {
    if (type === 'print' && selectedChiefComplains.length === 0) {
      return false;
    }
    return (
      <ChiefComplainView
        element={element}
        prescriptionItems={prescriptionItems}
        setShowChiefComplain={setShowChiefComplain}
        selectedChiefComplains={selectedChiefComplains}
        deletePrescriptionItem={deletePrescriptionItem}
      />
    );
  };

  const historyView = (element, type) => {
    if (type === 'print' && !isExistAnyHistory(selectedHistories)) {
      return false;
    }
    return (
      <HistoryView
        element={element}
        setShowHistory={setShowHistory}
        selectedHistories={selectedHistories}
        setSelectedHistories={setSelectedHistories}
        deletePrescriptionItem={deletePrescriptionItem}
        prescriptionItems={prescriptionItems}
      />
    );
  };

  // const onExaminationView = (element, type) => {
  //   if (type === 'print' && !isExistAnyOnExamination(selectedOnExamination)) {
  //     return false;
  //   }
  //   return (
  //     <div
  //       className={`row item-row ${
  //         !isExistAnyOnExamination(selectedOnExamination) ? 'pb-5' : 'pb-2'
  //       }`}
  //       key={`onExamination`}
  //     >
  //       <div
  //         className="prescription-item"
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           setShowOnExamination(true);
  //         }}
  //       >
  //         {element?.alterName?.length ? (
  //           <span>{element?.alterName}</span>
  //         ) : (
  //           <span>On Examinations +</span>
  //         )}
  //       </div>
  //       <div className="on-examination-view-area">
  //         {isExistObservationData(
  //           selectedOnExamination?.observations,
  //           'observation',
  //         ) && (
  //           <ObservationView
  //             selectedOnExamination={selectedOnExamination}
  //             deletePrescriptionItem={deletePrescriptionItem}
  //             prescriptionItems={prescriptionItems}
  //           />
  //         )}
  //         {isExistGeneralExaminationData(
  //           selectedOnExamination?.generalExaminations,
  //         ) && (
  //           <GeneralExaminationView
  //             selectedOnExamination={selectedOnExamination}
  //             setSelectedOnExamination={setSelectedOnExamination}
  //             prescriptionItems={prescriptionItems}
  //           />
  //         )}
  //         <OcularExaminationView
  //           selectedOnExamination={selectedOnExamination}
  //           setSelectedOnExamination={setSelectedOnExamination}
  //           prescriptionItems={prescriptionItems}
  //         />

  //         {isExistAnyCardiologyData(
  //           selectedOnExamination?.systemicExamination,
  //         ) && (
  //           <SystemicExaminationView
  //             selectedOnExamination={selectedOnExamination}
  //             setSelectedOnExamination={setSelectedOnExamination}
  //             prescriptionItems={prescriptionItems}
  //           />
  //         )}

  //         {(isExistAnyGyneData(selectedOnExamination?.gyneExamination) ||
  //           isExistAnyGyneData(selectedOnExamination?.breastExamination)) && (
  //           <GyneExaminationView
  //             selectedOnExamination={selectedOnExamination}
  //             setSelectedOnExamination={setSelectedOnExamination}
  //             prescriptionItems={prescriptionItems}
  //           />
  //         )}

  //         {isExistAnyDentalData(selectedOnExamination?.dentalExamination) && (
  //           <DentalView
  //             selectedOnExamination={selectedOnExamination}
  //             setSelectedOnExamination={setSelectedOnExamination}
  //             prescriptionItems={prescriptionItems}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  const onExaminationView = (element, type) => {
    if (type === 'print' && !isExistAnyOnExamination(selectedOnExamination)) {
      return false;
    }
    return (
      <OnExaminationView
        element={element}
        deletePrescriptionItem={deletePrescriptionItem}
        selectedOnExamination={selectedOnExamination}
        setShowOnExamination={setShowOnExamination}
        prescriptionItems={prescriptionItems}
        setSelectedOnExamination={setSelectedOnExamination}
      />
    );
  };

  const investigationView = (element, type) => {
    if (type === 'print' && selectedInvestigations.length === 0) {
      return false;
    }
    return (
      <InvestigationView
        element={element}
        prescriptionItems={prescriptionItems}
        setShowInvestigation={setShowInvestigation}
        selectedInvestigations={selectedInvestigations}
        deletePrescriptionItem={deletePrescriptionItem}
      />
    );
  };

  const adviceView = (element, type) => {
    if (type === 'print' && selectedAdvices.length === 0) {
      return false;
    }
    return (
      <AdviceView
        element={element}
        prescriptionItems={prescriptionItems}
        setShowAdvice={setShowAdvice}
        selectedAdvices={selectedAdvices}
        deletePrescriptionItem={deletePrescriptionItem}
      />
    );
  };

  const followUpView = (element, type) => {
    if (type === 'print' && selectedFollowUps.length === 0) {
      return false;
    }
    return (
      <FollowUpView
        element={element}
        prescriptionItems={prescriptionItems}
        setShowFollowUp={setShowFollowUp}
        selectedFollowUps={selectedFollowUps}
        deletePrescriptionItem={deletePrescriptionItem}
      />
    );
  };

  const eyeGlassView = (element, type) => {
    if (type === 'print' && !isExistAnyEyeGlass(selectedEyeGlass)) {
      return false;
    }
    return (
      <EyeGlassView
        selectedEyeGlass={selectedEyeGlass}
        setSelectedEyeGlass={setSelectedEyeGlass}
        setShowEyeGlass={setShowEyeGlass}
        deletePrescriptionItem={deletePrescriptionItem}
        element={element}
      />
    );
  };

  const viewDiagnosis = (element, type) => {
    if (type === 'print' && selectedDiagnosis.length === 0) {
      return false;
    }
    return (
      <DiagnosisView
        selectedDiagnosis={selectedDiagnosis}
        setShowDiagnosis={setShowDiagnosis}
        prescriptionItems={prescriptionItems}
        deletePrescriptionItem={deletePrescriptionItem}
        element={element}
      />
    );
  };

  const viewRehabilitation = (element, type) => {
    if (type === 'print' && !isExistAnyRehabData(selectedRehabilitation)) {
      return false;
    }
    return (
      <RehabilitationView
        selectedRehabilitation={selectedRehabilitation}
        setSelectedRehabilitation={setSelectedRehabilitation}
        setShowRehabilitation={setShowRehabilitation}
        element={element}
      />
    );
  };

  const viewRx = (element, type) => {
    if (type === 'print' && selectedMedicines.length === 0) {
      return false;
    }
    return (
      <RxView
        selectedMedicines={selectedMedicines}
        setSelectedMedicines={setSelectedMedicines}
        setShowRx={setShowRx}
        deletePrescriptionItem={deletePrescriptionItem}
        instructions={instructions}
        setInstructions={setInstructions}
        editMedicineId={editMedicineId}
        prescriptionItems={prescriptionItems}
        setEditMedicineId={setEditMedicineId}
        element={element}
        type={type}
      />
    );
  };

  const infertilityView = (element, type) => {
    if (type === 'print' && !isExistAnyInfertilityData(selectedInfertilities)) {
      return false;
    }
    return (
      <InfertilityView
        element={element}
        setShowInfertility={setShowInfertility}
        selectedInfertilities={selectedInfertilities}
        setSelectedInfertilities={setSelectedInfertilities}
      />
    );
  };

  const specialNoteView = (element, type) => {
    if (type === 'print' && specialNote === '') {
      return false;
    }
    return (
      <SpecialNoteView
        specialNote={specialNote}
        setSpecialNote={setSpecialNote}
        setShowSpecialNote={setShowSpecialNote}
        prescriptionItems={prescriptionItems}
        deletePrescriptionItem={deletePrescriptionItem}
        element={element}
      />
    );
  };

  const signatureView = (type) => {
    if (type === 'print' && !userInfo?.signature) {
      return false;
    }
    return <SignatureView userInfo={userInfo} isPrescription={true} />;
  };

  return (
    <div
      onClick={() => {
        closeModalOutside();
      }}
    >
      <Header />
      <div className="container-fluid">
        <PrescriptionTop
          printRef={printRef}
          title={title}
          setTitle={setTitle}
          file={file}
          setFile={setFile}
          resetPrescription={resetPrescription}
          handlePrintStatus={handlePrintStatus}
          settingPrescriptionData={settingPrescriptionData}
          appointments={appointments}
          prescriptionId={prescriptionId}
          appointmentCount={appointmentCount}
          patientInfo={patientInfo}
          appointmentStatus={appointmentStatus}
          note={note}
          setNote={setNote}
          // isNoteModal={isNoteModal}
          // setIsNoteModal={setIsNoteModal}
        />
        <Row className="rx-body">
          <small className="v-error">{getErrorMessage('name')}</small>
          <div className="col-xl-12 col-md-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* card body normal view */}
              <div className="card-body normal-card-body">
                {loadingStatus && (
                  <div className="saved-image-over">
                    <img src={loadingImg} height={200} width={200} />
                  </div>
                )}
                <PrescriptionHeader
                  headerInfo={header}
                  prescriptionSetting={prescriptionSetting}
                />
                <PatientSection
                  patientInfo={patientInfo}
                  patientList={patientList}
                  appointmentInfo={appointmentInfo}
                  prescriptionSetting={prescriptionSetting}
                  setPatientInfo={setPatientInfo}
                  selectedOnExamination={selectedOnExamination}
                  setSelectedOnExamination={setSelectedOnExamination}
                  actualWidth={actualWidth}
                  isPad={isPad}
                />
                <div className="row pl-2 pr-2 pb-3 prescription-body-print">
                  {leftOrRightItems(prescriptionItems, 'left').length > 0 && (
                    <div
                      className={`prescription-body-left ${
                        isPad ? '' : 'blank-prescription-print-left'
                      }`}
                      style={{ paddingLeft: '28px', width: '35%' }}
                    >
                      {leftOrRightItems(prescriptionItems, 'left').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(element);
                          } else if (element.name === 'history') {
                            return historyView(element);
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(element);
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element);
                          } else if (element.name === 'investigation') {
                            return investigationView(element);
                          } else if (element.name === 'rx') {
                            return viewRx(element);
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(element);
                          } else if (element.name === 'advice') {
                            return adviceView(element);
                          } else if (element.name === 'follow-up') {
                            return followUpView(element);
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element);
                          } else if (element.name === 'infertility') {
                            return infertilityView(element);
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element);
                          } else if (element.name === 'signature') {
                            return signatureView(element);
                          }
                        },
                      )}
                    </div>
                  )}
                  {leftOrRightItems(prescriptionItems, 'right').length > 0 && (
                    <div
                      className={`prescription-body-right ${
                        isPad ? '' : 'blank-prescription-print-right'
                      }`}
                      style={{ paddingLeft: '25px', width: '60%' }}
                    >
                      {leftOrRightItems(prescriptionItems, 'right').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(element);
                          } else if (element.name === 'history') {
                            return historyView(element);
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(element);
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element);
                          } else if (element.name === 'investigation') {
                            return investigationView(element);
                          } else if (element.name === 'rx') {
                            return viewRx(element);
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(element);
                          } else if (element.name === 'advice') {
                            return adviceView(element);
                          } else if (element.name === 'follow-up') {
                            return followUpView(element);
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element);
                          } else if (element.name === 'infertility') {
                            return infertilityView(element);
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element);
                          } else if (element.name === 'signature') {
                            return signatureView(element);
                          }
                        },
                      )}
                    </div>
                  )}
                </div>

                <hr style={{ backgroundColor: '#FBFBFB' }} className="hr" />
                <PrescriptionFooter
                  footerInfo={footer}
                  prescriptionSetting={prescriptionSetting}
                  printStatus={printStatus}
                />
              </div>

              {/* card body print view */}
              <div
                className={`
                  card-body print-card-body
                  ${isPad ? '' : 'blank-prescription-card-body'}`}
                style={
                  isPad ? pagePrintStyle(prescriptionSetting, actualWidth) : {}
                }
                ref={printRef}
              >
                <PrescriptionHeader
                  headerInfo={header}
                  prescriptionSetting={prescriptionSetting}
                />
                <PatientSection
                  patientInfo={patientInfo}
                  appointmentInfo={appointmentInfo}
                  patientList={patientList}
                  prescriptionSetting={prescriptionSetting}
                  setPatientInfo={setPatientInfo}
                  selectedOnExamination={selectedOnExamination}
                  setSelectedOnExamination={setSelectedOnExamination}
                  isPad={isPad}
                />
                <div className="row prescription-body-print">
                  {leftOrRightItems(prescriptionItems, 'left').length > 0 && (
                    <div
                      style={
                        isPad ? leftSidePrintStyle(prescriptionSetting) : {}
                      }
                      className={`prescription-body-left
                        ${
                          prescriptionSetting?.prescriptionBody
                            ?.verticalLineBorder
                            ? 'vertical-line-print'
                            : ''
                        }
                        ${isPad ? '' : 'blank-prescription-print-left'}`}
                    >
                      {leftOrRightItems(prescriptionItems, 'left').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(element, 'print');
                          } else if (element.name === 'history') {
                            return historyView(element, 'print');
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(element, 'print');
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element, 'print');
                          } else if (element.name === 'investigation') {
                            return investigationView(element, 'print');
                          } else if (element.name === 'rx') {
                            return viewRx(element, 'print');
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(element, 'print');
                          } else if (element.name === 'advice') {
                            return adviceView(element, 'print');
                          } else if (element.name === 'follow-up') {
                            return followUpView(element, 'print');
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element, 'print');
                          } else if (element.name === 'infertility') {
                            return infertilityView(element, 'print');
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element, 'print');
                          } else if (element.name === 'signature') {
                            return signatureView(element, 'print');
                          }
                        },
                      )}
                    </div>
                  )}
                  {leftOrRightItems(prescriptionItems, 'right').length > 0 && (
                    <div
                      style={
                        isPad ? rightSidePrintStyle(prescriptionSetting) : {}
                      }
                      className={`prescription-body-right
                            ${isPad ? '' : 'blank-prescription-print-right'}`}
                    >
                      {leftOrRightItems(prescriptionItems, 'right').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(element, 'print');
                          } else if (element.name === 'history') {
                            return historyView(element, 'print');
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(element, 'print');
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element, 'print');
                          } else if (element.name === 'investigation') {
                            return investigationView(element, 'print');
                          } else if (element.name === 'rx') {
                            return viewRx(element, 'print');
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(element, 'print');
                          } else if (element.name === 'advice') {
                            return adviceView(element, 'print');
                          } else if (element.name === 'follow-up') {
                            return followUpView(element, 'print');
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element, 'print');
                          } else if (element.name === 'infertility') {
                            return infertilityView(element, 'print');
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element, 'print');
                          } else if (element.name === 'signature') {
                            return signatureView(element, 'print');
                          }
                        },
                      )}
                    </div>
                  )}
                </div>

                <PrescriptionFooter
                  footerInfo={footer}
                  prescriptionSetting={prescriptionSetting}
                  printStatus={printStatus}
                />
              </div>
            </div>
          </div>
        </Row>
        <ChiefComplainModal
          showChiefComplain={showChiefComplain}
          setShowChiefComplain={setShowChiefComplain}
          selectedChiefComplains={selectedChiefComplains}
          setSelectedChiefComplains={setSelectedChiefComplains}
          selectedComplainGroups={selectedComplainGroups}
          setSelectedComplainGroups={setSelectedComplainGroups}
        />
        <HistoryModal
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          selectedHistories={selectedHistories}
          setSelectedHistories={setSelectedHistories}
          selectedHistoryTab={selectedHistoryTab}
          setSelectedHistoryTab={setSelectedHistoryTab}
        />
        <InvestigationModal
          showInvestigation={showInvestigation}
          setShowInvestigation={setShowInvestigation}
          selectedInvestigations={selectedInvestigations}
          setSelectedInvestigations={setSelectedInvestigations}
          selectedInvestigationGroups={selectedInvestigationGroups}
          setSelectedInvestigationGroups={setSelectedInvestigationGroups}
        />
        <OnExaminationModal
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          showOnExamination={showOnExamination}
          setShowOnExamination={setShowOnExamination}
          onExaminationModalClose={closeOnExaminationModal}
          handleOnExaminations={handleOnExaminations}
          selectedOnExamination={selectedOnExamination}
          selectedOnExaminationTab={selectedOnExaminationTab}
          setSelectedOnExaminationTab={setSelectedOnExaminationTab}
        />
        <DiagnosisModal
          showDiagnosis={showDiagnosis}
          setShowDiagnosis={setShowDiagnosis}
          selectedDiagnosis={selectedDiagnosis}
          setSelectedDiagnosis={setSelectedDiagnosis}
          selectedDiagnosisGroups={selectedDiagnosisGroups}
          setSelectedDiagnosisGroups={setSelectedDiagnosisGroups}
        />
        <AdviceModal
          showAdvice={showAdvice}
          setShowAdvice={setShowAdvice}
          selectedAdvices={selectedAdvices}
          setSelectedAdvices={setSelectedAdvices}
          selectedAdvicesGroups={selectedAdvicesGroups}
          setSelectedAdvicesGroups={setSelectedAdvicesGroups}
        />
        <FollowUpModal
          showFollowUp={showFollowUp}
          setShowFollowUp={setShowFollowUp}
          selectedFollowUps={selectedFollowUps}
          setSelectedFollowUps={setSelectedFollowUps}
        />
        <RxModal
          showRx={showRx}
          setShowRx={setShowRx}
          medicines={medicines}
          setMedicines={setMedicines}
          medicinesInSearch={medicinesInSearch}
          selectedMedicines={selectedMedicines}
          setSelectedMedicines={setSelectedMedicines}
          setMedicinesInSearch={setMedicinesInSearch}
          instructions={instructions}
          setInstructions={setInstructions}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalItem={totalItem}
          perPage={perPage}
          selectedMedicineGroups={selectedMedicineGroups}
          setSelectedMedicineGroups={setSelectedMedicineGroups}
          medicineGroups={medicineGroups}
          setMedicineGroups={setMedicineGroups}
        />
        <RehabilitationModal
          showRehabilitation={showRehabilitation}
          setShowRehabilitation={setShowRehabilitation}
          selectedRehabilitation={selectedRehabilitation}
          setSelectedRehabilitation={setSelectedRehabilitation}
        />
        <EyeGlassModal
          showEyeGlass={showEyeGlass}
          setShowEyeGlass={setShowEyeGlass}
          selectedEyeGlass={selectedEyeGlass}
          setSelectedEyeGlass={setSelectedEyeGlass}
          deletePrescriptionItem={deletePrescriptionItem}
        />
        <InvestigationModal
          showInvestigation={showInvestigation}
          setShowInvestigation={setShowInvestigation}
          selectedInvestigations={selectedInvestigations}
          setSelectedInvestigations={setSelectedInvestigations}
          selectedInvestigationGroups={selectedInvestigationGroups}
          setSelectedInvestigationGroups={setSelectedInvestigationGroups}
        />

        <InfertilityModal
          showInfertility={showInfertility}
          setShowInfertility={setShowInfertility}
          selectedInfertilities={selectedInfertilities}
          setSelectedInfertilities={setSelectedInfertilities}
          selectedInfertilityWomenGroups={selectedInfertilityWomenGroups}
          setSelectedInfertilityWomenGroups={setSelectedInfertilityWomenGroups}
          selectedInfertilityManGroups={selectedInfertilityManGroups}
          setSelectedInfertilityManGroups={setSelectedInfertilityManGroups}
        />
        <SpecialNoteModal
          showSpecialNote={showSpecialNote}
          setShowSpecialNote={setShowSpecialNote}
          specialNote={specialNote}
          setSpecialNote={setSpecialNote}
        />
      </div>
      <TemplateModal
        isTemplateModal={isTemplateModal}
        setIsTemplateModal={setIsTemplateModal}
        templateInput={{
          note: { note },
          organizationId: activeOrganization.id,
          chiefComplains: selectedChiefComplains,
          onExaminations: selectedOnExamination,
          diagnoses: selectedDiagnosis,
          histories: selectedHistories,
          medicines: selectedMedicines,
          rehabilitation: selectedRehabilitation,
          advices: selectedAdvices,
          followUps: selectedFollowUps,
          investigations: selectedInvestigations,
          eyeGlass: selectedEyeGlass,
          medicineIds: selectedMedicines.length
            ? selectedMedicines.map((item) => item.id)
            : [],
        }}
      />

      <PrescriptionSaveBtns
        loadingStatus={loadingStatus}
        resetPrescription={resetPrescription}
        handleSubmit={handleSubmit}
        isTemplateModal={isTemplateModal}
        setIsTemplateModal={setIsTemplateModal}
      />
    </div>
  );
}

export default Prescription;
