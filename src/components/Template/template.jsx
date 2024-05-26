import Header from "../Header/header";
import FavoritesList from "../Sidebar/favoriteMovies";
import WatchLaterList from "../Sidebar/watchLater";
import { Outlet } from "react-router-dom";
import "./template.css"

function TemplatePage() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="main-container">
          <Outlet />
        </div>
        <div className="favorites-container">
          <FavoritesList />
          <hr className="list-hr"></hr>
          <WatchLaterList />
        </div>
      </div>
    </div>
  );
}

export default TemplatePage;

