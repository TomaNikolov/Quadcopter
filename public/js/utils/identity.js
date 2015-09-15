var identity = (function () {
    var USERNAME = 'userName';
    var TOKEN = 'token';

    function setUserName(userName) {
        localStorage.setItem(USERNAME, userName);
    }

    function setToken(token) {
        localStorage.setItem(TOKEN, token);
    }

    function getUserName() {
        return localStorage.getItem(USERNAME);
    }

    function getToken() {
        return localStorage.getItem(TOKEN);
    }

    function removeUserName() {
        localStorage.removeItem(USERNAME)
    }

    function removeToken() {
        localStorage.removeItem(TOKEN)
    }

    function isAuthorized() {
        return !!localStorage.getItem(TOKEN);
    }

    return {
        getToken: getToken,
        setToken: setToken,
        getUserName: getUserName,
        setUserName: setUserName,
        removeUserName: removeUserName,
        removeToken: removeToken,
        isAuthorized: isAuthorized
    }
})();
