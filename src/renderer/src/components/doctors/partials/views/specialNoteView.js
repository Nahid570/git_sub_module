import React, { memo } from 'react';
import { styledComponent } from '../../../../utils/helpers';
import parse from 'html-react-parser';
import CommonDeleteBtn from '../commonDeleteBtn';

const SpecialNoteView = ({
  specialNote,
  setSpecialNote,
  setShowSpecialNote,
  prescriptionItems,
  element,
  isHistoryPage = false,
}) => {
  const Title = styledComponent(
    prescriptionItems?.items?.['special-note']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['special-note']?.subItemStyle || {},
  );

  return (
    <div
      className={`row item-row ${specialNote ? 'data-item' : 'no-data-item'}`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowSpecialNote(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Special Note +</span>
        )}
      </span>
      <ul className="sub-child-list">
        {specialNote && (
          <div>
            <span className="text-left pr-5">
              <Value> {parse(specialNote)}</Value>
            </span>
            {!isHistoryPage && (
              <i
                className="fa fa-times-circle float-right pr-5"
                onClick={() => setSpecialNote('')}
              ></i>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default memo(SpecialNoteView);
