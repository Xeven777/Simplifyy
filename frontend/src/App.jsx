import { useState, useEffect } from "react";
import Home from "./Home";

function App() {
  const [values, setValues] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setValues(result.user.email);
        localStorage.setItem("email", result.user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  useEffect(() => {
    setValues(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      {values ? <Home /> : <button onClick={handleClick}> Google</button>}
    </div>
  );
}
export default App;
