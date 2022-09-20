function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; {year}. Алексей Бельтюков</p>
    </footer>
  );
}
export default Footer;
