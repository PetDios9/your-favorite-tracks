import TracksModel from "../models/TracksModel"

export default function TrackCard(props: TracksModel) {
  return (
    <div key={props.trackId} className="track-card">
            <img className="track-image" src={props.image} />
            <h1>{props.trackName}</h1>
            <p>{props.artistName}</p>
            <h1>#{props.placement}</h1>
    </div>
  )
}
