import React, { memo } from 'react';
import { Modal, Tab } from 'react-bootstrap';
import ModalHeader from '../partials/modalHeader';
import TabNavMedicineDefault from '../partials/tabNavMedicineDefault';
import Suggestions from '../partials/suggestions';
import SimilarMedicine from '../partials/rx/similarMedicine';
import GenericComposition from '../partials/rx/genericComposition';
import FormatsAndType from '../partials/rx/formatsAndType';

const MedicineDefaultModal = ({
  item,
  isTabCabType,
  isMedicineDefault,
  handleDefaultData,
  setIsMedicineDefault,
  handleSelectedMedicine,
}) => {
  return (
    <>
      <Modal
        show={isMedicineDefault}
        size="md"
        className="medicine-default"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={''} action={setIsMedicineDefault} />
        <Modal.Body>
          <Tab.Container id="left-tabs" defaultActiveKey="suggestions">
            <TabNavMedicineDefault />
            <Tab.Content>
              <Tab.Pane eventKey="suggestions" className="add-scroll">
                <Suggestions
                  medicineId={item?.id}
                  isTabCabType={isTabCabType}
                  handleDefaultData={handleDefaultData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="similarMedicines"
                className="add-scroll similar-medicine"
              >
                <SimilarMedicine
                  item={item}
                  handleSelectedMedicine={handleSelectedMedicine}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="genericComposition"
                className="generic-composition"
              >
                <GenericComposition item={item} />
              </Tab.Pane>
              <Tab.Pane eventKey="formatsAndType" className="formats-type">
                <FormatsAndType />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          Manufacturer: <span>{item?.companyName}</span>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(MedicineDefaultModal);
