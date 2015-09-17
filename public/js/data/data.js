var data = (function () {

    /*users*/
    function login(user) {
        var url = 'api/login';
        var reqUser = {
            username: user.username,
            password: CryptoJS.SHA1(user.password).toString()
        };
        var options = {
            data: reqUser
        };

        return jsonRequester.put(url, options)
            .then(function (res) {
                var user = res.user;
                identity.setToken(user.accessToken);
                identity.setUserName(user.username);
                return user;
            });
    }

    function register(user) {
        var url = 'api/register';
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

    function setUp() {
        var url = 'api/admin'
        var options = {
            headers: {
                'x-auth-key': identity.getToken()
            }
        };

        return jsonRequester.get(url, options)
            .then(function (resp) {
                return resp;
            });
    }

    /*Video*/
    function getVideos() {
        var url = 'api/video';
        return jsonRequester.get(url)
            .then(function (resp) {
                var video = resp.videos;
                return video;
            });
    }

    /*image*/
    function getImages() {
        var url = 'api/image';
        return jsonRequester.get(url)
            .then(function (resp) {
                var images = resp.images;
                return images;
            });
    }

    return {
        user: {
            login: login,
            register: register,
            logout: logout,
            setUp: setUp
        },
        video: {
            get: getVideos
        },
        image: {
            get: getImages
        }
    };
})();
