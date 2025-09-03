import { getHeight, getWidth } from 'love.graphics';
import { colorFromBytes, RGB } from 'love.math';
import UIBase from './base';
import { UDim2 } from './data';

export default class UIFrame extends UIBase {
	public backgroundTransparency: number = 0;
	public backgroundColor: RGB = colorFromBytes(
		255,
		255,
		255
	) as LuaMultiReturn<RGB>;
	public rotation: number = 0;

	constructor() {
		super();
		this.size = UDim2.fromOffset(100, 100);
		this.position = new UDim2(0, 0, 0, 0);
	}

	onDraw(): void {
		love.graphics.setColor(this.backgroundColor);

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
			positionOrigin[0] + this.position.X.Offset + (this.position.X.Scale * positionLimits[0]),
			positionOrigin[1] + this.position.Y.Offset, (this.position.Y.Scale *positionLimits[1]),
			this.getAbsoluteSize()[0],
			this.getAbsoluteSize()[1]
		);
		
		super.onDraw();
	}
}
