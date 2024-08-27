const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001; // Choose any port you prefer

app.use(cors());
app.use(bodyParser.json());

let users = [];

// Load users from JSON file on server start
fs.readFile('users.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  users = JSON.parse(data);
});

// Save users to JSON file
function saveUsersToFile() {
  fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Users saved to file.');
  });
}

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Check if user or username already exists
  const existingUser = users.find(user => user.email === email || user.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User or username already exists' });
  }
  // Create new user
  const newUser = { username, email, password, profile: {} };
  users.push(newUser);
  saveUsersToFile();
  res.json({ success: true, message: 'User signed up successfully' });
});


// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  // Return user data
  res.json({ success: true, profile: user.profile });
});

// Update profile endpoint
app.post('/profile', (req, res) => {
  const { email, profile } = req.body;
  // Find user by email
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex === -1) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }
  // Update user profile
  users[userIndex].profile = profile;
  saveUsersToFile();
  res.json({ success: true, message: 'Profile updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});