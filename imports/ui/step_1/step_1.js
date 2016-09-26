import './step_1.html';
import './step_1.css';

Template.step_1.onRendered(function() {
	Session.set('stepNumber', '1');
	
	var stepBarUrl = window.location.protocol + '//' + window.location.hostname + ':' + 
					window.location.port + '/' + Meteor.settings.public.domainSuffix + '/images/step_1.jpg';
	
	$('#tabs-main-img').attr('src', stepBarUrl);
	
	$('#js-previous').attr('style', 'pointer-events:auto;color:#ffffff !important;');
	$('#js-previous-icon').attr('style', 'color:#ffffff !important;');
	
	$('#js-next').attr('style', 'pointer-events:auto;color:#ffffff !important;');
	$('#js-next-icon').attr('style', 'color:#ffffff !important;');
	
	HTTP.get("http://148.251.183.26/handvat-admin/text/json", {
		headers: {
			'Content-Type' : 'application/json; charset=UTF-8'
		}
	}, function(err, result) {
		Meteor.call('getText', result.content, Meteor.settings.public.step1Text, function(err, result) {
			if(typeof result !== 'undefined') {
				$('#text-container-1').append(result.content);
			}
		});
		
		Meteor.call('getText', result.content, Meteor.settings.public.step1Image, function(err, result) {
			if(typeof result !== 'undefined') {
				$('#viewer-container-1').append(result.content);
			}
		});
	});
});