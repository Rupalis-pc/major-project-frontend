function Loader() {
  return (
    <div className="m-5">
      <div className="d-flex justify-content-center ">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <h6 className="text-center mt-2">Loading.....</h6>
    </div>
  );
}

export default Loader;
