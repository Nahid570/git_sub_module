import { memo, useState, useRef, Fragment } from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { getRequest, postRequest } from '../../../../utils/axiosRequests';
import FieldTypeBtn from '../fieldTypeBtn';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const Surgical = ({ selectedHistories, setSelectedHistories }) => {
  let { surgical } = selectedHistories || {};
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commonDataInSearch, setCommonDataInSearch] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [searchType, setSearchType] = useState('');

  let defaultData = surgical || {
    lucs: '',
    appendicectomy: '',
    cholecystectomy: '',
    laparotomy: '',
    laparoscopy: '',
    others: '',
  };

  let selectedData = surgical || defaultData;

  const handleData = (fieldName, val) => {
    selectedData[fieldName] = val;
    selectedHistories['surgical'] = selectedData;
    setSelectedHistories({ ...selectedHistories });
  };

  return (
    <div className="surgical-history">
      <Row>
        <Col md={2} className="pt-1">
          LUCS:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.lucs}
            onChange={e => handleData('lucs', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Appendicectomy:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.appendicectomy}
            onChange={e => handleData('appendicectomy', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Cholecystectomy:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.cholecystectomy}
            onChange={e => handleData('cholecystectomy', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Laparotomy:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.laparotomy}
            onChange={e => handleData('laparotomy', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Laparoscopy:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.laparoscopy}
            onChange={e => handleData('laparoscopy', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pt-1">
          Others:
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.others}
            onChange={e => handleData('others', e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(Surgical);
