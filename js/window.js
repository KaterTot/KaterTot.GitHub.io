/**
 * Author: Kate Tran
 * Javascript file for window usage
 */

// Initialize Drag Elements
let offsetX, offsetY, draggedDiv;


// Make Window
function desktopWindow( file ) {
    
    // Create new window container div element
    var windowContainer             = document.createElement( "div" );
        windowContainer.className   = "window container resizable";
        windowContainer.id          = "window-" + file.name;
    
    // Pulling files from computer
    var compFiles = getFiles( file.path );

    // Append Window Container
    windowContainer.append( header( windowContainer, file ) );
    windowContainer.append( body( compFiles, file ) );
    windowContainer.append( footer( compFiles.length ) );
    
    // Return
    return windowContainer;
}

// Make Header
function header( parent, file ) {

    // Create new header div element
    var header              = document.createElement( "div" );
        header.className    = "header";
    
    // Create new headerTitle div element
    var headerTitle             = document.createElement( "div" );
        headerTitle.className   = "headerTitle";
    
    // Create new headerImage image
    var headerImage                         = document.createElement( "img" );
        headerImage.className               = 'windowIcon container';
        headerImage.style.backgroundImage   = file.image;
    
    // Create new header path
    var headerPath              = document.createElement( "div" );
        headerPath.append( document.createTextNode( "C:\\" + file.name ) );
        headerPath.className    = "headerPath";

    // Create new control panel div element
    var controlPanel            = document.createElement( "div" );
        controlPanel.className  = "controlPanel";

    // Create minimize button
    var minimize            = document.createElement( "button" );
        minimize.innerHTML  = "&#128469;";
        minimize.onclick    = function() {

            // Minimize Window
            parent.style.display = "none";
            
            // Get taskBarButton item
            var taskBarButton = document.getElementById( "taskBar-" + file.name );

            // Change taskBarStyle
            taskBarButton.classList.add( "closed" );
            taskBarButton.classList.remove( "open" );
        };

    // Create re-size button
    var resize              = document.createElement( "button" );
        resize.innerHTML    = "&#128470;";
        resize.onclick      = function() {

            // If the window is currently maximized
            if ( parent.classList.contains( "maximized" ) ) {
                
                // restore it to its original size
                parent.classList.remove( "maximized" );
                
                // unlock div
                parent.classList.remove( "lockedDiv" );
                
                // Reset window size
                parent.style.width  = parent.dataset.originalWidth;
                parent.style.height = parent.dataset.originalHeight;
            } 
            else {
                
                // If the window is not maximized, maximize it
                parent.classList.add( "maximized" );

                // Store original window size
                parent.dataset.originalWidth    = parent.style.width;
                parent.dataset.originalHeight   = parent.style.height;

                // lock div
                parent.classList.add( "lockedDiv" );

                // Set window size to fill the screen
                parent.style.width  = "100%";
                parent.style.height = "100%";
            }
        };

    // Create close button
    var close           = document.createElement( "button" );
        close.innerHTML = "&#128473;";
        close.onclick   = function() { 

            // Remove Window
            parent.remove();

            // Remove TaskBar Pop Up
            document.getElementById( "taskBar-" + file.name ).remove();
        };

    // Append HeaderTitle
    headerTitle.append( headerImage );
    headerTitle.append( headerPath );

    // Append Control Panel
    controlPanel.append( minimize );
    controlPanel.append( resize );
    controlPanel.append( close );

    // Append Header
    header.append( headerTitle );
    header.append( controlPanel );

    // Make window draggable
    //header.ondrag = function() { dragWindow( parent ) };
    document.addEventListener( 'mousedown', function( event ) {

        // Check if the header is clicked on 
        if ( event.target.closest( ".header" ) === header )
        {
            //Drag
            handleMouseDown( event );
        }
    });

    // Return
    return header;
}

// Make Body
function body( compFiles, file ) {

    // Create new body div element
    var body            = document.createElement( "div" );
        body.className  = "windowBody container";
     
    // Traverse path
    for ( f of compFiles ) {

        // Get File Type, convert to image
        //var image = getFileType( f );
        
        // Create Path String
        var path = file.path + "/" + f;

        // Create fileObj
        var fileObj = { id: "file", name: "", path: path, image: "url('./images/openFolder.png')"};

        // If Projects file
        if ( file.id == "projects" ) {
            
            // Identify children fileObj
            fileObj.id = "project";
        }

        // Create icon
        var project = desktopIcon( fileObj );

        // Append body
        body.append( project );
    }

    // Return
    return body;
}

// Make Footer
function footer( count ) {

    // Create new footer div element
    var footer              = document.createElement( "div" );
        footer.className    = "footer";
    
    // Create new count div element
    var countContainer = document.createElement( "div" );
        //countContainer.className = "icon";

    // Create new file count text
    var fileCount = document.createTextNode( count + " object(s)" );
        //fileCount.className = "";

    // Append countContainer
    countContainer.append( fileCount );

    // Append Footer
    footer.append( countContainer );

    // Return
    return footer;
}

// Drag Window
function dragWindow( window ) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(window.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(window.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        window.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

        function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        window.style.top = (window.offsetTop - pos2) + "px";
        window.style.left = (window.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Function to handle mouse down event
function handleMouseDown( event ) {
    
    // Calculate the offset between mouse position and the top left corner of the parent div
    offsetX = event.clientX - event.target.parentElement.offsetLeft;
    offsetY = event.clientY - event.target.parentElement.offsetTop;

    // Define the clicked div
    draggedDiv = event.target;

    // Attach event listeners for mouse move and mouse up events
    document.addEventListener( 'mousemove', handleMouseMove );
    document.addEventListener( 'mouseup', handleMouseUp );
}

// Function to handle mouse move event
function handleMouseMove( event ) {
    
    // Calculate new position of the parent div based on mouse position and offset
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;

    // Update position of the parent div
    draggedDiv.parentElement.style.left = newX + 'px';
    draggedDiv.parentElement.style.top = newY + 'px';
}

// Function to handle mouse up event
function handleMouseUp() {
    
    // Remove event listeners for mouse move and mouse up events
    document.removeEventListener( 'mousemove', handleMouseMove );
    document.removeEventListener( 'mouseup', handleMouseUp );
}

// Function to handle clicking on the resize button
function toggleMaximize() {

    // If the window is currently maximized
    if ( parent.classList.contains( 'maximized' ) ) {
        
        // restore it to its original size
        parent.classList.remove( 'maximized' );
        
        // Reset window size
        parent.style.width  = parent.dataset.originalWidth;
        parent.style.height = parent.dataset.originalHeight;
    } 
    else {
        
        // If the window is not maximized, maximize it
        parent.classList.add(' maximized' );

        // Store original window size
        parent.dataset.originalWidth    = parent.style.width;
        parent.dataset.originalHeight   = parent.style.height;

        // Set window size to fill the screen
        parent.style.width  = '100%';
        parent.style.height = '100%';
    }
}
/*https://cdn.jsdelivr.net/gh/KaterTot/katertot.github.io/projects/*/