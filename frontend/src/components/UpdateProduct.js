import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  async function handleUpdateProduct() {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  }

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button className="appButton" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;
