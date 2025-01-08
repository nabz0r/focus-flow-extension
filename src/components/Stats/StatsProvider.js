import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../../db/auth';
import { SessionRepository } from '../../db/repositories/sessions';
import { StatsRepository } from '../../db/repositories/stats';

const StatsContext = createContext(null);

export const useStats = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [timeRange, setTimeRange] = useState('week');

  const auth = new AuthService();
  const [repositories, setRepositories] = useState({
    sessions: null,
    stats: null
  });

  // Initialize repositories when auth state changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await auth.init();
        if (user) {
          setRepositories({
            sessions: new SessionRepository(user.uid),
            stats: new StatsRepository(user.uid)
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };

    initializeAuth();
  }, []);

  // Load data when repositories or time range changes
  useEffect(() => {
    const loadData = async () => {
      if (!repositories.sessions || !repositories.stats) return;

      setLoading(true);
      try {
        const [startDate, endDate] = getDateRange(timeRange);
        const sessionsData = await repositories.sessions.getUserSessions(startDate, endDate);
        const statsData = await repositories.stats.getStats();

        setSessions(sessionsData);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [repositories, timeRange]);

  const getDateRange = (range) => {
    const now = new Date();
    const start = new Date();

    switch (range) {
      case 'week':
        start.setDate(now.getDate() - 7);
        break;
      case 'month':
        start.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        start.setFullYear(now.getFullYear() - 1);
        break;
      default:
        start.setDate(now.getDate() - 7);
    }

    return [start, now];
  };

  const value = {
    loading,
    error,
    stats,
    sessions,
    timeRange,
    setTimeRange,
    auth
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
};