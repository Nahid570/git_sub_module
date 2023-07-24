import { memo } from 'react';
import { Row } from 'react-bootstrap';
import LoadMore from '../partials/loadMore';

const Observation = ({
  perPage,
  totalItem,
  currentPage,
  setCurrentPage,
  allObservations,
  selectedOnExamination,
  handleOnExaminationData,
}) => {
  let { observations } = selectedOnExamination;
  observations = observations || [];

  const selectObservation = (itemName) => {
    if (observations.some((observation) => observation.name === itemName)) {
      observations = observations.filter(
        (observation) => observation.name !== itemName,
      );
      handleOnExaminationData(observations, 'observation');
    } else {
      observations = [...observations, { name: itemName, note: '' }];
      handleOnExaminationData(observations, 'observation');
    }
  };

  const observationList = allObservations.map((item, index) => {
    const selectedClass = observations?.some(
      (selectedItem) => selectedItem.name === item.name,
    )
      ? 'is-selected'
      : '';
    return (
      <div className={`chief-complain-item ${selectedClass}`} key={index}>
        <span
          className="cursor-pointer"
          onClick={() => selectObservation(item.name)}
        >
          {item.name}
        </span>
      </div>
    );
  });

  return (
    <>
      <Row className="complains-area mr-0 ml-0">{observationList}</Row>
      <LoadMore
        currentPage={currentPage}
        totalItem={totalItem}
        perPage={perPage}
        currentPageAction={setCurrentPage}
      />
    </>
  );
};

export default memo(Observation);
