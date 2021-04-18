import { useState, useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";

function App() {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user);
  console.log(user);

  // setUser(userinfo);
  // useEffect(() => {
  //   console.log(userinfo);
  //   if (Object.keys(userinfo).length !== 0) {
  //     setUser(userinfo);
  //   }
  // }, [userinfo]);

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>
              <Route path='/'>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
    // </Provider>
  );
}

export default App;
