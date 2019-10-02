// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by username
    app.get('/users/:username', (request, response) => {
        const username = request.params.username;

        pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with USERNAME: ${result.insertusername}`);
        });
    });

    // Update an existing user
    app.put('/users/:username', (request, response) => {
        const username = request.params.username;

        pool.query('UPDATE users SET ? WHERE username = ?', [request.body, username], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:username', (request, response) => {
        const username = request.params.username;

        pool.query('DELETE FROM users WHERE username = ?', username, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
