import WEBVR from '../vendor/three/WebVR'
import global from './global'

const instance = {}
let renderer

instance.init = () => {
  renderer = global.renderer

  let div = document.createElement('div')

  div.appendChild(WEBVR.createButton(renderer))
  div.style.position = 'absolute'
  div.style.bottom = '0'
  div.style.width = '100%'
  div.style.height = '80px'
  div.style.backgroundColor = 'rgba(0,0,0,0.33)'

  document.body.appendChild(div)
}

export default instance
