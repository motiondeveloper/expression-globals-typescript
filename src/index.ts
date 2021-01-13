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
  /**
   * Gets a layer in the composition
   * @param indexOrOtherLayer The index or name of the layer to return, or a Layer object if using the relative index
   * @param relIndex Used when a layer is provided for the first input, the relative index from the given Layer
   * @returns The requested Layer object
   */
  layer<T extends number | string | Layer>(
    indexOrOtherLayer: T,
    relIndex?: T extends Layer ? number : undefined
  ): Layer {
    return thisLayer;
  }
}

export class PropertyGroup {
  readonly name: string = "property group base";
  constructor(groupName: string) {
    this.name = groupName;
  }
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
    return new PropertyGroup("property group from function");
  }
  constructor(readonly value: T, readonly name: string = "Property name") {}
}

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

export class Transform extends PropertyGroup {
  constructor() {
    super("Transform");
  }
  readonly anchorPoint: Property<Vector> = new Property([0, 0], "Anchor Point");
  readonly position: Property<Vector> = new Property([0, 0], "Position");
  readonly xPosition: Property<number> = new Property(0, "X Position");
  readonly yPosition: Property<number> = new Property(0, "Y Position");
  readonly zPosition: Property<number> = new Property(0, "Z Position");
  readonly scale: Property<Vector> = new Property([0, 0], "Scale");
  readonly rotation: Property<number> = new Property(0, "Rotation");
  readonly orientation?: Property<Vector3D> = new Property(
    [0, 0, 0],
    "Orientation"
  );
  readonly rotationX?: Property<number> = new Property(0, "X Rotation");
  readonly rotationY?: Property<number> = new Property(0, "Y Rotation");
  readonly rotationZ?: Property<number> = new Property(0, "Z Rotation");
}

export class TextStyle {
  fontSize: number = 0;
  setFontSize(fontSize: number): TextStyle {
    this.fontSize = fontSize;
    return this;
  }
  font: string = "Arial";
  setFont(font: string): TextStyle {
    this.font = font;
    return this;
  }
  setText(text: string): TextStyle {
    return this;
  }
  isFauxBold: boolean = false;
  setFauxBold(isFauxBold: boolean): TextStyle {
    this.isFauxBold = isFauxBold;
    return this;
  }
  isFauxItalic: boolean = false;
  setFauxItalic(isFauxItalic: boolean): TextStyle {
    this.isFauxItalic = isFauxItalic;
    return this;
  }
  isAllCaps: boolean = false;
  setAllCaps(isAllCaps: boolean): TextStyle {
    this.isAllCaps = isAllCaps;
    return this;
  }
  isSmallCaps: boolean = false;
  setSmallCaps(isSmallCaps: boolean): TextStyle {
    this.isSmallCaps = isSmallCaps;
    return this;
  }
  tracking: number = 0;
  setTracking(tracking: number): TextStyle {
    this.tracking = tracking;
    return this;
  }
  leading: number = 60;
  setLeading(leading: number): TextStyle {
    this.leading = leading;
    return this;
  }
  autoLeading: boolean = false;
  setAutoLeading(autoLeading: boolean): TextStyle {
    this.autoLeading = autoLeading;
    return this;
  }
  baselineShift: number = 0;
  setBaselineShift(baselineShift: number): TextStyle {
    this.baselineShift = baselineShift;
    return this;
  }
  applyFill: boolean = true;
  setApplyFill(applyFill: boolean): TextStyle {
    this.applyFill = applyFill;
    return this;
  }
  fillColor: [number, number, number] = [1, 1, 1];
  setFillColor(fillColor: [number, number, number]): TextStyle {
    this.fillColor = fillColor;
    return this;
  }
  applyStroke: boolean = false;
  setApplyStroke(applyStroke: boolean): TextStyle {
    this.applyStroke = applyStroke;
    return this;
  }
  strokeColor: [number, number, number] = [1, 1, 1];
  setStrokeColor(strokeColor: [number, number, number]): TextStyle {
    this.strokeColor = strokeColor;
    return this;
  }
  strokeWidth: number = 0;
  setStrokeWidth(strokeWidth: number): TextStyle {
    this.strokeWidth = strokeWidth;
    return this;
  }
}

export class SourceText extends Property<string> {
  constructor(value: string) {
    super(value);
  }
  style = new TextStyle();
  getStyleAt(characterIndex: number, sampleTime: number = thisLayer.time) {
    return this.style;
  }
}

export class TextPathOptions extends PropertyGroup {
  constructor() {
    super("Path Options");
  }
  readonly path: string | undefined = "Mask 1";
  readonly reversePath?: boolean = false;
  readonly perpendicularToPath?: Property<boolean> = new Property(
    false,
    "Perpendicular To Path"
  );
  readonly forceAlignment?: Property<boolean> = new Property(
    false,
    "Force Alignment"
  );
  readonly firstMargin?: Property<number> = new Property(0, "First Margin");
  readonly lastMargin?: Property<number> = new Property(0, "Last Margin");
}

export class TextMoreOptions extends PropertyGroup {
  constructor() {
    super("More Options");
  }
  readonly anchorPointGrouping: number = 1;
  readonly groupingAlignment: Property<[number, number]> = new Property(
    [0, 0],
    "Grouping Alignment"
  );
  readonly fillANdStroke: number = 1;
  readonly interCharacterBlending: number = 1;
}

export class Text extends PropertyGroup {
  constructor() {
    super("Text");
  }
  readonly sourceText: SourceText = new SourceText("Source text value");
  readonly pathOption: TextPathOptions = new TextPathOptions();
  readonly moreOption: TextMoreOptions = new TextMoreOptions();
}

export class MaterialOptions extends PropertyGroup {
  constructor() {
    super("Material Options");
  }
  readonly lightTransmission: Property<number> = new Property(
    0,
    "Light Transmission"
  );
  readonly castShadows: Property<boolean> = new Property(false, "Cast Shadows");
  readonly acceptsShadows: Property<boolean> = new Property(
    false,
    "Accept Shadows"
  );
  readonly acceptsLights: Property<boolean> = new Property(
    false,
    "Accepts Lights"
  );
  readonly ambient: Property<number> = new Property(100, "Ambient");
  readonly diffuse: Property<number> = new Property(100, "Diffuse");
  readonly specular: Property<number> = new Property(100, "Specular");
  readonly shininess: Property<number> = new Property(100, "Shininess");
  readonly metal: Property<number> = new Property(100, "Metal");
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
  readonly maskOpacity: Property<number> = new Property(100, "Mask Opacity");
  readonly maskFeather: Property<number> = new Property(100, "Mask Feather");
  readonly maskExpansion: Property<number> = new Property(0, "Mask Expansion");
  readonly invert: Property<boolean> = new Property(false, "Invert");
}

export class Light {
  readonly pointOfInterest: Property<Vector3D> = new Property(
    [0, 0, 0],
    "Point of Interest"
  );
  readonly intensity: Property<number> = new Property(100, "Intensity");
  readonly color: Property<Color> = new Property([1, 1, 1, 1], "Color");
  readonly shadowDarkness: Property<number> = new Property(
    100,
    "Shadow Darkness"
  );
  readonly shadowDiffusion: Property<number> = new Property(
    0,
    "Shadow Diffusion"
  );
  readonly coneAngle?: Property<number> = new Property(90, "Cone Angle");
  readonly coneFeather?: Property<number> = new Property(50, "Cone Feather");
}

export class Camera {}

const thisComp = new Comp();

export class Layer {
  readonly time: number = 0;
  readonly colorDepth: number = 8;
  readonly name: string = "Layer name";
  readonly source?: Comp | Footage = thisComp;
  readonly width: number = 1920;
  readonly height: number = 1080;
  readonly index: number = 0;
  readonly parent?: Layer | Light | Camera = thisLayer;
  readonly hasParent: boolean = true;
  readonly inPoint: number = 0;
  readonly outPoint: number = 1;
  readonly startTime: number = 0;
  readonly hasVideo: boolean = true;
  readonly hasAudio: boolean = true;
  readonly active: boolean = true;
  readonly enabled: boolean = true;
  readonly audioActive?: boolean = true;
  readonly audioLevels?: Property<number> = new Property(0, "Audio Levels");
  readonly timeRemap?: Property<number> = new Property(0, "Time Remap");
  readonly marker?: MarkerProperty;
  readonly transform?: Transform = new Transform();
  readonly text?: Text = new Text();
  readonly materialOption?: MaterialOptions = new MaterialOptions();
  /**
   * Transforms a given vector from the layer's space to the composition space
   *
   * @param vec The vector to transform
   * @param time The time to sample the vector
   * @returns The vector in the composition space
   */
  toComp(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  /**
   * Transforms a given vector from the compositions space to the layer's space
   *
   * @param vec The vector to transform
   * @param time The time to sample the vector
   * @returns The vector in the layer's space
   */
  fromComp(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  /**
   * Transforms a given vector from the layers space to the view-independent world space
   *
   * @param vec The vector to transform
   * @param time The time to sample the number
   * @returns The vector in world space
   */
  toWorld(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  toCompVec(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  fromCompVec(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  toWorldVec(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  fromWorldVec(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  /**
   * Projects a point located in composition space to a point on the surface of the layer (zero z-value) at the location where it appears when viewed from the active camera.
   *
   * @param vec The vector to transform
   * @param time The time to sample the number
   * @returns The vector in on the layers surface space
   */
  fromCompToSurface(vec: Vector, time: number = this.time): Vector {
    return vec;
  }
  /**
   * Returns the layer's source item at the given time
   * @param time The time at which to get the source
   * @returns The source item
   */
  sourceTime?(time: number = this.time): Footage {
    return new Footage();
  }
  /**
   * Gets the layer's size and position at a given time
   * @param time The time at which to get the layers bounds
   * @param includeExtents Whether to include areas of the layer outside the bounding box. Applies to Shape Layers and Paragraph Text.
   * @returns An object with properties for layers `top`, `left`, `width` and `height` values at the given time.
   */
  sourceRectAtTime(
    time: number = this.time,
    includeExtents: boolean = false
  ): SourceRect {
    return new SourceRect();
  }
  /**
   * Get the effect on a layer with a given name or index.
   * @param nameOrIndex The effect's name or index
   * @returns The first effect with the given name, or at the given index
   */
  effect(nameOrIndex: number | string): Effect {
    return new Effect();
  }
  /**
   * Get the mask on a layer with a given name or index.
   * @param nameOrIndex The mask's name or index
   * @returns The first mask with the given name, or at the given index
   */
  mask(nameOrIndex: number | string): Mask {
    return new Mask();
  }
  /**
   * Sample a layers color at a given point
   * @param point The center point of the sampling area, in layer space
   * @param radius Defines the sample area size, the horizontal and vertical distance from the center
   * @param postEffect Whether to sample the layer after effects and masks are applied
   * @param time The time at which to sample
   * @returns The average color of the layer in the sample area
   */
  sampleImage(
    point: Vector2D,
    radius: Vector2D = [0.5, 0.5],
    postEffect: boolean = true,
    time: number = this.time
  ): Color {
    return [0, 0, 0, 0];
  }
  /**
   * Convert a given value in degrees to radians
   * @param degrees The value to convert
   * @returns The value radians
   */
  degreesToRadians(degrees: number): number {
    return degrees;
  }
  /**
   * Convert a given value in radians to degrees
   * @param radians The value to convert
   * @returns The value radians
   */
  radiansToDegrees(radians: number): number {
    return radians;
  }
  /**
   * Gets the footage object for the item with the provided name
   * @param name The file name of the footage item
   * @returns The relevant footage item
   */
  footage(name: string): Footage {
    return new Footage();
  }
  /**
   * Retrieves a composition by name
   * @param name The name of the composition
   * @returns The composition with the given name
   */
  comp(name: string): Comp {
    return thisComp;
  }
  /**
   * Converts a given time in seconds to an integer amount of frames
   * @param t The time to convert in seconds
   * @param fps Frames per second to calculate with, defaulting to the compositions frame rate
   * @param isDuration Whether `t` represents a duration rather than an absolute time. Durations are rounded away from zero rather than down.
   * @returns The time in frames
   */
  timeToFrames(
    t: number = this.time + thisComp.displayStartTime,
    fps: number = 1.0 / thisComp.frameDuration,
    isDuration: boolean = false
  ): number {
    return Math.floor(t * fps);
  }
  /**
   * Converts a number of frames to time in seconds
   * @param frames The frame count to convert
   * @param fps The frames per second use in the calculation
   * @returns The given frames as time
   */
  framesToTime(
    frames: number,
    fps: number = 1.0 / thisComp.frameDuration
  ): number {
    return frames * thisComp.frameDuration;
  }
  /**
   * Converts the given time value to a timecode string (e.g. `"00:00:00:00"`)
   * @param t The time to convert
   * @param timecodeBase The frames per second to use in the calculation
   * @param isDuration Whether `t` represents a duration rather than an absolute time. Durations are rounded away from zero rather than down.
   * @returns The time as a timecode string
   */
  timeToTimecode(
    t: number = this.time + thisComp.displayStartTime,
    timecodeBase: number = 30,
    isDuration: boolean = false
  ): string {
    return "00:00:00:00";
  }
  /**
   * Converts a given time value to a NTSC timecode string
   * @param t The time to convert
   * @param ntscDropFrame
   * @param isDuration Whether `t` represents a duration rather than an absolute time. Durations are rounded away from zero rather than down.
   */
  timeToNTSCTimecode(
    t: number = this.time + thisComp.displayStartTime,
    ntscDropFrame: boolean = false,
    isDuration: boolean = false
  ) {
    return "00:00:00:00";
  }
  /**
   * Converts a given time in seconds to a string representing feet of film and frames.
   * @param t The time to convert
   * @param fps Frame rate to use for the conversion
   * @param framesPerFoot Number of frames in one foot of film
   * @param isDuration Whether `t` represents a duration rather than an absolute time. Durations are rounded away from zero rather than down.
   */
  timeToFeetAndFrames(
    t: number = this.time + thisComp.displayStartTime,
    fps: number = 1.0 / thisComp.frameDuration,
    framesPerFoot: number = 16,
    isDuration: boolean = false
  ): string {
    return "00:00:00:00";
  }
  /**
   * Converts a given time in seconds to the current time display format of the Project.
   * @param t The time to convert
   * @param fps Frame rate to use for the conversion
   * @param isDuration Whether `t` represents a duration rather than an absolute time. Durations are rounded away from zero rather than down.
   * @param ntscDropFrame
   */
  timeToCurrentFormat(
    t: number = this.time + thisComp.displayStartTime,
    fps: number = 1.0 / thisComp.frameDuration,
    isDuration: boolean = false,
    ntscDropFrame: boolean = thisComp.ntscDropFrame
  ): string {
    return "0000";
  }
  /**
   * Adds two vectors
   */
  add(vec1: Vector, vec2: Vector): Vector {
    const maxLength = Math.max(vec1.length, vec2.length);
    return new Array(maxLength).map((_, index) => {
      return (vec1[index] ?? 0) + (vec2[index] ?? 0);
    }) as Vector;
  }
  /**
   * Subtracts two vectors
   */
  sub(vec1: Vector, vec2: Vector): Vector {
    const maxLength = Math.max(vec1.length, vec2.length);
    return new Array(maxLength).map((_, index) => {
      return (vec1[index] ?? 0) - (vec2[index] ?? 0);
    }) as Vector;
  }
  /**
   * Multiplies a vector by a given scalar amount
   * @param vec1 The vector to multiply
   * @param amount The amount to multiply by
   */
  mul(vec1: Vector, amount: number): Vector {
    return vec1.map((el) => (el ?? 0) * amount) as Vector;
  }
  /**
   * Divides a vector by a given scalar amount
   * @param vec1 The vector to divide
   * @param amount The amount to divide by
   */
  div(vec1: Vector, amount: number): Vector {
    return vec1.map((el) => (el ?? 0) / amount) as Vector;
  }
  /**
   * Constrains a given number, or each element of an array, to fall within a a given range
   * @param value Array or number to constrain
   * @param limit1 Lower limit
   * @param limit2 Upper limit
   */
  clamp<T extends number | number[]>(
    value: T,
    limit1: number,
    limit2: number
  ): T {
    return value;
  }
  /**
   * @returns the dot (inner) product of two vectors
   */
  dot(vec1: Vector, vec2: Vector): Vector {
    return vec1;
  }
  /**
   * @returns the cross product of two vectors
   */
  cross(vec1: Vector, vec2: Vector): Vector {
    return vec1;
  }
  /**
   * @returns The given vector normalized so it has a length of 1
   */
  normalize(vec1: Vector): Vector {
    return [1, 1];
  }
  /**
   * @returns The length of a given vector, or if two vectors are provided the distance between them
   */
  length(point1: Vector, point2?: Vector): number {
    return 1;
  }
  /**
   * Used to orient a layer towards a given point in 3D space
   * @param fromPoint The location in world space of the layer you want to orient
   * @param atPoint The point in world space you want to point the layer at
   * @returns An orientation value that can be used to orient the layer so that the z-axis points at the `atPoint`
   */
  lookAt(fromPoint: Vector, atPoint: Vector): Vector3D {
    return [0, 0, 0];
  }
  /**
   * Used to modify the random seed for an expression
   * @param offset A value used to modify the random seed
   * @param timeless Whether the random seed should be consistent across time
   */
  seedRandom(offset: number, timeless: boolean = false): void {}
  /**
   * @returns a random value either between `0` and `1`, `0` and the first argument, or the first and second argument if two are provided. If the arguments are arrays, an equal length array of random values will be returned
   * @param minValOrArray If only one argument is provided, the max value for the random number, otherwise the minimum value
   * @param maxValOrArray The maximum value to return
   */
  random(
    minValOrArray?: number | [],
    maxValOrArray?: number | []
  ): number | [] {
    return minValOrArray || 0;
  }
  /**
   * @returns a random value with a gaussian distribution either between `0` and `1`, `0` and the first argument, or the first and second argument if two are provided. If the arguments are arrays, an equal length array of random values will be returned
   * @param minValOrArray If only one argument is provided, the max value for the random number, otherwise the minimum value
   * @param maxValOrArray The maximum value to return
   */
  gaussRandom(
    minValOrArray?: number | [],
    maxValOrArray?: number | []
  ): number | [] {
    return minValOrArray || 0;
  }
  /**
   * Used to get a random value via Perlin noise, where inputs values that are close together will result in output values that are closer together.
   * @param valOrArray The noise input value
   * @returns A value between `-1` and `1`
   */
  noise(valOrArray: number | []): number {
    return 1;
  }
  /**
   * @returns A given value, mapped from one range to another, clamped to the output range. If only 3 parameters are given, the input range is `0` to `1` and the given values are used for the output range.
   * @param t The input value to be re-mapped
   * @param tMin The inputs low floor
   * @param tMax The inputs high ceiling
   * @param value1 The output floor
   * @param value2 The output ceiling
   */
  linear(
    t: number,
    tMin: number,
    tMax: number,
    value1?: number | [],
    value2?: number | []
  ): number | [] {
    return value1 || tMin;
  }
  /**
   * @returns A given value, mapped from one range to another, clamped to the output range. The mapping will ease in and out so it reaches the output range with a velocity of `0`. If only 3 parameters are given, the input range is `0` to `1` and the given values are used for the output range.
   * @param t The input value to be re-mapped
   * @param tMin The inputs low floor
   * @param tMax The inputs high ceiling
   * @param value1 The output floor
   * @param value2 The output ceiling
   */
  ease(
    t: number,
    tMin: number,
    tMax: number,
    value1?: number | [],
    value2?: number | []
  ): number | [] {
    return value1 || tMin;
  }
  /**
   * @returns A given value, mapped from one range to another, clamped to the output range. The mapping will ease out with a velocity of `0`. If only 3 parameters are given, the input range is `0` to `1` and the given values are used for the output range.
   * @param t The input value to be re-mapped
   * @param tMin The inputs low floor
   * @param tMax The inputs high ceiling
   * @param value1 The output floor
   * @param value2 The output ceiling
   */
  easeIn(
    t: number,
    tMin: number,
    tMax: number,
    value1?: number | [],
    value2?: number | []
  ): number | [] {
    return value1 || tMin;
  }
  /**
   * @returns A given value, mapped from one range to another, clamped to the output range. The mapping will ease into the output range  with a velocity of `0`. If only 3 parameters are given, the input range is `0` to `1` and the given values are used for the output range.
   * @param t The input value to be re-mapped
   * @param tMin The inputs low floor
   * @param tMax The inputs high ceiling
   * @param value1 The output floor
   * @param value2 The output ceiling
   */
  easeOut(
    t: number,
    tMin: number,
    tMax: number,
    value1?: number | [],
    value2?: number | []
  ): number | [] {
    return value1 || tMin;
  }
  /**
   * Converts a color in RGBA space to HSLA
   * @param rgbaArray Input RGBA array of values between 0 and 1
   * @returns An array of hue, saturation, lightness and alpha values between 0 and 1
   */
  rgbToHsl(rgbaArray: Color): Color {
    return [1, 1, 1, 1];
  }
  /**
   * Converts a color in HSLA space to RGBA
   * @param rgbaArray Input HSLA array of values between 0 and 1
   * @returns An array of red, green, blue and alpha values between 0 and 1
   */
  hslToRgb(hslaArray: Color): Color {
    return [1, 1, 1, 1];
  }
  /**
   * Converts a color in hex triplet space to RGB, or in hex quartet space to RGBA space. For hex triplets, alpha defaults to 1.0
   * @param hex String representing an hex triplet (6 digits, no alpha channel) or quartet (8 digits, includes alpha channel) containing only numerals or characters A–F. Optional leading characters 0x, 0X, or # are ignored. Characters beyond 8 digits are ignored.
   */
  hexToRgb(hex: string): Color {
    return [1, 1, 1, 1];
  }
}

const thisLayer = new Layer();

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
  /**
   * @returns The value of specified static or dynamic data stream in a .mgJSON file
   * @param dataPath the path in the hierarchy to the desired data stream
   */
  dataValue?(dataPath: []): number {
    return 0;
  }
  /**
   * @returns The number of samples in a specified dynamic data stream in a .mgJSON file
   * @param dataPath the path in the hierarchy to the desired dynamic data stream
   */
  dataKeyCount?(dataPath: []): number {
    return 0;
  }
  /**
   * @returns The time in seconds for the samples of a specified dynamic data stream in a .mgJSON file
   * @param dataPath The path in the hierarchy to a dynamic data stream.
   * @param t0 The start time, in seconds, of the span from which to return samples. Defaults to startTime.
   * @param t1 The end time, in seconds, of the span from which to return samples. Defaults to endTime.
   */
  dataKeyTimes?(dataPath: [], t0?: number, t1?: number): number[] {
    return [0, 0];
  }
  /**
   * @returns The values for the samples of a specified dynamic data stream in a .mgJSON file.
   * @param dataPath The path in the hierarchy to a dynamic data stream.
   * @param t0 The start time, in seconds, of the span from which to return samples. Defaults to startTime.
   * @param t1 The end time, in seconds, of the span from which to return samples. Defaults to endTime.
   */
  dataKeyValues?(dataPath: [], t0?: number, t1?: number): number[] {
    return [0, 0];
  }
}
