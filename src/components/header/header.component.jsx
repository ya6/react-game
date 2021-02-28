import "./header.style.css";
const Header = (props) => {
  const  {field_size_factor, fieldSizeHandler } = props;
  return (
    <div className="header">
      <h1 className="text-white">C19 fixer (сапер)</h1> 
          <select value={field_size_factor} onChange={fieldSizeHandler}>
            <option value="2">Small</option>
            <option value="3">Medium</option>
            <option value="4">Large</option>
            <option value="5">Super</option>
          </select>
       
    </div>
  );
};

export default Header;
