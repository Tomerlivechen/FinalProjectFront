import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./About";
import TestSpace from "./TestSpace";

import Feed from "./Feed";
import Profile from "./Profile";
import NavBar from "../Bars/NavBar";
import Register from "./Register";
import { ThemeProvider } from "../ContextAPI/ThemeContext";
import { LoggedInProvider } from "../ContextAPI/LoggedInContext";
import { UserProvider } from "../ContextAPI/UserContext";
import LoginPage from "./Login";
import ProtectedRoute from "../Constants/RoutrProtection/ProtectedRoute";
import NoAuthRoute from "../Constants/RoutrProtection/NoAuthRoute";
import { SearchProvider } from "../ContextAPI/SearchContext";
import { SearchPage } from "./SearchPage";
import UserSettings from "./UserSettings";
import { AccessabilityPanel } from "../Components/AccessabilityPanel";
import BackGround from "./BackGround";
import { ChatProvider } from "../ContextAPI/ChatContex";
import { FooterBar } from "../Bars/Footer";
import { Group } from "./Group";
import GroupSettings from "./GroupSettings";
import PasswordRecoveryPage from "./PasswordRecovery";
import MainPage from "./MainPage";

function RouterControler() {
  return (
    <>
      <ThemeProvider>
        <LoggedInProvider>
          <UserProvider>
            <SearchProvider>
              <ChatProvider>
                <Router>
                  <NavBar />
                  <BackGround>
                    <AccessabilityPanel />
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="About" element={<About />} />
                      <Route path="Test" element={<TestSpace />} />
                      <Route
                        path="feed"
                        element={
                          <ProtectedRoute>
                            <Feed />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="feed/:postId"
                        element={
                          <ProtectedRoute>
                            <Feed />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="search"
                        element={
                          <ProtectedRoute>
                            <SearchPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="profile/:userId"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="settings"
                        element={
                          <ProtectedRoute>
                            <UserSettings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="group"
                        element={
                          <ProtectedRoute>
                            <Group />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="group/:groupId"
                        element={
                          <ProtectedRoute>
                            <Group />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="groupSettings/:groupId"
                        element={
                          <ProtectedRoute>
                            <GroupSettings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="register"
                        element={
                          <NoAuthRoute>
                            <Register />
                          </NoAuthRoute>
                        }
                      />
                      <Route
                        path="recover/:token"
                        element={<PasswordRecoveryPage />}
                      />

                      <Route
                        path="login"
                        element={
                          <NoAuthRoute>
                            <LoginPage />
                          </NoAuthRoute>
                        }
                      />
                      <Route
                        path="*"
                        element={<Navigate to="/feed" replace />}
                      />
                    </Routes>
                  </BackGround>
                </Router>

                <FooterBar />
              </ChatProvider>
            </SearchProvider>
          </UserProvider>
        </LoggedInProvider>
      </ThemeProvider>
    </>
  );
}

export default RouterControler;
