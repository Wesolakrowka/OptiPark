import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import ResultsTable from './ResultsTable';
import './DashboardAdmin.css';
import EditParks from './EditParks.js'

const DashboardAdmin = () => {
  const [activePage, setActivePage] = useState('parks');
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]); // New state for filtered parks
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
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
    p_canteen_score: '',
  });

  // Fetch parks from backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/parks', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setParks(response.data);
        setFilteredParks(response.data); // Initialize filtered parks with all parks
      })
      .catch((error) => {
        console.error('Error fetching parks:', error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = parks.filter((park) =>
      park.p_name.toLowerCase().includes(query)
    );
    setFilteredParks(filtered);
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
  const handleDeletePark = (p_id) => {
    axios.delete(`http://localhost:3000/api/parks/${p_id}`)
      .then(() => {
        // Remove the deleted park from both parks and filteredParks state
        setParks((prevParks) => prevParks.filter((park) => park.p_id !== p_id));
        setFilteredParks((prevFilteredParks) => prevFilteredParks.filter((park) => park.p_id !== p_id));
      })
      .catch((error) => {
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
    const criteria = ['cost', 'location', 'parking', 'room', 'roomUtilities', 'transport', 'canteen'];
    const [parks, setParks] = useState([]);
    const [pairwiseMatrix, setPairwiseMatrix] = useState([]);
    const [weights, setWeights] = useState([]);
    const [consistencyRatio, setConsistencyRatio] = useState(null);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Pobranie parków z API
    useEffect(() => {
      const fetchParks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/parks');
          setParks(response.data);
        } catch (error) {
          console.error('Błąd podczas pobierania danych parków:', error);
          setErrorMessage('Failed to load park data. Please try again.');
        }
      };

      fetchParks();
    }, []);

    useEffect(() => {
      if (pairwiseMatrix.length === 0) {
        const size = criteria.length;
        const newMatrix = Array.from({ length: size }, () =>
          Array.from({ length: size }, () => 1)
        );
        setPairwiseMatrix(newMatrix);
      }
    }, [criteria]); // Usuwamy automatyczne nadpisanie


    // Aktualizacja wartości w macierzy parowej
    const handleMatrixChange = (row, col, value) => {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 9) {
        setErrorMessage('Values must be numbers between 1 and 9.');
        return;
      }
      setErrorMessage('');

      setPairwiseMatrix((prevMatrix) => {
        const updatedMatrix = prevMatrix.map((r, i) =>
          r.map((val, j) => {
            if (i === row && j === col) {
              return parsedValue;
            }
            if (i === col && j === row) {
              return 1 / parsedValue;
            }
            return val;
          })
        );
        return updatedMatrix;
      });
    };

    // Obliczanie wag i wskaźnika spójności
    const calculateWeightsAndConsistency = () => {
      if (!pairwiseMatrix.length) return;

      const size = pairwiseMatrix.length;

      // Sumy kolumn
      const colSums = pairwiseMatrix.reduce(
        (sums, row) => row.map((val, colIndex) => sums[colIndex] + val),
        Array(size).fill(0)
      );

      // Normalizacja macierzy
      const normalizedMatrix = pairwiseMatrix.map((row) =>
        row.map((val, colIndex) => val / colSums[colIndex])
      );

      // Obliczanie wag
      const calculatedWeights = normalizedMatrix.map((row) =>
        row.reduce((sum, val) => sum + val, 0) / size
      );
      setWeights(calculatedWeights);

      // Obliczenie wskaźnika spójności
      const weightedSums = pairwiseMatrix.map((row) =>
        row.reduce((sum, val, colIndex) => sum + val * calculatedWeights[colIndex], 0)
      );
      const lambdaMax =
        weightedSums.reduce((sum, val, i) => sum + val / calculatedWeights[i], 0) / size;
      const consistencyIndex = (lambdaMax - size) / (size - 1);

      // Wskaźnik losowy (RI)
      const randomIndex = [0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49][size - 1] || 1.49;

      const calculatedConsistencyRatio = consistencyIndex / randomIndex;
      setConsistencyRatio(calculatedConsistencyRatio);

      if (calculatedConsistencyRatio > 0.1) {
        setErrorMessage('Consistency ratio is too high. Please review your priorities.');
      } else {
        setErrorMessage('');
      }
    };

    // Obliczanie wyników parków na podstawie wag
    const calculateParkScores = () => {
      if (!parks.length) {
        alert('No park data available for analysis.');
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
          const values = parks.map((p) => p[field] || 0);
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

        <h4>Pairwise Comparison Matrix</h4>
        {pairwiseMatrix.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Criteria</th>
                {criteria.map((criterion) => (
                  <th key={criterion}>{criterion}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((rowCriterion, rowIndex) => (
                <tr key={rowCriterion}>
                  <td>{rowCriterion}</td>
                  {criteria.map((colCriterion, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      {rowIndex === colIndex ? (
                        1
                      ) : (
                        <input
                          type="number"
                          min="1"
                          max="9"
                          value={pairwiseMatrix[rowIndex][colIndex]}
                          onChange={(e) =>
                            handleMatrixChange(rowIndex, colIndex, e.target.value)
                          }
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading matrix...</p>
        )}

        <button onClick={calculateWeightsAndConsistency}>Calculate Weights</button>

        <h4>Weights</h4>
        <ul>
          {weights.map((weight, index) => (
            <li key={index}>
              {criteria[index]}: {weight.toFixed(3)}
            </li>
          ))}
        </ul>
        <h4>Consistency Ratio: {consistencyRatio?.toFixed(3) || 'N/A'}</h4>

        <button onClick={calculateParkScores}>Calculate Park Rankings</button>

        {results.length > 0 && (
          <div>
            <h4>Results</h4>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  {index + 1}. {result.p_name} - Score: {result.finalScore}
                </li>
              ))}
            </ul>
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
        {activePage === 'parks' ? <EditParks
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          filteredParks={filteredParks}
          handleEditPark={handleEditPark}
          handleDeletePark={handleDeletePark}
          setShowNewParkModal={setShowNewParkModal}
        /> : <CreateStudy />}
      </main>

      {showNewParkModal && <NewParkModal />}
    </div>
  );
};

export default DashboardAdmin;