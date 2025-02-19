import React, { useEffect, useState } from 'react';
import MainLoader from '../mainLoader';

const redirectToStore = (setLoader: (state: boolean) => void): void => {
  const userAgent = navigator.userAgent || navigator.vendor;

  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document);

  if (isIOS) {
    setLoader(false);
    window.location.href = "https://apps.apple.com/in/app/commbitz-e-sim/id6572300745";
  } else if (/android/i.test(userAgent)) {
    setLoader(false);
    window.location.href = "https://play.google.com/store/apps/details?id=com.commbitz";
  } else {
    setLoader(false);
    window.location.href = "https://commbitz.netsolutionindia.com/";
  }
};

const AppQRCode: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {    
    redirectToStore(setLoader);
  }, [loader]);

  // Return null if `loader` is false, as `null` is a valid JSX return value
  return loader ? <MainLoader /> :<div>Please wait...</div>;
};

export default AppQRCode;
