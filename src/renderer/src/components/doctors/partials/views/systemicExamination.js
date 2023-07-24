import { memo } from 'react';
import {
  capitalizeFirstLetter,
  clearSystemicData,
  styledComponent,
} from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';
import coronaryImg from '../../../../assets/images/coronary.jpg';
import angiogramImg from '../../../../assets/images/angiogram.jpg';

const SystemicExamination = ({
  selectedOnExamination,
  setSelectedOnExamination,
  prescriptionItems,
  isDelBtn = true,
}) => {
  let { systemicExamination } = selectedOnExamination || {};
  let { jvp, lph, palpableP2, heartSound, murmur, lungBase } =
    systemicExamination || {};

  const deleteData = (itemName) => {
    selectedOnExamination.systemicExamination = clearSystemicData(
      systemicExamination,
      itemName,
    );
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['on-examination']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['on-examination']?.subItemStyle || {},
  );

  return (
    <div className="systemic-examination-view">
      {jvp?.status && (
        <div>
          <span className="text-left pr-5">
            <Title>JVP:</Title>{' '}
            <Value>{jvp?.status && capitalizeFirstLetter(jvp?.status)}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'jvp'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {jvp?.note && (
              <div className="pl-2">{jvp.note ? `- ${jvp.note}` : ''}</div>
            )}
          </Value>
        </div>
      )}
      {systemicExamination?.apexBeatNote && (
        <div>
          <span className="text-left pr-5">
            <Title>Apex Beat:</Title>
            <Value> {systemicExamination?.apexBeatNote}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'apexBeatNote'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {lph?.status && (
        <div>
          <span className="text-left pr-5">
            <Title>LPH:</Title>
            <Value> {lph?.status && capitalizeFirstLetter(lph?.status)}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'lph'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {lph?.note && (
              <div className="pl-2 font-italic">
                {lph.note ? `- ${lph.note}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {palpableP2?.status && (
        <div>
          <span className="text-left pr-5">
            <Title>Palpable P2:</Title>
            <Value>
              {' '}
              {palpableP2?.status && capitalizeFirstLetter(palpableP2?.status)}
            </Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'palpableP2'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {palpableP2?.note && (
              <div className="pl-2 font-italic">
                {palpableP2.note ? `- ${palpableP2.note}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {(heartSound?.s1 || heartSound?.s2) && (
        <div>
          <span className="text-left pr-5">
            <Title>Heart Sound: S1:</Title>
            <Value> {heartSound?.s1}</Value>
            <Title> S2:</Title>
            <Value> {heartSound?.s2}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'heartSound'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {heartSound?.note && (
              <div className="pl-2 font-italic">- {heartSound?.note}</div>
            )}
          </Value>
        </div>
      )}
      {(murmur?.systolic || murmur?.diastolic) && (
        <div>
          <span className="text-left pr-5">
            <Title>Murmur:</Title>
            {murmur?.systolic && <Value> Systolic</Value>}
            {murmur?.diastolic && <Value> Diastolic</Value>}
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'murmur'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {murmur?.note && (
              <div className="pl-2 font-italic">
                {murmur.note ? `- ${murmur.note}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {(lungBase?.raised ||
        lungBase?.crepitation ||
        lungBase?.rhonchi ||
        lungBase?.normal) && (
        <div>
          <span className="text-left pr-5">
            <Title>Lung Base:</Title>{' '}
            {lungBase?.raised && <Value>Raised</Value>}
            {lungBase?.crepitation && <Value>Crepitation</Value>}
            {lungBase?.rhonchi && <Value>Rhonchi</Value>}
            {lungBase?.normal && <Value>Normal</Value>}
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'lungBase'}
            isDelBtn={isDelBtn}
          />
          <Value>
            {lungBase?.note && (
              <div className="pl-2 font-italic">
                {lungBase.note ? `- ${lungBase.note}` : ''}
              </div>
            )}
          </Value>
        </div>
      )}
      {systemicExamination?.rsNote && (
        <div>
          <span className="text-left pr-5">
            <Title>R/S:</Title>
            <Value> {systemicExamination?.rsNote}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'rsNote'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {systemicExamination?.gsNote && (
        <div>
          <span className="text-left pr-5">
            <Title>G/S:</Title>
            <Value> {systemicExamination?.gsNote}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'gsNote'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {systemicExamination?.cnsNote && (
        <div>
          <span className="text-left pr-5">
            <Title>CNS:</Title>
            <Value> {systemicExamination?.cnsNote}</Value>
          </span>
          <CommonDeleteBtn
            action={deleteData}
            itemName={'cnsNote'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {systemicExamination?.showCoronary && (
        <>
          <div>
            <Title>Coronary Artery:</Title>
          </div>
          <div className="coronary">
            <img src={coronaryImg} height={200} width={320} />
            <CommonDeleteBtn
              action={deleteData}
              itemName={'showCoronary'}
              isDelBtn={isDelBtn}
            />
          </div>
        </>
      )}
      {systemicExamination?.showAngiogram && (
        <>
          <div>
            <Title>Angiogram: </Title>
          </div>
          <div className="angiogram">
            <img src={angiogramImg} height={250} width={320} />
            <CommonDeleteBtn
              action={deleteData}
              itemName={'showAngiogram'}
              isDelBtn={isDelBtn}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SystemicExamination);
