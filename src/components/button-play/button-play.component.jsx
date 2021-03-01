import "./button-play.style.css";
const ButtonPlay = (props) => {
   
    return (<div>
        <h3 className="text-white">Territory scanned!</h3>
    
        <button type="button" onClick={props.playNewGame}>
          Play The Game
        </button>
      </div>)
  
};

export default ButtonPlay;
