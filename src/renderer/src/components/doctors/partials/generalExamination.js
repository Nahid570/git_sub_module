import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import GeneralExaminationBtn from '../partials/generalExaminationBtn';
import {
  bsaBmiCalculation,
  checkDoctorDept,
  defaultGeneralData,
} from '../../../utils/helpers';

const GeneralExamination = ({
  selectedOnExamination,
  handleOnExaminationData,
}) => {
  let { generalExaminations } = selectedOnExamination;
  generalExaminations = generalExaminations || defaultGeneralData();
  const [fieldName, setFieldName] = useState('');
  const [isGeneralExaminationBtn, setIsGeneralExaminationBtn] = useState(false);
  const [btnInputArray, setBtnInputArray] = useState([]);
  const userInfo = useSelector((state) => state.authReducer.data);
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );
  const isPediatric = checkDoctorDept(
    'pediatrics',
    userInfo?.speciality[0],
    specialties,
  );

  const handleGeneralExamination = (fieldName, val) => {
    if (fieldName === 'systolic' || fieldName === 'diastolic') {
      generalExaminations.bloodPressure[fieldName] = val;
    } else if (
      fieldName === 'pulse' ||
      fieldName === 'pulseUnit' ||
      fieldName === 'pulseType'
    ) {
      if (fieldName === 'pulseType') {
        generalExaminations.pulseInfo['pulse'] = '';
        generalExaminations.pulseInfo[fieldName] =
          generalExaminations.pulseInfo[fieldName] === val ? '' : val;
      } else {
        generalExaminations.pulseInfo['pulseType'] = '';
        generalExaminations.pulseInfo[fieldName] = val;
      }
    } else if (fieldName === 'temperature' || fieldName === 'temperatureUnit') {
      generalExaminations.temperatureInfo['temperatureType'] = '';
      generalExaminations.temperatureInfo[fieldName] = val;
    } else if (fieldName === 'temperatureType') {
      generalExaminations.temperatureInfo['temperature'] = '';
      generalExaminations.temperatureInfo[fieldName] = generalExaminations
        .temperatureInfo[fieldName]
        ? ''
        : val;
    } else if (
      fieldName === 'weight' ||
      fieldName === 'weightUnit' ||
      fieldName === 'weightShowInPrescription'
    ) {
      generalExaminations.weightInfo[fieldName] = val;
      const result = bsaBmiCalculation(
        generalExaminations.heightInfo.feet,
        generalExaminations.heightInfo.inch,
        generalExaminations.heightInfo.heightUnit,
        generalExaminations.weightInfo.weight,
        generalExaminations.weightInfo.weightUnit,
      );
      generalExaminations['bsa'] = result.bsa ? result.bsa.toFixed(2) : '';
      generalExaminations['bmi'] = result.bmi ? result.bmi.toFixed(2) : '';
    } else if (
      fieldName === 'feet' ||
      fieldName === 'inch' ||
      fieldName === 'heightUnit' ||
      fieldName === 'heightShowInPrescription'
    ) {
      generalExaminations.heightInfo[fieldName] = val;
      if (val === 'Cm') {
        generalExaminations.heightInfo.inch = '';
      }
      const result = bsaBmiCalculation(
        generalExaminations.heightInfo.feet,
        generalExaminations.heightInfo.inch,
        generalExaminations.heightInfo.heightUnit,
        generalExaminations.weightInfo.weight,
        generalExaminations.weightInfo.weightUnit,
      );
      generalExaminations['bsa'] = result.bsa ? result.bsa.toFixed(2) : '';
      generalExaminations['bmi'] = result.bmi ? result.bmi.toFixed(2) : '';
    } else if (fieldName === 'showBsa' || fieldName === 'showBmi') {
      generalExaminations[fieldName] = val ? false : true;
    } else if (fieldName === 'idealWeight' || fieldName === 'idealWeightUnit') {
      generalExaminations.idealWeightInfo[fieldName] = val;
    } else {
      generalExaminations[fieldName] = val;
    }
    handleOnExaminationData(generalExaminations, 'generalExamination');
    setIsGeneralExaminationBtn(false);
  };

  const getBsaBmi = (generalExaminations) => {
    ['bsa', 'bmi'].map((data) => {
      generalExaminations[data] = bsaBmiCalculation(
        fieldName,
        generalExaminations.heightInfo.feet,
        generalExaminations.heightInfo.inch,
        generalExaminations.heightInfo.heightUnit,
        generalExaminations.weightInfo.weight,
        generalExaminations.weightInfo.weightUnit,
      );
    });
  };

  const btnStyle = {
    marginRight: '20px',
    width: '20%',
  };

  const handleBtnInputArray = (field) => {
    setFieldName(field);
    let buttonArray;
    if (field === 'systolic') {
      buttonArray = [
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200,
      ];
    } else if (field === 'diastolic') {
      buttonArray = [40, 50, 60, 70, 80, 90, 100, 110, 120];
    } else if (field === 'pulse') {
      buttonArray = [
        40,
        45,
        50,
        55,
        60,
        65,
        70,
        75,
        80,
        85,
        90,
        95,
        100,
        105,
        110,
        115,
        120,
      ];
    } else if (field === 'temperature') {
      buttonArray = [
        '95°',
        '96°',
        '97°',
        '98°',
        '99°',
        '100°',
        '101°',
        '102°',
        '103°',
        '104°',
        '105°',
      ];
    } else if (field === 'weight') {
      isPediatric
        ? (buttonArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35])
        : (buttonArray = [
            40,
            45,
            50,
            55,
            60,
            65,
            70,
            75,
            80,
            85,
            90,
            95,
            100,
            105,
            110,
            115,
            120,
          ]);
    } else if (field === 'feet') {
      buttonArray = [1, 2, 3, 4, 5, 6, 7];
    } else if (field === 'inch') {
      buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else if (field === 'idealWeight') {
      isPediatric
        ? (buttonArray = [1, 2, 3, 4, 5, 6, 7])
        : (buttonArray = [40, 45, 50, 55, 60, 65, 70, 75, 80]);
    }
    setIsGeneralExaminationBtn(isGeneralExaminationBtn ? false : true);
    setBtnInputArray(buttonArray);
  };

  return (
    <div className="general-education">
      <Form.Group as={Row}>
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            B. Pressure:
          </Form.Label>
        </Col>
        <Col sm="3">
          <Form.Control
            className="form-control-sm"
            type="number"
            value={generalExaminations?.bloodPressure?.systolic}
            defaultValue={generalExaminations?.bloodPressure?.systolic}
            placeholder="Systolic"
            onClick={() => handleBtnInputArray('systolic')}
            onChange={(e) =>
              handleGeneralExamination('systolic', e.target.value)
            }
          />
        </Col>
        <Col sm="1">
          <span
            className="line"
            style={{
              width: '30px',
              borderBottom: '1px solid #4e73df',
              transform: `translateY(15px)
                            translateX(2px)
                            rotate(110deg)`,
              position: 'absolute',
              top: '3px',
            }}
          ></span>
        </Col>
        <Col sm="3">
          <Form.Control
            className="form-control-sm"
            type="text"
            value={generalExaminations?.bloodPressure?.diastolic}
            defaultValue={generalExaminations?.bloodPressure?.diastolic}
            placeholder="diastolic"
            onClick={() => handleBtnInputArray('diastolic')}
            onChange={(e) =>
              handleGeneralExamination('diastolic', e.target.value)
            }
          />
        </Col>
        <Col sm="2" className="pt-2">
          <span>Mm Hg</span>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn &&
        (fieldName === 'systolic' || fieldName === 'diastolic') && (
          <Row>
            <Col md={fieldName === 'diastolic' ? 6 : 3}></Col>
            <Col md={fieldName === 'diastolic' ? 5 : 9}>
              <GeneralExaminationBtn
                fieldName={fieldName}
                btnInputArray={btnInputArray}
                onClickAction={handleGeneralExamination}
              />
            </Col>
          </Row>
        )}
      <Form.Group as={Row} className="mt-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Pulse:
          </Form.Label>
        </Col>
        <Col sm="2">
          <Form.Control
            className="form-control-sm"
            type="text"
            defaultValue={generalExaminations?.pulseInfo?.pulse}
            placeholder="Pulse"
            onClick={() => handleBtnInputArray('pulse')}
            onChange={(e) => handleGeneralExamination('pulse', e.target.value)}
          />
        </Col>
        <Col md="2">
          <Form.Select
            className="form-control form-control-sm"
            defaultValue={generalExaminations?.pulseInfo?.pulseUnit}
            onChange={(e) =>
              handleGeneralExamination('pulseUnit', e.target.value)
            }
          >
            <option value="PM">Per Minute</option>
            <option value="BPM">BPM</option>
          </Form.Select>
        </Col>
        <Col sm="4" className="pt-1">
          <Button
            variant={
              generalExaminations.pulseInfo.pulseType === 'Regular'
                ? 'primary'
                : 'outline-secondary'
            }
            size="sm"
            className="mr-2"
            onClick={(e) => handleGeneralExamination('pulseType', 'Regular')}
          >
            Regular
          </Button>
          <Button
            variant={
              generalExaminations.pulseInfo.pulseType === 'Irregular'
                ? 'primary'
                : 'outline-secondary'
            }
            size="sm"
            className="mr-2"
            onClick={(e) => handleGeneralExamination('pulseType', 'Irregular')}
          >
            Irregular
          </Button>
          <Button
            variant={
              generalExaminations.pulseInfo.pulseType === 'Drop Beat'
                ? 'primary'
                : 'outline-secondary'
            }
            size="sm"
            onClick={(e) => handleGeneralExamination('pulseType', 'Drop Beat')}
          >
            Drop Beat
          </Button>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn && fieldName === 'pulse' && (
        <Row>
          <Col md={2}></Col>
          <Col md={10}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleGeneralExamination}
            />
          </Col>
        </Row>
      )}
      <Form.Group as={Row} className="mt-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Temperature:
          </Form.Label>
        </Col>
        <Col sm="2">
          <Form.Control
            className="form-control-sm"
            type="text"
            defaultValue={generalExaminations.temperatureInfo.temperature}
            placeholder="Temperature"
            onClick={() => handleBtnInputArray('temperature')}
            onChange={(e) =>
              handleGeneralExamination('temperature', e.target.value)
            }
          />
        </Col>
        <Col md="2">
          <Form.Select
            className="form-control form-control-sm"
            defaultValue={generalExaminations.temperatureInfo.temperatureUnit}
            onChange={(e) =>
              handleGeneralExamination('temperatureUnit', e.target.value)
            }
          >
            <option value="F">
              <span>&#8457;</span>
            </option>
            <option value="C">
              <span>&#8451;</span>
            </option>
            <option value="K">K</option>
          </Form.Select>
        </Col>
        <Col sm="2">
          <Button
            style={{ marginTop: '5px' }}
            variant={
              generalExaminations.temperatureInfo.temperatureType === 'Normal'
                ? 'primary'
                : 'outline-secondary'
            }
            size="sm"
            className="mr-2"
            onClick={(e) =>
              handleGeneralExamination('temperatureType', 'Normal')
            }
          >
            Normal
          </Button>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn && fieldName === 'temperature' && (
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleGeneralExamination}
            />
          </Col>
        </Row>
      )}
      <Form.Group as={Row} className="mt-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Weight:
          </Form.Label>
        </Col>
        <Col sm="2">
          <Form.Control
            className="form-control-sm"
            type="text"
            value={generalExaminations.weightInfo.weight}
            defaultValue={generalExaminations.weightInfo.weight}
            placeholder="Weight"
            onClick={() => handleBtnInputArray('weight')}
            onChange={(e) => handleGeneralExamination('weight', e.target.value)}
          />
        </Col>
        <Col md="2">
          <Form.Select
            className="form-control form-control-sm"
            value={generalExaminations.weightInfo.weightUnit}
            defaultValue={generalExaminations.weightInfo.weightUnit}
            onChange={(e) =>
              handleGeneralExamination('weightUnit', e.target.value)
            }
          >
            <option value="KG">KG</option>
            <option value="Pound">Pound</option>
          </Form.Select>
        </Col>
        <Col sm="2" className="pt-1">
          <Form.Check
            type={`checkbox`}
            id={`weight_show_in_prescription`}
            style={{ fontSize: '15px' }}
            label={`Show in Rx`}
            onChange={(e) =>
              handleGeneralExamination(
                'weightShowInPrescription',
                e.target.checked,
              )
            }
          />
        </Col>
        <Col sm="3">
          <Button
            size="sm"
            style={{ minWidth: '78px' }}
            variant={
              generalExaminations.showBmi ? 'primary' : 'outline-secondary'
            }
            onClick={() =>
              handleGeneralExamination('showBmi', generalExaminations.showBmi)
            }
          >
            {generalExaminations.showBmi ? 'Hide' : 'Show'} BMI
          </Button>
          <span className="ml-3 font-weight-bold">
            {generalExaminations.bmi}
          </span>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn && fieldName === 'weight' && (
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleGeneralExamination}
            />
          </Col>
        </Row>
      )}
      <Form.Group as={Row} className="mt-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Height:
          </Form.Label>
        </Col>
        <Col sm="1" className="pr-0">
          <Form.Control
            className="form-control-sm"
            value={generalExaminations.heightInfo.feet}
            defaultValue={generalExaminations.heightInfo.feet}
            type="text"
            placeholder="Feet"
            onClick={() => handleBtnInputArray('feet')}
            onChange={(e) => handleGeneralExamination('feet', e.target.value)}
          />
        </Col>
        <Col sm="1">
          <Form.Control
            className="form-control-sm"
            value={generalExaminations.heightInfo.inch}
            defaultValue={generalExaminations.heightInfo.inch}
            type="text"
            disabled={
              generalExaminations.heightInfo.heightUnit === 'Cm' ? true : false
            }
            placeholder="Inch"
            onClick={() => handleBtnInputArray('inch')}
            onChange={(e) => handleGeneralExamination('inch', e.target.value)}
          />
        </Col>
        <Col md="2">
          <Form.Select
            className="form-control form-control-sm"
            defaultValue={generalExaminations.heightInfo.heightUnit}
            onChange={(e) =>
              handleGeneralExamination('heightUnit', e.target.value)
            }
          >
            <option value="Ft">Ft</option>
            <option value="Cm">Cm</option>
          </Form.Select>
        </Col>
        <Col md="2" className="pt-1">
          <Form.Check
            type={`checkbox`}
            style={{ fontSize: '15px' }}
            id={`height_show_in_prescription`}
            label={`Show in Rx`}
            onChange={(e) =>
              handleGeneralExamination(
                'heightShowInPrescription',
                e.target.checked,
              )
            }
          />
        </Col>
        <Col sm="3">
          <Button
            size="sm"
            style={{ minWidth: '78px' }}
            variant={
              generalExaminations.showBsa ? 'primary' : 'outline-secondary'
            }
            onClick={() =>
              handleGeneralExamination('showBsa', generalExaminations.showBsa)
            }
          >
            {generalExaminations.showBsa ? 'Hide' : 'Show'} BSA
          </Button>
          <span className="ml-3 font-weight-bold">
            {generalExaminations.bsa}
          </span>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn &&
        (fieldName === 'feet' || fieldName === 'inch') && (
          <Row>
            <Col md={3}></Col>
            <Col md={9}>
              <GeneralExaminationBtn
                fieldName={fieldName}
                btnInputArray={btnInputArray}
                onClickAction={handleGeneralExamination}
              />
            </Col>
          </Row>
        )}
      <Form.Group as={Row} className="mt-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Ideal Weight:
          </Form.Label>
        </Col>
        <Col sm="2">
          <Form.Control
            className="form-control-sm"
            type="text"
            value={generalExaminations?.idealWeightInfo?.idealWeight}
            defaultValue={generalExaminations?.idealWeightInfo?.idealWeight}
            placeholder="Ideal Height"
            onClick={() => handleBtnInputArray('idealWeight')}
            onChange={(e) =>
              handleGeneralExamination('idealWeight', e.target.value)
            }
          />
        </Col>
        <Col md="2">
          <Form.Select
            className="form-control form-control-sm"
            value={generalExaminations?.idealWeightInfo?.idealWeightUnit}
            defaultValue={generalExaminations?.idealWeightInfo?.idealWeightUnit}
            onChange={(e) =>
              handleGeneralExamination('idealWeightUnit', e.target.value)
            }
          >
            <option value="KG">KG</option>
            <option value="Pound">Pound</option>
          </Form.Select>
        </Col>
      </Form.Group>
      {isGeneralExaminationBtn && fieldName === 'idealWeight' && (
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleGeneralExamination}
            />
          </Col>
        </Row>
      )}
      <Form.Group as={Row} className="mt-2 mb-2">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Ideal BMI:
          </Form.Label>
        </Col>
        <Col sm="4">
          <Form.Control
            className="form-control-sm"
            type="text"
            placeholder="Ideal BMI"
            defaultValue={generalExaminations.idealBmi}
            onChange={(e) =>
              handleGeneralExamination('idealBmi', e.target.value)
            }
          />
        </Col>
        <Col sm="1" className="pt-2">
          Cal
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Target Daily Call:
          </Form.Label>
        </Col>
        <Col sm="4">
          <Form.Control
            className="form-control-sm"
            type="text"
            placeholder="Target daily call"
            defaultValue={generalExaminations.targetDailyCalory}
            onChange={(e) =>
              handleGeneralExamination('targetDailyCalory', e.target.value)
            }
          />
        </Col>
        <Col sm="1" className="pt-2">
          Cal
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="3">
          <Form.Label column className="font-weight-bold">
            Diabetes:
          </Form.Label>
        </Col>
        <Col sm="8">
          <Button
            size="sm"
            variant={
              generalExaminations.diabetes === 'Yes'
                ? 'primary'
                : 'outline-secondary'
            }
            style={btnStyle}
            onClick={(e) => handleGeneralExamination('diabetes', 'Yes')}
          >
            <i className="fa fa-check" aria-hidden="true"></i>
          </Button>
          <Button
            size="sm"
            variant={
              generalExaminations.diabetes === 'No'
                ? 'primary'
                : 'outline-secondary'
            }
            style={btnStyle}
            onClick={(e) => handleGeneralExamination('diabetes', 'No')}
          >
            <i className="fa fa-ban" aria-hidden="true"></i>
          </Button>
          <Button
            size="sm"
            variant={
              generalExaminations.diabetes === ''
                ? 'primary'
                : 'outline-secondary'
            }
            style={btnStyle}
            onClick={(e) => handleGeneralExamination('diabetes', '')}
          >
            N/A
          </Button>
        </Col>
      </Form.Group>
    </div>
  );
};

export default memo(GeneralExamination);
