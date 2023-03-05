/**
 * Author: Kate Tran
 * Javascript file for window usage
 */

// Make Window
function desktopWindow( image, title, path ) {

    // Create new window container div element
    var windowContainer = document.createElement( "div" );
        windowContainer.className = "window container";

    // Obtain file count
    var count = 0;
    
    // Append Window Container
    windowContainer.append( header( windowContainer, image, title ) );
    windowContainer.append( body( path ) );
    windowContainer.append( footer( count ) );

    // Make window draggable
    //dragWindow( windowContainer );

    // Return
    return windowContainer;
}

// Make Header
function header( parent, image, title ) {

    // Create new header div element
    var header = document.createElement( "div" );
        header.className = "header";
    
    // Create new headerTitle div element
    var headerTitle = document.createElement( "div" );
        headerTitle.className = "headerTitle";
    
    // Create new headerImage image
    var headerImage = document.createElement( "img" );
        headerImage.className = 'windowIcon container';
        headerImage.style.backgroundImage = image;
    
    // Create new header path
    var headerPath = document.createElement( "div" );
        headerPath.append( document.createTextNode( "C:\\" + title ) );
        headerPath.className = "headerPath";

    // Create new control panel div element
    var controlPanel = document.createElement( "div" );
        controlPanel.className = "controlPanel container";

    // Create minimize button
    var minimize = document.createElement( "button" );
        minimize.append( document.createTextNode( "_" ) );

    // Create re-size button
    var resize = document.createElement( "button" );
        resize.append( document.createTextNode( "[]" ) );

    // Create close button
    var close = document.createElement( "button" );
        close.append( document.createTextNode( "X" ) );
        close.onclick = function() { parent.remove(); };

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

    // Return
    return header;
}

// Make Body
function body( path ) {

    // Create new body div element
    var body = document.createElement( "div" );
        body.className = "windowBody container";
    
    // Define File
    var file = loadFile( path );
    console.log( "file: ", file );
    return;
    // Traverse path
    // for ( file.name in path ) {

    //     // Create icon
    //     var project = icon( 'folder', file );

    //     // Append body
    //     body.append( project );
    // }

    // Return
    return body;
}

// Make Footer
function footer( count ) {

    // Create new footer div element
    var footer = document.createElement( "div" );
        footer.className = "container footer";
    
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

    // Define result
    var result = null;

    // Create request to pull from server
    var xmlhttp = new XMLHttpRequest();

    // Open file
    xmlhttp.open("GET", filePath, false);

    // Send results
    xmlhttp.send( null );

    //
    var ret = xmlhttp.responseText;
    result = ret.split('\n');
    console.log( 'fileList: ', fileList );
    for (i = 0; i < result.length; i++) {
        var fileinfo = result[i].split(' ');
        if (fileinfo[0] == '201:') {
            document.write(fileinfo[1] + "<br>");
            document.write('<img src=\"' + directory + fileinfo[1] + '\"/>');
        }
    }
    return result;
  }
