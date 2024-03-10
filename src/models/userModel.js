function addUser(email, password) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (email, PASSWORD) VALUES (?, ?)";
      con.query(query, [email, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  module.exports = { addUser };