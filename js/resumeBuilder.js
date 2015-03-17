var locations = [];

var replaceWithValue = function( globalVariableName, value ){
    return window[globalVariableName].replace('%data%', value);
}

var processBioJSON = function(bio){
    $('#header').prepend( replaceWithValue('HTMLheaderRole', bio.role) );
    $('#header').prepend( replaceWithValue('HTMLheaderName', bio.name) );
    
    
    //Top section
    $.each(['#topContacts', '#footerContacts'], function(index, target){
        $(target).append( replaceWithValue('HTMLmobile', bio.contacts.mobileNumber));
        $(target).append( replaceWithValue('HTMLemail', bio.contacts.email));
        $(target).append( replaceWithValue('HTMLgithub', bio.contacts.github));
        $(target).append( replaceWithValue('HTMLtwitter', bio.contacts.twitter));
        $(target).append( replaceWithValue('HTMLlocation', bio.contacts.location));
    });
    
    $('#header').append( replaceWithValue('HTMLbioPic', bio.biopic) );
    $('#header').append( replaceWithValue('HTMLwelcomeMsg', bio.welcomeMessage) );
    
    $('#header').append( replaceWithValue('HTMLskillsStart', bio.skills[i]) );   
    
    for( var i in bio.skills ){
        $('#header').append( replaceWithValue('HTMLskills', bio.skills[i]) );   
    }
    
    locations.push( bio.contacts.location );
};

var processWorkJSON = function(data){
    for( var i in data.jobs ){
        var job = data.jobs[i];
        
        $('#workExperience').append( HTMLworkStart );
        var employerAndTitle = replaceWithValue( 'HTMLworkEmployer', job.employer) +
                                replaceWithValue( 'HTMLworkTitle', job.title );
        $('#workExperience .work-entry:last').append( employerAndTitle );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkDates', job.datesWorked ) );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkLocation', job.location ) );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkDescription', job.description ) );
        locations.push( job.location );
    }
};

var processProjectsJSON = function(data){
    
    for( var i in data.projects ){
        var project = data.projects[i];
        
        $('#projects').append( HTMLprojectStart );
        $('#projects .project-entry:last').append( replaceWithValue( 'HTMLprojectTitle', project.title ));
        $('#projects .project-entry:last').append( replaceWithValue( 'HTMLprojectDates', project.datesWorked ));
        $('#projects .project-entry:last').append( replaceWithValue( 'HTMLprojectDescription', project.description ));
                                                        
        for( var j in project.images ){
            var image = project.images[j];
            
            $('#projects .project-entry:last').append( replaceWithValue( 'HTMLprojectImage', image ));
        }
    }

};

var processEducationJSON = function(data){
    
    for( var i in data.education){
        var education = data.education[i];
        
        $('#education').append( HTMLschoolStart );
        
        var schoolString = replaceWithValue( 'HTMLschoolName', education.name) + replaceWithValue('HTMLschoolDegree', education.degree);
        
        $('#education .education-entry:last').append( schoolString );
        $('#education .education-entry:last').append( replaceWithValue( 'HTMLschoolDates', education.datesAttended));
        $('#education .education-entry:last').append( replaceWithValue( 'HTMLschoolLocation', education.location));
        $('#education .education-entry:last').append( replaceWithValue( 'HTMLschoolMajor', education.majors));
        $('#education .education-entry:last').append( replaceWithValue( 'HTMLonlineURL', education.url));
     
        locations.push( education.location );
    }
};


$('#mapDiv').append( window.googleMap );

$.when(
    $.getJSON('/data/bio.json', {}, processBioJSON),
    $.getJSON('/data/work.json', {}, processWorkJSON),
    $.getJSON('/data/projects.json', {}, processProjectsJSON),
    $.getJSON('/data/education.json', {}, processEducationJSON) 
).then( initializeMap );


