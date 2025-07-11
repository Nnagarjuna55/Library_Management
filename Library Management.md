# 📚 Library Management API

## Overview

Design and implement a backend REST API to manage a simple Library System. The API should allow:
- Managing books (add, update, delete, list)
- Managing library members
- Borrowing and returning books
- Tracking which books are available or currently borrowed

This is a **backend-only** assignment. No frontend/UI is required.

---

## 🛠️ Tech Stack (Recommended)

- Language: Python / Node.js / Java / Go
- Framework: **Flask** / **FastAPI** / **Express.js** / Django REST Framework
- Database: SQLite / PostgreSQL / MongoDB
- Authentication: Optional (basic token or mock session)

---

## ✅ Requirements

### 1. 📘 Book Management
- `POST /books`: Add a new book (title, author, category, total copies)
- `GET /books`: List all books with availability status
- `GET /books/:id`: Get details of a specific book
- `PUT /books/:id`: Update book details
- `DELETE /books/:id`: Delete a book

### 2. 👥 Member Management
- `POST /members`: Register a new member (name, email)
- `GET /members`: List all members
- `GET /members/:id`: Get details of a specific member

### 3. 🔄 Borrow / Return Flow
- `POST /borrow`: Borrow a book  
  **Input**: `member_id`, `book_id`  
  **Condition**: Only if copies available  
- `POST /return`: Return a borrowed book  
  **Input**: `member_id`, `book_id`

### 4. 📊 Reports (Optional but encouraged)
- `GET /books/borrowed`: List all currently borrowed books
- `GET /members/:id/borrowed`: List books borrowed by a specific member
- `GET /overdue`: List all books not returned after 14 days (bonus)

---

## 🧱 Database Models (Suggested)

### Book
- `id` (int, PK)
- `title` (string)
- `author` (string)
- `category` (string)
- `total_copies` (int)
- `available_copies` (int)

### Member
- `id` (int, PK)
- `name` (string)
- `email` (string, unique)

### BorrowedBook
- `id` (int, PK)
- `book_id` (FK)
- `member_id` (FK)
- `borrow_date` (date)
- `return_date` (nullable)

---

## 🧪 Testing

You're encouraged to:
- Use tools like Postman or curl to test endpoints
- Write unit tests using `pytest`, `unittest`, or any equivalent framework

---

## 🚀 Bonus Features

Optional features you can implement to go the extra mile:
- Track borrowing history
- Add basic auth or token-based access
- Email reminder (mock) for due returns
- Pagination and filtering for `/books` or `/members`

---

## 📁 Deliverables

- Source code in a GitHub repo
- `README.md` with:
  - Setup instructions
  - API documentation or Postman collection
  - Sample curl or HTTP request examples
- A short demo video (3–5 minutes) explaining:
  - How the app works (via Postman or curl)
  - Key features implemented
  -  Folder/project structure (briefly)
---

All deliverables (code, README, demo video) should be submitted by the end of **20st July 2025** 

---

## 💬 Questions?

If anything is unclear, feel free to ask your mentor or reviewer for clarification.

Happy coding! 🚀
