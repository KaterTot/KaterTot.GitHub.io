/**
 * Author: Kate Tran
 * Javascript file for desktop icon usage
 */

// Make Desktop Icon
function desktopIcon( file ) {
  
    //Get File Name
    file.name = file.path.substring( file.path.lastIndexOf('/') + 1);
    
    // Create new icon div element
    var icon            = document.createElement( "div" );
        icon.className  = "icon";

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
        
        // Check if file or Directory - get an error bc cannot opendir of a txt file

        // Open Desktop Window Popup
        var appWindow = document.body.appendChild( desktopWindow( file ) ); 

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
        windowContainer.className   = "window container";
    
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
        controlPanel.className  = "controlPanel container";

    // Create minimize button
    var minimize            = document.createElement( "button" );
        minimize.append( document.createTextNode( "_" ) );
        minimize.onclick    = function() {

            // Minimize Window
            parent.style.display = "none";
        };

    // Create re-size button
    var resize = document.createElement( "button" );
        resize.append( document.createTextNode( "[]" ) );

    // Create close button
    var close           = document.createElement( "button" );
        close.append( document.createTextNode( "X" ) );
        close.onclick   = function() { 

            // Remove Window
            parent.remove();

            // Remove TaskBar Pop Up
            document.querySelector( "#" + file.name ).remove();
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
        var fileObj = { name: "", path: path, image: "url('./images/openFolder.png')"};

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

/*https://cdn.jsdelivr.net/gh/KaterTot/katertot.github.io/projects/*/