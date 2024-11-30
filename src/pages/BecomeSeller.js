import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const BecomeSeller = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false); // Loading state for form submission

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch(SummaryApi.becomeSeller.url, {
                method: SummaryApi.becomeSeller.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                setFormData({ name: '', email: '', phone: '', address: '' }); // Clear form on success
            } else {
                toast.error(result.message || 'Submission failed.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold">Become a Seller</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border mb-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border mb-2"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border mb-2"
                />
                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border mb-2"
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BecomeSeller;