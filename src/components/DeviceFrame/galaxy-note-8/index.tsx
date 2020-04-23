import * as React from 'react';

interface IProps {
  screenBg: string;
}

export const GalaxyNote8 = (props: IProps): JSX.Element => {
  return (
    <div className='marvel-device note8'>
      <div className='inner' />
      <div className='overflow'>
        <div className='shadow' />
      </div>
      <div className='speaker' />
      <div className='sensors' />
      <div className='more-sensors' />
      <div className='sleep' />
      <div className='volume' />
      <div className='camera' />
      <div
        className='screen'
        style={{ backgroundImage: `url(${props.screenBg})` }}
      />
    </div>
  );
};

export default GalaxyNote8;
