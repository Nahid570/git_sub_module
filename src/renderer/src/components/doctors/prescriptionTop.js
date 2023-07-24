import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { memo, useState } from 'react';
import { getAvatarName } from '../../utils/helpers';
import { getRequest } from '../../utils/axiosRequests';
import SearchArea from './partials/searchArea';
import AddAttachmentModal from './modals/addAttachment';
import PrescriptionNoteModal from './modals/prescrptionNote';

const PrescriptionTop = ({
  printRef,
  appointmentStatus,
  prescriptionId,
  title,
  setTitle,
  file,
  setFile,
  patientInfo,
  appointments,
  appointmentCount,
  resetPrescription,
  handlePrintStatus,
  settingPrescriptionData,
  note,
  setNote,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [templatesInSearch, setTemplatesInSearch] = useState([]);
  const [isNoteModal, setIsNoteModal] = useState(false);
  const [isAttachmentModal, setIsAttachmentModal] = useState(false);
  const colors = [
    '#3498DB',
    '#1ABC9C',
    '#EB984E',
    '#8E44AD',
    '#E74C3C',
    '#52BE80',
    '#808B96',
  ];

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `prescriptions/templates?name=${searchKey}`;
    setSearchQuery(searchKey);

    getRequest(url)
      .then((data) => {
        if (data.data.length > 0) {
          const customizedResults = data.data.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item.name,
            };
          });
          setTemplatesInSearch(customizedResults);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchOrNew = (selectedOption) => {
    settingPrescriptionData(selectedOption);
  };

  const abc = (
    <div>
      <span>assad</span>
      <div>asad</div>
    </div>
  );

  return (
    <div className="row mb-2">
      <div className="col-md-12 right-side-pres sticky-header shadow header-sticky-second">
        <div className="avatar-parent">
          {appointments.slice(0, 7).map((item, key) => {
            return (
              <div
                key={item.id}
                className="avatar-child"
                title={item?.patientId?.name}
                style={{
                  background: [colors[key]],
                  color: '#ffffff',
                  border: `1px solid ${colors[key]}`,
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {getAvatarName(item?.patientId?.name).toUpperCase()}
              </div>
            );
          })}
          <Link to={`/appointments`} state={{ status: 'new' }}>
            {appointmentCount > 7 && (
              <div className="avatar-child more-btn">
                {' '}
                {' ' + appointmentCount > 7
                  ? appointmentCount - 7
                  : appointmentCount}
                <i className="fa fa-plus"></i>
              </div>
            )}
          </Link>
        </div>
        <div className="cursor-pointer">
          {prescriptionId ? (
            <Link
              to={'/attachments'}
              state={{ patientId: patientInfo?.id, prescriptionId }}
            >
              <span className="take-note">Attachments</span>
              <span>
                <i className="fa fa-paperclip"></i>
              </span>
            </Link>
          ) : (
            <div
              onClick={() => setIsAttachmentModal(true)}
              style={{ color: '#4e73df' }}
            >
              <span className="take-note">Attachments</span>
              <span>
                <i className="fa fa-paperclip"></i>
              </span>
            </div>
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setIsNoteModal(true)}
          style={{ color: '#59cd3c' }}
        >
          <span className="take-note">Take Note</span>
          <span>
            <i className="fas fa-edit"></i>
          </span>
        </div>
        <div className="cursor-pointer" style={{ color: '#fa7f0b' }}>
          <ReactToPrint
            trigger={() => (
              <span className="print-preview">
                <span className="take-note">Print Preview</span>
                <i className="fa fa-print" aria-hidden="true"></i>
              </span>
            )}
            onBeforePrint={() => handlePrintStatus(true)}
            onAfterPrint={() => handlePrintStatus(false)}
            content={() => printRef.current}
          />
        </div>
        <div style={{ width: '500px' }}>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={templatesInSearch}
            placeholder={'template'}
          />
        </div>
        {/* <div className="">
          <Button
            to="/prescription"
            variant="default"
            className="btn btn-success"
            onClick={() => resetPrescription()}
            size="sm"
          >
            <i className="fa fa-plus-circle"></i> New Prescription
          </Button>
        </div> */}

        <PrescriptionNoteModal
          note={note}
          setNote={setNote}
          isNoteModal={isNoteModal}
          setIsNoteModal={setIsNoteModal}
        />
        <AddAttachmentModal
          isAttachmentModal={isAttachmentModal}
          setIsAttachmentModal={setIsAttachmentModal}
          title={title}
          setTitle={setTitle}
          file={file}
          setFile={setFile}
        />
      </div>
    </div>
  );
};

export default memo(PrescriptionTop);
