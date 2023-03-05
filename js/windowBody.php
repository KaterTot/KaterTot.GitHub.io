<?php

    header( 'Content-Type: application/json' );

    // Define Array
    $arrFiles = array();

    // If no arguments, throw error
    if( !isset( $_POST[ 'arguments' ] ) ) { $arrFiles[ 'error' ] = 'No function arguments!'; }

    // If succeed
    if( !isset($aResult['error']) ) {
        
        // Define directory
        $dir = $_POST[ 'arguments' ];

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

    // Return
    echo json_encode( $arrFiles[] );
?>