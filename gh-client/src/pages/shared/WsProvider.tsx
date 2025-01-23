import { WS_BASE_PATH } from "@/utils/constants";
import React from "react";
import { StompSessionProvider } from "react-stomp-hooks";

type WsProviderProps = {
  children: React.ReactNode;
};

export default function WsProvider({ children }: WsProviderProps) {
  return (
    <StompSessionProvider
      url={WS_BASE_PATH}
      //   debug={(e) => {
      //     console.log(e);
      //   }}
      //All options supported by @stomp/stompjs can be used here
    >
      {children}
    </StompSessionProvider>
  );
}
