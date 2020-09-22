$(document).ready(function() {

  // e809f4ea095436f35151e7d0e1a01040
  // Handlebars
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  var context = {
    title: "My New Post",
    body: "This is my first post!"
  };
  var html = template(context);
  $("#lista-film").append(html);
});
