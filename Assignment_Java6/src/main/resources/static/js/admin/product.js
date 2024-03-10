const productButton = $('.product-button');
const productTab = $('.tab-content');
const cancelBtn = $('.cancel-delete-btn');
const modalConfirm = $('#confirm');
const deleteBtn = $('.btn-delete-product');


deleteBtn.on('click', function(){
  modalConfirm.css('display', 'block');
})

cancelBtn.on('click', function(){
  modalConfirm.css('display', 'none');
})

productButton.on('click', function(e) {
  const btnTarget = e.target;
  if (btnTarget.matches('button')){
    $(this).children().removeClass('active')
    $(btnTarget).addClass('active')
  }

  productTab.removeClass('active-tab');
  $(`#${btnTarget.id}-tab`).addClass('active-tab');

})
