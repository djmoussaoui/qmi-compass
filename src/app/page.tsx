'use client';

import { useAppStore } from '@/store/app-store';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppFooter } from '@/components/layout/AppFooter';
import { HomePage } from '@/components/home/HomePage';
import { LoginPage } from '@/components/auth/LoginPage';
import { RegisterPage } from '@/components/auth/RegisterPage';
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard';
import ActivityDesigner from '@/components/teacher/ActivityDesigner';
import { TechniquesLibrary } from '@/components/techniques/TechniquesLibrary';
import { TechniqueDetails } from '@/components/techniques/TechniqueDetails';
import ValuesMap from '@/components/values/ValuesMap';
import DevelopmentProgression from '@/components/values/DevelopmentProgression';
import { ClassesPage } from '@/components/classes/ClassesPage';
import { StudentsPage } from '@/components/classes/StudentsPage';
import { ObservationCard } from '@/components/observation/ObservationCard';
import { ReflectionJournal } from '@/components/observation/ReflectionJournal';
import { ProgressDashboard } from '@/components/progress/ProgressDashboard';
import { ReportsPage } from '@/components/progress/ReportsPage';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ConferenceDemo } from '@/components/shared/ConferenceDemo';
import {
  AboutPage,
  SafeguardsPage,
  PrivacyPage,
  NotFoundPage,
  AccessDeniedPage,
  ErrorPage,
  QuranicSourcesPage,
  ReviewWorkflowPage,
} from '@/components/shared/StaticPages';

const FULLSCREEN_VIEWS = ['login', 'register', 'not-found', 'access-denied', 'error'];

export default function Home() {
  const { currentView, isAuthenticated } = useAppStore();

  // Full-screen pages (no header/footer/sidebar)
  if (currentView === 'login') return <LoginPage />;
  if (currentView === 'register') return <RegisterPage />;
  if (currentView === 'not-found') return <NotFoundPage />;
  if (currentView === 'access-denied') return <AccessDeniedPage />;
  if (currentView === 'error') return <ErrorPage />;

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'activity-designer':
        return <ActivityDesigner />;
      case 'techniques-library':
        return <TechniquesLibrary />;
      case 'technique-details':
        return <TechniqueDetails />;
      case 'values-map':
        return <ValuesMap />;
      case 'development-progression':
        return <DevelopmentProgression />;
      case 'classes':
        return <ClassesPage />;
      case 'students':
        return <StudentsPage />;
      case 'observation-card':
        return <ObservationCard />;
      case 'reflection-journal':
        return <ReflectionJournal />;
      case 'progress-dashboard':
        return <ProgressDashboard />;
      case 'reports':
        return <ReportsPage />;
      case 'quranic-sources':
        return <QuranicSourcesPage />;
      case 'review-workflow':
        return <ReviewWorkflowPage />;
      case 'about':
        return <AboutPage />;
      case 'safeguards':
        return <SafeguardsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'conference-demo':
        return <ConferenceDemo />;
      default:
        return <HomePage />;
    }
  };

  const showSidebar = isAuthenticated && !FULLSCREEN_VIEWS.includes(currentView) && currentView !== 'home' && currentView !== 'conference-demo';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1">
        {showSidebar && <AppSidebar />}
        <main className={`flex-1 ${showSidebar ? 'lg:mr-64' : ''} min-h-[calc(100vh-3.5rem)]`}>
          <div className="pb-0">
            {renderView()}
          </div>
          <AppFooter />
        </main>
      </div>
    </div>
  );
}