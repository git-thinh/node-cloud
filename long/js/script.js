
function alert(title, message, callBackYes) {
  var _self = this;
  if (message == null) {
    message = title;
    title = 'Thông báo';
  }
  _self.alertConfirm(title, message, callBackYes, callBackYes, true);
};
function alertConfirm(title, message, callBackYes, callbackNo, hideCancel) {
  w2popup.open({
    width: 400,
    height: 170,
    title: title,
    modal: true,
    showClose: false,
    body: '<div class="w2ui-prompt w2ui-centered" style="font-size: 13px;"><p style="margin-right: 10px;">' + message + '</p></div>',
    buttons: '<button id="Ok" class="w2ui-popup-btn w2ui-btn">Ok</button>' +
      (hideCancel == true ? '' : '<button id="Cancel" class="w2ui-popup-btn w2ui-btn">Cancel</button>'),
    onOpen: function (event) {
      // do not use onComplete as it is slower
      setTimeout(function () {
        $('#w2ui-popup .w2ui-popup-btn#Ok').on('click', function (event) {
          w2popup.close();
          if (callBackYes != null && typeof callBackYes == 'function') callBackYes();
        });
        $('#w2ui-popup .w2ui-popup-btn#Cancel').on('click', function (event) {
          w2popup.close();
          if (callbackNo != null && typeof callbackNo == 'function') callbackNo();
        });
        $('#w2ui-popup .w2ui-popup-btn#Ok');
        // set focus
        setTimeout(function () { $('#w2prompt').focus(); }, 100);
      }, 1);
    },
    onKeydown: function (event) {
      // if there are no messages
      if ($('#w2ui-popup .w2ui-message').length === 0) {
        switch (event.originalEvent.keyCode) {
          case 13: // enter
            //$('#w2ui-popup .w2ui-popup-btn#Ok').focus().addClass('clicked'); // no need fo click as enter will do click
            //w2popup.close();
            break;
          case 27: // esc
            w2popup.close();
            if (callbackNo != null && typeof callbackNo == 'function') callbackNo();
            break;
        }
      }
    }
  });
};

$(document).ready(function () {
  $('.ui.dropdown').dropdown();
  $('.sidebar-menu-toggler').on('click', function () {
    var target = $(this).data('target');
    $(target)
      .sidebar({
        dinPage: true,
        transition: 'overlay',
        mobileTransition: 'overlay'
      })
      .sidebar('toggle');
  });
  
});
