'use strict';

import TagsApi = require('api/tagsApi');
import { Dispatcher } from 'services/dispatcher';

function imagesLoaded() {
  TagsApi.getTesselationTags().forEach((tag:any) => {
    let imageCount = 0;
    
    tag.addEventListener('load', function(event) {
      if (event.target.tagName === 'IMG') {
        imageCount++;
        if (imageCount === tag.children.length) {
          Dispatcher.dispatch({
            actionType: 'imagesLoaded',
            tag: tag
          })
        }
      }
    }, true);
  });
}

export = imagesLoaded;