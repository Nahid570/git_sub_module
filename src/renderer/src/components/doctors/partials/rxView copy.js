import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import EditSelectedMedicineItem from './editSelectedMedicineItem';
import {
  convertToLower,
  TAB_CAP_ARRAY,
  itemSettingStyle,
  MEDICINE_TYPES_SHORTS,
  countOccurrencesOf,
} from '../../../utils/helpers';

const RxView = ({
  selectedMedicines,
  instructions,
  setShowRx,
  prescriptionItems,
  deletePrescriptionItem,
  handleRxsState,
  editMedicineId,
  setEditMedicineId,
  element,
  type,
}) => {
  const handleSelectedMedicine = (fieldName, item, value) => {
    const objIndex = selectedMedicines.findIndex(
      (medicine) => medicine.id == item.id,
    );
    if (fieldName === 'instructions') {
      selectedMedicines[objIndex]['instructions'] = [
        ...new Set([...selectedMedicines[objIndex]['instructions'], value]),
      ];
    } else if (fieldName === 'instructionRemove') {
      selectedMedicines[objIndex]['instructions'] = value;
    } else {
      selectedMedicines[objIndex][fieldName] = value;
    }
    handleRxsState('instruction', selectedMedicines);
  };

  const selectedMedicineRow = (items) =>
    items.map((item, index) => {
      let objIndex = selectedMedicines.findIndex(
        (medicine) => medicine.id == item.id,
      );
      return (
        <EditSelectedMedicineItem
          item={item}
          selectedIndex={++objIndex}
          key={index}
          showMedicineName={true}
          instructions={instructions}
          handleSelectedMedicine={handleSelectedMedicine}
          handleRxsState={handleRxsState}
          setEditMedicineId={setEditMedicineId}
        />
      );
    });

  let styles = {
    listStyle: 'none',
  };
  if (type !== 'print') {
    styles.minHeight = '200px';
  }

  const getCountSchedule = (item) => {
    const str =
      item.quantity +
      ' ' +
      item.quantityUnit +
      ' ' +
      item.schedule +
      ' ' +
      item.scheduleUnit;

    return str.length;
  };

  const getCountInstructions = (item) => {
    const str = item?.instructions?.map((insItem, key) => (
      <span key={key}>
        {insItem} {item.instructions.length !== key + 1 && ', '}
      </span>
    ));
    console.log('ins lenth: ', str.join(',').length);
    return str.join(',').length;
  };

  const getRxLineClasses = (type = "") => {
    let classNames = "";
    if (type === "rx-schedule") {
      classNames = "medicine-schedule";
    } else if (type === "rx-instruction") {
      classNames = "medicine-instruction";
    }

    if (element?.lineDraw) {
      if (element?.lineType === 'dash') {
        classNames += ' background-dash';
      } else if (element?.lineType === 'dot') {
        classNames += ' background-dot';
      } else if (element?.lineType === 'hiphen') {
        classNames += ' background-hiphen';
      } else if (element?.lineType === 'none') {
        classNames = '';
      }
    }
    return classNames;
  };

  const getRxStrength = (item) => {
    let strengthGeneric = '';
    if (element?.showGeneric) {
      strengthGeneric =
        item?.strength && countOccurrencesOf(item.strength, '+') <= 1
          ? ' ' + item?.strength + ' '
          : '';
    } else {
      strengthGeneric =
        item.strength && countOccurrencesOf(item.strength, '+') <= 1
          ? ' (' + item.strength + ')'
          : '';
    }
    return strengthGeneric;
  };

  const getRxGenericName = (item) => {
    let strengthGeneric = '';
    if (element?.showGeneric) {
      return (
        <span style={{ color: 'grey', fontStyle: 'italic' }}>
          ({`${item?.genericName}`})
        </span>
      );
    } else {
      return '';
    }
  };

  const rxWhite = element.lineDraw ? 'rx-white' : '';

  return (
    <div
      className={`row item-row ${selectedMedicines.length ? 'pb-2' : ''}`}
      key={`rx`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span
        className="prescription-item"
        onClick={(e) => {
          e.stopPropagation();
          setShowRx(true);
        }}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Rx +</span>
        )}
      </span>
      <ul className="sub-child-list rx-sub-child" style={styles}>
        {selectedMedicines?.map((item, index) => {
          return (
            <li key={index} style={{ position: 'relative' }}>
              <Row>
                <Col
                  className="medicine-schedule-parent prescript-item-hover pl-0"
                  onClick={() => setEditMedicineId(item?.id)}
                >
                  <div className="text-left">
                    <span
                      className={element?.showGeneric ? 'bold' : ''}
                      style={itemSettingStyle(
                        prescriptionItems?.items?.rx?.itemStyle || {},
                      )}
                    >
                      {++index}. {MEDICINE_TYPES_SHORTS[item.type]} {item.name}{' '}
                      {`${getRxStrength(item)}`} {getRxGenericName(item)}
                    </span>
                  </div>
                  {/* {(Object.values(item.quantities)?.some((val) => val !== 0) ||
                      item.quantity) && ( */}
                  <div
                    className="ml-4 rx-left-space"
                    style={itemSettingStyle(
                      prescriptionItems?.items?.rx?.subItemStyle || {},
                    )}
                  >
                    <span className={getRxLineClasses('rx-schedule')}>
                      {TAB_CAP_ARRAY.includes(convertToLower(item?.type)) &&
                        Object.values(item.quantities)?.some(
                          (val) => val !== 0,
                        ) &&
                        Object.values(item.quantities)?.map((data, index) => (
                          <span key={index} className={rxWhite}>
                            {data}
                            {++index === Object.values(item.quantities).length
                              ? ' ' + item.quantityUnit
                              : ' + '}
                          </span>
                        ))}
                      {!TAB_CAP_ARRAY.includes(convertToLower(item?.type)) &&
                        item.quantity && (
                          <span className={rxWhite}>
                            {item.quantity +
                              ' ' +
                              item.quantityUnit +
                              ' ' +
                              item.schedule +
                              ' ' +
                              item.scheduleUnit}
                          </span>
                        )}
                      <span className={`pr-2 ${rxWhite}`}></span>
                    </span>

                    <span className={getRxLineClasses('rx-instruction')}>
                      {element?.lineDraw && element?.lineType !== 'none' && (
                        <span className={`pl-2 ${rxWhite}`}></span>
                      )}
                      {item?.instructions?.map((insItem, key) => (
                        <span key={key} className={rxWhite}>
                          {insItem}{' '}
                          {item.instructions.length !== key + 1 && ', '}
                        </span>
                      ))}
                      {element?.lineDraw && element?.lineType !== 'none' && (
                        <span className={`pr-2 ${rxWhite}`}></span>
                      )}
                    </span>

                    <span className="medicine-duration">
                      <span className={`pl-2 ${rxWhite}`}></span>
                      {item.durationUnit === 'চলবে'
                        ? item.durationUnit
                        : item.duration
                        ? item.duration + ' ' + item.durationUnit
                        : ''}
                    </span>
                    {element?.lineDraw && element.lineType === 'underscore' && (
                      <div className="bottom-border"></div>
                    )}
                  </div>
                  {/* )} */}
                </Col>
                <Col md={1}>
                  <span
                    className="float-right cursor-pointer mt-1"
                    onClick={() => deletePrescriptionItem('rx', item.id)}
                  >
                    <i
                      className="fa fa-times-circle"
                      style={{ color: '#CB2020D9' }}
                    ></i>
                  </span>
                </Col>
              </Row>
              {editMedicineId === item.id &&
                selectedMedicineRow(
                  selectedMedicines.filter(
                    (medicine) => medicine.id === item.id,
                  ),
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(RxView);
