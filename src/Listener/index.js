import Faye from 'faye'

export default class Listener {

  constructor({ url }) {
    this.client = new Faye.Client(url);
    this.listeners = [];

    this.client.subscribe('/events', (e) => {
      const toFire = this.listeners.filter(x => {
        const { predicate } = x

        if (typeof predicate === 'string') {
          return predicate === e.type
        } else {
          return predicate(e)
        }
      });

      toFire.map((listener) => listener.actions.map(a => a(e)))
    })
  }

  when(predicate, ...actions) {
    this.listeners.push({predicate, actions})
  }

}
