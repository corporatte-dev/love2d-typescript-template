/**
 * Gameloop Singleton
 * 
 * Creates and Manages the Game Rendering
 * Allows other "Renderer" singletons to be added and drawn from here
 * 
 * - corporatte 2025
 */

import { Renderer } from "../types/system";

const layerLimit = 5;

export default class GameRenderer {
    private static instance: GameRenderer;
    private systems: Renderer[] = [];

    private constructor() {}

    public static getInstance(): GameRenderer {
        if (!this.instance) {
            this.instance = new GameRenderer();
        }
        return this.instance;
    }

    load() {
        this.systems.forEach(system => {
            system.onLoad();
        });
    }

    /**
     * Adds the provided system into the list of systems that use on draw
     * @param sys System
     */
    addSystemToRenderer(sys: Renderer) {
        table.insert(this.systems, sys);
    }

    draw() {
        this.systems.forEach(system => {
            system.onDraw();
        });
    }
}
