let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight);
camera.position.z = 10;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFF00000, 1);
document.body.appendChild( renderer.domElement );

let geometry = new THREE.IcosahedronBufferGeometry(2,0);

let count = geometry.attributes.position.count;
let colors = [];
let color = new THREE.Color();
for (let i = 0; i < count; i += 3) {
    color.setHex( Math.random() * 0xffffff );
    colors.push( color.r, color.g, color.b );
    colors.push( color.r, color.g, color.b );
    colors.push( color.r, color.g, color.b );
}
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute(colors, 3));
let material = new THREE.MeshBasicMaterial( {transparent: true, vertexColors: THREE.VertexColors} );
material.opacity = 0.6;
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let frame = new THREE.WireframeGeometry( geometry );
let lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 5,
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