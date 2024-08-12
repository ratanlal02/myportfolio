const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./database'); // Import the database

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Research endpoints
app.get('/api/research', (req, res) => {
  db.all('SELECT * FROM research', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching research data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/research/latest', (req, res) => {
  db.all('SELECT * FROM research ORDER BY id DESC LIMIT 3', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching research data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/research/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM research WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching research data' });
    } else if (!row) {
      res.status(404).json({ message: 'Research not found' });
    } else {
      res.json(row);
    }
  });
});

app.post('/api/research', (req, res) => {
  const { title, description } = req.body;
  db.run('INSERT INTO research (title, description) VALUES (?, ?)', [title, description], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error creating new research' });
    } else {
      res.status(201).json({ id: this.lastID, title, description });
    }
  });
});

app.put('/api/research/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.run('UPDATE research SET title = ?, description = ? WHERE id = ?', [title, description, id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error updating research' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Research not found' });
    } else {
      res.json({ id, title, description });
    }
  });
});

app.delete('/api/research/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM research WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error deleting research' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Research not found' });
    } else {
      res.json({ message: 'Research deleted' });
    }
  });
});

// Publications endpoints
app.get('/api/publications', (req, res) => {
  db.all('SELECT * FROM publications', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching publications' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/publications/latest', (req, res) => {
  db.all('SELECT * FROM publications ORDER BY id DESC LIMIT 3', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching publications' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/publications/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM publications WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching publication' });
    } else if (!row) {
      res.status(404).json({ message: 'Publication not found' });
    } else {
      res.json(row);
    }
  });
});

app.post('/api/publications', (req, res) => {
  const { title, link, description } = req.body;
  db.run('INSERT INTO publications (title, link, description) VALUES (?, ?, ?)', [title, link, description], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error creating new publication' });
    } else {
      res.status(201).json({ id: this.lastID, title, link, description });
    }
  });
});

app.put('/api/publications/:id', (req, res) => {
  const { id } = req.params;
  const { title, link, description } = req.body;
  db.run('UPDATE publications SET title = ?, link = ?, description = ? WHERE id = ?', [title, link, description, id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error updating publication' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Publication not found' });
    } else {
      res.json({ id, title, link, description });
    }
  });
});

app.delete('/api/publications/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM publications WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error deleting publication' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Publication not found' });
    } else {
      res.json({ message: 'Publication deleted' });
    }
  });
});

// Teaching endpoints
app.get('/api/teaching', (req, res) => {
  db.all('SELECT * FROM teaching', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching teaching data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/teaching/latest', (req, res) => {
  db.all('SELECT * FROM teaching ORDER BY id DESC LIMIT 3', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching teaching data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/teaching/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM teaching WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching teaching data' });
    } else if (!row) {
      res.status(404).json({ message: 'Teaching entry not found' });
    } else {
      res.json(row);
    }
  });
});

app.post('/api/teaching', (req, res) => {
  const { courseName, semester, year, university } = req.body;
  db.run('INSERT INTO teaching (courseName, semester, year, university) VALUES (?, ?, ?, ?)', [courseName, semester, year, university], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error creating new teaching entry' });
    } else {
      res.status(201).json({ id: this.lastID, courseName, semester, year, university });
    }
  });
});

app.put('/api/teaching/:id', (req, res) => {
  const { id } = req.params;
  const { courseName, semester, year, university } = req.body;
  db.run('UPDATE teaching SET courseName = ?, semester = ?, year = ?, university = ? WHERE id = ?', [courseName, semester, year, university, id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error updating teaching entry' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Teaching entry not found' });
    } else {
      res.json({ id, courseName, semester, year, university });
    }
  });
});

app.delete('/api/teaching/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM teaching WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error deleting teaching entry' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Teaching entry not found' });
    } else {
      res.json({ message: 'Teaching entry deleted' });
    }
  });
});

// Certifications endpoints
app.get('/api/certifications', (req, res) => {
  db.all('SELECT * FROM certifications', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching certifications' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/certifications/latest', (req, res) => {
  db.all('SELECT * FROM certifications ORDER BY id DESC LIMIT 3', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching certifications' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/certifications/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM certifications WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching certification' });
    } else if (!row) {
      res.status(404).json({ message: 'Certification not found' });
    } else {
      res.json(row);
    }
  });
});

app.post('/api/certifications', (req, res) => {
  const { title, description } = req.body;
  db.run('INSERT INTO certifications (title, description) VALUES (?, ?)', [title, description], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error creating new certification' });
    } else {
      res.status(201).json({ id: this.lastID, title, description });
    }
  });
});

app.put('/api/certifications/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.run('UPDATE certifications SET title = ?, description = ? WHERE id = ?', [title, description, id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error updating certification' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Certification not found' });
    } else {
      res.json({ id, title, description });
    }
  });
});

app.delete('/api/certifications/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM certifications WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error deleting certification' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Certification not found' });
    } else {
      res.json({ message: 'Certification deleted' });
    }
  });
});


app.get('/api/news', (req, res) => {
  db.all('SELECT * FROM news', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching news data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/news/latest', (req, res) => {
  db.all('SELECT * FROM news ORDER BY id DESC LIMIT 3', [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching latest news data' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/news/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM news WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching news data' });
    } else if (!row) {
      res.status(404).json({ message: 'News not found' });
    } else {
      res.json(row);
    }
  });
});

app.post('/api/news', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }]), (req, res) => {
  const { title, link } = req.body;
  const image = req.files['image'] ? req.files['image'][0].filename : null;
  const document = req.files['document'] ? req.files['document'][0].filename : null;
  db.run('INSERT INTO news (title, link, image, document) VALUES (?, ?, ?, ?)', [title, link, image, document], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error creating new news' });
    } else {
      res.status(201).json({ id: this.lastID, title, link, image, document });
    }
  });
});

app.put('/api/news/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 1 }]), (req, res) => {
  const { id } = req.params;
  const { title, link } = req.body;
  const image = req.files['image'] ? req.files['image'][0].filename : null;
  const document = req.files['document'] ? req.files['document'][0].filename : null;
  db.run('UPDATE news SET title = ?, link = ?, image = ?, document = ? WHERE id = ?', [title, link, image, document, id], function(err) {
    if (err) {
      res.status(500).json({ message: 'Error updating news' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'News not found' });
    } else {
      res.json({ id, title, link, image, document });
    }
  });
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM news WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching news data' });
    } else if (!row) {
      res.status(404).json({ message: 'News not found' });
    } else {
      const { image, document } = row;
      db.run('DELETE FROM news WHERE id = ?', [id], function(err) {
        if (err) {
          res.status(500).json({ message: 'Error deleting news' });
        } else {
          if (image) {
            fs.unlink(path.join(__dirname, 'uploads', image), (err) => {
              if (err) console.error('Error deleting image file:', err);
            });
          }
          if (document) {
            fs.unlink(path.join(__dirname, 'uploads', document), (err) => {
              if (err) console.error('Error deleting document file:', err);
            });
          }
          res.json({ message: 'News deleted' });
        }
      });
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
