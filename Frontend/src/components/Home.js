import NavBar from "./NavBar";
import '../stylesheets/home.css'

function Home() {
  return (
    <>
    <NavBar />
    <div className="home-title">
      <h1>Share, Discover, and Create your Genius Ideas</h1>
    </div>
    <div className="home-body">
      <div>
        <form className="login-form">
          <label>Username:</label>
          <input type="text"></input>
          <label>Password:</label>
          <input type="text"></input>
        </form>
      </div>
      <div className="description">
        <h3>What we're about:</h3>
        <h4>What users are able to do</h4>
        <h4>Why this is the best website ever</h4>
        <h4>anything else we want to include</h4>
      </div>
    </div>

    {/* // <div>
    //   <div className="container">
    //     <div className="row">
    //     <h5 className="list-group-item">
    //       <Link className='sidebar-link' to="/Category/technology">Technology</Link>
    //     </h5>
    //     </div>
    //   </div>
    // </div> */}
    </>
  )
}

export default Home;
