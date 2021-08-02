(function ($) {
 "use strict";

	$(document).ready(function() {
    $('#data-table-basic').DataTable({
      processing: true,
      responsive: true,
      language: {
          "url": "https://cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json"
      }
    });
	});

})(jQuery);
