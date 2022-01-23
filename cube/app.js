import * as THREE from './libs/three/three.module.js';
import { OrbitControls } from './libs/three/jsm/OrbitControls.js';

class App{
    constructor(){

        const container = document.createElement( 'div' );
		document.body.appendChild( container );

        // ---------THREE.PerspectiveCamera-------
        // Field of view in degrees =60, Aspect Ratio of rendered view i.e width/height,
        // Near plane. Anything closer than this will be hidden,
        // Far plane. Anything further away than this will be hidden
        //----------------------------------------

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight,0.1,100);

        // after camera creation, z axis having value (0,0,0)
        // (0,0,4) means back by four meters in z from the origin 
        this.camera.position.set(0,0,4);

        // create a scene and a background colour [0xaaaaaa is gray]
        this.scene = new THREE.Scene();
        this.scene.background =  new THREE.Color(0xaaaaaa);

        const ambient = new THREE.HemisphereLight( 0xffffff,  0xbbbbff, 0.3);
        this.scene.add( ambient );

        const light = new THREE.DirectionalLight();
        light.position.set( 0.2, 1, 1);
        this.scene.add(light);

        // antialias: true, especially important for vr headsets
        // set pixel ratio and size
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( this.renderer.domElement );

        this.renderer.setAnimationLoop( this.render.bind(this) );

        const geometry = new THREE.BoxBufferGeometry();
        const material = new THREE.MeshStandardMaterial( { color: 0xff0000 } )

        this.mesh = new THREE.Mesh( geometry, material);

        this.scene.add( this.mesh );

        // Mesh takes a geometry and a material

        const controls = new OrbitControls( this.camera, this.renderer.domElement )

        window.addEventListener('resize',this.resize.bind(this));
    }

    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight);
    }

    render(){
        this.mesh.rotateY(0.01);
        this.renderer.render( this.scene, this.camera);
    }

}

export { App };



