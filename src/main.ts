import { getHeight, getWidth, setColor } from 'love.graphics';
import { Fonts } from './types/constants';
import { newAnimation, newGrid } from './libraries/anim8/anim8';

const version = love.getVersion();

love.load = () => {

};

love.update = (dt: number) => {
	
};

love.draw = () => {
	// For Debug UI
	setColor(1, 1, 1);
	love.graphics.setFont(Fonts.Debug);
	love.graphics.print(`FPS: ${love.timer.getFPS()}`, 10, 10);
	love.graphics.print(`Love2D Ver. ${version[0]}.${version[1]}`, 10, 27);
};
