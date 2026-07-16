import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Render } from "@puckeditor/core";
import { config } from "./puck.config";
import AdminEditor, { initialData } from "./AdminEditor";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import CoursesPage from "./components/CoursesPage";
import CourseDetailPage from "./components/CourseDetailPage";
import SubjectsPage from "./components/SubjectsPage";

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

      {/* Floating admin trigger button */}
      <Link 
        to="/admin" 
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#0d9488",
          color: "white",
          padding: "12px 20px",
          borderRadius: "30px",
          fontWeight: "600",
          fontSize: "0.9rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 99999,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.2s ease, background-color 0.2s ease",
          fontFamily: "Inter, sans-serif"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = "#0f766e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#0d9488";
        }}
      >
        <span>✏️</span> Edit Website
      </Link>
    </div>
  );
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
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        {/* Redirect unknown routes back to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;