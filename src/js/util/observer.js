/**
 * This module implements an observer pattern.<br>
 * It can be used to extend the functionality of a module.
 *
 * @example
 * import observer from 'util/observer';
 *
 * export default () => {
 *  let instance = {};
 *  ...
 *  ...
 *  instance = Object.assign({}, instance, observer());
 * }
 *
 * @module util/observer
 */

/**
 * There's no need to pass the instance of the parent module to this composite.
 * @static
 * @function factory
 * @returns {object} Observer instance
 */
export default () => {
  let uid = -1
  let events = {}

  /**
   * Subscribes to an Event.
   *
   * @param {string} event - Name of the event.
   * @param {function} listener - Callback function.
   * @returns {number} Returns an id for this subscription.
   */
  const on = (event, listener) => {
    uid++

    if (!events[event]) {
      events[event] = {queue: []}
    }

    events[event].queue.push({
      uid: uid,
      listener: listener
    })

    return uid
  }

  /**
   * Unsubscribes an Event.
   * If an event name is passed, all listeners to this event will be removed.
   *
   * @param {string|number} event - Can be id of subscription or event name.
   * @returns {string|number|boolean} Returns the removed id or event name.
   */
  const off = (event) => {
    if (typeof event === 'number') {
      for (let e in events) {
        if (events.hasOwnProperty(e)) {
          for (let i = events[e].queue.length; i--;) {
            if (events[e].queue[i].uid === event) {
              events[e].queue.splice(i, 1)

              if (!events[e].queue.length) {
                delete events[e]
              }

              return event
            }
          }
        }
      }
    }

    if (typeof event === 'string') {
      delete events[event]
      return event
    }

    return false
  }

  /**
   * Triggers all listeners of event.
   *
   * @param {string} event - Name of Event
   * @param {object} data - Data which will be passed to listeners. Can actually also be string, number or array. The listener should simply be able to handle the passed data.
   */
  const trigger = (event, data = {}) => {
    if (!events[event] || !events[event].queue.length) {
      return
    }

    // Cycle through topics queue, fire!
    events[event].queue.forEach(function (item) {
      item.listener(data)
    })
  }

  const getEvents = () => events

  return {
    on: on,
    off: off,
    trigger: trigger,
    _getEvents: getEvents
  }
}
