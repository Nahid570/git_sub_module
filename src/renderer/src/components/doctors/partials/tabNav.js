import { memo } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';

const TabNav = ({ selectedItems, action, type }) => {
  return (
    <Nav variant="pills" className="custom-tab">
      <Row style={{ display: 'contents' }}>
        <Col>
          <Nav.Item>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Nav.Item>
        </Col>
        <Col>
          <Nav.Item>
            <Nav.Link eventKey="group">Group</Nav.Link>
          </Nav.Item>
        </Col>
        {type === 'staging' && (
          <Col>
            <Nav.Item>
              <Nav.Link eventKey="staging">Staging</Nav.Link>
            </Nav.Item>
          </Col>
        )}
        {selectedItems.length > 1 && (
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

export default memo(TabNav);
