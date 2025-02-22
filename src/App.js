import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./components/pages/Home";
import Navbar from "./components/nav/Navbar";
import Browse from "./components/pages/Browse";
import Search from "./components/pages/Search";
import Movie from "./components/pages/Movie";
import TVShow from "./components/pages/TVShow";
import Person from "./components/pages/Person";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tv/:id" element={<TVShow />} />
            <Route path="person/:id" element={<Person />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
