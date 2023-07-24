import { memo } from 'react';
import { styledComponent } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Gynecology = ({
  selectedHistories,
  prescriptionItems,
  setSelectedHistories,
  isDelBtn = true,
}) => {
  let { gynecology } = selectedHistories || {};

  const clearData = (itemName) => {
    switch (itemName) {
      case 'mc':
        gynecology[itemName] = {
          regular: false,
          irregular: false,
          menopause: false,
          note: null,
        };
        break;
      case 'maritalStatus':
        gynecology[itemName] = {
          married: false,
          unmarried: false,
        };
    }
    selectedHistories['gynecology'] = gynecology;
    setSelectedHistories({ ...selectedHistories });
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
    prescriptionItems?.items?.['history']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['history']?.subItemStyle || {},
  );

  return (
    <div className="breast-exam-view">
      {(gynecology?.mc?.regular ||
        gynecology?.mc?.irregular ||
        gynecology?.mc?.menopause) && (
        <div>
          <span className="text-left pr-5">
            <Title>MC:</Title>{' '}
            {gynecology?.mc?.regular && <Value>Regular</Value>}
            {gynecology?.mc?.irregular && <Value>Irregular</Value>}
            {gynecology?.mc?.menopause && <Value>Menopause</Value>}
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'sfh'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {gynecology?.mc?.note && (
              <div className="pl-4 font-italic">
                {gynecology?.mc?.note ? `- ${gynecology?.mc?.note}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {gynecology?.mp && (
        <div>
          <span className="text-left pr-5">
            <Title>MP:</Title>
            <Value> {gynecology?.mp}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'mp'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gynecology?.mcVal && (
        <div>
          <span className="text-left pr-5">
            <Title>MC:</Title>
            <Value> {gynecology?.mcVal}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'mcVal'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gynecology?.lmp && (
        <div>
          <span className="text-left pr-5">
            <Title>LMP:</Title>
            <Value> {gynecology?.lmp}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'lmp'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {gynecology?.lmpNote && (
              <div className="pl-4 font-italic">
                {gynecology?.lmpNote ? `- ${gynecology?.lmpNote}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {gynecology?.edd && (
        <div>
          <span className="text-left pr-5">
            <Title>EDD:</Title>
            <Value> {gynecology?.edd}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'edd'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {gynecology?.eddNote && (
              <div className="pl-4 font-italic">
                {gynecology?.eddNote ? `- ${gynecology?.eddNote}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {(gynecology?.maritalStatus?.married ||
        gynecology?.maritalStatus?.unmarried) && (
        <div>
          <span className="text-left pr-5">
            <Title>Marital Status:</Title>
            {gynecology?.maritalStatus?.married && <Value> Married</Value>}
            {gynecology?.maritalStatus?.unmarried && <Value> Unmarried</Value>}
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'maritalStatus'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {(gynecology?.marriedFor?.years ||
        gynecology?.marriedFor?.months ||
        gynecology?.marriedFor?.days ||
        gynecology?.marriedFor?.hours) && (
        <div>
          <span className="text-left pr-5">
            <Title>Marital For:</Title>
            {gynecology?.marriedFor?.years && (
              <Value> {gynecology?.marriedFor?.years} Years </Value>
            )}
            {gynecology?.marriedFor?.months && (
              <Value> {gynecology?.marriedFor?.months} Months </Value>
            )}
            {gynecology?.marriedFor?.days && (
              <Value> {gynecology?.marriedFor?.days} Days </Value>
            )}
            {gynecology?.marriedFor?.hours && (
              <Value> {gynecology?.marriedFor?.hours} Hours </Value>
            )}
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'marriedFor'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {gynecology?.gravida && (
        <div>
          <span className="text-left pr-5">
            <Title>Gravida:</Title>
            <Value> {gynecology?.gravida}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'gravida'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {gynecology?.gravidaNote && (
              <div className="pl-4 font-italic">
                {gynecology?.gravidaNote ? `- ${gynecology?.gravidaNote}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {gynecology?.para && (
        <div>
          <span className="text-left pr-5">
            <Title>Para:</Title>
            <Value> {gynecology?.para}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'para'}
            isDelBtn={isDelBtn}
          />
          {gynecology?.para && (
            <div className="pl-4 font-italic">
              <Value>
                {gynecology?.paraNote ? `- ${gynecology?.paraNote}` : ''}
              </Value>
            </div>
          )}
        </div>
      )}
      {(gynecology?.ageOfLastChild?.years ||
        gynecology?.ageOfLastChild?.months ||
        gynecology?.ageOfLastChild?.days ||
        gynecology?.ageOfLastChild?.hours) && (
        <div>
          <span className="text-left pr-5">
            <Title>Age Of Last Child:</Title>
            <Value>
              {gynecology?.ageOfLastChild?.years && (
                <span> {gynecology?.ageOfLastChild?.years} Years </span>
              )}
              {gynecology?.ageOfLastChild?.months && (
                <span> {gynecology?.ageOfLastChild?.months} Months </span>
              )}
              {gynecology?.ageOfLastChild?.days && (
                <span> {gynecology?.ageOfLastChild?.days} Days </span>
              )}
              {gynecology?.ageOfLastChild?.hours && (
                <span> {gynecology?.ageOfLastChild?.hours} Hours </span>
              )}
            </Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'ageOfLastChild'}
            isDelBtn={isDelBtn}
          />
          {gynecology?.ageOfLastChild?.note && (
            <div className="pl-4 font-italic">
              <Value>
                {gynecology?.ageOfLastChild?.note
                  ? `- ${gynecology?.ageOfLastChild?.note}`
                  : ''}
              </Value>
            </div>
          )}
        </div>
      )}
      {gynecology?.fp && (
        <div>
          <span className="text-left pr-5">
            <Title>FP:</Title>
            <Value> {gynecology?.fp}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'fp'}
            isDelBtn={isDelBtn}
          />
          {gynecology?.para && (
            <div className="pl-4 font-italic">
              <Value>
                {gynecology?.fpNote ? `- ${gynecology?.fpNote}` : ''}
              </Value>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Gynecology);
