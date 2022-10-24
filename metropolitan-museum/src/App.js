import './App.css';
import RenderContent from './components/RenderContent';
import Navigator from './components/Navigator';
function App() {
  return (
    <div className="App">
    
    <h1>I want to explore...</h1>
    <nav>
      <Navigator />
    </nav>       
      <RenderContent />
    </div>
   
    
  )
}

export default App;
