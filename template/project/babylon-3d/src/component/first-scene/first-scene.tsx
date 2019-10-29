import { ArcRotateCamera, Axis, Color4, Effect, Engine, Mesh, Scene, ShaderMaterial, Texture, Vector3 } from 'babylonjs';
// @ts-ignore
import fragmentShader from "raw-loader!../../shaders/warp.frag";
// @ts-ignore
import vertexShader from "raw-loader!../../shaders/warp.vert";
import { st } from "springtype/core";
import { component } from 'springtype/web/component';
import { ILifecycle } from 'springtype/web/component/interface';
import { domRef } from "springtype/web/vdom";
import tpl from "./first-scene.tpl";
import tss from "./first-scene.tss";

@component({
    tss,
    tpl
})
export class FirstScene extends st.component implements ILifecycle {

    private engine: Engine;
    private scene: Scene;
    private camera: ArcRotateCamera;

    @domRef('iframe')
    private iframe: HTMLIFrameElement;

    @domRef('canvas')
    private canvas: HTMLCanvasElement;

    onAfterInitialRender(): void {


        window.addEventListener('resize', () => this.alignVideoDisplay());

        this.registerShaders();

        this.createEngine();
        this.createScene();
        this.createCamera();

        this.createMeshAnimation();

        this.engine.runRenderLoop(() => this.scene.render());
    }

    onAfterRender() {

        this.alignVideoDisplay();
    }

    private alignVideoDisplay() {

        const halfWidth = this.getEl().clientWidth / 2;

        if (this.iframe) {

            const videoDisplayHeight = this.getEl().clientWidth / 3.555;

            this.iframe.style.top = `${(this.getEl().clientHeight) - videoDisplayHeight - videoDisplayHeight/2}px`;

            this.iframe.style.transform = `perspective(${halfWidth}px) rotateX(15deg)`;
            this.iframe.style.left = `${halfWidth / 2}px`;
            this.iframe.style.width = `${halfWidth}px`;
            this.iframe.style.height = `${videoDisplayHeight}px`;
        }
    }

    private registerShaders() {
        Effect.ShadersStore["customFragmentShader"] = fragmentShader;
        Effect.ShadersStore["customVertexShader"] = vertexShader;
    }

    private createEngine() {
        this.engine = new Engine(this.canvas, true);
    }

    private createScene() {
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(0, 0, 0, 0);
    }

    private createCamera() {
        this.camera = new ArcRotateCamera("Camera", 0, Math.PI / 2, 12, Vector3.Zero(), this.scene);
        this.camera.attachControl(this.getEl(), false);

        this.camera.lowerRadiusLimit = 6;
        this.camera.upperRadiusLimit = 6;
        this.camera.minZ = 1;
    }

    private createMeshAnimation() {

        const shaderMaterial = new ShaderMaterial("shader", this.scene, {
                vertex: "custom",
                fragment: "custom",
            },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            });

        const mesh = Mesh.CreatePlane("mesh", 10.0, this.scene);
        mesh.rotate(Axis.Y, Math.PI * .5);

        const refTexture = new Texture("http://i.imgur.com/HP1V7TJ.png", this.scene);

        shaderMaterial.setTexture("refSampler", refTexture);
        shaderMaterial.setFloat("time", 0);
        shaderMaterial.setVector3("cameraPosition", Vector3.Zero());

        shaderMaterial.backFaceCulling = false;

        mesh.material = shaderMaterial;

        let time = 0;

        this.scene.registerBeforeRender(() => {

            shaderMaterial.setFloat("time", time);
            time += 0.02;

            shaderMaterial.setVector3("cameraPosition", this.scene.activeCamera!.position);
        });
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'FirstScene': Partial<FirstScene>;
        }
    }
}
