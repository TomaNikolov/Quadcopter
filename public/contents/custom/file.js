$(document).ready(function () {
	$('#fileTreeDemo_1').fileTree({ root: './', script: '/getDirTree' }, function (file) {
		console.log(file);
	}, function (dir) {
		$('#file-view').fileView({ root: dir, script: '/getFiles' })
	});

	$('#file-view').fileView({ root: './', script: '/getFiles' }, function (file) {
		console.log(file);
	}, function (dir) {
		console.log(dir)
	});

});