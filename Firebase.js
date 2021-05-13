var firebaseConfig = {
    apiKey: "AIzaSyBChMwm_log9zgz06-eFsmhExd2CTQNHHA",
    authDomain: "kceian-3bf3a.firebaseapp.com",
    databaseURL: "https://kceian-3bf3a-default-rtdb.firebaseio.com",
    projectId: "kceian-3bf3a",
    storageBucket: "kceian-3bf3a.appspot.com",
    messagingSenderId: "648965575273",
    appId: "1:648965575273:web:f0ff906148e7633c6c08f8",
    measurementId: "G-5X752RSN1V"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var announceRef = firebase.database().ref('annoucement');

function log(msg){
	console.log(msg);
}
function announce(ann,name){
	var month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
	var d = new Date();
	var fullDate = d.getDate()+'-'+month[d.getMonth()]+'-'+d.getFullYear() 
	var fullTime="";
	
	if(0<=d.getHours() && d.getHours()<=12){
		if(d.getHours()==0){
	    	fullTime=d.getHours()+12+":"+d.getMinutes()+" AM";
	    }
	    else{
	    	fullTime=d.getHours()+":"+d.getMinutes()+" AM";
	    }
	}
	else{
		fullTime=d.getHours()-12+":"+d.getMinutes()+" PM";
	}

	announceRef.push().set({
		annoucement:ann,
		date: fullDate,
		time: fullTime,
		user: name
	},function(error){
		if(!error){
			log("Successfully Data Inserted !");
		}
		else{
			log("Check your connection, Data insert is failed");
		}
	})
}