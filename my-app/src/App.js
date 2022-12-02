import {BrowserRouter} from 'react-router-dom'
import AmiiboMain from "./AmiiboMain";

function App() {
  return (
    <div>
      <h1>Nintendo Amiibo</h1>
      <BrowserRouter>
        <AmiiboMain />
      </BrowserRouter>
    </div>
  );
}

export default App; 