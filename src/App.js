import "./App.css";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    // BEM naming convention
    <div className='app'>
      {/* <h1>Lets build a Whatsapp clone</h1> */}
      <div className='app__body'>
        {/* Sidebar */}
        <Sidebar />
        {/* chat */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
