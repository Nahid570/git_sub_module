import { memo } from 'react';
import { Row } from 'react-bootstrap';
import { deleteRequest } from '../../../../utils/axiosRequests';
import GroupWithDeleteIcon from '../groupWithDeleteIcon';

const medicalHistoryGroup = ({
  selectedGroups,
  setSelectedGroups,
  selectedHistories,
  setSelectedHistories,
  medicalHistoryGroups,
  setMedicalHistoryGroups,
}) => {
  let { medical } = selectedHistories;
  const selectDiagnosisGroup = (group) => {
    let isExist = selectedGroups.some((item) => item.id === group.id);
    if (!isExist) {
      setSelectedGroups([...selectedGroups, group]);
      group?.medicalHistories?.map((historyItem) => {
        if (!medical?.some((item) => item.name === historyItem.name)) {
          medical.push({
            id: historyItem.id,
            name: historyItem.name,
            present: true,
            absent: false,
            unit: 'day(s)',
            duration: '',
            note: '',
          });
        }
      });
      setSelectedHistories({ ...selectedHistories, medical });
    } else {
      let deletedItems = group?.medicalHistories.map((item) => item.name);
      const otherGroups = selectedGroups?.filter(
        (data) => data.name !== group.name,
      );
      setSelectedGroups(otherGroups);
      if (otherGroups.length) {
        const otherGroupItems = otherGroups.flatMap((obj) =>
          obj?.medicalHistories?.map((item) => item.name),
        );
        deletedItems = deletedItems.filter(
          (item) => !otherGroupItems.includes(item),
        );
      }
      medical = medical.filter((item) => !deletedItems.includes(item.name));
      setSelectedHistories({ ...selectedHistories, medical });
    }
  };

  const deleteGroup = (groupId) => {
    deleteRequest(`medical-histories/groups/${groupId}`)
      .then((data) => {
        setMedicalHistoryGroups(
          medicalHistoryGroups.filter((group) => group.id !== groupId),
        );
        setSelectedGroups(
          selectedGroups.filter((group) => group.id !== groupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let list = medicalHistoryGroups?.map((item, index) => {
    let isSelected = selectedGroups.some((data) => data.name === item.name);

    return (
      <GroupWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectDiagnosisGroup}
        removeClickAction={deleteGroup}
      />
    );
  });

  return <Row className="complains-area mt-1 mr-0 ml-0">{list}</Row>;
};

export default memo(medicalHistoryGroup);
