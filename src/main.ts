import { colorFromBytes, RGB } from "love.math";
import { Signal } from "./libraries/signal";
import { UDim2 } from "./libraries/ui-ts/data";

love.load = () => {
  const [content] = love.filesystem.read("res/index.txt");
  print(content);
};

love.update = (dt: number) => {
  
};

love.draw = () => {
  love.graphics.print(`FPS: ${love.timer.getFPS()}`);
};
