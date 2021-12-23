import React, {useState} from "react";
//images
import chillHopCredit from './images/chillhop-credit.png';

//styles
import './styles/app.scss';

//components
import Player from "./components/Player";
import Song from "./components/Song";

//data
import data from "./util";

function App() {
    //state
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Song currentSong={currentSong}/>
            <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>

            <div className="credit">
                <a href="https://chillhop.ffm.to/creatorcred" title="Music provided by ChillHop" target="_blank">
                    <img src={chillHopCredit} alt="ChillHop Credit"/>
                </a>
            </div>
        </div>
    );
}

export default App;
