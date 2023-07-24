import React, { memo } from 'react';
import parse from 'html-react-parser';
import { styledComponent } from '../../../../utils/helpers';
import { Row, Col } from 'react-bootstrap';
import ocularMotility from '../../../../assets/images/ocularMotility.png';
import angelEvaluation from '../../../../assets/images/angelEvaluation.png';
import CommonDeleteBtn from '../commonDeleteBtn';

const OcularExaminationView = ({
  prescriptionItems,
  selectedOnExamination,
  setSelectedOnExamination,
  isHistoryPage,
}) => {
  let { ocularExamination } = selectedOnExamination;
  const crossIcon = '<i className="fa fa-times-circle"></i>';
  const checkedIcon = '<i className="fas fa-check-circle"></i>';
  const capitalizeFirstChar = (str) => str.replace(/^./, str[0].toUpperCase());

  const removeItemsData = (fieldName) => {
    if (fieldName === 'pl') {
      ocularExamination.pl = {
        present: false,
        absent: false,
      };
    } else if (fieldName === 'fc') {
      ocularExamination.fc = '';
    } else if (fieldName === 'hm') {
      ocularExamination.hm = {
        present: false,
        absent: false,
      };
    } else if (fieldName === 'visualAcuity') {
      ocularExamination.visualAcuity = {
        val: '',
        var: '',
      };
    } else if (fieldName === 'pr') {
      ocularExamination.pr = {
        first: false,
        second: false,
        third: false,
        fourth: false,
      };
    } else if (fieldName === 'ocularMotility') {
      ocularExamination.ocularMotility = {
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
      };
    } else if (fieldName === 'colorVision') {
      ocularExamination.colorVision = {
        normal: false,
        deficit: false,
        red: false,
        blue: false,
        green: false,
      };
    } else if (fieldName === 'angleEvaluationBefore') {
      ocularExamination.angleEvaluationBefore = {
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
      };
    } else if (fieldName === 'angleEvaluationAfter') {
      ocularExamination.angleEvaluationAfter = {
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
      };
    } else {
      ocularExamination.iop = {
        high: '',
        low: '',
      };
    }
    selectedOnExamination.ocularExamination = ocularExamination;
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['on-examination']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['on-examination']?.subItemStyle || {},
  );

  return (
    <>
      {ocularExamination && (
        <div key={`visualAcuity`}>
          {(ocularExamination['visualAcuity'].val ||
            ocularExamination['visualAcuity'].var) && (
            <div className="text-left">
              <Title>Visual Acuity: VAR:</Title>{' '}
              <Value>{ocularExamination['visualAcuity'].var}</Value>,{' '}
              <Title>VAL:</Title>{' '}
              <Value>{ocularExamination['visualAcuity'].val}</Value>
              {!isHistoryPage && (
                <CommonDeleteBtn
                  action={removeItemsData}
                  itemName={'visualAcuity'}
                />
              )}
            </div>
          )}
          {(ocularExamination.pl.present || ocularExamination.pl.absent) && (
            <div className="text-left">
              <Title>PL:</Title>{' '}
              <Value>
                {ocularExamination.pl.present ? 'Present' : 'Absent'}
              </Value>
              {!isHistoryPage && (
                <CommonDeleteBtn action={removeItemsData} itemName={'pl'} />
              )}
            </div>
          )}
          {ocularExamination.fc && (
            <div className="text-left">
              <Title>FC:</Title> <Value>{ocularExamination.fc} ft</Value>
              {!isHistoryPage && (
                <CommonDeleteBtn action={removeItemsData} itemName={'fc'} />
              )}
            </div>
          )}
          {(ocularExamination.hm.present || ocularExamination.hm.absent) && (
            <div className="text-left">
              <Title>HM:</Title>{' '}
              <Value>
                {ocularExamination.hm.present ? 'Present' : 'Absent'}
              </Value>
              {!isHistoryPage && (
                <CommonDeleteBtn action={removeItemsData} itemName={'hm'} />
              )}
            </div>
          )}
          {Object.values(ocularExamination.pr).includes(true) && (
            <>
              <div className="pl-5 pb-3">
                <Title>PR:</Title>
              </div>
              <div className="d-flex justify-content-between">
                <div className="pr-area ml-3">
                  <span
                    style={{
                      top: '-8px',
                      left: '44px',
                    }}
                  >
                    {ocularExamination.pr.first
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      top: '25px',
                      right: 0,
                    }}
                  >
                    {ocularExamination.pr.second
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <img src={angelEvaluation} height={70} width={70}></img>
                  <span
                    style={{
                      bottom: '-8px',
                      left: '43px',
                    }}
                  >
                    {ocularExamination.pr.third
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      top: '25px',
                      left: 0,
                    }}
                  >
                    {ocularExamination.pr.fourth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                </div>
                <div>
                  {!isHistoryPage && (
                    <CommonDeleteBtn action={removeItemsData} itemName={'pr'} />
                  )}
                </div>
              </div>
            </>
          )}
          {Object.values(ocularExamination.colorVision).includes(true) && (
            <div className="text-left mt-3">
              <Title>Color Vision:</Title>{' '}
              {Object.keys(ocularExamination.colorVision).map((data, key) => {
                return ocularExamination.colorVision[data] === true ? (
                  <span key={key} className="pr-1">
                    <Value>{capitalizeFirstChar(data)},</Value>
                  </span>
                ) : (
                  ''
                );
              })}
              {!isHistoryPage && (
                <CommonDeleteBtn
                  action={removeItemsData}
                  itemName={'colorVision'}
                />
              )}
            </div>
          )}
          {(Object.values(ocularExamination.ocularMotility.od).includes(true) ||
            Object.values(ocularExamination.ocularMotility.os).includes(
              true,
            )) && (
            <div className="text-left mt-3" style={{ position: 'relative' }}>
              <Row>
                <Col md={3}>
                  <div>
                    <Title>Ocular Motility:</Title>
                  </div>
                </Col>
                <Col>
                  <span style={{ position: 'absolute', left: '16px' }}>
                    {ocularExamination.ocularMotility.od.first
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{ position: 'absolute', top: '0px', left: '67px' }}
                  >
                    {ocularExamination.ocularMotility.od.second
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <img src={ocularMotility} height="70" width="70"></img>

                  <span
                    style={{ position: 'absolute', top: '25px', left: '3px' }}
                  >
                    {ocularExamination.ocularMotility.od.third
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-3px',
                      left: '67px',
                    }}
                  >
                    {ocularExamination.ocularMotility.od.sixth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: '15px',
                      bottom: '-3px',
                    }}
                  >
                    {ocularExamination.ocularMotility.od.fifth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '25px',
                      left: '76px',
                    }}
                  >
                    {ocularExamination.ocularMotility.od.fourth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                </Col>
                <Col>
                  <span
                    style={{ position: 'absolute', top: '0px', left: '18px' }}
                  >
                    {ocularExamination.ocularMotility.os.first
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{ position: 'absolute', top: '0px', left: '66px' }}
                  >
                    {ocularExamination.ocularMotility.os.second
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <img src={ocularMotility} height="70" width="70"></img>
                  <span
                    style={{ position: 'absolute', top: '25px', left: '3px' }}
                  >
                    {ocularExamination.ocularMotility.os.third
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: '66px',
                    }}
                  >
                    {ocularExamination.ocularMotility.os.sixth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: '18px',
                      bottom: '-3px',
                    }}
                  >
                    {ocularExamination.ocularMotility.os.fifth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '25px',
                      left: '76px',
                    }}
                  >
                    {ocularExamination.ocularMotility.os.fourth
                      ? parse(checkedIcon)
                      : parse(crossIcon)}
                  </span>
                </Col>
                <Col md={1}>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={removeItemsData}
                      itemName={'ocularMotility'}
                    />
                  )}
                </Col>
              </Row>
            </div>
          )}
          {(Object.values(ocularExamination.angleEvaluationBefore.od).some(
            (val) => val !== '',
          ) ||
            Object.values(ocularExamination.angleEvaluationBefore.os).some(
              (val) => val !== '',
            )) && (
            <div className="text-left" style={{ position: 'relative' }}>
              <Row className="pt-4">
                <Col md={3}>
                  <div>
                    <Title>Angle Evaluation:</Title>
                  </div>
                </Col>
                <Col>
                  {Object.values(
                    ocularExamination.angleEvaluationBefore.od,
                  ).some((val) => val !== '') && (
                    <div className="angle-evaluation view-angle-evaluation">
                      <span
                        style={{
                          left: '38px',
                          top: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.od.first}
                      </span>
                      <span
                        style={{
                          top: '39px',
                          right: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.od.second}
                      </span>
                      <img src={angelEvaluation} height={70} width={70}></img>

                      <span
                        style={{
                          top: '39px',
                          left: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.od.fourth}
                      </span>
                      <span
                        style={{
                          bottom: '0px',
                          left: '38px',
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.od.third}
                      </span>
                    </div>
                  )}
                </Col>
                <Col>
                  {Object.values(
                    ocularExamination.angleEvaluationBefore.os,
                  ).some((val) => val !== '') && (
                    <div className="angle-evaluation view-angle-evaluation">
                      <span
                        style={{
                          left: '38px',
                          top: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.os.first}
                      </span>
                      <span
                        style={{
                          top: '39px',
                          right: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.os.second}
                      </span>
                      <img src={angelEvaluation} height={70} width={70}></img>
                      <span
                        style={{
                          top: '39px',
                          left: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.os.fourth}
                      </span>
                      <span
                        style={{
                          bottom: '0px',
                          left: '38px',
                        }}
                      >
                        {ocularExamination.angleEvaluationBefore.os.third}
                      </span>
                    </div>
                  )}
                </Col>
                <Col md={1}>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={removeItemsData}
                      itemName={'angleEvaluationBefore'}
                    />
                  )}
                </Col>
              </Row>
            </div>
          )}
          {(Object.values(ocularExamination.angleEvaluationAfter.od).some(
            (val) => val !== '',
          ) ||
            Object.values(ocularExamination.angleEvaluationAfter.os).some(
              (val) => val !== '',
            )) && (
            <div className="text-left" style={{ position: 'relative' }}>
              <Row className="pt-4">
                <Col md={3}>
                  <Title>After Indentation:</Title>
                </Col>
                <Col>
                  {Object.values(
                    ocularExamination.angleEvaluationAfter.od,
                  ).some((val) => val !== '') && (
                    <div className="angle-evaluation view-angle-evaluation">
                      <span
                        style={{
                          left: '38px',
                          top: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.od.first}
                      </span>
                      <span
                        style={{
                          top: '39px',
                          right: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.od.second}
                      </span>
                      <img src={angelEvaluation} height={70} width={70}></img>
                      <span
                        style={{
                          top: '39px',
                          left: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.od.fourth}
                      </span>
                      <span
                        style={{
                          bottom: '0px',
                          left: '38px',
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.od.third}
                      </span>
                    </div>
                  )}
                </Col>
                <Col>
                  {Object.values(
                    ocularExamination.angleEvaluationAfter.os,
                  ).some((val) => val !== '') && (
                    <div className="angle-evaluation view-angle-evaluation">
                      <span
                        style={{
                          left: '38px',
                          top: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.os.first}
                      </span>
                      <span
                        style={{
                          top: '39px',
                          right: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.os.second}
                      </span>
                      <img src={angelEvaluation} height={70} width={70}></img>
                      <span
                        style={{
                          top: '39px',
                          left: 0,
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.os.fourth}
                      </span>
                      <span
                        style={{
                          bottom: '0px',
                          left: '38px',
                        }}
                      >
                        {ocularExamination.angleEvaluationAfter.os.third}
                      </span>
                    </div>
                  )}
                </Col>
                <Col md={1}>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={removeItemsData}
                      itemName={'angleEvaluationAfter'}
                    />
                  )}
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
      {(ocularExamination?.iop?.high || ocularExamination?.iop?.low) && (
        <div className="text-left pt-3">
          <Title>IOP: High:</Title>
          <Value> {ocularExamination.iop.high} mmHg,</Value> <Title>Low:</Title>
          <Value> {ocularExamination.iop.low} mmHg</Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'iop'} />
          )}
        </div>
      )}
    </>
  );
};

export default OcularExaminationView;
