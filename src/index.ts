export type Points = Vector2D[];
export type Vector2D = [x: number, y: number];
export type Vector3D = [x: number, y: number, z: number];
export type Vector = Vector2D | Vector3D;
export type Color = [r: number, g: number, b: number, a: number];
export type NumericValue = number | number[] | Vector | Color;

type MathReturn<
  A extends NumericValue,
  B extends NumericValue
> = A extends number[]
  ? A
  : B extends number[]
  ? B
  : A extends number
  ? B extends number
    ? number
    : Error
  : Error;

export interface PathValue {
  className: "Path Object";
}

export type SourceData = any[];

// Global objects, attributes, and methods

/**
 * Keyframe objects, which can be accessed via the property method `property.key()`
 */
export class Key<ValueType extends Value> {
  /**
   * The value of the keyframe
   */
  readonly value: ValueType;
  /**
   * The location of the keyframe in time
   */
  readonly time: number = 0;
  /**
   * The index of the keyframe, e.g. The `1`st keyframe on the property. Starts from 0.
   */
  readonly index: number = 1;

  constructor(keyValue: ValueType) {
    this.value = keyValue;
  }
}

export class Project {
  /**
   * The platform-specific absolute file path, including the project file name. If the project has not been saved, it returns an empty string.
   */
  readonly fullPath: string = "path/to/project/file";
  /**
   * The color depth of the project in bits per channel (bpc), as set in Project Settings > Color Management
   */
  readonly bitsPerChannel: "8" | "16" | "32" = "8";
  /**
   * The state of the Blend Colors Using 1.0 Gamma option in Project Settings > Color Management
   */
  readonly linearBlending: boolean = true;
}

export interface MarkerParam {
  [id: string]: Value;
}

/**
 * Composition or Layer marker objects
 */
export class MarkerKey {
  /**
   * Duration, in seconds, of marker.
   */
  readonly duration: number = 0;
  /**
   * Contents of Comment field in marker dialog box.
   */
  readonly comment: string = "Marker comment";
  /**
   * Contents of Chapter field in marker dialog box.
   */
  readonly chapter: string = "Chapter 1";
  /**
   * Contents of URL field in marker dialog box.
   */
  readonly url: string = "URL";
  /**
   * Contents of Frame Target field in marker dialog box.
   */
  readonly frameTarget: string = "Frame Target";
  /**
   * Setting for cue point type in marker dialog box. True for Event; false for Navigation.
   */
  readonly eventCuePoint: boolean = false;
  /**
   * Contents of cue point Name field in marker dialog box.
   */
  readonly cuePointName: string = "Cue Point Name";
  /**
   * Contents of Parameter Name and Parameter Value fields in marker dialog box.

  For example, if you have a parameter named “background color”, then you can use the following expression to access its value at the nearest marker:  thisComp.marker.nearestKey(time).parameters["background color"]
   */
  readonly parameters: MarkerParam = {};
  /**
   * Whether the marker represents a protected region
   */
  readonly protectedRegion: boolean = false;
  /**
   * The location of the marker in time
   */
  readonly time: number = 0;
  /**
   * The index of the marker
   */
  readonly index: number = 1;
}

export class MarkerProperty {
  /**
   * The total number of composition markers in the composition.
   */
  readonly numKeys: number = 1;
  /**
   * @returns The `Marker` object with the specified name or index
   * @param indexOrName Either the index or name (the value of the commend field) of the marker
   */
  key(indexOrName: number | string): MarkerKey {
    return new MarkerKey();
  }
  /**
   * @returns The marker that is nearest in time to `t`
   * @param t Time value to get the marker closest to
   */
  nearestKey(t: number): MarkerKey {
    return new MarkerKey();
  }
}

export class Comp {
  /**
   * The name of the composition.
   */
  readonly name: string = "Comp Base";
  /**
   * The number of layers in the composition.
   */
  readonly numLayers: number = 1;
  /**
   * The Camera object for the camera through which the composition is rendered at the current frame. This camera is not necessarily the camera through which you are looking in the Composition panel.
   */
  readonly activeCamera: Camera = new Camera();
  /**
   * The marker property group object
   */
  readonly marker?: MarkerProperty = new MarkerProperty();
  /**
   * The composition width in pixels
   */
  readonly width: number = 1920;
  /**
   * The composition height in pixels
   */
  readonly height: number = 1080;
  /**
   * The composition duration in seconds
   */
  readonly duration: number = 10;
  /**
   * Whether the timecode is in drop-frame format
   */
  readonly ntscDropFrame: boolean = false;
  /**
   * The composition start time in seconds
   */
  readonly displayStartTime: number = 0;
  /**
   * The duration of a frame, in seconds
   */
  readonly frameDuration: number = 0.04;
  /**
   * The shutter-angle of the composition, in degrees
   */
  readonly shutterAngle: number = 180;
  /**
   * The background color of the composition
   */
  readonly bgColor: Color = [1, 1, 1, 1];
  /**
   * The pixel aspect ratio of the composition
   */
  readonly pixelAspect: number = 1;
  /**
   * Gets a layer in the composition
   * @param indexOrOtherLayer The index or name of the layer to return, or a Layer object if using the relative index
   * @param relIndex Used when a layer is provided for the first input, the relative index from the given Layer
   * @returns The requested Layer object
   */
  layer(index: number): Layer;
  layer(name: string): Layer;
  layer(otherLayer: Layer, relativeIndex: number): Layer;
  layer(indexOrOtherLayer: number | string | Layer, relativeIndex?: number) {
    return new Layer();
  }
}

/**
 * Groups of properties such as "Transform"
 */
export class PropertyGroup {
  /**
   * The name of the property group, e.g. `"Transform"`
   */
  readonly name: string = "property group base";
  /**
   * The number of properties in the group
   */
  readonly numProperties: number = 1;
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

export class Property<PropertyValueType extends Value> {
  /**
   * The temporal velocity value at the current time. For spatial properties, such as Position, it returns the tangent vector value. The result is the same dimension as the property.
   */
  readonly velocity: PropertyValueType;

  /**
   * A 1D, positive speed value equal to the speed at which the property is changing at the default time. This element can be used only for spatial properties.
   */
  readonly speed: PropertyValueType;

  constructor(
    readonly value: PropertyValueType,
    readonly name: string = "Property name"
  ) {
    this.velocity = this.value;
    this.speed = this.value;
  }

  /**
   * The number of keyframes on the property
   */
  readonly numKeys: number = 0;
  /**
   * The index number of the property in it's property group
   */
  readonly propertyIndex: number = 0;
  /**
   * @returns The keyframe at the specified index on the property
   * @param index The index of the keyframe to return (e.g. the `1`st keyframe)
   */
  key(index: number): Key<PropertyValueType> {
    return new Key(this.value);
  }
  /**
   * @returns The marker that is nearest in time to `t`
   * @param t Time value to get the marker closest to
   */
  nearestKey(time: number): Key<PropertyValueType> {
    return new Key(this.value);
  }
  /**
   * @returns The group of properties (`PropertyGroup` object) relative to the property of which the expression is written
   * @param countUp The number of levels in the property hierarchy to ascend, e.g. `countUp = 1` will return the parent `PropertyGroup`.
   */
  propertyGroup(countUp: number): PropertyGroup {
    return new PropertyGroup("Default property propertyGroup");
  }

  // Numeric Value methods & Properties
  // TODO: These should be undefined if the `PropertyValueType`
  // is not numeric

  /**
   * Loops a segment of time that is measured from the first keyframe on the layer forward toward the Out point of the layer. The loop plays from the In point of the layer.
   * @param type `"cycle"`: (default) Repeats the specified segment.
   * `"pingpong"`: Repeats the specified segment, alternating between forward and backward.
   * `"offset"`: Repeats the specified segment, but offsets each cycle by the difference in the value of the property at the start and end of the segment, multiplied by the number of times the segment has looped.
   * `"continue"`: Does not repeat the specified segment, but continues to animate a property based on the velocity at the first or last keyframe.
   * @param numKeyframes determines what segment is looped: The segment looped is the portion of the layer from the first keyframe to the numKeyframes+1 keyframe. The default value of 0 means that all keyframes loop
   */
  loopIn(
    type: loopType = "cycle",
    numKeyframes: number = 0
  ): PropertyValueType {
    return this.value;
  }
  /**
   * Loops a segment of time that is measured from the last keyframe on the layer back toward the In point of the layer. The loop plays until the Out point of the layer.
   * @param type `"cycle"`: (default) Repeats the specified segment.
   * `"pingpong"`: Repeats the specified segment, alternating between forward and backward.
   * `"offset"`: Repeats the specified segment, but offsets each cycle by the difference in the value of the property at the start and end of the segment, multiplied by the number of times the segment has looped.
   * `"continue"`: Does not repeat the specified segment, but continues to animate a property based on the velocity at the first or last keyframe.
   * @param numKeyframes determines what segment is looped: The segment looped is the portion of the layer from the last keyframe to the `thisProperty.numKeys - numKeyframes` keyframe. The default value of 0 means that all keyframes loop
   */
  loopOut(
    type: loopType = "cycle",
    numKeyframes: number = 0
  ): PropertyValueType {
    return this.value;
  }
  /**
   * Loops a segment of time that is measured from the first keyframe on the layer forward toward the Out point of the layer. The loop plays from the In point of the layer.
   * @param type `"cycle"`: (default) Repeats the specified segment.
   * `"pingpong"`: Repeats the specified segment, alternating between forward and backward.
   * `"offset"`: Repeats the specified segment, but offsets each cycle by the difference in the value of the property at the start and end of the segment, multiplied by the number of times the segment has looped.
   * `"continue"`: Does not repeat the specified segment, but continues to animate a property based on the velocity at the first or last keyframe.
   * @param duration The number of composition seconds in a segment to loop; the specified range is measured from the first keyframe
   */
  loopInDuration(
    type: loopType = "cycle",
    duration: number = 0
  ): PropertyValueType {
    return this.value;
  }
  /**
   * Loops a segment of time that is measured from the last keyframe on the layer back toward the In point of the layer. The loop plays until the Out point of the layer.
   * @param type `"cycle"`: (default) Repeats the specified segment.
   * `"pingpong"`: Repeats the specified segment, alternating between forward and backward.
   * `"offset"`: Repeats the specified segment, but offsets each cycle by the difference in the value of the property at the start and end of the segment, multiplied by the number of times the segment has looped.
   * `"continue"`: Does not repeat the specified segment, but continues to animate a property based on the velocity at the first or last keyframe.
   * @param duration The number of composition seconds in a segment to loop; the specified range is measured from the last keyframe backwards.
   */
  loopOutDuration(
    type: loopType = "cycle",
    duration: number = 0
  ): PropertyValueType {
    return this.value;
  }

  /**
   * @returns The temporal velocity value at the specified time. For spatial properties, such as Position, it returns the tangent vector value. The result is the same dimension as the property.
   * @param time The composition time in seconds to get the velocity at
   */
  velocityAtTime(time: number): PropertyValueType {
    return this.velocity;
  }
  /**
   * @returns  A 1D, positive speed value equal to the speed at which the property is changing at the specified time. This element can be used only for spatial properties.
   * @param time The composition time in seconds to get the speed at
   */
  speedAtTime(time: number): PropertyValueType {
    return this.speed;
  }
  /**
   * Returns the value for the property at the specified time
   * @param time THe composition time in seconds to get the value at
   */
  valueAtTime(time: number): PropertyValueType {
    return this.value;
  }
  /**
   * Modifies the property value randomly over time.
   * @param freq The rate at which the value changes in wiggles per second
   * @param amp How much the value should change, in units of the original property value (e.g. `1` by 100% of the original value)
   * @param octaves How much detail the wiggle has, which is driven by the number of "octaves" of noise to multiply together. Higher values will have more detail
   * @param amp_mult The amount the given amplitude is multiplied by for each octave, which controls the falloff of the upper harmonics ("octaves").
   * @param time The time at which the value is sampled for use within the wiggle
   */
  wiggle(
    freq: number,
    amp: number,
    octaves: number = 1,
    amp_mult: number = 0.5,
    time: number = 0
  ): PropertyValueType {
    const som = freq + amp + octaves + amp_mult + time;
    return this.value;
  }
  /**
   * Samples the property value at a time which is wiggled
   * @param freq The rate at which the value changes in wiggles per second
   * @param amp How much the value should change, in units of the original property value (e.g. `1` by 100% of the original value)
   * @param octaves How much detail the wiggle has, which is driven by the number of "octaves" of noise to multiply together. Higher values will have more detail
   * @param amp_mult The amount the given amplitude is multiplied by for each octave, which controls the falloff of the upper harmonics ("octaves").
   * @param time The time at which the value is sampled for use within the wiggle
   */
  temporalWiggle(
    freq: number,
    amp: number,
    octaves: number = 1,
    amp_mult: number = 0.5,
    time: number = 0
  ): PropertyValueType {
    return this.value;
  }
  /**
   * Smooths the property values over time, converting large, brief deviations in the value to smaller, more evenly distributed deviations. This smoothing is accomplished by applying a box filter to the value of the property at the specified time.
   * @param width The range of time (in seconds) over which the filter is averaged.
   * @param samples The number of discrete samples evenly spaced over time; use a larger value for greater smoothness (but decreased performance). Generally, you’ll want samples to be an odd number so that the value at the current time is included in the average.
   */
  smooth(
    width: number = 0.2,
    samples: number = 5,
    time: number = 0
  ): PropertyValueType {
    return this.value;
  }
}

export class PathProperty extends Property<PathValue> {
  /**
   * Creates a path object from a set of points and tangents.
   * @param points An array of number pair arrays representing x,y coordinates of the path points. The array length must be at least 1, and can be of any greater length.
   * @param inTangents An array containing number pair arrays representing the `[x,y]` offset coordinates of the tangent handles to the path points. Required unless no parameters are passed (i.e., `createPath()`). The array length must be the same as points, or you can pass an empty array (`[]`), which will assume the same length as points and `[0,0]` for all tangents.
   * @param outTangents See `inTangents`
   * @param isClosed Determines if the mask is closed. If true, the last point will be connected to the first point.
   */
  createPath(
    points: Points = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ],
    inTangents: Points | [] = [],
    outTangents: Points | [] = [],
    is_closed: boolean = true
  ): PathValue {
    return {} as PathValue;
  }
  /**
   * @returns Whether a path is closed (the last point connected to the first)
   */
  isClosed(): boolean {
    return true;
  }
  /**
   * Retrieves the points array for a path
   * @param time The time at which to sample the path
   */
  points(time: number = 0): Points {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  /**
   * Retrieves the path's in tangent point array
   * @param time The time at which to sample the path
   */
  inTangents(time?: number): Points {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  /**
   * Retrieves the path's out tangent point array
   * @param time The time at which to sample the path
   */
  outTangents(time?: number): Points {
    return [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  /**
   * Get the x,y coordinates of an arbitrary point along a path.
   * @param percentage How far along the path to get the point, between 0 and 1.
   * @param time The time at which to sample the path
   */
  pointOnPath(percentage: number = 0.5, time: number = 0): Vector2D {
    return [0, 0];
  }
  /**
   * Get the calculated x,y coordinates of the outgoing tangent handle for an arbitrary point along a path.
   * @param percentage How far along the path to get the point, between 0 and 1.
   * @param time The time at which to sample the path
   */
  tangentOnPath(percentage?: number, time?: number): Vector2D {
    return [0, 0];
  }
  /**
   * Get the calculated x,y coordinates of the normal for an arbitrary point along a path.
   * @param percentage How far along the path to get the point, between 0 and 1.
   * @param time The time at which to sample the path
   */
  normalOnPath(percentage?: number, time?: number): Vector2D {
    return [0, 0];
  }
  constructor(value: PathValue = {} as PathValue) {
    super(value);
  }
}

export type loopType = "cycle" | "pingpong" | "offset" | "continue";

export class Transform extends PropertyGroup {
  constructor() {
    super("Transform");
  }
  /**
   * The opacity of the layer, as a percentage.
   */
  readonly opacity: Property<number> = new Property(100, "Opacity");
  /**
   * The anchor point value of the layer in the coordinate system of the layer (layer space).
   */
  readonly anchorPoint: Property<Vector> = new Property([0, 0], "Anchor Point");
  /**
   * The position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
   */
  readonly position: Property<Vector> = new Property([0, 0], "Position");
  /**
   * The x position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
   */
  readonly xPosition: Property<number> = new Property(0, "X Position");
  /**
   * The y position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
   */
  readonly yPosition: Property<number> = new Property(0, "Y Position");
  /**
   * The z position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
   */
  readonly zPosition: Property<number> = new Property(0, "Z Position");
  /**
   * The scale value of the layer, expressed as a percentage.
   */
  readonly scale: Property<Vector> = new Property([0, 0], "Scale");
  /**
   * Returns the rotation value of the layer in degrees. For a 3D layer, it returns the z rotation value in degrees.
   */
  readonly rotation: Property<number> = new Property(0, "Rotation");
  /**
   * Returns the 3D orientation value, in degrees, for a 3D layer.
   */
  readonly orientation?: Property<Vector3D> = new Property(
    [0, 0, 0],
    "Orientation"
  );
  /**
   * Returns the x rotation value, in degrees, for a 3D layer.
   */
  readonly rotationX?: Property<number> = new Property(0, "X Rotation");
  /**
   * Returns the y rotation value, in degrees, for a 3D layer.
   */
  readonly rotationY?: Property<number> = new Property(0, "Y Rotation");
  /**
   * Returns the z rotation value, in degrees, for a 3D layer.
   */
  readonly rotationZ?: Property<number> = new Property(0, "Z Rotation");
}

export class TextStyle {
  /**
   * Font size of the style
   */
  fontSize: number = 0;
  /**
   * Set the font size for a style
   * @param fontSize Font size in pixels
   * @param s Start index
   * @param n Number of characters
   */
  setFontSize(fontSize: number, s?: number, n?: number): TextStyle {
    this.fontSize = fontSize;
    return this;
  }
  /**
   * Font of the style
   */
  font: string = "Arial";
  /**
   * Set the font for a style
   * @param font The typeface to set
   * @param s Start index
   * @param n Number of characters
   */
  setFont(font: string, s?: number, n?: number): TextStyle {
    this.font = font;
    return this;
  }
  /**
   * Set the text content of a sourceText property, used when you need to return a `style` object *and* set the `value`
   * @param text The string to set
   */
  setText(text: string): TextStyle {
    return this;
  }
  /**
   * Whether faux bold is enabled for a style
   */
  isFauxBold: boolean = false;
  /**
   * Set the faux bold property for a style
   * @param s Start index
   * @param n Number of characters
   */
  setFauxBold(isFauxBold: boolean, s?: number, n?: number): TextStyle {
    this.isFauxBold = isFauxBold;
    return this;
  }
  /**
   * Whether faux italic is enabled
   */
  isFauxItalic: boolean = false;
  /**
   * Set the faux italic property for a style
   * @param s Start index
   * @param n Number of characters
   */
  setFauxItalic(isFauxItalic: boolean, s?: number, n?: number): TextStyle {
    this.isFauxItalic = isFauxItalic;
    return this;
  }
  /**
   * Whether all caps is enabled for a style
   */
  isAllCaps: boolean = false;
  /**
   * Set the all caps property for a style
   * @param s Start index
   * @param n Number of characters
   */
  setAllCaps(isAllCaps: boolean, s?: number, n?: number): TextStyle {
    this.isAllCaps = isAllCaps;
    return this;
  }
  /**
   * Whether small caps is enabled for a style
   */
  isSmallCaps: boolean = false;
  /**
   * Set the small caps property for a style
   * @param s Start index
   * @param n Number of characters
   */
  setSmallCaps(isSmallCaps: boolean, s?: number, n?: number): TextStyle {
    this.isSmallCaps = isSmallCaps;
    return this;
  }
  /**
   * Tracking value for a style
   */
  tracking: number = 0;
  /**
   * Set the tracking style for a style
   * @param s Start index
   * @param n Number of characters
   */
  setTracking(tracking: number, s?: number, n?: number): TextStyle {
    this.tracking = tracking;
    return this;
  }
  /**
   * The leading value for a style
   */
  leading: number = 60;
  /**
   * Set the leading value for a style
   * @param s Start index
   * @param n Number of characters
   */
  setLeading(leading: number, s?: number, n?: number): TextStyle {
    this.leading = leading;
    return this;
  }
  /**
   * Whether auto leading is enabled for a style
   */
  autoLeading: boolean = false;
  /**
   * Set the auto leading property for a style
   * @param s Start index
   * @param n Number of characters
   */
  setAutoLeading(autoLeading: boolean, s?: number, n?: number): TextStyle {
    this.autoLeading = autoLeading;
    return this;
  }
  baselineDirection: "default" | "rotated" | "tate-chuu-yoko" = "default";
  /**
   *
   * @param s Start index
   * @param n Number of characters
   */
  setBaselineDirection(
    baselineDirection: "default" | "rotated" | "tate-chuu-yoko",
    s?: number,
    n?: number
  ): TextStyle {
    this.baselineDirection = baselineDirection;
    return this;
  }
  baselineOption: "default" | "subscript" | "superscript" = "default";
  /**
   *
   * @param s Start index
   * @param n Number of characters
   */
  setBaselineOption(
    baselineOption: "default" | "subscript" | "superscript",
    s?: number,
    n?: number
  ): TextStyle {
    this.baselineOption = baselineOption;
    return this;
  }
  /**
   * The baseline shift value for a style
   */
  baselineShift: number = 0;
  /**
   * Set the baseline shift value for a style
   * @param baselineShift The baseline shift to set
   * @param s Start index
   * @param n Number of characters
   */
  setBaselineShift(baselineShift: number, s?: number, n?: number): TextStyle {
    this.baselineShift = baselineShift;
    return this;
  }
  /**
   * Whether to apply a fill to the style
   */
  applyFill: boolean = true;
  /**
   * Enable or disable the fill for a style
   * @param s Start index
   * @param n Number of characters
   */
  setApplyFill(applyFill: boolean, s?: number, n?: number): TextStyle {
    this.applyFill = applyFill;
    return this;
  }
  /**
   * The fill color of a style
   */
  fillColor: [number, number, number] = [1, 1, 1];
  /**
   * Set the fill color for a style
   * @param fillColor The color to set
   * @param s Start index
   * @param n Number of characters
   */
  setFillColor(
    fillColor: [number, number, number],
    s?: number,
    n?: number
  ): TextStyle {
    this.fillColor = fillColor;
    return this;
  }
  /**
   * Whether to apply a stroke to the style
   */
  applyStroke: boolean = false;
  /**
   * Enable or disable the stroke for a style
   * @param s Start index
   * @param n Number of characters
   */
  setApplyStroke(applyStroke: boolean, s?: number, n?: number): TextStyle {
    this.applyStroke = applyStroke;
    return this;
  }
  /**
   * The stroke colour of a style
   */
  strokeColor: [number, number, number] = [1, 1, 1];
  /**
   * Set the stroke colour for a style
   * @param strokeColor The color to set
   * @param s Start index
   * @param n Number of characters
   */
  setStrokeColor(
    strokeColor: [number, number, number],
    s?: number,
    n?: number
  ): TextStyle {
    this.strokeColor = strokeColor;
    return this;
  }
  /**
   * The stroke width for a style
   */
  strokeWidth: number = 0;
  /**
   * Set the stroke width for a style
   * @param strokeWidth The stroke width to set
   * @param s Start index
   * @param n Number of characters
   */
  setStrokeWidth(strokeWidth: number, s?: number, n?: number): TextStyle {
    this.strokeWidth = strokeWidth;
    return this;
  }
  digitSet: "default" | "hindidigits" = "default";
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setDigitSet(
    digitSet: "default" | "hindidigits",
    s?: number,
    n?: number
  ): TextStyle {
    this.digitSet = digitSet;
    return this;
  }
  horizontalScaling: number = 100;
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setHorizontalScaling(
    horizontalScaling: number,
    s?: number,
    n?: number
  ): TextStyle {
    this.horizontalScaling = horizontalScaling;
    return this;
  }
  verticalScaling: number = 100;
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setVerticalScaling(
    verticalScaling: number,
    s?: number,
    n?: number
  ): TextStyle {
    this.verticalScaling = verticalScaling;
    return this;
  }
  kerning: number = 0;
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setKerning(kerning: number, s?: number, n?: number): TextStyle {
    this.kerning = kerning;
    return this;
  }
  kerningType: "metrics" | "optical" = "metrics";
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setKerningType(
    kerningType: "metrics" | "optical",
    s?: number,
    n?: number
  ): TextStyle {
    this.kerningType = kerningType;
    return this;
  }
  isLigature: boolean = false;
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setLigature(ligature: boolean, s?: number, n?: number): TextStyle {
    this.isLigature = ligature;
    return this;
  }
  lineJoin: "bevel" | "miter" | "round" = "miter";
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setLineJoin(
    lineJoin: "bevel" | "miter" | "round",
    s?: number,
    n?: number
  ): TextStyle {
    this.lineJoin = lineJoin;
    return this;
  }
  /**
   * Replaces the content between `s` and `n` with the given `content`, or if `s` and `n` aren't given replaces the entire string
   * @param s Start index
   * @param n Number of characters
   */
  replaceText(content: string, s?: number, n?: number): TextStyle {
    return this;
  }
  tsume: number = 0;
  /**
   * @param s Start index
   * @param n Number of characters
   */
  setTsume(tsume: number, s?: number, n?: number): TextStyle {
    this.tsume = tsume;
    return this;
  }
}

export class SourceText extends Property<string> {
  constructor(value: string) {
    super(value);
  }
  style = new TextStyle();
  /**
   * Get the style object of a text property at a character index
   * @param characterIndex Which character to get the style at
   * @param sampleTime The time to get the style at, defaulting to the current time
   */
  getStyleAt(characterIndex: number, sampleTime: number = 0) {
    return this.style;
  }
  /**
   * Used to create a new style object, rather than referencing and modifying an existing one.
   * @returns An empty style object
   */
  createStyle() {
    return new TextStyle();
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
  readonly fillAndStroke: number = 1;
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
  /**
   * Returns true if the effect is turned on
   */
  active: boolean = true;
  /**
   * @returns A property within an effect, e.g. `"Slider"`
   * @param nameOrIndex The name or index of the property to retrieve
   */
  param(nameOrIndex: string | number): Property<string> {
    return new Property<string>("Effect Param");
  }
}

// Duplicate declaration as an interface, to add a call
// signature for effects. This enables layer.effect("")("") syntax
export interface Effect {
  /**
   * @returns A property within an effect, e.g. `"Slider"`
   * @param nameOrIndex The name or index of the property to retrieve
   */
  (nameOrIndex: string | number): Property<string>;
}

export class Mask {
  /**
   * The opacity value of a mask as a percentage.
   */
  readonly maskOpacity: Property<number> = new Property(100, "Mask Opacity");
  /**
   * The feather value of a mask, in pixels.
   */
  readonly maskFeather: Property<number> = new Property(100, "Mask Feather");
  /**
   * The expansion value of a mask, in pixels.
   */
  readonly maskExpansion: Property<number> = new Property(0, "Mask Expansion");
  /**
   * True if the mask is inverted or false if it is not.
   */
  readonly invert: Property<boolean> = new Property(false, "Invert");
}

export class Light {
  /**
   * The point of interest values for a light in world space.
   */
  readonly pointOfInterest: Property<Vector3D> = new Property(
    [0, 0, 0],
    "Point of Interest"
  );
  /**
   * The intensity values of a light as a percentage.
   */
  readonly intensity: Property<number> = new Property(100, "Intensity");
  /**
   * The color value of a light.
   */
  readonly color: Property<Color> = new Property([1, 1, 1, 1], "Color");
  /**
   * The shadow darkness value of a light as a percentage.
   */
  readonly shadowDarkness: Property<number> = new Property(
    100,
    "Shadow Darkness"
  );
  /**
   * The shadow diffusion value of a light, in pixels.
   */
  readonly shadowDiffusion: Property<number> = new Property(
    0,
    "Shadow Diffusion"
  );
  readonly coneAngle?: Property<number> = new Property(90, "Cone Angle");
  readonly coneFeather?: Property<number> = new Property(50, "Cone Feather");
}

export class Camera {
  /**
   * The point of interest values of a camera in world space.
   */
  readonly pointOfInterest: Property<Vector3D> = new Property(
    [0, 0, 0],
    "Point of Interest"
  );
  /**
   * The zoom values of a camera in pixels
   */
  readonly zoom: Property<number> = new Property(1000, "Zoom");
  /**
   * Returns 1 if the Depth Of Field property of a camera is on, or returns 0 if the Depth Of Field property is off.
   */
  readonly depthOfField: Property<number> = new Property(1, "Depth of Field");
  /**
   * The focus distance value of a camera, in pixels.
   */
  readonly focusDistance: Property<number> = new Property(
    1000,
    "Focus Distance"
  );
  /**
   * The aperture value of a camera, in pixels.
   */
  readonly aperture: Property<number> = new Property(4, "Aperture");
  /**
   * The blur level value of a camera as a percentage.
   */
  readonly blurLevel: Property<number> = new Property(100, "Blur Level");
  /**
   * True if the camera is the active camera for the composition at the current time: the Video switch for the camera layer is on, the current time is in the range from the In point of the camera layer to the Out point of the camera layer, and it is the first (topmost) such camera layer listed in the Timeline panel. False otherwise.
   */
  readonly active: boolean = true;
}

const thisComp = new Comp();

export class Layer {
  /**
   * The composition time, in seconds, at which the expression is being evaluated.
   */
  readonly time: number = 0;
  /**
   * The project color depth value. For example, colorDepth returns 16 when the project color depth is 16 bits per channel.
   */
  readonly colorDepth: number = 8;
  /**
   * The name of the layer
   */
  readonly name: string = "Layer name";
  /**
   * The source Comp or source Footage object for the layer. Default time is adjusted to the time in the source
   */
  readonly source?: Comp | Footage = thisComp;
  /**
   * The width of the layer in pixels, same as `source.width`
   */
  readonly width: number = 1920;
  /**
   * The height of the layer in pixels, same as `source.height`
   */
  readonly height: number = 1080;
  /**
   * The index number of the layer in the composition
   */
  readonly index: number = 0;
  /**
   * The parent Layer object of the layer, if it has one
   */
  readonly parent?: Layer | Light | Camera = undefined;
  /**
   * Whether the layer has a parent layer
   */
  readonly hasParent: boolean = true;
  /**
   * The in point of the layer, in seconds
   */
  readonly inPoint: number = 0;
  /**
   * The out point of the layer in seconds
   */
  readonly outPoint: number = 1;
  /**
   * The start time of the layer in seconds
   */
  readonly startTime: number = 0;
  /**
   * Whether the layer has video data
   */
  readonly hasVideo: boolean = true;
  /**
   * Whether the layer has audio data
   */
  readonly hasAudio: boolean = true;
  /**
   * Whether the video switch is enabled, and the current time is between in the `inPoint` and `outPoint` of the layer
   */
  readonly active: boolean = true;
  /**
   * Whether the video switch for the layer is enabled
   */
  readonly enabled: boolean = true;
  /**
   * Whether the audio switch is enabled, and the current time is in between the `inPoint` and `outPoint` of the layer
   */
  readonly audioActive?: boolean = true;
  /**
   *  The value of the Audio Levels property of the layer, in decibels. This value is a 2D value; the first value represents the left audio channel, and the second value represents the right. The value is not the amplitude of the audio track of the source material. Instead, it is the value of the Audio Levels property, which may be affected by keyframes.
   */
  readonly audioLevels?: Property<Vector2D> = new Property(
    [0, 0],
    "Audio Levels"
  );
  /**
   * The value of the Time Remap property, in seconds, if Time Remap is enabled.
   */
  readonly timeRemap?: Property<number> = new Property(0, "Time Remap");
  /**
   * The marker property group object
   */
  readonly marker?: MarkerProperty = new MarkerProperty();
  /**
   * The transform property group object
   */
  readonly transform: Transform = new Transform();
  /**
   * The text property group object
   */
  readonly text?: Text = new Text();
  /**
   * The material options property group object
   */
  readonly materialOption?: MaterialOptions = new MaterialOptions();
  /**
   * Transforms a given vector from the layer's space to the composition space
   *
   * @param vec The vector to transform
   * @param time The time to sample the vector
   * @returns The vector in the composition space
   */
  toComp<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  /**
   * Transforms a given vector from the compositions space to the layer's space
   *
   * @param vec The vector to transform
   * @param time The time to sample the vector
   * @returns The vector in the layer's space
   */
  fromComp<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  /**
   * Transforms a given vector from the layers space to the view-independent world space
   *
   * @param vec The vector to transform
   * @param time The time to sample the number
   * @returns The vector in world space
   */
  toWorld<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  toCompVec<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  fromCompVec<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  toWorldVec<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  fromWorldVec<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
    return vec;
  }
  /**
   * Projects a point located in composition space to a point on the surface of the layer (zero z-value) at the location where it appears when viewed from the active camera.
   *
   * @param vec The vector to transform
   * @param time The time to sample the number
   * @returns The vector in on the layers surface space
   */
  fromCompToSurface<VectorType extends Vector | Vector2D | Vector3D>(
    vec: VectorType,
    time: number = this.time
  ): VectorType {
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
  add<A extends NumericValue, B extends NumericValue>(
    a: A,
    b: B
  ): MathReturn<A, B> {
    return a as any;
  }
  /**
   * Subtracts two vectors
   */
  sub<A extends NumericValue, B extends NumericValue>(
    a: A,
    b: B
  ): MathReturn<A, B> {
    return a as any;
  }
  /**
   * Multiplies a vector by a given scalar amount
   * @param vec1 The vector to multiply
   * @param amount The amount to multiply by
   */
  mul<VectorType extends number | Vector | Vector2D | Vector3D>(
    vec1: VectorType,
    amount: number
  ): VectorType {
    return vec1;
  }
  /**
   * Divides a vector by a given scalar amount
   * @param vec1 The vector to divide
   * @param amount The amount to divide by
   */
  div<VectorType extends number | Vector | Vector2D | Vector3D>(
    vec1: VectorType,
    amount: number
  ): VectorType {
    return vec1;
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

export class Footage {
  /**
   * The name of the footage item as shown in the project panel
   */
  readonly name: string = "Layer Name";
  /**
   * The width of the footage item, in pixels
   */
  readonly width?: number = 500;
  /**
   * The height of the footage item, in pixels
   */
  readonly height?: number = 500;
  /**
   * The duration of the footage item, in seconds
   */
  readonly duration?: number = 10;
  /**
   * The duration of a frame in the footage item, in seconds
   */
  readonly frameDuration?: number = 0.04;
  /**
   * Whether the timecode is in NTSC drop-frame format
   */
  readonly ntscDropFrame?: boolean = false;
  /**
   * The pixel aspect ratio of the footage
   */
  readonly pixelAspect?: number = 1;
  /**
   * The contents of a JSON file as a string
   */
  readonly sourceText?: string = "Source Text";
  /**
   * The data of a JSON file as an array of `sourceData` objects
   */
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
