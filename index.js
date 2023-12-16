import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

let renderer, cameraTPS, cameraFPS, scene, activeCam;
let width = window.innerWidth;
let height = window.innerHeight;
let aspect = width / height;

// Default
const init = () => {
  // scene
  scene = new THREE.Scene();

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor("blue");

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);
};
// Render
const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, activeCam);
};

// Camera
const initCameraTPS = () => {
  cameraTPS = new THREE.PerspectiveCamera(45, aspect);
  cameraTPS.position.set(0, 15, 55);
  cameraTPS.lookAt(0, 0, 0);

  let controls = new OrbitControls(cameraTPS, renderer.domElement);
  controls.target = new THREE.Vector3(0, 7, 0);
  controls.update();

  activeCam = cameraTPS;
};
const initCameraFPS = () => {
  cameraFPS = new THREE.PerspectiveCamera(45, aspect);
  cameraFPS.position.set(-50, 15, 0);
  cameraFPS.lookAt(0, 15, 0);
};
// Swith Camera "c"
const switchCamera = (event) => {
  if (event.key === "c" || event.key === "C") {
    if (activeCam === cameraTPS) {
      activeCam = cameraFPS;
      controls.enabled = false;
    } else {
      activeCam = cameraTPS;
      controls.enabled = true;
    }
  }
};

// Light
const ambientLight = () => {
  let light = new THREE.AmbientLight("#FFFFFC", 0.5);
  light.position.set(0, 0, 0);
  light.castShadow = false;
  scene.add(light);
};
const spotLight = () => {
  let light = new THREE.SpotLight("#FFFFFF", 1.2, 0);
  light.castShadow = true;
  light.position.set(-80, 40, 0);

  const switchIntensity = (event) => {
    if (event.key === " ") {
      if (light.intensity === 1.2) {
        light.intensity = 0.5;
      } else {
        light.intensity = 1.2;
      }
    }
  };

  document.addEventListener("keypress", switchIntensity);

  scene.add(light);
};

// OBJECT
// Ground
const grass = () => {
  let geo = new THREE.PlaneGeometry(100, 75);
  let texture = new THREE.TextureLoader().load("Assets/grass.png");
  let mat = new THREE.MeshStandardMaterial({ 
    map: texture,
    side: THREE.DoubleSide // Agar tidak terlihat bolong di posisi kamera tertentu
  });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -7.5);
  mesh.rotateX(Math.PI / -2); // Ini harusnya perlu untuk membuat geometry menjadi flat terhadap objek/menjadi ground
  mesh.receiveShadow = true;

  scene.add(mesh);
};
// Model
const zombie = () => {
  let loader = new GLTFLoader().load(
    "Assets/zombie/scene.gltf",
    function (gltf) {
      const zombie = gltf.scene;
      zombie.scale.set(60, 60, 60);
      zombie.position.set(10, 0, 0);
      zombie.rotateY(-Math.PI / 4);
      zombie.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(zombie);
    }
  );
};
// Text
const text = () => {
  let loader = new FontLoader().load(
    "https://unpkg.com/three@v0.157.0/examples/fonts/gentilis_bold.typeface.json",
    function (font) {
      let geo = new TextGeometry("Plants NO Zombies", {
        font: font,
        size: 10,
        height: 2,
      });
      let mat = new THREE.MeshPhongMaterial({ color: "#CCB7B6" });
      let mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(-55, 20, -50);
      scene.add(mesh);
    }
  );
};

// Fence
const fences1 = () => {
  let loader = new GLTFLoader().load(
    "Assets/fence/scene.gltf",
    function (gltf) {
      const fence = gltf.scene;
      fence.scale.set(10, 10, 10);
      fence.position.set(-40, 8.5, -44);
      fence.castShadow = true;
      fence.receiveShadow = true;

      scene.add(fence);
    }
  );
};
const fences2 = () => {
  let loader = new GLTFLoader().load(
    "Assets/fence/scene.gltf",
    function (gltf) {
      const fence = gltf.scene;
      fence.scale.set(10, 10, 10);
      fence.position.set(-20, 8.5, -44);
      fence.castShadow = true;
      fence.receiveShadow = true;

      scene.add(fence);
    }
  );
};
const fences3 = () => {
  let loader = new GLTFLoader().load(
    "Assets/fence/scene.gltf",
    function (gltf) {
      const fence = gltf.scene;
      fence.scale.set(10, 10, 10);
      fence.position.set(0, 8.5, -44);
      fence.castShadow = true;
      fence.receiveShadow = true;

      scene.add(fence);
    }
  );
};
const fences4 = () => {
  let loader = new GLTFLoader().load(
    "Assets/fence/scene.gltf",
    function (gltf) {
      const fence = gltf.scene;
      fence.scale.set(10, 10, 10);
      fence.position.set(20, 8.5, -44);
      fence.castShadow = true;
      fence.receiveShadow = true;

      scene.add(fence);
    }
  );
};
const fences5 = () => {
  let loader = new GLTFLoader().load(
    "Assets/fence/scene.gltf",
    function (gltf) {
      const fence = gltf.scene;
      fence.scale.set(10, 10, 10);
      fence.position.set(40, 8.5, -44);
      fence.castShadow = true;
      fence.receiveShadow = true;

      scene.add(fence);
    }
  );
};
// Peashooter
let marker = false // Declare buat cek hanya 1 pea
const head = () =>{
    let geo = new THREE.SphereGeometry(2.5, 64)
    let mat = new THREE.MeshPhongMaterial({color: "#52D017"})
    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-30, 10, 0)
    mesh.castShadow = true

    scene.add(mesh)

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector3();

    function mouseclick(event) {
        if(!marker){
            mouse.x = (event.clientX/width) * 2 - 1;
            mouse.y = -(event.clientY/height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, activeCam);
            const intersect = raycaster.intersectObjects(scene.children);
            
            // Pea muncul hanya ketika klik head()
            for (let i = 0; i < intersect.length; i++) {
                if (intersect[i].object === mesh) {
                    pea();
                    marker = true;
                }
            }
        }
    }
    
    window.addEventListener('click', mouseclick);
}
// Dynamic Object
const pea = () =>{
    let geo = new THREE.SphereGeometry(1, 64)
    let mat = new THREE.MeshPhongMaterial({
        color: "#52D017"
    })
    let mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.position.set(-27, 10, 0)

    scene.add(mesh)

    const peaMove = () =>{
        mesh.position.x += 0.5
        renderer.render(scene, activeCam)
        if(mesh.position.x > 10){
            scene.remove(mesh)
            marker = false
        }else{
            marker = true
        }
    }

    const movement = () => {
        requestAnimationFrame(movement); 
        peaMove(); 
    };
    peaMove()
    movement()
};

// OBJECT
const mouth = () => {
  let geo = new THREE.CylinderGeometry(0.5, 1, 2.5, 64, 64, true);
  let mat = new THREE.MeshPhongMaterial({ 
    color: "#52D017",
    side: THREE.DoubleSide // Agar tidak terlihat bolong di posisi kamera tertentu
  });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-26.5, 10, 0);
  mesh.castShadow = true;
  mesh.rotateZ(Math.PI / 2);

  scene.add(mesh);
};
const headTop = () => {
  let geo = new THREE.ConeGeometry(1, 2.5, 64);
  let mat = new THREE.MeshPhongMaterial({ color: "#43B000" });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-32.5, 12, 0);
  mesh.castShadow = true;
  mesh.rotateZ(Math.PI / 4);

  scene.add(mesh);
};
const eyes1 = () => {
  let geo = new THREE.SphereGeometry(0.5, 64);
  let mat = new THREE.MeshPhongMaterial({ color: "#000000" });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-28.5, 11, -1.5);
  mesh.castShadow = true;

  scene.add(mesh);
};
const eyes2 = () => {
  let geo = new THREE.SphereGeometry(0.5, 64);
  let mat = new THREE.MeshPhongMaterial({ color: "#000000" });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-28.5, 11, 1.5);
  mesh.castShadow = true;

  scene.add(mesh);
};
const trunk = () => {
  let geo = new THREE.CylinderGeometry(0.75, 0.75, 10, 64, 64, true);
  let mat = new THREE.MeshPhongMaterial({ color: "#4BBF15" });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-30, 5, 0);
  mesh.castShadow = true;

  scene.add(mesh);
};
// Wallnut
const wallnut = () => {
  // let geo = new THREE.CylinderGeometry(4.5, 4.5, 3, 64, 64, false); // Gunakan ini agar tetap muncul sebagai utuh & tidak bolong
  let geo = new THREE.CylinderGeometry(4.5, 4.5, 3, 64, 64, true);
  let texture = new THREE.TextureLoader().load("Assets/wallnut.jpeg");
  let mat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide // Agar semua bagian object terlihat di posisi kamera apapun
  });
  let mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(-17.5, 4.5, 0);
  mesh.castShadow = true;
  mesh.rotateZ(Math.PI / 2);

  scene.add(mesh);
};

// Sky
const skybox = () => {
  const geo = new THREE.BoxBufferGeometry(1000, 1000, 1000);
    const loader = new THREE.TextureLoader();
    const matday = [
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_ft.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_bk.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_up.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_dn.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_rt.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/cloudy/bluecloud_lf.jpg'),
            side: THREE.BackSide
        })
    ]
    const matnight = [
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: loader.load('Assets/nightskycolor.png'),
            side: THREE.BackSide
        })
    ]
    
    const mesh = new THREE.Mesh(geo, matday);
    scene.add(mesh);

    let switcher = false
    const switchSky = (event) => {
        if (event.key === ' '){
            if (!switcher){
                mesh.material = matnight
                scene.add(mesh)
                switcher = true
            }else{
                mesh.material = matday
                scene.add(mesh)
                switcher = false
            }
        }
    };

  document.addEventListener("keypress", switchSky);
};

// Window
window.onload = () => {
  init();

  initCameraTPS();
  initCameraFPS();
  document.addEventListener("keypress", switchCamera);

  grass();
  zombie();
  text();
  fences1();
  fences2();
  fences3();
  fences4();
  fences5();
  head();
  mouth();
  headTop();
  eyes1();
  eyes2();
  trunk();
  wallnut();

  skybox();

  ambientLight();
  spotLight();

  render();
};
window.onresize = () => {
  renderer.setSize(width, height);

  cameraTPS.aspect = aspect;
  cameraTPS.updateProjectionMatrix();

  cameraFPS.aspect = aspect;
  cameraFPS.updateProjectionMatrix();
};
