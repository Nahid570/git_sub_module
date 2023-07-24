import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import TeethButton from './teethButton';

const DentalExamination = ({ dentalExamination, handleOnExaminationData }) => {
  let selectedData = dentalExamination || {
    patientType: 'adult',
    topLeft: [],
    topRight: [],
    bottomLeft: [],
    bottomRight: [],
  };
  const leftAdultTeeth = [1, 2, 3, 4, 5, 6, 7, 8];
  const rightAdultTeeth = [8, 7, 6, 5, 4, 3, 2, 1];
  const leftChildTeeth = ['A', 'B', 'C', 'D', 'E'];
  const rightChildTeeth = ['E', 'D', 'C', 'B', 'A'];

  const handleDentalExamination = (fieldName, position, val) => {
    if (fieldName === 'patientType') {
      selectedData = {
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: [],
      };
      selectedData.patientType = val;
    } else {
      const isExist = selectedData[position].includes(val);
      selectedData[position] = isExist
        ? selectedData[position].filter((value) => value != val)
        : [...selectedData[position], val];
    }
    handleOnExaminationData(selectedData, 'dental');
  };

  return (
    <div className="dental-examination">
      <Row className="align-items-center title-gyne-examination">
        <Col md={5}>Patient Type:</Col>
        <Col>
          <div role="group" className="btn-group">
            <button
              type="button"
              className={`btn btn-sm ${
                selectedData.patientType === 'adult'
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() =>
                handleDentalExamination('patientType', '', 'adult')
              }
            >
              Adult
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                selectedData.patientType === 'child'
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() =>
                handleDentalExamination('patientType', '', 'child')
              }
            >
              Child
            </button>
          </div>
        </Col>
        {/* <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`adult`}
            label={`Adult`}
            checked={dentalExamination.patientType === 'adult'}
            onChange={(e) =>
              handleDentalExamination('patientType', '', 'adult')
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`child`}
            label={`Child`}
            checked={dentalExamination.patientType === 'child'}
            onChange={(e) =>
              handleDentalExamination('patientType', '', 'child')
            }
          />
        </Col> */}
      </Row>
      <div className="teeth-area">
        {selectedData?.patientType === 'adult' ? (
          <>
            <hr className="hr" />
            <Row>
              <Col className="text-right">
                <TeethButton
                  buttonArr={rightAdultTeeth}
                  position={`topLeft`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
              <Col className="text-left">
                <TeethButton
                  buttonArr={leftAdultTeeth}
                  position={`topRight`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
            </Row>
            <hr className="hr-dental" />
            <div className="vertical-line"></div>
            <Row className="pb-3">
              <Col className="text-right">
                <TeethButton
                  buttonArr={rightAdultTeeth}
                  position={`bottomLeft`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
              <Col className="text-left">
                <TeethButton
                  buttonArr={leftAdultTeeth}
                  position={`bottomRight`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <hr className="hr" />
            <Row>
              <Col className="text-right">
                <TeethButton
                  buttonArr={rightChildTeeth}
                  position={`topLeft`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
              <Col className="text-left">
                <TeethButton
                  buttonArr={leftChildTeeth}
                  position={`topRight`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
            </Row>
            <hr className="hr-dental hr-dental-bottom" />
            <div className="vertical-line"></div>
            <Row>
              <Col className="text-right">
                <TeethButton
                  buttonArr={rightChildTeeth}
                  position={`bottomLeft`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
              <Col className="text-left">
                <TeethButton
                  buttonArr={leftChildTeeth}
                  position={`bottomRight`}
                  handleDentalExamination={handleDentalExamination}
                  dentalExamination={selectedData}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
      <hr />
      <div style={{ height: '200px', position: 'relative' }}>
        <Row className="" style={{ paddingTop: '55px' }}>
          <Col className="text-right">
            {selectedData['topLeft'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {selectedData['topLeft'].length - 1 === index ? '' : ', '}
                </span>
              );
            })}
          </Col>
          <Col className="text-left">
            {selectedData['topRight'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {selectedData['topRight'].length - 1 === index ? '' : ', '}
                </span>
              );
            })}
          </Col>
        </Row>
        <div className="horizontal-border-row"></div>
        <div className="vertical-border-row"></div>
        {/* <div className="hr-dental-figure"></div>
                <div className="vertical-line vertical-line-figure"></div> */}
        <Row className="" style={{ paddingTop: '40px' }}>
          <Col className="text-right">
            {selectedData['bottomLeft'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {selectedData['bottomLeft'].length - 1 === index ? '' : ', '}
                </span>
              );
            })}
          </Col>
          <Col className="text-left">
            {selectedData['bottomRight'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {selectedData['bottomRight'].length - 1 === index ? '' : ', '}
                </span>
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(DentalExamination);
