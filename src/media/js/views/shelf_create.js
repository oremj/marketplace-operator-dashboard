define('views/shelf_create', ['apps/widget', 'fields', 'forms_local', 'l10n', 'notification', 'operators', 'user', 'utils', 'utils_local', 'urls', 'z'],
	function(apps_widget, fields, forms, l10n, notification, operators, user, utils, utils_local, urls, z) {

    var gettext = l10n.gettext;

    z.body.on('click', '#shelf-create .submit button', utils._pd(function(e) {
        var $button = $(this);
        var $form = $button.closest('form');
        $button.data('text', $button.text()).text(gettext('Creating...')).prop('disabled', true);
        $form.find('.form-errors').empty();

        forms.shelf($form).done(function(shelf) {
            z.page.trigger('navigate', [urls.reverse('shelf_edit', [shelf.slug])]);
            notification.notification({
                message: gettext('Operator shelf successfully created')
            });
        }).fail(function(error) {
            utils_local.handle_error(error);
            $button.prop('disabled', false).text($button.data('text'));
        });

    }));

    return function(builder) {
        builder.start('shelf_form.html', {
        	'current_operator': operators.get.current()
        }).done(function() {
        	fields.highlight_localized();
        });
        builder.z('type', 'shelf_form shelf_create');
        builder.z('title', gettext('New Operator Shelf'));
    };

});
