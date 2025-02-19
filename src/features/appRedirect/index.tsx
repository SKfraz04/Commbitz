import React, { useEffect } from 'react';

const AppRedirect: React.FC = () => {
  const appLink: string = "intent://splash#Intent;scheme=https;package=com.commbitz;end;";
  const fallbackLink: string = "https://play.google.com/store/apps/details?id=com.commbitz";

  useEffect(() => {
    // Attempt to open the deep link
    (window.location as any).href = appLink;

    // If the deep link fails, fallback to Play Store link after 2 seconds
    const timer = setTimeout(() => {
      (window.location as any).href = fallbackLink;
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{color : "#fff"}}>
      Redirecting...
    </div>
  );
};

export default AppRedirect;
