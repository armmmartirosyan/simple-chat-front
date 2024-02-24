import React, { useEffect, FC } from "react";
import { signallingProvider } from "../providers/signalling-provider";

const withSocketProvider = (WrappedComponent: FC) => {
  return (props: any) => {
    useEffect(() => {
      signallingProvider.init();

      return signallingProvider.disconnect;
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withSocketProvider;
