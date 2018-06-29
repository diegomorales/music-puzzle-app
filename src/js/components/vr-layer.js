import * as THREE from 'three'
import global from '../modules/global'
import appSettings from '../app-settings'

export default (options = {}) => {
  const instance = {}

  // Private vars
  let layer = new THREE.Group()
  let layerSelectable = new THREE.Group()

  // Public methods
  instance.addToLayer = (object) => {
    layer.add(object)
  }

  instance.addToLayerSelectable = (object) => {
    layerSelectable.add(object)
  }

  instance.show = () => {
    global.scene.add(layer)
    global.selectables.add(layerSelectable)
  }

  instance.hide = () => {
    global.scene.remove(layer)
    global.selectables.remove(layerSelectable)
  }

  // Initialisation
  layer.position.z = appSettings.mainZ
  layer.position.y = appSettings.perceivedCenterY

  layerSelectable.position.z = appSettings.mainZ
  layerSelectable.position.y = appSettings.perceivedCenterY

  return instance
}
