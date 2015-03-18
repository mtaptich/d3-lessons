var app = angular.module('lessonapp', []);

app.controller('main', ['$scope', function($scope) {
	$scope.lc = 0;
	$scope.addlivecode = function(){
		$scope.lc+=1;
	}

}]);

// Add word emphasis
app.directive('evt', function() {
  function link(scope, el, attr) {
    var label = attr.label
    var bg = attr.bg
    scope.labelstyle = { backgroundColor: bg }
    scope.label = attr.label
  }
  return {
    link: link,
    scope: {},
    restrict: 'E',
    template: function(elem, attr){
        return '<div ng-style="labelstyle">{{label}}</div>'
    }
  }
})

// Add live coding environment
app.directive('liveCode', function($timeout){
	// Runs during compile
	function link(scope, el, attr,controller, transcludeFn) {
		scope.addlivecode()
		scope.mid = "fig"+scope.lc;
		scope.frameid = "win"+scope.lc;
		scope.height = attr.h || 420;
		scope.content= transcludeFn()[0].textContent;
		scope.colwidth = attr.wincol || 4;
		var delay;

		$timeout(function () {
			var editor = CodeMirror.fromTextArea(document.getElementById(scope.mid), {
				lineNumbers: true,
				mode: 'text/html'
			});

			editor.setSize(el[0].children[0].children[0].children[1].offsetWidth-25,scope.height)

			editor.on("change", function() {
				clearTimeout(delay);
				delay = setTimeout(updatePreview, 300);
			});

			function updatePreview() {
				var previewFrame = document.getElementById(scope.frameid);
				var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
				preview.open();
				preview.write(editor.getValue());
				preview.close();
			}
			setTimeout(updatePreview, 300);		
		})		
	}
	return {
		transclude: true,
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		scope: true,
		templateUrl: function(elem, attrs){
			var scope = angular.element(elem).scope();
			if (attrs.base == undefined){
    			return  '../src/livecode.html'
    		} else{
    			return  'src/livecode.html'
    		}
    	},
		link: link
	};
});




