export default function ProfileUI() {
  return (
    <div>
      <h4 className="mb-0">Profile Detials</h4>
      <p className="text-muted mb-4">Edit Your Account Details</p>

      <h6 className="mb-3">Personal Information</h6>

      <div className="row g-3">
        <div className="col-md-6">
          <label>First Name</label>
          <input type="text" className="form-control" value="Rupali" disabled />
        </div>
        <div className="col-md-6">
          <label>Last Name</label>
          <input type="text" className="form-control" value="Sethia" disabled />
        </div>
        <div className="col-md-6">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value="abc@example.com"
            disabled
          />
        </div>
        <div className="col-md-6">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            value="+91-0000000000"
            disabled
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-info" disabled>
          UPDATE
        </button>
      </div>
      <h6 className="mt-4 mb-3">Password</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value="xxxxxxx"
            disabled
          />
        </div>
        <div className="col-md-6">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value="xxxxxx"
            disabled
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-info" disabled>
          UPDATE PASSWORD
        </button>
      </div>
    </div>
  );
}
