import { memo } from 'react';

const GenericComposition = ({ item }) => {
  return (
    <>
      <div>
        <span>{item?.name}</span>
        <span>{item?.genericName}</span>
      </div>
    </>
  );
};

export default memo(GenericComposition);
