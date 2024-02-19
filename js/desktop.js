/**
 * Author: Kate Tran
 * Javascript file for desktop icon usage
 */

// Initialize Drag Elements
let offsetX, offsetY;


// Make Desktop Icon
function desktopIcon( file ) {

    //Get File Name
    file.name = file.path.substring( file.path.lastIndexOf('/') + 1);
    
    // Create new icon div element
    var icon            = document.createElement( "div" );
        icon.className  = "icon";
        icon.id         = file.id;

    // Create new icon image
    var iconImage                       = document.createElement( "img" );
        iconImage.className             = 'folder';
        iconImage.style.backgroundImage = file.image;
    
    // Create lineBreak
    var lb = document.createElement( "br" );

    // Create new icon name
    var iconName            = document.createElement( "span" );
        iconName.className  = "icon-text";

    // Create new icon title
    var iconTitle = document.createTextNode( file.name );

    // Add event listener
    icon.addEventListener( "dblclick", function() {
       
        // Define appWindow
        var appWindow = null;

        // If folder is a project file
        if ( icon.id == "project" ) {

            // Handle async functions
            projectWindow( file ).then( function (result ) {
                
                // Open Project Window Popup
                appWindow = document.body.appendChild( result );
            })
        }
        // If folder is a regular file
        else {
            
            // Open Desktop Window Popup
            appWindow = document.body.appendChild( desktopWindow( file ) );
        }

        // Create taskbar item in tabsdiv
        var taskBarButton = document.querySelector( '.tabsDiv' ).appendChild( taskWindow( file ) );

        // Add event listener
        taskBarButton.addEventListener( "click", function() {

            // If window hidden
            if ( appWindow.style.display === "none" ) {
                
                // Bring window to front
                appWindow.style.display = "block";

                // Change styling for taskBarButton
                //taskBarButton.className = "tabsDiv";
            }
            else {

                // Hide window
                appWindow.style.display = "none"; 

                // Change styling for taskBarButton
                //taskBarButton.className = "startMenu";
            }


        }.bind( appWindow ) );

    }.bind( file ) );

    // Append
    iconName.appendChild( iconTitle );
    icon.appendChild( iconImage );
    icon.appendChild( lb )
    icon.appendChild( iconName );

    // Return
    return icon;

}

// Make Window
function desktopWindow( file ) {
    
    // Create new window container div element
    var windowContainer             = document.createElement( "div" );
        windowContainer.className   = "window container resizable";
    
    // Pulling files from computer
    var compFiles = getFiles( file.path );

    // Create components
    var headerObj = header( windowContainer, file );
    var bodyObj    = body( compFiles, file );
    var footerObj    = footer( compFiles.length );

    // Make Draggable
    headerObj.addEventListener( 'mousedown', handleMouseDown );

    // Append Window Container
    windowContainer.append( headerObj );
    windowContainer.append( bodyObj );
    windowContainer.append( footerObj );
    
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
        controlPanel.className  = "controlPanel container";

    // Create minimize button
    var minimize            = document.createElement( "button" );
        minimize.append( document.createTextNode( "_" ) );
        minimize.onclick    = function() {

            // Minimize Window
            parent.style.display = "none";
        };

    // Create re-size button
    var resize          = document.createElement( "button" );
        resize.append( document.createTextNode( "[]" ) );
        resize.onclick  = function() {

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
        close.append( document.createTextNode( "X" ) );
        close.onclick   = function() { 

            // Remove Window
            parent.remove();

            // Remove TaskBar Pop Up
            document.getElementById( "window-" + file.name ).remove();
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
        footer.className    = "container footer";
    
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

// Read file from webserver with ajax
function loadFile( filePath ) {

    // Define files;
    var files = [];

    // Pass arguments to PHP
    $.ajax({
        type: 'POST',
        url: './windowBody.php',
        data: { path: filePath },
        async: false,
        success: function( data ) { files = data; },
        error: function( data ) { console.log("fail: ", data);}
    });
    
    // Return
    return files;
}

// Iterate through path
function getFiles( path ) {
    
    // Define File
    var file = loadFile( path );
    
    // Remove first two (., ..) files
    file = file.slice( 2, file.length );

    // Return
    return file;
}

// Function to handle mouse down event
function handleMouseDown( event ) {
    
    // Calculate the offset between mouse position and the top left corner of the parent div
    offsetX = event.clientX - event.target.parentElement.offsetLeft;
    offsetY = event.clientY - event.target.parentElement.offsetTop;

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
    event.target.parentElement.style.left = newX + 'px';
    event.target.parentElement.style.top = newY + 'px';
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