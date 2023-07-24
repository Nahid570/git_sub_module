import React, { memo } from 'react';
import {
  isExistHistory,
  itemSettingStyle,
  styledComponent,
  isExistAnyHistory,
} from '../../../utils/helpers';
import GynecologyView from './views/gynecology';
import SurgicalView from './views/surgical';
import OthersView from './views/others';
import CommonDeleteBtn from './commonDeleteBtn';

const HistoryView = ({
  element,
  setShowHistory,
  selectedHistories,
  setSelectedHistories,
  prescriptionItems,
  isHistoryPage = false,
}) => {
  const removeItemsData = (fieldName, delId) => {
    switch (fieldName) {
      case 'medicalNote':
        selectedHistories.medical.notes = '';
        break;
      case 'D_H':
      case 'D_A':
        selectedHistories.drugs[fieldName] = [];
        break;
      case 'investigations':
        selectedHistories.investigations = selectedHistories?.investigations.filter(
          (investigation) => investigation.name !== delId,
        );
        break;
      case 'personal':
        selectedHistories.personal = {
          smoker: false,
          alcoholic: false,
          tobacco: false,
          notes: '',
        };
        break;
      case 'family':
        selectedHistories.family = '';
        break;
      case 'medical':
        selectedHistories.medical = selectedHistories?.medical?.filter(
          (data) => data.name !== delId,
        );
        break;
    }
    setSelectedHistories({ ...selectedHistories });
  };

  const medicalHistoriesExtra = (data) => {
    return (
      <>
        {data?.duration ? ' - for ' + data?.duration : ''}{' '}
        {data?.duration ? data?.unit : ''}
      </>
    );
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['history']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['history']?.subItemStyle || {},
  );

  return (
    <>
      <div
        className={`row item-row ${
          !isExistAnyHistory(selectedHistories)
            ? 'no-data-item-history'
            : 'data-item-history d-block'
        }`}
        key={`history`}
      >
        <div
          className="prescription-item"
          {...(!isHistoryPage
            ? {
                onClick: (e) => {
                  e.stopPropagation();
                  setShowHistory(true);
                },
              }
            : {})}
        >
          {element?.alterName?.length ? (
            <span>{element?.alterName}</span>
          ) : (
            <span>History +</span>
          )}
        </div>
        {selectedHistories && (
          <div className="history-view">
            {isExistHistory(selectedHistories, 'medical') && (
              <div key={`medical`}>
                {selectedHistories?.medical?.map((item, index) => {
                  return (
                    <>
                      <div>
                        <span className="text-left pr-5">
                          <Title>{item.name}</Title>
                          {item?.present === 'yes' && (
                            <span>
                              <Value>: Yes {medicalHistoriesExtra(item)}</Value>
                            </span>
                          )}
                          {item?.absent === 'no' && (
                            <span>
                              <Value>: No {medicalHistoriesExtra(item)}</Value>
                            </span>
                          )}
                        </span>
                        {!isHistoryPage && (
                          <CommonDeleteBtn
                            action={removeItemsData}
                            itemName={'medical'}
                            delId={item.name}
                          />
                        )}
                      </div>
                      {item.note !== '' && (
                        <div className="pl-2">
                          <Value>- {item.note}</Value>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            )}
            {isExistHistory(selectedHistories, 'drugs') && (
              <div key={`drugs`}>
                {selectedHistories.drugs?.D_H.length > 0 && (
                  <div className="text-left">
                    <Title>D/H:</Title>
                    {selectedHistories.drugs.D_H.map((name, index) => (
                      <Value>
                        {name}
                        {selectedHistories.drugs.D_H.length - 1 === index
                          ? ''
                          : ', '}
                      </Value>
                    ))}
                    {!isHistoryPage && (
                      <CommonDeleteBtn
                        action={removeItemsData}
                        itemName={'D_H'}
                        delId={'D_H'}
                      />
                    )}
                  </div>
                )}
                {selectedHistories.drugs?.D_A.length > 0 && (
                  <div className="text-left">
                    <Title>D/A:</Title>
                    {selectedHistories.drugs.D_A.map((name, index) => (
                      <Value>
                        {name}
                        {selectedHistories.drugs.D_A.length - 1 === index
                          ? ''
                          : ', '}
                      </Value>
                    ))}
                    {!isHistoryPage && (
                      <CommonDeleteBtn
                        action={removeItemsData}
                        itemName={'D_A'}
                        delId={'D_A'}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
            {isExistHistory(selectedHistories, 'investigations') && (
              <div key={`investigation`}>
                {selectedHistories.investigations.length > 0 && (
                  <div className="text-left">
                    {selectedHistories.investigations.map((data, index) => (
                      <div key={index}>
                        <span className="text-left pr-5">
                          <span
                            style={itemSettingStyle(
                              prescriptionItems?.items?.history?.itemStyle ||
                                {},
                            )}
                          >
                            {data.name}
                          </span>{' '}
                          -{' '}
                          <span
                            style={itemSettingStyle(
                              prescriptionItems?.items?.history?.subItemStyle ||
                                {},
                            )}
                          >
                            {data?.result}
                          </span>
                        </span>
                        {!isHistoryPage && (
                          <CommonDeleteBtn
                            action={removeItemsData}
                            itemName={'investigations'}
                            delId={data.name}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {isExistHistory(selectedHistories, 'personal') && (
              <div key={`personal`}>
                <div className="text-left">
                  {selectedHistories.personal.smoker && (
                    <>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.itemStyle || {},
                        )}
                      >
                        Smoker:{' '}
                      </span>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.subItemStyle || {},
                        )}
                      >
                        {' '}
                        Yes{' '}
                      </span>
                    </>
                  )}
                  {selectedHistories.personal.alcoholic && (
                    <>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.itemStyle || {},
                        )}
                      >
                        Alcoholic:{' '}
                      </span>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.subItemStyle || {},
                        )}
                      >
                        {' '}
                        Yes
                      </span>
                    </>
                  )}
                  {selectedHistories.personal.tobacco && (
                    <>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.itemStyle || {},
                        )}
                      >
                        {' '}
                        Tobacco:{' '}
                      </span>{' '}
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.subItemStyle || {},
                        )}
                      >
                        {' '}
                        Yes
                      </span>
                    </>
                  )}
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={removeItemsData}
                      itemName={'personal'}
                      delId={'personal'}
                    />
                  )}
                </div>
                <div className="text-left">
                  {selectedHistories.personal.notes && (
                    <>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.itemStyle || {},
                        )}
                      >
                        Notes:
                      </span>{' '}
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.history?.subItemStyle || {},
                        )}
                      >
                        {selectedHistories.personal?.notes}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
            {selectedHistories.family && (
              <div key={`family`}>
                <div className="text-left">
                  <span
                    style={itemSettingStyle(
                      prescriptionItems?.items?.['history']?.itemStyle || {},
                    )}
                  >
                    Family:
                  </span>{' '}
                  <span
                    style={itemSettingStyle(
                      prescriptionItems?.items?.['history']?.subItemStyle || {},
                    )}
                  >
                    {selectedHistories.family}
                  </span>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={removeItemsData}
                      itemName={'family'}
                      delId={'family'}
                    />
                  )}
                </div>
              </div>
            )}
            <GynecologyView
              selectedHistories={selectedHistories}
              setSelectedHistories={setSelectedHistories}
              prescriptionItems={prescriptionItems}
            />
            <SurgicalView
              selectedHistories={selectedHistories}
              setSelectedHistories={setSelectedHistories}
              prescriptionItems={prescriptionItems}
            />
            <OthersView
              selectedHistories={selectedHistories}
              setSelectedHistories={setSelectedHistories}
              prescriptionItems={prescriptionItems}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(HistoryView);
