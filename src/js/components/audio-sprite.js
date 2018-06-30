import {once, random} from '../util/zorro'

const defaults = {
  sections: 5
}

let assetsUrl

/* @if NODE_ENV='development' */
assetsUrl = 'http://mp-assets-dev.diegomorales.ch/'
/* @endif */

/* @if NODE_ENV='production' */
assetsUrl = 'http://mp-assets.diegomorales.ch/'
/* @endif */

export default (options = {}) => new Promise((resolve, reject) => {
  const instance = {}
  const settings = Object.assign({}, defaults, options)
  let duration
  let audio
  let sectionDuration

  const checkPlayProgress = (end) => {
    requestAnimationFrame(() => {
      if (audio.currentTime >= end) {
        audio.pause()
      } else {
        checkPlayProgress(end)
      }
    })
  }

  /**
   *
   * @param {number} section - 0-based index of section to play
   */
  const play = (section) => {
    audio.pause()

    requestAnimationFrame(() => {
      if (section === undefined || isNaN(section)) {
        // Play entire audio
        audio.currentTime = 0
        audio.play()
      } else {
        // Play section
        audio.currentTime = section * sectionDuration
        audio.play()
        checkPlayProgress((section * sectionDuration) + sectionDuration)
      }
    })
  }

  const stop = () => {
    audio.pause()
  }

  const load = () => {
    audio = new Audio()

    once(audio, 'loadedmetadata', () => {
      duration = audio.duration
      sectionDuration = duration / settings.sections
    })
    once(audio, 'canplaythrough', () => {
      resolve(instance)
    })

    audio.src = assetsUrl + 'clip_0' + random(1, 7, 0) + '.wav'
  }

  instance.type = 'audioSprite'
  instance.play = play
  instance.stop = stop

  load()
})
