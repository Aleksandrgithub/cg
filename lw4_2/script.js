let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight);
camera.position.z = 40;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild( renderer.domElement );

let geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
let material = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent: true} );
material.opacity = 0.6;
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let frame = new THREE.WireframeGeometry( geometry );
let lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 2,
})
let line = new THREE.LineSegments( frame, lineMaterial );
scene.add( line );

let controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}
render();