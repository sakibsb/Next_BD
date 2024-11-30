import React, { useState } from 'react';
import axios from 'axios';

const SellerRequestForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sellers/become-seller', formData);
            setMessage('Request submitted successfully');
        } catch (error) {
            setMessage('Error submitting request');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Become a Seller</h2>
            {message && <p>{message}</p>}
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SellerRequestForm;
