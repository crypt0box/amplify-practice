import { useState, useEffect } from "react";
import Amplify from "aws-amplify";
import awsExports from "../src/aws-exports";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import AddItem from "../src/components/Add";
import ListItems from "../src/components/List";

Amplify.configure(awsExports);

function App() {
  const [authState, setAuthState] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AddItem />
      <ListItems />
    </div>
  ) : (
    <div className="container">
      <div className="signIn">
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}

export default App;
