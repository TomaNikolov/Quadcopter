$(document).ready(function () {
	$('#fileTreeDemo_1').fileTree({ root: './', script: '/api/getDirTree' }, function (file) {
		console.log(file);
	}, function (dir) {
		$('#file-view').fileView({ root: dir, script: '/api/getFiles' })
	});

	$('#file-view').fileView({ root: './', script: '/api/getFiles' }, function (file) {
		console.log(file);
	}, function (dir) {
		console.log(dir)
	});

});