import React, { useState } from 'react';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [activePage, setActivePage] = useState('parks'); // Manage the active page

  // Component for editing parks
  const EditParks = () => (
    <div className="edit-parks">
      <h3>Park List</h3>
      <button className="new-park-button">New Park</button>
      <div className="park-item">
        <span>Park Name</span>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="park-item">
        <span>Park Name</span>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );

  // Component for creating studies
  const CreateStudy = () => (
    <div className="create-study">
      <h3>Create Study</h3>
      <form>
        <input type="text" placeholder="Cost Weight" />
        <input type="text" placeholder="Location Weight" />
        <input type="text" placeholder="Parking Weight" />
        <input type="text" placeholder="Meeting Rooms Weight" />
        <input type="text" placeholder="Meeting Room Utilities Weight" />
        <input type="text" placeholder="Transport Weight" />
        <input type="text" placeholder="Canteen Weight" />
        <button type="submit" className="create-study-button">Create Study</button>
      </form>
      <div className="study-result">
        <h3>Study Result</h3>
        <div className="result-item">
          <span>Park XYZ</span>
          <span>000-000-000</span>
          <span>www.domain.com</span>
          <span>Score: 1.00</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-admin-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => setActivePage('parks')} className={activePage === 'parks' ? 'active' : ''}>
            Parks
          </li>
          <li onClick={() => setActivePage('study')} className={activePage === 'study' ? 'active' : ''}>
            Create Study
          </li>
        </ul>
      </aside>
      <main className="main-content">
        {activePage === 'parks' ? <EditParks /> : <CreateStudy />}
      </main>
    </div>
  );
};

export default DashboardAdmin;
