import { Image, Quad } from "love.graphics";

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
    getFrames(): Quad[];
}

export interface Animation {
    clone(): Animation;
    flipH(): Animation;
    flipV(): Animation;
    update(dt: number): void;
    pause(): void;
    gotoFrame(position: number): void;
    pauseAtEnd(): void;
    pauseAtStart(): void;
    resume(): void;
    draw(
        image: Quad,
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
    getDimensions(): LuaMultiReturn<[number, number]>;
}
