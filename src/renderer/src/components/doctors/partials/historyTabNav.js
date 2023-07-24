import { Col, Nav, Row } from 'react-bootstrap';
import { checkDoctorDept } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { memo } from 'react';

const HistoryTabNav = ({ selectedItems, setSelectedHistoryTab, action }) => {
  const userInfo = useSelector((state) => state.authReducer.data);
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );
  let tabArr = [
    'medical',
    'drug',
    'investigation',
    'investigation',
    'personal',
    'family',
    'gynocology',
    'surgical',
    'others',
  ];
  const getTab = () => {
    return tabArr.map((item) => {
      return (
        <Col>
          <Nav.Item>
            <Nav.Link eventKey={item}>{item}</Nav.Link>
          </Nav.Item>
        </Col>
      );
    });
  };

  return (
    <Nav variant="pills" className="custom-tab mt-2">
      <Row style={{ display: 'contents' }} className="nav-history">
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="medical"
              onClick={() => setSelectedHistoryTab('medical')}
            >
              Medical
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="medicalGroup"
              onClick={() => setSelectedHistoryTab('medical')}
            >
              M. Group
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="drug"
              onClick={() => setSelectedHistoryTab('drug')}
            >
              Drug
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="investigation"
              onClick={() => setSelectedHistoryTab('investigation')}
            >
              Investigation
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="personal"
              onClick={() => setSelectedHistoryTab('personal')}
            >
              Personal
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="family"
              onClick={() => setSelectedHistoryTab('family')}
            >
              Family
            </Nav.Link>
          </Nav.Item>
        </Col>
        {checkDoctorDept(
          'gynecology',
          userInfo?.speciality[0],
          specialties,
        ) && (
          <>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="gynecology">Gynecology</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="surgical">Surgical</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="others">Others</Nav.Link>
              </Nav.Item>
            </Col>
          </>
        )}
        {selectedItems?.length > 1 && (
          <Col md={1} className="text-right">
            <i
              className="fa fa-save"
              aria-hidden="true"
              onClick={() => action(true)}
            ></i>
          </Col>
        )}
      </Row>
    </Nav>
  );
};

export default memo(HistoryTabNav);
