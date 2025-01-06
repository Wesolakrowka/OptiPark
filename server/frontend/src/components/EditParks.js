// Define outside of DashboardAdmin
const EditParks = ({ searchQuery, handleSearchChange, filteredParks, handleEditPark, handleDeletePark, setShowNewParkModal }) => (
    <div className="edit-parks">
      <h3>Park List</h3>
  
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a park..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
  
      <button className="new-park-button" onClick={() => setShowNewParkModal(true)}>
        New Park
      </button>
  
      {/* Render filtered parks */}
      {filteredParks.map((park, index) => (
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
  
  export default(EditParks);