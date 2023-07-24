import { memo } from 'react';

const CommonDeleteBtn = ({ action, itemName, delId, isDelBtn = true }) => {
  return (
    <>
      {isDelBtn && (
        <i
          className="fa fa-times-circle float-right pr-5"
          onClick={() => action(itemName, delId)}
        ></i>
      )}
    </>
  );
};

export default memo(CommonDeleteBtn);
