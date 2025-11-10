import './App.css';
import SplitFlap from './components/SplitFlap/SplitFlap';

function App() {
  return (
    <div className="App">
      <SplitFlap 
        text="HELLO WORLD" 
        speed={60}  // 더 빠른 flip 속도
      />
    </div>
  );
}

export default App;
