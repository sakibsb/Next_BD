import React from 'react';
import AdminHeader from '../components/AdminHeader';

function AdminDashboard() {
    return (
        <div>
            <AdminHeader />
            <main>
                <h1>Welcome to Admin Dashboard</h1>
                <p>Select an action from the navigation above.</p>
            </main>
        </div>
    );
}

export default AdminDashboard;
