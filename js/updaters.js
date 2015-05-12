/*
 * In this file you can specify all sort of updaters
 *  We provide an example of simple updater that updates pixel positions based on initial velocity and gravity
 */

////////////////////////////////////////////////////////////////////////////////
// Collisions
////////////////////////////////////////////////////////////////////////////////

var Collisions = Collisions || {};
var EPS = 0.0001;
var once = true;
var score = 0;

// Collisions.BouncePlane = function ( particleAttributes, alive, delta_t, plane,damping ) {
//     var positions    = particleAttributes.position;
//     var velocities   = particleAttributes.velocity;

//     for ( var i = 0 ; i < alive.length ; ++i ) {

//         if ( !alive[i] ) continue;
//         // ----------- STUDENT CODE BEGIN ------------
//         var pos = getElement( i, positions );
//         var vel = getElement( i, velocities );

//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS) {
//             vel.reflect(planeNorm).multiplyScalar(damping);;
//         }

//         setElement( i, positions, pos );
//         setElement( i, velocities, vel );
//         // ----------- STUDENT CODE END ------------
//     }
// };

// http://mathworld.wolfram.com/Point-PlaneDistance.html
Collisions.BounceTrampoline = function ( particleAttributes, alive, delta_t, plane, radius ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;
    var bounceMult   = 0.5;

    console.log(plane.bounce * bounceMult);

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );

        // vector w = vector from pos to any point on plane
        var point_on = plane.position;
        var w = new THREE.Vector3();
        w.subVectors(point_on, pos);

        var n = plane.up;
        
        // projection of w onto n is distance from pos to plane
        var projw_onn = w.dot(n);
        projw_onn = Math.abs(projw_onn);
        
        var dist = pos.distanceTo(point_on);

        if (projw_onn < radius + EPS && dist < plane.geometry.parameters.width/2.0) {
            if (plane.bounce !== undefined)
                vel.reflect(n).multiplyScalar(plane.bounce * bounceMult);
            else
                vel.reflect(n).multiplyScalar(1);
            // Score.updateScore(score += 10);
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
    }
};

var coinScore = 10;
var winScore = 200;
Collisions.BounceCoin = function ( particleAttributes, alive, delta_t, coin, radius ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );
        var center = new THREE.Vector3(coin.position.x, coin.position.y, coin.position.z);
        var coinRadius = coin.geometry.boundingSphere.radius;
        
        var d = pos.distanceTo(center) - radius - coinRadius;
        if (d < EPS) {
            Score.updateScore(score += coinScore);
            Scene.removeObject(coin);
            coin.name = undefined;
        }

        if (score >= winScore) {
            ParticleEngine.stop();
            Gui.alertOnce('YOU WIN! 8====D YAY!');
        }
    }
}

// Collisions.SinkPlane = function ( particleAttributes, alive, delta_t, plane  ) {
//     var positions   = particleAttributes.position;

//     for ( var i = 0 ; i < alive.length ; ++i ) {

//         if ( !alive[i] ) continue;
//         // ----------- STUDENT CODE BEGIN ------------
//         var pos = getElement( i, positions );
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS) {
//             killParticle(i, particleAttributes, alive);
//         }
//         // ----------- STUDENT CODE END ------------
//     }
// };

// Collisions.BounceSphere = function ( particleAttributes, alive, delta_t, sphere, damping ) {
//     var positions    = particleAttributes.position;
//     var velocities   = particleAttributes.velocity;

//     for ( var i = 0 ; i < alive.length ; ++i ) {

//         if ( !alive[i] ) continue;
//         // ----------- STUDENT CODE BEGIN ------------
//         var pos = getElement( i, positions );
//         var vel = getElement( i, velocities );
//         var center = new THREE.Vector3(sphere.x, sphere.y, sphere.z);
//         var radius = sphere.w;
        
//         var d = pos.distanceTo(center);
//         if (d < radius + EPS) {
//             var normal = pos.clone().sub(center).normalize();
//             vel.reflect(normal).multiplyScalar(damping);
//             pos.add(normal.clone().multiplyScalar(radius + EPS - d));
//         }

//         setElement( i, positions, pos );
//         setElement( i, velocities, vel );
//         // ----------- STUDENT CODE END ------------
//     }
// }

// Collisions.BounceBox = function ( particleAttributes, alive, delta_t, box, damping ) {
//     var positions    = particleAttributes.position;
//     var velocities   = particleAttributes.velocity;
//     var pmin = box.p1;
//     var pmax = box.p2;
//     var xmin = pmin.x;
//     var ymin = pmin.y;
//     var zmin = pmin.z;
//     var xmax = pmax.x;
//     var ymax = pmax.y;
//     var zmax = pmax.z;
//     var EPS = 0.5;

//     for ( var i = 0 ; i < alive.length ; ++i ) {

//         if ( !alive[i] ) continue;
//         var pos = getElement( i, positions );
//         var vel = getElement( i, velocities );
//         var n;
//         var plane;
//         var planePoint;
//         var norm;
//         var d;

//         // Don't do anything to particles outside of the box.
//         if (   (pos.x > xmax + EPS || pos.x < xmin - EPS)
//             || (pos.y > ymax + EPS || pos.y < ymin - EPS)
//             || (pos.z > zmax + EPS || pos.z < zmin - EPS)) {
//             continue;
//         }

//         plane = new THREE.Vector4(0.0, 1.0, 0.0, ymin);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS && pos.dot(planeNorm) > planeDist - EPS) {
//             vel.reflect(planeNorm);
//         }

//         plane = new THREE.Vector4(0.0, 1.0, 0.0, ymax);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) > planeDist - EPS && pos.dot(planeNorm) < planeDist + EPS) {
//             vel.reflect(planeNorm);
//         }

//         plane = new THREE.Vector4(1.0, 0.0, 0.0, xmin);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS && pos.dot(planeNorm) > planeDist - EPS) {
//             vel.reflect(planeNorm);
//         }

//         plane = new THREE.Vector4(1.0, 0.0, 0.0, xmax);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS && pos.dot(planeNorm) > planeDist - EPS) {
//             vel.reflect(planeNorm);
//         }

//         plane = new THREE.Vector4(0.0, 0.0, 1.0, zmin);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS && pos.dot(planeNorm) > planeDist - EPS) {
//             vel.reflect(planeNorm);
//         }

//         plane = new THREE.Vector4(0.0, 0.0, 1.0, zmax);
//         var planeDist = plane.w;
//         var planeNorm = new THREE.Vector3(plane.x, plane.y, plane.z);
//         if (pos.dot(planeNorm) < planeDist + EPS && pos.dot(planeNorm) > planeDist - EPS) {
//             vel.reflect(planeNorm);
//         }

//         setElement( i, positions, pos );
//         setElement( i, velocities, vel );
//     }
// }

////////////////////////////////////////////////////////////////////////////////
// Null updater - does nothing
////////////////////////////////////////////////////////////////////////////////

// function VoidUpdater ( opts ) {
//     this._opts = opts;
//     return this;
// };

// VoidUpdater.prototype.update = function ( particleAttributes, initialized, delta_t ) {
//     //do nothing
// };

////////////////////////////////////////////////////////////////////////////////
// Euler updater
////////////////////////////////////////////////////////////////////////////////

function EulerUpdater ( opts ) {
    this._opts = opts;
    return this;
};


EulerUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};

EulerUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var gravityAttenuation = 1;
    var attractors = this._opts.externalForces.attractors;
    var weakGravMult = 100.0;

    // console.log(attractors);

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        // now update velocity based on forces...

        // gravity around moving sphere
        var s = Scene._objects[0].geometry.boundingSphere;
        var sPos = Scene._objects[0].position.clone();
        var f = new THREE.Vector3(0.0, 0.0, 0.0);
        f.subVectors(sPos, p).normalize();// f.subVectors(s.center, p).normalize();
        // var falloff = s.radius / (p.distanceTo(sPos));
        v.add(f.multiplyScalar(weakGravMult));
        
        // attractors
        for (var j = 0; j < attractors.length; j++) {
            var a = attractors[j];
            var f = new THREE.Vector3(0.0, 0.0, 0.0);
            f.subVectors(a.center, p).normalize();
            var falloff = a.radius / (p.distanceTo(a.center));
            v.add(f.multiplyScalar(falloff));
        }
        


        //}

        // gravity
        v.add(gravity.clone().multiplyScalar(delta_t * gravityAttenuation));

        //v = new THREE.Vector3(0, 0, 0);
        setElement( i, velocities, v );
        // ----------- STUDENT CODE END ------------
    }
};

EulerUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;
    var positions    = particleAttributes.position;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );
        var x = Math.abs(pos.x/10);
        var y = Math.abs(pos.y/10);
        var z = Math.abs(pos.z/10);
        var col = new THREE.Vector4(Math.sin(x), Math.sin(y), Math.sin(z), 1);
      

        setElement( i, colors, col );
        // ----------- STUDENT CODE END ------------
    }
};

EulerUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var s = getElement( i, sizes );

        setElement( i, sizes, s );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killParticle( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

EulerUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    // for (var i = 0 ; i < Scene._objects.length ; ++i ) {
         
        // if (Scene._objects[i].geometry.type == "PlaneBufferGeometry") {
        //     //console.log(Scene._objects[i].name);
        //     var plane = Scene._objects[i];
        //     Collisions.BounceTrampoline( particleAttributes, alive, delta_t, plane, this._opts.externalForces.trampolineDamping );
        // }
       
    // }
    // if ( this._opts.collidables.bouncePlanes ) {
    //     for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
    //         var plane = this._opts.collidables.bouncePlanes[i].plane;
    //         var damping = this._opts.collidables.bouncePlanes[i].damping;
    //         Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
    //     }
    // }

    // if ( this._opts.collidables.sinkPlanes ) {
    //     for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
    //         var plane = this._opts.collidables.sinkPlanes[i].plane;
    //         Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
    //     }
    // }

    // if ( this._opts.collidables.spheres ) {
    //     for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
    //         Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
    //     }
    // }

    // if ( this._opts.collidables.bounceBoxes ) {
    //     for (var i = 0 ; i < this._opts.collidables.bounceBoxes.length ; ++i ) {
    //         var box = this._opts.collidables.bounceBoxes[i].box;
    //         var damping = this._opts.collidables.bounceBoxes[i].damping;
    //         Collisions.BounceBox( particleAttributes, alive, delta_t, box, damping );
    //     }
    // }
};

EulerUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {

    this.updateLifetimes( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    this.updatePositions( particleAttributes, alive, delta_t );

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;

}


// function ClothUpdater ( opts ) {
//     this._opts = opts;
//     this._s = 10.0;
//     // this._s = 15.0;
//     this._k_s = 0.35;
//     return this;
// }

// ClothUpdater.prototype.calcHooke = function ( p, q ) {
//     // ----------- STUDENT CODE BEGIN ------------
//     var k_s = this._k_s;
//     var rest_len = this._s;
    
//     var d = p.distanceTo(q);
//     var D = q.clone().sub(p).normalize();
//     var ksCoeff = (d - rest_len) * k_s;
//     var f = D.multiplyScalar(ksCoeff);

//     return f;
//     // ----------- STUDENT CODE END ------------
// }

// ClothUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
//     var positions  = particleAttributes.position;
//     var velocities = particleAttributes.velocity;

//     for ( var i  = 0 ; i < alive.length ; ++i ) {
//         if ( !alive[i] ) continue;
//         var p = getElement( i, positions );
//         var v = getElement( i, velocities );
//         p.add( v.clone().multiplyScalar( delta_t ) );
//         setElement( i, positions, p );
//     }
// };

// ClothUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t, width, height ) {
//     var positions = particleAttributes.position;
//     var velocities = particleAttributes.velocity;
//     var gravity = this._opts.externalForces.gravity;
//     var gravityMult = 0.3;
//     var hookeMult = 50.0;
//     var attractors = this._opts.externalForces.attractors;

//     for ( var j = 0 ; j < height; ++j ) {
//         for ( var i = 0 ; i < width ; ++i ) {
//             var idx = j * width + i;

//             // ----------- STUDENT CODE BEGIN ------------
//             var p = getElement( idx, positions );
//             var v = getElement( idx, velocities ).clone();

//             // gravity
//             var g = gravity.clone();
//             v.add(g.multiplyScalar(gravityMult));

//             // calculate forces on this node from neighboring springs 
//             if (i+1 < width) {
//                 var pup    = getGridElement(i+1, j,   width, positions);
//                 v.add(this.calcHooke(p, pup).multiplyScalar(hookeMult));
//             }
//             if (i-1 >= 0) {
//                 var pdown  = getGridElement(i-1, j,   width, positions);
//                 v.add(this.calcHooke(p, pdown).multiplyScalar(hookeMult));
//             }
//             if (j+1 < height) {
//                 var pright = getGridElement(i,   j+1, width, positions);
//                 v.add(this.calcHooke(p, pright).multiplyScalar(hookeMult));
//             }
//             if (j-1 >= 0) {
//                 var pleft  = getGridElement(i,   j-1, width, positions);
//                 v.add(this.calcHooke(p, pleft).multiplyScalar(hookeMult));
//             }

//             setElement( idx, velocities, v );
//             // ----------- STUDENT CODE END ------------
//         }
//     }

// };


// ClothUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
//     if ( !this._opts.collidables ) {
//         return;
//     }
//     if ( this._opts.collidables.bouncePlanes ) {
//         for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
//             var plane = this._opts.collidables.bouncePlanes[i].plane;
//             var damping = this._opts.collidables.bouncePlanes[i].damping;
//             Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
//         }
//     }

//     if ( this._opts.collidables.sinkPlanes ) {
//         for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
//             var plane = this._opts.collidables.sinkPlanes[i].plane;
//             Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
//         }
//     }

//     if ( this._opts.collidables.bounceSpheres ) {
//         for (var i = 0 ; i < this._opts.collidables.bounceSpheres.length ; ++i ) {
//             var sphere = this._opts.collidables.bounceSpheres[i].sphere;
//             var damping = this._opts.collidables.bounceSpheres[i].damping;
//             Collisions.BounceSphere( particleAttributes, alive, delta_t, sphere, damping );
//         }
//     }
// };


// ClothUpdater.prototype.update = function ( particleAttributes, alive, delta_t, width, height ) {

//     this.updateVelocities( particleAttributes, alive, delta_t, width, height );
//     this.updatePositions( particleAttributes, alive, delta_t, width, height );

//     this.collisions( particleAttributes, alive, delta_t );

//     // tell webGL these were updated
//     particleAttributes.position.needsUpdate = true;
//     particleAttributes.color.needsUpdate = true;
//     particleAttributes.velocity.needsUpdate = true;
//     particleAttributes.lifetime.needsUpdate = true;
//     particleAttributes.size.needsUpdate = true;
// }

function MyUpdater ( opts ) {
    this._opts = opts;
    return this;
};

MyUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    var p = getElement( 0, positions );
    var v = getElement( 0, velocities );
    // var s = Math.sin(delta_t);
    p.add( v.clone().multiplyScalar( delta_t ) );
    setElement( 0, positions, p );
    //console.log("sphere: ", p);

    // Update camera
    var camera = Renderer._camera;
    camera.position.set(p.x, p.y, 200);
    Renderer._controls.target = p.clone();

    // Update Scene
    for (var i = 0 ; i < Scene._objects.length ; ++i ) {
        if (Scene._objects[i].geometry.type == "SphereGeometry") {
            var sphere = Scene._objects[i];
            // console.log(sphere);
            sphere.position.set(p.x, p.y, p.z);
            break;
        }
    }
};

function tanhClip(input, max) {
    var ratio = input.clone().divideScalar(max);
    var tanhx = Math.tanh(ratio.x);
    var tanhy = Math.tanh(ratio.y);
    var tanhz = Math.tanh(ratio.z);
    var clipped = new THREE.Vector3(tanhx * max, tanhy * max, tanhz * max);
    return clipped;
}

MyUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var gravityAttenuation = 0.3;
    var attractors = this._opts.externalForces.attractors;
    var velMax = this._opts.externalForces.velMax;

    // console.log(attractors);

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var p = getElement( i, positions );
        var v = getElement( i, velocities );

        // attractors
        for (var j = 0; j < attractors.length; j++) {
            var s = attractors[j];
            var f = new THREE.Vector3(0.0, 0.0, 0.0);
            f.subVectors(s.center, p).normalize();
            var falloff = s.radius / (p.distanceTo(s.center));
            v.add(f.multiplyScalar(falloff));
        }

        v.z = 0;
        // gravity
        v.add(gravity.clone().multiplyScalar(delta_t * gravityAttenuation));
        v = tanhClip(v, velMax);

        setElement( i, velocities, v );
        // ----------- STUDENT CODE END ------------
    }
};

MyUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;
    var lifetimes = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var c = getElement( i, colors );
        var l = getElement( i, lifetimes );
        
        setElement( i, colors, c );
        // ----------- STUDENT CODE END ------------
    }
};

MyUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var s = getElement( i, sizes );

        setElement( i, sizes, s );
        // ----------- STUDENT CODE END ------------
    }

};

MyUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killParticle( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

MyUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    // if ( !this._opts.collidables ) {
    //     return;
    // }
    for (var i = 0 ; i < Scene._objects.length ; ++i ) {
        if (Scene._objects[i].name === "Trampoline" || Scene._objects[i].name == "Boundary") {
            var plane = Scene._objects[i];
            Collisions.BounceTrampoline( particleAttributes, alive, delta_t, plane, this._opts.radius );
        }        
        if (Scene._objects[i].name === "Coin") {
            var coin = Scene._objects[i];
            Collisions.BounceCoin( particleAttributes, alive, delta_t, coin, this._opts.radius );
        }        
        // if (Scene._objects[i].geometry.type == "SphereGeometry") {
        //     var sphere = Scene._objects[i].geometry;
        //     sphere.position.set()
        //     console.log(i);
        //     var plane = Scene._objects[i];
        //     Collisions.BounceTrampoline( particleAttributes, alive, delta_t, plane, this._opts.externalForces.trampolineDamping );
        // }
    }
    // for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
    //     var plane = this._opts.collidables.bouncePlanes[i].plane;
    //     var damping = this._opts.collidables.bouncePlanes[i].damping;
    //     Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
    // }

    // if ( this._opts.collidables.sinkPlanes ) {
    //     for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
    //         var plane = this._opts.collidables.sinkPlanes[i].plane;
    //         Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
    //     }
    // }

    // if ( this._opts.collidables.spheres ) {
    //     for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
    //         Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
    //     }
    // }

    // if ( this._opts.collidables.bounceBoxes ) {
    //     for (var i = 0 ; i < this._opts.collidables.bounceBoxes.length ; ++i ) {
    //         var box = this._opts.collidables.bounceBoxes[i].box;
    //         var damping = this._opts.collidables.bounceBoxes[i].damping;
    //         Collisions.BounceBox( particleAttributes, alive, delta_t, box, damping );
    //     }
    // }
};

MyUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {

    this.updateLifetimes( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    this.updatePositions( particleAttributes, alive, delta_t );

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;
}
