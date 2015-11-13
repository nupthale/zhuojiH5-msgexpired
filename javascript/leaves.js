(function() {
    /* Define the number of leaves to be used in the animation */
    var NUMBER_OF_LEAVES = 10;
    var css_root = 'http://m.zhuojiapp.com/s/msg_expired2/styles/';
    var leaves = {
        leaf1: {
            src: css_root + 'leaf1.png',
            width:'6px',
            height:'16px'
        },
        leaf2: {
            src: css_root + 'leaf2.png',
            width:'4px',
            height:'10px'
        },
        leaf3: {
            src: css_root + 'leaf3.png',
            width:'15px',
            height:'8px'
        },
        leaf4: {
            src:css_root + 'leaf4.png',
            width:'6px',
            height:'14px'
        },
        leaf5: {
            src: css_root + 'leaf5.png',
            width:'24px',
            height:'13px'
        }
    };

    init();

    function init() {
        /* Get a reference to the element that will contain the leaves */
        var container = document.getElementById('leafContainer');
        /* Fill the empty container with new leaves */
        for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
            container.appendChild(createALeaf());
        }
    }

    function randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }

    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }

    function pixelValue(value) {
        return value + 'px';
    }

    function durationValue(value) {
        return value + 's';
    }

    function createALeaf()
    {
        /* Start by creating a wrapper div, and an empty img element */
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');
        
        /* Randomly choose a leaf image and assign it to the newly created element */
        var leaf = leaves['leaf' + randomInteger(1, 5)];
        image.src = leaf.src;
        image.style.width = leaf.width;
        image.style.height = leaf.height;
        image.style.opacity = Math.random(); 

        leafDiv.style.top = "-6px";

        /* Position the leaf at a random location along the screen */
        leafDiv.style.left = pixelValue(randomInteger(0, window.innerWidth));
        
        /* Randomly choose a spin animation */
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
        
        /* Set the -webkit-animation-name property with these values */
        leafDiv.style.webkitAnimationName = 'fade, drop';
        image.style.webkitAnimationName = spinAnimationName;
        
        /* Figure out a random duration for the fade and drop animations */
        var fadeAndDropDuration = durationValue(randomFloat(10, 14));
        
        /* Figure out another random duration for the spin animation */
        var spinDuration = durationValue(randomFloat(4, 8));
        /* Set the -webkit-animation-duration property with these values */
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        var leafDelay = durationValue(randomFloat(0, 1));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

        image.style.webkitAnimationDuration = spinDuration;

        // add the <img> to the <div>
        leafDiv.appendChild(image);

        /* Return this img element so it can be added to the document */
        return leafDiv;
    }
})();

