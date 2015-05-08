(function(WIDTH, HEIGHT) {
  // set some camera attributes
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;
  var container = document.getElementById('container');

  // create a WebGL renderer, camera
  // and a scene
  var renderer = new THREE.WebGLRenderer();
  var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  var scene = new THREE.Scene();
  // set up the sphere vars
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
  // create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!
  // radius = 50, segments = 16, rings = 16;
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16), sphereMaterial);

  // create a point light
  var pointLight = new THREE.PointLight(0xFFFFFF);

  // attach the render-supplied DOM element
  container.appendChild(renderer.domElement);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  scene.add(pointLight);
  scene.add(sphere);
  scene.add(camera);

  // the camera starts at 0,0,0
  // so pull it back
  camera.position.z = 300;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);
  renderer.render(scene, camera);
}).call(this, 300, 400);
