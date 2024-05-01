type evenType = "onDraw" | "onRectangle" | "onCircle" | "onEllipse";

export default interface Event {
  name: evenType;
  data: any;
}
