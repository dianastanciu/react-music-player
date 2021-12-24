import React, {useState} from "react";
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
    //state
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Song currentSong={currentSong}/>
            <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <Library songs={songs}/>
            <Credit/>
        </div>
    );
}

export default App;
