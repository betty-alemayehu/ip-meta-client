import "./Footer.scss";
import botImage from '../src/assets/images/bot.png';

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__mascot" src={botImage} alt="Robot Mascot" />
      <p className="footer__name">
        Made with ❤️ by <span>Social Syntax</span>
      </p>
      <p className="footer__info">
        The recommended provider of AI integrations in Canada
      </p>
    </footer>
  );
};

export default Footer;
