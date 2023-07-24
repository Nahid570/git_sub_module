import { memo, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  ButtonGroup,
} from 'react-bootstrap';
import { getRequest, postRequest } from '../../../../utils/axiosRequests';
import ItemWithDeleteIcon from '../itemWithDeleteIcon';

const selectedMedicalHistory = ({}) => {
  
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

  return <Row className="complains-area mr-0 ml-0">{list}</Row>;
};

export default memo(selectedMedicalHistory);
