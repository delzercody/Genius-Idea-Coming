import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import '../stylesheets/Category.css';

function Category() {
  return (
    <div>
      <NavBar />
      <div className="headerimage d-flex justify-content-center">
        insert giant image here according to the category
      </div>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar />
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-secondary">Create an idea</button>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
          <button type="button" className="btn btn-secondary">Random button</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
