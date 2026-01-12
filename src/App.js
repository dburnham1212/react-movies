import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./components/pages/Home";
import Navbar from "./components/nav/Navbar";
import Browse from "./components/pages/Browse";
import Search from "./components/pages/Search";
import Movie from "./components/pages/Movie";
import TVShow from "./components/pages/TVShow";
import Person from "./components/pages/Person";
import Season from "./components/pages/Season";
import Verification from "./components/login/Verification";
import Episode from "./components/pages/Episode";
import Footer from "./components/footer/Footer";
import Lists from "./components/pages/Lists";
import ListCreation from "./components/pages/ListCreation";
import PageNotFound from "./components/pages/PageNotFound";

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
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/movie/:id" element={<Movie />} />
                        <Route path="/tv/:showId/season/:seasonNumber" element={<Season />} />
                        <Route path="/tv/:id" element={<TVShow />} />
                        <Route path="/person/:id" element={<Person />} />
                        <Route path="/tv/:showId/season/:seasonNumber/episode/:episodeNumber" element={<Episode />} />
                        <Route path="/lists" element={<Lists />} />
                        <Route path="/lists/create" element={<ListCreation />} />
                        <Route path="/404" element={<PageNotFound />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
