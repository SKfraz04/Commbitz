export const getApplink = (): string => {
    const userAgent = navigator.userAgent;
  
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'https://apps.apple.com/in/app/commbitz-esim/id6478773586';
    }
  
    // Android detection
    if (/android/i.test(userAgent)) {
      return 'https://play.google.com/store/apps/details?id=com.commbitz';
    }
  
    // Default case (if neither Android nor iOS is detected)
    return '';
  };

  export const getPlateform = (): string => {
    const userAgent = navigator.userAgent;
  
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'IOS';
    }
  
    // Android detection
    if (/android/i.test(userAgent)) {
      return 'android';
    }
  
    // Default case (if neither Android nor iOS is detected)
    return '';
  };
