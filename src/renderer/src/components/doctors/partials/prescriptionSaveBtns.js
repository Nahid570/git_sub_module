import { memo } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import LoadingSaveBtn from '../../forms/LoadingSaveBtn';
import newImg from '../../../assets/images/newPres.png';

const PrescriptionSaveBtns = ({
  loadingStatus,
  handleSubmit,
  resetPrescription,
  setIsTemplateModal,
}) => {
  return (
    <Row className="prescription-save-btn mb-2 mt-5 footer-area">
      <Col className="button-area text-center">
        {loadingStatus ? (
          <LoadingSaveBtn />
        ) : (
          <Button
            variant="primary"
            className="mr-3 save-button"
            size="md"
            onClick={() => handleSubmit('save')}
          >
            Save
          </Button>
        )}
      </Col>
      <Col className="button-area text-center">
        {loadingStatus ? (
          <LoadingSaveBtn />
        ) : (
          <Button
            variant="primary"
            className="mr-3 save-button"
            size="md"
            onClick={() => handleSubmit('saveAndPrint')}
          >
            Save & Print
          </Button>
        )}
      </Col>
      <Col className="button-area text-right">
        <div className="new-pres-btn">
          <img
            src={newImg}
            title="Create New Prescription"
            height={55}
            width={55}
            onClick={() => resetPrescription()}
          />
        </div>
        <Button
          variant="primary"
          className="mr-3 save-button"
          size="md"
          onClick={() => setIsTemplateModal(true)}
        >
          Save Template
        </Button>
      </Col>
    </Row>
  );
};

export default memo(PrescriptionSaveBtns);
