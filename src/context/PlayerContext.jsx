import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerContext= createContext();

const PlayerContextProvider= (props)=>{
    const audioRef= useRef();
    const seekBg=useRef();
    const seekBar= useRef();

    const [track,setTrack]=useState(songsData[0]);
    const [playStatus,setPlayStatus]=useState(false);
    const [time,setTime]=useState({
        currentTime:{
            seconds:0,
            minutes:0
        },
        totalTime:{
            seconds:0,
            minutes:0
        }
    })

    const play=()=>{
        audioRef.current.play();
        setPlayStatus(true);

    }
    const pause=()=>{
        audioRef.current.pause();
        setPlayStatus(false);
    }

     const playWithId=async  (id)=>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
     }

     const previous=async ()=>{
if(track.id>0){
    await setTrack(songsData[track.id-1]);
    await audioRef.current.play();
    setPlayStatus(true);
}
     }

       const next=async ()=>{
        if(track.id<songsData.length-1){
    await setTrack(songsData[track.id+1]);
    await audioRef.current.play();
    setPlayStatus(true);
}
       }
       const seekSong = async(event)=>{
             audioRef.current.currentTime=((event.nativeEvent.offsetX / seekBg.current.offsetWidth))*audioRef.current.duration // get the value as percentage 
       }
     
       useEffect(()=>{
        setTimeout(()=>{
               audioRef.current.ontimeupdate=()=>{
             const progress = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100);
              seekBar.current.style.width = `${progress}%`;
                setTime({
                    currentTime:{
            seconds:Math.floor(audioRef.current.currentTime % 60),
            minutes:Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime:{
            seconds:Math.floor(audioRef.current.duration % 60),
            
            minutes:Math.floor(audioRef.current.duration / 60),
        }
                })
               }
        },1000)
       })

    const contextValue={
          audioRef,
          seekBar,
          seekBg,
          track,
          setTrack,
          playStatus,
          setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong

    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider