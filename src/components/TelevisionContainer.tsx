import TracksModel from '../models/TracksModel'
import television from '../assets/television.png'
import SongScreens from './SongScreens'

export default function TelevisionContainer(props: TracksModel) {
  return (
    <div className='television-container'>
        <img className='television' src={television} alt='a cartoon photo of a 90s television' />
        <SongScreens 
            trackId={props.trackId} 
            trackName={props.albumName} 
            artistName={props.artistName[0]} 
            albumName={props.albumName} 
            previewURL={props.previewURL}
            image={props.image}
            />
    </div>
  )
}
