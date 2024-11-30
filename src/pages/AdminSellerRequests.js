import React, { useEffect, useState } from 'react';
import SummaryApi from '../common'; // Assuming this is your API file
import { toast } from 'react-toastify';

function AdminSellerRequests() {
    const [requests, setRequests] = useState([]);

    // Fetch Seller Requests
    const fetchSellerRequests = async () => {
        try {
            const response = await fetch(SummaryApi.getSellerRequests.url, {
                method: SummaryApi.getSellerRequests.method,
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setRequests(data.requests);
            } else {
                toast.error('Failed to fetch seller requests.');
            }
        } catch (error) {
            toast.error('Error fetching seller requests.');
        }
    };

    // Handle Approve/Reject
    const handleUpdateRequest = async (id, status) => {
        try {
            const response = await fetch(SummaryApi.updateSellerRequest.url(id), {
                method: SummaryApi.updateSellerRequest.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                toast.success(`Request ${status} successfully.`);
                fetchSellerRequests(); // Refresh data
            } else {
                toast.error('Failed to update seller request.');
            }
        } catch (error) {
            toast.error('Error updating seller request.');
        }
    };

    useEffect(() => {
        fetchSellerRequests();
    }, []);

    return (
        <div>
            <h1>Seller Requests</h1>
            {requests.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.status}</td>
                                <td>
                                    {request.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleUpdateRequest(request._id, 'approved')}>
                                                Approve
                                            </button>
                                            <button onClick={() => handleUpdateRequest(request._id, 'rejected')}>
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No seller requests found.</p>
            )}
        </div>
    );
}

export default AdminSellerRequests;