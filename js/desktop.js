/**
 * Author: Kate Tran
 * Javascript file for desktop icon usage
 */

// Make Desktop Icon
function desktopIcon( file ) {
  
    //Get File Name
    file.name = file.path.substring( file.path.lastIndexOf('/') + 1);
    
    // Create new icon div element
    var icon = document.createElement( "div" );
        icon.className = "icon";

    // Create new icon image
    var iconImage = document.createElement( "img" );
        iconImage.className = 'folder';
        iconImage.style.backgroundImage = file.image;
    
    // Create lineBreak
    var lb = document.createElement( "br" );

    // Create new icon name
    var iconName = document.createElement( "span" );
        iconName.className = "icon-text";

    // Create new icon title
    var iconTitle = document.createTextNode( file.name );

    // Add event listener
    /*icon.ondblclick = function( file ) { 
        console.log( "file: ", file )
        // Open Desktop Window Popup
        document.body.appendChild( desktopWindow( file ) ); 

        // Create taskbar item
    };*/

    // Add event listener
    icon.addEventListener( "dblclick", function() {
        
        // Open Desktop Window Popup
        document.body.appendChild( desktopWindow( file ) ); 

        // Create taskbar item in tabsdiv
        file.taskBar.querySelector( '.tabsDiv' ).appendChild( taskWindow( file ) );

    }.bind( file ) );

    // Append
    iconName.appendChild( iconTitle );
    icon.appendChild( iconImage );
    icon.appendChild( lb )
    icon.appendChild( iconName );

    // Return
    return icon;

}