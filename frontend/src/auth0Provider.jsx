import { Auth0Provider } from "@auth0/auth0-react";

import React from "react";


const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-vvavubejfc3hoy2m.us.auth0.com";
  const clientId = "rwRThDf3C9q5IG3nMdoAOapqacu8Cjy4";
  const audience = "thisismyidentifierkiprono";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
