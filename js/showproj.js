var firebaseConfig = {
    apiKey: "AIzaSyD3auQ41Km3UsUmRu4zWBYv5utzsUnnmsU",
    authDomain: "jrm-f76c0.firebaseapp.com",
    databaseURL: "https://jrm-f76c0.firebaseio.com",
    projectId: "jrm-f76c0",
    storageBucket: "jrm-f76c0.appspot.com",
    messagingSenderId: "841897250102",
    appId: "1:841897250102:web:4a798b6b46070fb24c7797",
    measurementId: "G-LM7N71TR9F"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
var st_alltags = [];
db.collection("mediatags").get().then(function(querySnapshot) 
{ st_alltags = [];
querySnapshot.forEach(function(doc) 
{ 
  st_alltags.push(doc.id); }
);
navlink();
});
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}  
function navlink(){
	st_alltags.forEach(ele =>{
		let li = `<li class="sidenav-close"><a style="color:#2f3536;" onclick=sortby('`+ele.replace(/ /g,'_')+`')>`+capitalizeFirstLetter(ele)+`</a></li>`
		$("#bigapp").append(li);
		$("#smallapp").append(li);
	})

}
var tagdata = {}
function renderdata(doc) {
      let id = doc.id
      let name = doc.data().name
      let cover = doc.data().cover
      let galnum = doc.data().gallery.length
      tagdata[id] = doc.data().tags
      let show = 
  `
<div id="`+id+`" class="gallery-pics col-lg-4 col-md-6 col-12">
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
// lala
db.collection("projects").orderBy("name","asc").get().then((snapshot) => {
    snapshot.docs.forEach((doc) =>{
        renderdata(doc);
        })
    sortit();
    })

function gotosingle(id) {
    window.location = "singleproject.html?id="+id;
  }  
var sabsorted = {};
function sortit(){
	for (var key in tagdata) {
		tagdata[key].forEach(ea => {
      e = ea.replace(/ /g,'_')
			if (sabsorted[e] ==null){
				sabsorted[e]=[];
			}
			if(st_alltags.includes(ea)){
				sabsorted[e].push(key);
				}
		})
	}  
	
} 
 function sortby(sorter){
	 $('.my-gallery .gallery-pics').css("display","none");
	 $("#heading").text(sorter.toUpperCase().replace(/_/g,' '));
	 sabsorted[sorter].forEach(e =>{
	 	$("#"+e).css("display","grid");
	 })
}
function showall(){
	$("#heading").text("OUR PROJECTS");
	$('.my-gallery .gallery-pics').css("display","grid");
}