const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  // Serve static files
  if (req.method === 'GET') {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  } 
  else if (req.method === 'POST' && req.url === '/api/message') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      // Just echo the message back as JSON response
      const data = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', message: `Hello, you said: ${data.message}` }));
    });
  } else {
    res.writeHead(405);
    res.end(`${req.method} not allowed`);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
