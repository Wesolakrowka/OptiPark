import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
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

  // Fetch parks from backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/parks', {
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(response => {
        setParks(response.data);
      })
      .catch(error => {
        console.error('Error fetching parks:', error);
      });
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPark((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add or Update park
  const handleAddPark = () => {
    if (newPark.p_name.trim() !== '') {
      if (newPark.p_id) {
        // Update the park
        axios.put(`http://localhost:3000/api/parks/${newPark.p_id}`, newPark) // Updated backend URL
          .then(response => {
            setParks(parks.map((park) => (park.p_id === newPark.p_id ? newPark : park)));
            resetNewParkForm();
          })
          .catch(error => {
            console.error('Error updating park:', error);
          });
      } else {
        // Create a new park
        axios.post('http://localhost:3000/api/parks', newPark) // Updated backend URL
          .then(response => {
            setParks([...parks, response.data]);
            resetNewParkForm();
          })
          .catch(error => {
            console.error('Error creating park:', error);
          });
      }
    }
  };

  // Delete park
  const handleDeletePark = (parkId) => {
    axios.delete(`http://localhost:3000/api/parks/${parkId}`) // Updated backend URL
      .then(() => {
        setParks(parks.filter((park) => park.p_id !== parkId));
      })
      .catch(error => {
        console.error('Error deleting park:', error);
      });
  };

  // Edit park (prepopulate form)
  const handleEditPark = (index) => {
    setNewPark(parks[index]);
    setShowNewParkModal(true);
    setActivePage('parks');
  };

  // Reset new park form
  const resetNewParkForm = () => {
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
  };

  // Edit Parks Component
  const EditParks = () => (
    <div className="edit-parks">
      <h3>Park List</h3>
      <button className="new-park-button" onClick={() => setShowNewParkModal(true)}>
        New Park
      </button>
      {parks.map((park, index) => (
        <div className="park-item" key={park.p_id}>
          <span>{park.p_name}</span>
          <div>
            <button onClick={() => handleEditPark(index)}>Edit</button>
            <button onClick={() => handleDeletePark(park.p_id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  // New Park Modal Component
  const NewParkModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{newPark.p_id ? 'Edit Park' : 'Create New Park'}</h3>
        <input
          type="text"
          name="p_name"
          placeholder="Park Name"
          value={newPark.p_name}
          onChange={handleInputChange}
          autoFocus
        />
        <input
          type="text"
          name="p_phone"
          placeholder="Phone"
          value={newPark.p_phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="p_website"
          placeholder="Website"
          value={newPark.p_website}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_price"
          placeholder="Price"
          value={newPark.p_price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_location_score"
          placeholder="Location Score"
          value={newPark.p_location_score}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_parking_score"
          placeholder="Parking Score"
          value={newPark.p_parking_score}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_room_score"
          placeholder="Room Score"
          value={newPark.p_room_score}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_room_utilities_score"
          placeholder="Room Utilities Score"
          value={newPark.p_room_utilities_score}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_transport_score"
          placeholder="Transport Score"
          value={newPark.p_transport_score}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="p_canteen_score"
          placeholder="Canteen Score"
          value={newPark.p_canteen_score}
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button onClick={handleAddPark}>{newPark.p_id ? 'Update Park' : 'Add Park'}</button>
          <button onClick={resetNewParkForm}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const CreateStudy = () => {
    const [weights, setWeights] = useState({
      cost: '',
      location: '',
      parking: '',
      room: '',
      roomUtilities: '',
      transport: '',
      canteen: '',
    });
  
    const [results, setResults] = useState([]);
  
    // Handle weight input changes
    const handleWeightChange = (e) => {
      const { name, value } = e.target;
      setWeights((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Normalize weights
    const normalizeWeights = () => {
      const total = Object.values(weights).reduce((sum, val) => sum + parseFloat(val || 0), 0);
      if (total === 0) return null; // Avoid division by zero
  
      const normalized = {};
      for (const key in weights) {
        normalized[key] = parseFloat(weights[key] || 0) / total;
      }
      return normalized;
    };
  
    // Calculate scores and rank parks
    const handleCreateStudy = (e) => {
      e.preventDefault();
  
      const normalizedWeights = normalizeWeights();
      if (!normalizedWeights) {
        alert('Please enter valid weights.');
        return;
      }
  
      // Calculate scores
      const calculatedResults = parks.map((park) => {
        const score =
          normalizedWeights.cost * park.p_price +
          normalizedWeights.location * park.p_location_score +
          normalizedWeights.parking * park.p_parking_score +
          normalizedWeights.room * park.p_room_score +
          normalizedWeights.roomUtilities * park.p_room_utilities_score +
          normalizedWeights.transport * park.p_transport_score +
          normalizedWeights.canteen * park.p_canteen_score;
  
        return {
          ...park,
          score: score.toFixed(2), // Round to 2 decimals
        };
      });
  
      // Sort results by score (highest first)
      calculatedResults.sort((a, b) => b.score - a.score);
  
      setResults(calculatedResults);
    };
  
    return (
      <div className="create-study">
        <h3>Create Study</h3>
        <form onSubmit={handleCreateStudy}>
          <input
            type="number"
            name="cost"
            placeholder="Cost Weight"
            value={weights.cost}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="location"
            placeholder="Location Weight"
            value={weights.location}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="parking"
            placeholder="Parking Weight"
            value={weights.parking}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="room"
            placeholder="Meeting Rooms Weight"
            value={weights.room}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="roomUtilities"
            placeholder="Meeting Room Utilities Weight"
            value={weights.roomUtilities}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="transport"
            placeholder="Transport Weight"
            value={weights.transport}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="canteen"
            placeholder="Canteen Weight"
            value={weights.canteen}
            onChange={handleWeightChange}
          />
          <button type="submit" className="create-study-button">
            Calculate Study
          </button>
        </form>
  
        {results.length > 0 && (
          <div className="study-result">
            <h3>Study Result</h3>
            {results.map((result, index) => (
              <div className="result-item" key={result.p_id}>
                <span>#{index + 1}: {result.p_name}</span>
                <span>{result.p_phone}</span>
                <span>{result.p_website}</span>
                <span>Score: {result.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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

      {showNewParkModal && <NewParkModal />}
    </div>
  );
};

export default DashboardAdmin;
