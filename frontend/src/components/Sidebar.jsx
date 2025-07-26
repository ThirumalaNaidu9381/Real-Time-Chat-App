import React from 'react';
import './Sidebar.css';

const Sidebar = ({ contacts = [] }) => {
  return (
    <div className="sidebar">
      <h3>Contacts</h3>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((user, index) => <li key={index}>{user}</li>)
        ) : (
          <li>No contacts available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
