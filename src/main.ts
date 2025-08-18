import { Signal } from "./libraries/signal";

love.load = () => {
  const [content] = love.filesystem.read("res/index.txt");
  print(content);

  const started: Signal<[string, number]> = new Signal();

  //  Add a listener to this State object
  //  onStarted is the method within this State that will be called when the signal is received
  const unsub = started.connect(onStarted);

  //  Note in the above that we're hitting onStarted out of context of this class, so it won't be able to see any local properties or methods.
  //  But it can also be hit like:
  //  this.started.add(this.onStarted, this);
  //  Adding 'this' as the context for the 2nd parameter means that the onStarted method can now access anything in this class

  //  Fire the signal, passing 2 custom parameters
  started.fire('Atari', 520);
  unsub()
  started.fire('YOU SHOULDNT SEE THIS LOL', 123);

  //  This is the method that's called by the started Signal
  //  You can statically type the parameters if you wish for ease of use within this method
  //  but signal.fire() will NOT throw an error if they don't match
  function onStarted(param1: string, param2: number) {
    print(param1 + ' ' + param2);
  }
};

love.update = (dt: number) => {
  
};

love.draw = () => {
  love.graphics.print(`FPS: ${love.timer.getFPS()}`);
};
