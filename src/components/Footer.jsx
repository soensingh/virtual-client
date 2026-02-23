import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instaLogo from '../assets/images/instaLogo.png'
import facebookLogo from '../assets/images/facebookLogo.png'
import linkdinLogo from '../assets/images/linkdinLogo.png'
import youtubeLogo from '../assets/images/youtubeLogo.png'
import footerLogo from '../assets/images/footerLogo.png'
import styles from './Footer.module.css'

const Footer = () => {
  const navigate = useNavigate()

  const whyUsPoints = [
    'Personalised 1-on-1 learning',
    '24/7 live mentor support',
    '3-day free trial classes',
    'Industry-focused curriculum',
    'Proven TechCadd expertise',
    'Complete skill-building path',
  ]

  const handleScrollToWhy = () => {
    const container = document.getElementById('landing-scroll')
    const target = document.getElementById('why-techcadd')

    if (!target) {
      return
    }

    if (container) {
      container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const buildCourseSyllabus = (title, meta) => `Week 1-2: ${title} Fundamentals
• Core concepts and setup
• ${meta[1] || 'Practical foundations'}

Week 3-4: Intermediate Applications
• ${meta[2] || 'Hands-on implementation'}
• Project-based learning with real examples

Week 5-6: Advanced Skills
• Case studies and workflow optimization
• Best practices and debugging techniques

Week 7-8: Capstone & Career Readiness
• End-to-end capstone implementation
• Interview preparation and portfolio guidance`

  const buildBootcampSyllabus = (title) => `Day 1 - Introduction to ${title}
Overview, tools setup, and roadmap.

Day 2 - Hands-on Core Session
Practical exercises and guided implementation.

Day 3 - Real-world Use Cases
Apply concepts to business and project scenarios.

Day 4 - Skill Deep Dive
Advanced techniques and productivity workflows.

Day 5 - Capstone Task
Mini project and expert feedback.

Day 6 - Optimization & Best Practices
Improve quality, speed, and outcomes.

Day 7 - Industry Tools
Tooling stack and smart usage patterns.

Day 8 - Final Build Session
Complete final deliverable with mentoring.

Day 9 - Showcase & Next Steps
Presentation, review, and learning roadmap.`

  const courses = [
    { id: 10, title: 'Python Programming', meta: ['Duration: 2 months', 'Projects included', 'Career support'], syllabus: buildCourseSyllabus('Python Programming', ['Duration: 2 months', 'Projects included', 'Career support']) },
    { id: 1, title: 'Web Development', meta: ['Duration: 2 months', 'MERN Integration', 'Deployment & Best Practices'], syllabus: buildCourseSyllabus('Web Development', ['Duration: 2 months', 'MERN Integration', 'Deployment & Best Practices']) },
    { id: 2, title: 'Data Science + Tools', meta: ['Duration: 2 months', 'Python for Data Science', 'Tableau & Power BI'], syllabus: buildCourseSyllabus('Data Science + Tools', ['Duration: 2 months', 'Python for Data Science', 'Tableau & Power BI']) },
    { id: 3, title: 'Cloud Computing + AWS', meta: ['Duration: 2 months', 'AWS Core Services', 'DevOps & Monitoring'], syllabus: buildCourseSyllabus('Cloud Computing + AWS', ['Duration: 2 months', 'AWS Core Services', 'DevOps & Monitoring']) },
    { id: 4, title: 'Cyber Security', meta: ['Duration: 2 months', 'Ethical Hacking', 'Application & Cloud Security'], syllabus: buildCourseSyllabus('Cyber Security', ['Duration: 2 months', 'Ethical Hacking', 'Application & Cloud Security']) },
    { id: 5, title: 'Digital Marketing', meta: ['Duration: 2 months', 'SEO & Social Media', 'Google & Facebook Ads'], syllabus: buildCourseSyllabus('Digital Marketing', ['Duration: 2 months', 'SEO & Social Media', 'Google & Facebook Ads']) },
    { id: 6, title: 'Programming Languages', meta: ['Duration: 2 months', 'OOP Fundamentals', 'Data Structures & Algorithms'], syllabus: buildCourseSyllabus('Programming Languages', ['Duration: 2 months', 'OOP Fundamentals', 'Data Structures & Algorithms']) },
    { id: 7, title: 'Database Design Fundamentals', meta: ['Duration: 2 months', 'Advanced SQL', 'Database Design & Optimization'], syllabus: buildCourseSyllabus('Database Design Fundamentals', ['Duration: 2 months', 'Advanced SQL', 'Database Design & Optimization']) },
    { id: 8, title: 'Networking Fundamentals', meta: ['Duration: 2 months', 'Network Protocols', 'Security & Troubleshooting'], syllabus: buildCourseSyllabus('Networking Fundamentals', ['Duration: 2 months', 'Network Protocols', 'Security & Troubleshooting']) },
    { id: 9, title: 'Artificial Intelligence', meta: ['Duration: 2 months', 'Machine Learning & Deep Learning', 'NLP & Generative AI'], syllabus: buildCourseSyllabus('Artificial Intelligence', ['Duration: 2 months', 'Machine Learning & Deep Learning', 'NLP & Generative AI']) },
  ]

  const handleOpenCourse = (course) => {
    sessionStorage.setItem('landingReturnSection', 'courses')
    navigate(`/course/${course.id}`, {
      state: {
        course,
        syllabus: course.syllabus,
      },
    })
  }

  const bootcamps = [
    {
      title: 'CYBER-SMART',
      subtitle: 'Master Digital Safety in 9 Days',
      duration: '9 Days',
      syllabus: buildBootcampSyllabus('CYBER-SMART'),
    },
    {
      title: 'DECODE E-INDIA',
      subtitle: '9 Digital Systems Every Indian Should Know',
      duration: '9 Days',
      syllabus: buildBootcampSyllabus('DECODE E-INDIA'),
    },
    {
      title: 'CREATOR’S LAB',
      subtitle: 'Master Photoshop & Design Theory',
      duration: '9 Days',
      syllabus: buildBootcampSyllabus('CREATOR’S LAB'),
    },
    {
      title: 'THE SKILLS 2026',
      subtitle: 'Master Creative & Professional Ways',
      duration: '9 Days',
      syllabus: buildBootcampSyllabus('THE SKILLS 2026'),
    },
    {
      title: 'AI THAT UNDERSTANDS',
      subtitle: 'Growth through Generative AI',
      duration: '9 Days',
      syllabus: buildBootcampSyllabus('AI THAT UNDERSTANDS'),
    },
  ]

  const handleOpenBootcamp = (bootcamp) => {
    sessionStorage.setItem('landingReturnSection', 'bootcamp')
    navigate(`/bootcamp/${bootcamp.title.replace(/\s+/g, '-').toLowerCase()}`, {
      state: {
        bootcamp,
        syllabus: bootcamp.syllabus,
      },
    })
  }

  const branches = [
    'SAS Nagar',
    'Jalandhar',
    'Amritsar',
    'Phagwara',
    'Hoshiarpur',
    'Ludhiana',
    'Greater Noida',
  ]

  const handleBranchRedirect = () => {
    window.location.href = 'https://techcadd.com/'
  }

  return (
    <footer className={styles.footerMainContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <img src={footerLogo} alt="Virtual Academy Logo" className={styles.logo} />
          <div className={styles.contactSection}>
            <h3 className={styles.footerHeading}>Contacts</h3>
            <p>info@techcadd.com</p>
            <p>9888122255</p>
            <div className={styles.socialIcons}>
                <a href="https://www.instagram.com/techcadd_virtual_academy/" target="_blank" rel="noreferrer">
                  <img src={instaLogo} alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/people/Techcadd-Virtual-Academy/61575896862655/" target="_blank" rel="noreferrer">
                  <img src={facebookLogo} alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/in/virtual-academy-606482386/" target="_blank" rel="noreferrer">
                  <img src={linkdinLogo} alt="LinkedIn" />
                </a>
                <a href="https://youtube.com/@techcaddindia?si=0_O_1hCZc_TSKdvX" target="_blank" rel="noreferrer">
                  <img src={youtubeLogo} alt="YouTube" />
                </a>
            </div>
          </div>
          <div className={styles.registeredOffice}>
            <h3 className={styles.footerHeading}>Registered Office</h3>
            <p>2nd Floor, Crystal Plaza, SCS 78,<br />Opp. Pims Hospital, Jalandhar,<br />Punjab 144001</p>
          </div>
        </div>

        <div className={`${styles.footerColumn} ${styles.coursesColumn}`}>
          <h3 className={styles.footerHeading}>Courses</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <button
                  type="button"
                  className={styles.courseLink}
                  onClick={() => handleOpenCourse(course)}
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.footerColumn} ${styles.comboCourses}`}>
          <h3 className={styles.footerHeading}>Bootcamps</h3>
          <ul>
            {bootcamps.map((bootcamp) => (
              <li key={bootcamp.title}>
                <button
                  type="button"
                  className={styles.courseLink}
                  onClick={() => handleOpenBootcamp(bootcamp)}
                >
                  {bootcamp.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Branches</h3>
          <ul>
            {branches.map((branch) => (
              <li key={branch}>
                <button
                  type="button"
                  className={styles.courseLink}
                  onClick={handleBranchRedirect}
                >
                  {branch}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.footerColumn} ${styles.whyAcademyColumn}`}>
          <h3 className={styles.footerHeading}>Why Virtual Academy?</h3>
          <ul>
            {whyUsPoints.map((point) => (
              <li key={point}>
                <button
                  type="button"
                  className={styles.courseLink}
                  onClick={handleScrollToWhy}
                >
                  {point}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyrightText}>2026 TechCadd Virtual Academy. All Rights Reserved.</p>
        <div className={styles.footerLinks}>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/refund-policy">Refund Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
