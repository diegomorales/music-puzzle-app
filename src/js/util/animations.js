import { TweenLite, TimelineLite, Power3, Back } from 'gsap/TweenMax'

const iterate = (group, fn) => {
  group.children.forEach((child) => {
    if (child.type === 'Group') {
      iterate(child, fn)
    } else {
      fn(child)
    }
  })
}

export const throwOut = (group, options = {}) => new Promise((resolve, reject) => {
  let tl = new TimelineLite({
    paused: true,
    onComplete: () => {
      resolve()
    }
  })

  iterate(group, (child) => {
    tl.to(child.rotation, 0.5, {x: child.rotation.x - 1, ease: Power3.easeInOut,}, 0)
    tl.to(child.material, 0.5, {opacity: 0, ease: Power3.easeInOut,}, 0)
  })

  tl.play()
})

export const fadeOut = (group, options = {}) => new Promise((resolve, reject) => {
  let tl = new TimelineLite({
    paused: true,
    onComplete: () => {
      resolve()
    }
  })

  iterate(group, (child) => {
    tl.to(child.material, 0.33, {opacity: 0}, 0)
  })

  tl.play()
})

export default {
  throwOut
}
