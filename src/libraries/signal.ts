
type Callback = (...args: any) => any

export class Signal<A extends unknown[]> {
	private bindings = new Map<Callback, boolean>()
	
	private remove(fn: Callback) {
		if (this.bindings.has(fn)) {
			this.bindings.delete(fn)
		}
	}

	/**
	 * Clear all connections to this signal.
	 */
	public clearAll() {
		this.bindings.forEach((_, fn) => this.remove(fn))
	}

	/**
	 * Connect a callback to the signal.
	 * @param fn Callback
	 * @returns Connection Binding
	 */
	public connect(fn: (...args: A) => void) {
		this.bindings.set(fn, false);

		return () => {
			this.remove(fn)
		}
	}

	/**
	 * Fires a callback from the signal once then disconnects.
	 * @param fn Callback
	 * @returns Connection Binding
	 */
	public once(fn: (...args: A) => void) {
		this.bindings.set(fn, true);

		return () => {
			this.remove(fn)
		}
	}

	/**
	 * Broadcasts the signal for all bindings to respond.
	 * @param args Callback Arguments
	 */
	public fire(...args: A) {
		this.bindings.forEach((v, k) => {
			if (v) this.remove(k);
			k(...args)
		})
	}

}
