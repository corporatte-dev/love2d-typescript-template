import { getHeight, getWidth } from 'love.graphics';
import { OnDraw } from '../../types/system';
import { UDim2 } from './data';

export abstract class UIBase implements OnDraw {
	public size: UDim2;
	public position: UDim2;
	public anchorPoint: [number, number];
	public visible: boolean = true;

	public parent?: UIBase;

	constructor(parent?: UIBase) {
		this.size = new UDim2(0, 0, 0, 0);
		this.position = new UDim2(0, 0, 0, 0);
		this.anchorPoint = [0, 0];
		this.parent = parent;
	}

	getAbsoluteSize(): LuaMultiReturn<[number, number]> {
		const limits: [number, number] = [getWidth(), getHeight()];

		if (this.parent) {
			limits[0] = this.parent.getAbsoluteSize()[0];
			limits[1] = this.parent.getAbsoluteSize()[1];
		}

		return $multi(
			math.floor(this.size.X.Offset + limits[0] * this.size.X.Scale),
			math.floor(this.size.Y.Offset + limits[1] * this.size.Y.Scale)
		);
	}

	getAbsolutePosition(): LuaMultiReturn<[number, number]> {
		const origin: [number, number] = [0, 0];
		const limits: [number, number] = [getWidth(), getHeight()];

		if (this.parent) {
			origin[0] = this.parent.getAbsolutePosition()[0];
			origin[1] = this.parent.getAbsolutePosition()[1];
			limits[0] = this.parent.getAbsoluteSize()[0];
			limits[1] = this.parent.getAbsoluteSize()[1];
		}

		return $multi(
			math.floor(
				origin[0] +
					this.position.X.Offset +
					limits[0] * this.position.X.Scale
			),
			math.floor(
				origin[1] +
					this.position.Y.Offset +
					limits[1] * this.position.Y.Scale
			)
		);
	}

	onDraw(): void {
		if (!this.visible) return;
	}
}
