import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthorizedContextProvider } from './contexts/authorizedContext/authorizedContext';
import { CheckAuthorization, CheckNotAuthorization } from './contexts/authorizedContext/checkAuthorization';
import { ThemeContextProvider } from './contexts/themeContext/themeContext';
import {
  MainPage,
  PrivacyPolicyPage,
  AboutPage,
  ContactsPage,
  ContactUsPage,
  SignUpPage,
  SignInPage,
  HelpCenterPage,
  ProfilePage,
  BudgetManager,
  BudgetPlanner,
  FinancialPlans,
  ExpensesPage,
  ChartPage,
  IcomePage,
  ChangeNamePage,
  SettingsPage,
  ChangeEmailPage,
  ChangeEmailCheckingPage,
  ChangeEmailModificationPage,
  ChangePasswordPage,
  ChangePasswordModificationPage,
  DeletingAccountConfirmationPage,
  DeletingAccountPage,
  Statistics,
  ErrorPage
} from './components';
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
            <Route path="/help-center" element={<HelpCenterPage />} />
            
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
        
            <Route path="/profile" element={
              <CheckNotAuthorization>
                <ProfilePage />
              </CheckNotAuthorization>
            } />
            <Route path="/budget-manager" element={
              <CheckNotAuthorization>
                <BudgetManager />
              </CheckNotAuthorization>
            } />
            <Route path="/budget-planner" element={
              <CheckNotAuthorization>
                <BudgetPlanner />
              </CheckNotAuthorization>
            } />
            <Route path="/financial-plans" element={
              <CheckNotAuthorization>
                <FinancialPlans />
              </CheckNotAuthorization>
            } />
            <Route path="/pie-chart" element={
              <CheckNotAuthorization>
                <ChartPage />
              </CheckNotAuthorization>
            } />
            <Route path="/expenses" element={
              <CheckNotAuthorization>
                <ExpensesPage />
              </CheckNotAuthorization>
            } />
            <Route path="/income" element={
              <CheckNotAuthorization>
                <IcomePage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings" element={
              <CheckNotAuthorization>
                <SettingsPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-name" element={
              <CheckNotAuthorization>
                <ChangeNamePage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-email" element={
              <CheckNotAuthorization>
                <ChangeEmailPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-email-checking" element={
              <CheckNotAuthorization>
                <ChangeEmailCheckingPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-email-modification" element={
              <CheckNotAuthorization>
                <ChangeEmailModificationPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-password" element={
              <CheckNotAuthorization>
                <ChangePasswordPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/change-password-modification" element={
              <CheckNotAuthorization>
                <ChangePasswordModificationPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/deleting-account-confirmation" element={
              <CheckNotAuthorization>
                <DeletingAccountConfirmationPage />
              </CheckNotAuthorization>
            } />
            <Route path="/settings/deleting-account" element={
              <CheckNotAuthorization>
                <DeletingAccountPage />
              </CheckNotAuthorization>
            } />
            <Route path="/statistics" element={
              <CheckNotAuthorization>
                <Statistics />
              </CheckNotAuthorization>
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </HashRouter>
      </ThemeContextProvider>
    </AuthorizedContextProvider>
  );
}

export default App;
