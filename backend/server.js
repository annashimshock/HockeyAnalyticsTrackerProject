const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Live team analytics endpoint
app.get('/api/teams/:teamAbbrev', async (req, res) => {
    try {
        const teamAbbrev = req.params.teamAbbrev.toUpperCase();

        const validTeams = [
            'ANA', 'BOS', 'BUF', 'CAR', 'CBJ',
            'CGY', 'CHI', 'COL', 'DAL', 'DET',
            'EDM', 'FLA', 'LAK', 'MIN', 'MTL',
            'NJD', 'NSH', 'NYI', 'NYR', 'OTT',
            'PHI', 'PIT', 'SEA', 'SJS', 'STL',
            'TBL', 'TOR', 'UTA', 'VAN', 'VGK',
            'WPG', 'WSH'
        ]

        if(!validTeams.includes(teamAbbrev)) {
            return res.status(400).json({
                error: "Invalid NHL team abbreviation"
            });
        }

        const response = await fetch(`https://api-web.nhle.com/v1/club-schedule-season/${teamAbbrev}/now`);
        
        if (!response.ok) {
            throw new Error(`NHL API returned status ${response.status}`);
        }

        const nhlData = await response.json();

        res.json({
            team: teamAbbrev,
            abbrev: teamAbbrev,
            rawNhlData: nhlData
        });
    } catch (error) {
        console.error('Error fetching NHL data:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running live on http://localhost:${PORT}`);
});