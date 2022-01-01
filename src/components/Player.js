import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({setCurrentSong, songs, songInfo, setSongInfo, audioRef, currentSong, isPlaying, setIsPlaying, setSongs}) => {
    //handlers
    const activeLibraryHandler = (nextPrev) => {
        //add active state
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });

        setSongs(newSongs);
    };

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };

    const skipTrackHandler = async (direction) => {
        //get index of current song
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        let nextSong = songs[(currentIndex + 1) % songs.length];

        if(direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }

        if(direction === 'skip-forward') {
            await setCurrentSong(nextSong);
            activeLibraryHandler(nextSong);
        }

        if(isPlaying) audioRef.current.play();
    };

    //add the styles
    const trackAnimation = {
      transform: `translateX(${songInfo.animationPercentage}%)`
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                    <input
                        type="range"
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div style={trackAnimation} className="animate-track"/>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    size="2x"
                    className="skip-back"
                    onClick={() => skipTrackHandler('skip-back')}
                />
                <FontAwesomeIcon
                    icon={isPlaying ? faPause : faPlay}
                    size="2x"
                    className="play"
                    onClick={playSongHandler}
                />
                <FontAwesomeIcon
                    icon={faAngleRight}
                    size="2x"
                    className="skip-forward"
                    onClick={() => skipTrackHandler('skip-forward')}
                />
            </div>
        </div>
    );
};

export default Player;