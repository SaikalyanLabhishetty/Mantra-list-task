import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Editing an existing item
      const newData = [...data];
      newData[editingIndex] = formData;
      setData(newData);
      setEditingIndex(null);
    } else {
      // Adding a new item
      setData([...data, formData]);
    }

    setFormData({ title: '', date: '', description: '' });
  };

  const handleEdit = (index) => {
    // Set the form data to the selected item for editing
    setFormData(data[index]);
    setSelectedDay(getDayOfWeek(data[index].date));
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const getDayOfWeek = (date) => {
    const dayIndex = new Date(date).getDay();
    return DaysOfWeek[dayIndex];
  };

  const DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
    setSelectedDay(getDayOfWeek(e.target.value));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterByDate = (item) => {
    if (!startDate || !endDate) return true; // No date filter applied

    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return itemDate >= start && itemDate <= end;
  };

  const handleResetDates = () => {
    setStartDate('');
    setEndDate('');
    setFormData({ ...formData, date: '' });
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder='title' required />
        </label>
        <label>
          <input type="date" name="date" value={formData.date} onChange={handleDateChange} required /> <br/>
        </label>
        <label>
          <input type="text" name="description" value={formData.description} onChange={handleChange}  placeholder='description' required />
        </label>
        <button type="submit">Save</button>
      </form>


      <div className='table-date'>
        <table>
          <thread>
              <div className="days-of-week">
                    {DaysOfWeek.map((day, index) => (
                      <tr>
                        <th key={index} className={selectedDay === day ? 'highlight' : ''}>
                        {day}
                        </th>
                      </tr>
                    ))}
              </div>
          </thread>
        </table>
      </div>

      <div className='filter-cards'>
        <form style={{ height: "60px", width: "530px", marginLeft: "40%" }}>
          <label>From:</label>
          <input type='date' style={{ marginLeft: "10px" }} onChange={handleStartDateChange}></input>
          <label style={{ marginLeft: "10px" }}>To:</label>
          <input type='date' style={{ marginLeft: "10px" }} onChange={handleEndDateChange}></input>
          <button type="button" onClick={handleResetDates} style={{marginLeft:"30px"}}>Reset</button>
        </form>
      </div>

      <div className='container-outer'>
        <div>
          {data
            .filter(filterByDate)
            .map((item, index) => (
              <div className='card' key={index}>
                <div className='text-container'>
                  <h2 style={{backgroundColor: "black"}}>{item.title}</h2>
                  <p  style={{backgroundColor: "black"}}>{item.description}</p>
                  <p  style={{backgroundColor: "black"}}>{new Date(item.date).toLocaleDateString()}</p>
                </div>

                <div className='button-container'>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
