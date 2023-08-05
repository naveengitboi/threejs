import { useState, useEffect } from 'preact/hooks'
import './app.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'
function App() {

  useEffect(() => {

    //canvas
    const canvas = document.getElementById("myThreeJsCanvas")

    //scene
    const scene = new THREE.Scene();
    //camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
    camera.position.set(0,0,3)
    scene.add(camera)



    //ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff)
    ambientLight.castShadow = true;
    scene.add( ambientLight)
  
    //spot light
    const spotLight = new THREE.SpotLight(0xfefefe,1,1,10)
    spotLight.castShadow = true;
    spotLight.position.set(0,1,1)
    scene.add(spotLight);
    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( spotLightHelper );



    //render
    const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);

    //orbital controls
    const controls = new OrbitControls(camera, renderer.domElement) 
    controls.enableZoom = false
    controls.enablePan = false

    //stats
    const stats = new Stats()
    document.body.appendChild(stats.dom)

   

    
    //adding geometry
    const boxGeo = new THREE.BoxGeometry(2,1,0.5)
    const boxMaterial = new THREE.MeshStandardMaterial()
    const box = new THREE.Mesh(boxGeo, boxMaterial)
    scene.add(box)
    

     //gui
    const gui = new GUI()

   const geometryGui = gui.addFolder("Mesh Geometry")
   geometryGui.open()

   //ambient light gui
   const alightFolder = geometryGui.addFolder("Ambient Light")
   const alsettings = {changeAlColor: ambientLight.color.getHex()}
   alightFolder.add(ambientLight, 'visible')
   alightFolder.add(ambientLight, 'intensity', 0,1)

   alightFolder.addColor(alsettings, "changeAlColor").onChange((value) => box.material.color.set(value))


   //rotation gui
   const rotationgui = geometryGui.addFolder("Rotation")
   rotationgui.add(box.rotation, "x", 0, Math.PI).name("Rotation in X axis")
    rotationgui.add(box.rotation, "y", 0, Math.PI).name("Rotate in Y Axis")
    rotationgui.add(box.rotation, 'z', 0, Math.PI).name("Rotate in Z Axis")

    //scale gui
    const scaleFolder = geometryGui.addFolder("Scale")
    scaleFolder.add(box.scale,'x',0,Math.PI).name("Scale in X Axis")
    scaleFolder.add(box.scale, 'y', 0, Math.PI).name("scale in Y Axis")
    scaleFolder.add(box.scale, 'z',0, Math.PI).name("scale in z axis")

    //material props change
    const boxMaterialParams = {
      boxColor: box.material.color.getHex()
   }
   const materialFolder = geometryGui.addFolder("Material prop")
   materialFolder.addColor(boxMaterialParams, 'boxColor').onChange((value) => box.material.color.set(value))
   materialFolder.add(box.material, 'wireframe')



    //loop animate recursion
  function animate(){
      //adding scenen and camera to render
      renderer.render(scene, camera);
       stats.update() 
      controls.update()
      
    window.requestAnimationFrame(animate);
   window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera);
 })
    }
    
    animate();

  }, [])

  return (
    <div>
      <canvas id='myThreeJsCanvas'></canvas>
    </div>
  )
}

export default App