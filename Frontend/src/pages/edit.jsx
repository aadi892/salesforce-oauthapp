import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    website: '',
    phone: ''
  });

  useEffect(() => {
    // Replace with actual API call to fetch account by ID
    fetch(`http://localhost:5173/api/accounts/${id}`) // Or your own backend endpoint
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.Name || '',
          rating: data.Rating || '',
          website: data.Website || '',
          phone: data.Phone || ''
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update the account
    fetch(`http://localhost:5173/api/accounts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert('Account updated successfully');
        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Update failed:', err);
        alert('Failed to update');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Rating:</label><br />
          <input name="rating" value={formData.rating} onChange={handleChange} />
        </div>
        <div>
          <label>Website:</label><br />
          <input name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label><br />
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
