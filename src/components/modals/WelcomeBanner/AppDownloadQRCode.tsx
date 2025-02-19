// import QRCode from 'react-qr-code';
// import { useEffect, useState } from 'react';

// const AppDownloadQRCode = () => {
//     const [appStoreUrl, setAppStoreUrl] = useState('');
//     const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

//     useEffect(() => {
//         if (isIOS) {
//             setAppStoreUrl('https://apps.apple.com/app/id1067316596'); // Replace 'app-id' with your iOS app ID
//         } else {
//             setAppStoreUrl('https://play.google.com/store/apps/details?id=com.upmenu.test'); // Replace 'your.package.name' with your Android package name
//         }
//     }, []);

//     return (
//         <div>
//             {appStoreUrl && <QRCode value={appStoreUrl} />}
//         </div>
//     );
// };

// export default AppDownloadQRCode;



import React from 'react';
import QRCode from 'react-qr-code';

const AppDownloadQRCode = () => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  // Default URL to open for other devices or desktop
  let qrContent = 'https://example.com';

  if (isIOS) {
    // URL to open on iOS devices
    qrContent = 'https://apps.apple.com/app/id1067316596';
  } else if (isAndroid) {
    // URL to open on Android devices
    qrContent = 'https://play.google.com/store/apps/details?id=com.upmenu.test';
  }

  return (
    <div>
      <QRCode value={qrContent} />
    </div>
  );
};

export default AppDownloadQRCode;

