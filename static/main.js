$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/tasks",
    success: function(res){
      
      for (var i = 0; i < res.length; i++) {
        var aux = "<tr><td class='taskId'>"+ res[i].id+"</td><td class='taskDescription'>"+res[i].Description+"</td><td>"+ res[i].Status +"</td><td><i data-class="+ res[i].Description + " data-id="+ res[i].id +" class='edit fa fa-pencil' aria-hidden='true'></i><i data-class=" + res[i].id + " class='trash fa fa-trash' aria-hidden='true'></i></td></tr>";
        $("tbody").append(aux);
      };

      $(".trash").click(function(){ //Delete Elementz
        var id = $(this).data("class");

        $.ajax({
          method: "GET",
          url:"/delete/"+id,
          success: function(res){
            location.reload();
          }
        });
      });

    $(".edit").click(function(){
      var descriptionValue = $(this).data("class");
      var id = $(this).data("id");

      $("#input").val(descriptionValue);
      $("#inputId").val(id);
    });

  }
  });
});

$("#send").click(function(){
  $.ajax({
    method: "POST",
    url: "/save",
    data: $("#form").serialize(),
    success: function(res){
      location.reload();
    }
  });
});
