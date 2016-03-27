'use strict';

import Utils = require('services/matrix');
import TesselationStore = require('stores/tesselationStore');

var elementMatrix = [];

export function init(tag:any) {
  function setColumns(columns) {
    let tagImages = document.querySelectorAll('tesselation-grid > *');
    let tagImagesArray = Array.prototype.slice.call(tagImages);
    for (let element of tagImagesArray) {
      element.style.width = (100 / columns) + "%";
    }
    tag.update();
  }

  function initElementDimensions(columns) {
    for(var i = 0; i < columns; i++) {
      elementMatrix[i] = [];
    }
  }

  function storeElementDimensions(columns) {
    for (var i = 0; i < tag.root.children.length; i++) {
      var elem = tag.root.children[i];
      elementMatrix[Utils.calcRowIndex(i, columns)][Utils.calcColumnIndex(i, columns)] = elem;
    }
  }

  function positionElements(tagChildren, columns) {
    if (!TesselationStore.isImagesLoaded()) {
      return;
    }
    
    for (var i = 0; i < tagChildren.length; i++) {
      let elem = tagChildren[i];
      var rowIndex = Utils.calcRowIndex(i, columns);
      var colIndex = Utils.calcColumnIndex(i, columns);
      
      if (rowIndex === 0) continue;

      let distanceToMoveElement = Utils.distanceToMoveElement(elementMatrix, rowIndex, colIndex);
      let formattedDistance = distanceToMoveElement + 'px';
      elem.style.bottom = formattedDistance;
    }
  }

  function positionElementsCallback(images, columns) {
    return function() {
      positionElements(images, columns);
    }
  }

  tag.on('mount', function () {
    setColumns(tag.opts.columns);
    initElementDimensions(tag.opts.columns);
    storeElementDimensions(tag.opts.columns);
    
    TesselationStore.subscribe(positionElementsCallback(tag.root.children, tag.opts.columns));
  });
}