/**
 * Author: Kate Tran
 * Javascript file for desktop icon usage
 */

// Make Desktop Icon
function desktopIcon( path ) {

    //Get File Name
    var title = path.substring( path.lastIndexOf('/') + 1);

    // Create new icon div element
    var icon = document.createElement( "div" );
        icon.className = "icon";

    // Create new icon image
    var iconImage = document.createElement( "img" );
        iconImage.className = 'folder';
    
    // Create image    
    var image = iconImage.style.backgroundImage = "url('./images/openFolder.png')";
    
    // Create lineBreak
    var lb = document.createElement( "br" );

    // Create new icon name
    var iconName = document.createElement( "span" );
        iconName.className = "icon-text";

    // Create new icon title
    var iconTitle = document.createTextNode( title );

    // Add event listener
    icon.ondblclick = function() { document.body.appendChild( desktopWindow( image, title, "./projects" ) ); };

    // Append
    iconName.appendChild( iconTitle );
    icon.appendChild( iconImage );
    icon.appendChild( lb )
    icon.appendChild( iconName );

    // Return
    return icon;

}

