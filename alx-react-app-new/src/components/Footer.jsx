function Footer() {
  const footerStyle = {
    backgroundColor: "#000",
    color: "#ccc",
    padding: "24px",
    borderTop: "1px solid #444",
    textAlign: "center",
    fontSize: "14px",
  };

  return (
    <footer style={footerStyle}>
      <p>© 2023 City Lovers</p>
    </footer>
  );
}

export default Footer;
