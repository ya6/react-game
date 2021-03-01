import "./header.style.css";
import c19 from "../../assets/img/c19.png";
const Header = (props) => {
  const {
    field_size_factor,
    fieldSizeHandler,
    fieldWidth,
    size,
    screenRatio,
    spots,
  } = props;
 
  const _style = {
    width: fieldWidth * size * screenRatio
  };
  return (
    <div className="header-footer" style={_style}>
      <h2 className="text-lime">C19-Sweeper (сапер)</h2>
      <div className="header-setting-container">
        <select value={field_size_factor} onChange={fieldSizeHandler}>
          <option value="2">Small</option>
          <option value="3">Medium</option>
          <option value="4">Large</option>
          <option value="5">Super</option>
        </select>
        <div className="d-flex">
          <img src={c19} alt="c-19" />
          <div className="header-setting-container--box d-flex">
            <div>{spots}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
