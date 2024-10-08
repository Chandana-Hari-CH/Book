// src/components/Add.jsx
import React, { useState } from 'react';
import { Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation

function Add() {
  const [show, setShow] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    id: "", name: "", author: "", imgUrl: ""
  });
  const navigate = useNavigate(); // Hook must be used within Router

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setBookDetails({ id: "", name: "", author: "", imgUrl: "" }); // Reset form fields
  };

  const handleAdd = () => {
    const { id, name, author, imgUrl } = bookDetails;
    if (!id || !name || !author || !imgUrl) {
      alert("Please fill out all fields");
      return;
    }

    // Retrieve existing books
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Check for duplicate ID
    if (savedBooks.find(book => book.id === id)) {
      alert("Book ID already exists. Please use a unique ID.");
      return;
    }

    // Add new book
    savedBooks.push(bookDetails);
    localStorage.setItem('books', JSON.stringify(savedBooks));

    handleClose();
    alert("Book successfully added");
  };

  return (
    <div>
      <Container className="mt-4">
        <h2>Welcome to Libro-Log</h2>
        <p style={{fontWeight:'500' ,color:'darkviolet',fontSize:'20px'}} className=' '>Where Every Book Finds a Home...</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '8px',marginTop:'10px' }}>Add and manage your book collection here.</p>
          <span>
            <i className="fa-solid fa-arrow-down fa-bounce" style={{ color: '#020203',marginTop:'0',fontSize:'15px' }}></i>
          </span>
        </div>
                <Button variant="info" onClick={handleShow}>
          Add Book
        </Button>
        <Button variant="primary" className="ml-2" onClick={() => navigate('/view')}>
          View My Books
        </Button> 
      </Container>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingBookId" label="Book ID" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book ID"
              value={bookDetails.id}
              onChange={(e) => setBookDetails({ ...bookDetails, id: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingBookName" label="Book Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book Name"
              value={bookDetails.name}
              onChange={(e) => setBookDetails({ ...bookDetails, name: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingAuthor" label="Author" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Author"
              value={bookDetails.author}
              onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingImgUrl" label="Image URL" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={bookDetails.imgUrl}
              onChange={(e) => setBookDetails({ ...bookDetails, imgUrl: e.target.value })}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleAdd}>Add Book</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Add;
