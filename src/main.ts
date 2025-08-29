love.load = () => {
	const [content] = love.filesystem.read('res/index.txt');
	print(content);
};

love.update = (dt: number) => {};

love.draw = () => {
	love.graphics.print(`FPS: ${love.timer.getFPS()}`);
};
