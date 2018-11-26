// Class for a custom http
class Http {
  // Method to retrieve headers
  getHeaders() {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
    return headers;
  }

  // Perform get call to external api
  async get(url) {
    const headers = this.getHeaders();
    const res = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const resData = await res.json();
    const output = {
      status: res.status,
      data: resData
    };
    return output;
  }

  // Post data to external api
  async post(url, data) {
    const headers = this.getHeaders();
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    const output = {
      status: res.status,
      data: resData
    };
    return output;
  }

  // Modify data in external api
  async put(url, data) {
    const headers = this.getHeaders();
    const res = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    const output = {
      status: res.status,
      data: resData
    };
    return output;
  }

  // Delete data from external api
  async delete(url) {
    const headers = this.getHeaders();
    const res = await fetch(url, {
      method: "DELETE",
      headers: headers
    });
    console.log(res);
    // const resData = await res.json();
    const output = {
      status: res.status,
      data: "Product deleted"
    };
    return output;
  }
}
