const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve public & uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
const uploadRoutes = require('./routes/upload');

app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2>Upload an Image</h2>
    <form action="/api/upload" method="POST" enctype="multipart/form-data">
      <input 
        type="file" 
        name="image" 
        multiple 
        required 
      />
      <button type="submit">Upload</button>
    </form>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
