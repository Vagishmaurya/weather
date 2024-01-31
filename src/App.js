
import './App.css';
import './style.css';
import Searchcity from './components/Searchcity';
import Navbar from"../src/components/Navbar/Navbar";


function App() {
  return (
    <div className='App'>
    <Navbar/>
    <div className='contain'>
    
      <Searchcity/>
      
    </div>

    </div>
  );
}

export default App;
