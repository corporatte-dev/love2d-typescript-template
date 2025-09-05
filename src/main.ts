import { newFont, setColor } from 'love.graphics';
import { Workspace } from './systems/workspace';

const workspace = new Workspace();

love.load = () => {
	workspace.onLoad();

	const [content] = love.filesystem.read('res/index.txt');
	print(content);
};

love.update = (dt: number) => {
	workspace.onUpdate(dt);
};

love.draw = () => {
	// For Debug UI
	setColor(1, 1, 1);
	love.graphics.setFont(newFont());
	love.graphics.print(`FPS: ${love.timer.getFPS()}`);
};
