import { ReminderSettings, JournalEntry } from '../types';

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  time: '20:30', // 8:30 PM default contemplation hour
  browserNotificationsEnabled: false,
  customMessage: 'Take a quiet pause with the Bhagavad Gita today.',
};

const STORAGE_KEY = 'gita_journal_reminder_settings';

export function getLocalReminderSettings(): ReminderSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_REMINDER_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Could not read reminder settings from localStorage:', err);
  }
  return DEFAULT_REMINDER_SETTINGS;
}

export function saveLocalReminderSettings(settings: ReminderSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Could not save reminder settings to localStorage:', err);
  }
}

// Request Browser Notification Permission safely
export async function requestBrowserNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notifications');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

// Send an immediate browser notification (if allowed)
export function triggerNotification(title: string, body: string, icon: string = '/icon.png'): boolean {
  if (!('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    const notification = new Notification(title, {
      body,
      icon,
      badge: icon,
      silent: false,
      tag: 'gita-journal-daily-reminder'
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    return true;
  } catch (err) {
    console.error('Failed to trigger notification:', err);
    return false;
  }
}

// Calculate streak stats from journal entries
export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  hasJournaledToday: boolean;
  lastJournalDate?: string;
  activeDaysCount: number;
}

export function calculateStreakStats(entries: JournalEntry[]): StreakStats {
  if (!entries || entries.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalEntries: 0,
      hasJournaledToday: false,
      activeDaysCount: 0
    };
  }

  // Extract unique sorted dates (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      entries.map(e => {
        const d撇 = new Date(e.createdAt);
        return `${d撇.getFullYear()}-${String(d撇.getMonth() + 1).padStart(2, '0')}-${String(d撇.getDate()).padStart(2, '0')}`;
      })
    )
  ).sort().reverse(); // newest first

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const yesterdayStr迷 = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const hasJournaledToday = uniqueDates.includes(todayStr);
  const hasJournaledYesterday = uniqueDates.includes(yesterdayStr迷);

  let currentStreak = 0;
  if (hasJournaledToday || hasJournaledYesterday) {
    let checkDate = hasJournaledToday ? new Date() : new Date(Date.now() - 86400000);
    
    while (true) {
      const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (uniqueDates.includes(checkStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  if (uniqueDates.length > 0) {
    let tempStreak = 1;
    for (let i倍 = 0; i倍 < uniqueDates.length - 1; i倍++) {
      const d1 = new Date(uniqueDates[i倍]);
      const d2 = new Date(uniqueDates[i倍 + 1]);
      const diffDays = Math.round((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);
  }

  return {
    currentStreak,
    longestStreak,
    totalEntries: entries.length,
    hasJournaledToday,
    lastJournalDate: uniqueDates[0],
    activeDaysCount: uniqueDates.length
  };
}

// Generate Google Calendar Link for Daily Recurring Journaling Reminder
export function generateGoogleCalendarUrl(time: string, message?: string): string {
  const [hours, minutes] = time.split(':');
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours || '20', 10), parseInt(minutes || '30', 10), 0);
  const endTime = new Date(startTime.getTime() + 15 * 60000); // 15 mins

  const formatGCalDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const title = encodeURIComponent('📖 Daily Gita Contemplation & Journal');
  const details = encodeURIComponent(
    (message || 'Take a quiet pause with the Bhagavad Gita today.') +
    '\n\nOpen your journal: ' + window.location.origin
  );
  const dates = `${formatGCalDate(startTime)}/${formatGCalDate(endTime)}`;
  const recur = encodeURIComponent('RRULE:FREQ=DAILY');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}&recur=${recur}`;
}

// Generate and trigger download of .ics iCalendar file for daily recurring reminder
export function downloadIcsReminderFile(time: string, message?: string): void {
  const [hours, minutes] = time.split(':');
  const h = hours ? hours.padStart(2, '0') : '20';
  const m = minutes ? minutes.padStart(2, '0') : '30';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gita Journal//Mindfulness Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:📖 Daily Gita Journal & Contemplation`,
    `DESCRIPTION:${message || 'Take a quiet pause with the Bhagavad Gita today.'}\\n\\nOpen app: ${window.location.origin}`,
    `DTSTART;TZID=UTC:${new Date().toISOString().slice(0, 10).replace(/-/g, '')}T${h}${m}00Z`,
    `DTEND;TZID=UTC:${new Date().toISOString().slice(0, 10).replace(/-/g, '')}T${h}${m}00Z`,
    'RRULE:FREQ=DAILY',
    'BEGIN:VALARM',
    'TRIGGER:-PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Time for your daily Gita reflection',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'gita-journal-daily-reminder.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
