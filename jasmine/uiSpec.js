describe("test dom methods for products", () => {
  let ui, product, products, div, expectedOutput;
  beforeEach(() => {
    ui = new UI();
    product = {
      id: 1,
      name: "Belt",
      quantity: 3,
      unit_cost: 10000
    };
    products = [product];
    div = document.createElement("div");
    div.id = "product-detail";
    div.className = "products";
    document.body.appendChild(div);
  });
  afterEach(() => {
    document.querySelector("#product-detail").remove();
    expectedOutput = "";
  });
  it("display single product for store owner", () => {
    localStorage.setItem("isAdmin", true);
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display single product for store attendant", () => {
    localStorage.setItem("isAdmin", false);
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display all products store owner", () => {
    localStorage.setItem("isAdmin", true);
    expectedOutput = `<div class="product"><div class="product-desc"><h2>Belt</h2><h3>10000</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value="1" id="product-id"></div>`;
    ui.showProducts(products);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display all products store attendant", () => {
    localStorage.setItem("isAdmin", false);
    expectedOutput = `<div class="product"><div class="product-desc"><h2>Belt</h2><h3>10000</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value="1" id="product-id"></div><a href="cart.html"><button class="add-to-cart">Add to Cart</button></a>`;
    ui.showProducts(products);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display products not in store", () => {
    expectedOutput = `<h2 class="center-head">There are no products yet</h2>`;
    ui.showProducts([]);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("render a form with the product's information to be modified", () => {
    const form = document.createElement("form");
    form.id = "product-edit";
    document.body.appendChild(form);
    expectedOutput = `<label>Name</label><br><input type="text" id="product-name" value="Belt"><label>Price</label><br><input type="number" id="product-price" value="10000"><label>Quantity</label><br><input type="number" id="product-quantity" value="3"><button type="submit" class="modal-btn">Submit</button>`;
    ui.showEditProduct(product);
    expect(form.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<label>Name</label><br><input type="text" id="product-name" value="Belt"><label>Price</label><br><input type="number" id="product-price" value="10000"><label>Quantity</label><br><input type="number" id="product-quantity" value="3"><label>Category</label><br><input type="text" id="product-category" value="1"><button type="submit" class="modal-btn">Submit</button>`;
    ui.showEditProduct(product);
    expect(form.innerHTML).toBe(expectedOutput);
    document.querySelector("#product-edit").remove();
  });
});

describe("test dom function for showing alerts", () => {
  let parent, child, ui;
  beforeEach(() => {
    parent = document.createElement("div");
    parent.className = "parent-alert";
    child = document.createElement("div");
    child.className = "child-alert";
    parent.innerHTML = child;
    document.body.appendChild(parent);
    ui = new UI();
  });
  afterEach(() => {
    document.querySelector(".parent-alert").remove();
  });
  it("render a successful alert message", () => {
    ui.showAlert("Welcome", "msg-display success");
    expect(parent.firstElementChild.innerHTML).toBe("Welcome");
    expect(parent.firstElementChild.className).toBe("msg-display success");
  });
  it("render a error alert message", () => {
    ui.showAlert("Failed to login", "msg-display error");
    expect(parent.firstElementChild.innerHTML).toBe("Failed to login");
    expect(parent.firstElementChild.className).toBe("msg-display error");
  });
});
