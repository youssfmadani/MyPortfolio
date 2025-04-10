import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private light1!: THREE.PointLight;

  private light2!: THREE.PointLight;

  private light3!: THREE.PointLight;

  private light4!: THREE.PointLight;

  private model: any;
  private discoColors = [0xffffff, 0x2B65EC, 0xff0000];

  private fbxLoader = new FBXLoader();
  private directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   *Animate the model
   *
   * @private
   * @memberof ModelComponent
   */
  private animateModel() {
    if (this.model) {
      this.model.rotation.y -= 0.025;
    }
  }

  // private changeColorWithDelay() {
  //   let component: HomeComponent = this;
  //   setTimeout(function () {
  //     component.ambientLight.color.setHex(component.discoColors[Math.floor(Math.random() * component.discoColors.length)]);
  //     component.changeColorWithDelay();
  //   }, 5000); // Delay in milliseconds (1000ms = 1 second)
  // }

  /**
   *create controls
   *
   * @private
   * @memberof ModelComponent
   */
  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };


  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.loaderGLTF.load('assets/untitled.gltf', (gltf: GLTF) => {
      
      this.model = gltf.scene.children[0];
      console.log(this.model);
      this.model.scale.set(.4,.4,.4)
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });

    // this.fbxLoader.load(
    //   'assets/sanjay.fbx',
    //   (object) => {
    //     console.log(object);
    //     object.position.set(0,0,0);
    //     // this.scene.add(object);
    //   },
    //   (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )

    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 10;
    this.camera.position.y = 10;
    this.camera.position.z = 50;
    this.ambientLight = new THREE.AmbientLight(0xffffff , 100);
    this.scene.add(this.ambientLight);

    // this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    // this.directionalLight.position.set(0, 1, 0);
    // this.directionalLight.castShadow = true;
    // this.scene.add(this.directionalLight);
    // this.light1 = new THREE.PointLight(0x4b371c, 10);
    // this.light1.position.set(0, 200, 400);
    // this.scene.add(this.light1);
    // this.light2 = new THREE.PointLight(0x4b371c, 10);
    // this.light2.position.set(500, 100, 0);
    // this.scene.add(this.light2);
    // this.light3 = new THREE.PointLight(0x4b371c, 10);
    // this.light3.position.set(0, 100, -500);
    // this.scene.add(this.light3);
    // this.light4 = new THREE.PointLight(0x4b371c, 10);
    // this.light4.position.set(-500, 300, 500);
    // this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true  });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setClearColor( 0x000000, 0 )
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: HomeComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      // component.changeColorWithDelay();
      requestAnimationFrame(render);
    }());
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
  
}
