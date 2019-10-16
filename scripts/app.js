var app = angular.module('myApp',[]);
app.config(function($interpolateProvider) {

  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');

});
app.constant('SHEMA',[
			{ "desc": "sheen", "farsi": "\u0634", "latin": ["a"]},
			{ "desc": "waaw with hamza", "farsi": "\u0624", "latin": ["A"]},
			{ "desc": "zaal", "farsi": "\u0630", "latin": ["b", "B"]},
			{ "desc": "zeh", "farsi": "\u0632", "latin": ["c"]},
			{ "desc": "jeh", "farsi": "\u0698", "latin": ["C"]},
			{ "desc": "yeh", "farsi": "\u06cc", "latin": ["d"]},
			{ "desc": "theh", "farsi": "\u062b", "latin": ["e"]},
			{ "desc": "beh", "farsi": "\u0628", "latin": ["f"]},
			{ "desc": "laam", "farsi": "\u0644", "latin": ["g"]},
			{ "desc": "alef with hamza", "farsi": "\u0623", "latin": ["G"]},
			{ "desc": "alef", "farsi": "\u0627", "latin": ["h"]},
			{ "desc": "alef with madd", "farsi": "\u0622", "latin": ["H"]},
			{ "desc": "heh", "farsi": "\u0647", "latin": ["i"]},
			{ "desc": "teh", "farsi": "\u062A", "latin": ["j"]},
			{ "desc": "noon", "farsi": "\u0646", "latin": ["k"]},
			{ "desc": "meem", "farsi": "\u0645", "latin": ["l"]},
			{ "desc": "peh", "farsi": "\u067E", "latin": ["m"]},
			{ "desc": "daal", "farsi": "\u062F", "latin": ["n"]},
			{ "desc": "kheh", "farsi": "\u062E", "latin": ["o"]},
			{ "desc": "heh", "farsi": "\u062D", "latin": ["p"]},
			{ "desc": "zaad", "farsi": "\u0636", "latin": ["q"]},
			{ "desc": "qaaf", "farsi": "\u0642", "latin": ["r"]},
			{ "desc": "seen", "farsi": "\u0633", "latin": ["s"]},
			{ "desc": "yeh with hamza", "farsi": "\u0626", "latin": ["S"]},
			{ "desc": "feh", "farsi": "\u0641", "latin": ["t"]},
			{ "desc": "ain", "farsi": "\u0639", "latin": ["u"]},
			{ "desc": "reh", "farsi": "\u0631", "latin": ["v"]},
			{ "desc": "saad", "farsi": "\u0635", "latin": ["w"]},
			{ "desc": "taah", "farsi": "\u0637", "latin": ["x"]},
			{ "desc": "ghain", "farsi": "\u063A", "latin": ["y"]},
			{ "desc": "zaah", "farsi": "\u0638", "latin": ["z"]},
			{ "desc": "kaaf","farsi": "\u06A9", "latin": [";"]},
			{ "desc": "gaaf","farsi": "\u06AF", "latin": ["'"]},
			{ "desc": "waaw","farsi": "\u0648", "latin": [","]},
			{ "desc": "jeem","farsi": "\u062C", "latin": ["\\["]},
			{ "desc": "chej","farsi": "\u0686", "latin": ["\\]"]},

			{ "desc": "zero", "farsi": "\u06F0", "latin": ["0"]},
			{ "desc": "one", "farsi": "\u06F1", "latin": ["1"]},
			{ "desc": "two", "farsi": "\u06F2", "latin": ["2"]},
			{ "desc": "thre", "farsi": "\u06F3", "latin": ["3"]},
			{ "desc": "four", "farsi": "\u06F4", "latin": ["4"]},
			{ "desc": "five", "farsi": "\u06F5", "latin": ["5"]},
			{ "desc": "six", "farsi": "\u06F6", "latin": ["6"]},
			{ "desc": "seven", "farsi": "\u06F7", "latin": ["7"]},
			{ "desc": "eight", "farsi": "\u06F8", "latin": ["8"]},
			{ "desc": "nine", "farsi": "\u06F9", "latin": ["9"]},

			{ "desc": "comma", "farsi": "\u060C", "latin": ["T"]},
			{ "desc": "semicolon", "farsi": "\u061B", "latin": ["Y"]},
			{ "desc": "question mark", "farsi": "\u061F", "latin": ["\\?"]},
			{ "desc": "keshida", "farsi": "\u0640", "latin": ["J"]},
]);
/* Makes main textarea to be always in focus */
app.directive('autoFocus',[ function() {
    return {
        restrict: 'A',
        scope: {
            value: "=autoFocus"
        },
        link: function($scope, $element, attrs) {
            $scope.$watch("value", function(currentValue, previousValue) {
                $element[0].focus();
            })
        }
    }
}])

app.controller('FarsiKeyCtrl',["$scope","SHEMA",function($scope,SHEMA) {
	$scope.text = "";
	$scope.shema = SHEMA;
	$scope.conversionOn = true;
	
	$scope.translate = function(letter){
		$scope.text += letter;
		$scope.autoFocus = ! $scope.autoFocus;
	}
	
	$scope.convert = function(text){

		if($scope.conversionOn){
		
			var txt = text || $scope.text;
				angular.forEach($scope.shema, function(obj, k){
					angular.forEach(obj.latin, function(c, kk){
						
						var re = new RegExp(c);
						txt = txt.replace(re,obj.farsi);
					});
				});
			
			
			//$scope.text = txt; 


			if(text === undefined)
				$scope.text = txt;
			else
				return txt;
			
		}
	}

	

	$scope.transform = function(){
		
				angular.forEach($scope.shema, function(obj, k){
					angular.forEach(obj.latin, function(c, kk){

						if(c.length >= 2){
							var result = $scope.convert(c);
							obj.latin.push(result);
							//console.log(angular.toJson(obj.latin));
						}
					});
				});
		
	}
	$scope.transform();



	
}]);


