// Setting colors
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
		magenta: 0xb34d6f,
		pink: 0xeb5160,
		lightPink: 0xebd4cb,
		purple: 0xb78f93,
		orange: 0xf4b44f,
};

// Three.js variables

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

// Screen & mouse variables

var HEIGHT, WIDTH,
    mousePos = { x: 0, y: 0 };

// Init Three.js, screen and mouse events

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

// Handle screen events

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


// Lights

var ambientLight, hemisphereLight, shadowLight;

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

// Start of 3D objects

var Submarine = function(){
this.mesh = new THREE.Object3D();
this.mesh.name = "submarine";

  // Cockpit

  var geomCockpit = new THREE.BoxGeometry(80,60,50,1,1,1);
  var matCockpit = new THREE.MeshPhongMaterial({color:Colors.pink, shading:THREE.FlatShading});

  geomCockpit.vertices[4].y-=10;
  geomCockpit.vertices[4].z+=20;
  geomCockpit.vertices[5].y-=10;
  geomCockpit.vertices[5].z-=20;
  geomCockpit.vertices[6].y+=25;
  geomCockpit.vertices[6].z+=20;
  geomCockpit.vertices[7].y+=25;
  geomCockpit.vertices[7].z-=20;

  var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);

  // Front Window

  var geomWindow = new THREE.BoxGeometry(20,60,50,1,1,1);
  var matWindow = new THREE.MeshPhongMaterial({color:Colors.blue,transparent:true, opacity:.3, shading:THREE.FlatShading});
  var frontWindow = new THREE.Mesh(geomWindow, matWindow);
  frontWindow.position.x = 50;
  frontWindow.castShadow = true;
  frontWindow.receiveShadow = true;
  this.mesh.add(frontWindow);

  // Submarine tail

  var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
  var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.lightPink, shading:THREE.FlatShading});
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-30,20,0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  this.mesh.add(tailPlane);

  // Little windows

  var geomSideWindow = new THREE.BoxGeometry(15,15,5,1,1,1);
  var matSideWindow = new THREE.MeshPhongMaterial({color:Colors.blue,transparent:true, opacity:.5, shading:THREE.FlatShading});
  var sideWindow = new THREE.Mesh(geomSideWindow, matSideWindow);
  sideWindow.position.set(20,5,20);
  sideWindow.castShadow = true;
  sideWindow.receiveShadow = true;
  this.mesh.add(sideWindow);

	var sideWindow2 = sideWindow.clone();
	sideWindow2.position.set(-5,5,15);
  this.mesh.add(sideWindow2);

  // Periscope
  var geomPeriscope = new THREE.BoxGeometry(10,40,10,1,1,1);
  var matPeriscope = new THREE.MeshPhongMaterial({color:Colors.lightPink,/*transparent:true, opacity:.3,*/ shading:THREE.FlatShading});;
  var periscope = new THREE.Mesh(geomPeriscope, matPeriscope);
  periscope.position.set(25,40,10);

  periscope.castShadow = true;
  periscope.receiveShadow = true;

  this.mesh.add(periscope);

	// Persicope Glass

  var geomPeriscopeW = new THREE.BoxGeometry(10,10,10,1,1,1);
  var matPeriscopeW = new THREE.MeshPhongMaterial({color:Colors.blue,transparent:true, opacity:.3, shading:THREE.FlatShading});;
  var periscopeW = new THREE.Mesh(geomPeriscopeW, matPeriscopeW);
  periscopeW.position.set(35,55,10);

  periscopeW.castShadow = true;
  periscopeW.receiveShadow = true;

  this.mesh.add(periscopeW);

	// Propeller

  var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
  geomPropeller.vertices[4].y-=5;
  geomPropeller.vertices[4].z+=5;
  geomPropeller.vertices[5].y-=5;
  geomPropeller.vertices[5].z-=5;
  geomPropeller.vertices[6].y+=5;
  geomPropeller.vertices[6].z+=5;
  geomPropeller.vertices[7].y+=5;
  geomPropeller.vertices[7].z-=5;
  var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  var geomBlade = new THREE.BoxGeometry(1,50,10,1,1,1);
  var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
  var blade1 = new THREE.Mesh(geomBlade, matBlade);
  blade1.position.set(0,0,0);

  blade1.castShadow = true;
  blade1.receiveShadow = true;

  var blade2 = blade1.clone();
  blade2.rotation.x = Math.PI/2;

  blade2.castShadow = true;
  blade2.receiveShadow = true;

  this.propeller.add(blade1);
  this.propeller.add(blade2);
  this.propeller.position.set(-50,10,0);
  this.mesh.add(this.propeller);

	// Little tower

  var geomLittleTower = new THREE.BoxGeometry(30,15,10,1,1,1);
  var matLittleTower = new THREE.MeshPhongMaterial({color:Colors.pink, shading:THREE.FlatShading});
  var littleTower = new THREE.Mesh(geomLittleTower,matLittleTower);
  littleTower.position.set(25,25,10);
  this.mesh.add(littleTower);


  this.mesh.castShadow = true;
  this.mesh.receiveShadow = true;
};

Sea = function(){
  this.mesh = new THREE.Object3D();
  this.nFishes = 30;
  this.fishes = [];
  var stepAngle = Math.PI*2 / this.nFishes;
  for(var i=0; i<this.nFishes; i++){
    var c = new Fishes();
    this.fishes.push(c);
    var a = stepAngle*i;
    var h = 750 + Math.random()*200;
    c.mesh.position.y = Math.sin(a)*h;
    c.mesh.position.x = Math.cos(a)*h;
    c.mesh.position.z = -400-Math.random()*400;
    c.mesh.rotation.z = a + Math.PI/2;
    var s = 1+Math.random()*2;
    c.mesh.scale.set(s,s,s);
    this.mesh.add(c.mesh);
  }
}

Sand = function(){
  var geom = new THREE.CylinderGeometry(600,600,800,40,10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  var mat = new THREE.MeshPhongMaterial({
    color:Colors.orange,
    transparent:false,
    shading:THREE.FlatShading,
  });
  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
}

Fishes = function() {
	this.mesh = new THREE.Object3D();
	this.mesh.name = "fishes";
	var geomFishBody = new THREE.BoxGeometry(10,10,10,1,1,1);
  var matFishBody= new THREE.MeshPhongMaterial({color:Colors.pink,shading:THREE.FlatShading});;
  this.fishBody = new THREE.Mesh(geomFishBody, matFishBody);
	this.fishBody.rotation.z = 8.5;

  this.fishBody.castShadow = true;
  this.fishBody.receiveShadow = true;

	var geomFishTail = new THREE.CylinderGeometry(0, 7, 9, 4, 1);
	var matFishTail= new THREE.MeshPhongMaterial({color:Colors.white,shading:THREE.FlatShading});;
	var fishTail = new THREE.Mesh(geomFishTail, matFishTail);
	fishTail.position.set(5,5,0);
	fishTail.rotation.z = 2.5;

	fishTail.castShadow = true;
	fishTail.receiveShadow = true;

	this.fishBody.add(fishTail);
  this.mesh.add(this.fishBody);


  this.fishBody.position.set(35,55,-100);

	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;

}

// 3D Models
var sea;
var sand;
var submarine;
var myFish;

function createSubmarine(){
  submarine = new Submarine();
  submarine.mesh.scale.set(.55,.55,.55);
  submarine.mesh.position.y = 100;
  scene.add(submarine.mesh);
}

function createFish()
{
	myFish = new Fishes();
	myFish.mesh.position.y = 100;
	scene.add(myFish.mesh);
}

function createSand(){
  sand = new Sand();
  sand.mesh.position.y = -600;
  scene.add(sand.mesh);
}

function createSea(){
  sea = new Sea();
  sea.mesh.position.y = -500;
  scene.add(sea.mesh);
}

function loop(){
  updateSubmarine();
  sand.mesh.rotation.z += .005;
  sea.mesh.rotation.z += .01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function updateSubmarine(){
  var targetY = normalize(mousePos.y,-.75,.75,25, 175);
  var targetX = normalize(mousePos.x,-.75,.75,-100, 100);
  submarine.mesh.position.y = targetY;
  submarine.mesh.position.x = targetX;
  submarine.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}

function init(event){
  document.addEventListener('mousemove', handleMouseMove, false);
  createScene();
  createLights();
	//createFish();
	createSubmarine();
  createSea();
  createSand();
  loop();
}

// Handle mouse events 
var mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH)*2;
  var ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);
