 initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var photoURL = user.photoURL;
            user.getIdToken().then(function(accessToken) {
            	read();
              re_tag();
              addit();
            	$(".dp").attr("src",photoURL)
            });
          } 
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });