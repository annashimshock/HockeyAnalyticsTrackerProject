const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

// Endpoint to fetch live scores or schedule tailored for the Penguins
app.get('/api/penguins-live', async (req, res) => {
    try {
        const response = await fetch('https://api-web.nhle.com/v1/score/now');
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch live NHL data' });
    }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));