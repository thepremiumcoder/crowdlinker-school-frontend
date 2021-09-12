import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function AuthCheck(props) {
  let Page = props.Page;
  const history = useHistory();

  //redirect if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("authenticated-user")) {
      history.push("/login");
    }
  }, [history]);

  //Load page or continue with the request if authenticated
  return (
    <div>
      <Page />
    </div>
  );
}

export default AuthCheck;
