angular.module('app').service 'entityService', ['$log', '$q', '$resource', ($log, $q, $resource) ->
	self = @

	Repo = $resource 'http://localhost:9999/api/:entity/coentities',
		callback: 'JSON_CALLBACK',
			get:
				method: 'JSONP'

	get = (criteria) ->
		defer = $q.defer()

		Repo.get entity: criteria, (results) ->
			defer.resolve results.data
		, (results) ->
			$log.error 'entityService error', results
			defer.reject results

		defer.promise

	self.get = get
]
