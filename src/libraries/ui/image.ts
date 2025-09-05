import { UIFrame } from './frame';
import { UIBase } from './interface';

export class UIImage extends UIFrame {
	public imagePath: string;

	constructor(parent?: UIBase) {
		super(parent);
		this.imagePath = '';
	}

	onDraw(): void {
		const [posX, posY] = this.getAbsolutePosition();
		const [sizeX, sizeY] = this.getAbsoluteSize();

		if (this.imagePath !== '') {
			const img = love.graphics.newImage(this.imagePath);
			love.graphics.draw(img, posX, posY, 0, 1, 1, 0, 0, sizeX, sizeY);
		}

		super.onDraw();
	}
}
