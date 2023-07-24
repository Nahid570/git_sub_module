import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import CommonDeleteBtn from '../commonDeleteBtn';
import {
  itemSettingStyle,
  isExistAnyInfertilityData,
} from '../../../../utils/helpers';

const Infertility = ({
  element,
  isHistoryPage,
  setShowInfertility,
  selectedInfertilities,
  setSelectedInfertilities,
}) => {
  let { man, woman } = selectedInfertilities || {};
  const prescriptionItems = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.prescriptionItems,
  );
  const deleteData = (type, itemNameId) => {
    selectedInfertilities[type] = selectedInfertilities[type]?.filter(
      (item) => item.id !== itemNameId,
    );
    setSelectedInfertilities({ ...selectedInfertilities });
  };
  const itemPosition = prescriptionItems?.items?.infertility?.position;

  return (
    <div
      className={`row item-row d-block ${
        isExistAnyInfertilityData(selectedInfertilities)
          ? 'data-item-history'
          : 'no-data-item-history'
      }`}
      key={`advice`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowInfertility(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Infertility +</span>
        )}
      </span>
      <div className="infertility-view">
        {itemPosition === 'right' && (
          <Row>
            {woman?.length > 0 && (
              <Col className={man?.length ? 'border-right' : ''}>
                <div className="title">For Woman</div>
                <ul className="sub-child-list">
                  {woman?.map((item, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <span
                            style={itemSettingStyle(
                              prescriptionItems?.items?.['infertility']
                                ?.itemStyle || {},
                            )}
                          >
                            <span className="text-left">{item.name}</span>
                            {item.result && (
                              <span className="pl-2">- {item.result}</span>
                            )}
                          </span>
                          {!isHistoryPage && (
                            <CommonDeleteBtn
                              action={deleteData}
                              itemName={'woman'}
                              delId={item.id}
                            />
                          )}
                        </div>
                        {item.instruction && (
                          <div>
                            <span
                              className="pl-2 pr-5"
                              style={itemSettingStyle(
                                prescriptionItems?.items?.['infertility']
                                  ?.subItemStyle || {},
                              )}
                            >
                              <i>- {item.instruction}</i>
                            </span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Col>
            )}
            {man?.length > 0 && (
              <Col className="pl-4">
                <div lassName="title">For Man</div>
                <ul className="sub-child-list">
                  {man?.map((item, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <span
                            style={itemSettingStyle(
                              prescriptionItems?.items?.['infertility']
                                ?.itemStyle || {},
                            )}
                          >
                            <span className="text-left">{item.name}</span>
                            {item.result && (
                              <span className="pl-2">- {item.result}</span>
                            )}
                          </span>
                          {!isHistoryPage && (
                            <CommonDeleteBtn
                              action={deleteData}
                              itemName={'man'}
                              delId={item.id}
                            />
                          )}
                        </div>
                        {item.instruction && (
                          <div>
                            <span
                              className="pl-2 pr-5"
                              style={itemSettingStyle(
                                prescriptionItems?.items?.['infertility']
                                  ?.subItemStyle || {},
                              )}
                            >
                              <i>- {item.instruction}</i>
                            </span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Col>
            )}
          </Row>
        )}
        {itemPosition === 'left' && (
          <>
            {woman?.length > 0 && <div className="title">For Woman</div>}
            <ul className="sub-child-list" style={{ marginBottom: '0.2rem' }}>
              {woman?.map((item, index) => {
                return (
                  <li key={index}>
                    <div>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.['infertility']
                            ?.itemStyle || {},
                        )}
                      >
                        <span className="text-left">{item.name}</span>
                        {item.result && (
                          <span className="pl-2">- {item.result}</span>
                        )}
                      </span>
                      {!isHistoryPage && (
                        <CommonDeleteBtn
                          action={deleteData}
                          itemName={'woman'}
                          delId={item.id}
                        />
                      )}
                    </div>
                    {item.instruction && (
                      <div>
                        <span
                          className="pl-2 pr-5"
                          style={itemSettingStyle(
                            prescriptionItems?.items?.['infertility']
                              ?.subItemStyle || {},
                          )}
                        >
                          <i>- {item.instruction}</i>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
              {man?.length > 0 && <span className="separator"></span>}
            </ul>

            {man?.length > 0 && <div className="title">For Man</div>}
            <ul className="sub-child-list">
              {man?.map((item, index) => {
                return (
                  <li key={index}>
                    <div>
                      <span
                        style={itemSettingStyle(
                          prescriptionItems?.items?.['infertility']
                            ?.itemStyle || {},
                        )}
                      >
                        <span className="text-left">{item.name}</span>
                        {item?.result && (
                          <span className="pl-2">
                            - <i>{item.result}</i>
                          </span>
                        )}
                      </span>
                      {!isHistoryPage && (
                        <CommonDeleteBtn
                          action={deleteData}
                          itemName={'man'}
                          delId={item.id}
                        />
                      )}
                    </div>
                    {item.instruction && (
                      <div>
                        <span
                          className="pl-2 pr-5"
                          style={itemSettingStyle(
                            prescriptionItems?.items?.['infertility']
                              ?.subItemStyle || {},
                          )}
                        >
                          <i>- {item.instruction}</i>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Infertility);
