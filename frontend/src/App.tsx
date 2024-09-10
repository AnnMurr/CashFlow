import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/ui/mainPage/mainPage';
import { PrivacyPolicyPage } from './components/ui/privacyPolicyPage/privacyPolicyPage';
import { AboutPage } from './components/ui/aboutPage/aboutPage';
import { ContactsPage } from './components/ui/contactsPage/contactsPage';
import { ContactUsPage } from './components/ui/contactUsPage/contactUsPage';
import { SignUpPage } from './components/ui/signUpPage/signUpPage';
import { SignInPage } from './components/ui/signInPage/signInPage';
import { HelpCenterPage } from './components/ui/helpCenterPage/helpCenterPage';
import { ProfilePage } from './components/ui/profilePage/profilePage';
import { ExpensesPage } from './components/ui/expensesPage/expensesPage';
import { AuthorizedContextProvider } from './contexts/authorizedContext/authorizedContext';
import { CheckAuthorization, CheckNotAuthorization } from './contexts/authorizedContext/checkAuthorization';
import { ErrorPage } from './components/ui/errorPage/errorPage';
import { SettingsPage } from './components/ui/settingsPage/settingsPage';
import { ChangeNamePage } from './components/ui/profileChaningPages/changeNamePage/changeNamePage';
import { ChangeEmailPage } from './components/ui/profileChaningPages/changeEmailPage/changeEmailPage';
import { ChangeEmailCheckingPage } from './components/ui/profileChaningPages/changeEmailCheckingPage/changeEmailCheckingPage';
import { ChangeEmailModificationPage } from './components/ui/profileChaningPages/changeEmailModificationPage/changeEmailModificationPage';
import { ChangePasswordPage } from './components/ui/profileChaningPages/changePasswordPage/changePasswordPage';
import { ChangePasswordModificationPage } from './components/ui/profileChaningPages/changePasswordModificationPage/changePasswordModificationPage';
import { DeletingAccountConfirmationPage } from './components/ui/profileChaningPages/deletingAccountСonfirmationPage/deletingAccountСonfirmationPage';
import { DeletingAccountPage } from './components/ui/profileChaningPages/deletingAccountPage/deletingAccountPage';
import { IcomePage } from './components/ui/icomePage/icomePage';
import { Statistics } from './components/ui/statisticsPage/statistics';
import { ThemeContextProvider } from './contexts/themeContext/themeContext';
import { ChartPage } from './components/ui/chartPage/chartPage';
import { BudgetManager } from './components/ui/budgetManager/budgetManager';
import { BudgetPlanner } from './components/ui/budgetPlanner/budgetPlanner';
import "./accets/styles/fonts.css";
import "./accets/styles/reset.css";

function App() {
  return (
    <AuthorizedContextProvider>
      <ThemeContextProvider>
        <HashRouter>
    
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contacts-us" element={<ContactUsPage />} />
              <Route path="/sign-up" element={
                <CheckAuthorization>
                  <SignUpPage />
                </CheckAuthorization>
              } />
              <Route path="/sign-in" element={
                <CheckAuthorization>
                  <SignInPage />
                </CheckAuthorization>
              } />
              <Route path="/help-center" element={<HelpCenterPage />} />

              <Route path="/profile" element={
                <CheckNotAuthorization>
                  <ProfilePage />
                </CheckNotAuthorization>
              } />
              <Route path="/budget-manager" element={<BudgetManager />} />
              <Route path="/budget-planner" element={<BudgetPlanner />} />
              <Route path="/pie-chart" element={<ChartPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/income" element={<IcomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/change-name" element={<ChangeNamePage />} />
              <Route path="/settings/change-email" element={<ChangeEmailPage />} />
              <Route path="/settings/change-email-checking" element={<ChangeEmailCheckingPage />} />
              <Route path="/settings/change-email-modification" element={<ChangeEmailModificationPage />} />
              <Route path="/settings/change-password" element={<ChangePasswordPage />} />
              <Route path="/settings/change-password-modification" element={<ChangePasswordModificationPage />} />
              <Route path="/settings/deleting-account-confirmation" element={<DeletingAccountConfirmationPage />} />
              <Route path="/settings/deleting-account" element={<DeletingAccountPage />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
 
        </HashRouter>
      </ThemeContextProvider>
    </AuthorizedContextProvider>
  );
}

export default App;
