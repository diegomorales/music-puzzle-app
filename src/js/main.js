// import config from './config'
//
// // Create audiocontext
// window.audiocontext = new AudioContext()
//
// // Prepare game
//
// // 1. Get a song
// const createGraph = (audioBuffer) => {
//   let renderContext = new OfflineAudioContext(2, audioBuffer.length, 44100)
//   let renderBufferSource = renderContext.createBufferSource()
//   // let analyser = renderContext.createAnalyser()
//   let waveData = []
//   let rId = -1
//   let writeNode
//
//   const writeWaveData = () => {
//     rId = requestAnimationFrame(writeWaveData)
//
//     waveData.push({
//       t: renderContext.currentTime
//     })
//   }
//
//   renderContext.audioWorklet.addModule('assets/write-data.js')
//     .then(() => {
//       writeNode = new AudioWorkletNode(renderContext, 'write-data')
//
//       console.log(audioBuffer, renderContext)
//
//       renderBufferSource.buffer = audioBuffer
//       // renderBufferSource.connect(analyser)
//       renderBufferSource.connect(writeNode).connect(renderContext.destination)
//
//       // writeWaveData()
//       renderBufferSource.start()
//       renderContext.startRendering().then(() => {
//         // cancelAnimationFrame(rId)
//         console.log(waveData)
//       })
//     })
// }
//
// fetch(config.assetsPath + '1.webm')
//   .then((response) => response.arrayBuffer())
//   .then((arrayBuffer) => {
//     audiocontext.decodeAudioData(arrayBuffer, (buffer) => {
//       createGraph(buffer)
//       // currentSong = audiocontext.createBufferSource()
//       // currentSong.buffer = buffer
//       // currentSong.connect(audiocontext.destination)
//     })
//   })

// import * as THREE from 'three'
// import {deg2rad} from './util/zorro'
//
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer()
//
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshLambertMaterial({color: 0x00ff00})
// const cube = new THREE.Mesh(geometry, material)
// cube.rotation.x = deg2rad(45)
//
// const light = new THREE.AmbientLight(0x404040, 0.5) // soft white light
// scene.add(light)
//
// const pointlight = new THREE.PointLight(0xffffff, 1)
// pointlight.position.set(0, 50, 50)
// scene.add(pointlight)
//
// scene.add(cube)
//
// scene.background = new THREE.Color(0xffffff)
//
// camera.position.z = 5
//
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// renderer.render(scene, camera)
//
// const animate = () => {
//   requestAnimationFrame(animate)
//
//   // cube.rotation.x += deg2rad(1)
//   renderer.render(scene, camera)
// }
//
// animate()
