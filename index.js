const express = require('express')
const dotenv = require('dotenv')
const app = express();
app.use(express.json());
require('./database/connect')
app.use(require('./routes/route'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
