import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const TopLoader = ({ loading }) => {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    if (loading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [loading]);

  return (
    <LoadingBar
      ref={loadingBarRef}
      color="#1D4ED8" 
      height={4}
      shadow={true}
    />
  );
};

export default TopLoader;
