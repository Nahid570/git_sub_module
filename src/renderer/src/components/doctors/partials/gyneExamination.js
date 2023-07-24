import { memo, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import CommonButtons from './commonButtons';

const GyneExamination = ({ gyneExamination, handleOnExaminationData }) => {
  const weekButtonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [isSfh, setIsSfh] = useState(false);
  const [isWeekButton, setIsWeekButton] = useState(false);
  const [isUterusWeekButton, setIsUterusWeekButton] = useState(false);

  let selectedData = gyneExamination || {
    sfh: '',
    fm: '',
    fhsPresent: false,
    fhsAbsent: false,
    presentation: '',
    nad: false,
    uterus: '',
    wkSize: '',
    os: '',
    cervix: '',
    effacement: '',
    station: '',
    mumbrance: '',
    showPresent: false,
    showAbsent: false,
    inspectionNad: false,
    lump: '',
    pseCervix: '',
    bmeUterus: '',
    bmeWkSize: '',
    fornix: '',
    cmtPresent: false,
    cmtAbsent: false,
    bleedingAbsent: false,
    bleedingPresent: false,
  };

  const clearData = (itemName) => {
    switch (itemName) {
      case 'fm':
        gyneExamination.fm = '';
        break;
      case 'fhs':
        gyneExamination.fhsPresent = false;
        gyneExamination.fhsAbsent = false;
        break;
      case 'show':
        selectedData['showPresent'] = false;
        selectedData['showAbsent'] = false;
        break;
      case 'cmt':
        selectedData['cmtPresent'] = false;
        selectedData['cmtAbsent'] = false;
        break;
      case 'bleeding':
        selectedData['bleedingAbsent'] = false;
        selectedData['bleedingPresent'] = false;
        break;
    }
    handleOnExaminationData(gyneExamination, 'gyneExamination');
  };

  const handleData = (rowName, ColName, val, valAnother) => {
    setIsSfh(false);
    setIsUterusWeekButton(false);
    setIsWeekButton(false);

    switch (rowName) {
      case 'sfh':
      case 'uterus':
      case 'bmeUterus':
        selectedData[rowName] = valAnother;
        break;
      case 'fm':
        selectedData[rowName] = val;
        break;
      case 'fhsPresent':
        selectedData['fhsAbsent'] = false;
        selectedData[rowName] = val;
        break;
      case 'fhsAbsent':
        selectedData['fhsPresent'] = false;
        selectedData[rowName] = val;
        break;
      case 'showPresent':
        selectedData['showAbsent'] = false;
        selectedData[rowName] = val;
        break;
      case 'showAbsent':
        selectedData['showPresent'] = false;
        selectedData[rowName] = val;
        break;
      case 'cmtPresent':
        selectedData['cmtAbsent'] = false;
        selectedData[rowName] = val;
        break;
      case 'cmtAbsent':
        selectedData['cmtPresent'] = false;
        selectedData[rowName] = val;
        break;
      default:
        selectedData[rowName] = val;
    }
    handleOnExaminationData(selectedData, 'gyneExamination');
  };

  return (
    <div className="gyne-examination">
      <div className="title-gyne-examination">P/A/E (Pregnency)</div>
      <hr className="hr" />
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>SFH:</Form.Label>
        </Col>
        <Col md={1}>
          <Form.Control
            type="number"
            size="sm"
            style={{ width: '66px' }}
            placeholder="Add"
            value={selectedData?.sfh}
            defaultValue={selectedData?.sfh}
            onClick={() => setIsSfh(isSfh ? false : true)}
            onChange={(e) => handleData('sfh', '', e.target.value)}
          />
        </Col>
        <Col>
          {isSfh && (
            <CommonButtons
              unitArray={weekButtonArray}
              clickAction={handleData}
              rowName="sfh"
              colName="os"
              indexName="gyne-common-btn"
            />
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className={'pb-2'}>
        <Col md={2}>
          <Form.Label>FM:</Form.Label>
        </Col>
        <Col md={2}>
          <div className="d-flex">
            <Button
              size="sm"
              className="btn-sm-customize"
              variant={
                selectedData?.fm === true ? 'primary' : 'outline-secondary'
              }
              onClick={() => handleData('fm', '', true)}
            >
              <i className="fa fa-plus"></i>
            </Button>
            &nbsp;
            <Button
              size="sm"
              className="btn-sm-customize"
              variant={`${
                selectedData?.fm === false ? 'primary' : 'outline-secondary'
              }`}
              onClick={() => handleData('fm', '', false)}
            >
              <i className="fa fa-minus"></i>
            </Button>
          </div>
        </Col>
        <Col>
          <Button size="sm" variant="light" onClick={() => clearData('fm')}>
            Clear
          </Button>
        </Col>
        {/* <Col>
          {isWeekButton && (
            <CommonButtons
              unitArray={weekButtonArray}
              clickAction={handleData}
              rowName="angleEvaluationAfter"
              colName="os"
              indexName="fourth"
            />
          )}
        </Col> */}
      </Form.Group>
      <Form.Group as={Row}>
        <Col md={2}>
          <Form.Label>FHS:</Form.Label>
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`fhsPresent`}
            label={`Present`}
            checked={gyneExamination?.fhsPresent === true}
            onChange={(e) => handleData('fhsPresent', '', e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`fhsAbsent`}
            label={`Absent`}
            checked={gyneExamination?.fhsAbsent === true}
            onChange={(e) => handleData('fhsAbsent', '', e.target.checked)}
          />
        </Col>
        <Col md={1}>
          <Button size="sm" variant="light" onClick={() => clearData('fhs')}>
            Clear
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col md={2}>
          <Form.Label>Presentation:</Form.Label>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add presentation"
            defaultValue={selectedData?.presentation}
            onChange={(e) => handleData('presentation', '', e.target.value)}
          />
          {/* <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByMargin}
            id="async-margin"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add margin here ..."
            onChange={handleSearchOrNewMargin}
            minLength={1}
            onSearch={marginSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.margin?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })} */}
        </Col>
      </Form.Group>
      <div className="title-gyne-examination">P/A/E (Gyne)</div>
      <hr className="hr" />
      <Form.Group as={Row}>
        <Col md={2}>
          <Form.Label>NAD:</Form.Label>
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`nad`}
            label={``}
            checked={selectedData?.nad === true}
            onChange={(e) => handleData('nad', '', e.target.checked)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>Uterus:</Form.Label>
        </Col>
        <Col md={1}>
          <Form.Control
            type="number"
            size="sm"
            style={{ width: '66px' }}
            placeholder="Add"
            defaultValue={selectedData?.uterus}
            onClick={() =>
              setIsUterusWeekButton(isUterusWeekButton ? false : true)
            }
            onChange={(e) => handleData('uterus', '', e.target.value)}
          />
        </Col>
        <Col md={4}>
          {isUterusWeekButton && (
            <CommonButtons
              unitArray={weekButtonArray}
              clickAction={handleData}
              rowName="uterus"
              colName="os"
              indexName="gyne-common-btn"
            />
          )}
        </Col>
        <Col md={2} className="text-right">
          wk Size
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add wk size"
            defaultValue={selectedData?.wkSize}
            onChange={(e) => handleData('wkSize', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col md={2}>LUMP:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add lump"
            defaultValue={selectedData?.lump}
            onChange={(e) => handleData('lump', '', e.target.value)}
          />
        </Col>
      </Form.Group>

      <div className="title-gyne-examination">P/V/E (Pregnency)</div>
      <hr className="hr" />
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>OS:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add os"
            defaultValue={selectedData?.os}
            onChange={(e) => handleData('os', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Cervix:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add cervix"
            defaultValue={selectedData?.cervix}
            onChange={(e) => handleData('cervix', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Effacement:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add effacement"
            defaultValue={selectedData?.effacement}
            onChange={(e) => handleData('effacement', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Station:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add station"
            defaultValue={selectedData?.station}
            onChange={(e) => handleData('station', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Mumbrance:</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add mumbrance"
            defaultValue={selectedData?.mumbrance}
            onChange={(e) => handleData('mumbrance', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>Show:</Form.Label>
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`showPresent`}
            label={`Present`}
            checked={gyneExamination?.showPresent === true}
            onChange={(e) => handleData('showPresent', '', e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`showAbsent`}
            label={`Absent`}
            checked={gyneExamination?.showAbsent === true}
            onChange={(e) => handleData('showAbsent', '', e.target.checked)}
          />
        </Col>
        <Col md={1}>
          <Button size="sm" variant="light" onClick={() => clearData('show')}>
            Clear
          </Button>
        </Col>
      </Form.Group>

      <div className="title-gyne-examination">P/V/E (Gyne)</div>
      <hr className="hr" />
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Inspection:</Col>
        <Col md={4}>
          <Form.Check
            type={`checkbox`}
            id={`inspection`}
            label={`NAD`}
            checked={selectedData?.inspectionNad === true}
            onChange={(e) => handleData('inspectionNad', '', e.target.checked)}
          />
        </Col>
      </Form.Group>
      <div className="title-gyne-examination">
        Per Speculum Examination (P/S/E):
      </div>
      <hr className="hr" />
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>Cervix:</Col>
        <Col md={6}>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Add cervix"
            defaultValue={selectedData?.pseCervix}
            onChange={(e) => handleData('pseCervix', '', e.target.value)}
          />
        </Col>
      </Form.Group>

      <div className="title-gyne-examination">
        Bimanual Examination (B/M/E):
      </div>
      <hr className="hr" />
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>Uterus:</Form.Label>
        </Col>
        <Col md={1}>
          <Form.Control
            type="number"
            size="sm"
            style={{ width: '66px' }}
            placeholder="Add"
            defaultValue={selectedData?.bmeUterus}
            onClick={() => setIsWeekButton(isWeekButton ? false : true)}
            onChange={(e) => handleData('bmeUterus', '', e.target.value)}
          />
        </Col>
        <Col>
          {isWeekButton && (
            <CommonButtons
              unitArray={weekButtonArray}
              clickAction={handleData}
              rowName="bmeUterus"
              colName="os"
              indexName="gyne-common-btn"
            />
          )}
        </Col>
        <Col className="text-right">wk Size</Col>
        <Col sm="4">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Add wk size"
            defaultValue={selectedData?.bmeWkSize}
            onChange={(e) => handleData('bmeWkSize', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col sm="2">
          <Form.Label>Fornix:</Form.Label>
        </Col>
        <Col sm="6">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Add fornix"
            defaultValue={selectedData?.fornix}
            onChange={(e) => handleData('fornix', '', e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>CMT:</Form.Label>
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`cmtPresent`}
            label={`Present`}
            checked={gyneExamination?.cmtPresent === true}
            onChange={(e) => handleData('cmtPresent', '', e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`cmtAbsent`}
            label={`Absent`}
            checked={gyneExamination?.cmtAbsent === true}
            onChange={(e) => handleData('cmtAbsent', '', e.target.checked)}
          />
        </Col>
        <Col md={1}>
          <Button size="sm" variant="light" onClick={() => clearData('cmt')}>
            Clear
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pb-2">
        <Col md={2}>
          <Form.Label>Bleeding:</Form.Label>
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`bleedingPresent`}
            label={`Present`}
            checked={gyneExamination?.bleedingPresent === true}
            onChange={(e) =>
              handleData('bleedingPresent', '', e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`bleedingAbsent`}
            label={`Absent`}
            checked={gyneExamination?.bleedingAbsent === true}
            onChange={(e) => handleData('bleedingAbsent', '', e.target.checked)}
          />
        </Col>
        <Col md={1}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData('bleeding')}
          >
            Clear
          </Button>
        </Col>
      </Form.Group>
    </div>
  );
};

export default memo(GyneExamination);
