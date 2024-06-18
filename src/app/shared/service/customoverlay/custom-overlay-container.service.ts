import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomOverlayContainerService extends OverlayContainer {

  override _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('cdk-overlay-container');

    const offCanvas = document.querySelector('app-pop-over .offcanvas');
    if (offCanvas) {
      offCanvas.appendChild(container);
    } else {
      document.body.appendChild(container);
    }

    this._containerElement = container;
  }
}
