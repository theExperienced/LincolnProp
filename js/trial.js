// import chroma from 'chroma-js';

let scene, camera, renderer;
let planeGeometry, planeMaterial, plane;
let cubeGeometry, cubeMaterial, cube;
let frame;

// let width = window.innerWidth,
//     height = window.innerHeight;


let planeSize = 2200;
let pointLight;

// let snake, snakeGeo, snakeCube, snakePositions = [[0,0,0]]; 

// let satellite, satelight, satellites, satelights, satellitesFactor;
let planeGeo;
let radius;
let phi = 0, theta = 0;
// let xOffset = 0; yOffset = 0;

let mass;
let outerGlobeGeo, outerGlobe;

let sphereGeo;
let sphereLight;
let spot, directionalLight;
let globe;
let globePosition;
let satellitesNum, satellites, satelights, satellitesFactor;

let sphereVerticesNum;
let firmamentRadius = 130;
let world;
let ringRadius;
let particles;
let ringGeo;
let ringComplex2, ringComplex3, ringComplex4;
let ringComplexes;
let cameraChanged = true;
let afterLoad = false;
let wallSide = 20;
let planks = [];


let ringBall;
let rings = [];


let pointingTowers = [];
let pointingTowersVels = [];

let towerBall;
let firmament;

let pins;

let towerObjects = [];

const init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000 );
    // camera.position.set(-30, 3, 30);
    // camera.lookAt(0, 0, 100);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    // document.querySelector('.canvas').appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xfefefe);
    scene.fog = new THREE.Fog(0xfefefe, 100, 350); // firmamentRadius * 5, firmamentRadius * 10);
    // scene.fog = new THREE.FogExp2(0x000000, .0134262);




    ////////////////////EMPIRE STATE



    // empireState = new THREE.Object3D();
    // // scene.add(empireState);

    // currentBlockMat = new THREE.MeshLambertMaterial({color: 0xffffff});
    // currentBlockGeo = new THREE.BoxBufferGeometry(1, 10, 4);
    // currentBlock = new THREE.Mesh(currentBlockGeo, currentBlockMat);
    // empireState.add(currentBlock);

    // currentBlockGeo = new THREE.BoxBufferGeometry(1, 10, 4);
    // currentBlock = new THREE.Mesh(currentBlockGeo, currentBlockMat);



    


    /////////////////////////////'LOOKING AT' PINS

     pinWorld = new THREE.Object3D();
    //  scene.add(pinWorld);

     numOfPins = 300;
     pinColors = chroma.scale(['#db29ff','#ff295f']).colors(20);

     pinGeo = new THREE.BoxBufferGeometry(1, 1, 10);

     pins = [];

    for (let i = 0; i < numOfPins; i++) {
        color = pinColors[Math.floor(Math.random() * pinColors.length)]
         pinMat = new THREE.MeshNormalMaterial({
            color: color
        });

        pin = new THREE.Mesh(pinGeo, pinMat);
        pins.push(pin);
        pin.position.set(
            (Math.random() -.5 ) * 45,
            (Math.random() -.5 ) * 0 ,
            (Math.random() -.5 ) * 45
        );
        pinWorld.add(pin);
    }




    /////////////////////////////////////CITY + PLANE


    city = new THREE.Object3D();
    // scene.add(city);
    citySize = 500;
    planeGeo = new THREE.PlaneBufferGeometry(citySize, citySize);
    planeMat = new THREE.MeshPhysicalMaterial({
        color: 0x040506,
        roughness: .6,
        reflectivity: .8
    });

    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0, 0, 0);
    // city.add(plane);

    numOfTowers = 1000;
    maxTowerHeight = 60;
    maxTowerSide = 15;
    randomFactor = 10;
    compensation = 2;

    towerColors = chroma.scale(['#0a1526','#7d6446', '#7a746d']).colors(20);
    console.log("🚀 ~ file: trial.js ~ line 152 ~ init ~ towerColors", towerColors)

    for (let i = 0; i < numOfTowers; i++) {
        x = (Math.random() - .5) * citySize;
        z = (Math.random() - .5) * citySize;
        distanceToCenter = distance(x, z);
        currSide = (3 / distanceToCenter) * maxTowerSide * compensation + 2 + Math.random() * randomFactor;
        currHeight = (43 / distanceToCenter) * maxTowerHeight * compensation + 33 + Math.random() * randomFactor;
        // console.log("🚀 ~ file: trial.js ~ line 156 ~ init ~ distanceToCenter", distanceToCenter)
        towerGeo = new THREE.BoxBufferGeometry(currSide, currHeight, currSide);
        towerMat = new THREE.MeshLambertMaterial({
            color: [Math.floor(Math.random() * towerColors.length)]
        });
        
        tower = new THREE.Mesh(towerGeo, towerMat);
        city.add(tower);
        tower.position.set(x, currHeight * .5, z);
    }





    ////////////////////////CITY TOWERS


    
    city = new THREE.Object3D();
    scene.add(city);
    // city.rotation.x = Math.PI/2;
    // city.rotation.order = "YXZ";
    city.position.set(0, 0, 0);
    planeGeo = new THREE.PlaneBufferGeometry(300, 300);
    planeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side:THREE.DoubleSide,
        // roughness: 10,
        // metalness: 0.6,
        //opacity:1,
        //transparent:true
    });
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x += 11;
    // city.add(plane);
    

    wall = new THREE.Mesh(planeGeo, planeMat);
    wall.position.set(10,10,-10);
    // city.add(wall);

    towerMaxSide = 20;
    towerMaxHeight = 290;
    numOfTowers = 20;
    takenSlots = [];
    towers = [];
    towerColors = chroma.scale(['#101010', '#202020']).colors(20);
    frameColors = chroma.scale(['#5c5e5d','#fefefe']).colors(10);
    topColors = ['#24fff0', '#ff8af1'];
        
    for (let i = 0; i < numOfTowers; i++) {
        towerObject = new THREE.Object3D();
        towerHeight = towerMaxHeight * Math.random() + 45;
        currSide = towerMaxSide * Math.random() + 14;
        towerGeo = new THREE.BoxBufferGeometry(currSide, towerHeight, currSide, 25, 25, 5);
        // towerGeo.translate( 0, 0.5, 0 );
        towerMat = new THREE.MeshBasicMaterial({
            color: towerColors[Math.floor(Math.random() * towerColors.length)],
            // wireframe: true,
            roughness: .5,
            metalness: .9,
        });
        tower = new THREE.Mesh(towerGeo, towerMat);
        if(Math.random() > 0) {
            frameGeo = new THREE.BoxBufferGeometry(currSide, towerHeight, currSide, 1,1,1);
            frameMat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                wireframe: true,
                // roughness: .8,
                // metalness: .9,
            });
            
            frame = new THREE.Mesh(frameGeo, frameMat);

            
            // frame.position.set(x, 0, z);
            towers.push(tower);
            towerObject.add(frame);
        }
        towerObject.add(tower);

        currTopSide = currSide * 1.01;
        topYPos = Math.random() * .6 + 1;
        topGeo = new THREE.BoxBufferGeometry(currTopSide,topYPos, currTopSide);
        topMat = new THREE.MeshBasicMaterial({
            color: topColors[Math.floor(Math.random() * topColors.length)],
            // roughness: .8,
            // metalness: .9,
        });
        towerTop = new THREE.Mesh(topGeo, topMat);
        towerObject.add(towerTop);
        towerTop.position.set(0, towerHeight / 2 + .1, 0);
        if(i % 3 === 0) {
            antenaGeo = new THREE.BoxBufferGeometry(Math.random() * .6 + .02, Math.random() * 50 + 3, Math.random() * .6 + .02);
            antenaMat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                // roughness: .8,
                // metalness: .9,
            });
            antena = new THREE.Mesh(antenaGeo, antenaMat);
            towerObject.add(antena);
            towerObjects.push(towerObject);
            antena.position.set(0, towerHeight / 2 + .1 + topYPos, 0);
        }
        city.add(towerObject);
        
        x = (Math.random() -.5) * 150;
        // y = towerHeight / 2;
        y = 0;
        z = (Math.random() - .5) * 150;
        towerObject.position.set(x, y, z);
        // towerObject.lookAt(0, 10, 0);
    }

    



                    //////////////CENTER BUILDING

    centerBuildingHeight = 150;
    centerBuildingSide = 25;
    centerBuildingGeo = new THREE.BoxBufferGeometry(centerBuildingSide, centerBuildingHeight, centerBuildingSide);
    centerBuildingMat = new THREE.MeshPhongMaterial({
        color: 0xf300f9
    });

    centerBuilding = new THREE.Mesh(centerBuildingGeo, centerBuildingMat);
    // city.add(centerBuilding);
    centerBuilding.position.y = centerBuildingHeight / 2;







    ///////LIGHTS   




    mainLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add( mainLight );

    directionalLight = new THREE.SpotLight(0xffffff, 1);
    // scene.add(directionalLight);
    directionalLight.castShdaow = true;
    directionalLight.shadowCameraVisible = true;
    // scene.add(lightTarget);
    directionalLight.target = city;
    spotLightHelper = new THREE.SpotLightHelper(directionalLight);
    // scene.add(spotLightHelper);
    directionalLight.position.set(0, 200, -50);

    pointLight = new THREE.PointLight(0xb522a1, .5);
    // pointLight.position.set(10, 32, 0);
    scene.add(pointLight);
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );

    pointLight2 = new THREE.PointLight(0x42f587, .5);
    const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
    scene.add( pointLightHelper2 );



    const axisHelper = new THREE.AxesHelper(2);
    scene.add(axisHelper);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    controls.enabled = true;
}

const render = function () {
    renderer.render(scene, camera);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.PCFShadowMap; //THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
}

let now;

const update = function () {
    now = Date.now() * .00045;

    if(cameraChanged) {
        camera.position.set(0, 300, 300);
        camera.lookAt(170, 40, 0);
        cameraChanged = false;
    }
    
    pointLight.position.set(
        Math.sin(now * 1 + Math.PI) * 41.2, 
        Math.cos(now * 1.3 + Math.PI) * 1.2 + 30, 
        Math.cos(now * 1 + Math.PI) * 71.2
    );

    for (let i = 0; i < pins.length; i++) {
        pins[i].lookAt(pointLight.position);
    }
}

const mouseClick = () => {
    gsap.to(pointLight.color, {
        r: .44,
        g: .111,
        b:.33,
        ease: 'elastic.out(2, .3)',
        duration: 3
    })
}


// document.addEventListener('click', mouseClick, {once: true});

let mouseMoved = false;

const mouseMove = ({ clientX, clientY }) => {
    // console.log(clientX, clientY)
    // mouse.x = (clientX / width - .5) * 1000;
    // mouse.y = (clientY / height - .5) * 1000;
    mouseMoved = true;
}


document.addEventListener('mousemove', mouseMove);

const animate = function () {
    frame = requestAnimationFrame( animate );
    render();
    update();
    // console.log('SCENE CHILDREN', scene.children);
};



const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomPos = (min = 0, max = 1) => {
    return random(min, max) * (Math.random() - .5) * 2 ;
}

const mathRandom = (num = 8) => {
    var numValue = - Math.random() * num + Math.random() * num;
    return numValue;
};

const distance = (x, z) => {
    return Math.sqrt(x*x + z*z);
};

init();
// animate();



/////////////////GSAP


gsap.timeline({})
.from(city.rotation, {
    y: 0,
    duration: 2,
    ease: 'power1.Out',
    onStart: () => {
        towerObjects.forEach(tower => {
            gsap.from(tower.scale, {
                // delay: 1,
                // x: 0,
                y: (i, x) => {
                    console.log(i, x)
                    return 0;
                },
                // z: 0,
                duration: Math.random() * 1 + 3
            })
        })
    }
})
// .from(towers, {
    
// })
