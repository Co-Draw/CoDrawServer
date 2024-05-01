type evenType = "onDraw" | "onEraser" | "onRectangle";

export default interface Event {
  name: evenType;
  data: any;
}