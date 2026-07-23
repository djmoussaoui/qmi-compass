import { create } from 'zustand';

export type AppView =
  | 'home'
  | 'login'
  | 'register'
  | 'teacher-dashboard'
  | 'activity-designer'
  | 'techniques-library'
  | 'technique-details'
  | 'values-map'
  | 'development-progression'
  | 'classes'
  | 'students'
  | 'observation-card'
  | 'reflection-journal'
  | 'progress-dashboard'
  | 'reports'
  | 'quranic-sources'
  | 'review-workflow'
  | 'about'
  | 'safeguards'
  | 'privacy'
  | 'admin-dashboard'
  | 'conference-demo'
  | 'not-found'
  | 'access-denied'
  | 'error';

export type UserRole = 'teacher' | 'student' | 'supervisor' | 'educational_reviewer' | 'quranic_reviewer' | 'researcher' | 'admin';

export interface UserInfo {
  id: string;
  nameAr: string;
  nameEn?: string;
  email: string;
  role: UserRole;
  institutionId?: string;
}

interface NavigationHistoryEntry {
  view: AppView;
  params?: Record<string, string>;
  title?: string;
}

interface AppState {
  currentView: AppView;
  viewParams: Record<string, string>;
  viewHistory: NavigationHistoryEntry[];
  navigate: (view: AppView, params?: Record<string, string>, title?: string) => void;
  goBack: () => void;
  currentUser: UserInfo | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
  setDemoMode: (enabled: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  designerStep: number;
  setDesignerStep: (step: number) => void;
  selectedTechniqueId: string | null;
  setSelectedTechniqueId: (id: string | null) => void;
  selectedClassId: string | null;
  setSelectedClassId: (id: string | null) => void;
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentView: 'home',
  viewParams: {},
  viewHistory: [],
  navigate: (view, params = {}, title) => {
    const state = get();
    const entry: NavigationHistoryEntry = {
      view: state.currentView,
      params: state.viewParams,
      title: title || state.currentView,
    };
    set({
      currentView: view,
      viewParams: params,
      viewHistory: [...state.viewHistory.slice(-19), entry],
      sidebarOpen: false,
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  goBack: () => {
    const state = get();
    if (state.viewHistory.length > 0) {
      const prev = state.viewHistory[state.viewHistory.length - 1];
      set({
        currentView: prev.view,
        viewParams: prev.params || {},
        viewHistory: state.viewHistory.slice(0, -1),
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      set({ currentView: 'home', viewParams: {} });
    }
  },
  currentUser: null,
  isAuthenticated: false,
  isDemoMode: false,
  login: (user) => set({ currentUser: user, isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false, currentView: 'home' }),
  setDemoMode: (enabled) => set({ isDemoMode: enabled }),
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  designerStep: 1,
  setDesignerStep: (step) => set({ designerStep: step }),
  selectedTechniqueId: null,
  setSelectedTechniqueId: (id) => set({ selectedTechniqueId: id }),
  selectedClassId: null,
  setSelectedClassId: (id) => set({ selectedClassId: id }),
  selectedStudentId: null,
  setSelectedStudentId: (id) => set({ selectedStudentId: id }),
}));