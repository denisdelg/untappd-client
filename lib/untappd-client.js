'use strict';

const request = require('requestify');
const _ = require('lodash');

const apiEndpoint = 'https://api.untappd.com/v4';

class UntappdClient {
  constructor(clientId, clientSecret, accessToken = '') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken;
  }

  getAuthenticationParams() {
    const authParams = {};

    if (this.accessToken) {
      _.set(authParams, 'params.access_token', this.accessToken);
    } else {
      _.set(authParams, 'params.client_id', this.clientId);
      _.set(authParams, 'params.client_secret', this.clientSecret);
    }

    return authParams;
  }

  getActivityFeed(maxId, minId, limit = 25) {
  }

  getUserActivityFeed(username = '', maxId = 0, minId = 0, limit = 25) {
    const endpoint = `${apiEndpoint}/user/checkins/${username}`;
    const queryParams = this.getAuthenticationParams();

    if (maxId > 0) {
      _.set(queryParams, 'params.max_id', maxId);
    }
    if (minId > 0) {
      _.set(queryParams, 'params.min_id', minId);
    }
    _.set(queryParams, 'params.limit', limit);

    return request.get(endpoint, queryParams);
  }

  getUserInfo(username = '', compact = false) {
    let endpoint = `${apiEndpoint}/user/info/`;
    const queryParams = this.getAuthenticationParams();

    if (!this.accessToken) {
      endpoint += `${username}`;
    }

    if (compact) {
      _.set(queryParams, 'params.compact', 'true');
    }

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getUserWishlist(username = '', offset = 0, limit = 25, sort = 'date') {
    let endpoint = `${apiEndpoint}/user/wishlist/`;
    const queryParams = this.getAuthenticationParams();

    if (!this.accessToken) {
      endpoint += `${username}`;
    }
    _.set(queryParams, 'params.offset', offset);
    _.set(queryParams, 'params.limit', limit);
    _.set(queryParams, 'params.sort', sort);

    return request.get(endpoint, queryParams);
  }

  getUserFriends(username = '', offset = 0, limit = 25) {
    let endpoint = `${apiEndpoint}/user/friends/`;
    const queryParams = this.getAuthenticationParams();

    if (!this.accessToken) {
      endpoint += `${username}`;
    }

    _.set(queryParams, 'params.offset', offset);
    _.set(queryParams, 'params.limit', limit);

    return request.get(endpoint, queryParams);
  }

  getUserBadges(username = '', offset = 0, limit = 25) {
    let endpoint = `${apiEndpoint}/user/badges/`;
    const queryParams = this.getAuthenticationParams();

    if (!this.accessToken) {
      endpoint += `${username}`;
    }

    _.set(queryParams, 'params.offset', offset);
    _.set(queryParams, 'params.limit', limit);

    return request.get(endpoint, queryParams);
  }

  getUserBeers(username = '') {
    const endpoint = `${apiEndpoint}/user/beers/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getBreweryInfo(breweryId = 0) {
    const endpoint = `${apiEndpoint}/user/brewery/${breweryId}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getBeerInfo(beerId = 0) {
    const endpoint = `${apiEndpoint}/beer/info/${beerId}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getVenueInfo(venueId = 0) {
    const endpoint = `${apiEndpoint}/venue/info/${venueId}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  beerSearch(searchString, offset = 0, limit = 25, sort = 'checkin') {
    const endpoint = `${apiEndpoint}/search/beer`;
    const queryParams = this.getAuthenticationParams();

    _.set(queryParams, 'params.q', searchString);
    _.set(queryParams, 'params.offset', offset);
    _.set(queryParams, 'params.limit', limit);
    _.set(queryParams, 'params.sort', sort);

    return request.get(endpoint, queryParams);
  }

  brewerySearch(searchString, offset = 0, limit = 25) {
    const endpoint = `${apiEndpoint}/search/brewery`;
    const queryParams = this.getAuthenticationParams();

    _.set(queryParams, 'params.q', searchString);
    _.set(queryParams, 'params.offset', offset);
    _.set(queryParams, 'params.limit', limit);

    return request.get(endpoint, queryParams);
  }
}

module.exports = UntappdClient;
