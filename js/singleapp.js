const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
var tagdata = {};
const imgarr=[];
var histags = [];
db.collection("projects").doc(id).get().then(function(doc) {
    if (doc.exists) {
        let name = doc.data().name
        $(".cov-capt h3").text(name)
        var descrip = doc.data().descrip
        $(".cap-desc").text(descrip)
        var cover = doc.data().cover
        $(".cap-pic").attr("src",cover)
        var gallery = doc.data().gallery
        let tags = doc.data().tags;
        imgarr.push(cover);
        for (x in gallery) {
            var card =`
            <div class="card" id="cardu`+x.toString()+`">
                <div class="card-image waves-effect waves-block waves-dark">
                    <a id="zoomit"><img class="activator" src="`+gallery[x]+`"></a>
                </div>
            </div>
            `
            $(".card-area").append(card)
            imgarr.push(gallery[x]);

         }
         desc_maker(id,tags);
         $(".card-area a").click(function () {
            let index = parseInt($(this).parent().parent().attr("id").slice(-1))+1
            zumit(index)
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
function butchk(index) {
  $(".zoomer h4").text((index+1).toString()+"/"+imgarr.length.toString())
  if(index == 0){
    $("#zmprev").css("display","none")
    $("#zmnxt").css("display","block")
    $("#zmnxt").attr("onclick","slide("+(index+1).toString()+")")
  }
  else if(index == imgarr.length-1){
    $("#zmprev").attr("onclick","slide("+(index-1).toString()+")")
    $("#zmprev").css("display","block")
    $("#zmnxt").css("display","none")
  }
  else{
    $("#zmprev").attr("onclick","slide("+(index-1).toString()+")")
    $("#zmnxt").attr("onclick","slide("+(index+1).toString()+")")
    $("#zmprev").css("display","block")
    $("#zmnxt").css("display","block")
  }
}
function zumit(index){
  $(".zoomer h4").text((index+1).toString()+"/"+imgarr.length.toString())
  $(".zmed-pic").attr("src",imgarr[index])
  butchk(index);
  $(".zoomer").css("display","block")
}
  $("#card0").click(function(){var index = 0;zumit(index)})
  
function slide(index) {
  $(".zmed-pic").attr("src",imgarr[index])
  butchk(index);
} 
function zumclose(){
  $(".zoomer").css("display","none")
}
function renderdata(doc) {
      let id = doc.id
      let name = doc.data().name
      let cover = doc.data().cover
      let galnum = doc.data().gallery.length
      let show = 
  `
<div class="gallery-pics col-lg-4 col-md-6 col-12">
  <img  class='' src="`+cover+`" alt="">
  <div class="gallery-inner">
    <div class="num-photo">
      `+galnum+` photos
    </div>
    <a onclick=gotosingle('`+id+`')><h5>`+name+`</h5></a>
  </div>
</div>
  `
    $('.my-gallery').append(show);
}
function rel_app() {
  n = 7 - related.length
  if(n == 0){
    db.collection("projects").where("__name__","in",related.slice(1)).get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>{
          renderdata(doc);
          })
      })
  }
  else if (related.length < 7){
    db.collection("projects").where("__name__","not-in",related).limit(n).get().then((snapshot) => {
      snapshot.docs.forEach((doc,index,arr) =>{
          related.push(doc.id);
          if (index == arr.length -1){rel_app()}
          })
      })
  } else if(related.length > 7){
    while (related.length > 7) {
      related.pop();
      if (related.length == 7){rel_app();break;};
    }
  }

}
var related = [];
function desc_maker(idk,tags) {
  related.push(idk)
  var mediadb = db.collection("mediatags")
  tags.forEach((item,index,arr) => {
    mediadb.doc(item).get().then(function(doc)
    { try {
      ids = doc.data().ids
    } catch (error) {
      ids = null
    }
      if (ids){ids.forEach(ele => { if (!(related.includes(ele))){related.push(ele);};})}
      if (index == arr.length -1){rel_app()}
  }
    )
  })
}

// var sabsorted = {"related":[],"others":[]};
// function sortit(){
// 	for (var key in tagdata) {
// 		tagdata[key].forEach(e => {
// 			if(histags.includes(e)){
//         if (!(sabsorted["related"].includes(key))){sabsorted["related"].push(key);}
//         }
//        else {
// 				if (!(sabsorted["others"].includes(key)) && !(sabsorted["related"].includes(key))){sabsorted["others"].push(key);}
//        } 
// 		})
//   }
//   console.log(sabsorted)
// } 

//  function sortby(sorter){
// 	 $('.my-gallery .gallery-pics').css("display","none");
// 	 $("#heading").text(sorter.toUpperCase());
// 	 sabsorted[sorter].forEach(e =>{
// 	 	$("#"+e).css("display","grid");
// 	 })
// }  
function gotosingle(id) {
    window.location = "singleproject.html?id="+id;
  }