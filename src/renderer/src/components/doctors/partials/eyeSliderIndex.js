import * as React from 'react'
import {
  SliderItem,
  getHandleProps,
  GetTrackProps,
} from 'react-compound-slider'

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

export const Handle = ({domain, handle, getHandleProps}) => {
  return (
    <div
      role="slider"
      aria-valuemin={domain[0]}
      aria-valuemax={domain[1]}
      aria-valuenow={handle.value}
      style={{
        left: `${handle.percent}%`,
        position: 'absolute',
        marginLeft: '-11px',
        marginTop: '-6px',
        zIndex: 2,
        width: 17,
        height: 17,
        cursor: 'pointer',
        border: '1.88px solid #D9D9D9',
        borderRadius: '5.6px',
        // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#014081',
      }}
      {...getHandleProps(handle.id)}
    />
  )
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************

export const Track = ({source, target, getTrackProps}) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: 14,
        zIndex: 1,
        backgroundColor: '#7aa0c4',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

// *******************************************************
// TICK COMPONENT
// *******************************************************

export const Tick = ({ tick, count }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {tick.value}
      </div>
    </div>
  )
}
