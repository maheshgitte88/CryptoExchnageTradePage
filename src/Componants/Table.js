import React, { useState, useEffect } from 'react';
const Table = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

  const deleteRecord = async (id) => {
    try {
      if (id) {
        setCryptoData(prevCryptoData =>
          prevCryptoData.filter(cryptoData => cryptoData._id !== id)
        );
        console.error('Delete record Done...!');
      } else {
        console.error('Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.49.241.141:5000/api/coincurd/coins');
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = cryptoData.slice(indexOfFirstRecord, indexOfLastRecord);
  return (
    <> <table>
    <thead>
        <tr>
          <th>Coin</th>
          <th>Last</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Change (24h)</th>
          <th>Delete Row</th>
        </tr>
      </thead>
      <tbody>
        {currentRecords.map(data => (
          <tr key={data._id}>
            <td>{data.coin}</td>
            <td>{data.last}</td>
            <td>{data.open}</td>
            <td>{data.high}</td>
            <td>{data.low}</td>
            <td>{data.change24h}</td>
            <td>
              <button onClick={() => deleteRecord(data._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>        {/* Pagination */}
      {Array.from({ length: Math.ceil(cryptoData.length / recordsPerPage) }).map((_, index) => (
        <button key={index} onClick={() => setCurrentPage(index + 1)}>
          {index + 1}{"-"}
        </button>
      ))}
    </div></>
  );
};
export default Table;

// cryptoData.forEach(obj => {
//     console.log("Object:");
//     for (const key in obj) {
//       console.log(`${key}: ${obj[key]}`);
//     }
//     console.log("------");
//   });


// useEffect(() => {

//     const fetchData = async function(){
//         try {
//             const response = await fetch('http://13.49.241.141:5000/api/coincurd/coins');
//             const data = await response.json();
//             setCryptoData(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
//     fetchData();
// }, [])