import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Router } from 'meteor/iron:router';

import './main.css';
import './main.html';

Template.main.onRendered(function() {
	HTTP.get("http://localhost:5000/text/json", {
		headers: {
			'Content-Type' : 'application/json; charset=UTF-8'
		}
	}, function(err, result) {
		Meteor.call('getTexts', result.content, 'sector', function(err, result) {
			var ul = $('ul[id=js-sectors]');
			$.each(ul, function(index, item) {
				$.each(result, function(idx, el) {
					var li = document.createElement('li');
					li.id = "sector-" + idx;
					$('#js-sectors').append(li);
					
					var a = document.createElement('a');
					a.id = el.id;
					a.innerHTML = el.name;
					$('#sector-' + idx).append(a);
				});
			});
		});
	});
});

Template.main.helpers({
	activeStep: function(step) {
		if(Session.equals('stepNumber', step)) {
			return "active";
		}
	},
	getSectorLabel: function() {
		if(typeof Session.get('sectorLabel') === 'undefined') {
			return "geen sector geselecteerd";
		} else {
			return Session.get('sectorLabel');
		}
	}
});

Template.main.events ({
	'click #js-step-1': function () {
		Router.go('step_1');
	},
	'click #js-step-2': function () {
		Router.go('step_2');
	},
	'click #js-step-3': function () {
		Router.go('step_3');
	},
	'click #js-step-4': function () {
		Router.go('step_4');
	},
	'click #js-sectors li a': function (e) {
		Session.set('sectorLabel', e.target.textContent);
		Session.set('sectorId', e.target.id);
	}
});