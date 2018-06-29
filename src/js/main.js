import WebVRSetup from './modules/webvr-setup'
import GamePlay from './modules/game-play'
// import game from './components/game'
// import vrButton from './components/vr-button'
// import vrText from './components/vr-text'
// import global from './modules/global'

WebVRSetup.init()
GamePlay.init()

// game()
// vrButton({
//   id: 'play',
//   size: 'large',
//   text: 'PLAY!'
// })
//   .then((button) => {
//     console.log(button)
//     button.position.z = -1.25
//     button.position.y = 1.25
//     global.selectables.add(button)
//   })

// vrText({
//   text: 'Music Puzzle'
// })
//   .then((text) => {
//     console.log(text)
//     text.position.z = -1.25
//     text.position.y = 1.4
//     global.scene.add(text)
//   })
