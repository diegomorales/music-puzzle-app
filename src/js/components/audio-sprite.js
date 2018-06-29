import {once} from '../util/zorro'

const defaults = {
  sections: 5
}

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

    audio.src = 'http://mp-assets-dev.diegomorales.ch/test-song.wav'
  }

  instance.type = 'audioSprite'
  instance.play = play

  load()
})
