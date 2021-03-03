import "./button-music.style.css";
import music from '../../assets/img/music.png'
const ButtonMusic = (props) => {
   
    return (


      <div className="d-flex">
      <img src={music} alt="music" />
      <div id="toggles" className = "brd">     
      <input type="checkbox" name="checkbox1" id="checkbox3" className="ios-toggle"  onChange = {props.musicControlHandler} />
      <label htmlFor="checkbox3" className="checkbox-label" data-off="" data-on=""></label>
    </div>
      
    </div>
    
      
    )
  
};

export default ButtonMusic;
