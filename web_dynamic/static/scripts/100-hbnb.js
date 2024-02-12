$(() => {
  const placeURL = 'http://127.0.0.1:5001/api/v1/places_search/';
  function getPlaces(amenities = {}) {
    $.ajax({
      url: placeURL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(amenities),
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
  }

  getPlaces();

  const statusUrl = 'http://127.0.0.1:5001/api/v1/status/';
  $.getJSON(statusUrl, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });

  const filters = {states: [], cities: [], amenities: []}
  $('.popover ul li input').change(function() {
    const id = $(this).attr('data-id');
    const curr_input = $(this).attr('id');
    if (this.checked) {
      filters[curr_input].push(id);
    }
    else {
      const idx = filters[curr_input].indexOf(id)
      filters[curr_input].splice(idx, 1)
    }
    switch (curr_input) {
      case 'states':
        const state_names = filters[curr_input].map((id) => {
          return $(`.popover ul li input[data-id=${id}]`).attr('data-name');
        });
        $('.locations h4').text(state_names.join(', '));
        break;
        
        case 'cities':
          const city_names = filters[curr_input].map((id) => {
            return $(`.popover ul li input[data-id=${id}]`).attr('data-name');
          });
        $('.locations h4').text(city_names.join(', '));
        break;

      case 'amenities':
        const amenity_names = filters[curr_input].map((id) => {
          return $(`.popover ul li input[data-id=${id}]`).attr('data-name');
        });
        $('.amenities h4').text(amenity_names.join(', '));
        break;

      default:
        break;
    }
  });

  $('button').click(() => {
    $('.places').empty();
    getPlaces(filters);
  });
});
  