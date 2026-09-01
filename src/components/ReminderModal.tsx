import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Volume2, 
  ShieldCheck
} from 'lucide-react';
import { ReminderSettings, JournalEntry } from '../types';
import { 
  DEFAULT_REMINDER_SETTINGS, 
  requestBrowserNotificationPermission, 
  triggerNotification, 
  generateGoogleCalendarUrl, 
  downloadIcsReminderFile, 
  calculateStreakStats, 
  StreakStats 
} from '../lib/reminders';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: JournalEntry[];
  settings: ReminderSettings;
  onSaveSettings: (settings: ReminderSettings) => Promise<void>;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  entries,
  settings,
  onSaveSettings
}) => {
  const [localSettings, setLocalSettings] = useState<ReminderSettings>(settings);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [testSent, setTestSent] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const streakStats: StreakStats = calculateStreakStats(entries);

  useEffect(() => {
    setLocalSettings(settings);
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const result = await requestBrowserNotificationPermission();
    setPermissionStatus(result);
    if (result === 'granted') {
      const updated = { ...localSettings, browserNotificationsEnabled: true };
      setLocalSettings(updated);
      await onSaveSettings(updated);
    }
  };

  const handleSendTestNotification = () => {
    const sent = triggerNotification(
      '📖 Daily Gita Contemplation',
      localSettings.customMessage || 'Take a quiet pause with the Bhagavad Gita today.'
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSettings(localSettings);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error('Failed to save reminder settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl border border-zinc-800 bg-[#111215] shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5 bg-[#141519]">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-950/30 text-amber-300">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-base font-semibold text-zinc-100 sm:text-lg">
                Daily Contemplation Reminders
              </h2>
              <p className="text-xs text-zinc-400">
                Nurture your daily practice with mindful notifications and calendar sync.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-zinc-300">
          
          {/* 1. Daily Streak & Habit Tracker Banner */}
          <div className="rounded-xl border border-amber-500/20 bg-radial-[at_top_left] from-amber-950/30 via-[#15161a] to-[#111215] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <Flame className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Contemplative Streak
                  </span>
                  <div className="text-sm font-semibold text-zinc-100">
                    {streakStats.currentStreak} {streakStats.currentStreak === 1 ? 'Day' : 'Days'} in a Row
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">Longest Streak</span>
                <span className="text-xs font-semibold text-zinc-200">{streakStats.longestStreak} days</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2.5 text-[11px]">
              <span className="text-zinc-400">
                Total Reflections: <strong className="text-zinc-200">{streakStats.totalEntries}</strong>
              </span>
              <span className={streakStats.hasJournaledToday ? 'text-emerald-400 font-medium' : 'text-amber-400/90'}>
                {streakStats.hasJournaledToday ? '✓ Journaled today' : '⏳ Today awaits your reflection'}
              </span>
            </div>
          </div>

          {/* 2. In-Browser / Desktop Notifications Setup */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="font-semibold text-zinc-200 text-xs">Daily Reflection Time</span>
              </div>
              <input
                type="time"
                value={localSettings.time}
                onChange={(e) => setLocalSettings({ ...localSettings, time: e.target.value })}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-amber-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Browser Permission Prompt / Status */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-medium text-zinc-300 block text-[11px]">
                  Browser Desktop Notifications
                </span>
                <span className="text-[10px] text-zinc-400">
                  {permissionStatus === 'granted'
                    ? '✓ Browser notifications are enabled'
                    : permissionStatus === 'denied'
                    ? '⚠️ Notifications blocked by browser'
                    : 'Permission needed to send gentle alerts'}
                </span>
              </div>

              {permissionStatus !== 'granted' ? (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[11px] font-medium text-amber-200 hover:bg-amber-500/30"
                >
                  Enable Alerts
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendTestNotification}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-300 hover:bg-zinc-700"
                >
                  {testSent ? '✓ Sent Test Alert' : 'Test Alert'}
                </button>
              )}
            </div>

            {/* Custom Contemplative Message */}
            <div className="pt-2">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
                Reminder Prompt
              </label>
              <input
                type="text"
                value={localSettings.customMessage || ''}
                onChange={(e) => setLocalSettings({ ...localSettings, customMessage: e.target.value })}
                placeholder="Take a quiet pause with the Bhagavad Gita today."
                className="w-full rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>
          </div>

          {/* 3. External Calendar Sync (Google Calendar & .ics download) */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
            <div>
              <span className="font-semibold text-zinc-200 text-xs flex items-center space-x-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-amber-400" />
                <span>External Calendar Recurring Reminder</span>
              </span>
              <p className="text-[11px] text-zinc-400 mt-1">
                Prefer calendar alerts on your phone or computer? Sync a daily repeating event:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href={generateGoogleCalendarUrl(localSettings.time, localSettings.customMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-xs font-medium text-zinc-200 hover:border-amber-500/40 hover:bg-zinc-800 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={() => downloadIcsReminderFile(localSettings.time, localSettings.customMessage)}
                className="flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-xs font-medium text-zinc-200 hover:border-amber-500/40 hover:bg-zinc-800 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-amber-400" />
                <span>Download .ics (Apple / Outlook)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-800 p-4 flex items-center justify-between bg-zinc-950/60">
          <div className="text-[11px] text-zinc-400">
            {saveSuccess ? (
              <span className="text-emerald-400 font-medium">✓ Reminder settings saved</span>
            ) : (
              <span>Synced with your private profile</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-4 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
