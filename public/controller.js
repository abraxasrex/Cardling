var Cardling = angular.module('cardLing', []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.submitText = "Add card";
  $scope.formData.edit = null;

///helper func declarations
  function initCards(){
     if(!!$scope.cards) {
       $scope.cards.forEach( function(card) {
        if(!card.text) {
          card.text = card.translation;
        }
       });
     }
  }

  $http.get('/api/cards').success(function(data) {
    $scope.cards = data;
    initCards();
  }).error(function(data) {
    console.log('Get Error: ' + data);
  });

  $scope.submitCard = function() {
    $http.post('/api/cards', $scope.formData).success(function(data) {
      $scope.formData = {};
      $scope.cards = data;
      initCards();
    //  console.log('card ', data);
    }).error(function(data) {
      console.log('Create Error: ' + data);
    });
  };

  $scope.deleteCard = function(id) {
    $http.delete('/api/cards/' + id).success(function(data) {
      $scope.cards = data;
      initCards();
    }).error(function(data) {
      console.log('Delete Error: ' + data);
    });
  };

  $scope.editCard = function(card) {
    if($scope.formData.edit === null) {
      console.log('card to edit is ', card)
      $scope.formData.original = card.original
      $scope.formData.translated = card.translated;
      $scope.formData.src = card.src;
      $scope.formData.set = card.set;
      $scope.formData.edit = card._id;
      $scope.submitText = "Edit card"
    }
   else {
     $scope.formData.edit = null;
     $scope.submitText = "Add card";
     $scope.formData.original = "";
     $scope.formData.translated = "";
     $scope.formData.set = card.set;
     $scope.formData.src = "";
   }
   initCards();
 };

// below here: separate into UX controller

function toggleForm(){

}

  $scope.flip = function(card, id) {
    var flipper = document.getElementsByClassName(id)[0];
  if(flipper.classList.contains('back-flip')) {
    flipper.classList.remove('back-flip');
    flipper.classList.add('front-flip');
  }
  else if(flipper.classList.contains('front-flip')) {
    flipper.classList.remove('front-flip');
      flipper.classList.add('back-flip');
  } else {
 flipper.classList.add('front-flip');
  }
    if(card.text === card.original) {
      card.text = card.translated;
    } else {
      card.text = card.original;
    }
  };

  $scope.langChoices = [];
  $scope.eng = 'English       (English)';

  $http.get('languages.json').success(function(languages) {
    for (item in languages.lang) {
      $scope.langChoices.push(languages.lang[item][0]);
    }
  }).error( function(err) {
    console.log('getting lang json err: ', err);
  });
};

// Cardling.directive('backImg', function(){
//     return function(scope, element, attrs){
//         attrs.$observe('backImg', function(value) {
//             element.css({
//                 'background-image': 'url(' + value +')',
//                 'background-size' : 'cover'
//             });
//         });
//     };
// });
