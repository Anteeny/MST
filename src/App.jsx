import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Render } from "@puckeditor/core";
import { config } from "./puck.config";
import AdminEditor, { initialData } from "./AdminEditor";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import CoursesPage from "./components/CoursesPage";
import CourseDetailPage from "./components/CourseDetailPage";
import SubjectsPage from "./components/SubjectsPage";
import AboutUsPage from "./components/AboutUsPage";

function HomeView() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const savedData = localStorage.getItem("puck-layout");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed && parsed.content && parsed.content.length > 0) {
          // Migration: if any Partners block has the old text-based partners, remove it to fallback to new logo list
          parsed.content = parsed.content.map(block => {
            if (block.type === "Partners" && block.props && block.props.partners) {
              const hasLogo = block.props.partners.some(p => p.logoUrl);
              if (!hasLogo) {
                const { partners, ...restProps } = block.props;
                return { ...block, props: restProps };
              } else {
                const filteredPartners = block.props.partners.filter(p => p.name !== "FIPCFA");
                return {
                  ...block,
                  props: {
                    ...block.props,
                    partners: filteredPartners
                  }
                };
              }
            }
            return block;
          });
          setData(parsed);
        }
      } catch (e) {
        console.error("Error loading saved layout", e);
      }
    }
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Standalone production website view */}
      <Render config={config} data={data} />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (active) {
        setSession(currentSession);
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (active) {
        setSession(currentSession);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#0d9488' }}>
        <h3>Loading session...</h3>
      </div>
    );
  }

  if (!session) {
    const target = window.location.pathname + window.location.search;
    return <Navigate to={`/sign-in?redirectTo=${encodeURIComponent(target)}`} replace />;
  }

  return children;
}

function App() {
  // Support legacy '?edit=true' links by redirecting them to '/admin' automatically
  useEffect(() => {
    if (window.location.search.includes("edit=true")) {
      window.history.replaceState({}, "", "/admin");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminEditor />} />
        <Route path="/sign-in" element={<AuthPage defaultMode="signin" />} />
        <Route path="/register" element={<AuthPage defaultMode="register" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses/:id" 
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subjects" 
          element={
            <ProtectedRoute>
              <SubjectsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        {/* Redirect unknown routes back to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;