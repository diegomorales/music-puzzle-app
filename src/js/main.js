import WebVRSetup from './modules/webvr-setup'
import game from './components/game'
import vrButton from './components/vr-button'
import global from './modules/global'

WebVRSetup.init()

game()
vrButton({
  id: 'play',
  size: 'large',
  text: 'PLAY!'
})
  .then((button) => {
    console.log(button)
    button.position.z = -1.25
    button.position.y = 1.25
    global.selectables.add(button)
  })
