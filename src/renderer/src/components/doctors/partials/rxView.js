import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

import {
  itemSettingStyle,
  MEDICINE_TYPES_SHORTS,
  countOccurrencesOf,
} from '../../../utils/helpers';
import SelectedMedicineSchedule from './selectedMedicineSchedule';
import EditSelectedMedicineItem from './editSelectedMedicineItem';
import CommonDeleteBtn from './commonDeleteBtn';

const RxView = ({
  selectedMedicines,
  setSelectedMedicines,
  instructions,
  setInstructions,
  setShowRx,
  prescriptionItems,
  deletePrescriptionItem,
  editMedicineId,
  setEditMedicineId,
  element,
  type,
  isHistoryPage = false,
}) => {
  const handleSelectedMedicine = (
    fieldName,
    itemId,
    value,
    itemDetailIndex,
  ) => {
    const objIndex = selectedMedicines.findIndex(
      (medicine) => medicine.id == itemId,
    );
    switch (fieldName) {
      case 'quantities':
      case 'quantitiesField':
      case 'quantityUnit':
      case 'duration':
      case 'durationUnit':
      case 'quantity':
      case 'schedule':
      case 'scheduleUnit':
        selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
          fieldName
        ] = value;
        setSelectedMedicines([...selectedMedicines]);
        break;
      case 'instructions':
        selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
          fieldName
        ] = [
          ...new Set([
            ...selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
              fieldName
            ],
            value,
          ]),
        ];
        setSelectedMedicines([...selectedMedicines]);
        break;
      case 'instructionRemove':
        selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
          'instructions'
        ] = value;
        setSelectedMedicines([...selectedMedicines]);
        break;
      // case 'default':
      //   selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
      //     fieldName
      //   ] = value;
      //   setSelectedMedicines([...selectedMedicines]);
    }
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
          setInstructions={setInstructions}
          handleSelectedMedicine={handleSelectedMedicine}
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
    return str.join(',').length;
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
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowRx(true);
              },
            }
          : {})}
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
              <Row key={index}>
                <Col
                  className="medicine-schedule-parent prescript-item-hover pl-0"
                  {...(!isHistoryPage
                    ? {
                        onClick: (e) => setEditMedicineId(item?.id),
                      }
                    : {})}
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
                  {item?.itemDetails?.map((data, index) => {
                    return (
                      <SelectedMedicineSchedule
                        data={data}
                        item={item}
                        typeName={item?.type}
                        element={element}
                        rxWhite={rxWhite}
                        setEditMedicineId={setEditMedicineId}
                      />
                    );
                  })}
                </Col>
                <Col md={1}>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={deletePrescriptionItem}
                      itemName={'rx'}
                      delId={item.id}
                    />
                  )}
                </Col>
              </Row>
              {editMedicineId === item.id &&
                !isHistoryPage &&
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
