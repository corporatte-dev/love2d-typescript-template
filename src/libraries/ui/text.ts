import { AlignMode, getDPIScale, newFont, setFont } from 'love.graphics';
import { RGB } from 'love.math';
import { UDim } from './data';
import { UIFrame } from './frame';
import { UIBase } from './interface';

export class UIText extends UIFrame {
	public text: string;
	public textSize: number;
	public textAlignment: AlignMode;
	public textColor: RGB;
	public textPadding: UDim;

	constructor(parent?: UIBase) {
		super(parent);
		this.text = 'Text Label';
		this.textSize = 14;
		this.textAlignment = 'center';
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

		if (this.textAlignment === 'center') {
			love.graphics.print(
				this.text,
				posX + math.floor(sizeX * 0.5) - textWidth * 0.5,
				posY + math.floor(sizeY * 0.5) - textHeight * 0.5
			);
		} else if (this.textAlignment === 'left') {
			love.graphics.print(
				this.text,
				posX + this.textPadding.Offset + this.textPadding.Scale * sizeX,
				posY + math.floor(sizeY * 0.5) - textHeight * 0.5
			);
		} else {
			love.graphics.print(
				this.text,
				posX +
					sizeX -
					(this.textPadding.Offset + this.textPadding.Scale * sizeX) -
					textWidth,
				posY + math.floor(sizeY * 0.5) - textHeight * 0.5
			);
		}
	}
}
