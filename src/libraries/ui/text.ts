import { getDPIScale, newFont, setFont } from 'love.graphics';
import { RGB } from 'love.math';
import { UDim } from './data';
import { UIFrame } from './frame';
import { UIBase } from './interface';

export class UIText extends UIFrame {
	public text: string;
	public textSize: number;
	public textXAlignment: 'left' | 'center' | 'right';
	public textYAlignment: 'top' | 'center' | 'bottom';
	public textColor: RGB;
	public textPadding: UDim;

	constructor(parent?: UIBase) {
		super(parent);
		this.text = 'Text Label';
		this.textSize = 12;
		this.textXAlignment = 'center';
		this.textYAlignment = 'center';
		this.textColor = [255, 255, 255];
		this.textPadding = new UDim(0, 10);
	}

	onDraw(): void {
		const [posX, posY] = this.getAbsolutePosition();
		const [sizeX, sizeY] = this.getAbsoluteSize();

		love.graphics.setColor(this.textColor);

		const font = newFont(this.textSize, 'mono', getDPIScale());
		setFont(font);

		const textHeight = font.getHeight();
		const textWidth = font.getWidth(this.text);

		const goal: [number, number] = [0, 0];

		if (this.textXAlignment === 'center') {
			goal[0] = posX + math.floor(sizeX * 0.5) - textWidth * 0.5;
		} else if (this.textXAlignment === 'left') {
			goal[0] =
				posX + this.textPadding.Offset + this.textPadding.Scale * sizeX;
		} else {
			goal[0] =
				posX +
				sizeX -
				(this.textPadding.Offset + this.textPadding.Scale * sizeX) -
				textWidth;
		}

		if (this.textYAlignment == 'center') {
			goal[1] = posY + math.floor(sizeY * 0.5) - textHeight * 0.5;
		} else if (this.textYAlignment === 'top') {
			goal[1] =
				posY +
				this.textPadding.Offset +
				this.textPadding.Scale * sizeY +
				textHeight;
		} else {
			goal[1] =
				posY +
				sizeY -
				(this.textPadding.Offset + this.textPadding.Scale * sizeY) -
				textHeight;
		}

		love.graphics.print(this.text, goal[0], goal[1]);
		super.onDraw();
	}
}
