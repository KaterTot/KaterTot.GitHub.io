/**
 * Author: Kate Tran
 * Javascript file for window usage
 */

// Make Window
function desktopWindow( image, title ) {

    // Create new window container div element
    var windowContainer = document.createElement( "div" );
        windowContainer.className = "window";

    // Append Window Container
    windowContainer.append( header( image, title ) );
    //windowContainer.append( body() );
    //windowContainer.append( footer() );

    // Return
    return windowContainer;
}

// Make Header
function header( image, title ) {

    // Create new header div element
    var header = document.createElement( "div" );
        header.className = "header";
    
    // Create new headerTitle div element
    var headerTitle = document.createElement( "div" );
        headerTitle.className = "headerTitle";
    
    // Create new headerImage image
    var headerImage = document.createElement( "img" );
        headerImage.className = 'windowIcon';
        headerImage.style.backgroundImage = image;
    
    // Create new header path
    var headerPath = document.createElement( "div" );
        headerPath.append( document.createTextNode( "C:\\" + title ) );
        headerPath.className = "headerPath";

    // Create new control panel div element
    //var controlPanel = document.createElement( "div" );
        //controlPanel.className = "icon";

    // Append HeaderTitle
    headerTitle.append( headerImage );
    headerTitle.append( headerPath );

    // Append Control Panel

    // Append Header
    header.append( headerTitle );
    //header.append( controlPanel );

    // Return
    return header;
}

// Make Body
function body() {

    // Create new body div element
    var body = document.createElement( "div" );
        //header.className = "icon";
    
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
        //footer.className = "icon";
    
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