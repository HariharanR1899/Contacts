"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/contacts");
      const sortedContacts = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedContacts);
      setFilteredContacts(sortedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) || contact.phone.includes(query)
    );
    setFilteredContacts(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredContacts(contacts);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", address: "", phone: "" });
    setShowModal(false);
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setFormData({ name: contact.name, address: contact.address, phone: contact.phone });
    setShowModal(true);
  };

  const handleNewContact = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      try {
        await axios.put(`http://localhost:5001/contacts/${editingId}`, formData);
        resetForm();
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:5001/contacts", formData);
        resetForm();
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    }
    fetchContacts();
  };

  const confirmDelete = (contactId) => {
    setDeleteId(contactId);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:5001/contacts/${deleteId}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deleteId));
      setFilteredContacts((prevFiltered) => prevFiltered.filter((contact) => contact.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="contacts-container">
        <div className="contacts-header">
          <h2><div className="contact-book-icon">
        <i className="fas fa-address-book"></i>
      </div> Contacts</h2>     
          <div className="button-container">
            <button className="primary-btn" onClick={handleNewContact}>+ New</button>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
          </div>
        </div>

        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Name or Phone..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && <i className="fas fa-times clear-icon" onClick={clearSearch}></i>}
        </div>

        <div className="contacts-list">
          {filteredContacts.length === 0 ? (
            <div className="no-contacts">
              {contacts.length === 0 ? "No Contacts" : "Contact Not Found"}
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact-item ${expandedId === contact.id ? "expanded" : ""}`}
                onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
              >
                <div className="contact-header">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-icons">
                    <i className="fas fa-edit edit-icon" onClick={(e) => { e.stopPropagation(); handleEdit(contact); }}></i>
                    <i className="fas fa-trash delete-icon" onClick={(e) => { e.stopPropagation(); confirmDelete(contact.id); }}></i>
                  </div>
                </div>

                {expandedId === contact.id && (
                  <div className="contact-details">
                    <p><strong>Address:</strong> {contact.address}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Contact  */}
      {showModal && (
        <div className="modal">
          <h2>{editingId ? "Edit Contact" : "New Contact"}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />

            <div className="form-buttons">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="modal">
          <p>Are you sure you want to delete this contact?</p>
          <div className="modal-buttons">
            <button className="delete-btn" onClick={handleDelete}>Yes, Delete</button>
            <button className="cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}