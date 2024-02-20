
import './App.css';
function App() {
  return (
      <form>
        <div className="header">
          <p>Please enter the current location</p>
          <input type="text" placeholder="enter the name" id="name"/>
          <br></br>
        </div>
        <br></br>
        <div className="body">
          <p>Please enter the destination</p>
          <input type="text" placeholder="enter the name" id="name"/>
          <br></br>
          <button type="submit"> Enter </button>
        </div>
      </form>
  );
}

export default App;
