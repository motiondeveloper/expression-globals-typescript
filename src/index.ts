/// <reference path="./types.d.ts" />

// Global objects, attributes, and methods
export const PathBase: PathValue = {};
export const KeyBase: Key = {
  value: "key value",
  time: 0,
};
export const PointsBase: Vector2D[] = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

export const CompBase: Comp = {
  name: "Comp Base",
  numLayers: 1,
  activeCamera: null,
  width: 1920,
  height: 1080,
  duration: 10,
  ntscDropFrame: false,
  displayStartTime: 0,
  frameDuration: 0.04,
  frameRate: 25,
  shutterAngle: 180,
  bgColor: [1, 1, 1, 1],
  pixelAspect: 1,
  layer: (indexOrOtherLayer, relIndex) => LayerBase,
};

export const PropertyGroupBase: PropertyGroup = {
  name: "property group base",
};
export const ValueBase = 1;
export const PropertyBase: PathProperty = {
  value: "property base string value",
  name: "property name",
  velocity: 0,
  speed: 0,
  numKeys: 0,
  propertyIndex: 1,
  valueAtTime: (time) => ValueBase,
  velocityAtTime: (time) => 0,
  speedAtTime: (time) => 0,
  wiggle: (freq, amp, octaves = 1, amp_mult = 0.5, t = time) => ValueBase,
  temporalWiggle: (freq, amp, octaves = 1, amp_mult = 0.5, t = time) =>
    ValueBase,
  smooth: (width = 0.2, samples = 5, t = time) => ValueBase,
  loopIn: (type = "cycle", numKeyframes = 0) => ValueBase,
  loopOut: (type = "cycle", numKeyframes = 0) => ValueBase,
  loopInDuration: (type = "cycle", duration = 0) => ValueBase,
  loopOutDuration: (type = "cycle", duration = 0) => ValueBase,
  createPath: (points, inTangents = [], outTangent = [], isClosed = true) =>
    PathBase,
  key: (indexOrName) => KeyBase,
  propertyGroup: (countUp = 1) => PropertyGroupBase,
  points: (t = time) => PointsBase,
  inTangents: (t = time) => PointsBase,
  outTangents: (t = time) => PointsBase,
  isClosed: () => true,
  pointOnPath: (percentage = 0.5, t = time) => [0, 0],
  tangentOnPath: (percentage = 0.5, t = time) => [0, 0],
  normalOnPath: (percentage = 0.5, t = time) => [0, 0],
};

const TransformBase: Transform = {
  name: "Transform",
  anchorPoint: PropertyBase,
  position: PropertyBase,
  scale: PropertyBase,
  rotation: PropertyBase,
  orientation: PropertyBase,
  rotationX: PropertyBase,
};

const MaterialBase: MaterialOptions = {
  name: "Material Property Group",
  lightTransmission: PropertyBase,
  castShadows: PropertyBase,
  acceptsShadows: PropertyBase,
  acceptsLights: PropertyBase,
  ambient: PropertyBase,
  diffuse: PropertyBase,
  specular: PropertyBase,
  shininess: PropertyBase,
  metal: PropertyBase,
};

export const SourceRectBase: SourceRect = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
};

export const EffectBase: Effect = {
  active: true,
  param: (nameOrIndex) => PropertyBase,
};

export const MaskBase: Mask = {
  maskOpacity: PropertyBase,
  maskExpansion: PropertyBase,
  maskFeather: PropertyBase,
  invert: false,
};

export const LayerBase: Layer = {
  name: "layer base",
  source: CompBase,
  width: 1920,
  height: 1080,
  index: 0,
  hasParent: false,
  inPoint: 0,
  outPoint: 1,
  startTime: 0,
  hasVideo: false,
  hasAudio: false,
  active: true,
  enabled: true,
  transform: TransformBase,
  materialOption: MaterialBase,
  toComp: (vec, t = time) => [0, 0, 0],
  fromComp: (vec, t = time) => [0, 0, 0],
  toWorld: (vec, t = time) => [0, 0, 0],
  toCompVec: (vec, t = time) => [0, 0, 0],
  fromCompVec: (vec, t = time) => [0, 0, 0],
  toWorldVec: (vec, t = time) => [0, 0, 0],
  fromWorldVec: (vec, t = time) => [0, 0, 0],
  fromCompToSurface: (vec) => [0, 0, 0],
  sourceTime: (t = time) => 0,
  sourceRectAtTime: (t = time, includeExtents = false) => SourceRectBase,
  effect: (nameOrIndex) => EffectBase,
  mask: (nameOrIndex) => MaskBase,
  sampleImage: (
    point,
    radius = [0.5, 0.5],
    postEffect?: boolean,
    time?: number
  ) => [1, 1, 1, 1],
};

export const layer = CompBase.layer;
export function comp(index: number | string) {
  return CompBase;
}

export const time: number = 0;
export const colorDepth: number = 8;

const FootageBase: Footage = {
  name: "Footage Item",
  width: 1920,
  height: 1080,
  duration: 10,
  frameDuration: 0.04,
  ntscDropFrame: false,
  pixelAspect: 1,
  sourceText: "Source text",
  sourceData: ["Source data"] as SourceData,
  dataValue: (dataPath: []) => 0,
};

export function footage(name: string): Footage {
  return FootageBase;
}

// Time conversion methods

export function timeToFrames(
  t: number = time + CompBase.displayStartTime,
  fps: number = 1.0 / CompBase.frameDuration,
  isDuration: boolean = false
): number {
  return time * CompBase.frameDuration;
}

export function framesToTime(
  frames: number,
  fps: number = 1.0 / CompBase.frameDuration
): number {
  return frames * CompBase.frameDuration;
}

export function timeToTimecode(
  t: number = time + CompBase.displayStartTime,
  timecodeBase: number = 30,
  isDuration: boolean = false
): string {
  return "00:00:00:00";
}

export function timeToNTSCTimecode(
  t: number = time + CompBase.displayStartTime,
  ntscDropFrame: boolean = false,
  isDuration: boolean = false
) {
  return "00:00:00:00";
}

export function timeToFeetAndFrames(
  t: number = time + CompBase.displayStartTime,
  fps: number = 1.0 / CompBase.frameDuration,
  framesPerFoot: number = 16,
  isDuration: boolean = false
): string {
  return "00:00:00:00";
}

export function timeToCurrentFormat(
  t: number = time + CompBase.displayStartTime,
  fps: number = 1.0 / CompBase.frameDuration,
  isDuration: boolean = false,
  ntscDropFrame: boolean = CompBase.ntscDropFrame
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
