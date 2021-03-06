import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  // "withCredentials: true" sends cookies
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getCountries() {
    return service
      .get("/countries")
      .then(res => res.data)
      .catch(errHandler);
  },

  getCountryDetail(id) {
    return service
      .get("/countries/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateCountry(id, body) {
    return service
      .put("/countries/" + id, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  postCountries(data) {
    return service
      .post("/countries", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteCountry(id) {
    return service
      .delete("/countries/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile() {
    return service
      .get("/users/profile")
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    // formData.append("firstname", 'Maxence')
    console.log("DEBUG formData", formData.get("picture"));
    return service
      .post("/users/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  changeUsername(username) {
    // const formData = new FormData();
    // formData.append("username", username);
    return service
      .post("/users/username", username)
      .then(res => res.data)
      .catch(errHandler);
  }

  // addPicture(file) {
  //   const formData = new FormData();
  //   formData.append("picture", file);
  //   return service
  //     .post("/endpoint/to/add/a/picture", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler);
  // }
};
