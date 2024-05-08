import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";
// import "./index";
function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>WorldWise</h1>
      {/* page will refresh if use a tag for navigation */}
      {/* <a href="/pricing">Pricing</a> */}
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
