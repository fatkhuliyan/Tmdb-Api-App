window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
  	.then(menu.close.bind(menu));
  if(page == 'ongoing.html'){
    nowPlaying();
  }else if(page == 'featured.html'){
    upcoming();
  }
};


function scan() {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      alert("We got a barcode \n"+"ID Film: "+result.text+"\n"+"Format Barcode: "+result.format+"\n"+"Cancelled: "+result.cancelled);
      document.getElementById('input_scan').value = result.text;
       let url = `https://api.themoviedb.org/3/movie/${result.text}?api_key=YOUR_API_KEY`;
       $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSONP',
        success: function(res){
          console.log(result.text);
          var print = "";
            print +=`
                  <ul class="list" style="padding: 10px; margin-top: 20px;">
                    <li class="list-item">
                      <div class="list-item__left">
                        <img src="https://image.tmdb.org/t/p/w500/${res.poster_path}" style="width: 100%; height: 150px" alt="${res.title}">
                      </div>
                      <div class="list-item__center">
                          <div class="list-item__subtitle"><b>${res.title}</b></div>
                          <div class="list-item__subtitle">${res.overview.substring(0, 40)} ...</div>
                          <div class="list-item__subtitle"><b>Release Date :</b><br/> ${res.release_date}</div>
                          <div class="list-item__subtitle"><b>Vote Count :</b> ${res.vote_count}</div>
                          <div class="list-item__subtitle"><b>Pupularity :</b><font color="salmon"> ${res.popularity}</font></div>
                          <div class="list-item__subtitle"><b>Imdb Id :</b><font color="green"> ${res.imdb_id}</font></div>
                      </div>
                    </li>
                    <li>
                      <div class="list-item__center">
                        <img src="https://image.tmdb.org/t/p/w500/${res.backdrop_path}" style="width: 100%; height: 200px" alt="${res.title}">
                      </div>
                    </li>
                    <li>
                      <div class="list-item__subtitle"><b><strong>Sinopsis :</strong></b><br/> ${res.overview}</div>
                    </li>
                  </ul>
                 `;
          document.getElementById('isiX_scannerFilm').innerHTML = print;
        },
          error: function (err) {
          console.log(err);
          }
      });
    },
    function (error) {
      alert("Scannning failed: "+error);
    });
}


function x_scanner() {
   let idFilm = document.getElementById('input_scan').value;
   let url = `https://api.themoviedb.org/3/movie/${idFilm}?api_key=YOUR_API_KEY`;
   $.ajax({
    url: url,
    method: 'GET',
    dataType: 'JSONP',
    success: function(res){
      console.log(idFilm);
      var print = "";
        print +=`
              <ul class="list" style="padding: 10px; margin-top: 20px;">
                <li class="list-item">
                  <div class="list-item__left">
                    <img src="https://image.tmdb.org/t/p/w500/${res.poster_path}" style="width: 100%; height: 150px" alt="${res.title}">
                  </div>
                  <div class="list-item__center">
                      <div class="list-item__subtitle"><b>${res.title}</b></div>
                      <div class="list-item__subtitle">${res.overview.substring(0, 40)} ...</div>
                      <div class="list-item__subtitle"><b>Release Date :</b> ${res.release_date}</div>
                      <div class="list-item__subtitle"><b>Vote Count :</b> ${res.vote_count}</div>
                      <div class="list-item__subtitle"><b>Pupularity :</b><font color="salmon"> ${res.popularity}</font></div>
                      <div class="list-item__subtitle"><b>Imdb Id :</b><font color="green"> ${res.imdb_id}</font></div>
                  </div>
                </li>
                <li>
                  <div class="list-item__center">
                    <img src="https://image.tmdb.org/t/p/w500/${res.backdrop_path}" style="width: 100%; height: 200px" alt="${res.title}">
                  </div>
                </li>
                <li>
                  <div class="list-item__subtitle"><b><strong>Sinopsis :</strong></b><br/> ${res.overview}</div>
                </li>
              </ul>
             `;
      
      document.getElementById('isiX_scannerFilm').innerHTML = print;
    },
      error: function (err) {
      console.log(err);
      }
  });
}

function cari() {
	 var judulFilm = document.getElementById('input').value;
	 var url = `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${judulFilm}`;
	 $.ajax({
		url: url,
		method: 'GET',
		dataType: 'JSONP',
		success: function(res){
			var print = "";
			var movie = res.results;
			for (var i =0; i < movie.length; i++) {
				print +=`
				      <ul class="list" style="padding: 10px; margin-top: 20px;">
				      	<li class="list-item">
				      		<div class="list-item__left">
				      			<img src="https://image.tmdb.org/t/p/w500/${movie[i].poster_path}" style="width: 100%; height: 150px" alt="${movie[i].title}">
				      		</div>
				      		<div class="list-item__center">
					            <div class="list-item__subtitle"><b>${movie[i].title}</b></div>
					            <div class="list-item__subtitle">${movie[i].overview.substring(0, 40)} ...</div>
					            <div class="list-item__subtitle"><b>Release Date :</b><br/> ${movie[i].release_date}</div>
					            <div class="list-item__subtitle"><b>Vote Count :</b> ${movie[i].vote_count}</div>
                      <div class="list-item__subtitle"><b>ID Film :</b><font color="red"> ${movie[i].id}</font></div>
					        </div>
				      	</li>
				      </ul>
				     `;
			}
			document.getElementById('isiPencarianFilm').innerHTML = print;
		},
			error: function (err) {
			console.log(err);
			}
	});
}

function nowPlaying() {
  var nowPlayUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&language=en-US`;
  $.ajax({
    url: nowPlayUrl,
    method: 'GET',
    dataType: 'JSONP',
    success: function (res) {
      var print = "";
      var movie = res.results;
      for (var i = 0; i < movie.length; i++) {
        print += `
          <ul class="list" style="padding: 10px; margin-top: 20px;">
            <li class="list-item">
              <div class="list-item__left">
                <img src="https://image.tmdb.org/t/p/w500/${movie[i].poster_path}" style="width: 100%; height: 150px" alt="${movie[i].title}">
              </div>
              <div class="list-item__center">
                <div class="list-item__subtitle"><b>${movie[i].title}</b></div>
                <div class="list-item__subtitle">${movie[i].overview.substring(0, 40)} ...</div>
                <div class="list-item__subtitle"><b>Release Date :</b> ${movie[i].release_date}</div>
                <div class="list-item__subtitle"><b>Vote Count :</b><font color="red"> ${movie[i].vote_count}</font></div>
              </div>
            </li>
          </ul>
        `;
      }
      document.getElementById('isiNowPlaying').innerHTML = print;
    },
    error: function (err) {
      console.log(err);
    }
  });
}
function upcoming() {
  var nowPlayUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=en-US`;
  $.ajax({
    url: nowPlayUrl,
    method: 'GET',
    dataType: 'JSONP',
    success: function (res) {
      var print = "";
      var movie = res.results;
      for (var i = 0; i < movie.length; i++) {
          print += `
            <ul class="list" style="padding: 10px; margin-top: 20px;">
            <li class="list-item">
              <div class="list-item__left">
                <img src="https://image.tmdb.org/t/p/w500/${movie[i].poster_path}" style="width: 100%; height: 150px" alt="${movie[i].title}">
              </div>
              <div class="list-item__center">
                <div class="list-item__subtitle"><b>${movie[i].title}</b></div>
                <div class="list-item__subtitle">${movie[i].overview.substring(0, 40)} ...</div>
                <div class="list-item__subtitle"><b>Release Date :</b> ${movie[i].release_date}</div>
                <div class="list-item__subtitle"><b>Vote Count :</b><font color="red"> ${movie[i].vote_count}</font></div>
              </div>
            </li>
          </ul>
          `;
      }
      document.getElementById('isiUpcoming').innerHTML = print;
    },
    error: function (err) {
      console.log(err);
    }
  });
}

