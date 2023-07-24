import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {
  aucCalculation,
  mmIssCalculation,
  cnsIpiTotalPoint,
  defaultGeneralData,
  cnsIpiRiskLevelStatus,
} from '../../../utils/helpers';
import CommonOncologyBtn from './commonOncologyBtn';
import CommonFullBtn from './commonFullBtn';
import SerumSlider from './eyeGlassSlider';
import FieldTypeBtnOncology from './fieldTypeBtnOncology';

const OncologyExamination = ({
  patientInfo,
  setPatientInfo,
  selectedOnExamination,
  handleOnExaminationData,
}) => {
  let { oncologyExamination, generalExaminations } = selectedOnExamination;
  generalExaminations = generalExaminations || defaultGeneralData();
  const [cnsIpiPoint, setCnsIpiPoint] = useState(0);
  const [riskLevelStatus, setRiskLevelStatus] = useState(null);
  let defaultData = {
    serumCreatinine: 2.5,
    targetAUC: '',
    cnsAge: null,
    annArborStage: null,
    ecogStatus: null,
    extranodal: null,
    serumLevel: null,
    aucResult: '',
    cnsIpiResult: '',
    mmIssResult: {
      stage: '',
      survivalMonths: '',
    },
    serum2Microglobulin: '',
    serumAlbumin: '',

    isShowAuc: false,
    isShowCnsIpi: false,
    isShowMmIss: false,
  };
  let selectedData = oncologyExamination || defaultData;

  const poundToWeight = () => {
    let result = generalExaminations?.weightInfo?.weight;
    if (
      generalExaminations?.weightInfo?.weight > 0 &&
      generalExaminations?.weightInfo?.weightUnit === 'Pound'
    ) {
      result = generalExaminations?.weightInfo?.weight * 0.45359237;
    }
    return result;
  };

  useEffect(() => {
    setRiskLevelStatus(cnsIpiRiskLevelStatus(cnsIpiPoint));
  }, [cnsIpiPoint]);

  useEffect(() => {
    const result = aucCalculation(
      patientInfo?.gender,
      patientInfo?.dob?.years,
      poundToWeight(),
      oncologyExamination?.serumCreatinine,
      oncologyExamination?.targetAUC,
    );
    selectedData['aucResult'] = result;
    handleOnExaminationData(selectedData, 'oncologyExamination');
  }, [
    patientInfo?.gender,
    patientInfo?.dob?.years,
    generalExaminations?.weightInfo?.weight,
    generalExaminations?.weightInfo?.weightUnit,
    oncologyExamination?.serumCreatinine,
    oncologyExamination?.targetAUC,
  ]);

  useEffect(() => {
    const result = mmIssCalculation(
      oncologyExamination?.serum2Microglobulin,
      oncologyExamination?.serumAlbumin,
    );
    selectedData['mmIssResult'] = result;
    handleOnExaminationData(selectedData, 'oncologyExamination');
  }, [
    oncologyExamination?.serum2Microglobulin,
    oncologyExamination?.serumAlbumin,
  ]);

  useEffect(() => {
    setCnsIpiPoint(cnsIpiTotalPoint(selectedData));
    setRiskLevelStatus(cnsIpiRiskLevelStatus(cnsIpiPoint));
  }, [
    selectedData?.cnsAge,
    selectedData?.annArborStage,
    selectedData?.ecogStatus,
    selectedData?.extranodal,
    selectedData?.serumLevel,
  ]);

  const handleOncologyData = (fieldName, val, serumCreatinineVal) => {
    switch (fieldName) {
      case 'weight':
      case 'weightUnit':
        generalExaminations['weightInfo'][fieldName] = val;
        handleOnExaminationData(generalExaminations, 'generalExamination');
        break;
      case 'serumCreatinine':
        selectedData[fieldName] = serumCreatinineVal;
        break;
      case 'targetAUC':
      case 'cnsAge':
      case 'annArborStage':
      case 'ecogStatus':
      case 'serumLevel':
      case 'extranodal':
      case 'serumAlbumin':
      case 'serum2Microglobulin':
      case 'isShowAuc':
      case 'isShowCnsIpi':
      case 'isShowMmIss':
        selectedData[fieldName] = val;
        break;
    }
    if (fieldName === 'weight' || fieldName === 'weightUnit') {
      // handleOnExaminationData(generalExaminations, 'generalExamination');
    } else {
      handleOnExaminationData(selectedData, 'oncologyExamination');
    }
  };

  return (
    <>
      <Row className="title">
        <Col>AUC Calculator</Col>
      </Row>
      <hr />
      <Row>
        <Col md={8}>
          <Row>
            <Col md={5} className="label-text pt-1">
              Gender
            </Col>
            <Col>
              <div className="common-small-btn label-text">
                <Button
                  size="sm"
                  variant={
                    patientInfo?.gender === 'male'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() =>
                    setPatientInfo({ ...patientInfo, gender: 'male' })
                  }
                >
                  Male
                </Button>
                <Button
                  size="sm"
                  variant={
                    patientInfo?.gender === 'female'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() =>
                    setPatientInfo({ ...patientInfo, gender: 'female' })
                  }
                >
                  Female
                </Button>
                <Button
                  size="sm"
                  variant={
                    patientInfo?.gender === 'others'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() =>
                    setPatientInfo({ ...patientInfo, gender: 'others' })
                  }
                >
                  Others
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={5} className="label-text">
              Age:
            </Col>
            <Col>
              {/* <FieldTypeBtn btnArr={['Age', 'DOB']} /> */}
              <Form.Control
                size="sm"
                className="w-60"
                type="number"
                defaultValue={patientInfo?.dob?.years}
                onChange={(e) =>
                  setPatientInfo({
                    ...patientInfo,
                    dob: { ...patientInfo?.dob, years: e.target.value },
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={5} className="label-text pt-4">
              Weight:
            </Col>
            <Col>
              <FieldTypeBtnOncology
                btnArr={['KG', 'Pound']}
                fieldName={'weightUnit'}
                selectedItem={generalExaminations?.weightInfo?.weightUnit}
                actionMethod={handleOncologyData}
              />
              <Form.Control
                size="sm"
                className="w-60"
                type="number"
                defaultValue={generalExaminations?.weightInfo?.weight}
                onChange={(e) => handleOncologyData('weight', e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={5} className="label-text">
              Serum Creatinine:
            </Col>
            <Col>
              <div className="glass-slider-area serum-slider">
                <SerumSlider
                  domain={[0.5, 2.5]}
                  tickCount={5}
                  handleData={handleOncologyData}
                  rowName={'serumCreatinine'}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={5} className="label-text">
              Target AUC:
            </Col>
            <Col>
              <Form.Control
                size="sm"
                className="w-60"
                type="number"
                value={selectedData?.targetAUC}
                onChange={(e) =>
                  handleOncologyData('targetAUC', e.target.value)
                }
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="right-part-ag-cal mt-2">
            <span>
              {selectedData?.aucResult ? selectedData?.aucResult + ' mg' : ''}
            </span>
            <p>AUC Calculator Result</p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              handleOncologyData(
                'isShowAuc',
                selectedData?.isShowAuc ? false : true,
              )
            }
            variant={selectedData.isShowAuc ? 'primary' : 'outline-secondary'}
            style={{ width: '99%' }}
          >
            Show result in prescription
          </Button>
        </Col>
      </Row>

      <Row className="title mt-4">
        <Col>CNS-IPI Calculator</Col>
      </Row>
      <hr />
      <Row>
        <Col md={8}>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              Age:
            </Col>
            <Col>
              <Button
                size="sm"
                className={`mb-2 cns-btn-text`}
                variant={
                  selectedData.cnsAge == 0 ? 'primary' : 'outline-secondary'
                }
                style={{ width: '99%' }}
                onClick={() => handleOncologyData('cnsAge', 0)}
              >
                <span>{'< 60'}</span>
                <span>0</span>
              </Button>
              <Button
                size="sm"
                className={`mb-2 cns-btn-text`}
                variant={
                  selectedData.cnsAge == 1 ? 'primary' : 'outline-secondary'
                }
                style={{ width: '99%' }}
                onClick={() => handleOncologyData('cnsAge', 1)}
              >
                <span>{'> 60'}</span>
                <span>1</span>
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <span className="label-text">Ann Arbor stage III- IV:</span>
              <p style={{ fontSize: '10px' }}>
                III: Involvement on both sides of the diaphragm IV: Involvement
                of extranidal sites
              </p>
            </Col>
            <Col>
              <CommonOncologyBtn
                btnType={'md'}
                btnClass={'cns-btn-text'}
                fieldName={'annArborStage'}
                val={selectedData?.annArborStage}
                actionMethod={handleOncologyData}
                btnArr={['No', 'Yes']}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              ECOG performance status ≥ 2
            </Col>
            <Col>
              <CommonOncologyBtn
                btnType={'md'}
                btnClass={'cns-btn-text'}
                fieldName={'ecogStatus'}
                val={selectedData?.ecogStatus}
                actionMethod={handleOncologyData}
                btnArr={['No', 'Yes']}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              {`Serum LDH level > 1 x normal`}
            </Col>
            <Col className="label-text">
              <CommonOncologyBtn
                btnType={'md'}
                btnClass={'cns-btn-text'}
                fieldName={'serumLevel'}
                val={selectedData?.serumLevel}
                actionMethod={handleOncologyData}
                btnArr={['No', 'Yes']}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              {'> 1 Extranodal site'}
            </Col>
            <Col>
              <CommonOncologyBtn
                btnType={'md'}
                btnClass={'cns-btn-text'}
                fieldName={'extranodal'}
                val={selectedData?.extranodal}
                actionMethod={handleOncologyData}
                btnArr={['No', 'Yes']}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="cns-ipi-right-part">
            <div className="first">
              <span className="point-area">
                <span>{cnsIpiPoint}</span>
                <span>Points</span>
              </span>
              <span>{riskLevelStatus?.risk}</span>
            </div>
            <div className="second">
              <div className="point-area">
                <span>{riskLevelStatus?.os}</span>
              </div>
              <div className="risk-status">
                <span>{riskLevelStatus?.year3Os}</span>
                <span>{riskLevelStatus?.year5Os}</span>
              </div>
            </div>
            <div className="third">
              <div className="point-area">
                <span>{riskLevelStatus?.pfs}</span>
              </div>
              <div className="risk-status">
                <span>{riskLevelStatus?.year3Pfs}</span>
                <span>{riskLevelStatus?.year5OPfs}</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() =>
              handleOncologyData(
                'isShowCnsIpi',
                selectedData?.isShowCnsIpi ? false : true,
              )
            }
            variant={
              selectedData.isShowCnsIpi ? 'primary' : 'outline-secondary'
            }
            style={{ width: '99%' }}
          >
            Show result in prescription
          </Button>
        </Col>
      </Row>

      <Row className="title mt-3">
        <Col>MM-ISS Calculator</Col>
      </Row>
      <hr />
      <Row>
        <Col md={8}>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              Serum 2 microglobulin:
            </Col>
            <Col>
              <CommonFullBtn
                btnType={'md'}
                btnClass={'btn-full'}
                fieldName={'serum2Microglobulin'}
                val={selectedData?.serum2Microglobulin}
                actionMethod={handleOncologyData}
                btnArr={['< 3.5 mg/L', '3.5 - 5.4 mg/L', '> 5.4 mg/L']}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6} className="label-text">
              Serum Albumin
            </Col>
            <Col>
              <CommonFullBtn
                btnType={'md'}
                btnClass={'btn-full'}
                fieldName={'serumAlbumin'}
                val={selectedData?.serumAlbumin}
                actionMethod={handleOncologyData}
                btnArr={['< 3.5 g/dL', '>= 3.5 g/dL']}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="mm-iss-right-part mt-2">
            <div>{selectedData?.mmIssResult?.stage || 'Stage'}</div>
            <div>
              Multiple Myeloma Median survival is{' '}
              {selectedData?.mmIssResult?.survivalMonths} months
            </div>
          </div>
          <Button
            size="sm"
            onClick={() =>
              handleOncologyData(
                'isShowMmIss',
                selectedData?.isShowMmIss ? false : true,
              )
            }
            className="mt-1"
            variant={selectedData.isShowMmIss ? 'primary' : 'outline-secondary'}
            style={{ width: '99%' }}
          >
            Show result in prescription
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default OncologyExamination;
