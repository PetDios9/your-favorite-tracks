import TracksModel from "../models/TracksModel"

export default function TrackCard(props: TracksModel) {
  return (
    <div key={props.trackId} className="track-card">
            <img className="track-image" src={props.image} />
            <h1>{props.trackName}</h1>
            <p>{props.artistName}</p>
            {
                props.previewURL !== '' ? <audio src={props.previewURL} controls /> : <p>No Preview Available</p>
            }
            <h1 className="placement-number">#{props.placement}</h1>
            <a className="track-link" href={props.externalUrl} target="_blank">LISTEN ON SPOTIFY</a>
            <svg width="88" height="55" viewBox="0 0 88 126" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M69.8259 38.5636C55.6831 30.2367 32.3566 29.4713 18.8557 33.5335C16.688 34.1863 14.3957 32.9725 13.7387 30.8228C13.0816 28.6725 14.304 26.4009 16.4736 25.7474C31.9709 21.0821 57.7339 21.9833 74.014 31.5656C75.9648 32.7134 76.6042 35.2108 75.4482 37.141C74.2916 39.0749 71.7704 39.7114 69.8259 38.5636ZM64.657 52.0143C52.8679 44.8283 34.8886 42.7472 20.9394 46.9446C19.1308 47.4861 17.2204 46.4754 16.6709 44.6855C16.1265 42.8918 17.1458 41.0019 18.9525 40.4566C34.8867 35.6611 54.696 37.9844 68.2368 46.2346C69.8455 47.2169 70.352 49.3049 69.3624 50.8974C68.3702 52.4936 66.2657 52.9942 64.657 52.0143ZM60.2342 63.6444C49.9312 57.4017 36.9646 55.9916 21.6919 59.4507C20.2204 59.7847 18.7545 58.8702 18.4188 57.4117C18.0811 55.9527 18.9999 54.498 20.4746 54.1653C37.1879 50.3773 51.5228 52.0074 63.0875 59.0136C64.3762 59.7941 64.7828 61.4645 63.9943 62.7431C63.2063 64.0242 61.523 64.4261 60.2342 63.6444ZM0 43.4994C0 67.5254 19.6437 87 43.8732 87C68.1046 87 87.7464 67.5254 87.7464 43.4994C87.7464 19.4758 68.1046 0 43.8732 0C19.6437 0 0 19.4758 0 43.4994Z" fill="black"/>
              <line y1="123.5" x2="88" y2="123.5" stroke="black" strokeWidth="5"/>
            </svg>
    </div>
  )
}
