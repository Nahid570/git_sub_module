import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import TemplateModal from '../../../components/doctors/modals/templateModal';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import {
  leftOrRightItems,
  isExistAnyHistory,
  isExistAnyEyeGlass,
  isExistAnyRehabData,
  isExistAnyOnExamination,
  isExistAnyInfertilityData,
  formatOldPrescriptionData,
} from '../../../utils/helpers';
import ChiefComplainView from '../../../components/doctors/partials/views/chiefComplain';
import HistoryView from '../../../components/doctors/partials/historyView';
import DiagnosisView from '../../../components/doctors/partials/diagnosisView';
import FollowUpView from './views/followUp';
import AdviceView from './views/advice';
import InvestigationView from './views/investigation';
import RxView from '../../../components/doctors/partials/rxView';
import OnExaminationView from './views/onExamination';
import SpecialNoteView from './views/specialNoteView';
import RehabilitationView from './views/rehabilitationView';
import EyeGlassView from './views/eyeGlassView';
import InfertilityView from './views/infertility';

const AppointmentHistory = ({ prescriptions, appointment, note }) => {
  const prescriptionItems = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.prescriptionItems,
  );
  const [isTemplateModal, setIsTemplateModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({});
  const medicalHistoriesExtra = (data) => {
    return (
      <>
        <span>
          {data?.duration ? 'for ' + data?.duration : ''}{' '}
          {data?.unit ? data?.unit : ''}
        </span>
      </>
    );
  };

  const capitalizeFirstChar = (str) => str.replace(/^./, str[0].toUpperCase());
  const crossIcon = '<i className="fa fa-times-circle"></i>';
  const checkedIcon = '<i className="fas fa-check"></i>';

  const createTemplateModal = (prescription) => {
    setPrescriptionData({
      organizationId: prescription?.organizationId?.id,
      chiefComplains: prescription?.chiefComplains,
      onExaminations: prescription?.onExaminations,
      diagnoses: prescription?.diagnoses,
      histories: prescription?.histories,
      medicines: prescription?.medicines,
      advices: prescription?.advices,
      followUps: prescription?.followUps,
      investigations: prescription?.investigations,
      eyeGlass: prescription?.eyeGlass,
      medicineIds: prescription?.medicineIds,
    });
    setIsTemplateModal(true);
  };

  const getFormattedAdvices = (advices) => {
    let formatedAdvices = [];
    let key = 'untitled';
    advices?.forEach((item) => {
      if (item?.title) {
        key = item?.title;
        formatedAdvices[key] = [item];
      } else {
        if (Array.isArray(formatedAdvices[key])) {
          formatedAdvices[key].push(item);
        } else {
          formatedAdvices[key] = [item];
        }
      }
    });
    return formatedAdvices;
  };

  const chiefComplainView = (element, selectedChiefComplains) => {
    if (selectedChiefComplains?.length === 0) return false;

    return (
      <ChiefComplainView
        element={element}
        prescriptionItems={prescriptionItems}
        selectedChiefComplains={selectedChiefComplains}
        isHistoryPage={true}
      />
    );
  };

  const historyView = (element, selectedHistories) => {
    if (!isExistAnyHistory(selectedHistories)) return false;

    return (
      <HistoryView
        element={element}
        selectedHistories={selectedHistories}
        prescriptionItems={prescriptionItems}
        isHistoryPage={true}
      />
    );
  };

  const viewDiagnosis = (element, selectedDiagnosis) => {
    if (selectedDiagnosis?.length === 0) return false;

    return (
      <DiagnosisView
        element={element}
        selectedDiagnosis={selectedDiagnosis}
        prescriptionItems={prescriptionItems}
        isHistoryPage={true}
      />
    );
  };

  const followUpView = (element, selectedFollowUps) => {
    if (selectedFollowUps?.length === 0) return false;

    return (
      <FollowUpView
        element={element}
        prescriptionItems={prescriptionItems}
        selectedFollowUps={selectedFollowUps}
        isHistoryPage={true}
      />
    );
  };

  const adviceView = (element, selectedAdvices) => {
    if (selectedAdvices?.length === 0) return false;

    return (
      <AdviceView
        element={element}
        prescriptionItems={prescriptionItems}
        selectedAdvices={selectedAdvices}
        isHistoryPage={true}
      />
    );
  };

  const investigationView = (element, selectedInvestigations) => {
    if (selectedInvestigations?.length === 0) {
      return false;
    }
    return (
      <InvestigationView
        element={element}
        prescriptionItems={prescriptionItems}
        selectedInvestigations={selectedInvestigations}
        isHistoryPage={true}
      />
    );
  };

  const viewRx = (element, selectedMedicines) => {
    if (selectedMedicines?.length === 0) {
      return false;
    }
    return (
      <RxView
        selectedMedicines={selectedMedicines}
        prescriptionItems={prescriptionItems}
        element={element}
        isHistoryPage={true}
      />
    );
  };

  const onExaminationView = (element, selectedOnExamination) => {
    if (!isExistAnyOnExamination(selectedOnExamination)) {
      return false;
    }
    return (
      <OnExaminationView
        element={element}
        selectedOnExamination={selectedOnExamination}
        prescriptionItems={prescriptionItems}
        isHistoryPage={true}
      />
    );
  };

  const specialNoteView = (element, specialNote) => {
    if (specialNote === '') {
      return false;
    }
    return (
      <SpecialNoteView
        specialNote={specialNote}
        prescriptionItems={prescriptionItems}
        element={element}
        isHistoryPage={true}
      />
    );
  };

  const viewRehabilitation = (element, selectedRehabilitation) => {
    if (!isExistAnyRehabData(selectedRehabilitation)) {
      return false;
    }
    return (
      <RehabilitationView
        selectedRehabilitation={selectedRehabilitation}
        element={element}
        prescriptionItems={prescriptionItems}
        isHistoryPage={true}
      />
    );
  };

  const eyeGlassView = (element, selectedEyeGlass) => {
    if (!isExistAnyEyeGlass(selectedEyeGlass)) {
      return false;
    }
    return (
      <EyeGlassView
        selectedEyeGlass={selectedEyeGlass}
        prescriptionItems={prescriptionItems}
        element={element}
        isHistoryPage={true}
      />
    );
  };

  const infertilityView = (element, selectedInfertilities) => {
    if (!isExistAnyInfertilityData(selectedInfertilities)) {
      return false;
    }
    return (
      <InfertilityView
        element={element}
        isHistoryPage={true}
        prescriptionItems={prescriptionItems}
        selectedInfertilities={selectedInfertilities}
      />
    );
  };

  return (
    <>
      <Accordion defaultActiveKey={[0]} alwaysOpen>
        {prescriptions?.map((data, index) => {
          if (data?.medicines?.length > 0) {
            data.medicines = formatOldPrescriptionData(data.medicines);
          }
          return (
            <Accordion.Item eventKey={index} key={index} className="mb-3">
              <Accordion.Header className="text-left">
                <div
                  className="prescription-number-circle"
                  style={{ top: '0px' }}
                >
                  <div>{++index}</div>
                </div>
                <span className="accordion-title-text">
                  {Moment(appointment?.appointmentDateTime).format(
                    'D MMM YYYY',
                  )}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row prescription-body prescription-history pt-2">
                  <div className="right-edit-icon">
                    <Link
                      to={'/prescription'}
                      className="pr-2"
                      state={{
                        prescription: data,
                        dob: data?.patientId?.dob,
                        note: note,
                        history: 'editFromHistory',
                      }}
                    >
                      Prescription Edit
                    </Link>
                    |
                    <span
                      className="create-template-btn"
                      onClick={() => createTemplateModal(data)}
                    >
                      Create Template
                    </span>
                  </div>
                  {leftOrRightItems(prescriptionItems, 'left')?.length > 0 && (
                    <div
                      className={`prescription-body-left`}
                      style={{ paddingLeft: '28px', width: '35%' }}
                    >
                      {leftOrRightItems(prescriptionItems, 'left').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(
                              element,
                              data?.chiefComplains,
                            );
                          } else if (element.name === 'history') {
                            return historyView(element, data?.histories);
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element, data?.diagnoses);
                          } else if (element.name === 'follow-up') {
                            return followUpView(element, data?.followUps);
                          } else if (element.name === 'investigation') {
                            return investigationView(
                              element,
                              data?.investigations,
                            );
                          } else if (element.name === 'rx') {
                            return viewRx(element, data?.medicines);
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(
                              element,
                              data?.onExaminations,
                            );
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element, data?.specialNote);
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(
                              element,
                              data?.rehabilitation,
                            );
                          } else if (element.name === 'advice') {
                            return adviceView(element, data?.advices);
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element, data?.eyeGlass);
                          } else if (element.name === 'infertility') {
                            return infertilityView(
                              element,
                              data?.infertilities,
                            );
                          }
                        },
                      )}
                    </div>
                  )}
                  {leftOrRightItems(prescriptionItems, 'right')?.length > 0 && (
                    <div
                      className={`prescription-body-right`}
                      style={{ paddingLeft: '25px', width: '60%' }}
                    >
                      {leftOrRightItems(prescriptionItems, 'right').map(
                        (element) => {
                          if (element.name === 'chief-complain') {
                            return chiefComplainView(
                              element,
                              data?.chiefComplains,
                            );
                          } else if (element.name === 'history') {
                            return historyView(element, data?.histories);
                          } else if (element.name === 'diagnosis') {
                            return viewDiagnosis(element, data?.diagnoses);
                          } else if (element.name === 'follow-up') {
                            return followUpView(element, data?.followUps);
                          } else if (element.name === 'advice') {
                            return adviceView(element, data?.advices);
                          } else if (element.name === 'rx') {
                            return viewRx(element, data?.medicines);
                          } else if (element.name === 'on-examination') {
                            return onExaminationView(
                              element,
                              data?.onExaminations,
                            );
                          } else if (element.name === 'special-note') {
                            return specialNoteView(element, data?.specialNote);
                          } else if (element.name === 'rehabilitation') {
                            return viewRehabilitation(
                              element,
                              data?.rehabilitation,
                            );
                          } else if (element.name === 'eye-glass') {
                            return eyeGlassView(element, data?.eyeGlass);
                          } else if (element.name === 'infertility') {
                            return infertilityView(
                              element,
                              data?.infertilities,
                            );
                          }
                        },
                      )}
                    </div>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <TemplateModal
        isTemplateModal={isTemplateModal}
        setIsTemplateModal={setIsTemplateModal}
        templateInput={prescriptionData}
      />
    </>
  );
};

export default memo(AppointmentHistory);
