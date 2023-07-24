import React, { useState, useEffect, memo } from 'react';
import { Modal, Row, Tab } from 'react-bootstrap';
import { getRequest, deleteRequest } from '../../../utils/axiosRequests';
import SelectedMedicineItem from '../partials/selectedMedicineItem';
import MedicineGroupForm from '../modals/medicineGroupForm';
import ItemMedicineWithDeleteIcon from '../partials/itemMedicineWithDeleteIcon';
import ItemGroupWithDeleteIcon from '../partials/itemGroupWithDeleteIcon';
import AddMedicineForm from './addMedicineForm';
import LoadMore from '../partials/loadMore';
import { medicineType } from '../../../utils/helpers';
import MedicineSearchArea from '../partials/medicineSearchArea';
import TabNav from '../partials/tabNav';

const RxModal = ({
  medicines,
  setMedicines,
  setCurrentPage,
  totalItem,
  perPage,
  currentPage,
  medicineGroups,
  setMedicineGroups,
  medicinesInSearch,
  setMedicinesInSearch,
  selectedMedicines,
  setSelectedMedicines,
  selectedMedicineGroups,
  setSelectedMedicineGroups,
  showRx,
  setShowRx,
  instructions,
  setInstructions,
}) => {
  const [showMedicineName, setShowMedicineName] = useState('any');
  const [isMedicineGroupModal, setIsMedicineGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMedicineModal, setIsMedicineModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notFoundResult = [
    {
      id: 'notFound',
      brandName: 'not found',
      genericName: 'not found',
    },
  ];
  const deleteMedicineGroup = (groupId) => {
    deleteRequest(`prescriptions/groups/${groupId}`)
      .then((data) => {
        setMedicineGroups(
          medicineGroups.filter((group) => group.id !== groupId),
        );
        setSelectedMedicineGroups(
          selectedMedicineGroups.filter((group) => group.id !== groupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectMedicineGroup = (medicineGroup) => {
    const newMedicines = medicineGroup.medicines.filter(
      (medicine) => !selectedMedicines.some((data) => data.id === medicine.id),
    );
    setSelectedMedicines([...selectedMedicines, ...newMedicines]);
    setSelectedMedicineGroups([...selectedMedicineGroups, medicineGroup]);
  };

  const unSelectMedicineGroup = (medicineGroup) => {
    const result = selectedMedicines.reduce((data, selectedItem) => {
      if (
        !medicineGroup?.medicines?.some(
          (medicine) => medicine.id === selectedItem.id,
        )
      ) {
        data.push(selectedItem);
      }
      return data;
    }, []);

    setSelectedMedicines([...result]);
    setSelectedMedicineGroups(
      selectedMedicineGroups.filter((group) => group.id !== medicineGroup.id),
    );
  };

  const selectMedicines = async (item) => {
    if (
      !selectedMedicines.some(
        (selectedMedicine) => selectedMedicine.id === item.id,
      )
    ) {
      item.name =
        item[showMedicineName === 'any' ? 'brandName' : showMedicineName];
      item.type = item?.type;
      item.itemDetails = [
        {
          quantitiesField: [1, 2, 3],
          schedule: '',
          scheduleUnit: 'বার',
          quantities: { first: 0, second: 0, third: 0 },
          quantity: '',
          quantityUnit: medicineType(item?.type) ? 'টা' : 'চামুচ',
          times: '১',
          timesUnit: 'বেলা',
          duration: '',
          durationUnit: 'দিন',
          instructions: [],
        },
      ];
      // to get default data
      await getRequest(`medicine-default/${item.id}`)
        .then((data) => {
          if (data?.itemDetails?.length > 0) {
            item.itemDetails = data?.itemDetails;
            item.isDefaultSchedule = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setSelectedMedicines([...selectedMedicines, item]);
    }
  };

  const deleteMedicine = (medicineId) => {
    deleteRequest(`medicines/${medicineId}`)
      .then((data) => {
        const result = medicines.filter(
          (medicine) => medicine.id !== medicineId,
        );
        setMedicines([...result]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unselectMedicine = (item) => {
    const result = selectedMedicines.filter(
      (selectedItem) => selectedItem.id !== item.id,
    );
    setSelectedMedicines([...result]);
  };

  const allMedicine = () =>
    medicines.map((item, index) => {
      let isSelected = selectedMedicines.some((data) => data.id === item.id);
      return (
        <ItemMedicineWithDeleteIcon
          key={index}
          item={item}
          isSelected={isSelected}
          removeMedicine={unselectMedicine}
          itemClickAction={selectMedicines}
          removeClickAction={deleteMedicine}
          showMedicineName={showMedicineName}
        />
      );
    });

  let allMedicineGroups = medicineGroups.map((item, index) => {
    let isSelectedGroup = selectedMedicineGroups.some(
      (data) => data.name === item.name,
    );

    return (
      <ItemGroupWithDeleteIcon
        key={index}
        item={item}
        isSelectedGroup={isSelectedGroup}
        unSelectMedicineGroup={unSelectMedicineGroup}
        itemClickAction={selectMedicineGroup}
        removeClickAction={deleteMedicineGroup}
      />
    );
  });

  useEffect(() => {
    allMedicine();
  }, [showMedicineName]);

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
        break;
      case 'instructionRemove':
        selectedMedicines[objIndex]['itemDetails'][itemDetailIndex][
          'instructions'
        ] = value;
        break;
      case 'itemDetails':
        selectedMedicines[objIndex][fieldName] = value;
        break;
      case 'similarMedicine':
        let replacedData = selectedMedicines[objIndex];
        replacedData.name =
          value[showMedicineName === 'any' ? 'brandName' : showMedicineName];
        replacedData.id = value?.id;
        replacedData.brandName = value?.brandName;
        replacedData.companyName = value?.companyName;
        replacedData.genericName = value?.genericName;
        replacedData.strength = value?.strength;
        replacedData.type = value?.type;
        replacedData.altName = value?.altName;
        replacedData.createdBy = value?.createdBy;
        selectedMedicines[objIndex] = replacedData;
        break;
    }
    setSelectedMedicines([...selectedMedicines]);
  };

  const medicineUpdated = (updatedData, selectedIndex) => {
    selectedMedicines[selectedIndex] = updatedData;
    setSelectedMedicines([...selectedMedicines]);
  };

  const selectedMedicineRow = () => {
    const reverseSelectedMedicines = [...selectedMedicines].reverse();
    let count = reverseSelectedMedicines.length;
    return reverseSelectedMedicines.map((item, index) => {
      return (
        <SelectedMedicineItem
          item={item}
          selectedIndex={--count}
          key={index}
          removeMedicine={unselectMedicine}
          handleSelectedMedicine={handleSelectedMedicine}
          showMedicineName={showMedicineName}
          instructions={instructions}
          setInstructions={setInstructions}
          medicineUpdated={medicineUpdated}
        />
      );
    });
  };

  const handleMedicineSearch = (selectedOption) => {
    if (selectedOption.id === 'notFound') {
      setIsMedicineModal(true);
    } else {
      selectMedicines(selectedOption);
      setMedicinesInSearch([...notFoundResult]);
      setSearchQuery('');
    }
  };

  const handleOnInputChange = (val) => {
    setIsLoading(true);
    const url = `medicines?${showMedicineName}=${val}`;
    setSearchQuery(val);
    getRequest(url)
      .then((data) => {
        if (data?.data?.length > 0) {
          const customizedResults = data.data.map((item) => {
            return {
              ...item,
              label:
                item[
                  showMedicineName === 'any' ? 'brandName' : showMedicineName
                ],
              value:
                item[
                  showMedicineName === 'any' ? 'brandName' : showMedicineName
                ],
            };
          });
          setMedicinesInSearch([...customizedResults]);
        } else {
          setMedicinesInSearch([...notFoundResult]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        show={showRx}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Modal.Header className="common-modal-header">
          <Modal.Title>Rx</Modal.Title>
          <div role="group" className="btn-group">
            <button
              type="button"
              className={`btn btn-sm ${
                showMedicineName !== 'genericName'
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setShowMedicineName('brandName')}
            >
              Brand Name
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                showMedicineName === 'genericName'
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setShowMedicineName('genericName')}
            >
              Generic Name
            </button>
          </div>
          <i
            onClick={() => setShowRx(false)}
            className="fa fa-times-circle cursor-pointer"
            aria-hidden="true"
          ></i>
        </Modal.Header>
        <Modal.Body style={{ position: 'relative' }}>
          <MedicineSearchArea
            handleOnInputChange={handleOnInputChange}
            onChange={handleMedicineSearch}
            searchQuery={searchQuery}
            options={medicinesInSearch}
            placeholder={'medicine'}
          />
          <Tab.Container defaultActiveKey="all">
            <TabNav
              action={setIsMedicineGroupModal}
              selectedItems={selectedMedicines}
            />
            <Tab.Content>
              <Tab.Pane eventKey="all" className="add-scroll">
                <Row className="complains-area ml-0 mr-0">{allMedicine()}</Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group" className="add-scroll">
                <Row className="complains-area ml-0 mr-0 mt-1">
                  {allMedicineGroups}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="">
                <Row className="complains-area ml-0 mr-0">{''}</Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <hr className="selected-hr" />
          <div className="selected-item-title">Selected medicine</div>
          <div className="selected-medicine-area">{selectedMedicineRow()}</div>

          <MedicineGroupForm
            isMedicineGroupModal={isMedicineGroupModal}
            setIsMedicineGroupModal={setIsMedicineGroupModal}
            selectedMedicines={selectedMedicines}
            medicineGroups={medicineGroups}
            setMedicineGroups={setMedicineGroups}
            selectedMedicineGroups={selectedMedicineGroups}
            setSelectedMedicineGroups={setSelectedMedicineGroups}
          />
          <AddMedicineForm
            isMedicineModal={isMedicineModal}
            setIsMedicineModal={setIsMedicineModal}
            searchQuery={searchQuery}
            selectMedicines={selectMedicines}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(RxModal);
