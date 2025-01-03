import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [activePage, setActivePage] = useState('parks');
  const [parks, setParks] = useState([]);
  const [showNewParkModal, setShowNewParkModal] = useState(false);

  const [newPark, setNewPark] = useState({
    p_id: '',
    p_name: '',
    p_phone: '',
    p_website: '',
    p_price: '',
    p_location_score: '',
    p_parking_score: '',
    p_room_score: '',
    p_room_utilities_score: '',
    p_transport_score: '',
    p_canteen_score: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setNewPark((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddPark = () => {
    if (newPark.p_name.trim() !== '') {
      if (newPark.p_id) {
        setParks(parks.map((park) => (park.p_id === newPark.p_id ? newPark : park)));
      } else {
        newPark.p_id = `park-${parks.length + 1}`; 
        setParks([...parks, newPark]);
      }
      setNewPark({
        p_id: '',
        p_name: '',
        p_phone: '',
        p_website: '',
        p_price: '',
        p_location_score: '',
        p_parking_score: '',
        p_room_score: '',
        p_room_utilities_score: '',
        p_transport_score: '',
        p_canteen_score: ''
      });
      setShowNewParkModal(false);
    }
  };

  const handleDeletePark = (index) => {
    setParks(parks.filter((_, i) => i !== index));
  };

  const handleEditPark = (index) => {
    setNewPark(parks[index]);
    setShowNewParkModal(true); 
    setActivePage('parks'); 
  };

  const EditParks = () => (
    <div className="edit-parks">
      <h3>Park List</h3>
      <button className="new-park-button" onClick={() => setShowNewParkModal(true)}>
        New Park
      </button>
      {parks.map((park, index) => (
        <div className="park-item" key={index}>
          <span>{park.p_name}</span>
          <div>
            <button onClick={() => handleEditPark(index)}>Edit</button> {/* Trigger edit */}
            <button onClick={() => handleDeletePark(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  const NewParkModal = () => {
    const [newParkData, setNewParkData] = useState(newPark);
  
    useEffect(() => {
      setNewParkData(newPark);
    }, [newPark]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewParkData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{newParkData.p_id ? 'Edit Park' : 'Create New Park'}</h3>
          <input
            type="text"
            name="p_name"
            placeholder="Park Name"
            value={newParkData.p_name}
            onChange={handleInputChange}
            autoFocus
          />
          <input
            type="text"
            name="p_phone"
            placeholder="Phone"
            value={newParkData.p_phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="p_website"
            placeholder="Website"
            value={newParkData.p_website}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_price"
            placeholder="Price"
            value={newParkData.p_price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_location_score"
            placeholder="Location Score"
            value={newParkData.p_location_score}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_parking_score"
            placeholder="Parking Score"
            value={newParkData.p_parking_score}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_room_score"
            placeholder="Room Score"
            value={newParkData.p_room_score}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_room_utilities_score"
            placeholder="Room Utilities Score"
            value={newParkData.p_room_utilities_score}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_transport_score"
            placeholder="Transport Score"
            value={newParkData.p_transport_score}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="p_canteen_score"
            placeholder="Canteen Score"
            value={newParkData.p_canteen_score}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            <button onClick={() => handleAddPark(newParkData)}>{newParkData.p_id ? 'Update Park' : 'Add Park'}</button>
            <button onClick={() => setShowNewParkModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  

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
        <button type="submit" className="create-study-button">
          Create Study
        </button>
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
          <li
            onClick={() => setActivePage('parks')}
            className={activePage === 'parks' ? 'active' : ''}
          >
            Parks
          </li>
          <li
            onClick={() => setActivePage('study')}
            className={activePage === 'study' ? 'active' : ''}
          >
            Create Study
          </li>
        </ul>
      </aside>
      <main className="main-content">
        {activePage === 'parks' ? <EditParks /> : <CreateStudy />}
      </main>

      {/* Modal for new park */}
      {showNewParkModal && <NewParkModal />}
    </div>
  );
};

export default DashboardAdmin;
