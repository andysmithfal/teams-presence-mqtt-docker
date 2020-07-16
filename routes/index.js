// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <IndexRouterSnippet>
var express = require('express');
var tokens = require('../tokens.js');

var router = express.Router();

globalToken = {}

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (req.isAuthenticated()) {
  console.log("authenticated")
  var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
        // console.log("Access token: "+accessToken)
        // console.log(req.user)
      } catch (err) {
        console.log(`Error: ${err}`)
        // req.flash('error_msg', {
        //   message: 'Could not get access token. Try signing out and signing in again.',
        //   debug: JSON.stringify(err)
        // });
      }
  }

  if(!accessToken) accessToken = "NO_ACCESS_TOKEN"

  let params = {
    active: { home: true }, token: accessToken
  };

  

  res.render('index', params);
});

router.get('/postlogin', async function(req, res, next) {
  if (req.isAuthenticated()) {
  console.log("authenticated")
  var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
        // console.log("Access token: "+accessToken)
        // console.log(req.user)
      } catch (err) {
        console.log(`Error: ${err}`)
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err)
        });
      }
  }

  if(!accessToken) accessToken = "NO_ACCESS_TOKEN"

  let params = {
    active: { home: true }, token: accessToken
  };

  

  res.render('postsignin', params);
});

module.exports = router;
// </IndexRouterSnippet>
