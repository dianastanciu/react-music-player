import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ audioRef, songs, setCurrentSong, isPlaying, setSongs, libraryStatus }) => {
    return(
        <div className={`library ${(libraryStatus) ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(song => <LibrarySong
                        song={song}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        setSongs={setSongs}
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                    />)
                }
            </div>
        </div>
    );
};

export default Library;