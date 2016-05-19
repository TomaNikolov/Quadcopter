module.exports = {
    getPaginate: function (currentPage, url, data, pageSize) {
        var pageCount = gatPageCount(data, pageSize);

        return {
            hasPreviousPages: hasPreviousPages(currentPage),
            hasNextPages: hasNextPages(currentPage, pageCount),
            previousPage: getPreviousPage(url, currentPage),
            nextPage: getNextPage(url, currentPage),
            pages: getPages(url, pageCount)
        }
    },

    getPageData: function (data, pageSize, curentPage) {
        var result = data.slice();
        var add = result.splice((curentPage - 1) * pageSize, pageSize)
        console.log(curentPage);
        console.log(pageSize);
        
        console.log(add)
        return add;

    }
}



function getPages(url, pageCount) {
    var result = [];

    for (var index = 0; index < pageCount; index++) {
        var currentPage = {
            number: index + 1,
            url: `${url}?page=${index + 1}`
        };

        result.push(currentPage);
    }
    
    return result;
}

function gatPageCount(data, pageSize) {
    return Math.ceil(data.length / pageSize);
}

function hasPreviousPages(curentPage) {
    return curentPage > 1;
}

function hasNextPages(curentPage, pageCount) {
    return curentPage < pageCount;
}

function getPreviousPage(url, currentPage) {
    return `${url}?page=${currentPage - 1}`;
}

function getNextPage(url, currentPage) {
    return `${url}?page=${(currentPage | 0) + 1}`;
} 