import { memo } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

const ImageSlider = ({ userInfo, brandings }) => {
  return (
    <div className="ml-3" height="30" width="120">
      <SimpleImageSlider
        width={220}
        height={50}
        slideDuration={userInfo.email === 'sanaultutul@yahoo.com' ? 0.6 : 0.3}
        images={brandings}
        showBullets={false}
        showNavs={false}
        autoPlay={true}
        bgColor={'#FFFFFF'}
      />
    </div>
  );
};

export default memo(ImageSlider);
