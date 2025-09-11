/**
 * Gameloop Singleton
 * 
 * Creates and Manages the Gameloop
 * Allows other "System" singletons to be added and updated from here
 * 
 * - corporatte 2025
 */

import { Signal } from "../libraries/signal";
import { System } from "../types/system";

export default class GameSystem {
    private static instance: GameSystem;
    private systems: System[] = [];
    private elapsedTime: number = 0;

    public readonly gameLoaded: Signal<[]> = new Signal();

    public static getInstance(): GameSystem {
        if (!this.instance) {
            this.instance = new GameSystem();
        }
        return this.instance;
    }

    appendSystemToUpdate(system: System) {
        table.insert(this.systems, system);
    }

    getElapsedTime(): number {
        return this.elapsedTime;
    }

    load() {
        this.systems.forEach(system => {
            system.onLoad();
        });
        this.gameLoaded.fire();
    }

    update(dt: number) {
        this.elapsedTime += dt;
        this.systems.forEach(system => {
            system.onUpdate(dt);
        })
    }
}
