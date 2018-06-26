import * as THREE from 'three'
import observer from '../util/observer'

export default (scene, camera, blocks) => {
  const instance = {}

  const worldVector = new THREE.Vector3()
  const mouse = new THREE.Vector2()
  const offset = new THREE.Vector3()
  const helperPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 8, 8), new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0
  }))
  const raycaster = new THREE.Raycaster()
  let currentBlock
  let tmpIntersects

  helperPlane.position.z = -1.25
  scene.add(helperPlane)

  Object.assign(instance, observer())

  const onPointerdown = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    worldVector.x = mouse.x
    worldVector.y = mouse.y
    worldVector.z = -1.25

    worldVector.unproject(camera)

    raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

    // Get first found object
    let foundObjects = raycaster.intersectObjects(blocks)

    if (foundObjects.length) {
      currentBlock = foundObjects[0].object

      // Get offset
      offset.copy(raycaster.intersectObject(helperPlane)[0].point).sub(helperPlane.position)
      // console.log(offset)
      document.addEventListener('pointerup', onPointerup)
    }
  }

  const onPointermove = (e) => {
    e.preventDefault()

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    worldVector.x = mouse.x
    worldVector.y = mouse.y
    worldVector.z = -1.25

    worldVector.unproject(camera)

    raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

    if (currentBlock) {
      tmpIntersects = raycaster.intersectObject(helperPlane)

      // console.log(tmpIntersects[0])
      currentBlock.position.x = tmpIntersects[0].point.x - offset.x
      currentBlock.position.y = tmpIntersects[0].point.y - offset.y
    } else {
      // Update position of the plane if need
      let tmpIntersects = raycaster.intersectObjects(blocks)
      // console.log(tmpIntersects[0].point)
      if (tmpIntersects.length > 0) {
        helperPlane.position.copy(tmpIntersects[0].object.position)
        helperPlane.lookAt(camera.position)
      }
    }
  }

  const onPointerup = () => {
    // Clear reference
    currentBlock = null

    // Update position of the plane if need
    tmpIntersects = raycaster.intersectObjects(blocks)
    if (tmpIntersects.length > 0) {
      helperPlane.position.copy(tmpIntersects[0].object.position)
      helperPlane.lookAt(camera.position)
    }

    document.removeEventListener('pointerup', onPointerup)
  }

  // Bind events
  document.addEventListener('pointermove', onPointermove)
  document.addEventListener('pointerdown', onPointerdown)

  return instance
}
