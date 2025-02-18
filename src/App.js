import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Navbar from './components/nav/Navbar';
import Browse from "./components/pages/Browse";
import Search from "./components/pages/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/browse" element={<Browse />}/>
          <Route path="/search" element={<Search />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
