import { useState, useEffect } from 'react';
import { api } from '../services/api';

type ParticipationStatus =
  | 'DEFAULT'
  | 'INVITED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXCLUDED';

interface UserProfile {
  name: string;
  email: string;
  area?: string;
  image?: string;
  department?: string;
  ideaSubmitted?: number;
  ideaInProgress?: number;
  totalParticipations?: number;
  ideaImplementedPercent?: number;
  participationStatus?: ParticipationStatus;
}

export function useProfile(userId: string, ideaId: string) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.post('/users/profile', {
          userId,
          ideaId,
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, ideaId]);

  return { user, loading, error };
}
