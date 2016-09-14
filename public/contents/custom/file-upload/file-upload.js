$(document).ready(function() {
    $("#fileuploader").uploadFile({
        url:"/api/upload",
        fileName:"myfile"
    });
});