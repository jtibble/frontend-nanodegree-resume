/* Populate Header */

var replaceWithValue = function( globalVariableName, value ){
    return window[globalVariableName].replace('%data%', value);
}

var processBioJSON = function(bio){
    console.log('running');
    $('#header').prepend( replaceWithValue('HTMLheaderRole', bio.role) );
    $('#header').prepend( replaceWithValue('HTMLheaderName', bio.name) );
    
    $('#topContacts').append( replaceWithValue('HTMLmobile', bio.contacts.mobileNumber));
    $('#topContacts').append( replaceWithValue('HTMLemail', bio.contacts.email));
    $('#topContacts').append( replaceWithValue('HTMLgithub', bio.contacts.github));
    $('#topContacts').append( replaceWithValue('HTMLtwitter', bio.contacts.twitter));
    $('#topContacts').append( replaceWithValue('HTMLlocation', bio.contacts.location));
    
    $('#header').append( replaceWithValue('HTMLbioPic', bio.biopic) );
    $('#header').append( replaceWithValue('HTMLwelcomeMsg', bio.welcomeMessage) );
    
    $('#header').append( replaceWithValue('HTMLskillsStart', bio.skills[i]) );   
    
    for( var i in bio.skills ){
        $('#header').append( replaceWithValue('HTMLskills', bio.skills[i]) );   
    }
};

var processWorkJSON = function(work){
    for( var i in work.jobs ){
        var job = work.jobs[i];
        
        $('#workExperience').append( HTMLworkStart );
        var employerAndTitle = replaceWithValue( 'HTMLworkEmployer', job.employer) +
                                replaceWithValue( 'HTMLworkTitle', job.title );
        $('#workExperience .work-entry:last').append( employerAndTitle );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkDates', job.datesWorked ) );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkLocation', job.location ) );
        $('#workExperience .work-entry:last').append( replaceWithValue( 'HTMLworkDescription', job.description ) );
    }
};

var processProjectsJSON = function(projects){
    
var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';
    
    for( var i in projects.projects ){
        var project = projects.projects[i];
        
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

var processEducationJSON = function(education){
};

$.getJSON('/data/bio.json', {}, processBioJSON); 
$.getJSON('/data/work.json', {}, processWorkJSON);
$.getJSON('/data/projects.json', {}, processProjectsJSON);
$.getJSON('/data/education.json', {}, processEducationJSON);