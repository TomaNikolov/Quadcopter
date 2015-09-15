var data = (function () {

    /*users*/
    function login(user) {
        var url = 'api/auth';
        var reqUser = {
            username: user.username,
            passHash: CryptoJS.SHA1(user.password).toString()
        };
        var options = {
            data: reqUser
        };

        return jsonRequester.put(url, options)
            .then(function (resp) {
                var user = resp.result;
                identity.setToken(user.authKey);
                identity.setUserName(user.username);
                return user;
            });
    }

    function register(user) {
        var url = 'api/users';
        var reqUser = {
            username: user.username,
            password: CryptoJS.SHA1(user.password).toString()
        };
        var options = {
            data: reqUser
        };

        return jsonRequester.post(url, options)
            .then(function (resp) {
              console.log(resp);
                var user = resp.result;
                return user;
            });
    }

    function logout() {
        var promise = new Promise(function (resolve, reject) {
            var userName = identity.getUserName();

            identity.removeUserName();
            identity.removeToken();
            resolve(userName);
        });
        return promise
    }

    /*cookies*/
    function getAllCookies() {
        var url = 'api/cookies';
        return jsonRequester.get(url)
            .then(function (resp) {
                var cookie = resp.result;
                return cookie
            });
    }

    function shareCookie(cookie) {
        var url = 'api/cookies';
        var options = {
            data: cookie,
            headers: {
                'x-auth-key': identity.getToken()
            }
        };
        return jsonRequester
            .post(url, options)
            .then(function (resp) {
                var cookie = resp.result;
                return cookie;
            });
    }

    function getVideos() {
        var url = 'api/video';
        return jsonRequester.get(url)
            .then(function (resp) {
                var video = resp.videos;
                return video;
            });
    }

    return {
        user: {
            login: login,
            register: register,
            logout: logout
        },
        video: {
            get: getVideos
        }
    };
})();
