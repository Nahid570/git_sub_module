import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import parse from 'html-react-parser';

const PrescriptionFooter = ({ footerInfo, prescriptionSetting })=>{
    let footerData = footerInfo?.contents?.map((data, index) => {
        return <Col style={{ width: data.width + '%' }} key={index}>{parse(data.content.replace(/<p>&nbsp;<\/p>/gi, ''))}</Col>
    })

    const footerStyle = {
        height: prescriptionSetting?.footer?.height?.quantity+prescriptionSetting?.footer?.height?.unit,
    }

    return (
        <>
            <div className="show-in-print">
                {
                    prescriptionSetting?.isPadPrescription
                        ? <Row className="d-flex" style={footerStyle}></Row>
                        : <Row className="blank-footer-print d-flex">{footerData}</Row>
                }
            </div>
            <Row className="footer hide-in-print">{footerData}</Row>
        </>
    )
};

export default memo(PrescriptionFooter);
