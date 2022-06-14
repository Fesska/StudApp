import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hook/useAuth";
import { SFixedContainer } from "../containers/style";
import SignInForm from "../ui/form/SignInForm";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const handleLogin = (login, password) => {
    const user = { login: login, password: password };
    signIn(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <div
      style={{
        alignItems: `center`,
        justifyContent: `center`,
        height: `auto`,
        display: `flex`,
      }}
    >
      <SFixedContainer size={300}>
        <SignInForm handleLogin={handleLogin} />
      </SFixedContainer>
    </div>
  );
}

export default SignIn;
