import { setColor } from 'love.graphics';
import { Fonts } from './types/constants';
import { newAnimation, newGrid } from './libraries/anim8/anim8';

const version = love.getVersion();

const testSpritesheet = love.graphics.newImage('res/img/sprites/player.png');

const testGrid = newGrid(
	64,
	64,
	testSpritesheet.getWidth(),
	testSpritesheet.getHeight()
);

const animation = newAnimation(testGrid.getFrames(), 0.2);

love.load = () => {

};

love.update = (dt: number) => {
	animation.update(dt);
};

love.draw = () => {
	animation.draw(testGrid.getFrames()[0], 50, 50, undefined, 2, 2);

	// For Debug UI
	setColor(1, 1, 1);
	love.graphics.setFont(Fonts.Debug);
	love.graphics.print(`FPS: ${love.timer.getFPS()}`, 10, 10);
	love.graphics.print(`Love2D Ver. ${version[0]}.${version[1]}`, 10, 27);
};
