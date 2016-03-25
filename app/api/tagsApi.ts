'use strict';

const TESSELATION_TAG = 'tesselation';

function getTesselationTags() {
  return Array.prototype.slice.call(document.getElementsByTagName('*')).filter(function (element) {
    return element.tagName.toLowerCase().indexOf(TESSELATION_TAG) > -1;
  });
}

export function mountTags() {
  getTesselationTags().forEach((tag: any) => {
    var yieldElement = document.createElement('yield');
    yieldElement.setAttribute('to','grid');
    let tagInnerContent = tag.innerHTML;
    yieldElement.innerHTML = tagInnerContent;
    tag.innerHTML = yieldElement.outerHTML;
	  riot.mount(tag);
  })
}