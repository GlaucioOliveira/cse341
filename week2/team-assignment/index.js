const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/professional' && req.method === 'GET') {
      const filePath = path.join(__dirname, 'professionals.json'); // Path to the JSON file
  
      // Read the JSON file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error reading data file');
        } else {
          // Set the response headers
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data); // Send the JSON data as response
        }
      });
    } else {
      // Handle 404 for other paths
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
