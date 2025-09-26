import { setColor } from 'love.graphics';
import { Fonts } from './types/constants';

const version = love.getVersion();

love.load = () => {
	// For pixel graphics to no longer be blurry
	love.graphics.setDefaultFilter('nearest', 'nearest');
};

love.update = (dt: number) => {};

love.draw = () => {
	// For Debug UI
	setColor(1, 1, 1);
	love.graphics.setFont(Fonts.Debug);
	love.graphics.print(`FPS: ${love.timer.getFPS()}`, 5, 5);
};
