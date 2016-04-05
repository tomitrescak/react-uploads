export default class ReactiveModel {

  // fields

  private _events = {};

  // methods

  /**
   * Helper function used to create model listeners
   *
   * @protected
   * @param {string} event Name of the event
   * @param {Function} callback Event function
   */
  public on(event: string, callback: Function): void {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
  }

  /**
   * Helper function for triggering model events
   *
   * @protected
   * @param {string} event Name of the event
   * @param {...any[]} params Event parameters
   */
  protected trigger(event: string, ...params: any[]): void {
    if (!this._events[event]) {
      return;
    }
    for (let callback of this._events[event]) {
      callback(...params);
    }
  }
}
