import { memo } from 'react';
import { capitalizeFirstLetter } from '../../../../utils/helpers';

const Dental = ({ selectedOnExamination, setSelectedOnExamination }) => {
  let { dentalExamination } = selectedOnExamination;

  const deleteSelectedData = () => {
    selectedOnExamination.dentalExamination = {
      patientType: 'adult',
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
    };
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  return (
    <div className="dental-examination-view">
      <div className="align-items-center">
        Patient Type: {capitalizeFirstLetter(dentalExamination.patientType)}
        <span
          className="float-right pr-5"
          style={{ paddingTop: '58px' }}
          onClick={() => deleteSelectedData()}
        >
          <i className="fa fa-times-circle"></i>
        </span>
      </div>
      <div className="dental-figure-view">
        <div className="top-row">
          <div>
            {dentalExamination['topLeft'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {dentalExamination['topLeft'].length - 1 === index
                    ? ''
                    : ', '}
                </span>
              );
            })}
          </div>
          <div>
            {dentalExamination['topRight'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {dentalExamination['topRight'].length - 1 === index
                    ? ''
                    : ', '}
                </span>
              );
            })}
          </div>
        </div>

        <div className="hr-line-dental"></div>
        <div className="vl-line-dental"></div>

        <div className="bottom-row">
          <div>
            {dentalExamination['bottomLeft'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {dentalExamination['bottomLeft'].length - 1 === index
                    ? ''
                    : ', '}
                </span>
              );
            })}
          </div>
          <div>
            {dentalExamination['bottomRight'].map((item, index) => {
              return (
                <span key={index}>
                  {item}
                  {dentalExamination['bottomRight'].length - 1 === index
                    ? ''
                    : ', '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dental);
