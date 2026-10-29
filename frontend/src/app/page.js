
'use client';

import React, { useEffect, useState } from 'react';

const teams = [
  { abbrev: 'ANA', name: 'Anaheim Ducks', primary: '#B9975B', secondary: '#F95621' },
  { abbrev: 'BOS', name: 'Boston Bruins', primary: '#000000', secondary: '#FFB81C' },
  { abbrev: 'BUF', name: 'Buffalo Sabres', primary: '#003087', secondary: '#FCB514' },
  { abbrev: 'CGY', name: 'Calgary Flames', primary: '#D2001C', secondary: '#FAAF19' },
  { abbrev: 'CAR', name: 'Carolina Hurricanes', primary: '#CC0000', secondary: '#FFFFFF' },
  { abbrev: 'CHI', name: 'Chicago Blackhawks', primary: '#CF0A2C', secondary: '#FFFFFF' },
  { abbrev: 'COL', name: 'Colorado Avalanche', primary: '#6F263D', secondary: '#236192' },
  { abbrev: 'CBJ', name: 'Columbus Blue Jackets', primary: '#002654', secondary: '#CE1126' },
  { abbrev: 'DAL', name: 'Dallas Stars', primary: '#00843D', secondary: '#8F8F8C' },
  { abbrev: 'DET', name: 'Detroit Red Wings', primary: '#CE1126', secondary: '#FFFFFF' },
  { abbrev: 'EDM', name: 'Edmonton Oilers', primary: '#041E42', secondary: '#FF4C00' },
  { abbrev: 'FLA', name: 'Florida Panthers', primary: '#041E42', secondary: '#C8102E' },
  { abbrev: 'LAK', name: 'Los Angeles Kings', primary: '#A2AAAD', secondary: '#FFFFFF' },
  { abbrev: 'MIN', name: 'Minnesota Wild', primary: '#154734', secondary: '#A6192E' },
  { abbrev: 'MTL', name: 'Montreal Canadiens', primary: '#AF1E2D', secondary: '#192168' },
  { abbrev: 'NSH', name: 'Nashville Predators', primary: '#FFB81C', secondary: '#041E42' },
  { abbrev: 'NJD', name: 'New Jersey Devils', primary: '#CE1126', secondary: '#FFFFFF' },
  { abbrev: 'NYI', name: 'New York Islanders', primary: '#00539B', secondary: '#F47D30' },
  { abbrev: 'NYR', name: 'New York Rangers', primary: '#0038A8', secondary: '#CE1126' },
  { abbrev: 'OTT', name: 'Ottawa Senators', primary: '#C52032', secondary: '#C2912C' },
  { abbrev: 'PHI', name: 'Philadelphia Flyers', primary: '#F74902', secondary: '#FFFFFF' },
  { abbrev: 'PIT', name: 'Pittsburgh Penguins', primary: '#FCB514', secondary: '#FFFFFF' },
  { abbrev: 'SJS', name: 'San Jose Sharks', primary: '#006D75', secondary: '#EA7200' },
  { abbrev: 'SEA', name: 'Seattle Kraken', primary: '#99D9D9', secondary: '#E31837' },
  { abbrev: 'STL', name: 'St. Louis Blues', primary: '#002F87', secondary: '#FCB514' },
  { abbrev: 'TBL', name: 'Tampa Bay Lightning', primary: '#002868', secondary: '#FFFFFF' },
  { abbrev: 'TOR', name: 'Toronto Maple Leafs', primary: '#003E7E', secondary: '#FFFFFF' },
  { abbrev: 'UTA', name: 'Utah Mammoth', primary: '#69B3E7', secondary: '#FFFFFF' },
  { abbrev: 'VAN', name: 'Vancouver Canucks', primary: '#00843D', secondary: '#0476AB' },
  { abbrev: 'VGK', name: 'Vegas Golden Knights', primary: '#B4975A', secondary: '#333F48' },
  { abbrev: 'WSH', name: 'Washington Capitals', primary: '#C8102E', secondary: '#041E42' },
  { abbrev: 'WPG', name: 'Winnipeg Jets', primary: '#041E42', secondary: '#AC162C' },
];

function getContrastColor(hex) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? '#111827' : '#FFFFFF';
}

function TeamTransition({ team, onDone }) {
  return (
    <>
      <div
        className="team-transition"
        onAnimationEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.animationName === 'screenFadeOut'
          ) {
            onDone();
          }
        }}
      >
        <img
          className="team-transition-logo"
          src={`https://assets.nhle.com/logos/nhl/svg/${team.abbrev}_light.svg`}
          alt={`${team.name} logo`}
        />
        <h1 className="team-transition-name">{team.name}</h1>
      </div>

      <style jsx global>{`
        .team-transition {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 18px;
          background: #080a0f;
          animation: screenFadeOut 0.55s ease-in 2.7s forwards;
          pointer-events: auto;
        }

        .team-transition-logo {
          width: min(72vw, 72vh);
          height: min(72vw, 72vh);
          object-fit: contain;
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.12));
          animation: logoEntrance 3.25s ease-in-out forwards;
        }

        .team-transition-name {
          margin: 0;
          color: #f8fafc;
          font-size: clamp(1rem, 3vw, 1.8rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-align: center;
          text-transform: uppercase;
          animation: nameFade 0.5s ease-out 0.35s both;
        }

        @keyframes logoEntrance {
          0% {
            transform: scale(0.2) rotate(-25deg);
            opacity: 0;
          }
          12% {
            transform: scale(1) rotate(12deg);
            opacity: 1;
          }
          25% {
            transform: scale(1.08) rotate(-12deg);
            opacity: 1;
          }
          38% {
            transform: scale(1) rotate(10deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.08) rotate(-7deg);
            opacity: 1;
          }
          65% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
          82% {
            transform: scale(1.05) rotate(540deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.55) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes nameFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes screenFadeOut {
          from {
            opacity: 1;
            visibility: visible;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes statsFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .team-transition-logo {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('results');
  const [selectedTeam, setSelectedTeam] = useState('PIT');
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [teamTransition, setTeamTransition] = useState(true);

  const team =
    teams.find((item) => item.abbrev === selectedTeam) || teams[21];

  const theme = {
    primary: team.primary,
    secondary: team.secondary,
    primaryText: getContrastColor(team.primary),
    background: '#080A0F',
    card: '#151922',
    cardInner: '#1C222D',
    border: '#303846',
    muted: '#AAB4C3',
    text: '#F8FAFC',
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTeamData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/teams/${selectedTeam}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }

        const data = await response.json();
        setGameData(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching team data:', err);
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTeamData();
    return () => controller.abort();
  }, [selectedTeam, retryCount]);

  const pageStyle = {
    backgroundColor: theme.background,
    color: theme.text,
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: '10px',
    padding: '20px',
  };

  const buttonStyle = (isActive) => ({
    padding: '10px 16px',
    borderRadius: '8px',
    border: `1px solid ${isActive ? theme.primary : theme.border}`,
    borderBottom: isActive
      ? `3px solid ${theme.secondary}`
      : `1px solid ${theme.border}`,
    background: isActive ? theme.primary : theme.cardInner,
    color: isActive ? theme.primaryText : theme.text,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  });

  const gamesList = gameData?.rawNhlData?.games || [];

  const completedGames = gamesList.filter((game) => {
    const isFinished =
      game.gameState === 'FINAL' || game.gameState === 'OFF';

    const hasScores =
      game.homeTeam?.score != null &&
      game.awayTeam?.score != null;

    const isTeamGame =
      game.homeTeam?.abbrev === selectedTeam ||
      game.awayTeam?.abbrev === selectedTeam;

    return isFinished && hasScores && isTeamGame && game.gameType === 2;
  });

  const record = completedGames.reduce(
    (acc, game) => {
      const isHome = game.homeTeam?.abbrev === selectedTeam;
      const teamScore = isHome ? game.homeTeam.score : game.awayTeam.score;
      const opponentScore = isHome ? game.awayTeam.score : game.homeTeam.score;

      if (teamScore > opponentScore) {
        acc.wins += 1;
      } else {
        const isOT =
          game.periodDescriptor?.periodType === 'OT' ||
          game.periodDescriptor?.periodType === 'SO';

        if (isOT) {
          acc.otLosses += 1;
        } else {
          acc.losses += 1;
        }
      }

      return acc;
    },
    { wins: 0, losses: 0, otLosses: 0 }
  );

  const points = record.wins * 2 + record.otLosses;
  const recentGames = [...completedGames].slice(-10).reverse();

  const upcomingGames = gamesList
    .filter((game) => {
      const isTeamGame =
        game.homeTeam?.abbrev === selectedTeam ||
        game.awayTeam?.abbrev === selectedTeam;

      const isUpcoming =
        game.gameState === 'FUT' || game.gameState === 'PRE';

      return isTeamGame && game.gameType === 2 && isUpcoming;
    })
    .sort((a, b) => a.gameDate.localeCompare(b.gameDate))
    .slice(0, 10);

  return (
    <main style={pageStyle}>
      {teamTransition && (
        <TeamTransition
          key={team.abbrev}
          team={team}
          onDone={() => setTeamTransition(false)}
        />
      )}

      {loading ? (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              ...cardStyle,
              borderTop: `4px solid ${theme.secondary}`,
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: theme.primary, fontWeight: '600' }}>
              Loading {selectedTeam} Analytics Hub...
            </h2>
          </div>
        </div>
      ) : error ? (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              ...cardStyle,
              borderTop: `4px solid ${theme.secondary}`,
              textAlign: 'center',
              maxWidth: '450px',
              width: '100%',
            }}
          >
            <h2 style={{ color: '#FF6B6B', fontSize: '1.8rem' }}>
              Connection Error
            </h2>
            <p style={{ color: theme.muted }}>{error}</p>
            <p style={{ color: theme.muted, fontSize: '0.85rem' }}>
              Verify your Express backend is running on port 5001.
            </p>
            <button
              onClick={() => setRetryCount((count) => count + 1)}
              style={buttonStyle(true)}
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            animation: teamTransition
              ? 'none'
              : 'statsFadeIn 0.45s ease-out',
          }}
        >
          {/* Team header */}
          <header
            style={{
              background: theme.primary,
              color: theme.primaryText,
              border: `1px solid ${theme.secondary}`,
              borderRadius: '12px',
              padding: '28px',
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <h1
                style={{
                  color: theme.primaryText,
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  margin: '0 0 8px',
                  letterSpacing: '-0.02em',
                }}
              >
                {team.name}
              </h1>
              <p
                style={{
                  color: theme.primaryText,
                  opacity: 0.85,
                  fontSize: '0.9rem',
                  margin: 0,
                }}
              >
                <span style={{ color: theme.secondary }}>●</span>{' '}
                2026–27 Live NHL Season Analytics Hub
              </p>
            </div>

            <span
              style={{
                background: 'rgba(0,0,0,0.2)',
                color: theme.primaryText,
                border: `1px solid ${theme.secondary}`,
                padding: '7px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Connected • Port 5001
            </span>
          </header>

          {/* Team selector */}
          <div style={{ marginBottom: '30px' }}>
            <label
              htmlFor="team-select"
              style={{
                display: 'block',
                color: theme.text,
                fontSize: '0.8rem',
                fontWeight: '700',
                marginBottom: '8px',
              }}
            >
              SELECT NHL TEAM
            </label>

            <select
              id="team-select"
              value={selectedTeam}
              onChange={(e) => {
                const nextTeam = e.target.value;
                if (nextTeam === selectedTeam) return;

                setTeamTransition(true);
                setSelectedTeam(nextTeam);
              }}
              style={{
                background: theme.card,
                color: theme.text,
                border: `1px solid ${theme.border}`,
                borderLeft: `4px solid ${theme.secondary}`,
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '15px',
                maxWidth: '100%',
              }}
            >
              {teams.map((item) => (
                <option
                  key={item.abbrev}
                  value={item.abbrev}
                  style={{ background: '#151922', color: '#FFFFFF' }}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Summary statistics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '30px',
            }}
          >
            {[
              {
                label: 'Record (W-L-OTL)',
                value: `${record.wins}-${record.losses}-${record.otLosses}`,
              },
              {
                label: 'Standings Points',
                value: `${points} PTS`,
              },
              {
                label: 'Games Played',
                value: completedGames.length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  ...cardStyle,
                  background: theme.primary,
                  color: theme.primaryText,
                  border: `1px solid ${theme.secondary}`,
                  borderTop: `4px solid ${theme.secondary}`,
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    color: theme.primaryText,
                    opacity: 0.8,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 8px',
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    color: theme.primaryText,
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Game log */}
          <section
            style={{
              ...cardStyle,
              borderRadius: '12px',
              padding: '25px',
              borderTop: `3px solid ${theme.secondary}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('results')}
                  style={buttonStyle(activeTab === 'results')}
                >
                  Recent Results
                </button>

                <button
                  onClick={() => setActiveTab('upcoming')}
                  style={buttonStyle(activeTab === 'upcoming')}
                >
                  Upcoming Games
                </button>
              </div>

              <span style={{ color: theme.muted, fontSize: '0.85rem' }}>
                {activeTab === 'results'
                  ? `Showing last ${recentGames.length} games`
                  : `${upcomingGames.length} upcoming games`}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {activeTab === 'results' ? (
                recentGames.length > 0 ? (
                  recentGames.map((game, index) => {
                    const isHome = game.homeTeam?.abbrev === selectedTeam;
                    const teamScore = isHome
                      ? game.homeTeam.score
                      : game.awayTeam.score;
                    const opponentScore = isHome
                      ? game.awayTeam.score
                      : game.homeTeam.score;
                    const opponent = isHome
                      ? game.awayTeam.abbrev
                      : game.homeTeam.abbrev;

                    const won = teamScore > opponentScore;
                    const lostInOT =
                      !won &&
                      ['OT', 'SO'].includes(
                        game.periodDescriptor?.periodType
                      );

                    const result = won ? 'W' : lostInOT ? 'OTL' : 'L';
                    const resultColor = won
                      ? '#2ECC71'
                      : lostInOT
                      ? theme.secondary
                      : '#FF6B6B';

                    return (
                      <div
                        key={game.id ?? index}
                        style={{
                          background: theme.cardInner,
                          border: `1px solid ${theme.border}`,
                          borderLeft: `4px solid ${theme.primary}`,
                          borderRadius: '8px',
                          padding: '14px 18px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '15px',
                        }}
                      >
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontWeight: '600',
                              color: theme.text,
                            }}
                          >
                            {isHome ? 'vs' : '@'} {opponent}
                          </p>
                          <p
                            style={{
                              margin: '4px 0 0',
                              fontSize: '0.8rem',
                              color: theme.muted,
                            }}
                          >
                            {game.gameDate}
                          </p>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              color: theme.text,
                            }}
                          >
                            {teamScore} - {opponentScore}
                          </p>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              color: resultColor,
                            }}
                          >
                            {result}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    style={{
                      color: theme.muted,
                      textAlign: 'center',
                      padding: '25px',
                    }}
                  >
                    No completed games found.
                  </p>
                )
              ) : upcomingGames.length > 0 ? (
                upcomingGames.map((game, index) => {
                  const isHome = game.homeTeam?.abbrev === selectedTeam;
                  const opponent = isHome
                    ? game.awayTeam?.abbrev
                    : game.homeTeam?.abbrev;

                  return (
                    <div
                      key={game.id ?? index}
                      style={{
                        background: theme.cardInner,
                        border: `1px solid ${theme.border}`,
                        borderLeft: `4px solid ${theme.secondary}`,
                        borderRadius: '8px',
                        padding: '18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: '600',
                            color: theme.text,
                          }}
                        >
                          {isHome ? 'vs' : '@'} {opponent}
                        </p>
                        <p
                          style={{
                            margin: '5px 0 0',
                            fontSize: '0.85rem',
                            color: theme.muted,
                          }}
                        >
                          {game.gameDate}
                        </p>
                      </div>

                      <span
                        style={{
                          color: theme.secondary,
                          fontSize: '0.8rem',
                          fontWeight: '700',
                        }}
                      >
                        {isHome ? 'HOME' : 'AWAY'}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p
                  style={{
                    color: theme.muted,
                    textAlign: 'center',
                    padding: '25px',
                  }}
                >
                  No upcoming regular-season games found in the available
                  schedule.
                </p>
              )}
            </div>
          </section>

          <footer
            style={{
              color: '#AAB4C3',
              fontSize: '0.75rem',
              textAlign: 'center',
              marginTop: '25px',
            }}
          >
            NHL Analytics • Data provided by the NHL API
          </footer>
        </div>
      )}
    </main>
  );
}
