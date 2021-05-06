function read_show() {
    function renderdata(doc) {
      let id = doc.id
      let name = doc.data().name
      let cover = doc.data().cover
      let show = 
  `
    <div class="gallery-pics col-lg-4 col-md-6 col-12">
        <img  class='' src="`+cover+`" alt="">
        <div class="gallery-inner">
            <a onclick=gotosingle('`+id+`')><h5>`+name+`</h5></a>
        </div>
    </div>
  `
    $('.my-gallery').append(show);
}
  
  
db.collection("projects").where("esteemed","==",false).where("showit","==",true).orderBy("name","asc").limit(6).get().then((snapshot) => {
    snapshot.docs.forEach((doc) =>{
        renderdata(doc);
        })
    showthat();
    $(".gallery-pics:nth-child(4)").waypoint({
      handler: function (direction) {
        var active = $(this);
        if (direction == "up") active = active.prev();
        $(".card-zipper").css({"animation-name": "ubhar",
                        "animation-duration": "2s",
                        "animation-iteration-count": "1",
                        "transition-timing-function": "ease-in-out",
                        "visibility":"visible"});
      },
      offset: "0%"
    });
    })
}


function showthat() {
    $(".my-gallery").hover(function(){
        $(this).append(bigger_anim);
      },async function() {
         await setTimeout( function(){$("#styler").remove();}, 680);
        $("#styler").append(fadeOut);

    });
  }

function read_esteem() {
    function renderdat(doc) {
      let id = doc.id
      let name = doc.data().name
      let cover = doc.data().cover
      let descrip = doc.data().descrip
      let show = 
  `
  <div class="card" id="`+id+`">
    <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="`+cover+`" style="width: 19.5em;height: 13em;">
    </div>
    <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">`+name+`</span>
    </div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">`+name+`<i class="material-icons close-ico right" style="position:absolute;float:right;"><div for="material-icons" class="cross"></div>
        <div class="cross"></div></i></span>
        <p>`+descrip+`</p>
        <a class="n-caps" style="margin-top: 10%;" onclick=gotosingle('`+id+`')>Go To This Project</a>
    </div>
  </div>
  `
    $('.card-area').append(show);
}
  
  
db.collection("projects").where("esteemed","==",true).orderBy("name","asc").limit(8).get().then((snapshot) => {
    snapshot.docs.forEach((doc) =>{
        renderdat(doc);
        })
    })
}
function gotosingle(id) {
  window.location = "singleproject.html?id="+id;
}
