import { newTransform, RGB, RGBA } from "love.math";

export class UDim {
	public readonly Scale: number;
	public readonly Offset: number;
	constructor(scale: number, offset: number) {
		this.Scale = scale;
		this.Offset = offset;
	}
}

export class UDim2 {
	public static fromOffset(x: number, y: number) {
		return new UDim2(0, x, 0, y);
	}

	public static fromScale(x: number, y: number) {
		return new UDim2(x, 0, y, 0);
	}

	public X: UDim;
	public Y: UDim;

	constructor(
		XScale: number,
		XOffset: number,
		YScale: number,
		YOffset: number
	) {
		this.X = new UDim(XScale, XOffset);
		this.Y = new UDim(YScale, YOffset);
	}
}

export class Color3 {
	public r: number;
	public g: number;
	public b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	toRGB(): RGB {
		return [this.r, this.g, this.b];
	}

	toRGBA(transparency: number): RGBA {
		return [this.r, this.g, this.b, transparency];
	}

	lerp(targetColor: Color3, alpha: number): Color3 {
		const r = this.r + (targetColor.r - this.r) * alpha;
		const g = this.g + (targetColor.g - this.g) * alpha;
		const b = this.b + (targetColor.b - this.b) * alpha;

		return new Color3(r, g, b);		
	}
}