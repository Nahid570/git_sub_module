import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Col, Nav, Row } from 'react-bootstrap';

const TabNavMedicineDefault = ({
  selectedItems,
  setSelectedHistoryTab,
  action,
}) => {
  const userInfo = useSelector((state) => state.authReducer.data);
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );

  return (
    <Nav variant="pills" className="custom-tab mt-2">
      <Row style={{ display: 'contents' }} className="nav-history">
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="suggestions"
              //onClick={() => setSelectedHistoryTab('suggestions')}
            >
              Suggestions
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="similarMedicines"
              //onClick={() => setSelectedHistoryTab('simillarMedicines')}
            >
              Similar Medicines
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="genericComposition"
              //onClick={() => setSelectedHistoryTab('genericComposition')}
            >
              Generic Composition
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="formatsAndType"
              //onClick={() => setSelectedHistoryTab('formatsAndType')}
            >
              Formats & Type
            </Nav.Link>
          </Nav.Item>
        </Col>
      </Row>
    </Nav>
  );
};

export default memo(TabNavMedicineDefault);
