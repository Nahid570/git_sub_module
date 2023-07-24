import React, { useState, useEffect, memo } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { patchRequest } from '../../../utils/axiosRequests';
import { useGetRequest } from '../../../hooks/useGetRequest';
import Information from './rx/information';

const Suggestion = ({ medicineId, isTabCabType, handleDefaultData }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getMedicineDefault();
  }, [medicineId]);

  const { isLoading: isLoading, refetch: getMedicineDefault } = useGetRequest(
    `getMedicineDefault`,
    `medicine-default?medicineId=${medicineId}`,
    (data) => {
      setSchedules(data.data);
    },
    (e) => {
      console.log(e);
    },
  );

  const defaultAction = (
    defaultId,
    medicineId,
    doctorId,
    defaultVal,
    scheduleData,
  ) => {
    patchRequest(`medicine-default/${defaultId}`, {
      medicineId: medicineId,
      doctorId: doctorId,
      isDefault: defaultVal ? false : true,
    })
      .then((data) => {
        let result = schedules.map((obj) => {
          if (obj.isDefault === true) {
            return {
              ...obj,
              isDefault: false,
            };
          } else if (obj.id === defaultId) {
            return {
              ...obj,
              isDefault: true,
            };
          }
          return obj;
        });
        setSchedules([...result]);
        handleDefaultData(scheduleData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scheduleList = () => {
    return schedules?.map((parentData, index) => {
      return parentData?.itemDetails.map((scheduleData, index) => {
        return (
          <div className={parentData?.isDefault && 'default'} key={index}>
            <span>
              {isTabCabType &&
                Object.values(scheduleData?.quantities)?.map((item, index) => (
                  <span key={index}>
                    {item}
                    {++index === Object.values(scheduleData?.quantities).length
                      ? ' ' + scheduleData?.quantityUnit
                      : ' + '}
                  </span>
                ))}
              {!isTabCabType && (
                <span>
                  {scheduleData.quantity +
                    ' ' +
                    scheduleData.quantityUnit +
                    ' ' +
                    scheduleData.schedule +
                    ' ' +
                    scheduleData.scheduleUnit}
                </span>
              )}
            </span>
            <span className="instruction">
              {scheduleData?.instructions?.map((insItem, key) => (
                <span key={key}>
                  {insItem}{' '}
                  {scheduleData.instructions.length !== key + 1 && ', '}
                </span>
              ))}
            </span>
            <span
              className={
                parentData.isDefault ? 'selected-default' : 'make-default-btn'
              }
              onClick={() =>
                defaultAction(
                  parentData.id,
                  parentData.medicineId,
                  parentData.doctorId,
                  parentData.isDefault,
                  scheduleData,
                )
              }
            >
              {parentData.isDefault ? 'Remove Default' : 'Make Default'}
            </span>
          </div>
        );
      });
    });
  };

  return (
    <Tab.Container id="medicine-suggestion" defaultActiveKey="user-suggestion">
      <Nav variant="pills" className="mt-2">
        <Nav.Item>
          <Nav.Link eventKey="user-suggestion">User Suggestion</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="dose-recommendation">
            Dose Recommendation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="information">Information</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="user-suggestion" className="user-suggestion">
          {scheduleList()}
        </Tab.Pane>
        <Tab.Pane
          eventKey="dose-recommendation"
          className="dose-recommendation"
        >
          <div className="default">
            <span>1 + 1 + 1 (চলবে)</span>
            <span>After meal</span>
            <span>Remove Default</span>
          </div>
          <div>
            <span>0 + 1 + 1 (চলবে)</span>
            <span>Make Default</span>
          </div>
          <div>
            <span>1 + 0 + 1 (চলবে)</span>
            <span>Make Default</span>
          </div>
          <div>
            <span>1 + 1 + 0 (চলবে)</span>
            <span>Make Default</span>
          </div>
          <div>
            <span>0 + 0 + 1 (চলবে)</span>
            <span>Make Default</span>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="information" className="information">
          <Information />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default memo(Suggestion);
