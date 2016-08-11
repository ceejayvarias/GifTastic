var topicArray = [
	'nba',
	'michael jordan',
	'kobe bryant',
	'lebron james',
	'stephen curry',
	'phil jackson',
	'chicago bulls',
	'los angeles lakers',
	'cleveland cavaliers',
	'golden state warriors',
];


//Submit button action
$('#addTopic').on('click', function(){
	var topic = $('#topic-input').val().trim();
	if (topic == '') {
		return false;
	}
	else{
		topicArray.push(topic);
		$('#topic-input').val('');
		renderButton();
		return false;
	}
});

//creates button for entered topic
function renderButton(){
	$('#buttons').empty();
	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button>');
		b.addClass('baller');
		b.addClass('btn btn-success');
		b.addClass('col-lg-3');
		b.append(topicArray[i]);
		$('#buttons').append(b);
	}
	
}

renderButton();
$(document).ready(function(){
	$(document).on('click', '.baller', function(){
		var baller = $(this).html();
		// search API
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + baller + "&api_key=dc6zaTOxFJmzC&limit=12";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			$('#topicView').empty();
			var results = response.data;
			console.log(response);

			for (var i = 0; i < results.length; i++) {
	            var gifDiv = $('<div class="item col-lg-4">')
	            var rating = results[i].rating;
	            var p = $('<p>').text("Rating: " + rating);

	            var image = $('<img>');
	            image.addClass('giffer');
	            image.attr('src', results[i].images.fixed_height_still.url);
	            image.attr('data-still', results[i].images.fixed_height_still.url);
	            image.attr('data-animate', results[i].images.fixed_height.url);
	            image.attr('data-state', 'still');

	            gifDiv.append(p);
	            gifDiv.append(image);

	            $('#topicView').prepend(gifDiv);
	        };
		});
});
//checking for animation of of image
	$(document).on('click', '.giffer', function(event){
        // var state = $(this).attr('data-state');
        event.preventDefault();
        if($(this).attr('data-state') == 'still'){
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
            
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
	});
});