const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

const scene = new THREE.Scene();

const house = new THREE.Group();

const renderer = new THREE.WebGLRenderer();

function createWalls() {
    createMiddleSideWall();
    const middleSideWall2 = createMiddleSideWall();
    middleSideWall2.position.z = 300;
    const sideWall1 = createSideWall();
    sideWall1.position.z = -150;
    const sideWall2 = createSideWall();
    sideWall2.position.z = 450;
    const sideWall3 = createSideWall();
    sideWall3.position.z = 0;
    const sideWall4 = createSideWall();
    sideWall4.position.z = 300;

    createMiddleFrontWall();

    createBackWall();
    createSideFrontWall();
    let sfw2 = createSideFrontWall();
    sfw2.position.z = -75;
}

function createRoofs() {
    createFrontRoof();
    createBackRoof();
}

function createWindows() {
    createWindow();
    let win1 = createWindow();
    win1.position.x = 120.5;
    win1.position.z = -50;
    let win2 = createWindow();
    win2.position.x = 120.5;
    win2.position.z = 400;
}

function createPorch() {
    createPlatform();
    createPiles();
    let piles2 = createPiles();
    piles2.position.z = 47.5;
    let piles3 = createPiles();
    piles3.position.z = 200.5;

    createSideRailing();
    let sideRailing2 = createSideRailing();
    sideRailing2.position.z = 47.5;

    createFrontRailing();
    createStep1();
    createStap2();
}

function createHouse() {
    createWalls();
    createRoofs()
    createWindows();
    createDoor();
    createPorch()
    createGarage();
}

function create() {
    renderer.setSize(width, height);
    renderer.setClearColor(0xcce0ff, 1);
    document.body.appendChild(renderer.domElement);

    camera.position.set(500, 60, 0)
    camera.lookAt(scene.position);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0,1,0);
    light.castShadow = true;
    scene.add(light);

    createGrass();

    createHouse();

    scene.add(house);

    scene.fog = new THREE.Fog(0xffffff, 10, 1500);
}

function createGrass() {
    const geometry = new THREE.PlaneGeometry(10000, 10000);

    const texture = new THREE.TextureLoader().load('img/grass2.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 100, 100 );

    const grassMaterial = new THREE.MeshPhongMaterial({map: texture});

    const grass = new THREE.Mesh( geometry, grassMaterial );

    grass.rotation.x = -0.5 * Math.PI;

    scene.add( grass );
}

function createSideWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-100, 0);
    shape.lineTo(120, 0);
    shape.lineTo(120,80);
    shape.lineTo(0,140);
    shape.lineTo(-100,100);
    shape.lineTo(-100,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const texture = new THREE.TextureLoader().load('./img/wall.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    var material = new THREE.MeshBasicMaterial( {map: texture} );

    const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

    house.add(sideWall);

    return sideWall;
}

function createMiddleSideWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-90, 0);
    shape.lineTo(80, 0);
    shape.lineTo(80,100);
    shape.lineTo(0,140);
    shape.lineTo(-100,100);
    shape.lineTo(-100,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const texture = new THREE.TextureLoader().load('./img/wall.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    let material = new THREE.MeshBasicMaterial( {map: texture} );

    const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

    house.add(sideWall);

    return sideWall;
}

function createPlatform() {
    const geometry = new THREE.BoxGeometry( 50, 220, 12);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 1 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    const texture2 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 5, 0.3 );
    texture2.rotation = Math.PI / 2;

    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture2});

    const texture3 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set( 0.9, 0.3 );

    const textureMaterial3 = new THREE.MeshBasicMaterial({map: texture3});

    const materials = [
        textureMaterial,
        textureMaterial2,
        textureMaterial3,
        textureMaterial3,
        textureMaterial,
        textureMaterial
    ];

    const platform = new THREE.Mesh( geometry, materials );

    house.add(platform);

    platform.rotation.x = Math.PI / 2;
    platform.rotation.y = Math.PI;
    platform.position.y = 5;
    platform.position.x = 110;
    platform.position.z = 155;

    return platform;
}

function createPiles() {
    const geometry = new THREE.BoxGeometry( 5, 5, 60);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.0001, 1 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    texture.repeat.set( 3, 0.0001 );

    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture});

    const materials = [
        textureMaterial,
        textureMaterial,
        textureMaterial2,
        textureMaterial2,
        textureMaterial,
        textureMaterial
    ];

    const piles = new THREE.Mesh( geometry, materials );

    house.add(piles);

    piles.rotation.x = Math.PI / 2;
    piles.rotation.y = Math.PI;
    piles.position.y = 40;
    piles.position.x = 132.5;
    piles.position.z = 262.5;

    return piles;
}

function createSideRailing() {
    const geometry = new THREE.BoxGeometry( 5, 5, 50);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.0001, 1 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    texture.repeat.set( 3, 0.0001 );
    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture});

    const materials = [
        textureMaterial,
        textureMaterial,
        textureMaterial2,
        textureMaterial2,
        textureMaterial,
        textureMaterial
    ];

    const railing = new THREE.Mesh( geometry, materials );

    house.add(railing);

    railing.rotation.x = Math.PI / 2;
    railing.rotation.y = Math.PI / 2;
    railing.position.y = 30;
    railing.position.x = 110;
    railing.position.z = 262.5;

    return railing;
}

function createFrontRailing() { // горизонтальная балка
    const geometry = new THREE.BoxGeometry( 5, 5, 155);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.001, 2 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    const texture2 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 3, 0.0001 );
    texture2.rotation = Math.PI / 2;

    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture2});

    const materials = [
        textureMaterial,
        textureMaterial,
        textureMaterial2,
        textureMaterial2,
        textureMaterial,
        textureMaterial
    ];

    const railing = new THREE.Mesh( geometry, materials );

    house.add(railing);

    railing.position.y = 30;
    railing.position.x = 132.5;
    railing.position.z = 122.5;

    return railing;
}

function createStep1() {
    const geometry = new THREE.BoxGeometry( 5, 65, 8);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 0.1 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    const texture2 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 1, 0.1 );
    texture2.rotation = Math.PI / 2;

    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture2});

    const texture3 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set( 0.1, 0.1 );

    const textureMaterial3 = new THREE.MeshBasicMaterial({map: texture3});

    const materials = [
        textureMaterial,
        textureMaterial2,
        textureMaterial3,
        textureMaterial3,
        textureMaterial,
        textureMaterial
    ];

    const step = new THREE.Mesh( geometry, materials );

    house.add(step);

    step.rotation.x = Math.PI / 2;
    step.rotation.y = Math.PI;
    step.position.y = 2.5;
    step.position.x = 137.5;
    step.position.z = 230;

    return step;
}

function createStap2() {
    const geometry = new THREE.BoxGeometry( 5, 65, 4);

    const texture = new THREE.TextureLoader().load('./img/material.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 0.1 );
    texture.rotation = Math.PI / 2;

    const textureMaterial = new THREE.MeshBasicMaterial({map: texture});

    const texture2 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set( 1, 0.1 );
    texture2.rotation = Math.PI / 2;

    const textureMaterial2 = new THREE.MeshBasicMaterial({map: texture2});

    const texture3 = new THREE.TextureLoader().load('./img/material.jpeg');
    texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;
    texture3.repeat.set( 0.1, 0.1 );

    const textureMaterial3 = new THREE.MeshBasicMaterial({map: texture3});

    const materials = [
        textureMaterial,
        textureMaterial2,
        textureMaterial3,
        textureMaterial3,
        textureMaterial,
        textureMaterial
    ];

    const step = new THREE.Mesh( geometry, materials );

    house.add(step);

    step.rotation.x = Math.PI / 2;
    step.rotation.y = Math.PI;
    step.position.y = 2;
    step.position.x = 142.5;
    step.position.z = 230;

    return step;
}

function createSideFrontWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-75, 0);
    shape.lineTo(75, 0);
    shape.lineTo(75,75);
    shape.lineTo(-75,75);
    shape.lineTo(-75,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape )

    const texture = new THREE.TextureLoader().load('./img/wall.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    const material = new THREE.MeshBasicMaterial({map: texture} );

    const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

    frontWall.position.z = 375;
    frontWall.position.x = 120;
    frontWall.rotation.y = Math.PI * 0.5;

    house.add(frontWall);

    return frontWall;
}

function createBackWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-300, 0)
    shape.lineTo(300, 0)
    shape.lineTo(300,100)
    shape.lineTo(-300,100);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape )

    const texture = new THREE.TextureLoader().load('./img/wall.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    const material = new THREE.MeshBasicMaterial({map: texture});

    const backWall = new THREE.Mesh( extrudeGeometry, material) ;

    backWall.position.z = 150;
    backWall.position.x = -100;;
    backWall.rotation.y = Math.PI * 0.5;

    house.add(backWall);

    return backWall;
}
function createMiddleFrontWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-150, 0)
    shape.lineTo(150, 0)
    shape.lineTo(150,100)
    shape.lineTo(-150,100);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape )

    const texture = new THREE.TextureLoader().load('./img/wall.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    const material = new THREE.MeshBasicMaterial({map: texture});

    const middleFrontWall = new THREE.Mesh( extrudeGeometry, material) ;

    middleFrontWall.position.z = 150;
    middleFrontWall.position.x = 80;
    middleFrontWall.rotation.y = Math.PI * 0.5;

    house.add(middleFrontWall);

    return middleFrontWall;
}

function createFrontRoof() {
    const geometry = new THREE.BoxGeometry( 150, 620, 6 );

    const texture = new THREE.TextureLoader().load('./img/tile.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 1);
    texture.rotation = Math.PI / 2;
    const textureMaterial = new THREE.MeshPhongMaterial({ map: texture});

    const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });

    const materials = [
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        textureMaterial
    ];

    const roof = new THREE.Mesh( geometry, materials );
    house.add(roof);

    roof.rotation.x = Math.PI / 2;
    roof.rotation.y = - Math.PI / 4 * 0.6;
    roof.position.y = 105;
    roof.position.x = 65;
    roof.position.z = 150;

    return roof;
}

function createBackRoof() {
    const geometry = new THREE.BoxGeometry( 120, 620, 6 );

    const texture = new THREE.TextureLoader().load('./img/tile.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 1);
    texture.rotation = Math.PI / 2;
    const textureMaterial = new THREE.MeshPhongMaterial({ map: texture});

    const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });

    const materials = [
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        textureMaterial
    ];

    const roof = new THREE.Mesh( geometry, materials );

    house.add(roof);

    roof.rotation.x = Math.PI / 2;
    roof.rotation.y = Math.PI / 4 * 0.5;
    roof.position.y = 116;
    roof.position.x = -55;
    roof.position.z = 150;

    return roof;
}

function createWindow() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 40)
    shape.lineTo(60,40)
    shape.lineTo(60,0);
    shape.lineTo(0, 0);

    const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

    const texture = new THREE.TextureLoader().load('./img/window.jpeg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.025, 0.025 );

    var extrudeMaterial = new THREE.MeshBasicMaterial({map: texture});

    var window = new THREE.Mesh( extrudeGeometry, extrudeMaterial ) ;
    window.rotation.y = Math.PI / 2;
    window.position.y = 15;
    window.position.x = 80.5;
    window.position.z = 120;

    house.add(window);

    return window;
}


function createGarage() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 80)
    shape.lineTo(120,80)
    shape.lineTo(120,0);
    shape.lineTo(0, 0);

    const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

    const texture = new THREE.TextureLoader().load('./img/garage.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.005, 0.005 );


    const material = new THREE.MeshBasicMaterial({map: texture});

    var garage = new THREE.Mesh( extrudeGeometry, material ) ;
    garage.position.x = -55;
    garage.position.z = 450.5;

    house.add(garage);

    return garage;
}

function createDoor() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 50);
    shape.lineTo(30,50);
    shape.lineTo(30,0);
    shape.lineTo(0, 0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const texture = new THREE.TextureLoader().load('./img/door.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.017, 0.02 );

    const material = new THREE.MeshBasicMaterial( {map: texture } );

    const door = new THREE.Mesh( extrudeGeometry, material ) ;

    door.rotation.y = Math.PI / 2;
    door.position.y = 10;
    door.position.x = 80.5;
    door.position.z = 250;

    house.add(door);
}

let controls = new THREE.OrbitControls(camera, renderer.domElement);

create()
render()

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}