import { memo } from 'react';
import RehabItem from './rehabItem';
import { isExistAnyRehabData } from '../../../../utils/helpers';

const RehabilitationView = ({
  element,
  selectedRehabilitation,
  setSelectedRehabilitation,
  setShowRehabilitation,
  isHistoryPage = false,
}) => {
  let { physicalTherapies, exercises, orthoses } = selectedRehabilitation;

  const removeData = (type, itemName) => {
    if (type === 'physicalTherapy') {
      selectedRehabilitation.physicalTherapies = physicalTherapies.filter(
        (data) => data.name !== itemName,
      );
    } else if (type === 'exercise') {
      selectedRehabilitation.exercises = exercises.filter(
        (data) => data.name !== itemName,
      );
    }
    if (type === 'orthosis') {
      selectedRehabilitation.orthoses = orthoses.filter(
        (data) => data.name !== itemName,
      );
    }
    setSelectedRehabilitation({ ...selectedRehabilitation });
  };

  return (
    <div
      className={`row item-row ${
        !isExistAnyRehabData(selectedRehabilitation)
          ? 'no-data-item'
          : 'data-item'
      }`}
      key={`rehabilitation-view`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowRehabilitation(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span> Rehabilitation +</span>
        )}
      </span>
      <ul className="sub-child-list">
        {physicalTherapies?.length > 0 && (
          <RehabItem
            rehabItems={physicalTherapies}
            removeData={removeData}
            type={'physicalTherapy'}
            isHistoryPage={isHistoryPage}
          />
        )}
        {exercises?.length > 0 && (
          <RehabItem
            rehabItems={exercises}
            removeData={removeData}
            type={'exercise'}
            isHistoryPage={isHistoryPage}
          />
        )}
        {orthoses?.length > 0 && (
          <RehabItem
            rehabItems={orthoses}
            removeData={removeData}
            type={'orthosis'}
            isHistoryPage={isHistoryPage}
          />
        )}
      </ul>
    </div>
  );
};

export default memo(RehabilitationView);
