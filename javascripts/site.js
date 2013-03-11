
$().ready(function() {
   /*
   function doSearch() {
      run_search(function doit() {
         console.log(arguments);
      });
   };
    */
   var $search_box = $('#searchbox');
   $search_box.change(function() {
      $.getJSON('/search.json')
         .success(function(data) {
            var text = $search_box.val();
            console.log(data);
            console.log(text in data.words);
         });
   });

});
