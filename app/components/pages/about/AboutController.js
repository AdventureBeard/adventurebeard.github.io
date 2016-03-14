/**
 * Created by Braden on 9/18/2015.
 */
angular.module('app.controllers')
    .controller('AboutController', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

        $scope.title = "About";
        $rootScope.showNavbar = true;
        var canvas, context;
        var colors = ["250, 248, 190", "100, 230, 200", "44, 180, 230", "138, 43, 226"];
        var mouseX = 0, mouseY = 0;

        setup_canvas = function() {
            canvas = document.getElementById("particles");
            context = canvas.getContext("2d");

            canvas.style.width = '100%';
            canvas.style.height = '100%';

            canvas.addEventListener("mousedown", mouseDown, false);
            canvas.addEventListener("mouseup", mouseUp, false);
        };

        function mouseDown(event) {
        }

        function mouseUp(event) {
        }

        $timeout(function() {

            setup_canvas();

            var width = canvas.width;
            var height = canvas.height;

            var posX = 10,
                posY = canvas.height / 2;

            var particles = {};
            var particleIndex = 0;
            var settings = {
                    density: 7,
                    startingX: width / 2,
                    startingY: -30,
                    gravity: 0.5,
                    groundLevel: height * 0.95,
                    leftWall: width * 0.05,
                    rightWall: width * 0.95
                };

            function Particle() {
                this.x = settings.startingX;
                this.y = settings.startingY;
                this.size = Math.random() * (20 - 4) + 4;
                this.color = colors[Math.floor(Math.random() * 4)];
                this.dalpha = 1;

                this.dx = Math.random() * (20 - 15) + 15;
                this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                this.dy = Math.random() * 20 - 15;

                particleIndex++;
                particles[particleIndex] = this;
                this.id = particleIndex;
                this.life = 0;
                this.maxLife = 150;
            }

            Particle.prototype.draw = function() {
                this.x += this.dx + mouseX * (this.x - mouseX);
                this.y += this.dy + (mouseY);

                this.dy += settings.gravity;
                this.life++;

                if ((this.y + this.size) > settings.groundLevel) {
                   this.dy *= -0.6;
                   this.dx *= 0.75;
                   this.y = settings.groundLevel - this.size;
                }

                if ((this.x - this.size <= settings.leftWall)) {
                   this.dx *= -0.6;
                    this.dy *= 0.75;
                    this.x = settings.leftWall + this.size;
                }

                if ((this.x + this.size) >= settings.rightWall) {
                    this.dx *= -0.6;
                    this.dy *= 0.75;
                    this.x = settings.rightWall - this.size;
                }

                if (this.life >= this.maxLife) {
                    delete particles[this.id];
                }

                context.beginPath();
                var opacity = 1 - (this.dalpha * (this.life / this.maxLife));
                this.dalpha *= 1.005;
                context.fillStyle = "rgba(" + this.color + ", " + opacity + ")";
                context.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
            };

            setInterval(function() {
                context.clearRect(0,0, canvas.width, canvas.height);

                for (var i = 0; i < settings.density; i++) {
                    if (Math.random() > 0.97) {
                        new Particle();
                    }
                }

                for (var i in particles) {
                    particles[i].draw()
                }
            }, 30);

        });




        $scope.mobileCheck = function () {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };
    }]);/**
 * Created by Braden on 9/18/2015.
 */
