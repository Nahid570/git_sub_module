import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Advice = ({
  element,
  prescriptionItems,
  setShowAdvice,
  selectedAdvices,
  deletePrescriptionItem,
  isHistoryPage = false,
}) => {
  let formatedAdvices = [];
  let key = 'untitled';
  selectedAdvices?.forEach((item) => {
    if (item?.title) {
      key = item?.title;
      formatedAdvices[key] = [item];
    } else {
      if (Array.isArray(formatedAdvices[key])) {
        formatedAdvices[key].push(item);
      } else {
        formatedAdvices[key] = [item];
      }
    }
  });

  return (
    <div
      className={`row item-row ${
        selectedAdvices.length ? 'data-item-history' : 'no-data-item-history'
      }`}
      key={`advice`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowAdvice(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Advice +</span>
        )}
      </span>
      {Object.keys(formatedAdvices)?.map((key) => (
        <ol
          className="sub-child-list"
          style={itemSettingStyle(
            prescriptionItems?.items?.['advice']?.itemStyle || {},
          )}
        >
          {formatedAdvices[key]?.map((item, index) => {
            return (
              <>
                {item?.title && (
                  <span className="advice-title">{item?.title}: </span>
                )}
                <li key={index} className="advice-item">
                  <div>
                    <span
                      className="text-left pr-5"
                      style={itemSettingStyle(
                        prescriptionItems?.items?.['advice']?.itemStyle || {},
                      )}
                    >
                      {item.name}
                    </span>
                    {!isHistoryPage && (
                      <CommonDeleteBtn
                        action={deletePrescriptionItem}
                        itemName={'advice'}
                        delId={item.id}
                      />
                    )}
                  </div>
                  {item.note && (
                    <div>
                      <span
                        className="text-left pr-5"
                        style={itemSettingStyle(
                          prescriptionItems?.items?.['advice']?.subItemStyle ||
                            {},
                        )}
                      >
                        {item.note}
                      </span>
                    </div>
                  )}
                  <ul>
                    {item?.subAdvices?.map((subAdvice, subIndex) => (
                      <li key={subIndex} className="advice-item-sub">
                        <div>
                          <span
                            className="text-left pr-5"
                            style={itemSettingStyle(
                              prescriptionItems?.items?.['advice']?.itemStyle ||
                                {},
                            )}
                          >
                            {subAdvice.name}
                          </span>
                          {!isHistoryPage && (
                            <CommonDeleteBtn
                              action={deletePrescriptionItem}
                              itemName={'advice'}
                              delId={subAdvice.id}
                            />
                          )}
                          {/* <span
                            className="float-right cursor-pointer"
                            onClick={() =>
                              deletePrescriptionItem('advice', subAdvice.id)
                            }
                          >
                            <i
                              className="fa fa-times-circle"
                              style={{ color: '#CB2020D9' }}
                            ></i>
                          </span> */}
                        </div>
                        {subAdvice.note && (
                          <div>
                            <span
                              className="text-left pr-5"
                              style={itemSettingStyle(
                                prescriptionItems?.items?.['advice']
                                  ?.subItemStyle || {},
                              )}
                            >
                              <i>- {subAdvice.note}</i>
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </>
            );
          })}
        </ol>
      ))}
    </div>
  );
};

export default memo(Advice);
