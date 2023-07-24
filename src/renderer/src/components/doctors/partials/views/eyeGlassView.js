import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import {
  isExistAnyEyeGlass,
  isExistEyeGlassTable,
} from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const EyeGlassView = ({
  setShowEyeGlass,
  element,
  selectedEyeGlass,
  deletePrescriptionItem,
  isHistoryPage = false,
}) => {
  let { isPlano, leftPlano, rightPlano, add, lens, pd, r, l, remarks } =
    selectedEyeGlass || {};

  return (
    <div
      className={`row item-row ${
        isExistAnyEyeGlass(selectedEyeGlass) ? 'pb-4' : 'pb-5'
      }`}
      key={`eye-glass-view`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowEyeGlass(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Eye Glass +</span>
        )}
      </span>
      {isExistAnyEyeGlass(selectedEyeGlass) && (
        <div className="view-eye-glass glass-table">
          {isExistEyeGlassTable(selectedEyeGlass) && (
            <>
              <Table className="mt-1">
                <thead>
                  <tr>
                    <th colSpan={2}>-</th>
                    <th>SPH(D)</th>
                    <th>CYL(D)</th>
                    <th>Axis(°)</th>
                    <th>V/A</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2}>DIST</td>
                    <td>R</td>
                    {isPlano || rightPlano ? (
                      <>
                        <td colSpan={3}>
                          <b>Plano</b>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{r?.sph}</td>
                        <td>{r?.cyl}</td>
                        <td>{r?.axis}</td>
                      </>
                    )}
                    <td>{r?.v_a}</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    {isPlano || leftPlano ? (
                      <>
                        <td colSpan={3}>
                          <b>Plano</b>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{l?.sph}</td>
                        <td>{l?.cyl}</td>
                        <td>{l?.axis}</td>
                      </>
                    )}
                    <td>{l?.v_a}</td>
                  </tr>
                </tbody>
              </Table>
              {!isHistoryPage && (
                <span className="eyeglass-del-icon">
                  <CommonDeleteBtn
                    action={deletePrescriptionItem}
                    itemName={'eyeGlassTable'}
                    delId={''}
                  />
                </span>
              )}
            </>
          )}
          <div>
            {add && <span>Add: {selectedEyeGlass.add} D</span>}
            {lens && (
              <span className="pl-2">Lens: {selectedEyeGlass.lens}</span>
            )}
            {pd && <span className="pl-2">PD: {selectedEyeGlass.pd} mm</span>}
          </div>
          {remarks?.length > 0 && (
            <div>
              {remarks.map((remark, index) => {
                return (
                  <div key={index}>
                    <span className="text-left">{remark}</span>
                    {!isHistoryPage && (
                      <CommonDeleteBtn
                        action={deletePrescriptionItem}
                        itemName={'eyeGlassRemark'}
                        delId={remark}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(EyeGlassView);
