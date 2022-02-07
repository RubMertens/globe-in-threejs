import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  Mesh,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from 'three'

import gsap from 'gsap'

import vertexShader from './shaders/globe/vertex.glsl?raw'
import fragmentShader from './shaders/globe/fragment.glsl?raw'

import atmoVertexShader from './shaders/atmosphere/vertex.glsl?raw'
import atmoFragmentShader from './shaders/atmosphere/fragment.glsl?raw'

import earthUrl from '../earth.jpg'

const canvasContainer = document.getElementById('globe-container') as HTMLElement

const scene = new Scene()
const aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight
const camera = new PerspectiveCamera(75, aspect, 0.01, 1000)
camera.position.set(0, 0, 200)

const light = new DirectionalLight('white', 1)
light.position.set(0, 10, 10)
scene.add(light)

const sphereGeom = new SphereGeometry(50, 50, 50)
const basicMesh = new ShaderMaterial({
  // map:
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new TextureLoader().load(earthUrl),
    },
  },
})
const earth = new Mesh(sphereGeom, basicMesh)

const atmosphereGeom = new SphereGeometry(50, 50, 50)
atmosphereGeom.scale(1.1, 1.1, 1.1)
const atmoSphereTexture = new ShaderMaterial({
  // map:
  vertexShader: atmoVertexShader,
  fragmentShader: atmoFragmentShader,
  blending: AdditiveBlending,
  side: BackSide,
})
const atmoSphere = new Mesh(atmosphereGeom, atmoSphereTexture)
scene.add(atmoSphere)

const renderer = new WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('globe') as HTMLCanvasElement,
})
renderer.setPixelRatio(devicePixelRatio)
// renderer.setSize(innerWidth, innerHeight)
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)

// document.body.appendChild(renderer.domElement)

const mouse = {
  x: 0,
  y: 0,
}
addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = -(e.clientY / window.innerHeight) * 2 + 1
  mouse.x = x
  mouse.y = y
})

const group = new Group()
group.add(earth)
scene.add(group)

const starGeom = new BufferGeometry()
const starMat = new PointsMaterial({
  color: 'white',
})

const starVertices = []
for (let i = 0; i < 10_000; i++) {
  const spread = 2000
  const x = (Math.random() - 0.5) * spread
  const y = (Math.random() - 0.5) * spread
  const z = -Math.random() * spread
  starVertices.push(x, y, z)
}
starGeom.setAttribute('position', new Float32BufferAttribute(starVertices, 3))

const stars = new Points(starGeom, starMat)
scene.add(stars)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  earth.rotation.y += 0.003
  gsap.to(group.rotation, {
    y: mouse.x * 0.3,
    x: -mouse.y * 0.5,
    duration: 2,
  })
}
animate()
