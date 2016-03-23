'use strict';

import './tags/row/row.tag';

import TagsApi = require('./api/tagsApi');

document.addEventListener('DOMContentLoaded', () => {
    console.log("mounting tags");
 TagsApi.mountTags();
});
