function MainContent() {
  const mainStyle = {
    flex: 1,
    padding: "40px 24px",
    background:
      "radial-gradient(circle, rgba(51,53,51,1) 32%, rgba(36,36,35,1) 78%)",
    color: "#e7e41d",
    fontSize: "18px",
    fontWeight: "600",
    minHeight: "calc(100vh - 100px)", // leave space for footer
  };

  return (
    <main style={mainStyle}>
      <p>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

export default MainContent;
