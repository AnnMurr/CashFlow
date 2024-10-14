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
            <Route path="/financial-plans" element={<FinancialPlans />} />
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
