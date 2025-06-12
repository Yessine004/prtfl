import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);

  const skills = [
    { name: "Node.js", percent: 75 },
    { name: "JavaScript (ES6+)", percent: 90 },
    { name: "Python", percent: 70 },
    { name: "C", percent: 60 },
    { name: "HTML5", percent: 95 },
    { name: "CSS3", percent: 90 },
    { name: "Git & GitHub", percent: 80 },
    { name: "MySQL", percent: 70 },
    { name: "PHP", percent: 65 },
  ];

  const projects = [
    {
      title: "E-commerce Website",
      description:
        "An online store platform built with React and Node.js, featuring product listings, cart functionality, and user authentication.",
      url: "indexx.html",
    },
    {
      title: "Gym Static Vitrine Website",
      description:
        "A clean and responsive static website showcasing gym services, schedules, and trainer profiles. ",
      url: "indexx.html",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updated.add(entry.target.id);
              if (entry.target.id === "skills") {
                setAnimateSkills(true);
              }
            } else {
              updated.delete(entry.target.id);
            }
          });
          return updated;
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  function handleNavClick() {
    setMenuOpen(false);
  }

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #121212;
          --text: #f5f5f5;
          --card-bg: #1e1e1e;
          --accent: #1abc9c;
        }
        * {
          margin: 0; padding: 0; box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: var(--bg);
          color: var(--text);
          line-height: 1.6;
          min-height: 100vh;
        }
        nav {
          background-color: #1f1f1f;
          color: white;
          position: sticky;
          top: 0;
          z-index: 999;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          font-weight: 600;
        }
        nav .logo {
          font-weight: 900;
          font-size: 1.6rem;
          letter-spacing: 2px;
          user-select: none;
          cursor: default;
          color: var(--accent);
          text-shadow: 0 0 5px rgba(26,188,156,0.3);
        }
        nav ul {
          list-style: none;
          display: flex;
          gap: 2.5rem;
        }
        nav ul li a {
          color: white;
          text-decoration: none;
          position: relative;
          text-transform: capitalize;
          font-size: 1.05rem;
        }
        nav ul li a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        nav ul li a:hover::after {
          width: 100%;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 25px;
          height: 20px;
          cursor: pointer;
          z-index: 1000;
        }
        .hamburger div {
          width: 100%;
          height: 3px;
          background-color: var(--accent);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        /* Hamburger animation when open */
        .hamburger.open div:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open div:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open div:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        main {
          max-width: 900px;
          margin: 4rem auto 3rem;
          padding: 0 1rem;
          min-height: 70vh;
          position: relative;
        }
        .section {
          padding: 2rem 0 3rem;
          border-bottom: 1px solid #333;
          opacity: 0;
          transform: translateY(30px);
        }
        .section.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        h2 {
          font-size: 2.4rem;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
        }
        p {
          text-align: center;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 1rem;
          color: #ccc;
        }
        
        /* Skills */
        ul.skills-list {
          max-width: 700px;
          margin: 0 auto;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem 2rem;
          padding: 0 0.5rem;
        }
        ul.skills-list li {
          background: var(--card-bg);
          padding: 1rem 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-weight: 600;
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .skill-name {
          display: flex;
          justify-content: space-between;
          font-size: 1.1rem;
        }
        .progress-bar {
          background: #333;
          border-radius: 6px;
          height: 14px;
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
        }
        .progress-fill {
          background: var(--accent);
          height: 100%;
          border-radius: 6px;
          width: 0;
          transition: width 1.2s ease-out;
        }

        /* Projects */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .project-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .project-card h3 {
          margin-bottom: 1rem;
          font-size: 1.6rem;
          color: var(--accent);
        }
        .project-card p {
          flex-grow: 1;
          color: #ddd;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .project-link {
          align-self: flex-start;
          background: var(--accent);
          color: var(--bg);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .project-link:hover {
          background: #16a085;
        }

        .about-photo {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.5rem;
          display: block;
          border: 4px solid var(--accent);
        }

        /* MOBILE IMPROVEMENTS */
        @media (max-width: 768px) {
          nav {
            padding: 1rem 1.5rem;
          }
          nav ul {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: #1f1f1f;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
            margin: 0;
            align-items: center;

            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            border-bottom: 2px solid var(--accent);
          }
          nav ul.open {
            max-height: 300px; /* enough height to show all links */
            padding: 1rem 0;
          }
          nav ul li {
            width: 100%;
            text-align: center;
          }
          nav ul li a {
            font-size: 1.2rem;
            padding: 0.5rem 0;
            display: block;
            width: 100%;
          }
          .hamburger {
            display: flex;
          }
          main {
            margin: 3rem 1rem 2rem;
            padding: 0 1rem;
          }
          ul.skills-list {
            grid-template-columns: 1fr;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <nav>
        <div className="logo" aria-label="Logo">Yacine.</div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Toggle menu"
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMenuOpen(!menuOpen);
          }}
        >
          <div />
          <div />
          <div />
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li>
            <a href="#about" onClick={handleNavClick}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" onClick={handleNavClick}>
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" onClick={handleNavClick}>
              Skills
            </a>
          </li>
          <li>
            <a
              href="indexx.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <section
          id="about"
          className={`section ${visibleSections.has("about") ? "visible" : ""}`}
          tabIndex={-1}
          aria-label="About Me"
        >
          <h2>About Me</h2>
          <img
            src="yassine.jpg"
            alt="Photo of the developer"
            className="about-photo"
            loading="lazy"
          />
          <p>
            Hello! I’m a second-year Software Engineering student with a strong passion for technology and software development. I love exploring new technologies and continuously expanding my skills. Currently, I’m focused on building efficient and elegant web applications using tools like React, Node.js, and Python. Learning and creating solutions that make a difference truly motivates me every day.
          </p>
          <p>
            Welcome to my portfolio. Below you can check out some of my projects and my skillset.
          </p>
        </section>

        <section
          id="projects"
          className={`section ${visibleSections.has("projects") ? "visible" : ""}`}
          tabIndex={-1}
          aria-label="Projects"
        >
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map(({ title, description, url }) => (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={title}
                className="project-card"
                tabIndex={0}
              >
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="project-link">See Project</span>
              </a>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className={`section ${visibleSections.has("skills") ? "visible" : ""}`}
          tabIndex={-1}
          aria-label="Skills"
        >
          <h2>Skills</h2>
          <ul className="skills-list" aria-live="polite">
            {skills.map(({ name, percent }) => (
              <li key={name}>
                <div className="skill-name" aria-label={`${name} skill proficiency`}>
                  <span>{name}</span>
                  <span>{percent}%</span>
                </div>
                <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent}>
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: animateSkills ? `${percent}%` : 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
