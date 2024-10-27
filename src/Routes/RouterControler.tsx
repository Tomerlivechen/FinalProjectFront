import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
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
                        path="Feed"
                        element={
                          <ProtectedRoute>
                            <Feed />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Feed/:postId"
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
                        path="Profile/:userId"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Settings"
                        element={
                          <ProtectedRoute>
                            <UserSettings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Group"
                        element={
                          <ProtectedRoute>
                            <Group />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Group/:groupId"
                        element={
                          <ProtectedRoute>
                            <Group />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="GroupSettings/:groupId"
                        element={
                          <ProtectedRoute>
                            <GroupSettings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="Register"
                        element={
                          <NoAuthRoute>
                            <Register />
                          </NoAuthRoute>
                        }
                      />
                      <Route
                        path="Recover/:token"
                        element={<PasswordRecoveryPage />}
                      />
                      <Route
                        path="Login"
                        element={
                          <NoAuthRoute>
                            <LoginPage />
                          </NoAuthRoute>
                        }
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
