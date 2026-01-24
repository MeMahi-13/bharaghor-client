// Footer.jsx
import React from "react";

const Footer = ({ user }) => {
  return (
    <footer className="mt-5" style={styles.footer}>
      <div style={styles.container}>
        {/* Section 1: Brand */}
        <div style={styles.brand}>
          <img
            src="/src/assets/logo bharaghor.png"
            alt="Logo"
            style={styles.logo}
          />
          <p style={styles.tagline}>
            Find your perfect home with comfort, trust, and ease.
          </p>
        </div>

        {/* Section 2: Quick Access */}
        <div>
          <h3 style={styles.heading}>Quick Access</h3>
          <ul style={styles.list}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/services" style={styles.link}>Services</a></li>
            <li><a href="/blog" style={styles.link}>Blog</a></li>
          </ul>
        </div>

        {/* Section 3: Resources */}
        <div>
          <h3 style={styles.heading}>Resources</h3>
          <ul style={styles.list}>
            <li><a href="/faq" style={styles.link}>FAQ</a></li>
            <li><a href="/support" style={styles.link}>Support</a></li>
            <li><a href="/terms" style={styles.link}>Terms of Service</a></li>
            <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Section 4: Contact */}
        <div>
          <h3 style={styles.heading}>Contact Us</h3>
          <p style={styles.text}>
            Block A, Road 3, House 127<br />
            Mirpur 12, Dhaka-1216
          </p>
          <p style={styles.text}>Email: info@yessghor.com</p>
          <p style={styles.text}>Phone: +880 1234 567890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottom}>
        © 2026 <span style={styles.brandName}>BharaGhor</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    backgroundColor: "#073032",
    color: "#E3D0B3",
    paddingTop: "60px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "40px",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  logo: {
    width: "140px",
  },
  tagline: {
    color: "#cfc2a5",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  heading: {
    color: "#ffffff",
    fontSize: "16px",
    marginBottom: "16px",
    position: "relative",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#E3D0B3",
    fontSize: "14px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  text: {
    fontSize: "14px",
    color: "#cfc2a5",
    lineHeight: "1.6",
  },
  bottom: {
    marginTop: "50px",
    padding: "20px",
    textAlign: "center",
    fontSize: "13px",
    borderTop: "1px solid rgba(227,208,179,0.15)",
    color: "#cfc2a5",
  },
  brandName: {
    color: "#217c82",
    fontWeight: "600",
  },
};
