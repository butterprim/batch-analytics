import { Injectable } from '@angular/core';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AnalyticsService {

  constructor() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  }

  get trackedData() {
    const parser = new UAParser();
    parser.setUA(navigator.userAgent);
    const browserData = parser.getResult();
    return {
      browser: browserData.browser,
      os: browserData.os,
      device: browserData.device,
      referrerUrl: document.referrer,
      absUrl: window.location.href,
    };
  }

  track(eventName: string, properties: {[key: string]: any} = {}) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.active.postMessage({type: 'event-track', eventName, trackedData: this.trackedData, properties});
      }).catch((e) => {
        console.log(e);
        this.instantTrack(eventName);
      });
    } else {
      this.instantTrack(eventName);
    }
  }

  private instantTrack(eventName: string) {
    console.log(`instant track ${eventName} thru http call`);
  }
}
