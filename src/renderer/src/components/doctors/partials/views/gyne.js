import { memo } from 'react';
import {
  capitalizeFirstLetter,
  styledComponent,
} from '../../../../utils/helpers';
import breastImg from '../../../../assets/images/breast.jpg';
import CommonDeleteBtn from '../commonDeleteBtn';

const Gyne = ({
  selectedOnExamination,
  setSelectedOnExamination,
  prescriptionItems,
  isDelBtn = true,
}) => {
  let { gyneExamination } = selectedOnExamination || {};
  let { breastExamination } = selectedOnExamination || {};

  const deleteData = (itemName) => {
    switch (itemName) {
      case 'lump':
      case 'nippleArolaComplex':
      case 'axillaryLymphNode':
        breastExamination[itemName] = {
          left: false,
          right: false,
          both: false,
        };
        break;
      case 'lumpPosition':
      case 'nippleArolaComplexPosition':
      case 'axillaryLymphNodePosition':
        breastExamination[itemName] = {
          uoq: false,
          loq: false,
          uiq: false,
          liq: false,
        };
        break;
      case 'isBreastPicture':
        breastExamination[itemName] = false;
        break;
      default:
        breastExamination[itemName] = '';
    }
    selectedOnExamination.breastExamination = breastExamination;
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  const clearData = (itemName) => {
    switch (itemName) {
      case 'fhs':
        gyneExamination.fhsPresent = false;
        gyneExamination.fhsAbsent = false;
        break;
      case 'show':
        gyneExamination['showPresent'] = false;
        gyneExamination['showAbsent'] = false;
        break;
      case 'cmt':
        gyneExamination['cmtPresent'] = false;
        gyneExamination['cmtAbsent'] = false;
        break;
      case 'bleeding':
        gyneExamination['bleedingAbsent'] = false;
        gyneExamination['bleedingPresent'] = false;
        break;
      default:
        gyneExamination[itemName] = '';
    }
    selectedOnExamination.gyneExamination = gyneExamination;
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  const getData = (data) => {
    let result = [];
    for (let key in data) {
      if (data[key] === true) {
        result.push(key);
      }
    }
    return result;
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['on-examination']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['on-examination']?.subItemStyle || {},
  );

  return (
    <div className="breast-exam-view">
      {gyneExamination?.sfh && (
        <div>
          <span className="text-left pr-5">
            <Title>SFH:</Title>
            <Value> {gyneExamination?.sfh}</Value>
            {gyneExamination?.fm}
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'sfh'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {/* {gyneExamination?.fm !== "no" && (
        <div>
          <span className="text-left pr-5">
            FM: {gyneExamination?.fm}
            <Button
              size="sm"
              className="ddbtn-sm-customize"
              variant="outline-secondary"
            >
              <i
                className={`fa ${gyneExamination?.fm ? "fa-plus" : "fa-minus"}`}
              ></i>
            </Button>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={"fm"}
            isDelBtn={isDelBtn}
          />
        </div>
      )} */}
      {gyneExamination?.fhsPresent && (
        <div>
          <span className="text-left pr-5">
            <Title>FHS:</Title>
            <Value> Present</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'fhsPresent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.fhsAbsent && (
        <div>
          <span className="text-left pr-5">
            <Title>FHS:</Title>
            <Value> Absent</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'fhsAbsent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.presentation && (
        <div>
          <span className="text-left pr-5">
            <Title>Presentation:</Title>{' '}
            <Value>{gyneExamination?.presentation}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'presentation'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.nad && (
        <div>
          <span className="text-left pr-5">
            <Title>NAD:</Title>
            <Value> Yes</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'nad'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.uterus && (
        <div>
          <span className="text-left pr-5">
            <Title>Uterus:</Title>
            <Value> {gyneExamination?.uterus}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'uterus'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.wkSize && (
        <div>
          <span className="text-left pr-5">
            <Title>wk Size:</Title>
            <Value> {gyneExamination?.wkSize}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'wkSize'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.lump && (
        <div>
          <span className="text-left pr-5">
            <Title>LUMP:</Title>
            <Value> {gyneExamination?.lump}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'lump'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.os && (
        <div>
          <span className="text-left pr-5">
            <Title>OS:</Title>
            <Value> {gyneExamination?.os}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'os'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.cervix && (
        <div>
          <span className="text-left pr-5">
            <Title> Cervix:</Title>
            <Value> {gyneExamination?.cervix}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'cervix'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.effacement && (
        <div>
          <span className="text-left pr-5">
            <Title>Effacement:</Title>
            <Value> {gyneExamination?.effacement}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'effacement'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.station && (
        <div>
          <span className="text-left pr-5">
            <Title>Station:</Title>
            <Value> {gyneExamination?.station}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'station'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.mumbrance && (
        <div>
          <span className="text-left pr-5">
            <Title>Mumbrance:</Title>{' '}
            <Value> {gyneExamination?.mumbrance}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'mumbrance'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.showPresent && (
        <div>
          <span className="text-left pr-5">
            <Title>Show:</Title>
            <Value> Present</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'showPresent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.showAbsent && (
        <div>
          <span className="text-left pr-5">
            <Title>Show:</Title>
            <Value> Absent</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'showAbsent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.inspectionNad && (
        <div>
          <span className="text-left pr-5">
            <Title>Inspection:</Title>
            <Value> {gyneExamination?.inspectionNad ? 'Yes' : 'No'}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'inspectionNad'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.pseCervix && (
        <div>
          <span className="text-left pr-5">
            <Title>Cervix:</Title>
            <Value> {gyneExamination?.pseCervix}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'pseCervix'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.bmeUterus && (
        <div>
          <span className="text-left pr-5">
            <Title>Uterus:</Title>
            <Value> {gyneExamination?.bmeUterus}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'bmeUterus'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.bmeWkSize && (
        <div>
          <span className="text-left pr-5">
            <Title>wk Size:</Title>
            <Value> {gyneExamination?.bmeWkSize}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'bmeWkSize'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.fornix && (
        <div>
          <span className="text-left pr-5">
            <Title>Fornix:</Title>
            <Value> {gyneExamination?.fornix}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'fornix'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.cmtPresent && (
        <div>
          <span className="text-left pr-5">
            <Title>CMT:</Title>
            <Value> Present</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'cmtPresent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.cmtAbsent && (
        <div>
          <span className="text-left pr-5">
            <Title>CMT:</Title>
            <Value> Absent</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'cmtAbsent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.bleedingAbsent && (
        <div>
          <span className="text-left pr-5">
            <Title>Bleeding:</Title>
            <Value> Present</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'bleedingAbsent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gyneExamination?.bleedingPresent && (
        <div>
          <span className="text-left pr-5">
            <Title>Bleeding:</Title>
            <Value> Absent</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'bleedingPresent'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {/* Breast area */}
      {getData(breastExamination?.lump).length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>LUMP:</Title>{' '}
            <Value>
              {getData(breastExamination?.lump)?.map((item, key) => {
                return <span key={key}>{capitalizeFirstLetter(item)} </span>;
              })}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'lump'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {getData(breastExamination?.lumpPosition)?.length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>Position:</Title>{' '}
            <Value>
              {getData(breastExamination?.lumpPosition)?.map((item, key) => {
                return (
                  <span key={key}>
                    {`${item.toLocaleUpperCase()}${
                      getData(breastExamination?.lumpPosition).length - 1 !==
                      key
                        ? ', '
                        : ''
                    }`}{' '}
                  </span>
                );
              })}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'lumpPosition'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.size && (
        <div>
          <span className="text-left pr-5">
            <Title>Size:</Title>{' '}
            <Value>
              {breastExamination?.size +
                ' ' +
                breastExamination?.sizeUnit.toLocaleUpperCase()}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'size'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.margin?.length > 0 && (
        <div>
          <Title>Margin:</Title>{' '}
          <Value>
            {breastExamination?.margin?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.margin.length - 1 === key ? '' : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'margin'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.consistency?.length > 0 && (
        <div>
          <Title>Consistency:</Title>{' '}
          <Value>
            {breastExamination?.consistency?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.consistency.length - 1 === key
                      ? ''
                      : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'consistency'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.localTemperature?.length > 0 && (
        <div>
          <Title>Local Temperature:</Title>{' '}
          <Value>
            {breastExamination?.localTemperature?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.localTemperature.length - 1 === key
                      ? ''
                      : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'localTemperature'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.mobility?.length > 0 && (
        <div>
          <Title>Mobility:</Title>{' '}
          <Value>
            {breastExamination?.mobility?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.mobility.length - 1 === key ? '' : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'mobility'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.overlyingSkin?.length > 0 && (
        <div>
          <Title>Overlying Skin:</Title>{' '}
          <Value>
            {breastExamination?.overlyingSkin?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.overlyingSkin.length - 1 === key
                      ? ''
                      : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'overlyingSkin'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {getData(breastExamination?.nippleArolaComplex)?.length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>Nipple Arola Complex:</Title>{' '}
            <Value>
              {getData(breastExamination?.nippleArolaComplex)?.map(
                (item, key) => {
                  return <span key={key}>{capitalizeFirstLetter(item)} </span>;
                },
              )}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'nippleArolaComplex'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {getData(breastExamination?.nippleArolaComplexPosition)?.length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>Position:</Title>{' '}
            <Value>
              {getData(breastExamination?.nippleArolaComplexPosition)?.map(
                (item, key) => {
                  return (
                    <span key={key}>
                      {`${capitalizeFirstLetter(item)}${
                        getData(breastExamination?.nippleArolaComplexPosition)
                          .length -
                          1 !==
                        key
                          ? ', '
                          : ''
                      }`}{' '}
                    </span>
                  );
                },
              )}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'nippleArolaComplexPosition'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.nippleOthers?.length > 0 && (
        <div>
          <Title>Others:</Title>{' '}
          <Value>
            {breastExamination?.nippleOthers?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.nippleOthers.length - 1 === key
                      ? ''
                      : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'nippleOthers'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {getData(breastExamination?.axillaryLymphNode)?.length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>Axillary Lymph Node:</Title>{' '}
            <Value>
              {getData(breastExamination?.axillaryLymphNode)?.map(
                (item, key) => {
                  return <span key={key}>{capitalizeFirstLetter(item)} </span>;
                },
              )}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'axillaryLymphNode'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {getData(breastExamination?.axillaryLymphNodePosition)?.length > 0 && (
        <div>
          <span className="text-left pr-5">
            <Title>Position:</Title>{' '}
            <Value>
              {getData(breastExamination?.axillaryLymphNodePosition)?.map(
                (item, key) => {
                  return (
                    <span key={key}>
                      {`${capitalizeFirstLetter(item)}${
                        getData(breastExamination?.axillaryLymphNodePosition)
                          .length -
                          1 !==
                        key
                          ? ', '
                          : ''
                      }`}{' '}
                    </span>
                  );
                },
              )}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'axillaryLymphNodePosition'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.number && (
        <div>
          <span className="text-left pr-5">
            <Title>Number:</Title>{' '}
            <Value>
              {breastExamination?.number +
                ' ' +
                breastExamination?.numberUnit.toLocaleUpperCase()}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'number'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.axillaryOthers?.length > 0 && (
        <div>
          <Title>Others:</Title>{' '}
          <Value>
            {breastExamination?.axillaryOthers?.map((item, key) => {
              return (
                <span key={key}>
                  {`${item}${
                    breastExamination?.axillaryOthers.length - 1 === key
                      ? ''
                      : ', '
                  }`}
                </span>
              );
            })}
          </Value>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'axillaryOthers'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.note && (
        <div>
          <span className="text-left pr-5">
            <Title>Note:</Title>
            <Value> {breastExamination?.note}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'note'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {breastExamination?.isBreastPicture && (
        <div className="breast">
          <Title>Breast:</Title>
          <img src={breastImg} height={140} width={300} />
          <CommonDeleteBtn
            action={deleteData}
            itemName={'isBreastPicture'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Gyne);
