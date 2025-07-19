function Footer() {
  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p>© 2023 City Lovers</p>
    </footer>
  );
}

export default Footer;
