# 🧪 Library Management API - Testing Guide

## 🚀 Quick Start

1. **Start MongoDB** (make sure MongoDB is running)
2. **Start the server:**
   ```bash
   npm run dev
   ```
3. **Server runs on:** `http://localhost:3000`

## 📮 **API Testing**

### **Environment Variables:**
```
BASE_URL = http://localhost:3000
```

### 📘 **Book Management APIs**

#### **1. POST /books - Add New Book**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/books`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "total_copies": 5
}
```
- **Expected Response (201):**
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "total_copies": 5,
    "available_copies": 5
  }
}
```

#### **2. GET /books - List All Books**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/books`
- **Expected Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "category": "Fiction",
      "total_copies": 5,
      "available_copies": 5
    }
  ]
}
```

#### **3. GET /books/:id - Get Book by ID**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/books/1`

#### **4. PUT /books/:id - Update Book**
- **Method:** `PUT`
- **URL:** `{{BASE_URL}}/books/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "category": "Classic Fiction",
  "total_copies": 10
}
```

#### **5. DELETE /books/:id - Delete Book**
- **Method:** `DELETE`
- **URL:** `{{BASE_URL}}/books/1`
- **Expected Response (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

### 👥 **Member Management APIs**

#### **1. POST /members - Register Member**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/members`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
- **Expected Response (201):**
```json
{
  "success": true,
  "message": "Member registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### **2. GET /members - List All Members**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/members`

#### **3. GET /members/:id - Get Member by ID**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/members/1`

### 🔄 **Borrow/Return APIs**

#### **1. POST /borrow - Borrow Book**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/borrow`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "member_id": 1,
  "book_id": 1
}
```
- **Expected Response (201):**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": 1,
    "book_id": 1,
    "member_id": 1,
    "borrow_date": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **2. POST /return - Return Book**
- **Method:** `POST`
- **URL:** `{{BASE_URL}}/return`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "member_id": 1,
  "book_id": 1
}
```

### 📊 **Report APIs (Optional)**

#### **1. GET /books/borrowed - Currently Borrowed Books**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/books/borrowed`

#### **2. GET /members/:id/borrowed - Member's Borrowed Books**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/members/1/borrowed`

#### **3. GET /overdue - Overdue Books**
- **Method:** `GET`
- **URL:** `{{BASE_URL}}/overdue`

## 🧪 **Basic Test Workflow**

### **Step-by-Step Testing:**

1. **Add a Book:**
   ```bash
   curl -X POST http://localhost:3000/books \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Book", "author": "Test Author", "category": "Fiction", "total_copies": 3}'
   ```

2. **Add a Member:**
   ```bash
   curl -X POST http://localhost:3000/members \
     -H "Content-Type: application/json" \
     -d '{"name": "Test User", "email": "test@example.com"}'
   ```

3. **Borrow the Book:**
   ```bash
   curl -X POST http://localhost:3000/borrow \
     -H "Content-Type: application/json" \
     -d '{"member_id": 1, "book_id": 1}'
   ```

4. **Return the Book:**
   ```bash
   curl -X POST http://localhost:3000/return \
     -H "Content-Type: application/json" \
     -d '{"member_id": 1, "book_id": 1}'
   ```

## ✅ **Success Criteria**

- All endpoints return 200/201 for successful operations
- All endpoints return 400 for validation errors
- All endpoints return 404 for not found
- **Integer ID fields** are included in all responses
- Book availability is tracked correctly
- Borrow/return functionality works as expected

## 📝 **Important Notes**

- **Use INTEGER IDs** (1, 2, 3, etc.) not MongoDB ObjectIds
- Replace `1` with actual integer IDs from API responses
- All foreign key relationships use integer IDs
- Book availability automatically updates on borrow/return

---

**Happy Testing! 🚀**
