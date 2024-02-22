/**
 * Author: Kate Tran
 * Javascript file for taskBar usage
 */

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
        tabsDiv.className = "tabsDiv";

    // Create time div
    var timeDiv = document.createElement( "div" );
        timeDiv.className = "timeDiv";

    // Update time every second
    setInterval( function() {
        
        // Get local time
        var currentTime = new Date();
    
        // Add to timeDiv
        timeDiv.innerText = currentTime.toLocaleString( 'en-US', { hour: 'numeric', minute: 'numeric', hour12: true } );
    }, 1000 );

    // Append
    taskBar.appendChild( startMenu );
    taskBar.appendChild( tabsDiv );
    taskBar.appendChild( timeDiv );
    
    // Return
    return taskBar;
}

// Make Task Window (The pop up on task bar)
function taskWindow( file ) {
    
    // Create window div
    var window = document.createElement( "div" );
        window.className = "taskBarPopUp open";
        window.id = "taskBar-" + file.name;

    // Create image div
    var fileImage = document.createElement( "img" );

    // Append
    window.appendChild( fileImage );

    // Include Name
    window.innerText = file.name;

    // Return
    return window;
}