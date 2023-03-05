<?php

    header( 'Content-Type: application/json' );

    // Define Array
    $arrFiles = array();

    // If succeed
    if( isset( $_POST[ 'path' ] ) ) {
        
        // Define directory
        $dir = $_POST[ 'path' ];

        // Open directory
        $handle = opendir( $dir );

        // If success
        if ( $handle ) {

            // While entry exists
            while ( ( $entry = readdir( $handle ) ) !== FALSE ) {
                
                // Append
                $arrFiles[] = $entry;
            }
        }

        // Close directory
        closedir( $handle );
    }

    //Return
    echo json_encode( $arrFiles );
?>