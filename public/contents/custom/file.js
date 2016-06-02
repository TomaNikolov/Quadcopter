$(document).ready(function () {
	$('#fileTreeDemo_1').fileTree({ root: './../../public/', script: '/getDirList' }, function (file) {
		console.log(file);
	}, function (dir) {
		$('#file-view').fileView({ root: dir, script: '/getFiles' })
	});

	$('#file-view').fileView({ root: './../../public/', script: '/getFiles' }, function (file) {
		console.log(file);
	}, function (dir) {
		console.log(dir)
	});

});