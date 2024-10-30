import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        sizes: '',
        bestseller: false,
        images: [],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('/api/products'); // Adjust the endpoint as needed
        if (response.data.success) {
            setProducts(response.data.products);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProduct((prev) => ({ ...prev, images: files }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProduct).forEach((key) => {
            if (key === 'images') {
                newProduct.images.forEach((image) => {
                    formData.append('image', image);
                });
            } else {
                formData.append(key, newProduct[key]);
            }
        });

        await axios.post('/api/products', formData);
        fetchProducts(); // Refresh the product list
    };

    const handleRemoveProduct = async (id) => {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Refresh the product list
    };

    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleAddProduct}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
                <input type="text" name="subcategory" placeholder="Subcategory" onChange={handleChange} required />
                <input type="text" name="sizes" placeholder="Sizes" onChange={handleChange} required />
                <label>
                    Bestseller:
                    <input type="checkbox" name="bestseller" onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })} />
                </label>
                <input type="file" multiple name="images" onChange={handleImageChange} required />
                <button type="submit">Add Product</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
