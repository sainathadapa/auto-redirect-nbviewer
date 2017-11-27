chrome.webRequest.onBeforeRequest.addListener(
  function(details) {

    var url_root = 'https://nbviewer.ipython.org/';
    var url = null;

    var github_re = /^https:\/\/(github\.com\/.*\/)blob\/(.*\.ipynb)$/;
    var gitlab_re = /^https:\/\/(gitlab\.com\/.*\/)blob\/(.*\.ipynb)$/;

    var loc = details.url;
    var path;

    if (github_re.test(loc)) {
      path = github_re.exec(loc);
      url = url_root + 'urls/raw.' + path[1] + path[2];
    } else if (gitlab_re.test(loc)) {
      path = gitlab_re.exec(loc);
      url = url_root + 'urls/' + path[1] + 'raw/' + path[2];
    }

    if (url) {
      return {redirectUrl: url};
    }
  },
  {
    urls: [
      "*://github.com/*",
      "*://www.github.com/*",
      "*://gitlab.com/*",
      "*://www.gitlab.com/*"
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);

