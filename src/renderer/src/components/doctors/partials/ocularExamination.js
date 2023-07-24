import React, { memo, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import parse from 'html-react-parser';
import angelEvaluation from '../../../assets/images/angelEvaluation.png';
import ocularMotility from '../../../assets/images/ocularMotility.png';
import CommonButtons from './commonButtons';

const OcularExamination = ({
  selectedOnExamination,
  handleOnExaminationData,
}) => {
  const crossIcon = '<i className="fa fa-times-circle"></i>';
  const checkedIcon = '<i className="fas fa-check-circle"></i>';
  let { ocularExamination } = selectedOnExamination;
  ocularExamination = ocularExamination || {
    visualAcuity: {
      val: '',
      var: '',
    },
    pl: {
      present: false,
      absent: false,
    },
    fc: '',
    hm: {
      present: false,
      absent: false,
    },
    colorVision: {
      normal: false,
      deficit: false,
      red: false,
      blue: false,
      green: false,
    },
    pr: {
      first: false,
      second: false,
      third: false,
      fourth: false,
    },
    ocularMotility: {
      od: {
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        sixth: false,
      },
      os: {
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        sixth: false,
      },
    },
    angleEvaluationBefore: {
      od: {
        first: '',
        second: '',
        third: '',
        fourth: '',
      },
      os: {
        first: '',
        second: '',
        third: '',
        fourth: '',
      },
    },
    angleEvaluationAfter: {
      od: {
        first: '',
        second: '',
        third: '',
        fourth: '',
      },
      os: {
        first: '',
        second: '',
        third: '',
        fourth: '',
      },
    },
    iop: {
      high: '',
      low: '',
    },
  };
  const buttonArray = ['6/6', '6/9', '6/12', '6/24', '6/36', '6/60'];
  const angleButtonArray = ['SL', 'ATM', 'PTM', 'SS', 'OH'];
  const [isValButton, setIsValButton] = useState(false);
  const [isVarButton, setIsVarButton] = useState(false);
  const [isAngleBtn, setIsAngleBtn] = useState({});

  const handleOcularExamination = (rowName, fieldName, value) => {
    if (fieldName === 'val' || fieldName === 'var') {
      ocularExamination.visualAcuity[fieldName] = value;
    } else if (rowName === 'pl') {
      ocularExamination.pl['present'] = false;
      ocularExamination.pl['absent'] = false;
      ocularExamination.pl[fieldName] = value;
    } else if (fieldName === 'fc') {
      ocularExamination[fieldName] = value;
    } else if (rowName === 'hm') {
      ocularExamination.hm['present'] = false;
      ocularExamination.hm['absent'] = false;
      ocularExamination.hm[fieldName] = value;
    } else if (rowName === 'colorVision') {
      ocularExamination.colorVision[fieldName] = value;
    }
    setIsValButton(false);
    setIsVarButton(false);
    handleOnExaminationData(ocularExamination, 'ocularExamination');
  };

  // const handleGraphicalExamination = (rowName, colName, fieldName, value) => {
  //   switch (colName) {
  //     case 'pr':
  //       ocularExamination[colName][fieldName] = value ? false : true;
  //       break;
  //     case 'od':
  //       ocularExamination[rowName][colName][fieldName] = value ? false : true;
  //       break;
  //     case 'os':
  //       ocularExamination[rowName][colName][fieldName] = value ? false : true;
  //       break;
  //   }
  //   console.log(ocularExamination, 'graphical examination');
  //   handleOnExaminationData(ocularExamination, 'ocularExamination');
  // };

  const visualAcuityValButtons = buttonArray.map((item, index) => {
    return (
      <Button
        key={index}
        size="sm"
        className="btn-sm-customize"
        variant="outline-secondary"
        onClick={() => handleOcularExamination('', 'val', item)}
      >
        {item}
      </Button>
    );
  });
  const visualAcuityVarButtons = buttonArray.map((item, index) => {
    return (
      <Button
        key={index}
        size="sm"
        className="btn-sm-customize"
        variant="outline-secondary"
        onClick={() => handleOcularExamination('', 'var', item)}
      >
        {item}
      </Button>
    );
  });

  const handleVisualAcuityButton = (name) => {
    if (name === 'val') {
      setIsVarButton(false);
      setIsValButton(isValButton ? false : true);
    } else {
      setIsValButton(false);
      setIsVarButton(isVarButton ? false : true);
    }
  };

  const handleGraphicalExamination = (rowName, colName, fieldName, value) => {
    if (colName === 'pr') {
      ocularExamination[colName][fieldName] = value ? false : true;
    } else if (colName === 'od') {
      ocularExamination[rowName][colName][fieldName] = value ? false : true;
    } else if (colName === 'os') {
      ocularExamination[rowName][colName][fieldName] = value ? false : true;
    }
    handleOnExaminationData(ocularExamination, 'ocularExamination');
  };

  const handleAngleEvaluation = (rowName, colName, fieldName, value) => {
    setIsAngleBtn({});
    ocularExamination[rowName][colName][fieldName] = value;
    handleOnExaminationData(ocularExamination, 'ocularExamination');
  };
  const handleIop = (rowName, fieldName, value) => {
    ocularExamination[rowName][fieldName] = value;
    handleOnExaminationData(ocularExamination, 'ocularExamination');
  };

  const angleEvaluation = (rowName, type, indexName) => {
    if (isAngleBtn.rowName && isAngleBtn.type && isAngleBtn.indexName) {
      setIsAngleBtn({});
    } else {
      setIsAngleBtn({ rowName, type, indexName });
    }
  };

  return (
    <>
      <Row className="ml-0 mr-0">
        <Col md={2}>
          <b>Visual Acuity:</b>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-1">
                <Form.Label column sm="2" className="font-weight-bold pl-0">
                  VAR:
                </Form.Label>
                <Col sm="8" className="ml-3 mt-1">
                  <Button
                    size="sm"
                    className="btn-sm-customize"
                    variant="outline-secondary"
                    onClick={() => handleVisualAcuityButton('var')}
                  >
                    {ocularExamination.visualAcuity.var ? (
                      ocularExamination.visualAcuity.var
                    ) : (
                      <i className="fas fa-angle-double-down"></i>
                    )}
                  </Button>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-1">
                <Form.Label column sm="2" className="font-weight-bold pl-0">
                  VAL:
                </Form.Label>
                <Col sm="8" className="ml-3 mt-1 pl-0 pr-0">
                  <Button
                    size="sm"
                    className="btn-sm-customize"
                    variant="outline-secondary"
                    onClick={() => handleVisualAcuityButton('val')}
                  >
                    {ocularExamination.visualAcuity.val ? (
                      ocularExamination.visualAcuity.val
                    ) : (
                      <i className="fas fa-angle-double-down"></i>
                    )}
                  </Button>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          {isValButton && (
            <Row>
              <Col className="pb-1 mt-1 common-btn">
                {visualAcuityValButtons}
              </Col>
            </Row>
          )}
          {isVarButton && (
            <Row>
              <Col className="pb-1 ml-5 mt-1 common-btn">
                {visualAcuityVarButtons}
              </Col>
            </Row>
          )}

          <Row className={`pb-2 mt-1`}>
            <Col md="3" className="font-weight-bold">
              PL:
            </Col>
            <Col md="4">
              <Form.Check
                type={`radio`}
                id={`pl_present`}
                name="present"
                label={`Present`}
                checked={ocularExamination.pl.present === true}
                onChange={(e) =>
                  handleOcularExamination('pl', 'present', e.target.checked)
                }
              />
            </Col>
            <Col md="4">
              <Form.Check
                type={`radio`}
                id={`pl_absent`}
                name="absent"
                label={`Absent`}
                checked={ocularExamination.pl.absent == true}
                onChange={(e) =>
                  handleOcularExamination('pl', 'absent', e.target.checked)
                }
              />
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="3" className="font-weight-bold mt-1">
              FC:
            </Col>
            <Col md="7">
              <Form.Control
                type="text"
                size="sm"
                defaultValue={ocularExamination.fc}
                onChange={(e) =>
                  handleOcularExamination('', 'fc', e.target.value)
                }
              />
            </Col>
            <Col md="1 mt-1 font-weight-bold">ft</Col>
          </Row>
          <Row className="pt-3">
            <Col md="3" className="font-weight-bold">
              HM:
            </Col>
            <Col md="4">
              <Form.Check
                type={`radio`}
                id={`hm_present`}
                name="present"
                label={`Present`}
                checked={ocularExamination.hm.present === true}
                onChange={(e) =>
                  handleOcularExamination('hm', 'present', e.target.checked)
                }
              />
            </Col>
            <Col md="4">
              <Form.Check
                type={`radio`}
                id={`hm_absent`}
                name="absent"
                label={`Absent`}
                checked={ocularExamination.hm.absent === true}
                onChange={(e) =>
                  handleOcularExamination('hm', 'absent', e.target.checked)
                }
              />
            </Col>
          </Row>
        </Col>
        <Col md={5} className="text-center">
          <div className="mb-3">PR:</div>
          <span
            style={{ position: 'absolute', left: '152px', top: '22px' }}
            className="mr-2 cursor-pointer"
            onClick={() =>
              handleGraphicalExamination(
                '',
                'pr',
                'first',
                ocularExamination.pr.first,
              )
            }
          >
            {ocularExamination.pr.first ? parse(checkedIcon) : parse(crossIcon)}
          </span>
          <span
            style={{ position: 'absolute', top: '57px', left: '105px' }}
            className="mr-2 cursor-pointer"
            onClick={() =>
              handleGraphicalExamination(
                '',
                'pr',
                'fourth',
                ocularExamination.pr.fourth,
              )
            }
          >
            {ocularExamination.pr.fourth
              ? parse(checkedIcon)
              : parse(crossIcon)}
          </span>
          <img src={angelEvaluation} height={60} width={90}></img>
          <span
            style={{ position: 'absolute', left: '155px', bottom: '32px' }}
            className="mr-2 cursor-pointer"
            onClick={() =>
              handleGraphicalExamination(
                '',
                'pr',
                'third',
                ocularExamination.pr.third,
              )
            }
          >
            {ocularExamination.pr.third ? parse(checkedIcon) : parse(crossIcon)}
          </span>
          <span
            style={{ position: 'absolute', top: '57px', right: '101px' }}
            className="cursor-pointer"
            onClick={() =>
              handleGraphicalExamination(
                '',
                'pr',
                'second',
                ocularExamination.pr.second,
              )
            }
          >
            {ocularExamination.pr.second
              ? parse(checkedIcon)
              : parse(crossIcon)}
          </span>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col className="font-weight-bold">Color Vision:</Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`normal`}
            name="normal"
            label={`Normal`}
            checked={ocularExamination.colorVision.normal === true}
            onChange={(e) =>
              handleOcularExamination('colorVision', 'normal', e.target.checked)
            }
          />
        </Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`deficit`}
            name="deficit"
            label={`Deficit`}
            checked={ocularExamination.colorVision.deficit === true}
            onChange={(e) =>
              handleOcularExamination(
                'colorVision',
                'deficit',
                e.target.checked,
              )
            }
          />
        </Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`red`}
            name="red"
            label={`Red`}
            checked={ocularExamination.colorVision.red === true}
            onChange={(e) =>
              handleOcularExamination('colorVision', 'red', e.target.checked)
            }
          />
        </Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`blue`}
            name="blue"
            label={`Blue`}
            checked={ocularExamination.colorVision.blue === true}
            onChange={(e) =>
              handleOcularExamination('colorVision', 'blue', e.target.checked)
            }
          />
        </Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`green`}
            name="green"
            label={`Green`}
            checked={ocularExamination.colorVision.green === true}
            onChange={(e) =>
              handleOcularExamination('colorVision', 'green', e.target.checked)
            }
          />
        </Col>
      </Row>
      <Row className="pt-3 font-weight-bold">
        <Col md={3}>
          <b>Ocular Motility:</b>
        </Col>
        <Col md={4} style={{ paddingLeft: '52px' }}>
          OD:
        </Col>
        <Col md={4} style={{ paddingLeft: '52px' }}>
          OS:
        </Col>
      </Row>
      <Row className="pt-1">
        <Col md={2}></Col>
        <Col>
          <div className="od-os">
            <span
              style={{ position: 'absolute', top: '5px', left: '23px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'sixth',
                  ocularExamination.ocularMotility.od.sixth,
                )
              }
            >
              {ocularExamination.ocularMotility.od.sixth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', top: '5px', left: '110px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'first',
                  ocularExamination.ocularMotility.od.first,
                )
              }
            >
              {ocularExamination.ocularMotility.od.first
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', top: '50px', left: '2px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'fifth',
                  ocularExamination.ocularMotility.od.fifth,
                )
              }
            >
              {ocularExamination.ocularMotility.od.fifth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', bottom: '12px', left: '112px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'third',
                  ocularExamination.ocularMotility.od.third,
                )
              }
            >
              {ocularExamination.ocularMotility.od.third
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <img src={ocularMotility} height="120" width="120"></img>
            <span
              style={{ position: 'absolute', bottom: '11px', left: '23px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'fourth',
                  ocularExamination.ocularMotility.od.fourth,
                )
              }
            >
              {ocularExamination.ocularMotility.od.fourth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', left: '130px', bottom: '59px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'od',
                  'second',
                  ocularExamination.ocularMotility.od.second,
                )
              }
            >
              {ocularExamination.ocularMotility.od.second
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
          </div>
        </Col>
        <Col>
          <div className="od-os">
            <span
              style={{ position: 'absolute', top: '5px', left: '23px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'sixth',
                  ocularExamination.ocularMotility.os.sixth,
                )
              }
            >
              {ocularExamination.ocularMotility.os.sixth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', top: '5px', left: '110px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'first',
                  ocularExamination.ocularMotility.os.first,
                )
              }
            >
              {ocularExamination.ocularMotility.os.first
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', top: '50px', left: '2px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'fifth',
                  ocularExamination.ocularMotility.os.fifth,
                )
              }
            >
              {ocularExamination.ocularMotility.os.fifth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', bottom: '12px', left: '112px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'third',
                  ocularExamination.ocularMotility.os.third,
                )
              }
            >
              {ocularExamination.ocularMotility.os.third
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <img src={ocularMotility} height="120" width="120"></img>
            <span
              style={{ position: 'absolute', left: '23px', bottom: '11px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'fourth',
                  ocularExamination.ocularMotility.os.fourth,
                )
              }
            >
              {ocularExamination.ocularMotility.os.fourth
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
            <span
              style={{ position: 'absolute', left: '130px', bottom: '59px' }}
              className="cursor-pointer"
              onClick={() =>
                handleGraphicalExamination(
                  'ocularMotility',
                  'os',
                  'second',
                  ocularExamination.ocularMotility.os.second,
                )
              }
            >
              {ocularExamination.ocularMotility.os.second
                ? parse(checkedIcon)
                : parse(crossIcon)}
            </span>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row className="">
        <Col md="3">
          <b>Angle Evaluation:</b>
        </Col>
      </Row>
      <Row className="pt-1">
        <Col md={2}></Col>
        <Col>
          <div className="angle-evaluation">
            <span
              className="angle-ev-btn"
              style={{ top: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'od', 'first')
              }
            >
              {ocularExamination.angleEvaluationBefore.od.first || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'first' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="od"
                  indexName="first"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', right: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'od', 'second')
              }
            >
              {ocularExamination.angleEvaluationBefore.od.second || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'second' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="od"
                  indexName="second"
                />
              )}
            <img src={angelEvaluation} height={100} width={140} />
            <span
              className="angle-ev-btn"
              style={{ bottom: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'od', 'third')
              }
            >
              {ocularExamination.angleEvaluationBefore.od.third || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'third' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="od"
                  indexName="third"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', left: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'od', 'fourth')
              }
            >
              {ocularExamination.angleEvaluationBefore.od.fourth || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'fourth' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="od"
                  indexName="fourth"
                />
              )}
          </div>
        </Col>
        <Col className="pr-4">
          <div className="angle-evaluation">
            <span
              className="angle-ev-btn"
              style={{ top: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'os', 'first')
              }
            >
              {ocularExamination.angleEvaluationBefore.os.first || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'first' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="os"
                  indexName="first"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', right: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'os', 'second')
              }
            >
              {ocularExamination.angleEvaluationBefore.os.second || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'second' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="os"
                  indexName="second"
                />
              )}
            <img src={angelEvaluation} height={100} width={140} />
            <span
              className="angle-ev-btn"
              style={{ bottom: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'os', 'third')
              }
            >
              {ocularExamination.angleEvaluationBefore.os.third || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'third' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="os"
                  indexName="third"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', left: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationBefore', 'os', 'fourth')
              }
            >
              {ocularExamination.angleEvaluationBefore.os.fourth || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationBefore' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'fourth' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationBefore"
                  colName="os"
                  indexName="fourth"
                />
              )}
          </div>
        </Col>
      </Row>
      <Row className="mt-4 mb-3">
        <Col md={2}></Col>
        <Col>
          <b>After Indentation:</b>
        </Col>
      </Row>
      <Row>
        <Col md={2}></Col>
        <Col>
          <div className="angle-evaluation">
            <span
              className="angle-ev-btn"
              style={{ top: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'od', 'first')
              }
            >
              {ocularExamination.angleEvaluationAfter.od.first || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'first' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="od"
                  indexName="first"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', right: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'od', 'second')
              }
            >
              {ocularExamination.angleEvaluationAfter.od.second || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'second' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="od"
                  indexName="second"
                />
              )}
            <img src={angelEvaluation} height={100} width={140} />
            <span
              className="angle-ev-btn"
              style={{ bottom: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'od', 'third')
              }
            >
              {ocularExamination.angleEvaluationAfter.od.third || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'third' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="od"
                  indexName="third"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', left: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'od', 'fourth')
              }
            >
              {ocularExamination.angleEvaluationAfter.od.fourth || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'od' &&
              isAngleBtn.indexName === 'fourth' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="od"
                  indexName="fourth"
                />
              )}
          </div>
        </Col>
        <Col className="pr-4">
          <div className="angle-evaluation">
            <span
              className="angle-ev-btn"
              style={{ top: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'os', 'first')
              }
            >
              {ocularExamination.angleEvaluationAfter.os.first || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'first' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="os"
                  indexName="first"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', right: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'os', 'second')
              }
            >
              {ocularExamination.angleEvaluationAfter.os.second || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'second' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="os"
                  indexName="second"
                />
              )}
            <img src={angelEvaluation} height={100} width={140} />
            <span
              className="angle-ev-btn"
              style={{ bottom: 0 }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'os', 'third')
              }
            >
              {ocularExamination.angleEvaluationAfter.os.third || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'third' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="os"
                  indexName="third"
                />
              )}
            <span
              className="angle-ev-btn"
              style={{ top: '73px', left: '0px' }}
              onClick={() =>
                angleEvaluation('angleEvaluationAfter', 'os', 'fourth')
              }
            >
              {ocularExamination.angleEvaluationAfter.os.fourth || 'Select'}{' '}
              <i className="fas fa-angle-down pl-1"></i>
            </span>
            {isAngleBtn.rowName === 'angleEvaluationAfter' &&
              isAngleBtn.type === 'os' &&
              isAngleBtn.indexName === 'fourth' && (
                <CommonButtons
                  unitArray={angleButtonArray}
                  clickAction={handleAngleEvaluation}
                  rowName="angleEvaluationAfter"
                  colName="os"
                  indexName="fourth"
                />
              )}
          </div>
        </Col>
      </Row>
      <Row className="mt-5 pb-4">
        <Col>
          <b>IOP:</b>
        </Col>
        <Col>
          <Form.Control
            size="sm"
            type="number"
            onChange={(e) => handleIop('iop', 'high', e.target.value)}
          />
        </Col>
        <Col className="pt-2">mmHg</Col>
        <Col>
          <Form.Control
            size="sm"
            type="number"
            onChange={(e) => handleIop('iop', 'low', e.target.value)}
          />
        </Col>
        <Col className="pt-2">mmHg</Col>
      </Row>
    </>
  );
};
export default memo(OcularExamination);
