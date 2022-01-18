import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleLogin, {GoogleLoginResponse,GoogleLoginResponseOffline} from "react-google-login";

import Config from "config";
import { signInWithGoogleAsync } from "services/user/user";

const googleClientId = Config.google.clientId;
// define props
type Props = {};

export const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    //GoogleLoginResponseOfflineをガード
    if(!("accessToken" in response)) return;
    dispatch(signInWithGoogleAsync(response.accessToken));
  };

  return (
    <div>
      <h1>Login</h1>
      <ul>
        <li>
          <Link to="/easysetting">EasySetting Page</Link>
        </li>
      </ul>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={(response) => handleGoogleLogin(response)}
        onFailure={(err: string) => console.log("Google Login failed", err)}
      />
    </div>
  );
};

export default Login;
