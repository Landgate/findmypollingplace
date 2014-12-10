'use strict';

module.service('GMESchoolLookup', function($http) {
  this.run = function(lat, lng) {
    return $http.get('https://www.googleapis.com/mapsengine/v1/tables/09372590152434720789-04451421473390432748/features', {
      params: {
        limit: 1,
        orderBy: "distance",
        select: 'gx_id,SchoolName,geometry,ST_DISTANCE(geometry,ST_POINT(' + lng + ', ' + lat +')) as distance',
        version: 'published',
        where: 'ST_DISTANCE(geometry,ST_POINT(' + lng + ', ' + lat + ')) <= 10000',
        key: 'AIzaSyDB3manTIJORPPJL06pKafXmO_KxPPKysE',
      }
    });
  }
});
