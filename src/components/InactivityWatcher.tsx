/* eslint-disable no-plusplus */
import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { Id, toast } from 'react-toastify';

interface InactivityWatcherProps {}

export const InactivityWatcher: React.FC<InactivityWatcherProps> = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    let toastId: Id | undefined;
    const timers: NodeJS.Timeout[] = [];
    const defaultToastTimerInSeconds = 60;
    let toastTimerInterval: NodeJS.Timer | undefined;
    let toastTimerInSeconds = defaultToastTimerInSeconds;
    const timeToTriggerAlertInSeconds = 60 * 10; // 10 minutos
    const timeToTriggerLogoutInSeconds =
      timeToTriggerAlertInSeconds + defaultToastTimerInSeconds;

    function getToastMessage() {
      return `Você será deslogado em ${toastTimerInSeconds} ${
        toastTimerInSeconds === 1 ? 'segundo' : 'segundos'
      } caso não interaja com a página.`;
    }

    function handleAlert() {
      toastId = toast(getToastMessage(), {
        type: 'warning',
        autoClose: false,
      });

      toastTimerInterval = setInterval(() => {
        if (!toastId) {
          return clearInterval(toastTimerInterval);
        }

        toastTimerInSeconds--;

        if (toastTimerInSeconds === 0) {
          clearInterval(toastTimerInterval);
          toast.update(toastId, { render: 'Deslogando...' });
        } else {
          toast.update(toastId, { render: getToastMessage() });
        }
      }, 1000);
    }

    function clearToast() {
      if (toastId !== undefined) {
        toast.dismiss(toastId);
      }

      clearInterval(toastTimerInterval);
      toastTimerInSeconds = defaultToastTimerInSeconds;
    }

    async function handleLogout() {
      logout();
      clearToast();
    }

    function applyTimers() {
      timers[0] = setTimeout(handleAlert, timeToTriggerAlertInSeconds * 1000);
      timers[1] = setTimeout(handleLogout, timeToTriggerLogoutInSeconds * 1000);
    }

    function resetTimers() {
      clearToast();
      timers.forEach(clearTimeout);
    }

    function resetAndApplyTimers() {
      resetTimers();
      applyTimers();
    }

    window.addEventListener('load', resetAndApplyTimers);
    window.addEventListener('focus', resetAndApplyTimers);
    window.addEventListener('click', resetAndApplyTimers);
    window.addEventListener('scroll', resetAndApplyTimers);
    window.addEventListener('keypress', resetAndApplyTimers);
    window.addEventListener('mousedown', resetAndApplyTimers);
    window.addEventListener('mousemove', resetAndApplyTimers);
    window.addEventListener('touchmove', resetAndApplyTimers);
    window.addEventListener('touchstart', resetAndApplyTimers);

    applyTimers();

    return () => {
      resetTimers();

      window.removeEventListener('load', resetAndApplyTimers);
      window.removeEventListener('focus', resetAndApplyTimers);
      window.removeEventListener('click', resetAndApplyTimers);
      window.removeEventListener('scroll', resetAndApplyTimers);
      window.removeEventListener('keypress', resetAndApplyTimers);
      window.removeEventListener('mousedown', resetAndApplyTimers);
      window.removeEventListener('mousemove', resetAndApplyTimers);
      window.removeEventListener('touchmove', resetAndApplyTimers);
      window.removeEventListener('touchstart', resetAndApplyTimers);
    };
  }, []);

  return null;
};
