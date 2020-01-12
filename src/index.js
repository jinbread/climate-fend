import "./styles.css";

var THREE = require("three");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threeScene").appendChild(renderer.domElement);

renderer.setClearColor(0xffffff, 0);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x0000cc });
var cube = new THREE.Mesh(geometry, material);
var cube2 = new THREE.Mesh(geometry, material);
var cube3 = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(cube2);
scene.add(cube3);

camera.position.z = 5;

cube.position.set(1.5, -2, 0);

cube2.position.set(2, 2, 0);
cube3.position.set(-2.5, 0, 0);

var animate = function() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.02;
  cube2.rotation.y += 0.02;
  cube3.rotation.x += 0.005;
  cube3.rotation.y += 0.005;

  renderer.render(scene, camera);
};

animate();


//


var degreeChange = 0;
var verticalHeight = 7200;
var jaguarRate = 0;

window.addEventListener("scroll", function(e) {
  degreeChange =
    (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 2;
  document.getElementById("degreeChange").innerHTML = degreeChange.toFixed(1);
  document.getElementById("pixelChange").innerHTML = window.pageYOffset + "px";
  jaguarRate =
    (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 100;
  this.document.getElementById("decrease-rate").innerHTML =
    jaguarRate.toFixed(0) + "%";
  this.document.getElementById("selected-species").innerHTML = "Bumblebee";
});

document.getElementById("app").innerHTML = `
<div id="scrollWrapper">
  <div id="degreeChange">0.0</div>
  <div id="pixelChange">0px</div>
</div>
<div class="hello"></div>
`;

window.addEventListener("click", function(e) {
  this.document.getElementById("decrease-rate").innerHTML =
    jaguarRate.toFixed(0) + "%";
  this.document.getElementById("selected-species").innerHTML = "Bumblebee";
});

document.getElementById("overlay").innerHTML = `
<div class="overlay-wrapper">
  <h1 id="decrease-rate">0%</h1>
  <h2 id="selected-species">Bumblebee</h2>
  <h2 style="margin-bottom: 12px;">in the world have disappeared</h2>
  <h3 style="margin-bottom: 12px;">Related Species</h3>
  <ul class="related-species-list">
    <li><a href="#">Lion</a></li>
    <li>Puma</li>
    <li>Jaguar</li>
  </ul>
</div>
`;
