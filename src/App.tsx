import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
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
import InfoForReaders from './components/InfoForReaders';
import InfoForAuthors from './components/InfoForAuthors';
import InfoForLibrarians from './components/InfoForLibrarians';
import SubmitResearch from './components/SubmitResearch';
import MySubmissions from './components/dashboard/MySubmissions';
import SubmissionDetail from './components/dashboard/SubmissionDetail';
import Admin from './components/dashboard/Admin';
import { User } from './types/user';
import { supabase } from './lib/supabase';
import { mapSupabaseUserToAppUser } from './lib/auth';

type Page = 'home' | 'about' | 'browse' | 'submissions' | 'submit-research' | 'my-submissions' | 'submission-detail' | 'admin' | 'author-guidelines' | 'open-access' | 'publishing-ethics' | 'reviewer-guidelines' | 'privacy-policy' | 'copyright-licensing' | 'terms-conditions' | 'accessibility' | 'info-readers' | 'info-authors' | 'info-librarians' | 'register' | 'login' | 'contact' | 'edit-profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async (sbUser: Parameters<typeof mapSupabaseUserToAppUser>[0]) => {
      const appUser = mapSupabaseUserToAppUser(sbUser);
      const { data: row } = await supabase.from('users').select('role').eq('id', sbUser.id).maybeSingle();
      setUser({ ...appUser, role: row?.role === 'admin' ? 'admin' : 'user' });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadUser(session.user);
      else setUser(null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadUser(session.user);
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRegisterSuccess = () => {
    setCurrentPage('my-submissions');
  };

  const handleLoginSuccess = (role?: 'user' | 'admin') => {
    setCurrentPage(role === 'admin' ? 'admin' : 'my-submissions');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

 const mockArticles = [
    {
      id: '1',
      title: 'Clinical Characteristics and APC Gene Mutation Spectrum of Familial Adenomatous Polyposis Patients in China',
      /* ✅ Individual author blocks pairing names and their corresponding institutions */
      authorsList: [
        { name: 'Jiaqi Kang', affiliation: 'Department of Colorectal Surgery, Tianjin Union Medical Center, The First Affiliated Hospital of Nankai University, China; Tianjin Institute of Coloproctology, China.' },
        { name: 'Mingsen Li', affiliation: 'Department of Colorectal Surgery, Tianjin Union Medical Center, The First Affiliated Hospital of Nankai University, China; Tianjin Institute of Coloproctology, China.' },
        { name: 'Chen Xu', affiliation: 'Department of Colorectal Surgery, Tianjin Union Medical Center, The First Affiliated Hospital of Nankai University, China; Tianjin Institute of Coloproctology, China.' },
        { name: 'Yuwei Li', affiliation: 'Department of Colorectal Surgery, Tianjin Union Medical Center, The First Affiliated Hospital of Nankai University, China; Tianjin Institute of Coloproctology, China.' },
        { name: 'Zhao Zhang', affiliation: 'Department of Colorectal Surgery, Tianjin Union Medical Center, The First Affiliated Hospital of Nankai University, China; Tianjin Institute of Coloproctology, China.' }
      ],
      authors: 'Jiaqi Kang, Mingsen Li, Chen Xu, Yuwei Li, Zhao Zhang*',
      pdfUrl: '/pdfs/Final Publication Proof - CMJ26-R591.pdf',
      pages: '135-142',
      abstract: `Objective: Given the limited clinical and molecular characterization of familial adenomatous polyposis (FAP) in Chinese populations, we delineate the APC mutational landscape in national probands and correlates genotypic profiles with phenotypic manifestations.

Methods: Comprehensive APC gene sequencing was conducted in 33 unrelated Chinese polyposis patients, with subsequent genotype-phenotype correlation analysis leveraging clinical data from index cases and affected relatives.

Findings: Germline APC mutations were identified in 28/33 (84.8%) probands. Patients with profuse FAP developed polyposis and cancer significantly earlier than attenuated or intermediate subtypes. 13 out of 35 mutations (46.4%) were localized within exon 15. Codon 1309 has the highest mutation frequency (7%,2/29). 7 novel APC mutations were identified, including c.646-1>T, c.1285delC, c.1350_1352delinsAC, c.3992_3993insA, c.230_233delTAGA, EX5_16DEL, Ex3_16DEL. Most intermediate FAP cases (92.9%, 13/14) had disease-causing mutations in codons 157-1595, matching the known mutation hotspot region. 100% (4/4) of congenital hypertrophy of retinal pigment epithelium, 75% (3/4) of gastroduodenal adenomas, and 50% (1/2) of desmoid tumor cases were localized to established APC risk domains.

Conclusions: Our comprehensive profiling of APC variants in Chinese polyposis patients delineated clinical characteristics and novel pathogenic mutations. We observed divergent genotype-phenotype correlations in part of mutation-positive families, necessitating tailored genetic counseling and management strategies for this population.`,
      keywords: 'familial adenomatous polyposis, APC, mutation screening, genotype-phenotype.'
    }
  ];

  // Render dashboard pages separately (they have their own layout)
  if (currentPage === 'my-submissions' || currentPage === 'submission-detail' || currentPage === 'submit-research' || currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="min-h-screen bg-white border-l border-r border-gray-200 mx-auto w-full" style={{ maxWidth: '1500px', width: '100%' }}>
          <Header
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateRegister={() => setCurrentPage('register')}
            onNavigateLogin={() => setCurrentPage('login')}
            onNavigateEditProfile={() => setCurrentPage('edit-profile')}
            onNavigateMySubmissions={user?.role === 'admin' ? () => setCurrentPage('admin') : () => setCurrentPage('my-submissions')}
            user={user}
            onLogout={handleLogout}
          />
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

          <div className="flex-1">
            <div className="mx-auto px-12 py-8" style={{ maxWidth: '1400px' }}>
              {currentPage === 'admin' ? (
                <Admin
                  onNavigateBack={() => setCurrentPage('home')}
                  onViewSubmission={(id) => {
                    setSelectedSubmissionId(id);
                    setCurrentPage('submission-detail');
                  }}
                  onNewSubmission={() => setCurrentPage('submit-research')}
                />
              ) : currentPage === 'my-submissions' ? (
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
                  onNavigateBack={() => setCurrentPage(user?.role === 'admin' ? 'admin' : 'my-submissions')}
                  onNavigateToGuidelines={() => setCurrentPage('author-guidelines')}
                  user={user}
                />
              ) : currentPage === 'submit-research' ? (
                <SubmitResearch
                  onNavigateBack={() => setCurrentPage(user?.role === 'admin' ? 'admin' : 'submissions')}
                  onNavigateToGuidelines={() => setCurrentPage('author-guidelines')}
                  onSubmissionSuccess={() => setCurrentPage(user?.role === 'admin' ? 'admin' : 'my-submissions')}
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
          onNavigateMySubmissions={user?.role === 'admin' ? () => setCurrentPage('admin') : () => setCurrentPage('my-submissions')}
          user={user}
          onLogout={handleLogout}
        />
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

        <div className="flex-1">
          <div className="mx-auto px-12 py-8" style={{ maxWidth: '1400px' }}>
            <div className="flex gap-12">
              <main className="flex-1">
                {(currentPage === 'home' || currentPage === 'about') ? (
                  <About onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'browse' ? (
                  <BrowseContent
                    onNavigateHome={() => setCurrentPage('home')}
                    volume={67}
                    issue={1}
                    year={2026}
                    publishedDate="2026-06-27"
                    articles={mockArticles}
                  />
                ) : currentPage === 'submissions' ? (
                  <Submissions
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateLogin={() => setCurrentPage('login')}
                    onNavigateRegister={() => setCurrentPage('register')}
                    onMakeSubmission={() => (user ? setCurrentPage('my-submissions') : setCurrentPage('submissions'))}
                    isLoggedIn={!!user}
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
                ) : currentPage === 'info-readers' ? (
                  <InfoForReaders
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateRegister={() => setCurrentPage('register')}
                    onNavigatePrivacy={() => setCurrentPage('privacy-policy')}
                  />
                ) : currentPage === 'info-authors' ? (
                  <InfoForAuthors
                    onNavigateHome={() => setCurrentPage('home')}
                    onNavigateAbout={() => setCurrentPage('about')}
                    onNavigateAuthorGuidelines={() => setCurrentPage('author-guidelines')}
                    onNavigateRegister={() => setCurrentPage('register')}
                    onNavigateLogin={() => setCurrentPage('login')}
                  />
                ) : currentPage === 'info-librarians' ? (
                  <InfoForLibrarians onNavigateHome={() => setCurrentPage('home')} />
                ) : currentPage === 'edit-profile' ? (
                  <EditProfile
                    user={user}
                    onNavigateBack={() => setCurrentPage('my-submissions')}
                  />
                ) : null}
              </main>

              <Sidebar
                onNavigateSubmit={user ? () => setCurrentPage('submit-research') : () => setCurrentPage('submissions')}
                onNavigateInfoReaders={() => setCurrentPage('info-readers')}
                onNavigateInfoAuthors={() => setCurrentPage('info-authors')}
                onNavigateInfoLibrarians={() => setCurrentPage('info-librarians')}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;