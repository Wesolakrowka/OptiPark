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
    const [errorMessage, setErrorMessage] = useState(''); // For validation messages
  
    // Handle weight input changes
    const handleWeightChange = (e) => {
      const { name, value } = e.target;
  
      if (value < 1 || value > 10) {
        setErrorMessage('Please enter values between 1 and 10.');
      } else {
        setErrorMessage('');
      }
  
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
  
    // Normalize scores to 1-10
    const normalizeScore = (value, minValue, maxValue) => {
      if (maxValue === minValue) return 10; // Avoid division by zero
      return ((value - minValue) / (maxValue - minValue)) * 10;
    };
  
    // Normalize and invert costs to give higher scores for lower costs
    const calculateNormalizedCost = (cost, minCost, maxCost) => {
      return ((maxCost - cost) / (maxCost - minCost)) * 10;
    };
  
    // Calculate scores and rank parks
    const handleCreateStudy = (e) => {
      e.preventDefault();
  
      // Check if all weights are valid
      if (Object.values(weights).some((weight) => weight < 1 || weight > 10 || weight === '')) {
        setErrorMessage('All weights must be between 1 and 10.');
        return;
      }
  
      const normalizedWeights = normalizeWeights();
      if (!normalizedWeights) {
        alert('Please enter valid weights.');
        return;
      }
  
      // Find min and max for normalization
      const minCost = Math.min(...parks.map((park) => park.p_price));
      const maxCost = Math.max(...parks.map((park) => park.p_price));
  
      const criteria = [
        { key: 'location', field: 'p_location_score' },
        { key: 'parking', field: 'p_parking_score' },
        { key: 'room', field: 'p_room_score' },
        { key: 'roomUtilities', field: 'p_room_utilities_score' },
        { key: 'transport', field: 'p_transport_score' },
        { key: 'canteen', field: 'p_canteen_score' },
      ];
  
      const calculatedResults = parks.map((park) => {
        let score = 0;
  
        // Add normalized cost score
        const normalizedCost = calculateNormalizedCost(park.p_price, minCost, maxCost);
        score += normalizedWeights.cost * normalizedCost;
  
        // Add scores for other criteria
        criteria.forEach(({ key, field }) => {
          const values = parks.map((p) => p[field]);
          const minValue = Math.min(...values);
          const maxValue = Math.max(...values);
  
          const normalizedValue = normalizeScore(park[field], minValue, maxValue);
          score += normalizedWeights[key] * normalizedValue;
        });
  
        return {
          ...park,
          score: score.toFixed(2), // Round to 2 decimals
        };
      });
  
      // Sort results by score (highest first)
      calculatedResults.sort((a, b) => b.score - a.score);
  
      setResults(calculatedResults);
      setErrorMessage(''); // Clear any previous error messages
    };
  
    return (
      <div className="create-study">
        <h3>Create Study</h3>
        <p>Please assign weights to criteria (1–10). Higher values mean more importance.</p>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleCreateStudy}>
          <input
            type="number"
            name="cost"
            placeholder="Cost Weight (1–10)"
            value={weights.cost}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="location"
            placeholder="Location Weight (1–10)"
            value={weights.location}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="parking"
            placeholder="Parking Weight (1–10)"
            value={weights.parking}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="room"
            placeholder="Meeting Rooms Weight (1–10)"
            value={weights.room}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="roomUtilities"
            placeholder="Meeting Room Utilities Weight (1–10)"
            value={weights.roomUtilities}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="transport"
            placeholder="Transport Weight (1–10)"
            value={weights.transport}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            name="canteen"
            placeholder="Canteen Weight (1–10)"
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
