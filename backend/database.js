const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite'); // Persistent storage

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS research (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS publications (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, link TEXT, description TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS teaching (id INTEGER PRIMARY KEY AUTOINCREMENT, courseName TEXT, semester TEXT, year INTEGER, university TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS certifications (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, link TEXT, image TEXT, document TEXT)');
});

module.exports = db;
