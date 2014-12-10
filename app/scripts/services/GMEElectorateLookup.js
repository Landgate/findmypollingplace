'use strict';

module.service('GMEElectorateLookup', function($http) {
  this.run = function(lat, lng) {
    return $http.get('https://www.googleapis.com/mapsengine/v1/tables/09372590152434720789-08311873295286629979/features', {
      params: {
        limit: 1,
        select: 'gx_id,name',
        version: 'published',
        intersects: 'POINT(' + lng + ' ' + lat + ')',
        where: 'usage_code = 160',
        // key: 'AIzaSyDB3manTIJORPPJL06pKafXmO_KxPPKysE', // ?? SLIP Viewer?
        key: 'AIzaSyBwJeh9BuryySBldL5Co1A2NF74hr1zn_I' // LG Dev - Verified
      }
    });
  }
});
