import { memo } from 'react';
import { Row } from 'react-bootstrap';
import parse from 'html-react-parser';

const PrescriptionHeader = ({ headerInfo, prescriptionSetting }) => {
  let headerData = headerInfo?.contents?.map((data, index) => {
    return (
      <div style={{ width: data.width + '%' }} key={index}>
        {parse(data.content.replace(/<p>&nbsp;<\/p>/gi, ''))}
      </div>
    );
  });
  const prescriptionStyle = {
    height:
      prescriptionSetting?.header?.height?.quantity +
      prescriptionSetting?.header?.height?.unit,
  };

  return (
    <>
      <div className="show-in-print">
        {prescriptionSetting?.isPadPrescription ? (
          <Row className="d-flex" style={prescriptionStyle}></Row>
        ) : (
          <Row className="blank-header d-flex">{headerData}</Row>
        )}
      </div>
      <Row className="hide-in-print header-no-print">{headerData}</Row>
    </>
  );
};

export default memo(PrescriptionHeader);
