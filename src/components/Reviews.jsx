import React, { useEffect, useRef, useState } from 'react'
import styles from "./Reviews.module.css";

const Reviews = () => {
  const reviews = [
    {
      name: "Jagdeep Kaur",
      role: "Full Stack Web Development",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      review:
        "I am doing a 6 month full stack web development course. Techcadd Computer Education is a platform where you can gain practical knowledge and work on live projects. Teachers are polite and explain things in a very good way. I recommend my friends to join Techcadd.",
    },
    {
      name: "Manish Kumar",
      role: "Data Analytics",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      review:
        "I am doing a 4 months data analytics course in Jalandhar Techcadd. I have gained practical knowledge and worked on live projects. Teachers are very friendly and explain every topic in detail.",
    },
    {
      name: "Harshpreet Sandhu",
      role: "Python & Data Analysis",
      avatar: "https://i.pravatar.cc/150?img=22",
      rating: 5,
      review:
        "I joined the Python and data analysis course at Techcadd Jalandhar. The faculty is very supportive and helps quickly whenever I get stuck.",
    },
    {
      name: "Zack",
      role: "Digital Marketing",
      avatar: "https://i.pravatar.cc/150?img=7",
      rating: 4,
      review:
        "I am doing a 6 month digital marketing course. I gained practical knowledge in a short time and worked on live projects. The teacher clears concepts like SEO, WordPress, SMM, Photoshop in detail.",
    },
    {
      name: "Harleen Kaur",
      role: "Digital Marketing",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      review:
        "I joined Techcadd to understand digital marketing. Each and every word is clearly explained. Faculty are supportive and always ready to solve doubts.",
    },
    {
      name: "Janvi Kumari",
      role: "Digital Marketing",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review:
        "I'm doing a 6 month digital marketing course. It’s the best institute, I learned SEO, SMM, WordPress and content writing. Teachers are very friendly and polite.",
    },
    {
      name: "Palak Verma",
      role: "Data Analytics",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 4,
      review:
        "I am currently doing a Data Analytics course at Techcadd Company in Jalandhar. The faculty are supportive and explain everything clearly. The learning environment is positive.",
    },
    {
      name: "Nidhi",
      role: "Digital Marketing",
      avatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      review:
        "I am currently doing a 6-month Digital Marketing course and the training is really good. Faculty explains everything clearly and I'm learning useful skills for my career.",
    },
    {
      name: "Harsh Harsh",
      role: "Data Science",
      avatar: "https://i.pravatar.cc/150?img=14",
      rating: 4,
      review:
        "I'm doing a 6 month data science course in Jalandhar. I gained good experience and knowledge, with real live projects provided.",
    },
    {
      name: "Riya Rajput",
      role: "Business Analytics",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      review:
        "I am doing a business analytics course in Jalandhar. Teachers are friendly and explain every topic in detail. I also recommend everyone to go if you want practical knowledge.",
    },
    {
      name: "Rimple",
      role: "Data Science",
      avatar: "https://i.pravatar.cc/150?img=16",
      rating: 5,
      review:
        "I am pursuing a 45-day Data Science training at TechCADD Institute, Jalandhar. The experience has been very positive. Trainers explain concepts clearly and provide hands-on sessions using Python.",
    },
    {
      name: "Dheeraj Kumar",
      role: "Python  Data Analytics",
      avatar: "https://i.pravatar.cc/150?img=17",
      rating: 4,
      review:
        "I joined Techcadd, Jalandhar to understand Python and Data Analytics. The staff is very good and the way of talking is very positive. Best institute in Jalandhar.",
    },
    {
      name: "Harshpreet Sandhu",
      role: "Python  Data Analysis",
      avatar: "https://i.pravatar.cc/150?img=18",
      rating: 5,
      review:
        "I joined Python and data analysis course in Techcadd Jalandhar. The staff faculty is very good. Every teacher helped me when I got stuck in any problem.",
    },
    {
      name: "Robin Mahay",
      role: "Data Analysis",
      avatar: "https://i.pravatar.cc/150?img=19",
      rating: 4,
      review:
        "I joined the data analysis course in Jalandhar at Techcadd Computer Education and had a great experience. The trainers explained concepts clearly and provided hands-on practice with real tools.",
    },
    {
      name: "Preeti Bhardwaj",
      role: "Digital Marketing",
      avatar: "https://i.pravatar.cc/150?img=20",
      rating: 5,
      review:
        "I did my digital marketing 6 months course from Techcadd. I learned SEO, SMM, Photoshop, HTML and CSS. Teachers are so helpful.",
    },
    {
      name: "Jannat Basra",
      role: "IT  Digital Skills",
      avatar: "https://i.pravatar.cc/150?img=21",
      rating: 5,
      review:
        "TechCadd offers a solid foundation in IT and digital skills with practical, hands-on training. The instructors are knowledgeable and supportive.",
    },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const scrollEndTimeoutRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 656) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1200) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  useEffect(() => {
    if (totalPages <= 1) return
    const intervalId = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [totalPages])

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const left = container.clientWidth * currentPage;
    isProgrammaticScrollRef.current = true;
    container.scrollTo({ left, behavior: 'smooth' });
    const timer = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 350);
    return () => clearTimeout(timer);
  }, [currentPage]);


  const handleDotClick = (index) => {
    setCurrentPage(index);
  };

  const handleScroll = (event) => {
    if (isProgrammaticScrollRef.current) return;
    const container = event.currentTarget;
    if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    scrollEndTimeoutRef.current = setTimeout(() => {
      const nextPage = Math.round(container.scrollLeft / container.clientWidth);
      if (nextPage !== currentPage) {
        setCurrentPage(nextPage);
      }
    }, 120);
  };


  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    reviews.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
  );

  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.heading}>What Our Students Say</h2>
      
      <div
        className={styles.reviewsContainer}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className={styles.reviewsTrack}>
          {pages.map((page, pageIndex) => (
            <div key={`page-${pageIndex}`} className={styles.reviewsPage}>
              <div className={styles.reviewsGrid}>
                {page.map((review, index) => (
                  <div key={`${pageIndex}-${index}`} className={styles.reviewCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.avatarWrapper}>
                        <img src={review.avatar} alt={review.name} className={styles.avatar} />
                      </div>
                      <div className={styles.userInfo}>
                        <h3 className={styles.userName}>{review.name}</h3>
                        <p className={styles.userRole}>{review.role}</p>
                      </div>
                    </div>
                    <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={starIndex < review.rating ? styles.starFilled : styles.starEmpty}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.reviewText}>{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.paginationDots}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentPage === index ? styles.activeDot : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Reviews
                                                             