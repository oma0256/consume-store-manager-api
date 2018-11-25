describe("test dom functions for products", () => {
  let ui, product, products;
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
  });
  it("display single product for store owner", () => {
    localStorage.setItem("isAdmin", true);
    let expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display single product for store attendant", () => {
    localStorage.setItem("isAdmin", false);
    let expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display all products store owner", () => {
    localStorage.setItem("isAdmin", true);
    let expectedOutput = `<div class="product"><div class="product-desc"><h2>Belt</h2><h3>10000</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value="1" id="product-id"></div>`;
    ui.showProducts(products);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display all products store attendant", () => {
    localStorage.setItem("isAdmin", false);
    let expectedOutput = `<div class="product"><div class="product-desc"><h2>Belt</h2><h3>10000</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value="1" id="product-id"></div><a href="cart.html"><button class="add-to-cart">Add to Cart</button></a>`;
    ui.showProducts(products);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display products not in store", () => {
    let expectedOutput = `<h2 class="center-head">There are no products yet</h2>`;
    ui.showProducts([]);
    expect(div.innerHTML).toBe(expectedOutput);
  });
});
