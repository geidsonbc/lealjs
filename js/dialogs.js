// Dialogs
$(function() {
	$('body').append($('<div>', { 'class': 'dialog-overlay', 'hidden': true }));
	$.dialog = new function() {
		this.height = $(window).height();
		this.width = $(window).width();

		// Waiting
		this.waiting = function(m) {
			html = '<div class="dialog z-depth-1 dialog-waiting" hidden>' +
				'<div class="dialog-body text-center">' + m + '</div>' +
				'</div>';
			this.open(html);
		};

		// Confirm
		// Run a function
		this.confirm = function(title, message, confirm, cancel) {
			var data = { confirm: {}, cancel: {} };
			data.title = title;
			data.message = message;
			data.confirm.event = confirm || "";
			data.cancel.event = cancel || "";
			data.cancel.label = "CANCELAR";
			data.confirm.label = "OK";
			if (typeof title == "object") {
				data = $.extend(true, data, title);
			}
			html = '<div class="dialog z-depth-1" hidden>' +
				'<div class="dialog-header">' + data.title + '</div>' +
				'<div class="dialog-body">' + data.message + '</div>' +
				'<div class="dialog-footer">' +
				'<button class="btn-flat dialog-cancel waves-effect">' + data.cancel.label + '</button>' +
				'<button class="btn-flat dialog-ok waves-effect">' + data.confirm.label + '</button>' +
				'</div>' +
				'</div>';
			this.open(html);

			$(".dialog-cancel").on("click", function() {
				if (typeof data.cancel.event == 'function') data.cancel.event();
				$.dialog.close();
			});

			$(".dialog-ok").on("click", function() {
				if (typeof data.confirm.event == 'function') data.confirm.event();
				$.dialog.close();
			});
			$(".dialog-ok").focus()
		};

		this.prompt = function(obj) {
		      var dial = {
		        'title': "",
		        'message': "",
		        'label': "",
		        'inputName': "input-dialog",
		        'regex': "",
		        'callbackMessage': "Campo obrigatório",
		        'success': function() {}
		      }

		      $.extend(dial, obj);
		      html = '<div class="dialog z-depth-1" hidden>\
										<div class="dialog-header">' + dial.title + '</div>\
										<div class="dialog-body">' + dial.message + '\
											<br>\
											<div class="form-group">\
												<label class="control-label">' + dial.label + '</label>\
												<input	class="' + dial.inputName + '" name="' + dial.inputName + '" type="text" regex="'+ dial.regex +'"></form-group>\
												<div class="callback">'+ dial.callbackMessage +'</div>\
											</div>\
										</div>\
										<div class="dialog-footer">\
											<button class="btn-flat dialog-cancel waves-effect">CANCELAR</button>\
											<button class="btn-flat dialog-ok waves-effect">OK</button>\
										</div>\
									</div>';
		      this.open(html);

		      $(".dialog").find("[name='"+ dial.inputName +"']").focus();

		      $(".dialog-cancel").on("click", function() {
		        $.dialog.close();
		      });

		      $(".dialog-ok").on("click", function() {
		        if (typeof func == "function") dial.success();
		        $.dialog.close();
		      });

		    };

		// Info
		this.info = function(title, m) {
			html = '<div class="dialog z-depth-1">' +
				'<div class="dialog-header">' + title + '</div>' +
				'<div class="dialog-body">' + m + '</div>' +
				'<div class="dialog-footer">' +
				'<button class="btn-flat btn-block dialog-cancel waves-effect">FECHAR</button>' +
				'</div>' +
				'</div>';
			this.open(html);
			$(".dialog-cancel").on("tapstart, click", function() {
				$.dialog.close();
			});
			$(".dialog-cancel").focus();
		};

		// Add dialog at the end of Body
		this.open = function(html) {
			$("body").append("<div class='dialog-overlay'></div>");
			$("body").append(html);
			// console.log([winH, winW]);

			if ($(window).width() <= 480) {
				$(".dialog").width($(window).width() - 40);
			}
			// console.log([$(".dialog").height(), $(".dialog").width()]);

			var boxH = $(".dialog").height();
			var boxW = $(".dialog").width();

			$(".dialog").css({
				top: $(window).height() / 2 - boxH / 2,
				left: $(window).width() / 2 - boxW / 2
			}).show(0);

			$(document).keyup(function(e) {
				if (e.keyCode == 27 && $(".dialog").length && !$(".dialog-waiting").length)
					$.dialog.close();
			});
		};

		this.close = function() {
			$(".dialog-overlay").remove();
			$(".dialog").remove();
		};
	};

});
