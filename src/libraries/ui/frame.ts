import { getHeight, getWidth } from 'love.graphics';
import { RGB } from 'love.math';
import { UDim2 } from './data';
import { UIBase } from './interface';

export class UIFrame extends UIBase {
	public backgroundTransparency: number;
	public backgroundColor: RGB;
	public rotation: number;

	constructor(parent?: UIBase) {
		super(parent);
		this.backgroundTransparency = 0;
		this.rotation = 0;
		this.backgroundColor = [1, 1, 1];
		this.size = UDim2.fromOffset(100, 100);
		this.position = new UDim2(0, 0, 0, 0);
	}

	onDraw(): void {
		love.graphics.setColor(
			this.backgroundColor[0],
			this.backgroundColor[1],
			this.backgroundColor[2],
			math.abs(this.backgroundTransparency - 1)
		);

		const positionLimits: [number, number] = [getWidth(), getHeight()];
		const positionOrigin: [number, number] = [0, 0];

		if (this.parent) {
			positionOrigin[0] = this.parent.getAbsolutePosition()[0];
			positionOrigin[1] = this.parent.getAbsolutePosition()[1];
			positionLimits[0] =
				positionOrigin[0] + this.parent.getAbsoluteSize()[0];
			positionLimits[1] =
				positionOrigin[1] + this.parent.getAbsoluteSize()[1];
		}

		love.graphics.rectangle(
			'fill',
			positionOrigin[0] +
				this.position.X.Offset +
				this.position.X.Scale * positionLimits[0],
			positionOrigin[1] +
				this.position.Y.Offset +
				this.position.Y.Scale * positionLimits[1],
			this.getAbsoluteSize()[0],
			this.getAbsoluteSize()[1]
		);

		super.onDraw();
	}
}
