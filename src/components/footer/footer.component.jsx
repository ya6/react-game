import github_logo from "../../assets/img/github-logo_white.png";
import rs_logo from "../../assets/img/rs_school_js.png";
import "./footer.style.css";

const Footer = (props) => {
  const { fieldWidth, size, screenRatio } = props;

  const _style = {
    width: fieldWidth * size * screenRatio,
  };
  return (
    <div className="header-footer text-white" style={_style}>
      <div className="d-flex  d-f-just-content-center" >
          
        <div className="d-flex">
          <img className="github" src={github_logo} alt="github_logo" />
          <a href="https://github.com/ya6" className="">
            ya6
          </a>
        </div>

        <div className="d-flex">
          <img className="rsschool" src={rs_logo} alt="rs_logo" />
          <a href="https://rs.school/react/" className="">
            React
          </a>
        </div>

        <div className="d-flex">
          <div>
            <strong>2021</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
