import TracksModel from '../models/TracksModel'

export default function SongScreens(props: TracksModel) {
  return (
    <div className='song-screen' id={props.trackId}>
        <img height={250} width={250} className='album-artwork' src={props.image} alt={`${props.albumName} album artwork`} />
    </div>
  )
}
