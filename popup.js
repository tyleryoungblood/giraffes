// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, giraffes!
 *
 * @type {string}
 */
var QUERY = 'giraffe';

var giraffeGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=64e5436f8310894b2e8f5141ecf717ba&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=date-posted-desc&' +
      'per_page=20',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of giraffes. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestGiraffes: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our giraffe XHR request, generated in
   * 'requestGiraffes', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var giraffes = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < giraffes.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructGiraffeURL_(giraffes[i]);
      img.setAttribute('alt', giraffes[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlGiraffel
   *
   * @param {DOMElement} A giraffe.
   * @return {string} The giraffe's URL.
   * @private
   */
  constructGiraffeURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our giraffe generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  giraffeGenerator.requestGiraffes();
});
