/*
 * robot.js
 * 
 * Tarea 3 GPC.
 * 
 * @autor: Joaquin Farias
 * 
 */

// Modulos necesarios
import * as THREE from "../lib/three.module.js";
import {GLTFLoader} from "../lib/GLTFLoader.module.js";
import {OrbitControls} from '../lib/OrbitControls.module.js';

// Variables estandar
let renderer, scene, camera, cameraControl, minicamera;
var L = 60;
var ar = window.innerWidth / window.innerHeight;

// Acciones
init();
loadScene();
render();

function init()
{
     // Instanciar el motor de render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x0000AA));
    renderer.autoClear = false;
    document.getElementById('container').appendChild( renderer.domElement );

    // Instanciar el nodo raiz de la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Instanciar la camara con orbir controls
    camera = new THREE.PerspectiveCamera( 75, ar, 0.1, 1000 );
    camera.position.set(0.5, 500, 500);
    camera.lookAt(0,0,0);

    cameraControl = new OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(0,0,0);
    cameraControl.noKeys = true;
    cameraControl.minDistance = 50;
    cameraControl.maxDistance = 900;

    // Camaras ortograficas
    if (ar < 1) {
        minicamera = new THREE.OrthographicCamera(-L * ar, L * ar, L, -L, 0.1, 100);
    } else {
        minicamera = new THREE.OrthographicCamera(-L, L, L * ar, -L * ar, 0.1, 100);
    }
    minicamera.position.set(0, L * 5.5, 0);
    minicamera.up = new THREE.Vector3(-1,0,0);
    minicamera.lookAt(0, 0, 0);

    camera.add(minicamera);
    scene.add(minicamera)
    scene.add(camera);

    // Eventos
    window.addEventListener('resize', updateAspectRatio);
}

function loadScene()
{
    // Cargar la escena con objetos
    // const material = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});
    const material = new THREE.MeshNormalMaterial({wireframe: true/false, flatShading: true/false});
    
    // crear suelo de 1000x1000
    var geometry_floor = new THREE.PlaneGeometry(1000,1000,100,100);
    var floor = new THREE.Mesh(geometry_floor, material);
    floor.rotation.x = -Math.PI/2;
    floor.position.y = 0;
    scene.add(floor);
    
    // crea un cilindro
    var geometry = new THREE.CylinderGeometry(50,50,18,32);
    var cilindro = new THREE.Mesh(geometry,material);
    cilindro.position.y = 18/2;
    scene.add(cilindro);   

    // crea cilindro rotado 
    var geometry = new THREE.CylinderGeometry(20,20,15,32);
    var cilindro2 = new THREE.Mesh(geometry,material);
    cilindro2.rotation.x = Math.PI/2;
    cilindro2.position.y = 18/2 + 15/2;
    cilindro2.position.z = 0;
    scene.add(cilindro2);

    // crea rectangulo sobre cilindro rotado
    var geometry = new THREE.BoxGeometry(18,120,12);
    var rectangulo = new THREE.Mesh(geometry,material);
    rectangulo.position.y = 18/2 + 15/2 + 120/2;
    rectangulo.position.z = 0;
    scene.add(rectangulo);

    // crea esfera sobre rectangulo
    var geometry = new THREE.SphereGeometry(20,32,32);
    var esfera = new THREE.Mesh(geometry,material);
    esfera.position.y = 18/2 + 15/2 + 120 + 10;
    esfera.position.z = 0;
    scene.add(esfera);

    // crea cilindro dentro de la esfera
    var geometry = new THREE.CylinderGeometry(22,22,6,32);
    var cilindro3 = new THREE.Mesh(geometry,material);
    cilindro3.position.y = 18/2 + 15/2 + 120 + 10;
    cilindro3.position.z = 0;
    scene.add(cilindro3);

    // crea 4 rectangulos sobre cilindro dentro de la esfera
    var geometry = new THREE.BoxGeometry(4,80,4);
    
    var rectangulo1 = new THREE.Mesh(geometry,material);
    rectangulo1.position.y = 18/2 + 15/2 + 120 + 10 + 80/2;
    rectangulo1.position.z = 10;
    rectangulo1.position.x = 10;
    scene.add(rectangulo1);

    var rectangulo2 = new THREE.Mesh(geometry,material);
    rectangulo2.position.y = 18/2 + 15/2 + 120 + 10 + 80/2;
    rectangulo2.position.z = -10;
    rectangulo2.position.x = 10;
    scene.add(rectangulo2);

    var rectangulo3 = new THREE.Mesh(geometry,material);
    rectangulo3.position.y = 18/2 + 15/2 + 120 + 10 + 80/2;
    rectangulo3.position.z = 10;
    rectangulo3.position.x = -10;
    scene.add(rectangulo3);

    var rectangulo4 = new THREE.Mesh(geometry,material);
    rectangulo4.position.y = 18/2 + 15/2 + 120 + 10 + 80/2;
    rectangulo4.position.z = -10;
    rectangulo4.position.x = -10;
    scene.add(rectangulo4);

    // crea cilindro sobre rectangulos
    var geometry = new THREE.CylinderGeometry(15,15,40,32);
    var cilindro4 = new THREE.Mesh(geometry,material);
    cilindro4.rotation.x = Math.PI/2;
    cilindro4.position.y = 18/2 + 15/2 + 120 + 10 + 80 + 15/2;
    cilindro4.position.z = 0;
    cilindro4.position.x = 0;
    scene.add(cilindro4);

    // crea dos pinzas sobre cilindro
    var geometry = new THREE.BoxGeometry(20,19,2);
    const pinzas_y = 18/2 + 15/2 + 120 + 10 + 80 + 15/2;
    const pinzas_z = 14/2;
    const pinzas_x = 10;
    var pinza1 = new THREE.Mesh(geometry,material);
    pinza1.position.y = pinzas_y;
    pinza1.position.z = pinzas_z;
    pinza1.position.x = pinzas_x;
    scene.add(pinza1);

    var pinza2 = new THREE.Mesh(geometry,material);
    pinza2.position.y = pinzas_y;
    pinza2.position.z = -pinzas_z;
    pinza2.position.x = pinzas_x;
    scene.add(pinza2);

    // crea cuadrado sobre pinzas con buffergeometry
    var geometry = new THREE.BufferGeometry();
    // vertices de un cuadrado
    var vertice1 = new THREE.Vector3(10,1,9);
    var vertice2 = new THREE.Vector3(18,1,5);
    
    var vertices = new Float32Array( [
        // izquierda
        -vertice1.x, -vertice1.y, vertice1.z, // 0
        vertice2.x, -vertice2.y, vertice2.z, // 1
        vertice2.x, -vertice2.y, -vertice2.z, // 2

        vertice2.x, -vertice2.y, -vertice2.z, // 2
        -vertice1.x, -vertice1.y, -vertice1.z-1, // 3
        -vertice1.x, -vertice1.y, vertice1.z, // 0

        // atras
        -vertice1.x, -vertice1.y, vertice1.z, // 0
        -vertice1.x, -vertice1.y, -vertice1.z-1, // 3
        -vertice1.x, vertice1.y, vertice1.z, // 4

        -vertice1.x, vertice1.y, vertice1.z, // 4
        -vertice1.x, -vertice1.y, -vertice1.z-1, // 3
        -vertice1.x, vertice1.y, -vertice1.z-1, // 7

        // abajo 
        -vertice1.x, -vertice1.y, vertice1.z, // 0
        -vertice1.x, vertice1.y, vertice1.z, // 4
        vertice2.x, -vertice2.y, vertice2.z, // 1

        vertice2.x, vertice2.y, vertice2.z, // 5
        vertice2.x, -vertice2.y, vertice2.z, // 1
        -vertice1.x, vertice1.y, vertice1.z, // 4

        // derecha
        -vertice1.x, vertice1.y, vertice1.z, // 4 
        vertice2.x, vertice2.y, vertice2.z, // 5
        -vertice1.x, vertice1.y, -vertice1.z-1, // 7

        vertice2.x, vertice2.y, -vertice2.z, // 6
        -vertice1.x, vertice1.y, -vertice1.z-1, // 7
        vertice2.x, vertice2.y, vertice2.z, // 5

        // arriba
        -vertice1.x, -vertice1.y, -vertice1.z, // 3
        -vertice1.x, vertice1.y, -vertice1.z-1,  // 7
        vertice2.x, -vertice2.y, -vertice2.z,  // 2

        vertice2.x, vertice2.y, -vertice2.z, // 6
        vertice2.x, -vertice2.y, -vertice2.z, // 2
        -vertice1.x, vertice1.y, -vertice1.z-1,  // 7

        // adelante
        vertice2.x, -vertice2.y, vertice2.z, // 1
        vertice2.x, -vertice2.y, -vertice2.z, // 2
        vertice2.x, vertice2.y, vertice2.z, // 5

        vertice2.x, vertice2.y, -vertice2.z, // 6
        vertice2.x, vertice2.y, vertice2.z, // 5
        vertice2.x, -vertice2.y, -vertice2.z, // 2
    ] );
    // normales de vertices
    var indices= [
        0,1,4, 4,5,0, 1,10,7, 7,4,1, 6,7,10, 10,11,6, 6,11,0, 0,5,6, 7,6,5, 5,4,7, 0,1,10, 10,11,0,
        1,2,3, 3,4,1, 2,9,8, 8,3,2, 7,8,9, 9,10,7, 8,7,4, 4,3,8, 2,1,10, 10,9,2
    ];

    geometry.setAttribute('position', new THREE.BufferAttribute( vertices, 3 ) );
    // geometry.setIndex(indices);
    geometry.computeVertexNormals();

    var garra1 = new THREE.Mesh(    
        geometry, 
        new THREE.MeshNormalMaterial({side: THREE.DoubleSide})
    );
    garra1.position.y = pinzas_y + 19/2 - 10;
    garra1.position.z = pinzas_z;
    garra1.position.x = pinzas_x + 20;
    garra1.rotation.x = Math.PI/2;
    scene.add(garra1);

    var garra2 = new THREE.Mesh(
        geometry,
        new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    garra2.position.y = pinzas_y + 19/2 - 10;
    garra2.position.z = -pinzas_z;
    garra2.position.x = pinzas_x + 20;
    garra2.rotation.x = Math.PI/2;
    scene.add(garra2);

}

function updateAspectRatio() {
    // Update camera's aspectRatio

    // Adjust canvas size
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Perspective camera
    camera.aspect = ar;

    // Perspective mini camera
    var insetWidth = window.innerWidth / 4;
    var insetHeight = window.innerHeight / 4;
    minicamera.aspect = insetWidth / insetHeight;

    camera.updateProjectionMatrix();
    minicamera.updateProjectionMatrix();
}

// function update() {
//     // cameraControl.update();
// }
    

function render(){
    requestAnimationFrame (render);
    renderer.clear();
    // update();

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    renderer.clearDepth();

    var aspectRatio = window.innerWidth / window.innerHeight;
    var side;
    if (aspectRatio > 1) {
        side = window.innerHeight / 4;
    } else {
        side = window.innerWidth / 4;
    }
    renderer.setScissorTest(true);
    renderer.setViewport(0, window.innerHeight-side, side, side);
    renderer.setScissor(0, window.innerHeight-side, side, side);
    renderer.render(scene, minicamera);
    renderer.setScissorTest(false);
}
