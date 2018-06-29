import {once} from '../util/zorro'

const defaults = {}

export default (options = {}) => new Promise((resolve, reject) => {
  const instance = {}

  const play = (section) => {
    if (section === undefined) {
      // play entire audio
    } else {
      // Play section
    }
  }

  instance.type = 'audioSprite'

  const load = () => {
    let audio = new Audio()

    once(audio, 'loadedmetadata', () => {})
    once(audio, 'canplaythrough', () => {
      resolve(instance)
    })

    audio.src = 'http://mp-assets-dev.diegomorales.ch/1.webm'
  }

  load()
})
