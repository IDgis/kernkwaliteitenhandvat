import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import './main.css';
import './main.html';

Template.main.onRendered(function() {
	HTTP.get("http://148.251.183.26/handvat-admin/text/json", {
		headers: {
			'Content-Type' : 'application/json; charset=UTF-8'
		}
	}, function(err, result) {
		Meteor.call('getSectors', result.content, function(err, result) {
			var ul = $('ul[id=js-sectors]');
			$.each(ul, function(index, item) {
				$.each(result, function(idx, el) {
					var li = document.createElement('li');
					li.id = "sector-" + idx;
					$('#js-sectors').append(li);
				});
				
				$.each(result, function(idx, el) {
					var a = document.createElement('a');
					a.id = el.id;
					a.innerHTML = el.name;
					$('#sector-' + idx).append(a);
				});
			});
		});
	});
});