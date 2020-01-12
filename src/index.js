import "./styles.css";


var testArray = [{
    name: "Species One",
    maxDecRate: 40,
    relatedSpecies: [{
        name: "Species Ten"
      },
      {
        name: "Species Eleven"
      },
      {
        name: "Species Twelve"
      },
      {
        name: "Species Thirteen"
      },
      {
        name: "Species Fourteen"
      }
    ]
  },
  {
    name: "Species Two",
    maxDecRate: 100,
    relatedSpecies: [{
        name: "Species Twenty"
      },
      {
        name: "Species Twenty One"
      },
      {
        name: "Species Twenty Two"
      },
      {
        name: "Species Twenty Three"
      }
    ]
  },
  {
    name: "Species Three",
    maxDecRate: 70,
    relatedSpecies: [{
        name: "Species Thirty"
      },
      {
        name: "Species Thirty One"
      },
      {
        name: "Species Thirty Two"
      },
      {
        name: "Species Thirty Three"
      },
      {
        name: "Species Thirty Four"
      },
      {
        name: "Species Thirty Five"
      }
    ]
  }
]


// Start Three.js scripts

var THREE = require("three");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threeScene").appendChild(renderer.domElement);

renderer.setClearColor(0xffffff, 0);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x0000cc
});
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

var animate = function () {
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


// End Three.js Scripts

var degreeChange;
var decreaseRate;

// Vertical scroll height. It is changealbe and currently set as 20000px.
var verticalHeight = 20000;

// Selected Species and max decrease rate will be assigned based on user input(click)
var selectedArray = testArray[0]
var selectedSpecies = selectedArray.name
var selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate
var relatedSpeciesArray = selectedArray.relatedSpecies


function displayRelatedSpecies(objectArray) {
  var mapObject = objectArray.map(function (species) {
    return `<li><a href="#">${species.name}</a></li>`
  })
  return mapObject.join('')
}

var relatedSpeciesHTML = displayRelatedSpecies(relatedSpeciesArray)



// Scroll Interaction
window.addEventListener("scroll", function (e) {
  degreeChange = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * 2;

  document.getElementById("degree-change").innerHTML = degreeChange.toFixed(1);
  // Set for debugging. Will be deleted after testing. 
  document.getElementById("pixel-change").innerHTML = this.window.pageYOffset + "px";

  decreaseRate = (window.pageYOffset / (verticalHeight - this.window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
  this.document.getElementById("selected-species").innerHTML = selectedSpecies;
  this.document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";
});

// Buttons Interaction Testing
document.addEventListener('click', function (e) {  
  if (e.target.id === "target-one") {
    selectedArray = testArray[0]
  }

  if (e.target.id === "target-two") {
    selectedArray = testArray[1]
  }

  if (e.target.id === "target-three") {
    selectedArray = testArray[2]
  }

  selectedSpecies = selectedArray.name;
  selectedSpeciesMaxDecreaseRate = selectedArray.maxDecRate;

  decreaseRate = (window.pageYOffset / (verticalHeight - window.innerHeight)) * selectedSpeciesMaxDecreaseRate;
  document.getElementById("selected-species").innerHTML = selectedSpecies;
  document.getElementById("decrease-rate").innerHTML = decreaseRate.toFixed(0) + "%";

  relatedSpeciesArray = selectedArray.relatedSpecies
  relatedSpeciesHTML = displayRelatedSpecies(relatedSpeciesArray)
  document.getElementById("related-species-list").innerHTML = `${relatedSpeciesHTML}`
})

// Insert HTML elements
document.getElementById("scroll-area").innerHTML = `
<div id="scroll-wrapper">
  <div id="degree-change">0.0</div>
  <div id="pixel-change">0px</div>
</div>
<div class="scroll-height" style="height: ${verticalHeight}px"></div>
`;

document.getElementById("overlay-area").innerHTML = `
<div class="overlay-wrapper">
  <h1 id="decrease-rate">0%</h1>
  <h2 id="selected-species">${selectedSpecies}</h2>
  <h2 style="margin-bottom: 12px;">in the world have disappeared</h2>
  <h3 style="margin: 24px 0 16px 0;">Related Species</h3>
  <ul id="related-species-list">
  ${relatedSpeciesHTML}
  </ul>
</div>
`;