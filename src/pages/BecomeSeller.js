import React, { useState } from 'react';
import axios from 'axios';

const BecomeSeller = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/become-seller', formData);
            alert(response.data.message);
        } catch (err) {
            alert('Error submitting the request');
        }
    };

    return (
        <div>
            <h1>Become a Seller</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Phone" onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BecomeSeller;