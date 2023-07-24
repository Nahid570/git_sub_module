import { memo } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';

const InfertilityTabNav = ({ selectedItems, action, setTabKey }) => {
  return (
    <Nav variant="pills" className="custom-tab">
      <Row style={{ display: 'contents' }}>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="all-for-woman"
              onClick={() => setTabKey('woman')}
            >
              All for woman
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="group-for-woman"
              onClick={() => setTabKey('group-for-woman')}
            >
              Group
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link eventKey="all-for-man" onClick={() => setTabKey('man')}>
              All for man
            </Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link
              eventKey="group-for-man"
              onClick={() => setTabKey('group-for-man')}
            >
              Group
            </Nav.Link>
          </Nav.Item>
        </Col>
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

export default memo(InfertilityTabNav);
