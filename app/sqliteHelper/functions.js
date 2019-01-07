

module.exports = {
  createTest: function(){ 
    const sql = `
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT`
      return sql;
  },
  
  addToTest: function(name, description) {
    return (
      `INSERT INTO test (name, description)
        VALUES (?, ?)`,
      [name, description]);
  },
  
  selectFromTest: function() {
    const sql = `SELECT name, description FROM test`
    return sql;
  }
}