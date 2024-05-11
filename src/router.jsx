import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemplatePage from "./components/Pages/template";
import MainPage from "./components/Pages/mainpage";
import MovieDetailsPage from "./components/Pages/moviepage";
import PageNotFound from "./components/Pages/notfoundpage";
import SearchPage from "./components/Search/searchpage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route index element={<MainPage />} />
          <Route path="films/:id" element={<MovieDetailsPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}