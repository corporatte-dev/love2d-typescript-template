import { newFont, setColor } from 'love.graphics';
import { UIButton } from './libraries/ui/button';
import { UDim2 } from './libraries/ui/data';
import { UIText } from './libraries/ui/text';

const button = new UIButton();
const text = new UIText();

love.load = () => {
	const [content] = love.filesystem.read('res/index.txt');
	print(content);

	button.size = UDim2.fromScale(0.25, 0.25);
	button.position = UDim2.fromOffset(150, 150);
	button.backgroundTransparency = 0;
	button.backgroundColor = [0.5, 0.5, 1];

	text.size = UDim2.fromScale(1, 1);
	text.text = 'Button Text';
	text.backgroundTransparency = 1;
	text.textAlignment = 'right';
	text.textColor = [0, 0, 0];
	text.parent = button;

	button.mouseHover.connect(onMouseHover);
	button.mouseLeave.connect(onMouseLeave);

	function onMouseHover(button: UIButton) {
		text.textSize = 20;
	}

	function onMouseLeave(button: UIButton) {
		text.textSize = 14;
	}
};

love.update = (dt: number) => {};

love.draw = () => {
	button.onDraw();
	text.onDraw();

	// For Debug UI
	setColor(1, 1, 1);
	love.graphics.setFont(newFont());
	love.graphics.print(`FPS: ${love.timer.getFPS()}`);
};
