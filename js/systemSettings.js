var SystemSettings = SystemSettings || {};

SystemSettings.standardMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/fire.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.sphereMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/blank.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

////////////////////////////////////////////////////////////////////////////////
// Basic system
////////////////////////////////////////////////////////////////////////////////

// SystemSettings.basic = {

//     // Particle material
//     particleMaterial : SystemSettings.standardMaterial,

//     // Initialization
//     initializerFunction : SphereInitializer,
//     initializerSettings : {
//         sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 10.0),
//         color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
//         lifetime: 7,
//         size:     6.0,
//     },

//     // Update
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, -10, 0),
//             attractors : [],
//         },
//         collidables: {
//         },
//     },

//     // Scene
//     maxParticles :  10000,
//     particlesFreq : 1000,
//     createScene : function () {},
// };

// SystemSettings.box = {

//     // Particle material
//     particleMaterial : SystemSettings.standardMaterial,

//     // Initialization
//     initializerFunction : SphereInitializer,
//     initializerSettings : {
//         sphere: new THREE.Vector4 ( 0.0, 10.0, 0.0, 5.0),
//         // sphere: new THREE.Vector4 ( 0.0, 50.0, 0.0, 5.0),
//         color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
//         lifetime: 7,
//         size:     6.0,
//     },

//     // Update
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, -10, 0),
//             attractors : [],
//         },
//         collidables: {
//             bounceBoxes: [{box: {p1: new THREE.Vector3(-10.0, 0.0, -100.0), p2: new THREE.Vector3(10.0, 20.0, 100.0)}, damping: 0.9}],
//         },
//     },

//     // Scene
//     maxParticles :  5000,
//     particlesFreq : 1000,
//     createScene : function () {},
// };


// ////////////////////////////////////////////////////////////////////////////////
// // Fountain system
// ////////////////////////////////////////////////////////////////////////////////

// SystemSettings.fountainBounce = {

//     // Particle material
//     particleMaterial :  SystemSettings.standardMaterial,

//     // Initialization
//     initializerFunction : FountainInitializer,
//     initializerSettings : {
//         sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
//         color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
//         lifetime: 100,
//         size:     5.0,
//     },

//     // Update
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, -20, 0),
//             attractors : [],
//         },
//         collidables: {
//             bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
//         },
//     },

//     // Scene
//     maxParticles :  50000,
//     particlesFreq : 500,
//     createScene : function () {
//         var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
//         var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

//         var box_geo   = new THREE.BoxGeometry(10,30,10)

//         var plane     = new THREE.Mesh( plane_geo, phong );
//         var box       = new THREE.Mesh( box_geo, phong );
//         box.position.set( 0.0, 15.0, 0.0 );

//         plane.rotation.x = -1.57;
//         plane.position.y = 0;

//         Scene.addObject( plane );
//         Scene.addObject( box );
//     },
// };

// SystemSettings.fountainSink = {

//     // Particle material
//     particleMaterial :  SystemSettings.standardMaterial,

//     // Initialization
//     initializerFunction : FountainInitializer,
//     initializerSettings : {
//         sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
//         color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
//         lifetime: 100,
//         size:     5.0,
//     },

//     // Update
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, -50, 0),
//             attractors : [],
//         },
//         collidables: {
//             sinkPlanes : [ { plane : new THREE.Vector4( 0, 1, 0, -10 ) } ],
//         },
//     },

//     // Scene
//     maxParticles :  50000,
//     particlesFreq : 500,
//     createScene : function () {
//         var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
//         var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

//         var box_geo   = new THREE.BoxGeometry(10,30,10)

//         var plane     = new THREE.Mesh( plane_geo, phong );
//         var box       = new THREE.Mesh( box_geo, phong );
//         box.position.set( 0.0, 15.0, 0.0 );

//         plane.rotation.x = -1.57;
//         plane.position.y = 0;

//         Scene.addObject( plane );
//         Scene.addObject( box );
//     },
// };

// ////////////////////////////////////////////////////////////////////////////////
// // Attractor system
// ////////////////////////////////////////////////////////////////////////////////

// SystemSettings.attractor = {

//     // Particle material
//     particleMaterial : SystemSettings.standardMaterial,

//     // Initialization
//     initializerFunction : SphereInitializer,
//     initializerSettings : {
//         sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 5.0),
//         color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
//         lifetime: 7,
//         size:     6.0,
//     },

//     // Update
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, 0, 0),
//             attractors : [ new THREE.Sphere( new THREE.Vector3(30.0, 30.0, 30.0), 15.0 ) ],
//         },
//         collidables: {},
//     },

//     // Scene
//     maxParticles :  10000,
//     particlesFreq : 1000,
//     createScene : function () {
//         var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
//         var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );
//         var sphere = new THREE.Mesh( sphere_geo, phong )

//         sphere.position.set (30.0, 30.0, 30.0);
//         Scene.addObject( sphere );
//     },
// };

// ////////////////////////////////////////////////////////////////////////////////
// // Horse animation
// ////////////////////////////////////////////////////////////////////////////////

// SystemSettings.animated = {

//     // Particle Material
//     particleMaterial :  SystemSettings.standardMaterial,

//     // Initializer
//     initializerFunction : AnimationInitializer,
//     initializerSettings : {
//         position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
//         color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 0.0, -40.0),
//         lifetime: 1.25,
//         size:     2.0,
//     },

//     // Updater
//     updaterFunction : EulerUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, 0, 0),
//             attractors : [],
//         },
//         collidables: {
//             bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
//         },
//     },

//     // Scene
//     maxParticles:  20000,
//     particlesFreq: 10000,
//     createScene : function () {
//         var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
//         var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x444444, side: THREE.DoubleSide } );
//         var plane = new THREE.Mesh( plane_geo, phong );
//         plane.rotation.x = -1.57;
//         plane.position.y = 0;

//         Scene.addObject( plane );
//     },

//     // Animation
//     animatedModelName: "animated_models/horse.js",
//     animationLoadFunction : function( geometry ) {

//         mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true, transparent:true, opacity:0.5 } ) );
//         mesh.scale.set( 0.25, 0.25, 0.25 );
//         // mesh.position.set( 0.0, 30.0, 0.0 );
//         Scene.addObject( mesh );
//         ParticleEngine.addMesh( mesh );

//         ParticleEngine.addAnimation( new THREE.MorphAnimation( mesh ) );
//     },

// };


// ////////////////////////////////////////////////////////////////////////////////
// // Cloth
// ////////////////////////////////////////////////////////////////////////////////

// SystemSettings.cloth = {

//     // Particle Material
//     particleMaterial :  new THREE.MeshLambertMaterial( { color:0xff0000, side: THREE.DoubleSide  } ),

//     // Initializer
//     initializerFunction : ClothInitializer,
//     initializerSettings : {
//         position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
//         color:    new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 ),
//         velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
//     },

//     // Updater
//     updaterFunction : ClothUpdater,
//     updaterSettings : {
//         externalForces : {
//             gravity :     new THREE.Vector3( 0, -10.0, 0),
//             attractors : [],
//         },
//         collidables: {
//             bounceSpheres: [ { sphere : new THREE.Vector4( 0, 0, 0, 52.0 ), damping : 0.0 } ],
//             // bouncePlanes : [ { plane : new THREE.Vector4(0, 1, 0, -10.0), damping : 0.9 } ],
//         },
//     },

//     // Scene
//     maxParticles:  1000,
//     particlesFreq: 1000,
//     createScene : function () {
//         var sphere_geo = new THREE.SphereGeometry( 50.0, 32, 32 );
//         var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );

//         Scene.addObject( new THREE.Mesh( sphere_geo, phong ) );

//     },

//     // Cloth specific settings
//     cloth : true,
//     width : 20,
//     height : 20,
// };

////////////////////////////////////////////////////////////////////////////////
// My System
////////////////////////////////////////////////////////////////////////////////

// Coin placement
createCoins = function(width, height) {
    var numCoins = 100;
    var coinRadius = 4.0;
    for (var i = 0; i < numCoins; i++) {
        var sphere_geo = new THREE.SphereGeometry(coinRadius, 32, 32);
        var phong      = new THREE.MeshPhongMaterial({color: 0x442222, emissive:0x442222, side: THREE.DoubleSide});
        var sphere     = new THREE.Mesh(sphere_geo, phong);
        var x = (Math.random() * width) - (width/2.0);
        var y = (Math.random() * height) - (height/2.0);
        sphere.position.set(x, y, 0);
        sphere.name = "Coin";
        Scene.addObject(sphere);
    }
};

checkerboard = function(geometry) {
    // assign a material to each face (each face is 2 triangles)
    var l = geometry.faces.length / 2;
    for( var i = 0; i < l; i ++ ) {
        var j = 2 * i;
        geometry.faces[ j ].materialIndex = i % 3;
        geometry.faces[ j + 1 ].materialIndex = i % 3;
    }
};

SystemSettings.mySystem = {
    // Particle Material
    sphereMaterial :  SystemSettings.sphereMaterial,
    particleMaterial :  SystemSettings.standardMaterial,

    // Initializer
    // Radius of hero sphere
    radius : 5.0,
    initializerFunction : MyInitializer,
    initializerSettings : {
        // initial position of bouncing sphere
        sphere: new THREE.Vector4 ( -220.0, 200.0, 0.0, 10.0),
        
        // length: 1000,
        color:    new THREE.Vector4 ( 0.91, 0.23, 0.1, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 1000,
        size:     2.0,
    },

    // Initializer
    initializerFunctionTrail : SphereInitializer,
    initializerSettingsTrail : {
        // length: 100,
        position: new THREE.Vector3 ( 0.0, 10.0, 0.0),
        color:    new THREE.Vector4 ( 0.91, 0.23, 0.1, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 1,
        size:     3.0,
    },

    // Updater
    updaterFunction : MyUpdater,
    updaterFunctionTrail : EulerUpdater,
    updaterSettings : {
        externalForces : {
            // gravity :     new THREE.Vector3( -60, 50, 0),
            gravity :     new THREE.Vector3( 0, -200, 0),
            // gravity :     new THREE.Vector3( 0, 0, 0),
            // attractors : [ new THREE.Sphere( new THREE.Vector3(30.0, 30.0, 30.0), 15.0 ) ],
            attractors : [],
            velMax : 400.0,
            trampolineDamping : 3.0,

        },
        collidables: {
            // bounceBoxes: [{box: {p1: new THREE.Vector3(-5.0, -15.0, 0.0), p2: new THREE.Vector3(5.0, 15.0, 0.0)}, damping: 0.9}],
        },
        // Radius of hero sphere (must be consistent with radius above)
        radius : 5.0,
    },

    // maxParticles:  2000,
    // particlesFreq: 200,

    // Scene
    createScene : function () {
        var width = 480.0;
        var height = 360.0;

        var video = document.getElementById('video');

        image = document.createElement( 'canvas' );
        image.width = width;
        image.height = height;

        imageContext = image.getContext( '2d' );
        imageContext.fillStyle = '#000000';
        imageContext.fillRect( 0, 0, 480, 360 );

        texture = new THREE.Texture( image );
        var texture = new THREE.Texture(image);
        var material = new THREE.MeshBasicMaterial ( { map : texture, overdraw: 0.5 } );

        var plane = new THREE.PlaneGeometry(480, 360, 4, 4 );
        var mesh = new THREE.Mesh( plane, material);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = -1000;
        Scene.addObject(mesh);

        var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var materials = []; 
        materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000 }) );
        materials.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 }) );
        materials.push( new THREE.MeshBasicMaterial( { color: 0x0000ff }) );
        var wallMaterials = new THREE.MeshFaceMaterial( materials )
        var bounce = 3;

        var topPlane_geo = new THREE.PlaneGeometry(480, 10000, 10, 100);
        var topPlane = new THREE.Mesh( topPlane_geo, wallMaterials );
        checkerboard(topPlane_geo);
        topPlane.name = "Boundary";
        topPlane.bounce = bounce;
        topPlane.up = new THREE.Vector3(0, 1, 0);
        // var topneg_plane = new THREE.Mesh( topPlane_geo, material );
        // topneg_plane.name = "Trampoline";
        // topneg_plane.bounce = bounce;
        // topneg_plane.up = new THREE.Vector3(0, -1, 0);
        // topPlane.add(topneg_plane);
        topPlane.position.y = height/2;
        topPlane.rotation.x = Math.PI/2.0;

        var botPlane_geo = new THREE.PlaneGeometry(480, 10000, 10, 100);
        checkerboard(botPlane_geo);
        var botPlane = new THREE.Mesh( botPlane_geo, wallMaterials );
        botPlane.position.y = -height/2;
        botPlane.rotation.x = -Math.PI/2.0;
        botPlane.name = "Boundary";
        botPlane.bounce = bounce;

        var leftPlane_geo = new THREE.PlaneGeometry(10000, 360, 100, 10);
        checkerboard(leftPlane_geo);
        var leftPlane = new THREE.Mesh( leftPlane_geo, wallMaterials );
        leftPlane.up = new THREE.Vector3(1, 0, 0);
        leftPlane.position.x = -width/2;
        leftPlane.rotation.y = Math.PI/2.0;
        leftPlane.name = "Boundary";
        leftPlane.bounce = bounce;

        var rightPlane_geo = new THREE.PlaneGeometry(10000, 360, 100, 10);
        checkerboard(rightPlane_geo);
        var rightPlane = new THREE.Mesh( rightPlane_geo, wallMaterials );
        rightPlane.position.x = width/2;
        rightPlane.rotation.y = -Math.PI/2.0;
        rightPlane.up = new THREE.Vector3(-1, 0, 0);
        rightPlane.name = "Boundary";
        rightPlane.bounce = bounce;

        Scene.addObject(topPlane);
        Scene.addObject(botPlane);
        Scene.addObject(leftPlane);
        Scene.addObject(rightPlane);

        createCoins(width, height);
    },
};
