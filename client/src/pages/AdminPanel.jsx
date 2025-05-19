import { useState, useEffect } from 'react';
import { CircularSpinner } from './../components/index.components.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const sampleData = [
  { name: 'John Doe', email: 'john@example.com', age: 30, phone: '1234567890', date: '2025-05-17' },
  { name: 'Jane Smith', email: 'jane@example.com', age: 25, phone: '9876543210', date: '2025-05-15' },
  { name: 'Alice Brown', email: 'alice@example.com', age: 28, phone: '1231231234', date: '2025-05-16' },
];

function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

export function AdminPanel( {setAuthenticated} ) {
  const [data, setData] = useState(sampleData || []);
  // const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [completed, setCompleted] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getAppointments() {
      try {
        const res = await axios.get('http://localhost:8000/api/get-appointments');
        if (res.data?.success) {
          setData(res.data?.appointments || []);
          // setFilteredData(res.data.appointments);
          setCompleted(res.data.appointments.filter(e => e.completed).map(e => e._id));
        } else {
          toast.error(res.data?.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        toast.error(err.response.data?.message || 'Error fetching appointments');
        console.error('Error fetching appointments', err);
      } finally {
        setLoading(false);
      }
    }
    getAppointments();
  }, []);


  async function onCompleteClick(id) {
    let isCompleted;
    if (completed.includes(id)) {
      setCompleted(completed.filter(e => e !== id));
      isCompleted = false;
    } else {
      setCompleted([...completed, id]);
      isCompleted = true;
    }
    try {
      let res = await axios.post('http://localhost:8000/api/update-appointment-completed', {id, isCompleted});
      // console.log("Response: ", res);
      if (!res.data?.success) {
        toast.error(res.data?.message || `Can't update appointment status`);
        console.log(`Can't update appointment status`);
        setCompleted(completed.filter(e => e !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message || 'Error updating appointment status');
    }
  }

  async function onDeleteClick(e) {
    e.preventDefault();
    const input = window.prompt('Enter number of months to delete appointments older than:');

    if (!input) return toast.error('Please enter a number of months');
    const months = Number(input);

    if (isNaN(months) || input.includes('.') || /[eE+-]/.test(input)) return toast.error('Please enter a valid whole number');
    if (months <= 0 || months > 12) return toast.error('Please enter a valid number of months');
    if(!window.confirm(`Are you sure you want to delete appointments older than ${months} months?`)) return;
    try {
      setLoading(true);
      let res = await axios.post('http://localhost:8000/api/delete-appointments', {months});
      if (res.data?.success) {
        toast.success(res.data?.message || 'Deleted previous appointments successfully');
      } else {
        toast.error(res.data?.message || 'Failed to delete previous appointments');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.message || 'Error deleting appointments');
    } finally {
      setLoading(false);
      window.location.reload()
    }
  }

  const filteredData = data
  .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.phone.toString().includes(search.toLowerCase()))
  .filter(item => {
    if (!startDate && !endDate) return true;
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : new Date('1900-01-01');
    const end = endDate ? new Date(endDate) : new Date('9999-12-31');
    return itemDate >= start && itemDate <= end;
  })
  .filter(item => {
    const isCompleted = completed.includes(item._id);
    return showCompleted ? isCompleted : !isCompleted;
  })
  .sort((a, b) => {
    const valA = sortField === 'name' ? a.name.toLowerCase() : sortField === 'age' ? a.age : new Date(a.date);
    const valB = sortField === 'name' ? b.name.toLowerCase() : sortField === 'age' ? b.age : new Date(b.date);
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });


  return (
    <>
    <div className="admin-container">

      <main className="admin-main">
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="sort-dropdown"
          >
            <option value="date">Sort by Date</option>
            <option value="age">Sort by Age</option>
            <option value="name">Sort by Name</option>
          </select>

          <button onClick={() => setSortAsc(!sortAsc)} className="sort-button">
            {sortAsc ? 'Ascending' : 'Descending'}
          </button>

        </div>

        <div className="date-filters">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button onClick={() => { setStartDate(''); setEndDate(''); }} className="reset-button">
            Reset Dates
          </button>
          
          <button onClick={() => setShowCompleted(!showCompleted)} className="toggle-completed-button">
            {showCompleted ? 'Show Pending' : 'Show Completed'}
          </button>

          <button onClick={(e) => onDeleteClick(e)} className='delete-btn'>Delete previous appointments</button>

        </div>

        {/* {console.log("Filtered Data: ", filteredData)} */}

        <table className="appointments-table">
          <thead>
            <tr>
              <th>SL. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone No.</th>
              <th>Date</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <button
                    className={`complete-btn ${completed.includes(item._id) ? 'completed' : ''}`}
                    onClick={() => onCompleteClick(item._id)}
                    title="Mark as Completed"
                  >
                    ✓
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    {loading && (
      <div className="loading-overlay">
        <CircularSpinner />
      </div>
    )}
    </>
  );
}
