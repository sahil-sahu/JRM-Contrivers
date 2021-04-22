function addit(){async function upload(file,nm,boo) {
    if (file) {
        var bool = true;
        while(bool){
          await storageRef.child("images/"+nm).getDownloadURL().then(onResolve,onReject)
          function onResolve(foundURL) {
            nm = "copy".toString()+nm;
          }
          function onReject(error){
           bool = false;
          }
        }
        var uploadTask = firebase.storage().ref('images/' + nm).put(file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on("state_changed", // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (boo) {
                $("#cc span").text(progress+'%');
            } else {
                $("#gal_c span").text(progress+'%');
            }
        }, function(error) {
            alert("something went wrong try again!");
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              if(boo){
                $(".changeit").attr("src",downloadURL);
                $(".changeit").attr("id",nm);
              }
              else{
                var img = '<img src="'+downloadURL+'" id="'+nm+'" class="gal_img" alt="">'
                $(".gallery").append(img);
              }
            });
          });
    };
}
var storageRef = firebase.storage().ref();
$("#cover").change(function() {
    var file = $("#cover")[0].files[0];
    var nm = file.name;
    upload(file,nm,true);
})

var names = [];
$('#m_img').change(function() {
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        var exfile = $(this).get(0).files[i];
        nm = exfile.name
        storageRef.child("images/"+nm).getDownloadURL().then(onResolve, onReject)
        function onResolve(foundURL) {
            nm = "copy".toString()+nm;
            storageRef.child("images/"+nm).getDownloadURL().then(onResolve, onReject)
        }
        function onReject(error){
            //pass
        }
        upload(exfile,nm,false);
    }
 });

$("body > form").submit(gotobase);
function gotobase() {
  event.preventDefault();
  var form_name = $("#Name").val()
  var form_descrip = $("#descrip").val()
  var form_cover =   $(".changeit").attr("src")
  var form_gallery = []
  var form_gallery_name = []
  form_gallery_name.push($(".changeit").attr("id"));
  var form_esteemed = document.getElementById("esteem").checked
  $(".gallery img").each(function(){
    form_gallery.push($(this).attr("src"));
    form_gallery_name.push($(this).attr("id"));
  })
  let tagss = $(".chip").text().split("close")
  tagss.pop()
  // console.log(form_gallery_name);
  db.collection("projects").add({
      name : form_name,
      descrip : form_descrip,
      cover: form_cover,
      gallery: form_gallery,
      gallery_name: form_gallery_name,
      esteemed: form_esteemed,
      showit:false,
      tags:tagss
  }).then(function(docRef) {
    console.log("db mein gaya!")
    tagsdb = db.collection("mediatags");
    let docRefr = docRef.id
    // console.log(docrefr)
    tagss.forEach((item, index, array) => {
      tagsdb.doc(item).get().then(function(doc) {
        if (doc.exists) {
            qtags(tagsdb,item,docRefr,index,array.length)
        } else {
            tagsdb.doc(item).set({tags:true}).then(function(){qtags(tagsdb,item,docRefr,index,array.length)})
            console.log(index)
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      });  
    });
}
function alldone(){
  alert("Successfully Uploaded");
  $(".chip").remove();
  $('form').trigger("reset");
  $(".changeit").attr("src","no-photo.png");
  $(".gallery").empty();
  $("#gal_c span").empty();
  $("#cc span").empty();
  re_tag();
}
function qtags(tagsdb,ele,wo_id,index,len) {
  tagsdb.doc(ele).update({
    ids: firebase.firestore.FieldValue.arrayUnion(wo_id)
  }).then(function() {
    console.log("this tag is uploaded")
    if (index == (len-1)){alldone()}
    })
}}
var storageRef = firebase.storage().ref();
function deleteit(id) {
    event.preventDefault();
    var r = confirm("Are sure want to delete it ?")
    if (r){
      var docRef = db.collection("projects").doc(id);
      docRef.get().then(function(doc) {
      if (doc.exists) {
        const deldt = doc.data().gallery_name;
        for (del in deldt){
          var desertRef = storageRef.child('images/'+deldt[del]);
          // Delete the file
          desertRef.delete().then(function() {
            // File deleted successfully
          }).catch(function(error) {
            alert("Unable to delete from storage try manually!")
          });
        };  
        db.collection("projects").doc(id).delete().then(function() {
          $(".accordion").empty();
          read();
          alert("Successfully deleted!");
        }).catch(function(error) {
          alert("Something went wrong!")
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      });
  }    
}
function read() {
  function renderdata(doc) {
    var id = doc.id
    var name = doc.data().name
    var descrip = doc.data().descrip
    var cover = doc.data().cover
    var esteemed = doc.data().esteemed
    var gallery = doc.data().gallery
    var showit = doc.data().showit
    var imgs = ''
    for (x in gallery) {
       imgs += '<img src="'+gallery[x]+'" id="gal_img" alt="">'
    }
    var show = 
`
<div class="card">
    <div class="card-header" id="headingOne">
    <p>
      <label>
      <input type="checkbox" onclick="showdesign('`+id+`')" class="form-check-input chkbut" id="showdesign`+id+`">
        <span>Show on Design</span>
      </label>
    </p>
      <h4 style="margin-left:auto;" class="mb-0">`+name+`
        <a href="" onclick="deleteit('`+id+`')" id="deleteit"><i class="my-icon fa fa-trash"></i></a>
        <a href=""  onclick="showit('`+id+`')" data-target="#`+id+`" aria-expanded="true" aria-controls="`+id+`">
          <span class="my-icon"><i class="fa fa-eye"></i></span>
        </a>
      </h4>
      
    </div>
    <div id="`+id+`" class="collapse" aria-labelledby="`+id+`" data-parent="#accordionExample">
      <div class="jumbotron">
        <div id="`+id+`" action="" class="container">
          <div class="form-group">
            <label for="Name">Name</label>
            <input type="text" class="form-control" id="Name" value="`+name+`">
          </div>
          <div class="form-group">
            <label for="descrip">Description</label>
            <textarea class="form-control" name="" id="descrip" cols="1" rows="3">`+descrip+`</textarea>
          </div>
          <p>
            <label>
              <input type="checkbox" id="esteem"/>
              <span>Esteemed Client</span>
            </label>
          </p>
          <div class="form-group">
            <label for="cover">Cover Photo</label>
            <input type="file" class="form-control-file" id="cover"><label for="#cover"><button onclick="uploadit('cover','`+id+`')" class="btn my-btn btn-primary">ok</button></label>
            <h5 id="cc"><span></span></h5>
            <img class="changeit" src="`+cover+`" style="width: auto;height: 150px;">
          </div>
          <div class="form-group" >
            <h3>Gallery</h3>
            <input type="file" class="form-control-file" id="m_img" multiple><label for=""><button onclick="uploadit('gallery','`+id+`')" class="btn my-btn btn-primary">ok</button></label><h5 id="gal_c"><span></span></h5>
            <div class="gallery" style="overflow: auto; max-height: 300px;width: 100%;">`+imgs+`</div>
          </div>
          <button onclick="updateit('`+id+`')" class="btn btn-primary">Save & Update</button>
        </div>
      </div>
    </div>
  </div>
`
  $('.accordion').append(show);
  $("#"+id+" #esteem").prop("checked", esteemed);
  $("#showdesign"+id).prop("checked",showit);
}


  db.collection("projects").orderBy("name","asc").get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>{
          renderdata(doc);
      })
  })
}

function updateit(id){
  event.preventDefault()
  var form_name = $("#"+id+" #Name").val()
  var form_descrip = $("#"+id+" #descrip").val()
  var form_cover =   $("#"+id+" .changeit").attr("src")
  var form_gallery = []
  var checker = $("#showdesign"+id).prop("checked")
  var form_esteemed = $("#"+id+" #esteem").prop("checked")
  $("#"+id+" .gallery img").each(function(){
    form_gallery.push($(this).attr("src"));
  })
  db.collection("projects").doc(id).update({
      "name" : form_name,
      "descrip" : form_descrip,
      "cover": form_cover,
      "gallery": form_gallery,
      "esteemed": form_esteemed,
      "showit":checker,
  }).then(function() {
     $(".accordion").empty();
      read();
      re_tag();
    alert("Successfully Updated!");
  })
}

async function upupload(file,nm,boo,id) {
    if (file) {
        var bool = true;
        while(bool){
          await storageRef.child("images/"+nm).getDownloadURL().then(onResolve,onReject)
          function onResolve(foundURL) {
            nm = "copy".toString()+nm;
          }
          function onReject(error){
           bool = false;
          }
        }
        var uploadTask = firebase.storage().ref('images/' + nm).put(file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on("state_changed", // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (boo) {
                $("div[id='"+id+"'] #cc span").text(progress+'%');
            } else {
                $("div[id='"+id+"'] #gal_c span").text(progress+'%');
            }
        }, function(error) {
            alert("something went wrong try again!");
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              if(boo){
                $("div[id='"+id+"'] .changeit").attr("src",downloadURL);
                $("div[id='"+id+"'] .changeit").attr("id",nm);
              }
              else{
                var img = '<img src="'+downloadURL+'" id="'+nm+'" class="gal_img" alt="">'
                $("div[id='"+id+"'] .gallery").append(img);
              }
            });
          });
    };
}

function uploadit(chk,id) {
 if (chk==="cover") {
    var file = $("div[id='"+id+"'] #cover")[0].files[0];
    var nm = file.name;
    upupload(file,nm,true,id);
 } else {
    $("div[id='"+id+"'] .gallery").empty();
    for (var i = 0; i < $("div[id='"+id+"'] #m_img").get(0).files.length; ++i) {
        var exfile = $("div[id='"+id+"'] #m_img").get(0).files[i];
        nm = exfile.name
        storageRef.child("images/"+nm).getDownloadURL().then(onResolve, onReject)
        function onResolve(foundURL) {
            nm = "copy".toString()+nm;
            storageRef.child("images/"+nm).getDownloadURL().then(onResolve, onReject)
        }
        function onReject(error){
            //pass
        }
        upupload(exfile,nm,false,id);
    }
 }
}
  
  function showit(id) {
    event.preventDefault();
    if ($("div[id='"+id+"']").attr("class") === "collapse") {
        $("div[id='"+id+"']").attr("class","collapse show");
        histags(id);
    } else {
      $("div[id='"+id+"']").attr("class","collapse");
      $(".fixed span").text("All tags :");
      re_tag();
    }
  }


function showdesign(id) {
  var checker = $("#showdesign"+id).prop("checked")
  if (checker){
    var washingtonRef = db.collection("projects").doc(id);
    return washingtonRef.update({
      showit:checker
    })
    .then(function() {
        //pass
    })
    .catch(function(error) {
        console.error("Something went wrong!");
    });
  }
  else{
    var washingtonRef = db.collection("projects").doc(id);
    return washingtonRef.update({
      showit:checker
      })
      .then(function() {
          //pass
      })
      .catch(function(error) {
          console.error("Something went wrong!");
      });
    }
}
//tags
function histags(id) {
  var fortags = db.collection("projects").doc(id);
  fortags.get().then(function(doc) {
      if (doc.exists) {
          let tag = doc.data().tags;
          let dictauto = {}
          let dict = []
          $(".fixed span").text("Showing tags for '"+doc.data().name+"' :");
          $(".fixed span").attr("id",id)
          st_alltags.forEach(ele =>{
            dictauto[ele]=null;
          })
          if (!!tag){
            tag.forEach(ele => {
              let datum = {tag:ele};
              dict.push(datum);
            })
            $('.chips-initial').chips({
              autocompleteOptions: {
                data: dictauto,
                limit: Infinity,
                minLength: 1
              },data: dict
            });
            $(".close").click(function() {
              setTimeout(uploadtags, 5);
            });
          } else{
            $('.chips-initial').chips({
              autocompleteOptions: {
                data: dictauto,
                limit: Infinity,
                minLength: 1
              }
            });
            $(".close").click(function() {
              setTimeout(uploadtags, 5);
            });
          }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}
$(".chips").click(function(){
  $(".chips ul").click(function(){
  uploadtags()
})
})
function tagit(e) {
  e.which = e.which || e.keyCode;
  if(e.which == 13) {
    uploadtags();
  }
}
$(".close").click(function() {
  setTimeout(uploadtags, 5);
});
// $("i[class='close']").attr("onclick","uploadtags()")
// .click(function(){console.log("bala")});
function qdtags(tagsdb,ele,wo_id) {
  tagsdb.doc(ele).update({
    ids: firebase.firestore.FieldValue.arrayRemove(wo_id)
  }).then(function() {
    console.log("this tag is deleted")
    })
}
function qtags(tagsdb,ele,wo_id,index,len) {
  tagsdb.doc(ele).update({
    ids: firebase.firestore.FieldValue.arrayUnion(wo_id)
  }).then(function() {
    console.log("this tag is uploaded")
    if (index == (len-1)){alldone()}
    })
}
function uploadtags() {
  var alltags = $(".chip").text().split("close");
  alltags.pop();
  if($(".fixed span").attr("id")!="khaali"){
    var his_id = $(".fixed span").attr("id")
    var tagdat = db.collection("projects").doc(his_id);
    var oldtags = []
    const docRef = his_id;
    tagdat.get().then(function(doc){
      if(doc.exists){
        oldtags = doc.data().tags;
        return tagdat.update({
          tags:alltags
        })
      }
    })
    
    .then(function() {
      console.log(docRef);
      tagsdb = db.collection("mediatags");
      alltags.forEach((item, index, array) => {
        if (!!!(oldtags.includes(item))){
          tagsdb.doc(item).get().then(function(doc) {
            if (doc.exists) {
                qtags(tagsdb,item,docRef,0,2)
            } else {
                tagsdb.doc(item).set({tags:true}).then(function(){qtags(tagsdb,item,docRef,0,2)})
                console.log(index)
            }
          }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        }
      })
      oldtags.forEach((item, index, array) => {
        if (!(alltags.includes(item))){
          tagsdb.doc(item).get().then(function(doc) {
            if (doc.exists) {
                qdtags(tagsdb,item,docRef)
            } else {
                tagsdb.doc(item).set({tags:true}).then(function(){qdtags(tagsdb,item,docRef)})
                console.log(index)
            }
          }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        }
      })  
    });
  } else{
    var his_id = $(".fixed span").attr("id")
      alltags.forEach(ele => {
        if (!(st_alltags.includes(ele))){
          db.collection('mediatags').doc(ele).set({tag:true}).then(function() {console.log("uploaded to media too!")})
        }
      })
    st_alltags.forEach(ele => {
      if (!(alltags.includes(ele))){
        console.log("bala")
        db.collection('mediatags').doc(ele).delete();
      }
    })  
    }    
}
var st_alltags = [];
function re_tag() {
  db.collection("mediatags").get().then(function(querySnapshot) 
  { st_alltags = [];
    querySnapshot.forEach(function(doc) 
    { 
      st_alltags.push(doc.id); }
    );
    backtoalltags()
    });  
}
function backtoalltags() {
  let dictauto = {}
  let dict = []
  $(".fixed span").text("All tags :");
  $(".fixed span").attr("id","khaali")
  st_alltags.forEach(ele => {
    dictauto[ele]=null;
    let datum = {tag:ele};
    dict.push(datum);
  })
  $('.chips-initial').chips({
    autocompleteOptions: {
      data: dictauto,
      limit: Infinity,
      minLength: 1
    },data: dict
  });
  $(".close").click(function() {
    setTimeout(uploadtags, 5);
  })
}
