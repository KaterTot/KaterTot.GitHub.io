/**
 * Author: Kate Tran
 * Javascript file for projectWindow usage
 */

// Make projectWindow
function projectWindow( projectFile ) {

    // Create new project container div element
    var projectContainer = document.createElement( "div" );
        projectContainer.className = "projectWindow";

    // Create body div
    var projectBody = document.createElement( "div" );
        projectBody.className = "windowBody projBody";

    // Append projectBody
    projectBody.append( descriptionBox() );
    projectBody.append( imageBox() );
    projectBody.append( codeBox() );

    // Append container
    projectContainer.append( header( projectContainer, projectFile ) );
    projectContainer.append( projectBody );

    // Return
    return projectContainer;
}

// Make description div
function descriptionBox( ) {

    // Create div
    var descriptionDiv  = document.createElement( "div" );
        descriptionDiv.className = "bodyBox";

    // Return
    return descriptionDiv;
}

// Make image div
function imageBox( ) {

    // Create div
    var imageDiv  = document.createElement( "div" );
        imageDiv.className = "bodyBox";

    // Return
    return imageDiv;
}

// Make code div
function codeBox( ) {

    // Create div
    var codeDiv  = document.createElement( "div" );
        codeDiv.className = "bodyBox";

    // Return
    return codeDiv;
}
