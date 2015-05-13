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
// My System
////////////////////////////////////////////////////////////////////////////////

// Coin placement
createCoins = function(width, height) {
    var numCoins = 100;
    //var coinRadius = 4.0;

    //var phong      = new THREE.MeshPhongMaterial({color: 0x442222, emissive:0x442222, side: THREE.DoubleSide});
    var wire  = new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } ) ;


    for (var i = 0; i < numCoins; i++) {
        var coinRadius = Math.random() * 4 + 2;
        var sphere_geo = new THREE.SphereGeometry(coinRadius, 8, 8);
        var sphere     = new THREE.Mesh(sphere_geo, wire);
        var x = (Math.random() * width) - (width/2.0);
        var y = (Math.random() * height) - (height/2.0);
        sphere.position.set(x, y, 0);
        sphere.name = "Coin";
        Scene.addObject(sphere);
    }
};

// http://stackoverflow.com/questions/12438674/three-js-multiple-material-plane
var coinRadius = 7;
checkerboard = function(geometry) {
    // assign a material to each face (each face is 2 triangles)
    var l = geometry.faces.length / 2;
    for( var i = 0; i < l; i ++ ) {
        var j = 2 * i;
        geometry.faces[ j ].materialIndex = Math.floor(i * (Math.random() * coinRadius + 1)) % coinRadius;
        geometry.faces[ j + 1 ].materialIndex = Math.floor(i * (Math.random() * coinRadius   + 1)) % coinRadius ;
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
        sphere: new THREE.Vector4 ( 0, 100.0, 0.0, 10.0),
        
        // length: 1000,
        color:    new THREE.Vector4 ( 0.91, 0.23, 0.1, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 10000,
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
        var material = new THREE.MeshBasicMaterial ( { map : texture, overdraw: .5 } );

        var plane = new THREE.PlaneGeometry(480, 360, 4, 4 );
        var mesh = new THREE.Mesh( plane, material);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = -1000;
        mesh.castShadow = true;
        Scene.addObject(mesh);

        //var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var materials = []; 
        // materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000 }) );
        // materials.push( new THREE.MeshBasicMaterial( { color: 0x00ff00 }) );
        // materials.push( new THREE.MeshBasicMaterial( { color: 0x0000ff }) );


        materials.push( new THREE.MeshLambertMaterial( { color: 0xF22C8F, shading: THREE.FlatShading } ) );
        materials.push( new THREE.MeshPhongMaterial( { color: 0x00FFE5, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) );
        materials.push( new THREE.MeshBasicMaterial( { color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending } ) );
        // //materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) );

        materials.push( new THREE.MeshLambertMaterial( { color: 0x7C30FF, shading: THREE.SmoothShading } ) );
        materials.push( new THREE.MeshPhongMaterial( { color: 0x30FF87, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading , transparent: true } ) );
        // materials.push( new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) );
        // materials.push( new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } ) );

        // materials.push( new THREE.MeshDepthMaterial() );

        materials.push( new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xff0000, shading: THREE.SmoothShading } ) );
        materials.push( new THREE.MeshPhongMaterial( { color: 0x30FF87, specular: 0x666666, emissive: 0xff0000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) );








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
