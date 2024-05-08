// import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
      {/* page will refresh if use a tag for navigation */}
      {/* <a href="/pricing">Pricing</a> */}
      {/* <Link to="/pricing">Pricing</Link> */}
    </div>
  );
}

export default Homepage;
