
import styles from "./SectionSeven.module.css";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import courseImg1 from "../assets/images/course_img/virtual 1.png";
import courseImg2 from "../assets/images/course_img/virtual 2.png";
import courseImg3 from "../assets/images/course_img/virtual 3.png";
import courseImg4 from "../assets/images/course_img/virtual 4.png";
import courseImg5 from "../assets/images/course_img/virtual 5.png";
import courseImg6 from "../assets/images/course_img/virtual 6.png";
import courseImg7 from "../assets/images/course_img/virtual 7.png";
import courseImg8 from "../assets/images/course_img/virtual 8.png";
import courseImg9 from "../assets/images/course_img/virtual 9.png";
import courseImg10 from "../assets/images/course_img/virtual 10.jpeg";

const EarthSphere = () => {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const earthPosition = [3.2, -3.1, -2.2];
  const [dayMap, specularMap, bumpRoughnessMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      new URL("../assets/texture/earth_day_4096.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_specular_2048.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_bump_roughness_clouds_4096.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_clouds_1024.png", import.meta.url).href,
    ]
  );

  dayMap.colorSpace = THREE.SRGBColorSpace;
  specularMap.colorSpace = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;
  dayMap.anisotropy = 8;
  specularMap.anisotropy = 8;
  bumpRoughnessMap.anisotropy = 8;
  cloudsMap.anisotropy = 8;

  useFrame((_, delta) => {
    if (!earthRef.current) return;
    earthRef.current.rotation.y += delta * 0.06;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={earthRef} position={earthPosition}>
        <sphereGeometry args={[4.6, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          bumpMap={bumpRoughnessMap}
          bumpScale={0.06}
          roughnessMap={bumpRoughnessMap}
          metalnessMap={specularMap}
          metalness={0.05}
          roughness={0.65}
        />
      </mesh>
      <mesh ref={cloudsRef} position={earthPosition}>
        <sphereGeometry args={[4.74, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      <mesh position={earthPosition}>
        <sphereGeometry args={[4.9, 64, 64]} />
        <meshBasicMaterial
          color="#4db2ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const SectionSeven = () => {
  const navigate = useNavigate();
  const [centerIndex, setCenterIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const navUnlockTimerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchCurrentXRef = useRef(null);
  const touchMovedRef = useRef(false);
  const suppressTapUntilRef = useRef(0);

  const courseSyllabi = {
    1: `Week 1-2: Frontend Foundations
• HTML5 & CSS3 Essentials
  o Semantic HTML, Flexbox, Grid, Responsive design
  o Project: Build a responsive portfolio website
• JavaScript ES6+
  o Variables, functions, async/await, promises, DOM manipulation
  o Project: Interactive to-do list with local storage

Week 3-4: React.js
• React Fundamentals
  o Components, props, state, hooks (useState, useEffect, useContext)
  o React Router, form handling, API integration
  o Project: E-commerce product listing with cart functionality
• State Management
  o Context API basics, Redux Toolkit introduction
  o Project: Add Redux to e-commerce app

Week 5-6: Backend with Node.js & Express
• Node.js & Express
  o REST API design, middleware, error handling
  o Authentication with JWT, bcrypt for passwords
  o Project: Build REST API for blog/e-commerce backend
• MongoDB & Mongoose
  o CRUD operations, schema design, relationships
  o Project: Connect MongoDB to Express API

Week 7-8: Full Stack Integration & Deployment
• MERN Integration
  o Connect React frontend to Express backend
  o File uploads, image handling (Multer, Cloudinary)
  o Project: Complete full-stack MERN application
• Deployment & Best Practices
  o Deploy frontend (Vercel/Netlify), backend (Render/Railway)
  o Environment variables, Git/GitHub workflow
  o Final Project: Fully deployed MERN application`,

    2: `Week 1-2: Python for Data Science
• Python Fundamentals
  o NumPy for numerical computing, arrays, operations
  o Pandas for data manipulation (DataFrames, filtering, grouping, merging)
  o Project: Clean and analyze real-world dataset
• Data Visualization with Python
  o Matplotlib, Seaborn for charts and graphs
  o Project: Create dashboard visualizations from dataset

Week 3-4: Statistical Analysis & Machine Learning Basics
• Exploratory Data Analysis (EDA)
  o Descriptive statistics, correlation, distributions
  o Handling missing data, outliers
  o Project: Complete EDA report on retail/healthcare dataset
• Machine Learning Introduction
  o Scikit-learn basics: Linear regression, classification
  o Model evaluation (train-test split, accuracy, confusion matrix)
  o Project: Build predictive model (customer churn/house price prediction)

Week 5-6: Tableau
• Tableau Fundamentals
  o Connecting data sources, building visualizations
  o Calculated fields, parameters, filters
  o Project: Sales performance dashboard
• Advanced Tableau
  o Dashboard design best practices, storytelling with data
  o Publish to Tableau Public
  o Project: Interactive business intelligence dashboard

Week 7-8: Power BI & Capstone
• Power BI Essentials
  o Power Query for data transformation
  o DAX functions, relationships, measures
  o Project: HR analytics dashboard
• Advanced Power BI & Integration
  o Interactive reports, drill-through, bookmarks
  o Publish to Power BI Service
  o Capstone Project: End-to-end data analysis project with both Tableau and Power BI dashboards`,

    3: `Week 1-2: Cloud Fundamentals & AWS Basics
• Cloud Computing Concepts
  o IaaS, PaaS, SaaS models
  o Public vs private vs hybrid cloud
  o AWS global infrastructure, regions, availability zones
• AWS Core Services
  o IAM (users, groups, roles, policies)
  o EC2: Launch instances, security groups, key pairs
  o Project: Launch and configure a web server on EC2

Week 3-4: Storage & Databases
• AWS Storage
  o S3: Buckets, objects, versioning, lifecycle policies
  o EBS volumes for EC2
  o Project: Host static website on S3
• AWS Databases
  o RDS (MySQL/PostgreSQL), DynamoDB basics
  o Backup and recovery strategies
  o Project: Set up RDS database and connect to application

Week 5-6: Networking & Security
• AWS Networking
  o VPC, subnets, internet gateways, route tables
  o Security groups vs NACLs
  o Project: Design multi-tier VPC architecture
• Security & Compliance
  o AWS WAF, Shield, CloudTrail, Config
  o Encryption (at rest and in transit)
  o Project: Implement security best practices

Week 7-8: Advanced Services & Deployment
• Serverless & Containers
  o Lambda functions, API Gateway
  o ECS/Docker basics
  o Project: Build serverless REST API with Lambda
• DevOps & Monitoring
  o CloudFormation/Terraform basics, CI/CD with CodePipeline
  o CloudWatch monitoring, alarms, logs
  o Final Project: Deploy complete 3-tier application on AWS with monitoring and auto-scaling`,

    4: `Week 1-2: Security Fundamentals
• Core Concepts
  o CIA triad, authentication vs authorization
  o Common threats: malware, phishing, ransomware
  o OWASP Top 10 vulnerabilities
• Network Security Basics
  o Firewalls, IDS/IPS, VPN fundamentals
  o TCP/IP security, ports and protocols
  o Project: Set up basic firewall rules

Week 3-4: Ethical Hacking & Penetration Testing
• Reconnaissance & Scanning
  o Tools: Nmap, Wireshark, Burp Suite
  o Information gathering techniques
  o Lab: Network scanning and enumeration
• Vulnerability Assessment
  o Using Nessus, OpenVAS
  o Web application testing (SQL injection, XSS)
  o Lab: Identify vulnerabilities in test environment

Week 5-6: Security Operations & Incident Response
• Security Monitoring
  o SIEM basics (Splunk/ELK fundamentals)
  o Log analysis, threat detection
  o Lab: Analyze security logs
• Incident Response
  o Incident handling process, forensics basics
  o Malware analysis fundamentals
  o Project: Create incident response plan

Week 7-8: Application & Cloud Security
• Application Security
  o Secure coding practices
  o API security, authentication (OAuth, JWT)
  o Encryption implementation
  o Lab: Secure a vulnerable web application
• Cloud & Compliance
  o AWS/Azure security best practices
  o Compliance frameworks (ISO 27001, GDPR basics)
  o Capstone Project: Complete security audit and penetration test report`,

    5: `Week 1-2: Digital Marketing Fundamentals
• Marketing Strategy
  o Customer personas, buyer journey
  o Marketing funnel (TOFU, MOFU, BOFU)
  o Project: Create marketing strategy document for a business
• SEO (Search Engine Optimization)
  o On-page SEO (keywords, meta tags, content optimization)
  o Off-page SEO (backlinks, domain authority)
  o Tools: Google Search Console, Ahrefs/SEMrush basics
  o Project: Optimize a website for search engines

Week 3-4: Content Marketing & Social Media
• Content Marketing
  o Blog writing, content calendars
  o Email marketing (Mailchimp basics)
  o Project: Create 30-day content calendar
• Social Media Marketing
  o Platform strategies (Facebook, Instagram, LinkedIn, Twitter/X)
  o Organic vs paid social
  o Influencer marketing basics
  o Project: Manage a business social media account for 2 weeks

Week 5-6: Paid Advertising
• Google Ads
  o Search ads, display ads, shopping ads
  o Keyword research, bidding strategies
  o Campaign setup and optimization
  o Project: Create and run Google Ads campaign
• Facebook/Instagram Ads
  o Ad formats, audience targeting, Pixel implementation
  o Campaign objectives, A/B testing
  o Project: Create and run social media ad campaign

Week 7-8: Analytics & Advanced Strategies
• Analytics & Conversion
  o Google Analytics 4 setup and reporting
  o Conversion tracking, goals, funnels
  o Landing page optimization
  o Project: Analyze campaign performance and create report
• Advanced Strategies
  o Marketing automation basics
  o Retargeting campaigns
  o Affiliate marketing introduction
  o Final Project: Complete digital marketing campaign for real/mock business with analytics report`,

    6: `Week 1-2: Programming Fundamentals (Choose One: C++/Python/Java)
• Core Concepts
  o Variables, data types, operators
  o Control structures (if-else, loops)
  o Functions/methods
  o Project: Build calculator, number guessing game
• Object-Oriented Programming
  o Classes, objects, inheritance, polymorphism
  o Encapsulation, abstraction
  o Project: Library management system or banking system

Week 3-4: Data Structures Fundamentals
• Linear Data Structures
  o Arrays, strings, linked lists
  o Stacks and queues
  o Practice: 15-20 problems on each structure
• Hashing & Searching
  o Hash tables, hash maps
  o Linear and binary search
  o Practice: 10-15 problems

Week 5-6: Advanced Data Structures
• Trees
  o Binary trees, BST, tree traversals
  o Heaps, priority queues
  o Practice: 15-20 tree problems
• Graphs
  o Graph representation (adjacency list/matrix)
  o BFS, DFS traversals
  o Practice: 10-15 graph problems

Week 7-8: Algorithms & Problem Solving
• Sorting & Searching Algorithms
  o Quick sort, merge sort, selection sort
  o Time complexity analysis (Big O)
  o Practice: 10 problems
• Advanced Algorithms
  o Recursion, backtracking
  o Dynamic programming basics
  o Greedy algorithms
  o Practice: 20-30 mixed problems
  o Final Project: Solve 5 medium-level LeetCode/HackerRank problems and implement mini project (path finder, expense tracker, game)`,

    7: `Week 1-2: SQL Basics
• Database Fundamentals
  o RDBMS concepts, database vs DBMS
  o MySQL/PostgreSQL setup
• Basic SQL Queries
  o SELECT, WHERE, ORDER BY, LIMIT
  o INSERT, UPDATE, DELETE
  o Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
  o GROUP BY, HAVING
  o Project: Create and query employee database

Week 3-4: Intermediate SQL
• Joins & Relationships
  o INNER, LEFT, RIGHT, FULL joins
  o Self joins, cross joins
  o Subqueries and nested queries
  o Practice: 20+ join problems
• Data Manipulation
  o String functions, date functions
  o CASE statements, COALESCE
  o Views and indexes
  o Project: E-commerce database queries

Week 5-6: Database Design
• Normalization
  o 1NF, 2NF, 3NF, BCNF
  o Denormalization when appropriate
  o Project: Normalize a poorly designed database
• ER Modeling
  o Entity-relationship diagrams
  o Cardinality, relationships
  o Tools: Draw.io, Lucidchart
  o Project: Design database for library/hospital/school system

Week 7-8: Advanced Concepts & Real-World Application
• Advanced SQL
  o Window functions (ROW_NUMBER, RANK, LEAD/LAG)
  o CTEs (Common Table Expressions)
  o Stored procedures, triggers basics
  o Transactions, ACID properties
  o Practice: Complex analytical queries
• Performance & Security
  o Query optimization, explain plans
  o Index strategies
  o Database backup and recovery
  o User management and permissions
  o Final Project: Design and implement complete database for real-world scenario (hospital management, inventory system, social media platform) with optimized queries`,

    8: `Week 1-2: Network Basics
• Introduction to Networking
  o Network types (LAN, WAN, MAN, PAN)
  o Network topologies, OSI model layers
  o TCP/IP model
• IP Addressing
  o IPv4 addressing, classes, subnetting
  o CIDR notation, subnet masks
  o IPv6 basics
  o Practice: Subnetting exercises
  o Lab: Configure IP addresses on devices

Week 3-4: Network Protocols
• Core Protocols
  o TCP vs UDP, HTTP/HTTPS, FTP, DNS, DHCP
  o ARP, ICMP (ping, traceroute)
  o Lab: Analyze protocols with Wireshark
• Routing Fundamentals
  o Static vs dynamic routing
  o Routing protocols basics (RIP, OSPF, BGP concepts)
  o Default gateway, routing tables
  o Lab: Configure basic routing

Week 5-6: Network Devices & Technologies
• Network Hardware
  o Switches, routers, hubs, bridges
  o VLANs, trunking
  o Lab: Configure VLANs on switches
• Wireless Networking
  o Wi-Fi standards (802.11), security (WPA2/WPA3)
  o Wireless troubleshooting
  o Lab: Set up wireless network

Week 7-8: Network Security & Troubleshooting
• Network Security
  o Firewalls, ACLs, NAT/PAT
  o VPN basics, network segmentation
  o Common attacks (DDoS, MITM, spoofing)
  o Lab: Configure firewall rules
• Troubleshooting & Monitoring
  o Network troubleshooting methodology
  o Tools: ping, traceroute, nslookup, netstat
  o Network documentation
  o Final Project: Design and document complete network infrastructure for small business with security implementation`,

    9: `Week 1-2: AI Fundamentals & Python for AI
• AI Introduction
  o AI vs ML vs Deep Learning
  o Types of learning (supervised, unsupervised, reinforcement)
  o AI applications and ethics
• Python Libraries
  o NumPy, Pandas review
  o Scikit-learn setup
  o Project: Data preprocessing pipeline

Week 3-4: Machine Learning Core
• Supervised Learning
  o Linear regression, logistic regression
  o Decision trees, random forests
  o Model evaluation metrics
  o Project: House price prediction or spam classifier
• Unsupervised Learning
  o K-means clustering, hierarchical clustering
  o Dimensionality reduction (PCA)
  o Project: Customer segmentation

Week 5-6: Deep Learning Basics
• Neural Networks
  o Perceptrons, activation functions
  o Backpropagation, gradient descent
  o TensorFlow/Keras basics
  o Project: Build basic neural network for classification
• Convolutional Neural Networks (CNN)
  o Image processing, convolution layers
  o CNN architectures basics
  o Project: Image classification (MNIST or CIFAR-10)

Week 7-8: Natural Language Processing & Generative AI
• NLP Fundamentals
  o Text preprocessing, tokenization, embeddings
  o Sentiment analysis
  o Project: Text classification or chatbot basics
• Generative AI & Modern AI
  o Introduction to transformers, LLMs
  o Working with OpenAI API, prompt engineering
  o RAG (Retrieval Augmented Generation) basics
  o AI model deployment basics
  o Final Project: Build AI application (recommendation system, image classifier, NLP chatbot, or AI-powered tool using APIs)`,

    10: `45-Day CORE PYTHON FOUNDATION
Course Objective: To build a solid programming foundation through 50% Theory and 50% Practical application, preparing students for advanced specializations in Web Development or Data Science.

Phase 1: The Base (Foundation Building)
Focus: Developing a programming mindset.
- Day 1 - 5: Python Setup & Essentials (VS Code, Variables, Data Types)
- Day 6 - 10: Logic & Flow Control (Operators, If-Else, Loops)
Practical Project: Unit Converter or Secure Password Generator.

Phase 2: Deep Dive into Data (Real-world Applications)
Focus: Mastering data structures for efficient data handling.
- Day 11 - 15: Sequence Data Types (Lists, Tuples, Sets, Slicing)
- Day 16 - 20: Dictionaries & Advanced Nesting (Key-Value pairs, Nested data)
Practical Project: Contact Management System using nested dictionaries.

Phase 3: The Logic Multiplier (Professional Code)
Focus: Writing reusable, clean, and modular code.
- Day 21 - 25: Functional Programming (Args/Kwargs, Lambda, Map, Filter, Reduce)
- Day 26 - 30: Modular Programming (Built-in Modules like math/os, Creating Custom Modules)
Practical Project: Modular Quiz Application.

Phase 4: The Bridge to Web & DS (Pillars of Development)
Focus: Transitioning from scripts to professional software architecture.
- Day 31 - 35: Object-Oriented Programming (Classes, Objects, Inheritance, Init methods)
- Day 36 - 40: File I/O & Data Exchange (Handling .txt, .csv, and JSON Parsing)

Phase 5: The Launchpad (Final Project & Roadmap)
- Day 41 - 43: Capstone Project (Option A: Login System for Web | Option B: Sales Analyzer for DS)
- Day 44 - 45: Career Roadmap Discussion (Web Dev vs Data Science paths)

3 Core Specialities of This Course
1. Logic Building Exercises: Learning 'Dry Running' on paper.
2. Bug Hunting: Weekend debugging challenges to sharpen problem-solving.
3. Real-world Data: Using actual CSV/JSON files instead of dummy variables.`
  };

  const handleOpenCourse = (course) => {
    sessionStorage.setItem("landingReturnSection", "courses");
    navigate(`/course/${course.id}`, {
      state: {
        course: course,
        syllabus: courseSyllabi[course.id]
      }
    });
  };

  const courses = [
    {
      id: 10,
      tag: "",
      title: "Python Programming Masterclass",
      meta: ["Duration: 2 months", "Projects included", "Career support"],
      badge: "Online Program",
      accent: "#3776ab",
      image: courseImg10,
      isNew: true,
    },
    {
      id: 1,
      tag: "",
      title: "Web Development (MERN Stack)",
      meta: ["Duration: 2 months", "MERN Integration", "Deployment & Best Practices"],
      badge: "Online Program",
      accent: "#0b5cff",
      image: courseImg1,
    },
    {
      id: 2,
      tag: "",
      title: "Data Science + Tools (Tableau, Power BI)",
      meta: ["Duration: 2 months", "Python for Data Science", "Tableau & Power BI"],
      badge: "Online Program",
      accent: "#7a3df2",
      image: courseImg2,
    },
    {
      id: 3,
      tag: "",
      title: "Cloud Computing + AWS",
      meta: ["Duration: 2 months", "AWS Core Services", "DevOps & Monitoring"],
      badge: "Online Program",
      accent: "#8b1b2e",
      image: courseImg3,
    },
    {
      id: 4,
      tag: "",
      title: "Cyber Security",
      meta: ["Duration: 2 months", "Ethical Hacking", "Application & Cloud Security"],
      badge: "Online Program",
      accent: "#b1006a",
      image: courseImg4,
      isNew: true,
    },
    {
      id: 5,
      tag: "",
      title: "Digital Marketing",
      meta: ["Duration: 2 months", "SEO & Social Media", "Google & Facebook Ads"],
      badge: "Online Program",
      accent: "#f06b22",
      image: courseImg5,
      isNew: true,
    },
    {
      id: 6,
      tag: "",
      title: "Programming Languages (C/C++, Python, Java) + DSA",
      meta: ["Duration: 2 months", "OOP Fundamentals", "Data Structures & Algorithms"],
      badge: "Online Program",
      accent: "#1e7d5c",
      image: courseImg6,
    },
    {
      id: 7,
      tag: "",
      title: "SQL & Database Design Fundamentals",
      meta: ["Duration: 2 months", "Advanced SQL", "Database Design & Optimization"],
      badge: "Online Program",
      accent: "#2f6ae5",
      image: courseImg7,
    },
    {
      id: 8,
      tag: "",
      title: "Networking Fundamentals",
      meta: ["Duration: 2 months", "Network Protocols", "Security & Troubleshooting"],
      badge: "Online Program",
      accent: "#6d2df7",
      image: courseImg8,
    },
    {
      id: 9,
      tag: "",
      title: "Artificial Intelligence",
      meta: ["Duration: 2 months", "Machine Learning & Deep Learning", "NLP & Generative AI"],
      badge: "Online Program",
      accent: "#e25428",
      image: courseImg9,
    }
  ];

  const getCoursePrice = (courseId) => {
    if (courseId === 10) {
      return { old: "12,000", current: "6,500" };
    }
    return { old: "12,000", current: "9,500" };
  };

  const activeCourses = courses;
  const autoAdvanceRef = useRef(null);

  const lockNavigation = () => {
    isAnimatingRef.current = true;
    if (navUnlockTimerRef.current) {
      clearTimeout(navUnlockTimerRef.current);
    }
    navUnlockTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      navUnlockTimerRef.current = null;
    }, 720);
  };

  const resetAutoAdvance = () => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
    }
    if (activeCourses.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        setCenterIndex((prev) => (prev === activeCourses.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const handlePrev = () => {
    if (isAnimatingRef.current) return;
    if (activeCourses.length <= 1) return;
    lockNavigation();
    setCenterIndex((prev) => (prev === 0 ? activeCourses.length - 1 : prev - 1));
    resetAutoAdvance();
  };

  const handleNext = () => {
    if (isAnimatingRef.current) return;
    if (activeCourses.length <= 1) return;
    lockNavigation();
    setCenterIndex((prev) => (prev === activeCourses.length - 1 ? 0 : prev + 1));
    resetAutoAdvance();
  };

  const handleTouchStart = (event) => {
    if (!event.touches || event.touches.length !== 1) return;
    touchStartXRef.current = event.touches[0].clientX;
    touchCurrentXRef.current = event.touches[0].clientX;
    touchMovedRef.current = false;
  };

  const handleTouchMove = (event) => {
    if (!event.touches || event.touches.length !== 1) return;
    if (touchStartXRef.current === null) return;

    const currentX = event.touches[0].clientX;
    touchCurrentXRef.current = currentX;
    const deltaX = Math.abs(currentX - touchStartXRef.current);
    if (deltaX > 10) {
      touchMovedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchCurrentXRef.current === null) {
      touchStartXRef.current = null;
      touchCurrentXRef.current = null;
      touchMovedRef.current = false;
      return;
    }

    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    const swipeThreshold = 45;

    if (touchMovedRef.current && Math.abs(deltaX) >= swipeThreshold) {
      suppressTapUntilRef.current = Date.now() + 350;
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
    touchMovedRef.current = false;
  };

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
      if (navUnlockTimerRef.current) {
        clearTimeout(navUnlockTimerRef.current);
        navUnlockTimerRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [activeCourses.length]);

  useEffect(() => {
    if (activeCourses.length === 0) {
      setCenterIndex(0);
      return;
    }

    setCenterIndex((prev) => {
      if (prev < activeCourses.length) {
        return prev;
      }
      return activeCourses.length - 1;
    });
  }, [activeCourses.length]);

  const getVisibleCards = () => {
    if (activeCourses.length === 0) return [];

    const visible = [];
    const total = activeCourses.length;

    if (total <= 5) {
      const startOffset = -Math.floor(total / 2);
      for (let i = 0; i < total; i++) {
        const offset = startOffset + i;
        const index = (centerIndex + offset + total) % total;
        visible.push({ ...activeCourses[index], offset });
      }
      return visible;
    }

    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + total) % total;
      visible.push({ ...activeCourses[index], offset: i });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className={styles.comboSection}>
      <div className={styles.earthCanvas} aria-hidden="true">
      </div>
      <div className={styles.earthLayer} aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 1, 4]} intensity={3.8} />
          <Suspense fallback={null}>
            <EarthSphere />
          </Suspense>
        </Canvas>
      </div>
      <div className={styles.earthOverlay} aria-hidden="true" />

      <div className={styles.contentWrap}>
        <h2 className={styles.comboTitle}>
          Choose <span className={styles.highlight}>Your Career</span>
        </h2>
        <p className={styles.comboSubtitle}>
          Pick a path that matches your goals and timeline.
        </p>

        <div className={styles.cardsViewport}>
          <button 
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={handlePrev}
            aria-label="Previous course"
          >
            ‹
          </button>
          <button 
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={handleNext}
            aria-label="Next course"
          >
            ›
          </button>
          <div
            className={styles.cardsStack}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {visibleCards.map((course) => {
              const price = getCoursePrice(course.id);
              const offset = course.offset;

              return (
                <article
                  key={course.id}
                  className={styles.courseCard}
                  data-offset={offset}
                  data-course-id={course.id}
                  role="button"
                  tabIndex={offset === 0 ? 0 : -1}
                  onClick={() => {
                    if (Date.now() < suppressTapUntilRef.current) {
                      return;
                    }
                    if (offset === 0) {
                      handleOpenCourse(course);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (offset === 0 && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      handleOpenCourse(course);
                    }
                  }}
                >
                  <div
                    className={styles.cardTop}
                    aria-hidden="true"
                  >
                    <img
                      className={styles.cardImage}
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    {course.tag && <div className={styles.cardTag}>{course.tag}</div>}
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    <ul className={styles.cardMeta}>
                      {course.meta.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className={styles.priceRow}>
                      <span className={styles.priceOld}>₹{price.old}</span>
                      <span className={styles.priceNew}>₹{price.current}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className={styles.cardHint}>Click for more details</p>
      </div>
    </section>
  );
};

export default SectionSeven;
