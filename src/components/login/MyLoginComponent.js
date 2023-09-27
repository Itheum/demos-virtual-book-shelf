import React from "react";
import { ExtensionLoginButton,  } from "@multiversx/sdk-dapp/UI";


function MyLoginComponent() {

    //this have to be the same as in the data marshal request 
  const commonProps = {
    callbackRoute: "/shelf",
    nativeAuth: {
      apiAddress: "https://devnet-api.multiversx.com",
      expirySeconds: 3000,
    },
  };

  return (
      <ExtensionLoginButton  loginButtonText="Connect Wallet" {...commonProps} />
  );
}

export default MyLoginComponent; 