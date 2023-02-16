import React from 'react'
import { Col} from 'reactstrap';
import {motion} from 'framer-motion'
import 'bootstrap/dist/css/bootstrap.min.css';
import './source.css'

const firstSoundsGroup = [
    {
      keyCode: 81,
      key: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      key: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      key: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      key: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      key: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      key: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      key: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      key: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      key: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];
  
  const secondSoundsGroup = [
    {
      keyCode: 81,
      key: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
      keyCode: 87,
      key: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
      keyCode: 69,
      key: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
      keyCode: 65,
      key: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
      keyCode: 83,
      key: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
      keyCode: 68,
      key: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
      keyCode: 90,
      key: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
      keyCode: 88,
      key: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
      keyCode: 67,
      key: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  ];
  const soundsOption = {
    heaterKit: "Heater Kit",
    smoothPianoKit: "Smooth Piano Kit"
  };
  
  const musicOption = {
    heaterKit: firstSoundsGroup,
    smoothPianoKit: secondSoundsGroup
  }

  const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {
    const handleKeydown = (e) => {
      if(keyCode === e.keyCode) {
        const audio = document.getElementById(key);
        play(key, id);
        deactivateAudio(audio)
      }
    }
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
      <motion.button whileTap={{scale: 1.025}} value="test" id={keyCode} className="drum-pad btn-control" onClick={() => play(key, id)}>
        <audio className="clip" src={url} id={key} />
        {key}
      </motion.button>
    );
  }
  
  const Keyboard = ({ sounds, play, power, deactivateAudio }) =>  (
    <div className="keyboard">
      {power 
        ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
        : sounds.map((sound) => <KeyboardKey sound={{...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)        
      }
    </div>
  );
  
  const DrumControl = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
    <div className="control">
      <motion.button whileTap={{scale: 1.025}} className='btn-control px-3' onClick={stop}><small>Turn Power</small> {power ? 'OFF' : 'ON'}</motion.button>
      <small className='fw-bold'>Volume: {Math.round(volume * 100)}%</small>
      <input
        max="1"
        min="0"
        step='0.01'
        type="range"
        value={volume}
        onChange={handleVolumeChange}
        />
      <small className='fw-bold' id="display" >{name}</small>
      <button className='btn-control px-3' onClick={changeSoundGroup}><small>Change Sounds Group</small></button>
    </div>
  );

export const SoundSource = () => {
    const [power, setPower] = React.useState(true);
    const [volume, setVolume] = React.useState(1);
    const [soundName, setSoundName] = React.useState("");
    const [soundType, setSoundType] = React.useState("heaterKit");
    const [sounds, setSounds] = React.useState(musicOption[soundType]);
    
    const styleActiveKey = (key) => {
      key.parentElement.style.backgroundColor = "#4B4A80"
      key.parentElement.style.color = "#FFFDFA"
    }
    
   const deactivateAudio = (audio) => {
     setTimeout(() => {
       audio.parentElement.style.backgroundColor = "#FFFDFA"
       audio.parentElement.style.color = "#4B4A80"
     }, 300)
   }
  
    const play = (key, sound) => {
      setSoundName(sound)
      const audio = document.getElementById(key);
      styleActiveKey(audio);
      audio.currentTime = 0;
      audio.play();
      deactivateAudio(audio)
    }
  
    const stop = () => {
       setPower(!power)
    }
    
    const changeSoundGroup = () => {
      setSoundName("")
      if(soundType === "heaterKit"){
          setSoundType("smoothPianoKit");
          setSounds(musicOption.smoothPianoKit);
      } else {
          setSoundType("heaterKit");
          setSounds(musicOption.heaterKit);
      }
    }
    
    const handleVolumeChange = e => {
      setVolume(e.target.value)
    }
    
    const setKeyVolume = () => {
      const audioes = sounds.map(sound => document.getElementById(sound.key));
      audioes.forEach(audio => {
        if(audio) {
          audio.volume = volume;
        }
      }) 
    }


  return (
    <>
    <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
        <DrumControl 
          stop={stop}
          power={power}
          volume={volume} 
          name={soundName || soundsOption[soundType]} 
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange} 
         />
      </div>
    </div>
    </>
  )
}
export default SoundSource