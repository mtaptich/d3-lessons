var app = angular.module('lessonapp', []);

app.controller('main', ['$scope', function($scope) {
	$scope.lc = 0;
	$scope.addlivecode = function(){
		$scope.lc+=1;
	}

	$scope.onFirstBtnClickResult = "";
    $scope.secondBtnInput = "";
    $scope.onDblClickResult = "";
    $scope.onMouseDownResult = "";
    $scope.onMouseUpResult = "";
    $scope.onMouseEnterResult = "";
    $scope.onMouseLeaveResult = "";
    $scope.onMouseMoveResult = "";
    $scope.onMouseOverResult = "";

    // Utility functions

    // Accepts a MouseEvent as input and returns the x and y
    // coordinates relative to the target element.
    var getCrossBrowserElementCoords = function (mouseEvent)
    {
      var result = {
        x: 0,
        y: 0
      };

      if (!mouseEvent)
      {
        mouseEvent = window.event;
      }

      if (mouseEvent.pageX || mouseEvent.pageY)
      {
        result.x = mouseEvent.pageX;
        result.y = mouseEvent.pageY;
      }
      else if (mouseEvent.clientX || mouseEvent.clientY)
      {
        result.x = mouseEvent.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
        result.y = mouseEvent.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      if (mouseEvent.target)
      {
        var offEl = mouseEvent.target;
        var offX = 0;
        var offY = 0;

        if (typeof(offEl.offsetParent) != "undefined")
        {
          while (offEl)
          {
            offX += offEl.offsetLeft;
            offY += offEl.offsetTop;

            offEl = offEl.offsetParent;
          }
        }
        else
        {
          offX = offEl.x;
          offY = offEl.y;
        }

        result.x -= offX;
        result.y -= offY;
      }

      return result;
    };

    var getMouseEventResult = function (mouseEvent, mouseEventDesc)
    {
      var coords = getCrossBrowserElementCoords(mouseEvent);
      return mouseEventDesc + " at (" + coords.x + ", " + coords.y + ")";
    };

    // Event handlers
    $scope.onFirstBtnClick = function () {
      $scope.onFirstBtnClickResult = "CLICKED";
    };

    $scope.onSecondBtnClick = function (value) {
      $scope.onSecondBtnClickResult = "you typed '" + value + "'";
    };

    $scope.onDblClick = function () {
      $scope.onDblClickResult = "DOUBLE-CLICKED";
    };

    $scope.onMouseDown = function ($event) {
      $scope.onMouseDownResult = getMouseEventResult($event, "Mouse down");
    };

    $scope.onMouseUp = function ($event) {
      $scope.onMouseUpResult = getMouseEventResult($event, "Mouse up");
    };

    $scope.onMouseEnter = function ($event) {
      $scope.onMouseEnterResult = getMouseEventResult($event, "Mouse enter");
    };

    $scope.onMouseLeave = function ($event) {
      $scope.onMouseLeaveResult = getMouseEventResult($event, "Mouse leave");
    };

    $scope.onMouseMove = function ($event) {
      $scope.onMouseMoveResult = getMouseEventResult($event, "Mouse move");
    };

    $scope.onMouseOver = function ($event) {
      $scope.onMouseOverResult = getMouseEventResult($event, "Mouse over");
    };

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
    scope.vert = attr.vert || false;
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




