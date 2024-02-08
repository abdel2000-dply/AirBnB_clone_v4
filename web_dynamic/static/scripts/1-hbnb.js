$(() => {
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
