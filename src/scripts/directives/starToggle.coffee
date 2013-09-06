angular.module('app').directive 'starToggle', ['$log', '$rootScope',
  ($log, $rootScope) ->

    link = (scope, elem, attrs, controller) ->
      console.log('linking')
      scope.starred = false
      scope.toggle = () ->
        scope.starred = !scope.starred

    controller = ($scope, $element, $rootScope) ->
      console.log('controller')
      s = 1
   
    template = '''
      <div>
        <a ng-click='toggle'>
          <i ng-class="{'icon-star': starred, 'icon-star-empty': !starred}" />
        </a>
        <p>Hi!!</p>
        <div ng-transclude="ng-transclude" />
      </div>
    '''
   
    link: link
    controller: controller
    replace: true
    restrict: 'E'
    scope: true
    template: template
    transclude: true
]
