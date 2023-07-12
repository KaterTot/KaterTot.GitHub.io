/**
 * Author: Kate Tran
 * Javascript file for desktop icon usage
 */

// Make Desktop Icon
function desktopIcon( path, image ) {

    //Get File Name
    var title = path.substring( path.lastIndexOf('/') + 1);

    // Create new icon div element
    var icon = document.createElement( "div" );
        icon.className = "icon";

    // Create new icon image
    var iconImage = document.createElement( "img" );
        iconImage.className = 'folder';
        iconImage.style.backgroundImage = image;
    
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


// Make TaskBar
function taskBar() {

    // Create task bar div
    var taskBar = document.createElement( "div" );
        taskBar.className = "taskBar";

    // Create start button
    var startMenu = document.createElement( "button" );
        startMenu.innerText = "Start";
        startMenu.className = "startMenu";

    
    // Create tabs div
    var tabsDiv = document.createElement( "div" );

    // Create time div
    var timeDiv = document.createElement( "div" );
        timeDiv.className = "timeDiv";

    // Get local time
    var currentTime = new Date();
    
    // Add to timeDiv
    timeDiv.innerText = currentTime.toLocaleString( 'en-US', { hour: 'numeric', minute: 'numeric', hour12: true } );

    // Append
    taskBar.appendChild( startMenu );
    taskBar.appendChild( tabsDiv );
    taskBar.appendChild( timeDiv );
    
    // Return
    return taskBar;
}