// src/components/Edit.jsx
import React, { useEffect, useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); // Get the book ID from URL
  const [bookDetails, setBookDetails] = useState({
    id: "", name: "", author: "", imgUrl: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the specific book from localStorage
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const bookToEdit = savedBooks.find((book) => book.id === id);
    if (bookToEdit) {
      setBookDetails(bookToEdit);
    } else {
      alert("Book not found!");
      navigate('/view');
    }
  }, [id, navigate]);

  const handleSave = () => {
    const { id, name, author, imgUrl } = bookDetails;
    if (!id || !name || !author || !imgUrl) {
      alert("Please fill out all fields");
      return;
    }

    // Get books from localStorage and update the book
    let savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = savedBooks.map(book =>
      book.id === id ? bookDetails : book
    );

    // Save updated books array back to localStorage
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    alert("Book details updated successfully!");
    navigate('/view'); // Redirect back to view page after editing
  };

  return (
    <Container className="mt-4">
      <h2>Edit Book Details</h2>
      <Form>
        <FloatingLabel controlId="floatingBookId" label="Book ID" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Book ID"
            value={bookDetails.id}
            disabled // Keep ID disabled during editing
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
        <Button variant="success" onClick={handleSave}>Save Changes</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/view')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default Edit;
