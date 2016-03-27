import { Dispatcher } from 'services/dispatcher';

var CHANGE_EVENT = 'change';

interface Store {
  trigger: Function;
  on: Function;
  off: Function;
}

class TesselationStore implements Store {
  private imagesLoaded: boolean;

  private storeImagesLoaded() {
    this.imagesLoaded = true;
    this.triggerChange();
  }

  constructor() {
    riot.observable(this);
  }

  public isImagesLoaded() {
    return this.isImagesLoaded;
  }

  triggerChange() {
    this.trigger(CHANGE_EVENT);
  }

  subscribe(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  unsubscribe(callback) {
    this.off(CHANGE_EVENT, callback);
  }

  on;
  off;
  trigger;

  dispatcherIndex = Dispatcher.register((action) => {
    switch(action.actionType) {
      case 'imagesLoaded':
        this.storeImagesLoaded();
        break;
      default:
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
}

export = new TesselationStore();