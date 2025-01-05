import axios from 'axios'; // Import axios
import * as XLSX from 'xlsx'; // Importujemy bibliotekę xlsx
import React, { useState, useEffect } from 'react'; // Import React

import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [activePage, setActivePage] = useState('parks');
  const [parks, setParks] = useState([]);
  const [showNewParkModal, setShowNewParkModal] = useState(false);
  const [results, setResults] = useState([]);

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

  const exportToExcel = () => {
    if (results.length === 0) {
      alert('Nie ma wyników do eksportu!'); // Alert if no results to export
      return;
    }
  
    // Map the results data into a format suitable for export
    const dataToExport = results.map((result, index) => ({
      Rank: index + 1,
      Name: result.p_name,
      Phone: result.p_phone,
      Website: result.p_website,
      Score: result.score,
    }));
  
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Study Results');
  
    // Write the Excel file
    XLSX.writeFile(workbook, 'Study_Results.xlsx');
  };

  const CreateStudy = () => {
    const [parks, setParks] = useState([]); // Przechowuje dane parków
    const [priorities, setPriorities] = useState({});
    const [pairwiseMatrix, setPairwiseMatrix] = useState([]);
    const [weights, setWeights] = useState([]);
    const [consistencyRatio, setConsistencyRatio] = useState(null);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
  
    const criteria = ['cost', 'location', 'parking', 'room', 'roomUtilities', 'transport', 'canteen'];
  
    // Pobieranie danych parków z API
    useEffect(() => {
      const fetchParks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/parks'); // Endpoint API
          setParks(response.data); // Ustawienie danych parków w stanie
        } catch (error) {
          console.error('Błąd podczas ładowania danych parków:', error);
        }
      };
  
      fetchParks();
    }, []);
  
    useEffect(() => {
      // Inicjalizacja domyślnych priorytetów dla kryteriów
      const initialPriorities = criteria.reduce((acc, criterion) => {
        acc[criterion] = 1; // Domyślny priorytet
        return acc;
      }, {});
      setPriorities(initialPriorities);
    }, []);
  
    useEffect(() => {
      if (Object.keys(priorities).length > 0) {
        // Tworzenie macierzy porównań
        const size = criteria.length;
        const newMatrix = Array(size)
          .fill(null)
          .map(() => Array(size).fill(1));
  
        criteria.forEach((criterion1, i) => {
          criteria.forEach((criterion2, j) => {
            if (i !== j && priorities[criterion1] && priorities[criterion2]) {
              newMatrix[i][j] = priorities[criterion1] / priorities[criterion2];
            }
          });
        });
  
        setPairwiseMatrix(newMatrix);
        calculateWeightsAndConsistency(newMatrix);
      }
    }, [priorities]);
  
    const handlePriorityChange = (criterion, value) => {
      const newValue = value === '' ? '' : parseInt(value, 10);
      if (newValue >= 1 && newValue <= 9) {
        setPriorities({
          ...priorities,
          [criterion]: newValue,
        });
        setErrorMessage('');
      } else if (value !== '') {
        setErrorMessage('Values must be between 1 and 9.');
      }
    };
  
    const calculateWeightsAndConsistency = (matrix) => {
      const size = matrix.length;
  
      // Obliczanie sum kolumn
      const colSums = matrix.reduce(
        (sums, row) => row.map((val, colIndex) => sums[colIndex] + val),
        Array(size).fill(0)
      );
  
      // Normalizacja macierzy
      const normalizedMatrix = matrix.map((row) =>
        row.map((val, colIndex) => val / colSums[colIndex])
      );
  
      // Obliczanie wag (średnia wierszy)
      const calculatedWeights = normalizedMatrix.map((row) =>
        row.reduce((sum, val) => sum + val, 0) / size
      );
      setWeights(calculatedWeights);
  
      // Sprawdzenie spójności
      const weightedSums = matrix.map((row) =>
        row.reduce((sum, val, colIndex) => sum + val * calculatedWeights[colIndex], 0)
      );
      const lambdaMax =
        weightedSums.reduce((sum, val, i) => sum + val / calculatedWeights[i], 0) / size;
      const consistencyIndex = (lambdaMax - size) / (size - 1);
      const randomIndex = [0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49][size - 1] || 1.49;
      const consistencyRatio = consistencyIndex / randomIndex;
  
      setConsistencyRatio(consistencyRatio);
  
      if (consistencyRatio > 0.1) {
        setErrorMessage('The consistency ratio is too high. Please revise your priorities.');
      } else {
        setErrorMessage('');
      }
    };
  
    const calculateParkScores = () => {
      if (!parks || parks.length === 0) {
        alert('Brak danych parków do analizy.');
        return;
      }
      if (!weights || weights.length !== criteria.length) {
        alert('Nie obliczono wag kryteriów.');
        return;
      }
  
      const criteriaFields = {
        cost: 'p_price',
        location: 'p_location_score',
        parking: 'p_parking_score',
        room: 'p_room_score',
        roomUtilities: 'p_room_utilities_score',
        transport: 'p_transport_score',
        canteen: 'p_canteen_score',
      };
  
      const parkScores = parks.map((park) => {
        let totalScore = 0;
  
        criteria.forEach((criterion, index) => {
          const field = criteriaFields[criterion];
          const values = parks.map((p) => p[field] || 0); // Domyślne 0, jeśli undefined
          const minValue = Math.min(...values);
          const maxValue = Math.max(...values);
  
          const normalizedValue =
            ((park[field] || 0) - minValue) / (maxValue - minValue) || 0;
          totalScore += weights[index] * normalizedValue;
        });
  
        return {
          ...park,
          finalScore: totalScore.toFixed(3),
        };
      });
  
      const sortedResults = parkScores.sort((a, b) => b.finalScore - a.finalScore);
      setResults(sortedResults);
    };
  
    return (
      <div className="create-study">
        <h3>Create Study</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div>
          <h4>Set Priorities</h4>
          <table>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Priority (1–9)</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion}>
                  <td>{criterion}</td>
                  <td>
                    <input
                      type="number"
                      value={priorities[criterion] || ''}
                      onChange={(e) => handlePriorityChange(criterion, e.target.value)}
                      min="1"
                      max="9"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4>Weights</h4>
          <ul>
            {weights.map((weight, index) => (
              <li key={index}>
                {criteria[index]}: {weight.toFixed(3)}
              </li>
            ))}
          </ul>
          <h4>Consistency Ratio: {consistencyRatio?.toFixed(3) || 'N/A'}</h4>
        </div>
        <button onClick={calculateParkScores}>Calculate Park Rankings</button>
        
        
        {results.length > 0 && (
          <div>
            <h4>Results</h4>
            <ol>
              {results.map((result, index) => (
                <li key={result.p_id}>
                  {result.p_name} - Score: {result.finalScore}
                </li>
              ))}
            </ol>
          </div>
        )}
  
        <button onClick={exportToExcel} className="export-button">
          Export to Excel
        </button>
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