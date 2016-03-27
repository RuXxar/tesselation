'use strict';

import './tags/grid/grid.tag';
import TagsApi = require('./api/tagsApi');
import imagesLoaded = require('services/imagesloaded');

document.addEventListener('DOMContentLoaded', () => {
  imagesLoaded();
  TagsApi.mountTags();
});
