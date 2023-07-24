import React, { useState, Fragment, memo } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import ScheduleButtons from '../partials/scheduleButtons';
import UnitButtons from '../partials/unitButtons';
import ScheduleUnitButtons from '../partials/scheduleUnitButtons';
import DurationButtons from '../partials/durationButtons';
import ScheduleInputButtons from '../partials/scheduleInputButtons';
import ScheduleQuantityButtons from '../partials/scheduleQuantityButtons';
import DurationUnitButtons from '../partials/durationUnitButtons';

import {
  QTY_SCHEDULES,
  DURATION_UNITS,
  medicineType,
} from '../../../utils/helpers';
import { postRequest } from '../../../utils/axiosRequests';
import {
  MEDICINE_TYPES_SHORTS,
  countOccurrencesOf,
} from '../../../utils/helpers';
import MedicineDefaultModal from '../modals/medicineDefault';
import InstructionTypeHead from './instructionTypeHead';

const SelectedMedicineItem = ({
  item,
  selectedIndex,
  removeMedicine,
  instructions,
  setInstructions,
  medicineUpdated,
  handleSelectedMedicine,
  setMedicineDefaultData,
}) => {
  let count = selectedIndex;
  const [detailIndex, setDetailIndex] = useState(0);
  const [showScheduleBtn, setShowScheduleBtn] = useState(false);
  const [scheduleIndex, setScheduleIndex] = useState('');
  const [showScheduleInputBtn, setShowScheduleInputBtn] = useState(false);
  const [showScheduleQuantityBtn, setShowScheduleQuantityBtn] = useState(false);
  const [showUnitButton, setShowUnitButton] = useState(false);
  const [showDurationBtn, setShowDurationBtn] = useState(false);
  const [showDurationUnitBtn, setShowDurationUnitBtn] = useState(false);
  const [showScheduleUnitBtn, setShowScheduleUnitBtn] = useState(false);
  const [isMedicineDefault, setIsMedicineDefault] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [type, setType] = useState('quantity');
  const buttonArray = [1, 2, 3, 4, 5, 6];
  const inputArr = [
    '0',
    '১',
    '১/৪',
    '১/২',
    '৩/৪',
    '১ ১/২',
    '২',
    '২ ১/২',
    '৩',
    '৪',
    '৫',
    '৬',
    '৭',
  ];

  let quantitiesFieldsWithValue = {};
  const getScheduleInputFields = (data, key) => {
    let quantitiesField = data?.quantitiesField;
    return quantitiesField.map((field, index) => {
      let quantityValue = data.quantities
        ? data.quantities[QTY_SCHEDULES[index]]
        : 0;
      quantitiesFieldsWithValue[QTY_SCHEDULES[index]] = quantityValue
        ? quantityValue
        : 0;
      return (
        <Fragment key={index}>
          <Button
            size="sm"
            className="medicine-schedule-input-btn"
            variant="outline-secondary"
            onClick={(e) => handleButtonInput(QTY_SCHEDULES[index])}
          >
            <span>{quantityValue ? quantityValue : 0}</span>
            <i className="fa fa-sort" aria-hidden="true"></i>
          </Button>
          {index !== quantitiesField.length - 1 ? <div> + </div> : ''}
        </Fragment>
      );
    });
  };

  const setQuantitiesField = (fieldPosition, value, type) => {
    if (type !== 'change') {
      btnFieldClear();
      setShowScheduleInputBtn(false);
    }
    quantitiesFieldsWithValue[fieldPosition] = value;
    fieldUpdateWithValue('quantities', quantitiesFieldsWithValue);
  };

  const fieldUpdateWithValue = (fieldName, value) => {
    handleSelectedMedicine(fieldName, item.id, value, detailIndex);
  };

  const handleScheduleFieldNumber = (inputFields, itemDetailIndex) => {
    setShowScheduleBtn(false);
    handleSelectedMedicine(
      'quantitiesField',
      item.id,
      inputFields,
      itemDetailIndex,
    );
  };

  const removeInstruction = (insItem) => {
    const result = item?.itemDetails[detailIndex]?.instructions?.filter(
      (instruction) => instruction !== insItem,
    );
    fieldUpdateWithValue('instructionRemove', result);
  };

  const handleButtonInput = (fieldPosition) => {
    if (quantitiesFieldsWithValue[fieldPosition] === 0) {
      quantitiesFieldsWithValue[fieldPosition] = '১';
      fieldUpdateWithValue('quantities', quantitiesFieldsWithValue);
    }
    setScheduleIndex(fieldPosition);
    setShowScheduleInputBtn(showScheduleInputBtn ? false : true);
  };

  const selectedUnit = (changeType, fieldName, val) => {
    fieldUpdateWithValue(fieldName, val);
    if (changeType === 'select' || changeType === 'clickOutside') {
      btnFieldClear();
    }
  };

  const unitArrayData = (type) => {
    let result = [];
    if (type === 'quantityUnit') {
      // don not delete this code because it will be used in future
      // if (TAB_CAP_ARRAY.indexOf(convertToLower(item?.type)) !== -1) {
      //   result = ["টা", "টি"];
      // } else if (
      //   POWDER_SYRUP_ARRAY.indexOf(convertToLower(item?.type)) === -1
      // ) {
      //   result = [
      //     "টা",
      //     "টি",
      //     "চামুচ",
      //     "চা চামুচ",
      //     "বার",
      //     "চাপ",
      //     "পাফ",
      //     "স্প্রে",
      //     "লাগাবেন",
      //     "ফোটা",
      //     "স্টিক",

      //   ];
      // } else if (IV_INFUSION_ARRAY.indexOf(convertToLower(item?.type)) !== -1) {
      //   result = ["এম্পুল", "ml", "Unit", "বার"];
      // }
      if (medicineType(item?.type)) {
        result = ['টা', 'টি'];
      } else {
        result = [
          'টা',
          'টি',
          'চামুচ',
          'চা চামুচ',
          'বার',
          'চাপ',
          'পাফ',
          'স্প্রে',
          'লাগাবেন',
          'ফোটা',
          'স্টিক',
        ];
      }
    } else if (type === 'scheduleUnit') {
      result = ['বার', 'বেলা', 'ঘন্টা পরপর'];
    } else if (type === 'duration') {
      result = ['১', '২', '৩', '৫', '৭', '১০', '১৫', '২০', '৩০'];
    }
    return result;
  };

  const toggleUnitButton = (type, index) => {
    btnFieldClear();
    if (type === 'quantity') {
      setShowUnitButton(showUnitButton ? false : true);
    } else if (type === 'schedule') {
      setShowScheduleUnitBtn(showScheduleUnitBtn ? false : true);
    } else if (type === 'duration') {
      setShowDurationBtn(showDurationBtn ? false : true);
    } else if (type === 'durationUnit') {
      setShowDurationUnitBtn(showDurationUnitBtn ? false : true);
    }
  };

  const actionOnClick = (fieldName, value) => {
    fieldUpdateWithValue(fieldName, value);
    btnFieldClear();
  };

  const btnFieldClear = () => {
    setShowUnitButton(false);
    setShowDurationBtn(false);
    setShowScheduleInputBtn(false);
    setShowScheduleUnitBtn(false);
    setShowScheduleQuantityBtn(false);
    setShowDurationUnitBtn(false);
  };

  const updateOnClickActionBtn = (type) => {
    setShowScheduleQuantityBtn(showScheduleQuantityBtn ? false : true);
    setType(type);
  };

  const makeDefault = () => {
    postRequest('medicine-default', {
      itemDetails: [item.itemDetails[0]],
      medicineId: item?.id,
      isDefault: true,
    })
      .then((data) => {
        setIsDefault(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDefaultData = (scheduleData) => {
    fieldUpdateWithValue('itemDetails', [scheduleData]);
  };

  const duplicateSchedule = () => {
    let newSchedule = {
      ...item?.itemDetails[0],
      quantitiesField: [1, 2, 3],
      instructions: [],
    };
    item.itemDetails.push(newSchedule);
    medicineUpdated(item, selectedIndex);
  };

  const removeSchedule = (index) => {
    item.itemDetails = item.itemDetails.filter((item, key) => {
      return index !== key;
    });
    setMedicineDefaultData(item, selectedIndex);
  };

  const handleScheduleBtnNumber = (index) => {
    setShowScheduleBtn(index);
  };

  const handleDetailIndex = (index) => {
    setDetailIndex(index);
  };

  const selectedList = () => {
    return item?.itemDetails?.map((data, index) => {
      return (
        <div
          key={index}
          style={index > 0 ? { borderTop: '1px solid #fff' } : {}}
          onClick={() => handleDetailIndex(index)}
        >
          <Row className="header-row">
            <Col md={5}>
              {medicineType(item.type) ? (
                <span onClick={() => handleScheduleBtnNumber(index)}>
                  Schedule <i className="fa fa-angle-down"></i>
                </span>
              ) : (
                <span>Quantity</span>
              )}
            </Col>
            <Col md={3}>
              <span>{medicineType(item.type) ? 'Unit' : 'Schedule'}</span>
            </Col>
            <Col md={3}>Duration</Col>
          </Row>
          <Row className="mb-1">
            {medicineType(item.type) && (
              <Col md={5} className="text-center">
                {showScheduleBtn === index && (
                  <ScheduleButtons
                    itemDetailIndex={index}
                    buttonArray={buttonArray}
                    actionMethod={handleScheduleFieldNumber}
                  />
                )}
                <div className="common-input-fields">
                  {getScheduleInputFields(data, index)}
                </div>
              </Col>
            )}
            {!medicineType(item.type) && (
              <Col md={5} className="common-input-fields">
                <Button
                  size="sm"
                  className="medicine-schedule-input-btn mr-1"
                  variant="outline-secondary"
                  onClick={() => updateOnClickActionBtn('quantity')}
                >
                  <span>{data.quantity}</span>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </Button>
                <Button
                  size="sm"
                  className="medicine-schedule-input-btn mr-1"
                  variant="outline-secondary"
                  onClick={() => toggleUnitButton('quantity')}
                >
                  <span className="medicine-text">{data.quantityUnit}</span>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </Button>
              </Col>
            )}
            {medicineType(item.type) && (
              <Col md={3} className="common-input-fields">
                <Button
                  size="sm"
                  className="medicine-schedule-input-btn"
                  variant="outline-secondary"
                  onClick={() => toggleUnitButton('quantity')}
                >
                  <span>{data.quantityUnit}</span>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </Button>
              </Col>
            )}
            {!medicineType(item.type) && (
              <Col md={3} className="common-input-fields">
                <Button
                  size="sm"
                  className="medicine-schedule-input-btn"
                  variant="outline-secondary"
                  onClick={() => updateOnClickActionBtn('schedule')}
                >
                  <span>{data.schedule}</span>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </Button>
                <Button
                  size="sm"
                  className="medicine-schedule-input-btn"
                  variant="outline-secondary"
                  onClick={() => toggleUnitButton('schedule')}
                >
                  <span className="medicine-text">{data.scheduleUnit}</span>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </Button>
              </Col>
            )}

            <Col md={3} className="common-input-fields">
              <Button
                size="sm"
                className="medicine-schedule-input-btn"
                variant="outline-secondary"
                onClick={() => toggleUnitButton('duration')}
                disabled={item.durationUnit === 'চলবে' ? true : false}
              >
                <span>{data.duration}</span>
                <i className="fa fa-sort" aria-hidden="true"></i>
              </Button>
              <Button
                size="sm"
                className="medicine-schedule-input-btn"
                variant="outline-secondary"
                onClick={() => toggleUnitButton('durationUnit')}
              >
                <span>{data.durationUnit}</span>
                <i className="fa fa-sort" aria-hidden="true"></i>
              </Button>
            </Col>
            <Col className="text-center">
              {index > 0 && (
                <i
                  className="fa fa-times-circle cursor-pointer"
                  onClick={() => removeSchedule(index)}
                  aria-hidden="true"
                ></i>
              )}
            </Col>
          </Row>
          {showScheduleQuantityBtn && detailIndex === index && (
            <Row>
              <Col>
                <ScheduleQuantityButtons
                  inputArr={inputArr}
                  actionOnClick={actionOnClick}
                  type={type}
                />
              </Col>
            </Row>
          )}
          {showScheduleUnitBtn && detailIndex === index && (
            <Row>
              <Col md={6}></Col>
              <Col>
                <ScheduleUnitButtons
                  unitArray={unitArrayData('scheduleUnit')}
                  selectedUnit={selectedUnit}
                />
              </Col>
            </Row>
          )}
          {showScheduleInputBtn && detailIndex === index && (
            <Row>
              <Col>
                <ScheduleInputButtons
                  inputArr={inputArr}
                  setQuantitiesField={setQuantitiesField}
                  scheduleIndex={scheduleIndex}
                />
              </Col>
            </Row>
          )}
          {showUnitButton && detailIndex === index && (
            <Row>
              <Col md={6}></Col>
              <Col>
                <UnitButtons
                  unitArray={unitArrayData('quantityUnit')}
                  selectedUnit={selectedUnit}
                />
              </Col>
            </Row>
          )}
          {detailIndex === index && showDurationBtn && (
            <Row>
              <Col md={6}></Col>
              <Col>
                <DurationButtons
                  unitArray={unitArrayData('duration')}
                  selectedUnit={selectedUnit}
                />
              </Col>
            </Row>
          )}
          {showDurationUnitBtn && detailIndex === index && (
            <Row>
              <Col md={7}></Col>
              <Col>
                <DurationUnitButtons
                  inputArr={DURATION_UNITS}
                  actionOnClick={actionOnClick}
                  type={type}
                />
              </Col>
            </Row>
          )}
          <Row className="mt-2 mb-1">
            <Col md={7}>
              {item?.itemDetails[index]?.instructions?.map((insItem, index) => (
                <Button
                  key={index}
                  variant="primary"
                  className="btn btn-sm mr-2 mb-1 customize-btn"
                  onClick={() => removeInstruction(insItem)}
                >
                  {insItem}
                </Button>
              ))}
            </Col>
            <Col
              md={5}
              className="medicine-remarks"
              style={{ position: 'static' }}
            >
              <InstructionTypeHead
                index={index}
                item={item}
                detailIndex={detailIndex}
                instructions={instructions}
                setInstructions={setInstructions}
                fieldUpdateWithValue={fieldUpdateWithValue}
              />
            </Col>
          </Row>
        </div>
      );
    });
  };

  return (
    <>
      <div className="selected-medicine-item">
        <Row className="ml-0 mr-0">
          <Col md={7}>
            {++count}. {MEDICINE_TYPES_SHORTS[item.type]} {item.name}{' '}
            {`${
              item.strength && countOccurrencesOf(item.strength, '+') <= 1
                ? ' (' + item.strength + ')'
                : ''
            }`}{' '}
            <i
              className="fa fa-bars"
              title="More information"
              onClick={() => setIsMedicineDefault(true)}
            ></i>
            <i
              className="fa fa-copy"
              title="Multiple Medicine Schedule"
              onClick={() => duplicateSchedule()}
            ></i>
            <i
              className={`fa fa-flag ${
                isDefault || item?.isDefaultSchedule
                  ? 'flag-active'
                  : 'flag-inactive'
              }`}
              title="Make default"
              onClick={() => makeDefault()}
            ></i>
          </Col>
          <Col className="text-right">
            <i
              className="fa fa-times-circle"
              onClick={() => removeMedicine(item)}
              aria-hidden="true"
            ></i>
          </Col>
        </Row>
        {selectedList()}
      </div>
      <MedicineDefaultModal
        item={item}
        handleDefaultData={handleDefaultData}
        isTabCabType={medicineType(item.type)}
        isMedicineDefault={isMedicineDefault}
        setIsMedicineDefault={setIsMedicineDefault}
        handleSelectedMedicine={handleSelectedMedicine}
      />
    </>
  );
};

export default memo(SelectedMedicineItem);
