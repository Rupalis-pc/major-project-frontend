export default function Profile() {
  return (
    <main className="bg-body-light">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="border shadow-sm">hi</div>
          </div>
          <div className="col-md-9">
            <div className="container border shadow-sm py-4">
              <form class="row g-3">
                <div class="col-md-6">
                  <label for="inputFirstName" class="form-label">
                    First Name
                  </label>
                  <input
                    type="firstName"
                    class="form-control"
                    id="inputFirstName"
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputLastName" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="lastName"
                    class="form-control"
                    id="inputLastName"
                  />
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Steet"
                  />
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">
                    Address 2
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">
                    City
                  </label>
                  <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">
                    State
                  </label>
                  <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">
                    Zip
                  </label>
                  <input type="text" class="form-control" id="inputZip" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
