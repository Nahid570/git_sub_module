import { memo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const Others = ({ selectedHistories, setSelectedHistories }) => {
  let { others } = selectedHistories || {};
  let defaultData = {
    surgicalHistory: '',
    allergicHistory: '',
    mh: {
      regular: false,
      irregular: false,
      menapause: false,
      Pregnancy: false,
      note: '',
    },
  };

  let selectedData = others || defaultData;
  const handleData = (itemName, fieldName, val) => {
    switch (itemName) {
      case 'mh':
        selectedData[itemName][fieldName] = val;
        break;
      default:
        selectedData[itemName] = val;
    }
    selectedHistories['others'] = selectedData;
    setSelectedHistories({ ...selectedHistories });
  };

  return (
    <div className="surgical-history">
      <Row>
        <Col md={2} className="pt-1">
          Surgical History:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.surgicalHistory}
            onChange={e => handleData('surgicalHistory', '', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Allergic History:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.allergicHistory}
            onChange={e => handleData('allergicHistory', '', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2}>M/H:</Col>
        <Col md={4}>
          <Row>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`regular`}
                label={`Regular`}
                checked={selectedData?.mh?.regular === true}
                onChange={e => handleData('mh', 'regular', e.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`irregular`}
                label={`Irregular`}
                checked={selectedData?.mh?.irregular === true}
                onChange={e => handleData('mh', 'irregular', e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`menapause`}
                label={`Menapause`}
                checked={selectedData?.mh?.menapause === true}
                onChange={e => handleData('mh', 'menapause', e.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`pregnancy`}
                label={`Pregnancy`}
                checked={selectedData?.mh?.pregnancy === true}
                onChange={e => handleData('mh', 'pregnancy', e.target.checked)}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            placeholder="Add note"
            defaultValue={selectedData?.mh?.note}
            onChange={e => handleData('mh', 'note', e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(Others);
