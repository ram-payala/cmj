import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CurrentIssue from './components/CurrentIssue';
import About from './components/About';
import BrowseContent from './components/BrowseContent';
import Submissions from './components/Submissions';
import AuthorGuidelines from './components/AuthorGuidelines';
import OpenAccessPolicy from './components/policies/OpenAccessPolicy';
import PublishingEthics from './components/policies/PublishingEthics';
import ReviewerGuidelines from './components/policies/ReviewerGuidelines';
import PrivacyPolicy from './components/policies/PrivacyPolicy';
import CopyrightLicensing from './components/policies/CopyrightLicensing';
import TermsConditions from './components/policies/TermsConditions';
import Accessibility from './components/policies/Accessibility';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EditProfile from './components/auth/EditProfile';
import Contact from './components/Contact';
import SubmitResearch from './components/SubmitResearch';
import MySubmissions from './components/dashboard/MySubmissions';
import SubmissionDetail from './components/dashboard/SubmissionDetail';
import { User } from './types/user';
import { supabase } from './lib/supabase';
import { mapSupabaseUserToAppUser } from './lib/auth';

type Page = 'home' | 'about' | 'browse' | 'submissions' | 'submit-research' | 'my-submissions' | 'submission-detail' | 'author-guidelines' | 'open-access' | 'publishing-ethics' | 'reviewer-guidelines' | 'privacy-policy' | 'copyright-licensing' | 'terms-conditions' | 'accessibility' | 'register' | 'login' | 'contact' | 'edit-profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(mapSupabaseUserToAppUser(session.user));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapSupabaseUserToAppUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRegisterSuccess = () => {
    setCurrentPage('my-submissions');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('my-submissions');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

  const mockArticles = [
    {
      id: '1',
      title: 'CASE REPORT AND LITERATURE REVIEW ON PURULENT MENINGITIS WITH SPINAL HEMORRHAGE',
      authors: 'Hong Zhang, Shu-ji Gao, Xiao-yu Yang, Ming-wei Liu (Author)',
      pages: '428-434',
    },
    {
      id: '2',
      title: 'PANCREATIC DUCT-SUPPORTED LONGITUDINAL "U"-SHAPED PANCREATICOJEJUNOSTOMY IN LAPAROSCOPIC PANCREATICODUODENECTOMY: EVALUATION OF SAFETY AND FEASIBILITY',
      authors: 'Weihua Zheng, Yu Zhang, Zihang Wang, Junjie Lu, Long Xia, Caiyan An, Junjing Zhang (Author)',
      pages: '435-444',
    },
  ];

  // Render submission form separately (it has its own layout)
  if (currentPage === 'submit-research') {
    return (
      <SubmitResearch
        onNavigateBack={() => setCurrentPage('submissions')}
        onNavigateToGuidelines={() => setCurrentPage('author-guidelines')}
        userName={user?.name || 'Admin JoC'}
        userInitials={user?.initials || 'AJ'}
      />
    );
  }

  // Render dashboard pages separately (they have their own layout)
  if (currentPage === 'my-submissions' || currentPage === 'submission-detail') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="min-h-screen bg-white border-l border-r border-gray-200 mx-auto w-full" style={{ maxWidth: '1500px', width: '100%' }}>
          <Header
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateRegister={() => setCurrentPage('register')}
            onNavigateLogin={() => setCurrentPage('login')}
            onNavigateEditProfile={() => setCurrentPage('edit-profile')}
            user={user}
            onLogout={handleLogout}
          />
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

          <div className="flex-1">
            <div className="mx-auto px-12 py-8" style={{ maxWidth: '1400px' }}>
              {currentPage === 'my-submissions' ? (
                <MySubmissions
                  onNavigateBack={() => setCurrentPage('home')}
                  onViewSubmission={(id) => {
                    setSelectedSubmissionId(id);
                    setCurrentPage('submission-detail');
                  }}
                  onNewSubmission={() => setCurrentPage('submit-research')}
                  user={user}
                />
              ) : currentPage === 'submission-detail' ? (
                <SubmissionDetail
                  submissionId={selectedSubmissionId}
                  onNavigateBack={() => setCurrentPage('my-submissions')}
                />
              ) : null}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="min-h-screen bg-white border-l border-r border-gray-200 mx-auto w-full" style={{ maxWidth: '1500px', width: '100%' }}>
        <Header
          onNavigateHome={() => setCurrentPage('home')}
          onNavigateRegister={() => setCurrentPage('register')}
          onNavigateLogin={() => setCurrentPage('login')}
          onNavigateEditProfile={() => setCurrentPage('edit-profile')}
          user={user}
          onLogout={handleLogout}
        />
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

        <div className="flex-1">
          <div className="mx-auto px-12 py-8" style={{ maxWidth: '1400px' }}>
            <div className="flex gap-12">
              <main className="flex-1">
                {currentPage === 'home' ? (
                  <CurrentIssue
                    volume={64}
                    issue={4}
                    year={2025}
                    publishedDate="2025-12-29"
                    articles={mockArticles}
                  />
                ) : currentPage === 'about' ? (
                  <About onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'browse' ? (
                  <BrowseContent
                    onNavigateHome={() => setCurrentPage('home')}
                    volume={64}
                    issue={4}
                    year={2025}
                    publishedDate="2025-12-29"
                    articles={mockArticles}
                  />
                ) : currentPage === 'submissions' ? (
                  <Submissions
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateSubmit={() => setCurrentPage('submit-research')}
                  />
                ) : currentPage === 'author-guidelines' ? (
                  <AuthorGuidelines onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'open-access' ? (
                  <OpenAccessPolicy onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'publishing-ethics' ? (
                  <PublishingEthics onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'reviewer-guidelines' ? (
                  <ReviewerGuidelines onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'privacy-policy' ? (
                  <PrivacyPolicy onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'copyright-licensing' ? (
                  <CopyrightLicensing onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'terms-conditions' ? (
                  <TermsConditions onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'accessibility' ? (
                  <Accessibility onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'register' ? (
                  <Register
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateLogin={() => setCurrentPage('login')}
                    onRegisterSuccess={handleRegisterSuccess}
                  />
                ) : currentPage === 'login' ? (
                  <Login
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateRegister={() => setCurrentPage('register')}
                    onLoginSuccess={handleLoginSuccess}
                  />
                ) : currentPage === 'contact' ? (
                  <Contact onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'edit-profile' ? (
                  <EditProfile
                    user={user}
                    onNavigateBack={() => setCurrentPage('my-submissions')}
                  />
                ) : null}
              </main>

              <Sidebar onNavigateSubmit={() => setCurrentPage('submit-research')} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
