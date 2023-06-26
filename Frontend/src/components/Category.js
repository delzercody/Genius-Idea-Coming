import Sidebar from "./Sidebar"
function Category() {
  return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            Hi
          </div>
        </div>
      </div>
  )
}

export default Category