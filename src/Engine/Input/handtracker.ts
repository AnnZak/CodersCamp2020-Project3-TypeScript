import { IPointerDevice } from "./inputs.h";
import { Vector } from "../Utils/vector.h";
const handTrack = require('handtrackjs');
// import * as handTrack from 'handtrackjs';

export default class HandTracker implements IPointerDevice {
    private _cursorPosition: Vector = {x: 0, y: 0};
    private _model: any;
    private _video = document.getElementById('video')!;
    private _modelParams = {
        flipHorizontal: true,   // flip e.g for video 
        imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
        maxNumBoxes: 2,         // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.80,   // confidence threshold for predictions.
    };
    
    constructor(private _canvas: HTMLCanvasElement, private _ctx: CanvasRenderingContext2D) {
        this._video.setAttribute("width", `${document.body.clientWidth}`);
        this._video.setAttribute("height", `${document.body.clientHeight}`);
        this._loadModel();
    }

    private _loadModel() {

        handTrack.load(this._modelParams).then((objectDetection: any) => {
            this._model = objectDetection;
            console.log("Model loaded");
            this._startVideoRecording();

        }, (error: Error) => {
            console.log(`error in loading model: ${error.message}`);
        });
    }

    private _startVideoRecording() {

        handTrack.startVideo(this._video).then((status: any) => {

            console.log("Video started");
            this._detectHands();

        }, (error: Error) => {
            console.log(`error in starting video (please enable video): ${error.message}`);
        });
    }

    private _detectHands() {

        this._model.detect(this._video).then((predictions: any) => {
            if (predictions[0]) {
                this._cursorPosition.x = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
                this._cursorPosition.y = predictions[0].bbox[1] + (predictions[0].bbox[3] / 2)
            }

            this._detectHands();

        }, (error: Error) => {
            console.log(`error in detecting: ${error.message}`);
        });
    }

    public get cursorPosition() {
        return this._cursorPosition;
    }
}