const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4002;

// Stop running node in docker with Ctrl+C sends the SIGINT signal.
// Usage: docker run --init -p <host_port>:<container_port> <image_name:version>
const process = require('process');
process.on('SIGINT', () => {
    console.info("Interrupted")
    process.exit(0);
});


//add other middleware
// Note: `app.use(..., express.static(...))` cannot be placed before `app.use(cors())`
app.use(cors({ origin: '*' }));

app.use('/', express.static('dist-api'));

app.get('/', function (req, res) {
    const homepage = path.join(__dirname, './dist-api/index.html');
    res.sendFile(homepage);
});

app.listen(port, () => console.log(`Frontend service listening on port: ${port}, access http://localhost:${port} in the web browser`));

