import { Image, Quad } from 'love.graphics';

export function newGrid(
	width: number,
	height: number,
	imageW: number,
	imageH: number,
	left?: number,
	top?: number,
	border?: number
): Grid;

export function newAnimation(
	frames: Quad[],
	durations: number,
	onLoop?: Function
): Animation;

export interface Grid {
	frameWidth: number;
	frameHeight: number;
	imageWidth: number;
	imageHeight: number;
	left: number;
	top: number;
	border: number;
	width: number;
	height: number;
	/**
	 * Returns the frames you specify. Use strings for accessing multiple frames i.e. '1-4'
	 * @param rows What rows to get
	 * @param columns What columns to get
	 */
	getFrames(rows: string | number, columns: string | number): Quad[];
}

export interface Animation {
	/**
	 * Creates and returns a new animation.
	 */
	clone(): Animation;

	/**
	 * Flips and returns the animation along the x-axis.
	 */
	flipH(): Animation;

	/**
	 * Flips and returns the animation along the y-axis.
	 */
	flipV(): Animation;

	/**
	 * Updates and manages the animation ticking.
	 * @param dt DeltaTime
	 */
	update(dt: number): void;

	/**
	 * Pauses the animation from updating but not drawing.
	 */
	pause(): void;

	/**
	 * Sets the current animation frame to a provided index.
	 * @param position Frame Index
	 */
	gotoFrame(position: number): void;

	/**
	 * Pauses the animation at the last frame of the animation.
	 */
	pauseAtEnd(): void;

	/**
	 * Pauses the animation at the first frame of the animation.
	 */
	pauseAtStart(): void;

	/**
	 * Resumes the animation.
	 */
	resume(): void;

	/**
	 * Draws the animation on the screen.
	 * @param image Image
	 * @param x X Position on the screen
	 * @param y Y Position on the screen
	 * @param r Rotation
	 * @param sx X Scale Factor
	 * @param sy Y Scale Factor
	 * @param ox X Position Offset
	 * @param oy Y Position Offset
	 * @param kx X Shearing Factor
	 * @param ky Y Shearing Factor
	 */
	draw(
		image: Image,
		x: number,
		y: number,
		r?: number,
		sx?: number,
		sy?: number,
		ox?: number,
		oy?: number,
		kx?: number,
		ky?: number
	): void;

	getFrameInfo(
		x: number,
		y: number,
		r?: number,
		sx?: number,
		sy?: number,
		ox?: number,
		oy?: number,
		kx?: number,
		ky?: number
	): void;

	/**
	 * Returns the dimensions of the frame's viewport.
	 */
	getDimensions(): LuaMultiReturn<[number, number]>;
}
