export type Points = Vector2D[];
export type Vector = [number, number, number?];
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Color = [number, number, number, number];
export interface PathValue {}

export type SourceData = any[];

// Global objects, attributes, and methods
export class Key {
  value: string = "key value";
  time: number = 0;
  index: number = 1;
}

export class Project {
  fullPath: string = "path/to/project/file";
  bitsPerChannel: "8" | "16" | "32" = "8";
  linearBlending: boolean = true;
}

export interface MarkerParam {
  [id: string]: any;
}

export class Marker {
  readonly time: number = 0;
  readonly index: number = 1;
  readonly duration: number = 0;
  readonly comment: string = "Marker comment";
  readonly chapter: string = "Chapter 1";
  readonly url: string = "URL";
  readonly frameTarget: string = "Frame Target";
  readonly eventCuePoint: boolean = false;
  readonly cuePointName: string = "Cue Point Name";
  readonly parameters: MarkerParam = {};
  readonly protectedRegion: boolean = false;
}

export class MarkerProperty {
  readonly numKeys: number = 1;
  key(index: number | string): Marker {
    return new Marker();
  }
  nearestKey(t: number): Marker {
    return new Marker();
  }
}

export class Comp {
  readonly name: string = "Comp Base";
  readonly numLayers: number = 1;
  readonly activeCamera: Camera | null = null;
  readonly width: number = 1920;
  readonly height: number = 1080;
  readonly duration: number = 10;
  readonly ntscDropFrame: boolean = false;
  readonly displayStartTime: number = 0;
  readonly frameDuration: number = 0.04;
  readonly frameRate: number = 25;
  readonly shutterAngle: number = 180;
  readonly bgColor: Color = [1, 1, 1, 1];
  readonly pixelAspect: number = 1;
  layer(indexOrOtherLayer: number | string, relIndex: number): Layer {
    return new Layer();
  }
}

const thisComp = new Comp();

export class PropertyGroup {
  name: string = "property group base";
}

export type Value =
  | string
  | number
  | boolean
  | Vector
  | Vector2D
  | Vector3D
  | Color
  | PathValue;

export class Property<T extends Value> {
  readonly name: string = "Property Name";
  readonly velocity: number | Vector = 0;
  readonly speed: number | Vector = 0;
  readonly numKeys: number = 0;
  readonly propertyIndex: number = 0;
  valueAtTime(time: number): Value {
    return this.value;
  }
  velocityAtTime(time: number): number | Vector {
    return this.velocity;
  }
  speedAtTime(time: number): number | Vector {
    return this.speed;
  }
  wiggle(
    freq: number,
    amp: number,
    octaves?: number,
    amp_mult?: number,
    time?: number
  ): Value {
    return this.value;
  }
  temporalWiggle(
    freq: number,
    amp: number,
    octaves?: number,
    amp_mult?: number,
    time?: number
  ): Value {
    return this.value;
  }
  smooth(width?: number, samples?: number, time?: number): Value {
    return this.value;
  }
  loopIn(type?: loopType, numKeyframes?: number): Value {
    return this.value;
  }
  loopOut(type?: loopType, numKeyframes?: number): Value {
    return this.value;
  }
  loopInDuration(type?: loopType, duration?: number): Value {
    return this.value;
  }
  loopOutDuration(type?: loopType, duration?: number): Value {
    return this.value;
  }
  key(indexOrName: number | string): Key {
    return new Key();
  }
  nearestKey(time: number): Key {
    return new Key();
  }
  propertyGroup(countUp: number): PropertyGroup {
    return new PropertyGroup();
  }
  constructor(readonly value: T) {}
}

const someProperty = new Property<string>("String");

export class PathProperty<T> extends Property<T> {
  readonly isClosed: boolean = true;
  createPath(
    points: Points,
    inTangents: Points | [],
    outTangent: Points | [],
    isClosed: boolean
  ): PathValue {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  points(time?: number): Vector2D[] {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  inTangents(time?: number): Vector2D[] {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  outTangents(time?: number): Vector2D[] {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  pointOnPath(percentage?: number, time?: number): Vector2D {
    return [0, 0];
  }
  tangentOnPath(percentage?: number, time?: number): Vector2D {
    return [0, 0];
  }
  normalOnPath(percentage?: number, time?: number): Vector2D {
    return [0, 0];
  }
  constructor(value: T) {
    super(value);
  }
}

export type loopType = "cycle" | "pingpong" | "offset" | "continue";

export class TransformGroup extends PropertyGroup {
  readonly anchorPoint: Property<Vector> = new Property([0, 0]);
  readonly position: Property<Vector> = new Property([0, 0]);
  readonly scale: Property<Vector> = new Property([0, 0]);
  readonly rotation: Property<number> = new Property(0);
  readonly orientation?: Property<Vector3D> = new Property([0, 0, 0]);
  readonly rotationX?: Property<number> = new Property(0);
  readonly rotationY?: Property<number> = new Property(0);
  readonly rotationZ?: Property<number> = new Property(0);
}

export class MaterialOptions extends PropertyGroup {
  readonly lightTransmission: Property<number> = new Property(0);
  readonly castShadows: Property<boolean> = new Property(false);
  readonly acceptsShadows: Property<boolean> = new Property(false);
  readonly acceptsLights: Property<boolean> = new Property(false);
  readonly ambient: Property<number> = new Property(100);
  readonly diffuse: Property<number> = new Property(100);
  readonly specular: Property<number> = new Property(100);
  readonly shininess: Property<number> = new Property(100);
  readonly metal: Property<number> = new Property(100);
}

export class Effects extends PropertyGroup {}

export class Masks extends PropertyGroup {}

export class SourceRect {
  readonly top: number = 0;
  readonly left: number = 0;
  readonly width: number = 100;
  readonly height: number = 100;
}

export class Effect {
  active: boolean = true;
  param(nameOrIndex: string | number): Property<string> {
    return new Property<string>("Effect Param");
  }
}

export class Mask {
  readonly maskOpacity: Property<number> = new Property(100);
  readonly maskFeather: Property<number> = new Property(100);
  readonly maskExpansion: Property<number> = new Property(0);
  readonly invert: Property<boolean> = new Property(false);
}

export class Light {
  readonly pointOfInterest: Property<Vector3D> = new Property([0, 0, 0]);
  readonly intensity: Property<number> = new Property(100);
  readonly color: Property<Color> = new Property([1, 1, 1, 1]);
  readonly shadowDarkness: Property<number> = new Property(100);
  readonly shadowDiffusion: Property<number> = new Property(0);
  readonly coneAngle?: Property<number> = new Property(90);
  readonly coneFeather?: Property<number> = new Property(50);
}

export class Camera {}

export class Layer {
  readonly name: string = "Layer name";
  readonly source?: Comp | Footage = new Comp();
  readonly width: number = 1920;
  readonly height: number = 1080;
  readonly index: number = 0;
  readonly parent?: Layer | Light | Camera = new Layer();
  readonly hasParent: boolean = true;
  readonly inPoint: number = 0;
  readonly outPoint: number = 1;
  readonly startTime: number = 0;
  readonly hasVideo: boolean = true;
  readonly hasAudio: boolean = true;
  readonly active: boolean = true;
  readonly enabled: boolean = true;
  readonly audioActive?: boolean = true;
  readonly audioLevels?: Property<number> = new Property(0);
  readonly timeRemap?: Property<number> = new Property(0);
  readonly marker?: MarkerProperty;
  readonly transform?: PropertyGroup = new TransformGroup();
  readonly materialOption?: PropertyGroup = new MaterialOptions();
  toComp(vec: Vector, time?: number): Vector {
    return vec;
  }
  fromComp(vec: Vector, time?: number): Vector {
    return vec;
  }
  toWorld(vec: Vector, time?: number): Vector {
    return vec;
  }
  toCompVec(vec: Vector, time?: number): Vector {
    return vec;
  }
  fromCompVec(vec: Vector, time?: number): Vector {
    return vec;
  }
  toWorldVec(vec: Vector, time?: number): Vector {
    return vec;
  }
  fromWorldVec(vec: Vector, time?: number): Vector {
    return vec;
  }
  fromCompToSurface(vec: Vector): Vector {
    return vec;
  }
  sourceTime?(time?: number): number {
    return 0;
  }
  sourceRectAtTime(time?: number, includeExtents?: boolean): SourceRect {
    return new SourceRect();
  }
  effect(nameOrIndex: number | string): Effect {
    return new Effect();
  }
  mask(nameOrIndex: number | string): Mask {
    return new Mask();
  }
  sampleImage(
    point: Vector2D,
    radius?: Vector2D,
    postEffect?: boolean,
    time?: number
  ): Color {
    return [0, 0, 0, 0];
  }
}

export function layer(indexOrOtherLayer: string | number, relIndex: number) {
  return new Comp().layer(indexOrOtherLayer, relIndex);
}
export function comp(index: number | string) {
  return new Comp();
}

export const time: number = 0;
export const colorDepth: number = 8;

export class Footage {
  readonly name: string = "Layer Name";
  readonly width?: number = 500;
  readonly height?: number = 500;
  readonly duration?: number = 10;
  readonly frameDuration?: number = 0.04;
  readonly ntscDropFrame?: boolean = false;
  readonly pixelAspect?: number = 1;
  readonly sourceText?: string = "Source Text";
  readonly sourceData?: SourceData[] = [["source data"]];
  dataValue?(dataPath: []): number {
    return 0;
  }
  dataKeyCount?(dataPath: []): number {
    return 0;
  }
  dataKeyTimes?(dataPath: [], t0?: number, t1?: number): number[] {
    return [0, 0];
  }
  dataKeyValues?(dataPath: [], t0?: number, t1?: number): number[] {
    return [0, 0];
  }
}

export function footage(name: string): Footage {
  return new Footage();
}

// Time conversion methods

export function timeToFrames(
  t: number = time + thisComp.displayStartTime,
  fps: number = 1.0 / thisComp.frameDuration,
  isDuration: boolean = false
): number {
  return time * thisComp.frameDuration;
}

export function framesToTime(
  frames: number,
  fps: number = 1.0 / thisComp.frameDuration
): number {
  return frames * thisComp.frameDuration;
}

export function timeToTimecode(
  t: number = time + thisComp.displayStartTime,
  timecodeBase: number = 30,
  isDuration: boolean = false
): string {
  return "00:00:00:00";
}

export function timeToNTSCTimecode(
  t: number = time + thisComp.displayStartTime,
  ntscDropFrame: boolean = false,
  isDuration: boolean = false
) {
  return "00:00:00:00";
}

export function timeToFeetAndFrames(
  t: number = time + thisComp.displayStartTime,
  fps: number = 1.0 / thisComp.frameDuration,
  framesPerFoot: number = 16,
  isDuration: boolean = false
): string {
  return "00:00:00:00";
}

export function timeToCurrentFormat(
  t: number = time + thisComp.displayStartTime,
  fps: number = 1.0 / thisComp.frameDuration,
  isDuration: boolean = false,
  ntscDropFrame: boolean = thisComp.ntscDropFrame
): string {
  return "0000";
}

// Vector Math methods

export function add(vec1: Vector, vec2: Vector): Vector {
  return vec1;
}
export function sub(vec1: Vector, vec2: Vector): Vector {
  return vec1;
}
export function mul(vec1: Vector, amount: number): Vector {
  return vec1;
}
export function div(vec1: Vector, amount: number): Vector {
  return vec1;
}
export function clamp(
  value: number | [],
  limit1: number,
  limit2: number
): number | [] {
  return value;
}
export function dot(vec1: Vector, vec2: Vector): Vector {
  return vec1;
}
export function cross(vec1: Vector, vec2: Vector): Vector {
  return vec1;
}
export function normalize(vec1: Vector, vec2: Vector): Vector {
  return [1, 1];
}
export function length(point1: Vector, point2?: Vector): number {
  return 1;
}
export function lookAt(fromPoint: Vector, atPoint: Vector): Vector3D {
  return [0, 0, 0];
}

// Random number methods

export function seedRandom(offset: number, timeless: boolean = false): void {}
export function random(
  minValOrArray: number | [],
  maxValOrArray: number | []
): number | [] {
  return minValOrArray;
}
export function gaussRandom(
  minValOrArray: number | [],
  maxValOrArray: number | []
): number | [] {
  return minValOrArray;
}
export function noise(valOrArray: number | []): number {
  return 1;
}

// Interpolation methods

export function linear(
  t: number,
  tMin: number,
  tMax: number,
  value1?: number | [],
  value2?: number | []
): number | [] {
  return value1 || tMin;
}

export function ease(
  t: number,
  tMin: number,
  tMax: number,
  value1?: number | [],
  value2?: number | []
): number | [] {
  return value1 || tMin;
}

export function easeIn(
  t: number,
  tMin: number,
  tMax: number,
  value1?: number | [],
  value2?: number | []
): number | [] {
  return value1 || tMin;
}

export function easeOut(
  t: number,
  tMin: number,
  tMax: number,
  value1?: number | [],
  value2?: number | []
): number | [] {
  return value1 || tMin;
}

// Color Conversion methods

export function rgbToHsl(rgbaArray: Color): Color {
  return [1, 1, 1, 1];
}

export function hslToRgb(hslaArray: Color): Color {
  return [1, 1, 1, 1];
}

export function hexToRgb(hex: string): Color {
  return [1, 1, 1, 1];
}

// Other Math methods

export function degreesToRadians(degrees: number): number {
  return 1;
}

export function radiansToDegrees(radians: number): number {
  return 1;
}
