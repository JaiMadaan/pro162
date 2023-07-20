AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  bullet.setAttribute("gltf-model","./models/bowling_ball/scene.gltf")
  bullet.setAttribute("scale",{x:3,y:3,z:3})

          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y-1.2,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  bullet.setAttribute("dynamic-body",{
    shape:"sphere",
    mass:"10",

  })

  bullet.addEventListener("collide",this.removepin)
          scene.appendChild(bullet);
        }
      });
    },
    removepin:function(e){
      var element=e.detail.target.el
      var elementhit=e.detail.body.el
      if(elementhit.id.includes("pin")){
        var impulse=new CANNON.Vec3(0,1,-15)
        var worldpoint=new CANNON.Vec3().copy(
          elementhit.getAttribute("position")
        );
        elementhit.body.applyForce(impulse,worldpoint)
        element.removeEventListener("collide",this.removepin)
        var scene=document.querySelector("#scene")
        scene.removeChild(element)
      }
    }
  });
  
  