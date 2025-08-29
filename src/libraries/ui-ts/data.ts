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

// export const Fonts = {
//     Silkscreen_Regular: newFont("....res\\fonts\\Silkscreen-Regular.ttf", 10, "normal"),
//     Silkscreen_Bold: newFont("....res\\fonts\\Silkscreen-Bold.ttf", 10, "normal")
// }
