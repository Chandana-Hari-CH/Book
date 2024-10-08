// src/components/View.jsx
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function View() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  const handleDeleteClick = (bookId) => {
    setBookToDelete(bookId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (bookToDelete !== null) {
      const updatedBooks = books.filter((book) => book.id !== bookToDelete);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      alert('Book successfully deleted.');
      setBookToDelete(null);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setBookToDelete(null);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h3>Your Book Collection</h3>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
                  <img src={book.imgUrl} alt={book.name} width="100" />
                </td>
                <td>
                 
                    <i onClick={() => handleEdit(book.id)} style={{cursor:'pointer',fontSize:'25px',color:'orange',marginRight:'30px'}} className="fas fa-edit"></i> {/* Edit Icon */}
                  
                  <i 
                    className="fas fa-trash-alt" 
                    onClick={() => handleDeleteClick(book.id)} 
                    style={{ color: '#e21212', cursor: 'pointer', fontSize: '1.5rem' }} 
                  ></i> {/* Delete Icon */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button style={{ borderRadius: '10px' }}  variant="success" onClick={() => navigate('/')}>
        Add More Books
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default View;
