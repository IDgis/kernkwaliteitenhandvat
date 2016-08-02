import './step_1.html';
import './step_1.css';

Template.step_1.onRendered(function() {
	Session.set('stepNumber', '1');
	
	HTTP.get("http://148.251.183.26/handvat-admin/text/json", {
		headers: {
			'Content-Type' : 'application/json; charset=UTF-8'
		}
	}, function(err, result) {
		Meteor.call('getTexts', result.content, 'landschapstype', function(err, result) {
			var select = $('select[id=js-temp-landschapstypen]');
			$.each(select, function(index, item) {
				item.add(document.createElement('option'));
				$.each(result, function(idx, el) {
					var option = document.createElement('option');
					option.value = el.id;
					option.innerHTML = el.name;
					item.add(option);
				});
			});
		});
	});
});

Template.step_1.events ({
	'change #js-temp-landschapstypen': function(e) {
		Session.set('landschapstypeId', e.target.value);
		Router.go('step_3');
	}
});