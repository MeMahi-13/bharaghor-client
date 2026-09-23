
import React from "react";

const PropertyCardSkeleton = ({ count = 6 }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={styles.card}>
          {/* Image Skeleton */}
          <div style={{ ...styles.skeleton, height: "180px" }} />

          <div style={styles.content}>
            <div style={{ ...styles.skeleton, height: "18px", width: "70%" }} />

            <div style={styles.info}>
              <div style={{ ...styles.skeleton, height: "12px", width: "90%" }} />
              <div style={{ ...styles.skeleton, height: "12px", width: "80%" }} />
              <div style={{ ...styles.skeleton, height: "12px", width: "85%" }} />
              <div style={{ ...styles.skeleton, height: "12px", width: "75%" }} />
            </div>

            <div style={styles.bottom}>
              <div style={{ ...styles.skeleton, height: "16px", width: "40%" }} />
              <div style={{ ...styles.skeleton, height: "30px", width: "90px" }} />
            </div>
          </div>
        </div>
      ))}

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>
    </div>
  );
};

export default PropertyCardSkeleton;

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
  },
  content: {
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },
  skeleton: {
    background: "linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "6px",
  },
};
