import { IPointerDevice } from "./inputs.h";
import { Vector } from "../Utils/vector.h";
const handTrack = require('handtrackjs');

export default class HandTracker implements IPointerDevice {
    private _cursorPosition: Vector = {x: 0, y: 0};
    private _model: any;
    private _video = document.getElementById('video')!;
    private _modelParams = {
        flipHorizontal: false,   // flip e.g for video 
        imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
        maxNumBoxes: 1,        // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.79,    // confidence threshold for predictions.
    };

    constructor(private _canvas: HTMLCanvasElement, private _ctx: CanvasRenderingContext2D) {

        this._video.setAttribute("width", `${this._canvas.width}`);
        this._video.setAttribute("height", `${this._canvas.height}`);

        this._loadModel();
    }

    private _loadModel() {

        handTrack.load(this._modelParams).then((objectDetection: any) => {

            this._model = objectDetection;
            console.log("model loaded");
            console.log(this._model);
            this._startVideoRecording();

        }, (error: Error) => {
            console.log(`error in loading model: ${error.message}`);
        });
    }

    private _startVideoRecording() {

        handTrack.startVideo(this._video).then((status: any) => {

            console.log("video started, status: ");
            console.log(status);
            
            this._detectHands();

        }, (error: Error) => {
            console.log(`error in starting video (please enable video): ${error.message}`);
        });
    }

    private _detectHands() {

        this._model.detect(this._video).then((predictions: any) => {
            console.log("Predictions: ");
            console.log(predictions);

            try {
                this._model.renderPredictions(predictions, this._canvas, this._ctx, this._video);
                console.log("hmm...");
            } catch(err) {
                console.log(err);
            }

            // get the middle x & y values of the bounding box and draw anything there 
            if (predictions[0]) {
                this._cursorPosition.x = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
                this._cursorPosition.y = predictions[0].bbox[1] + (predictions[0].bbox[3] / 2)
                //... document.body.clientWidth * (this._cursorPosition.x / video.width)

                this._ctx.fillStyle = "red";
                this._ctx.fillRect(this._cursorPosition.x, this._cursorPosition.y, 2, 2);
            }

            this._detectHands();

        }, (error: Error) => {
            console.log(`error in deteting: ${error.message}`);
        });
    }

    public get cursorPosition() {
        return this._cursorPosition;
    }
}