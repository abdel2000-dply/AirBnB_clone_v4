$(() => {
  const placeURL = 'http://127.0.0.1:5001/api/v1/places_search/';
  $.ajax({
    url: placeURL,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(data) {
      for (const place of data) {
        const template = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
	          <div class="max_guest">${place.max_guest} Guest</div>
            <div class="number_rooms">${place.number_rooms} Bedroom</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
	        </div>
          <div class="description">${place.description}</div>
          </article>`;
        $('.places').append(template);
      }
    }
  });

  const statusUrl = 'http://127.0.0.1:5001/api/v1/status/';
  $.getJSON(statusUrl, (data) => {
    console.log(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });
  const amenity_ids = []
  $('.popover ul li input').change(function() {
    let id = $(this).attr('data-id');
    if (this.checked) {
      amenity_ids.push(id);
    }
    else {
      const idx = amenity_ids.indexOf(id)
      amenity_ids.splice(idx, 1)
    }
    const amenity_names = amenity_ids.map((id) => {
      return $(`.popover ul li input[data-id=${id}]`).attr('data-name');
    });
    $('.amenities h4').text(amenity_names.join(', '));
  });
});
  