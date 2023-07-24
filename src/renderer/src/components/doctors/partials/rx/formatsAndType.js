import { memo, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const FormatsAndType = () => {
  const [plan, setPlan] = useState(1);
  const planAction = (type) => {
    if (type === 'minus' && plan > 1) {
      setPlan(plan - 1);
    } else if (type === 'plus' && plan < 5) {
      setPlan(plan + 1);
    }
  };
  return (
    <>
      <div>
        <h3>Formats</h3>
        <div>Tablet</div>
        <div>Syrup</div>
        <div>Injection</div>
      </div>
      <hr />
      <h3>Type</h3>
      <Row>
        <Col md={9}>Multiple Medicine Plan</Col>
        <Col className="type">
          <span onClick={() => planAction('minus')}>
            <i className="fa fa-minus"></i>
          </span>
          <span>{plan}</span>
          <span onClick={() => planAction('plus')}>
            <i className="fa fa-plus"></i>
          </span>
        </Col>
      </Row>
    </>
  );
};

export default memo(FormatsAndType);
