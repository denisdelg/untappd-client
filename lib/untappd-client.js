'use strict';

const request = require('requestify');
const _ = require('lodash');

const apiEndpoint = 'https://api.untappd.com/v4';

class UntappdClient {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  getAuthenticationParams() {
    return {
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
    };
  }

  getUserInfo(username = '') {
    const endpoint = `${apiEndpoint}/user/info/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getUserWishlist(username = '') {
    const endpoint = `${apiEndpoint}/user/wishlist/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getUserFriends(username = '') {
    const endpoint = `${apiEndpoint}/user/friends/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getUserBadges(username = '') {
    const endpoint = `${apiEndpoint}/user/badges/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getUserBeers(username = '') {
    const endpoint = `${apiEndpoint}/user/beers/${username}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }

  getBreweryInfo(breweryId = 0) {
    const endpoint = `${apiEndpoint}/user/brewery/${breweryId}`;

    return request.get(endpoint, this.getAuthenticationParams());
  }
}

module.exports = UntappdClient;
