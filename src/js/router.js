(() => {
  const routes = {},
    defaultRoute = 'home';

  routes['home'] = {
    url: '#/home',
    templateUrl: '../pages/home.html'
  };

	// routes['agency'] = {
	// 	url: '#/agency',
	// 	templateUrl: '../pages/agency.html'
	//  };

  // routes['team'] = {
  //   url: '#/team',
  //   templateUrl: '../pages/team.html'
  // };

  routes['contact'] = {
    url: '#/contact',
    templateUrl: '../pages/contact.html'
  };

  $.router
    .setData(routes)
    .setDefault(defaultRoute);

  $.when($.ready)
    .then(() => {
      $.router.run('.builder-content',
                    'home',
                    // 'team',
                    // 'agency',
                    'contact');
      // $.router.run('.tab-content','tab_2');
    })
})();
