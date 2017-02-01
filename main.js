'use strict';
app.controller('HomeCtrl',
        ["$sce", "$timeout","$http", function ($sce, $timeout, $http) {
            var controller = this;
            controller.state = null;
            controller.API = null;
            controller.currentVideo = 0;

            controller.onPlayerReady = function(API) {
                controller.API = API;
            };

            controller.onCompleteVideo = function() {
                controller.isCompleted = true;

                controller.currentVideo++;

                if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

                controller.setVideo(controller.currentVideo);
            };

		 	controller.videos = [];
			
			
			$http.get("current.json").then(function (response) {
			
			for (var i=0, l=response.data.sources.length; i<l; i++)
			{
			console.log(response.data.sources[i]);
			controller.videos.push(response.data.sources[i]);
			}
			console.log("all list loaded");
			console.log(response.data);
			console.log(controller.videos);
			
		});
		

            controller.config = {
                preload: "none",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: controller.videos[0],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };

            controller.setVideo = function(index) {
				controller.isCompleted = true;
                controller.API.stop();
                controller.currentVideo = index;
                controller.config.sources = controller.videos[index];
                $timeout(controller.API.play.bind(controller.API), 100);
            };
        }]
    );
