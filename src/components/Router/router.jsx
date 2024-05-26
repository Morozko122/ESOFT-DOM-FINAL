import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemplatePage from "../Template/template";
import MainPage from "../Pages/mainpage";
import MovieDetailsPage from "../MoviePage/moviepage";
import PageNotFound from "../Pages/notfoundpage";
import SearchPage from "../Search/searchpage";

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

