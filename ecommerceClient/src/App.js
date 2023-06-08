import logo from './logo.svg';
import './App.css';
import  Store  from './store';

function App() {
  console.log(Store.getState());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello
        </p>
      </header>
    </div>
  );
}

export default App;
