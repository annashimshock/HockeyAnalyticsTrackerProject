'use client';

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/penguins-live")
      .then((res) => {
        if(!res.ok)
          throw new Error("Failed to connect to backend server");
        return res.json();
      })
      .then((data) => {
        setGameData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if(loading) {
    return (
      <main style={{ backgroundColor: '#111', color: '#fcb514', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
        <h2>Loading Pittsburgh Penguins Hub...</h2>
      </main>
    );
  }

  if(error) {
    return (
      <main style={{ backgroundColor: '#111', color: '#ff4d4d', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
        <h2>Connection Error: {error}</h2>
        <p>Make sure your backend server is running on port 5001!</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #fcb514', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#fcb514', fontSize: '2.5rem', margin: 0 }}>
          {gameData.team} ({gameData.abbrev}) Analytics Hub
        </h1>
        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '5px' }}>Live Backend Connected • Port 5001</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', maxWidth: '1000px' }}>
        
        {/* Live Game Scorecard */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '10px', border: '1px solid #333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ background: 'rgba(252, 181, 20, 0.1)', color: '#fcb514', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {gameData.liveGame.gameState}
            </span>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>
              Period {gameData.liveGame.period} • {gameData.liveGame.timeRemaining}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '25px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#fcb514', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{gameData.abbrev}</p>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{gameData.liveGame.score.penguins}</p>
            </div>
            <span style={{ color: '#555', fontSize: '1.5rem', fontWeight: 'bold' }}>VS</span>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#888', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{gameData.liveGame.opponent}</p>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{gameData.liveGame.score.opponent}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #333', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.85rem' }}>
            <span>Shots: PIT {gameData.liveGame.shotsOnGoal.penguins} - {gameData.liveGame.shotsOnGoal.opponent} {gameData.liveGame.opponent}</span>
            <span>Record: {gameData.record.wins}-{gameData.record.losses}-{gameData.record.otLosses}</span>
          </div>
        </div>

        {/* Top Scorers Card */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '10px', border: '1px solid #333', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <h2 style={{ color: '#fcb514', marginTop: 0, fontSize: '1.25rem', marginBottom: '20px' }}>Top Scorers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {gameData.topScorers.map((player, index) => (
              <div key={index} style={{ background: '#000', padding: '12px 15px', borderRadius: '6px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{player.name}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#888' }}>Position: {player.position}</p>
                </div>
                <span style={{ color: '#fcb514', fontWeight: 'bold', fontSize: '1.1rem' }}>{player.points} PTS</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}