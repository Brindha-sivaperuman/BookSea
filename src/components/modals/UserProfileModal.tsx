import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  Settings,
  RotateCcw,
  Sun,
  Coffee,
  Moon,
  Save,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { ReadingTheme, ReaderFontSize } from '../../types';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    userProfile,
    updateUserProfile,
    savedBookIds,
    readingList,
    readingProgress,
    resetAllDemoData,
  } = useLibrary();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [university, setUniversity] = useState(userProfile.university);
  const [major, setMajor] = useState(userProfile.major);
  const [yearOfStudy, setYearOfStudy] = useState(userProfile.yearOfStudy);

  if (!isProfileOpen) return null;

  const finishedCount = readingList.filter((i) => i.status === 'finished').length;
  const inProgressCount = Object.keys(readingProgress).length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      university,
      major,
      yearOfStudy,
    });
    setEditMode(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsProfileOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#0F4C81]" />
            <h2 className="font-display font-bold text-base sm:text-lg text-[#0F172A]">
              College Scholar Profile
            </h2>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Student Badge Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#2563EB] text-white flex items-center gap-3 sm:gap-4 shadow-md">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 ring-2 ring-white/30 flex items-center justify-center font-display font-bold text-xl sm:text-2xl shrink-0">
              {userProfile.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-base sm:text-lg leading-tight truncate">
                {userProfile.name}
              </h3>
              <p className="text-xs text-blue-100/90 truncate mt-0.5">{userProfile.email}</p>
              <div className="text-[11px] text-blue-200/80 truncate mt-1">
                {userProfile.major} · {userProfile.university}
              </div>
            </div>
          </div>

          {/* Academic Stats Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-2.5 sm:p-3 bg-[#F0F9FF] rounded-xl border border-[#0F4C81]/15">
              <div className="font-mono font-bold text-lg sm:text-xl text-[#0F4C81]">
                {savedBookIds.length}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Saved Books</div>
            </div>
            <div className="p-2.5 sm:p-3 bg-[#F0F9FF] rounded-xl border border-[#0F4C81]/15">
              <div className="font-mono font-bold text-lg sm:text-xl text-[#2563EB]">
                {inProgressCount}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">In Progress</div>
            </div>
            <div className="p-2.5 sm:p-3 bg-[#F0F9FF] rounded-xl border border-[#0F4C81]/15">
              <div className="font-mono font-bold text-lg sm:text-xl text-[#14B8A6]">
                {finishedCount}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Completed</div>
            </div>
          </div>

          {/* Profile Edit Mode Toggle */}
          {editMode ? (
            <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="font-display font-semibold text-xs text-[#0F4C81] uppercase tracking-wider">
                Edit Scholar Details
              </h4>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F0F9FF] border border-slate-200 rounded-lg px-3 py-2 text-xs text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Major</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full bg-[#F0F9FF] border border-slate-200 rounded-lg px-3 py-2 text-xs text-[#0F172A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-[#F0F9FF] border border-slate-200 rounded-lg px-3 py-2 text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Year</label>
                  <input
                    type="text"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full bg-[#F0F9FF] border border-slate-200 rounded-lg px-3 py-2 text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-[#0F4C81] hover:bg-[#2563EB] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Account Details:</span>
                <button
                  onClick={() => setEditMode(true)}
                  className="text-xs text-[#0F4C81] font-semibold hover:underline"
                >
                  Edit Profile
                </button>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Class Year:</span>
                  <span className="font-medium text-[#0F172A]">{userProfile.yearOfStudy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Member Since:</span>
                  <span className="font-medium text-[#0F172A]">{userProfile.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Default Reader Theme:</span>
                  <span className="font-medium text-[#0F172A] capitalize">
                    {userProfile.readingTheme}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Reset Demo Data Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Reset browser demo session:</span>
            <button
              onClick={resetAllDemoData}
              className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 font-semibold transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
