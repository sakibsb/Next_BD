import React, { useState, useEffect } from 'react';

const SellerRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch pending requests from the server
        fetch('/api/admin/seller-requests')
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error(err));
    }, []);

    const handleRequest = (id, action) => {
        // Approve or reject a seller request
        fetch(`/api/admin/seller-requests/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: action }),
        })
            .then((res) => res.json())
            .then(() => {
                setRequests((prev) =>
                    prev.filter((request) => request.id !== id)
                );
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Seller Requests</h1>
            {requests.length ? (
                <ul>
                    {requests.map((request) => (
                        <li
                            key={request.id}
                            className="flex justify-between items-center p-4 bg-gray-100 mb-2"
                        >
                            <div>
                                <p className="font-bold">{request.name}</p>
                                <p>{request.email}</p>
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white mr-2"
                                    onClick={() => handleRequest(request.id, 'approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white"
                                    onClick={() => handleRequest(request.id, 'rejected')}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending requests.</p>
            )}
        </div>
    );
};

export default SellerRequests;
