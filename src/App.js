import React, {useRef, useState} from "react";
//styles
import './styles/app.scss';

//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Credit from "./components/Credit";
import Nav from "./components/Nav";

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
    const [libraryStatus, setLibraryStatus] = useState(false);

    //handlers
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({...songInfo, currentTime: current, duration});
    };

    return (
        <div className="App">
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song
                currentSong={currentSong}
            />
            <Player
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                audioRef={audioRef}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                songs={songs}
                setCurrentSong={setCurrentSong}
            />
            <Library
                isPlaying={isPlaying}
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            />
            <Credit/>
        </div>
    );
}

export default App;
