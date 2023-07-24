import { memo, useState, useRef, Fragment } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  ButtonGroup,
} from 'react-bootstrap';
import { getRequest, postRequest } from '../../../../utils/axiosRequests';
import FieldTypeBtn from '../fieldTypeBtn';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CommonButton from '../../partials/commonButtons';

const GynecologyHistory = ({ selectedHistories, setSelectedHistories }) => {
  let { gynecology } = selectedHistories || {};
  const [isFpBtn, setIsFpBtn] = useState(false);
  const [isGravida, setIsGravida] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [commonDataInSearch, setCommonDataInSearch] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [searchType, setSearchType] = useState('');
  const ftArr = [
    'Barrier',
    'Pill',
    'Inj',
    'DEPO',
    'IUD',
    'implant',
    'Natural',
    'Nill',
  ];
  const gravidaArr = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
  ];

  let defaultData = gynecology || {
    mc: { regular: false, irregular: false, menopause: false, note: '' },
    mcNote: '',
    mp: '',
    mcVal: '',
    lmp: '',
    lmpNote: '',
    edd: '',
    eddNote: '',
    maritalStatus: {
      married: false,
      unmarried: false,
    },
    marriedFor: {
      years: '',
      months: '',
      days: '',
      hours: '',
    },
    gravida: '',
    gravidaNote: '',
    para: '',
    paraNote: '',
    ageOfLastChild: {
      years: '',
      months: '',
      days: '',
      hours: '',
      note: '',
    },
  };

  let selectedData = gynecology || defaultData;
  const handleData = (rowName, fieldName, val, fpVal) => {
    switch (rowName) {
      case 'mc':
        if (fieldName !== 'note') {
          selectedData[rowName] = {
            regular: false,
            irregular: false,
            menopause: false,
          };
        }
        selectedData[rowName][fieldName] = val;
        break;
      case 'maritalStatus':
        selectedData[rowName] = {
          married: false,
          unmarried: false,
        };
        selectedData[rowName][fieldName] = val;
        break;
      case 'marriedFor':
      case 'ageOfLastChild':
        selectedData[rowName][fieldName] = val;
      default:
        if (fieldName === 'fp' || fieldName === 'gravida') {
          val = fpVal;
          fieldName === 'fp' ? setIsFpBtn(false) : setIsGravida(false);
        }
        selectedData[fieldName] = val;
    }
    selectedHistories['gynecology'] = selectedData;
    setSelectedHistories({ ...selectedHistories });
  };

  const clearData = (itemName) => {
    switch (itemName) {
      case 'mc':
        selectedData[itemName] = {
          regular: false,
          irregular: false,
          menopause: false,
          note: null,
        };
        break;
      case 'maritalStatus':
        selectedData[itemName] = {
          married: false,
          unmarried: false,
        };
    }
    selectedHistories['gynecology'] = selectedData;
    setSelectedHistories({ ...selectedHistories });
    //handleOnExaminationData(selectedData, 'breastExamination');
  };

  return (
    <div className="gynocology-history">
      <div className="title-gyne-examination">Menstrual History:</div>
      <hr className="hr" />
      <Row>
        <Col md={2}>MC:</Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`regular`}
            label={`Regular`}
            checked={selectedData?.mc?.regular == true}
            onChange={(e) => handleData('mc', 'regular', e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`irregular`}
            label={`Irregular`}
            checked={selectedData?.mc?.irregular === true}
            onChange={(e) => handleData('mc', 'irregular', e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`menopause`}
            label={`Menopause`}
            checked={selectedData?.mc?.menopause === true}
            onChange={(e) => handleData('mc', 'menopause', e.target.checked)}
          />
        </Col>
        <Col md={1}>
          <Button size="sm" variant="light" onClick={() => clearData('mc')}>
            Clear
          </Button>
        </Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add note"
            defaultValue={selectedData?.mc?.note}
            onChange={(e) => handleData('mc', 'note', e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <Row>
            <Col md={2} className="mp-mc">
              <div>MP</div>
              <div>MC</div>
            </Col>
            <Col md={2} className="mp-mc-right">
              :
            </Col>
            <Col md={6} className="pr-0">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Add MP"
                defaultValue={selectedData?.mp}
                onChange={(e) => handleData('', 'mp', e.target.value)}
              />
              <div className="border-mp-mc"></div>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Add MC"
                defaultValue={selectedData?.mcVal}
                onChange={(e) => handleData('', 'mcVal', e.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={2}>LMP: </Col>
        <Col md={3} className="pr-0">
          <Form.Control
            size="sm"
            type="date"
            defaultValue={selectedData?.lmp}
            onChange={(e) => handleData('', 'lmp', e.target.value)}
          />
        </Col>
        <Col md={2}></Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add LMP Note"
            defaultValue={selectedData?.lmpNote}
            onChange={(e) => handleData('', 'lmpNote', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2}>EDD: </Col>
        <Col md={3} className="pr-0">
          <Form.Control
            size="sm"
            type="date"
            defaultValue={selectedData?.edd}
            onChange={(e) => handleData('', 'edd', e.target.value)}
          />
        </Col>
        <Col md={2}></Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add EDD Note"
            defaultValue={selectedData?.eddNote}
            onChange={(e) => handleData('', 'eddNote', e.target.value)}
          />
        </Col>
      </Row>
      <div className="title-gyne-examination">Obstetrical History:</div>
      <hr className="hr" />
      <Row className="mb-1">
        <Col md={2}>Marital Status:</Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`married`}
            label={`Married`}
            checked={selectedData?.maritalStatus?.married === true}
            onChange={(e) =>
              handleData('maritalStatus', 'married', e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`unmarried`}
            label={`Unmarried`}
            checked={selectedData?.maritalStatus?.unmarried === true}
            onChange={(e) =>
              handleData('maritalStatus', 'unmarried', e.target.checked)
            }
          />
        </Col>
        <Col md={1}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData('maritalStatus')}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={2}>Married For:</Col>
        <Col md={5} sm={5}>
          <InputGroup className="mb-3">
            <Form.Control
              size="sm"
              placeholder="Years"
              aria-label="Years"
              defaultValue={selectedData?.marriedFor?.years}
              onChange={(e) =>
                handleData('marriedFor', 'years', e.target.value)
              }
            />
            <Form.Control
              size="sm"
              placeholder="Months"
              aria-label="Months"
              defaultValue={selectedData?.marriedFor?.months}
              onChange={(e) =>
                handleData('marriedFor', 'months', e.target.value)
              }
            />
            <Form.Control
              size="sm"
              placeholder="Days"
              aria-label="Days"
              defaultValue={selectedData?.marriedFor?.days}
              onChange={(e) => handleData('marriedFor', 'days', e.target.value)}
            />
            <Form.Control
              size="sm"
              placeholder="Hours"
              aria-label="Hours"
              defaultValue={selectedData?.marriedFor?.hours}
              onChange={(e) =>
                handleData('marriedFor', 'hours', e.target.value)
              }
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2}>Gravida:</Col>
        <Col md={2} sm={2}>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Gravida"
            defaultValue={selectedData?.gravida}
            onClick={() => setIsGravida(isGravida ? false : true)}
          />
        </Col>
        <Col>
          {isGravida && (
            <CommonButton
              unitArray={gravidaArr}
              clickAction={handleData}
              rowName="gravida"
              colName="gravida"
              indexName="gravida-btn"
            />
          )}
        </Col>
        <Col md={4}>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add Note"
            defaultValue={selectedData?.gravidaNote}
            onChange={(e) => handleData('', 'gravidaNote', e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2}>Para:</Col>
        <Col md={3} sm={3}>
          <Form.Control
            size="sm"
            className="para-input"
            type="text"
            placeholder="Years"
            onChange={(e) => handleData('', 'para', e.target.value)}
          />
          {/* <ButtonGroup vertical>
            <Button variant="primary">
              <i className="fa fa-plus"></i>
            </Button>
            <Button variant="primary">
              <i className="fa fa-minus"></i>
            </Button>
          </ButtonGroup> */}
        </Col>
        <Col></Col>
        <Col md={4}>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add Note"
            defaultValue={selectedData?.paraNote}
            onChange={(e) => handleData('', 'paraNote', e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2}>Age of last child:</Col>
        <Col md={5}>
          <InputGroup className="mb-3">
            <Form.Control
              size="sm"
              placeholder="Years"
              defaultValue={selectedData?.ageOfLastChild?.years}
              onChange={(e) =>
                handleData('ageOfLastChild', 'years', e.target.value)
              }
            />
            <Form.Control
              size="sm"
              placeholder="Months"
              defaultValue={selectedData?.ageOfLastChild?.months}
              onChange={(e) =>
                handleData('ageOfLastChild', 'months', e.target.value)
              }
            />
            <Form.Control
              size="sm"
              placeholder="Days"
              defaultValue={selectedData?.ageOfLastChild?.months}
              onChange={(e) =>
                handleData('ageOfLastChild', 'days', e.target.value)
              }
            />
            <Form.Control
              size="sm"
              placeholder="Hours"
              defaultValue={selectedData?.ageOfLastChild?.hours}
              onChange={(e) =>
                handleData('ageOfLastChild', 'hours', e.target.value)
              }
            />
          </InputGroup>
        </Col>
        <Col md={5}>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add Note"
            defaultValue={selectedData?.ageOfLastChild?.note}
            onChange={(e) =>
              handleData('ageOfLastChild', 'note', e.target.value)
            }
          />
        </Col>
      </Row>
      <div className="title-gyne-examination">Contraceptive Method:</div>
      <hr className="hr" />
      <Row className="mb-5">
        <Col md={2}>FP:</Col>
        <Col md={2} sm={2}>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Select FP"
            defaultValue={selectedData?.fp}
            //onChange={(e) => handleData('', 'fp', e.target.value)}
            onClick={() => setIsFpBtn(isFpBtn ? false : true)}
          />
          {isFpBtn && (
            <CommonButton
              unitArray={ftArr}
              clickAction={handleData}
              rowName="fp"
              colName="fp"
            />
          )}
        </Col>
        <Col md={2}></Col>
        <Col>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            placeholder="Add Note"
            defaultValue={selectedData?.fpNote}
            onChange={(e) => handleData('', 'fpNote', e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(GynecologyHistory);
