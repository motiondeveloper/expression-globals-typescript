declare type Points = Vector2D[];
declare type Vector = [number, number, number?];
declare type Vector2D = [number, number];
declare type Vector3D = [number, number, number];
declare type Color = [number, number, number, number];
declare interface PathValue {}
declare type Value =
  | number
  | Vector
  | Vector2D
  | Vector3D
  | String
  | []
  | boolean
  | PathValue;

declare type loopType = "cycle" | "pingpong" | "offset" | "continue";
declare interface Property {
  readonly value: Value;
  readonly name: string;
  readonly velocity: number | [];
  readonly speed: number;
  readonly numKeys: number;
  readonly propertyIndex: number;
  valueAtTime(time: number): Value;
  velocityAtTime(time: number): number | [];
  speedAtTime(time: number): number;
  wiggle(
    freq: number,
    amp: number,
    octaves?: number,
    amp_mult?: number,
    time?: number
  ): number | [];
  temporalWiggle(
    freq: number,
    amp: number,
    octaves?: number,
    amp_mult?: number,
    time?: number
  ): number | [];
  smooth(width?: number, samples?: number, time?: number): number | [];
  loopIn(type?: loopType, numKeyframes?: number): Value;
  loopOut(type?: loopType, numKeyframes?: number): Value;
  loopInDuration(type?: loopType, duration?: number): Value;
  loopOutDuration(type?: loopType, duration?: number): Value;
  createPath?(
    points: Points,
    inTangents: Points | [],
    outTangent: Points | [],
    isClosed: boolean
  ): PathValue;
  key(indexOrName: number | string): Key | Marker;
  propertyGroup(countUp: number): PropertyGroup;
}

declare interface PathProperty extends Property {
  points(time?: number): Vector2D[];
  inTangents(time?: number): Vector2D[];
  outTangents(time?: number): Vector2D[];
  isClosed(): boolean;
  pointOnPath(percentage?: number, time?: number): Vector2D;
  tangentOnPath(percentage?: number, time?: number): Vector2D;
  normalOnPath(percentage?: number, time?: number): Vector2D;
}

declare interface PropertyGroup {
  readonly name: string;
}

declare interface Layer {
  readonly name: string;
  readonly source?: Comp | Footage;
  readonly width: number;
  readonly height: number;
  readonly index: number;
  readonly parent?: Layer | Light | Camera;
  readonly hasParent: boolean;
  readonly inPoint: number;
  readonly outPoint: number;
  readonly startTime: number;
  readonly hasVideo: boolean;
  readonly hasAudio: boolean;
  readonly active: boolean;
  readonly enabled: boolean;
  readonly audioActive?: boolean;
  readonly audioLevels?: Property;
  readonly timeRemap?: Property;
  readonly marker?: MarkerProperty;
  transform?: Transform;
  materialOption?: MaterialOptions;
  toComp(vec: Vector, time?: number): Vector;
  fromComp(vec: Vector, time?: number): Vector;
  toWorld(vec: Vector, time?: number): Vector;
  toCompVec(vec: Vector, time?: number): Vector;
  fromCompVec(vec: Vector, time?: number): Vector;
  toWorldVec(vec: Vector, time?: number): Vector;
  fromWorldVec(vec: Vector, time?: number): Vector;
  fromCompToSurface(vec: Vector): Vector;
  sourceTime?(time?: number): number;
  sourceRectAtTime(time?: number, includeExtents?: boolean): SourceRect;
  effect(nameOrIndex: number | string): Effect;
  mask(nameOrIndex: number | string): Mask;
  sampleImage(
    point: Vector2D,
    radius?: Vector2D,
    postEffect?: boolean,
    time?: number
  ): Color;
}

declare interface Comp {
  readonly name: string;
  readonly numLayers: number;
  readonly activeCamera: Camera | null;
  readonly width: number;
  readonly height: number;
  readonly duration: number;
  readonly ntscDropFrame: boolean;
  readonly displayStartTime: number;
  readonly frameDuration: number;
  readonly frameRate: number;
  readonly shutterAngle: number;
  readonly bgColor: Color;
  readonly pixelAspect: number;
  readonly marker?: MarkerProperty;
  layer(indexOrOtherLayer: number | string | Layer, relIndex?: number): Layer;
}

declare interface Project {
  readonly fullPath: string;
  readonly bitsPerChannel: "8" | "16" | "32";
  readonly linearBlending: boolean;
}

declare interface Transform extends PropertyGroup {
  anchorPoint: Property;
  position: Property;
  scale: Property;
  rotation: Property;
  orientation: Property;
  rotationX?: Property;
}

declare interface MaterialOptions extends PropertyGroup {
  lightTransmission: Property;
  castShadows: Property;
  acceptsShadows: Property;
  acceptsLights: Property;
  ambient: Property;
  diffuse: Property;
  specular: Property;
  shininess: Property;
  metal: Property;
}

declare interface SourceRect {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}

declare interface Effects extends PropertyGroup {}

declare interface Effect {
  active: boolean;
  param(nameOrIndex: string | number): Property;
}

declare interface Masks extends PropertyGroup {}

declare interface Mask {
  maskOpacity: Property;
  maskFeather: Property;
  maskExpansion: Property;
  invert: boolean;
}

declare interface MarkerProperty {
  readonly numKeys: number;
  key(index: number | string): Marker;
  nearestKey(t: number): Marker;
}

interface MarkerParam {
  [id: string]: any;
}

declare interface Marker {
  readonly time: number;
  readonly index: number;
  readonly duration: number;
  readonly comment: string;
  readonly chapter: string;
  readonly url: string;
  readonly frameTarget: string;
  readonly eventCuePoint: boolean;
  readonly cuePointName: string;
  readonly parameters: MarkerParam;
  readonly protectedRegion: boolean;
}

declare interface Key {
  value: Value;
  time: number;
}

declare interface Camera {}
declare interface Light {
  pointOfInterest: Vector3D;
  intensity: number;
  color: Color;
  coneAngle: number;
  coneFeather: number;
  shadowDarkness: number;
  shadowDiffusion: number;
}

declare interface Footage {
  readonly name: string;
  readonly width?: number;
  readonly height?: number;
  readonly duration?: number;
  readonly frameDuration?: number;
  readonly ntscDropFrame?: boolean;
  readonly pixelAspect?: number;
  readonly sourceText?: string;
  readonly sourceData?: SourceData[];
  dataValue?(dataPath: []): number;
  dataKeyCount?(dataPath: []): number;
  dataKeyTimes?(dataPath: [], t0?: number, t1?: number): number[];
  dataKeyValues?(dataPath: [], t0?: number, t1?: number): number[];
}

declare type SourceData = any[];
