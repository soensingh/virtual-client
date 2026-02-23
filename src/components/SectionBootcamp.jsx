import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import SpotlightCard from "./SpotlightCard";
import styles from "./SectionBootcamp.module.css";
import bootcampImg1 from "../assets/images/bootcamp_img/bootcam1.jpg.jpeg";
import bootcampImg2 from "../assets/images/bootcamp_img/bootcam2.jpg.jpeg";
import bootcampImg3 from "../assets/images/bootcamp_img/bootcam3.jpg.jpeg";
import bootcampImg4 from "../assets/images/bootcamp_img/bootcam4.jpg.jpeg";
import bootcampImg5 from "../assets/images/bootcamp_img/bootcam5.jpg.jpeg";

const bootcamps = [
  {
    title: "CYBER-SMART",
    subtitle: "Master Digital Safety in 9 Days",
    duration: "9 Days",
    image: bootcampImg1,
    topics: [
      "Password Security",
      "Two-Factor Authentication",
      "Phishing & Online Scams",
      "UPI & Payment Safety",
      "Social Media Privacy",
      "WiFi & Network Security",
      "Mobile Security",
      "Data Backup & Ransomware",
      "Digital Hygiene Plan",
      "Safe Browsing Habits"
    ],
    roadmap: [
      "Day 1: Password Security",
      "Day 2: 2FA & MFA",
      "Day 3: Phishing & Scams",
      "Day 4: UPI Safety",
      "Day 5: Social Media Privacy",
      "Day 6: WiFi Security",
      "Day 7: Mobile Permissions",
      "Day 8: Data Backup",
      "Day 9: Action Plan"
    ]
  },
  {
    title: "DECODE E-INDIA",
    subtitle: "9 Digital Systems Every Indian Should Know",
    duration: "9 Days",
    image: bootcampImg2,
    topics: [
      "India’s Digital Systems",
      "UPI, Aadhaar, FASTag, ONDC",
      "Govt Services Access",
      "Cybercrime Reporting",
      "SWAYAM Learning Platform",
      "DigiLocker Usage",
      "UMANG App Services",
      "Digital Health ID (ABHA)",
      "Digital Rupee (e₹)",
      "Bharat Bill Payment System"
    ],
    roadmap: [
      "Day 1: UPI Revolution",
      "Day 2: Aadhaar Ecosystem",
      "Day 3: FASTag Tech",
      "Day 4: ONDC Commerce",
      "Day 5: Digital Health (ABDM)",
      "Day 6: Cybercrime (I4C)",
      "Day 7: Bill Payments (BBPS)",
      "Day 8: Digital Infra",
      "Day 9: SWAYAM Education"
    ]
  },
  {
    title: "CREATOR’S LAB",
    subtitle: "Master Photoshop & Design Theory",
    duration: "9 Days",
    image: bootcampImg3,
    topics: [
      "Photoshop Interface & Tools",
      "Layers, Masks, Blending",
      "Color Theory & Typography",
      "Retouching & Manipulation",
      "Portfolio Building",
      "Smart Objects & Filters",
      "Pen Tool Mastery",
      "Composition Rules",
      "Exporting for Web/Print",
      "AI Generative Fill"
    ],
    roadmap: [
      "Day 1: Photoshop Foundation",
      "Day 2: Selections & Masking",
      "Day 3: Color Theory",
      "Day 4: Typography Mastery",
      "Day 5: Photo Retouching",
      "Day 6: Design Principles",
      "Day 7: Social Media Graphics",
      "Day 8: Logo Identity",
      "Day 9: Portfolio Showcase"
    ]
  },
  {
    title: "THE SKILLS 2026",
    subtitle: "Master Creative & Professional Ways",
    duration: "9 Days",
    image: bootcampImg4,
    topics: [
      "Professional Comm.",
      "Problem Solving (STAR)",
      "Project Management",
      "AI Productivity Tools",
      "Emotional Intelligence",
      "Critical Thinking",
      "Data Visualization",
      "Adaptability & Agility",
      "Networking Skills",
      "Time Management Hacks"
    ],
    roadmap: [
      "Day 1: Communication Skills",
      "Day 2: Digital Workplace",
      "Day 3: Excel & Data",
      "Day 4: Problem Solving",
      "Day 5: Project Management",
      "Day 6: Collaboration",
      "Day 7: AI & Automation",
      "Day 8: Emotional Intelligence",
      "Day 9: Personal Branding"
    ]
  },
  {
    title: "AI THAT UNDERSTANDS",
    subtitle: "Growth through Generative AI",
    duration: "9 Days",
    image: bootcampImg5,
    topics: [
      "Generative AI Basics",
      "Prompt Engineering",
      "AI for Research & Writing",
      "Visual Creativity Tools",
      "Automation Workflows",
      "Ethics in AI Usage",
      "Custom GPT Creation",
      "AI in Excel/Sheets",
      "Voice Synthesis Tools",
      "Future of Work with AI"
    ],
    roadmap: [
      "Day 1: AI Demystified",
      "Day 2: Prompt Engineering",
      "Day 3: Learning & Research",
      "Day 4: Writing Assistant",
      "Day 5: Visual Creativity",
      "Day 6: Content Creation",
      "Day 7: Voice & Video",
      "Day 8: Automation",
      "Day 9: Your AI Future"
    ]
  }
];

const SectionBootcamp = () => {
  const navigate = useNavigate();
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [trackIndex, setTrackIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchActiveRef = useRef(false);
  const trackIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const cyberSmartSyllabus = `CYBER-SMART: 9 DAYS BOOTCAMP
Master Digital Safety in 9 Days

Topics Covered:
1. Password Security
2. Two-Factor Authentication (2FA)
3. Phishing & Online Scams
4. UPI & Online Payment Safety
5. Social Media Privacy
6. WiFi & Network Security
7. Mobile Security & App Permissions
8. Data Backup & Ransomware Protection
9. Digital Hygiene & Personal Security Plan

DAY 1: Password Security
Topic: Your First Line of Defense

Key Learning:
• Why weak passwords fail
• Creating strong passwords & passphrases
• Password managers setup
• Basic 2FA introduction

Practical Task: Change 3 weak passwords, install password manager

DAY 2: Two-Factor Authentication (2FA)
Topic: Double Lock Your Digital Life

Key Learning:
• Understanding 2FA/MFA
• SMS vs App-based vs Hardware keys
• Setting up Google Authenticator/Authy
• Account recovery best practices

Practical Task: Enable 2FA on Gmail, WhatsApp, Banking app

DAY 3: Phishing & Scams
Topic: Don't Take the Bait

Key Learning:
• Identifying phishing emails/messages
• Social engineering tactics
• Red flags to watch for
• What to do if you click a phishing link

Practical Task: Phishing email identification quiz, audit inbox

DAY 4: UPI & Online Payment Safety
Topic: Protect Your Money Online

Key Learning:
• UPI scams (fake screenshots, refund frauds)
• Safe online banking practices
• What never to share (PIN, OTP, CVV)
• E-commerce safety tips

Practical Task: Enable transaction alerts, verify linked accounts

DAY 5: Social Media Privacy
Topic: Control What the World Sees

Key Learning:
• Privacy settings (Instagram, Facebook, LinkedIn)
• Digital footprint management
• What NOT to share online
• Managing your online reputation

Practical Task: Privacy audit on one platform, Google yourself

DAY 6: WiFi & Network Security
Topic: Your Network, Your Fortress

Key Learning:
• Home WiFi security (router passwords, encryption)
• Public WiFi dangers
• VPN basics and setup
• Safe browsing practices

Practical Task: Change WiFi password, install VPN app

DAY 7: Mobile Security & App Permissions
Topic: Your Phone Knows Everything

Key Learning:
• Mobile security settings (screen lock, Find My Device)
• App permissions audit
• Identifying dangerous apps
• Safe app installation practices

Practical Task: Review & revoke app permissions, delete unused apps

DAY 8: Data Backup & Ransomware
Topic: Don't Lose What Matters

Key Learning:
• 3-2-1 backup rule
• Cloud vs local backups
• Understanding ransomware threats
• Antivirus setup and scanning

Practical Task: Set up automatic backup, run antivirus scan

DAY 9: Digital Hygiene & Action Plan
Topic: Putting It All Together

Key Learning:
• Privacy-focused tools (browsers, search engines)
• Daily/weekly/monthly security habits
• Staying updated on threats
• Creating personal security plan`;

  const decodeIndiaySyllabus = `DECODE E-INDIA: BOOT-CAMP
9 Days 9 Digital Systems Every Indian Should Know

In this 9-day bootcamp, students will:
• Understand how India's key digital systems actually work in real life
• Use UPI, Aadhaar, FASTag, ONDC, and Digital Health platforms confidently and safely
• Learn to access government and citizen services digitally instead of relying on middlemen
• Gain awareness of cybercrime reporting, bill payments, and data infrastructure
• Explore free national learning platforms like SWAYAM for skill and career growth
• Become informed, responsible, and secure digital citizens of India

DAY 1: UPI
Hook: Payment revolution story (3 mins)
Learn: How UPI works, hidden features, international UPI (15 mins)
Demo: UPI Lite, AutoPay, multiple IDs (12 mins)
Do: Create new UPI ID, set limits, check history (10 mins)
Quiz: UPI myths vs facts (5 mins)
Takeaway: Safety checklist + feature guide

DAY 2: AADHAAR
Hook: Life before Aadhaar story (3 mins)
Learn: Aadhaar ecosystem, VID, linked services (15 mins)
Demo: mAadhaar app, DigiLocker, e-Aadhaar download (12 mins)
Do: Generate VID, download e-Aadhaar, check linkages (10 mins)
Quiz: Aadhaar security quiz (5 mins)
Takeaway: Privacy & security checklist

DAY 3: FASTag
Hook: Toll plaza chaos vs smooth flow (3 mins)
Learn: RFID tech, coverage, beyond tolls (15 mins)
Demo: Bank app integration, recharge, balance check (12 mins)
Do: Check FASTag status, explore issuer app, set alerts (10 mins)
Quiz: FASTag troubleshooting scenarios (5 mins)
Takeaway: Issue resolution guide

DAY 4: ONDC
Hook: Breaking e-commerce monopoly story (3 mins)
Learn: Open network concept, seller benefits, future (15 mins)
Demo: ONDC apps walkthrough, local store ordering (12 mins)
Do: Download ONDC app, browse local sellers, compare (10 mins)
Quiz: ONDC vs traditional e-commerce (5 mins)
Takeaway: ONDC app list + shopping guide

DAY 5: Digital Health Stack (ABDM)
Hook: Emergency health records story (3 mins)
Learn: ABHA system, health locker, privacy control (15 mins)
Demo: Create ABHA, e-Sanjeevani telemedicine (12 mins)
Do: Generate ABHA number, upload document, link CoWIN (10 mins)
Quiz: Health data privacy quiz (5 mins)
Takeaway: ABHA setup + health apps list

DAY 6: I4C (Cybercrime)
Hook: Cybercrime recovery success story (3 mins)
Learn: I4C structure, common cybercrimes, helplines (15 mins)
Demo: cybercrime.gov.in complaint filing process (12 mins)
Do: Save 1930 helpline, explore portal, Sanchar Saathi (10 mins)
Quiz: Spot the cybercrime scenario (5 mins)
Takeaway: Emergency contacts + reporting guide

DAY 7: BBPS
Hook: Bill payment evolution journey (3 mins)
Learn: BBPS ecosystem, bill categories, autopay (15 mins)
Demo: Add biller across platforms, payment process (12 mins)
Do: Link one biller, set reminder, explore autopay (10 mins)
Quiz: BBPS features challenge (5 mins)
Takeaway: Biller list + autopay setup guide

DAY 8: Data Centers
Hook: Virtual data center tour video (3 mins)
Learn: Digital infrastructure, India Stack, BharatNet (15 mins)
Demo: MeghRaj, NKN portals, CSC locator (12 mins)
Do: Find nearest CSC, explore digital infrastructure map (10 mins)
Quiz: Infrastructure impact quiz (5 mins)
Takeaway: Digital India infrastructure map

DAY 9: SWAYAM
Hook: Free IIT education story (3 mins)
Learn: Platform overview, courses, certification value (15 mins)
Demo: Account creation, course enrollment, navigation (12 mins)
Do: Create account, enroll in course, watch first lecture (10 mins)
Quiz: Final bootcamp quiz - all 9 systems (5 mins)
Takeaway: Top courses list + certificate`;

  const creatorsLabSyllabus = `CREATOR'S LAB: Design Edition Bootcamp
Master Photoshop, Design Theory, Build Stunning Portfolios

PHOTOSHOP SKILLS:
✅ Interface navigation & workspace setup
✅ Essential tools & shortcuts
✅ Layers, masks & blend modes
✅ Selections & precise cutouts
✅ Photo retouching & manipulation
✅ Text effects & typography
✅ Color correction & grading
✅ Filters & creative effects
✅ Export formats & optimization

DESIGN THEORY:
✅ Color theory & psychology
✅ Typography principles & pairing
✅ Composition & visual hierarchy
✅ Balance, contrast & alignment
✅ White space usage
✅ Grid systems
✅ Brand identity basics
✅ Design trends vs timeless principles

PORTFOLIO PROJECTS:
✅ Social media graphics (Instagram/LinkedIn)
✅ Poster/flyer design
✅ Logo design fundamentals
✅ Photo manipulation artwork
✅ Portfolio presentation on Behance

PROFESSIONAL SKILLS:
✅ Creating design templates
✅ Client-ready file preparation
✅ Portfolio building & presentation
✅ Design storytelling
✅ Resource management

PRECISE DAY-BY-DAY ROADMAP

DAY 1: Photoshop Foundation
What You'll Learn:
• Photoshop interface & workspace
• Layers system
• Essential tools (move, selection, brush)
• Saving & file formats
• Basic shortcuts

What You'll Create:
• Simple photo edit
• Layered composition
• Meme/fun graphic

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 2: Selections & Masking
What You'll Learn:
• Selection tools (lasso, magic wand, quick selection)
• Pen tool basics
• Layer masks
• Refine edge/Select & Mask
• Background removal

What You'll Create:
• Clean cutout images
• Photo composite
• Background replacement project

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 3: Color Theory & Correction
What You'll Learn:
• Color wheel & relationships
• Color psychology
• Adjustment layers (curves, levels, hue/saturation)
• Color grading techniques
• Creating color palettes

What You'll Create:
• Color-corrected photo
• 3 mood variations of same image
• Brand color palette

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 4: Typography Mastery
What You'll Learn:
• Font types & psychology
• Font pairing rules
• Text hierarchy
• Text effects (shadows, strokes, 3D)
• Readability principles

What You'll Create:
• Movie poster typography
• Quote graphic
• Typographic poster

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 5: Photo Retouching
What You'll Learn:
• Healing & clone tools
• Frequency separation
• Dodge & burn
• Liquify tool
• Natural retouching ethics

What You'll Create:
• Retouched portrait
• Before/after showcase
• Professional headshot edit

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 6: Composition & Design Principles
What You'll Learn:
• Rule of thirds
• Visual hierarchy
• Balance & contrast
• White space
• Grid systems
• Gestalt principles

What You'll Create:
• Redesigned poster
• Composition study
• Instagram grid layout

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 7: Social Media Graphics
What You'll Learn:
• Platform sizes & specs
• Template creation
• Brand consistency
• Viral design elements
• Carousel/story design

What You'll Create:
• Instagram post (3 variations)
• Story template
• Carousel design (3 slides)

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 8: Logo & Brand Identity
What You'll Learn:
• Logo types
• Simplicity & scalability
• Brand color application
• Negative space usage
• File formats for logos

What You'll Create:
• Simple logo design
• 3 logo variations
• Brand identity mockup

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Hands-on: 15 mins
• Practice: 5 mins

DAY 9: Portfolio & Showcase
What You'll Learn:
• Portfolio essentials
• Case study format
• Behance/Dribbble setup
• Mockup presentation
• Design storytelling

What You'll Create:
• Portfolio upload (3 pieces)
• One case study
• Final showcase presentation

Time Breakdown:
• Hook: 5 mins
• Teaching: 20 mins
• Showcase: 15 mins
• Wrap-up: 5 mins`;

  const theSkills2026Syllabus = `THE SKILLS: Hiring Managers Can't Ignore in 2026
Master Creative & Professional Ways in 9 Days

Communication
• Professional emails
• Clear speaking & presentations
• Elevator pitch

Problem Solving
• Structured thinking (STAR)
• Case analysis
• Decision making
• Root-cause thinking

Project Skills
• Task prioritization
• PM tools (Trello, Notion, Asana)
• Timelines & milestones
• Progress reporting

AI & Automation
• AI tools for productivity
• Canva basics
• Simple automations

Digital Skills
• Google Workspace & Microsoft 365
• Slack / Teams collaboration
• Remote meeting etiquette
• Cloud file handling

Emotional Intelligence
• Self-awareness
• Body language
• Workplace conversations

Personal Branding
• LinkedIn profile
• Resume storytelling
• Interview readiness
• Portfolio basics

BECOME THE BETTER VERSION OF YOURSELF

DAY 1: Communication Skills
Learn: Email etiquette, presentation basics, elevator pitch
Practice: Write professional email, record intro pitch
Deliverable: Email template bank

DAY 2: Digital Workplace Tools
Learn: Google/Microsoft tools, Slack, Zoom professionalism
Practice: Set up workspace, run mock meeting
Deliverable: Digital workspace guide

DAY 3: Excel & Data Skills
Learn: VLOOKUP, PivotTables, charts, dashboards
Practice: Analyze dataset, create visual report
Deliverable: Data analysis project

DAY 4: Problem-Solving
Learn: STAR method, case studies, decision frameworks
Practice: Solve business cases, root cause analysis
Deliverable: Problem-solving examples

DAY 5: Project Management
Learn: PM tools, Gantt charts, task breakdown
Practice: Plan mock project, create timeline
Deliverable: Project plan template

DAY 6: Collaboration & Remote Work
Learn: Virtual teamwork, feedback, conflict resolution
Practice: Group challenge, peer feedback session
Deliverable: Collaboration playbook

DAY 7: AI & Automation
Learn: ChatGPT/Claude, Canva, Zapier, productivity tools
Practice: Automate task, create AI-assisted content
Deliverable: Personal AI toolkit

DAY 8: Emotional Intelligence
Learn: EQ fundamentals, body language, difficult conversations
Practice: EQ assessment, mock conversation
Deliverable: Personal development plan

DAY 9: Personal Branding & Interviews
Learn: LinkedIn optimization, resume storytelling, STAR responses
Practice: Update LinkedIn, create interview stories
Deliverable: Professional brand package`;

  const aiThatUnderstandsSyllabus = `AI That Understands You: Without Being A Tech Expert
Groundbreaking Growth through Generative AI

DAY 1: AI Demystified
Hook: "AI wrote this—can you tell?" + mind-blowing AI examples
Learn: AI vs ML vs Generative AI, ChatGPT/Claude basics, myths busted
Hands-On: First conversation with AI, compare responses, make AI say something weird
Takeaway: AI tools comparison chart
Deliverable: Screenshot of your first AI conversation

DAY 2: Prompt Engineering
Hook: Bad vs good prompts demo
Learn: Good prompt structure, frameworks (ROLE-TASK-FORMAT), follow-ups, templates
Hands-On: Rewrite prompts, create your own, start a prompt library
Takeaway: Prompt cheat sheet
Deliverable: 10 personalized prompt templates

DAY 3: AI for Learning & Research
Hook: Learn anything in hours demo
Learn: AI as tutor, research & summarization, fact-checking, study material creation
Hands-On: Learn a topic, summarize article, generate quizzes/notes
Takeaway: Learning prompts collection
Deliverable: AI-assisted learning plan for one skill

DAY 4: AI Writing Assistant
Hook: AI-assisted writing vs human writing demo
Learn: Emails, reports, editing, tone adjustment, avoid AI-sounding text
Hands-On: Write email, report outline, rewrite content for audiences, polish writing
Takeaway: Writing prompts & email templates
Deliverable: 5 polished writing samples

DAY 5: AI for Visual Creativity
Hook: AI art showcase + text-to-image demo
Learn: DALL-E, Mid-Journey, effective image prompts, design tools, ethics
Hands-On: Generate images, social media graphics, experiment with styles
Takeaway: Image prompt formulas, free AI tools list
Deliverable: Portfolio of 10 AI-generated images

DAY 6: AI Content Creation
Hook: Viral content + "30 days in 30 minutes" demo
Learn: Social media captions, content calendar, video/blog scripts, marketing copy
Hands-On: Create weekly posts, blog outline, video script, content calendar
Takeaway: Templates & platform tips
Deliverable: 7-day content calendar

DAY 7: AI Voice, Audio & Video Tools
Hook: AI voice & video demo
Learn: TTS, voice cloning ethics, AI music, video editing, podcast, translation
Hands-On: Convert text to speech, AI music clip, video/audio editing
Takeaway: AI audio/video tools directory
Deliverable: One AI-enhanced audio/video piece

DAY 8: AI Automation & Workflows
Hook: "Automated my morning routine" story
Learn: Custom GPTs, AI workflow integration, Zapier combos, AI assistants
Hands-On: Build custom GPT, automate task, set reminders
Takeaway: Automation ideas, workflow templates
Deliverable: One AI assistant/workflow

DAY 9: Your AI Future
Hook: AI timeline + jobs transformed
Learn: Personal AI toolkit, staying updated, AI ethics, privacy, career paths
Hands-On: Personal AI strategy, AI tools bookmarks, newsletter setup, final showcase
Takeaway: AI resources list, 30-day learning challenge
Deliverable: Personal AI mastery roadmap + portfolio`;

  const getSyllabus = (bootcampTitle) => {
    if (bootcampTitle.includes("CYBER-SMART")) return cyberSmartSyllabus;
    if (bootcampTitle.includes("DECODE E-INDIA")) return decodeIndiaySyllabus;
    if (bootcampTitle.includes("CREATOR")) return creatorsLabSyllabus;
    if (bootcampTitle.includes("SKILLS")) return theSkills2026Syllabus;
    if (bootcampTitle.includes("AI THAT UNDERSTANDS")) return aiThatUnderstandsSyllabus;
    return 'Full syllabus coming soon...';
  };

  const handleOpenBootcamp = (bootcamp) => {
    sessionStorage.setItem("landingReturnSection", "bootcamp");
    navigate(`/bootcamp/${bootcamp.title.replace(/\s+/g, '-').toLowerCase()}`, {
      state: {
        bootcamp: bootcamp,
        syllabus: getSyllabus(bootcamp.title)
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(1);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageCount = Math.ceil(bootcamps.length / cardsPerPage);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const suppressAnimRef = useRef(false);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < bootcamps.length; i += cardsPerPage) {
      chunks.push(bootcamps.slice(i, i + cardsPerPage));
    }
    return chunks;
  }, [cardsPerPage]); // Re-chunk when cardsPerPage changes

  const extendedPages = useMemo(() => {
    if (pageCount <= 1) return pages;
    return [pages[pageCount - 1], ...pages, pages[0]];
  }, [pageCount, pages]);

  useEffect(() => {
    // Reset or adjust index when layout changes
    suppressAnimRef.current = true;
    setTrackIndex(pageCount > 1 ? 1 : 0);
    setPageIndex(0);
  }, [pageCount]); // Triggered when cardsPerPage changes (via pageCount)


  const getPageIndexForTrack = (nextTrackIndex) => {
    if (pageCount <= 1) return 0;
    return (nextTrackIndex - 1 + pageCount) % pageCount;
  };

  const goToTrack = (nextTrackIndex) => {
    if (pageCount <= 1) return;
    if (isAnimatingRef.current) return;

    let safeIndex = nextTrackIndex;
    if (safeIndex < 0) safeIndex = pageCount;
    if (safeIndex > pageCount + 1) safeIndex = 1;

    setPageIndex(getPageIndexForTrack(safeIndex));
    setTrackIndex(safeIndex);
  };

  useEffect(() => {
    if (!trackRef.current) return;
    if (suppressAnimRef.current) {
      gsap.set(trackRef.current, { xPercent: -trackIndex * 100 });
      suppressAnimRef.current = false;
      return;
    }

    if (tweenRef.current) tweenRef.current.kill();
    isAnimatingRef.current = true;
    setIsAnimating(true);
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -trackIndex * 100,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
        if (pageCount <= 1) return;
        if (trackIndex === 0) {
          suppressAnimRef.current = true;
          goToTrack(pageCount);
        } else if (trackIndex === pageCount + 1) {
          suppressAnimRef.current = true;
          goToTrack(1);
        }
      },
    });
  }, [trackIndex, pageCount]);

  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = setInterval(() => {
      goToTrack(trackIndexRef.current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [pageCount, trackIndex]);

  const jumpToIndex = (index) => {
    if (pageCount <= 1) return;
    goToTrack(index + 1);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchActiveRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!touchActiveRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    // Only prevent scroll if it's clearly a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchActiveRef.current) return;
    touchActiveRef.current = false;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    
    // Only trigger slide if it's a clear horizontal swipe
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

    if (deltaX < 0) {
      goToTrack(trackIndex + 1);
    } else {
      goToTrack(trackIndex - 1);
    }
  };

  return (
    <section className={styles.bootcampSection}>
      <div className={styles.header}>
        <p className={styles.kicker}>9-Day Intensive Bootcamps</p>
        <h2 className={styles.title}>
          Master New Skills in Just <span>9 Days</span>
        </h2>
        <p className={styles.subtitle}>
          Fast-track your growth with our specialized, high-impact short courses designed for immediate results.
        </p>
      </div>

      <div
        className={styles.sliderWrapper}
        onWheel={cardsPerPage > 1 ? (e) => {
          if (Math.abs(e.deltaY) < 5) return;
          if (e.deltaY > 0) {
            goToTrack(trackIndex + 1);
          } else {
            goToTrack(trackIndex - 1);
          }
        } : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className={styles.sliderTrack}
        >
          {extendedPages.map((page, pageIdx) => {
            const realIndex = pageCount > 1
              ? (pageIdx - 1 + pageCount) % pageCount
              : pageIdx;
            const isActive = realIndex === pageIndex;
            return (
            <div
              className={`${styles.sliderPage} ${page.length === 1 ? styles.sliderPageSingle : ""} ${isActive ? styles.sliderPageActive : styles.sliderPageInactive}`}
              key={`page-${pageIdx}`}
            >
              <div className={styles.grid}>
                {page.map((item) => (
                  <SpotlightCard
                    key={item.title}
                    className={styles.card}
                    spotlightColor="rgba(138, 56, 245, 0.25)"
                  >
                    <div className={styles.cardInner}>
                    <div className={styles.cardImageWrap}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <div className={styles.headerText}>
                          <h3>{item.title}</h3>
                          <p className={styles.cardSubtitle}>{item.subtitle}</p>
                        </div>
                        <span className={styles.duration}>{item.duration}</span>
                      </div>
                      
                      <div className={styles.cardColumns}>
                        <div className={styles.topicsContainer}>
                          <h4 className={styles.sectionLabel}>Key Topics</h4>
                          {cardsPerPage === 1 ? (
                            <p className={styles.keyPointsParagraph}>
                              {item.topics.slice(0, 6).join(" • ")}
                            </p>
                          ) : (
                            <ul className={styles.list}>
                              {item.topics
                                .slice(0, 4)
                                .map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className={styles.roadmapContainer}>
                          <h4 className={styles.sectionLabel}>9-Day Roadmap</h4>
                          <ul className={styles.roadmapList}>
                            {item.roadmap.slice(0, cardsPerPage === 1 ? 5 : 5).map((day, i) => (
                              <li key={i} className={styles.roadmapItem}>
                                <span className={styles.dot}></span>
                                {day}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button 
                        className={styles.cta} 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBootcamp(item);
                        }}
                      >
                        View Full Syllabus
                      </button>
                    </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Bootcamp pages">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dotBtn} ${index === pageIndex ? styles.dotActive : ""}`}
            onClick={() => jumpToIndex(index)}
            aria-label={`Show bootcamp page ${index + 1}`}
            aria-pressed={index === pageIndex}
          />
        ))}
      </div>

      <p className={styles.cardHint}>Click for more details</p>
    </section>
  );
};

export default SectionBootcamp;
