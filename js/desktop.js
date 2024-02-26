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
                taskBarButton.classList.add( "open" );
                taskBarButton.classList.remove( "closed" );
            }
            else {

                // Hide window
                appWindow.style.display = "none"; 

                // Change styling for taskBarButton
                taskBarButton.classList.add( "closed" );
                taskBarButton.classList.remove( "open" );
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