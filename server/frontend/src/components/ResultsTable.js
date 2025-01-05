import React from 'react';
import * as XLSX from 'xlsx';

// Results Table Component
const ResultsTable = ({ results }) => {
  const exportToExcel = () => {
    const dataToExport = results.map((result, index) => ({
      Rank: index + 1,
      Name: result.p_name,
      Phone: result.p_phone,
      Website: result.p_website,
      FinalScore: result.finalScore,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, 'Parks_Study_Results.xlsx');
  };

  return (
    <div>
      <h4>Results</h4>
      <table className="results-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Final Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.p_id}>
              <td>{index + 1}</td>
              <td>{result.p_name}</td>
              <td>{result.p_phone}</td>
              <td>{result.p_website}</td>
              <td>{result.finalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>
    </div>
  );
};

export default ResultsTable;
