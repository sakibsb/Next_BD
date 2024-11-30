import React from 'react';

function AdminHeader() {
    return (
        <header className="admin-header">
            <nav>
                <ul className="admin-nav">
                    {/* Add more links as needed */}
                    <li><a href="/admin/seller-requests">Manage Seller Requests</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default AdminHeader;
