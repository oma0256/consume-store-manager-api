describe("test dom functions for products", () => {
  let ui, product;
  beforeEach(() => {
    ui = new UI();
    product = {
      name: "Belt",
      quantity: 3,
      unit_cost: 10000
    };
    div = document.createElement("div");
    div.id = "product-detail";
    document.body.appendChild(div);
  });
  afterEach(() => {
    document.querySelector("#product-detail").remove();
  });
  it("display single product for store owner", () => {
    isAdmin = "true";
    let expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
  it("display single product for store attendant", () => {
    isAdmin = "false";
    let expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
    product.category_id = 1;
    expectedOutput = `<div id="desc-side"><p>Name: Belt</p><p>Price: 10000</p><p>Quantity: 3</p><p>Category: 1</p></div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    ui.showProduct(product);
    expect(div.innerHTML).toBe(expectedOutput);
  });
});
