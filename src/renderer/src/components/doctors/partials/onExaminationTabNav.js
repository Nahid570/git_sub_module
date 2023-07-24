import { memo } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { checkDoctorDept } from '../../../utils/helpers';
import { useSelector } from 'react-redux';

const OnExaminationTabNav = ({ setSelectedOnExaminationTab, specialties }) => {
  const userInfo = useSelector((state) => state.authReducer.data);

  return (
    <Nav variant="pills" className="custom-tab">
      <Row style={{ display: 'contents' }}>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="observation"
              onClick={() => setSelectedOnExaminationTab('observation')}
            >
              {userInfo?.email === 'israt@gmail.com'
                ? 'MSK Examination'
                : 'Observation'}
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="generalExamination"
              onClick={() => setSelectedOnExaminationTab('generalExamination')}
            >
              General Examination
            </Nav.Link>
          </Nav.Item>
        </Col>
        {checkDoctorDept(
          'opthalmoloy',
          userInfo?.speciality[0],
          specialties,
        ) && (
          <Col>
            <Nav.Item>
              <Nav.Link
                eventKey="ocularExamination"
                onClick={() => setSelectedOnExaminationTab('ocularExamination')}
              >
                Ocular Examination
              </Nav.Link>
            </Nav.Item>
          </Col>
        )}
        {checkDoctorDept(
          'gynecology',
          userInfo?.speciality[0],
          specialties,
        ) && (
          <>
            <Col>
              <Nav.Item>
                <Nav.Link
                  eventKey="gyneExamination"
                  onClick={() => setSelectedOnExaminationTab('gyneExamination')}
                >
                  Gyne Examination
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link
                  eventKey="breastExamination"
                  onClick={() =>
                    setSelectedOnExaminationTab('breastExamination')
                  }
                >
                  Breast Examination
                </Nav.Link>
              </Nav.Item>
            </Col>
          </>
        )}
        {checkDoctorDept('dental', userInfo?.speciality[0], specialties) && (
          <Col>
            <Nav.Item>
              <Nav.Link
                eventKey="dentalExamination"
                onClick={() => setSelectedOnExaminationTab('dentalExamination')}
              >
                Dental Examination
              </Nav.Link>
            </Nav.Item>
          </Col>
        )}
        {checkDoctorDept(
          'cardiology',
          userInfo?.speciality[0],
          specialties,
        ) && (
          <Col>
            <Nav.Item>
              <Nav.Link
                eventKey="systemicExamination"
                onClick={() =>
                  setSelectedOnExaminationTab('systemicExamination')
                }
              >
                Systemic Examination
              </Nav.Link>
            </Nav.Item>
          </Col>
        )}
        {checkDoctorDept(
          'oncology',
          userInfo?.speciality[0],
          specialties,
        ) && (
          <Col>
            <Nav.Item>
              <Nav.Link
                eventKey="oncologyExamination"
                onClick={() => setSelectedOnExaminationTab('oncologyExamination')}
              >
                Oncology Examination
              </Nav.Link>
            </Nav.Item>
          </Col>
        )}
      </Row>
    </Nav>
  );
};

export default memo(OnExaminationTabNav);
