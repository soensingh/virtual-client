import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));
const CoursePage = lazy(() => import("./pages/CoursePage.jsx"));
const BootcampPage = lazy(() => import("./pages/BootcampPage.jsx"));
const BookNowPage = lazy(() => import("./pages/BookNowPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage.jsx"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage.jsx"));

const SITE_NAME = "TechCadd Virtual Academy";

const upsertMeta = (key, content, attr = "name") => {
  if (!content) return;
  const selector = `meta[${attr}='${key}']`;
  let meta = document.head.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  if (!href) return;
  let canonical = document.head.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", href);
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";
    const origin = window.location.origin;
    const url = `${origin}${pathname}`;

    const defaults = {
      title: "Virtual Academy by TechCadd | Online Career-Focused Training",
      description:
        "Virtual Academy by TechCadd offers 1-on-1 online training, industry-focused courses, bootcamps, and career support for students and professionals.",
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    };

    const routeSeo = {
      "/": {
        title: "Virtual Academy by TechCadd | Online Career-Focused Training",
        description:
          "Join Virtual Academy by TechCadd for personalized 1-on-1 training, bootcamps, and industry-ready courses with mentor support.",
      },
      "/book-now": {
        title: "Book Free Demo Class | Virtual Academy by TechCadd",
        description:
          "Book your free demo class at Virtual Academy by TechCadd and explore career-focused online courses and bootcamps.",
      },
      "/privacy-policy": {
        title: "Privacy Policy | TechCadd Virtual Academy",
        description:
          "Read the Privacy Policy for TechCadd Virtual Academy to understand data collection, usage, and protection practices.",
      },
      "/terms-and-conditions": {
        title: "Terms & Conditions | TechCadd Virtual Academy",
        description:
          "Read the Terms & Conditions governing the use of TechCadd Virtual Academy courses, services, and website.",
      },
      "/refund-policy": {
        title: "Refund Policy | TechCadd Virtual Academy",
        description:
          "Read the Refund Policy of TechCadd Virtual Academy for eligibility, process, and timelines.",
      },
      "/admin": {
        title: "Admin | TechCadd Virtual Academy",
        description: "Admin access page for TechCadd Virtual Academy.",
        robots: "noindex, nofollow",
      },
    };

    const isCourseRoute = pathname.startsWith("/course/");
    const isBootcampRoute = pathname.startsWith("/bootcamp/");

    const dynamicTitle = isCourseRoute
      ? "Course Details | TechCadd Virtual Academy"
      : isBootcampRoute
        ? "Bootcamp Details | TechCadd Virtual Academy"
        : null;

    const dynamicDescription = isCourseRoute
      ? "Explore detailed curriculum, pricing, and enrollment for this TechCadd Virtual Academy course."
      : isBootcampRoute
        ? "Explore complete roadmap and enrollment details for this TechCadd Virtual Academy bootcamp."
        : null;

    const seo = routeSeo[pathname] || {
      title: dynamicTitle || defaults.title,
      description: dynamicDescription || defaults.description,
      robots: defaults.robots,
    };

    document.title = seo.title;
    upsertCanonical(url);

    upsertMeta("description", seo.description);
    upsertMeta("robots", seo.robots || defaults.robots);

    upsertMeta("og:type", "website", "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:title", seo.title, "property");
    upsertMeta("og:description", seo.description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:image", `${origin}/favicon.ico`, "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", seo.title);
    upsertMeta("twitter:description", seo.description);
    upsertMeta("twitter:image", `${origin}/favicon.ico`);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <SeoManager />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#000" }} />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/bootcamp/:id" element={<BootcampPage />} />
          <Route path="/book-now" element={<BookNowPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;