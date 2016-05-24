$(document).ready(function() {
	var zoekTerm;
	$('#gaHalen').click(function() {
		zoekTerm = $('#zoekTerm').val();
		haalFotos();
	});
	$('#zoekTerm').keydown(function(e) {
		if(e.keyCode == 13) {
			zoekTerm = $(this).val();
			haalFotos();
		}
	});
	
	// Link naar Flickr.com
	function haalFotos() {
		var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" +
			zoekTerm + "&jsoncallback=?"
		$.ajax (
			{
				dataType: 'json',
				method: 'GET',
				url: flickrUrl,
				success: verwerkFotos
			}
		)		
	}
	
	function verwerkFotos(data) {
		console.log(data);
		$('#fotos').html("");
		for(var i=0; i<data.items.length; i++) {
			var foto = data.items[i];
			
			// code om foto's te laten zien op pagina
			var htmlCode = "<div class='fotos'><div class='afbeelding'><a href='" + foto.link + "' target='_blanc'><img src='" + foto.media.m + "' alt='" + foto.title + "'></a></div><h4>" + foto.title + "</h4></div>";
			$('#fotos').append(htmlCode);
		}
		
		// Bronvermelding
		$('#bron a').attr("href", data.link).text(data.title + " door Flickr.com");
		
	}
})