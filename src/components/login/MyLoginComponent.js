import React, {useEffect} from "react";
import { ExtensionLoginButton,  } from "@multiversx/sdk-dapp/UI";
import { useNavigate} from "react-router-dom";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";


function MyLoginComponent() {

  const { isLoggedIn } = useGetLoginInfo();
  const navigate  = useNavigate();

    //this have to be the same as in the data marshal request 
  const commonProps = {
    callbackRoute: "/shelf",
    nativeAuth: {
      apiAddress: "https://devnet-api.multiversx.com",
      expirySeconds: 3000,
    },
  };
  
  useEffect(() => {
     if(isLoggedIn) navigate("/shelf");
  }, [isLoggedIn]);  
  
  return (
      <ExtensionLoginButton  loginButtonText="Connect Wallet" {...commonProps} />
  );
}

export default MyLoginComponent; 