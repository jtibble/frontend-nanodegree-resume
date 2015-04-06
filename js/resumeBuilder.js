var locations = [];

var replaceWithValue = function( globalVariableName, value ){
    return window[globalVariableName].replace('%data%', value);
}

var renderBio = function(){
    $('#header').prepend( replaceWithValue('HTMLheaderRole', this.role) );
    $('#header').prepend( replaceWithValue('HTMLheaderName', this.name) );

    var targets = ['#topContacts', '#footerContacts'];
    for( var i in targets ){
        $(targets[i]).append( replaceWithValue('HTMLmobile', this.contacts.mobileNumber));
        $(targets[i]).append( replaceWithValue('HTMLemail', this.contacts.email));
        $(targets[i]).append( replaceWithValue('HTMLgithub', this.contacts.github));
        $(targets[i]).append( replaceWithValue('HTMLtwitter', this.contacts.twitter));
        $(targets[i]).append( replaceWithValue('HTMLlocation', this.contacts.location));
    };

    $('#header').append( replaceWithValue('HTMLbioPic', this.biopic) );
    $('#header').append( replaceWithValue('HTMLwelcomeMsg', this.welcomeMessage) );

    $('#header').append( replaceWithValue('HTMLskillsStart', this.skills[i]) );   

    for( var i in this.skills ){
        $('#header').append( replaceWithValue('HTMLskills', this.skills[i]) );   
    }

    locations.push( this.contacts.location );
};

var renderWork = function(){
    for( var i in this.jobs ){
        var job = this.jobs[i];
        
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

var renderProjects = function(){
    
    for( var i in this.projects ){
        var project = this.projects[i];
        
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

var renderEducation = function(){
    
    for( var i in this.education){
        var education = this.education[i];
        
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

var bioPromise = $.getJSON('data/bio.json', function(bio){
    bio.render = renderBio;
    bio.render();
});

var workPromise = $.getJSON('data/work.json', function(work){
    work.render = renderWork;
    work.render();
});

var projectsPromise = $.getJSON('data/projects.json', function(projects){
    projects.render = renderProjects;
    projects.render();
});

var educationPromise = $.getJSON('data/education.json', function(education){
    education.render = renderEducation;
    education.render();
});

$.when( bioPromise, workPromise, projectsPromise, educationPromise ).then( initializeMap );


