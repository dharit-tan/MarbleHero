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


// http://mathworld.wolfram.com/Point-PlaneDistance.html
var bounceClip = new Audio('bounce.mp3');
bounceClip.volume = 0.2;
Collisions.BounceTrampoline = function ( particleAttributes, alive, delta_t, plane, radius ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;
    var bounceMult   = 0.5;


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
            if (plane.bounce !== undefined) {
                if (plane.name === "Trampoline")
                    pos.add(n.clone().normalize().multiplyScalar(radius + EPS - dist));
                // pos.add(n.clone().normalize().multiplyScalar(radius + EPS - dist));
                vel.reflect(n).multiplyScalar(plane.bounce * bounceMult);

                // Play bounce audio
                // if (bounceClip.paused) {
                //     console.log("PLAY");
                //     bounceClip.play();
                // }
            }
            else
                vel.reflect(n);
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
    }
};

var coinScore = 10.65;
var winScore = 426;
var maxCoinRadius = 10;
Collisions.Coin = function ( particleAttributes, alive, delta_t, coin, radius ) {
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
            score += maxCoinRadius - coinRadius;//coinScore;
            console.log(score);
            Score.updateScore(score.toFixed(2));
            Scene.removeObject(coin);
            coin.name = undefined;
        }
        else {
            coin.rotation.x += Math.random() / 10;
            coin.rotation.y += Math.random() / 10;
            //coin.rotation.z += Math.random() / 10;
        }

        if (score >= winScore) {
            ParticleEngine.stop();
            Gui.alertOnce('YOU WIN! YAY!');
        }
    }
}

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
    for (var i = 0 ; i < Scene._objects.length ; ++i ) {
        if (Scene._objects[i].geometry) {
            if (Scene._objects[i].geometry.type == "PlaneBufferGeometry") {
                //console.log(Scene._objects[i].name);
                var plane = Scene._objects[i];
                Collisions.BounceTrampoline( particleAttributes, alive, delta_t, plane, this._opts.externalForces.trampolineDamping );
            }
       }
    }
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
    for (var i = 0 ; i < Scene._objects.length ; ++i ) {
        if (Scene._objects[i].name === "Trampoline" || Scene._objects[i].name == "Boundary") {
            var plane = Scene._objects[i];
            Collisions.BounceTrampoline( particleAttributes, alive, delta_t, plane, this._opts.radius );
        }        
        if (Scene._objects[i].name === "Coin") {
            var coin = Scene._objects[i];
            Collisions.Coin( particleAttributes, alive, delta_t, coin, this._opts.radius );
        }        
    }
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
