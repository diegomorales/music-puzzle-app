import observer from '../util/observer'

let pubsub = observer()

export default pubsub

// @if NODE_ENV='development'
window.pubsub = pubsub
// @endif
