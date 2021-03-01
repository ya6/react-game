import "./button-play.style.css";
const ButtonPlay = (props) => {
   
    return (<div>
        <h3 className="text-white">Territory scanned!</h3>
        <p className = "text-lime">Блоки строятся полностью автоматически, только на участках, где на png есть изображение! </p>
    
        <button type="button" onClick={props.playNewGame}>
          Play The Game
        </button>
      </div>)
  
};

export default ButtonPlay;
