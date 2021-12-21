import './App.css';
import DropZoneFileUplodar from './FileUploaders/DropZoneFileUplodar';
import UserInfo from './views/UserInfo';

function App() {
  return (
    <div className="App" dir='rtl'>
      <h1>React File Uploader</h1>
      <UserInfo />
      <hr />
      <div style={{ width: "500px" }}>
        <DropZoneFileUplodar />
      </div>
    </div>
  );
}

export default App;
