import React, {useRef, useState} from "react";
//styles
import './styles/app.scss';

//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Credit from "./components/Credit";

//data
import data from "./util";

function App() {
    //ref
    const audioRef = useRef(null);

    //state
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    //handlers
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({...songInfo, currentTime: current, duration});
    };

    return (
        <div className="App">
            <Song currentSong={currentSong}/>
            <Player setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <Library isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
            <Credit/>
        </div>
    );
}

export default App;
