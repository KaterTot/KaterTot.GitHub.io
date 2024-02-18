/**
 * Author: Kate Tran
 * Javascript file for projectWindow usage
 */

// Define Global variables
let slideIndex = 1;

// Make projectWindow
function projectWindow( projectFile ) {
    
    //Handle async function
    return new Promise( function ( resolve ) {
        
        // Define files
        var files = getFiles( projectFile.path );

        // Define File Paths
        var codePath        = projectFile.path + "/" + files[ 0 ];
        var descriptionPath = projectFile.path + "/" + files[ 1 ];
        var imagesPath      = projectFile.path + "/" + files[ 2 ];

        // Create new project container div element
        var projectContainer            = document.createElement( "div" );
            projectContainer.className  = "projectWindow";

        // Create body div
        var projectBody             = document.createElement( "div" );
            projectBody.className   = "windowBody projBody";

        // Append projectBody
        projectBody.append( descriptionBox( descriptionPath ) );
        projectBody.append( imageBox( imagesPath ) );
        projectBody.append( codeBox( codePath ) );

        // Append container
        projectContainer.append( header( projectContainer, projectFile ) );
        projectContainer.append( projectBody );

        // Wait 2 seconds
        setTimeout( function() {
            
            // Return
            resolve( projectContainer );

        }, 150);
        
    });
}

// Make description div
function descriptionBox( descriptionPath ) {

    // Create div
    var descriptionDiv              = document.createElement( "div" );
        descriptionDiv.className    = "bodyBox";

    // Read Description File
    fetch( descriptionPath ).then( ( res ) => res.text() ).then( ( text ) => {
    
        // Append Text
        descriptionDiv.innerHTML += text;
        
    }).catch((e) => console.error(e));
    
    // Return
    return descriptionDiv;
}

// Make image div
function imageBox( imagesPath ) {
    
    // Create div
    var imageDiv            = document.createElement( "div" );
        imageDiv.className  = "bodyBox";

    // Create slide Div
    var slideDiv            = document.createElement( "div" );
        slideDiv.className  = "slideshow-container";
    
    // Create dots Div
    var dotsDiv        = document.createElement( "div" );
        dotsDiv.style  = "text-align:center";
    
    // Append
    imageDiv.append( slideDiv );
    imageDiv.append( dotsDiv );

    // Define images
    var images = getFiles( imagesPath );

    // Define Arrays
    var slidesArray = [];
    var dotsArray   = [];
    
    // Loop through images
    for ( let imageNumber in images ) {
        
        // Create a slideshow frame
        var slide           = document.createElement( "div" );
            slide.className = "slides fade";

        // Define image path
        var imagePath = imagesPath + "/" + images[ imageNumber ];

        // Create picture
        var picture       = document.createElement( "img" );
            picture.src   = imagePath;

        // Create dots
        var dot             = document.createElement( "span");
            dot.className   = "dot";

        // Append
        dotsDiv.append( dot );
        slide.append( picture );
        slideDiv.append( slide );
        slidesArray.push( slide );
        dotsArray.push( dot );
    }

    // Add Event listener to dots container
    dotsDiv.addEventListener( "click", function( event ) {
        
        // If a Dot is clicked
        if ( event.target && event.target.classList.contains( "dot" ) ) {

            // Find the index of the clicked dot
            var dotIndex = dotsArray.indexOf( event.target );

            // Show the slide
            currentSlide( dotIndex + 1, slidesArray, dotsArray );
        }
    });
    
    // Create Navigation Controls
    var prevNav                 = document.createElement( "a" );
        prevNav.className       = "prev";
        prevNav.innerHTML       = "<";
        prevNav.onclick         = function() { plusSlides( -1, slidesArray, dotsArray ); };

    var nextNav             = document.createElement( "a" );
        nextNav.className   = "next";
        nextNav.innerHTML   = ">";
        nextNav.onclick     = function() { plusSlides( 1, slidesArray, dotsArray ); };
    
    // Append
    slideDiv.append( prevNav );
    slideDiv.append( nextNav );
    
    // Set up carosel
    showSlides( slideIndex, slidesArray, dotsArray );

    // Return
    return imageDiv;
    
}

// Make code div
function codeBox( codePath ) {
    
    // Define arrays
    var tabArray        = [];
    var codeArray       = [];
    var codeInnerArr    = [];

    // Create div
    var codeDiv             = document.createElement( "div" );
        codeDiv.className   = "bodyBox code-container";

    // Create tab div
    var tabsDiv             = document.createElement( "div" );
        tabsDiv.className   = "tabs";

    // Define file structure
    var codeFiles = getFiles( codePath );

    // Loop through codeFiles
    for ( fileIndex in codeFiles ){
        
        // Define file
        var file = codeFiles[ fileIndex ];

        // Define individual file path
        var filePath = codePath + "/" + file;

        // Strip .txt
        var filePathStripped = file.substring( 0, file.lastIndexOf( "." ) );

        // Get the file type
        var fileType = /[^.]*$/.exec( filePathStripped )[ 0 ];
        //var fileType = file.substring( file.indexOf( "." ) + 1, file.lastIndexOf( "." ) );

        // Create a tab
        var tabDiv             = document.createElement( "div" );
            tabDiv.className   = "tab";
            tabDiv.id          = fileIndex;
            tabDiv.innerHTML   = filePathStripped;

        // Append
        tabsDiv.append( tabDiv );
        tabArray.push( tabDiv );

        // Read Code File
        fetch( filePath ).then( ( res ) => res.text() ).then( ( function( fileIndex) {
            return function( text ) {
                
                // Create innerbox
                var codeInner               = document.createElement( "textarea" );
                    codeInner.className     = "code-editor";
                    codeInner.id            = "code-editor-" + fileIndex;
                    //codeInner.style.display = fileIndex === 0 ? "block" : "none";
                    codeInner.value         = text;
                    
                // Append
                codeDiv.append( codeInner );
                
                // Use code-editor theme
                var editor = CodeMirror.fromTextArea( codeInner, {
                    lineNumbers     : true,
                    readOnly        : true,
                    mode            : fileType,
                    theme           : "monokai",
                    lineWrapping    : "bounded"
                });

                // Set height to match the height of the parent
                editor.setSize( null, codeDiv.clientHeight );
                codeArray.push( editor );
                codeInnerArr.push( codeInner );

                // Hide code except for the first one
                if ( fileIndex !== "0" ) {
                    
                    // Hide
                    editor.getWrapperElement().style.display    = "none";
                    codeInner.style.display                     = "none";
                }
                else { 
                    
                    // Show
                    editor.getWrapperElement().style.display    = "block";  
                    codeInner.style.display                     = "block";
                }
            };
            
        })( fileIndex )).catch((e) => console.error(e));
    }

    // Add click event to toggle visibility
    tabsDiv.addEventListener( "click", ( function( event ) {

        // Define index
        var tabIndex = null;

        // If a Tab is clicked
        if ( event.target && event.target.classList.contains( "tab" ) ) {

            // Find the index of the clicked tab
            tabIndex = event.target.id;

            // Hide code text areas
            for ( var i = 0; i < codeArray.length; i++ ) 
            { 
                // If not selected
                if ( i != tabIndex )
                {
                    // Hide
                    codeArray[ i ].getWrapperElement().style.display    = "none";
                    codeInnerArr[ i ].style.display                     = "none";
                    tabArray[ i ].classList.remove( "active-tab" ); 
                }
                else
                {
                    // Display
                    codeArray[ tabIndex ].getWrapperElement().style.display = "block";
                    codeInnerArr[ i ].style.display                         = "block";
                    tabArray[ tabIndex ].classList.add( "active-tab" );
                }
            }
        }
    }));

    // Set first as active
    tabsDiv.querySelector( ".tab" ).classList.add( "active-tab" );

    // Append
    codeDiv.append( tabsDiv );

    // Return
    return codeDiv;
}

// Helper Functions for Image Carosel
function plusSlides( number, slidesArray, dotsArray )   { showSlides( slideIndex += number, slidesArray, dotsArray ); }
function currentSlide( number, slidesArray, dotsArray ) { showSlides( slideIndex = number, slidesArray, dotsArray ); }
function showSlides( number, slidesArray, dotsArray ) {

    let mySlides    = slidesArray;
    let myDots      = dotsArray;

    if ( number > mySlides.length ) { slideIndex = 1 };
    if ( number < 1 )               { slideIndex = mySlides.length };
    for ( var i = 0; i < mySlides.length; i++ ) { mySlides[ i ].style.display = "none"; }
    for ( var i = 0; i < myDots.length; i++ )   { myDots[ i ].className = myDots[ i ].className.replace( " active", "" ); }
    mySlides[ slideIndex - 1 ].style.display = "block";
    myDots[ slideIndex - 1 ].className += " active";
}

