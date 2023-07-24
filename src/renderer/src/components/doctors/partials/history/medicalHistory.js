import { memo } from 'react';
import { Row } from 'react-bootstrap';
import ItemWithDeleteIcon from '../itemWithDeleteIcon';

const MedicalHistory = ({
  medical,
  selectedData,
  medicalHistories,
  setSelectedHistories,
}) => {
  const selectMedicalHistory = (item) => {
    if (medical.some((data) => data.id === item.id)) {
      medical = medical.filter((data) => data.id !== item.id);
    } else {
      medical = [
        ...medical,
        {
          id: item.id,
          name: item.name,
          present: 'yes',
          absent: '',
          unit: 'day(s)',
          duration: '',
          note: '',
        },
      ];
    }
    setSelectedHistories({ ...selectedData, medical });
  };

  const deleteDiagnosis = () => {};

  let list = () => {
    return medicalHistories.map((item, index) => {
      let isSelected = medical?.some((data) => data.name === item.name);
      isSelected = isSelected ? true : false;
      return (
        <ItemWithDeleteIcon
          key={index}
          item={item}
          isSelected={isSelected}
          itemClickAction={selectMedicalHistory}
          removeClickAction={deleteDiagnosis}
        />
      );
    });
  };

  return <Row className="complains-area mr-0 ml-0">{list()}</Row>;
};

export default memo(MedicalHistory);
