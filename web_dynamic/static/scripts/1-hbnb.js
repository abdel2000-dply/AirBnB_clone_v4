$(() => {
  const amenity_ids = []
  $('.popover ul li input').change(() => {
    let id = $(this).val($(this).attr('data-id'));
    if (this.checked) {
      amenity_ids.append(id);
    }
    else {
      const idx = amenity_ids.indexOf(id)
      amenity_ids.splice(idx, 1)
    }
    amenity_ids.map((id) => {
      const name = $(`.popover input=[data-id=${id}]`).attr('data-name');
      $('.amenities h4').append(name);
    });
  });
});
