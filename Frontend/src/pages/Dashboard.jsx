import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');
  const instanceUrl = searchParams.get('instance_url');

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (accessToken && instanceUrl) {
      fetchAccounts();
    }
  }, [accessToken, instanceUrl]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('https://salesforce-backend-5mbb.onrender.com/api/accounts', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Instance: instanceUrl,
        },
      });
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`, {
      state: {
        accessToken,
        instanceUrl
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Salesforce Accounts</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#0070d2',
            color: 'white',
            border: 'none',
            margin: '15px',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease',
          }}
        >
          Logout
        </button>
      </div>

      <div className="account-list">
        {accounts.length === 0 ? (
          <p>No accounts found.</p>
        ) : (
          accounts.map((acc) => (
            <div
              key={acc.Id}
              className="account-card"
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                background: '#f9f9f9',
              }}
            >
              <strong>{acc.Name}</strong>
              <p>Rating: {acc.Rating || '—'}</p>
              <p>Website: {acc.Website || '—'}</p>
              <p>Phone: {acc.Phone || '—'}</p>

              <button
                onClick={() => handleEdit(acc.Id)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#ffc107',
                  color: '#000',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
