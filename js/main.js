$(document).ready(function(){
	//console.log('Reaady');
	$('#searchUser').on('keyup',function(e){
		//console.log(e.target.value);
		let username = e.target.value;


		//making request to github

	$.ajax({
		url:'https://api.github.com/users/'+username,
		data:{
			client_id:'c770f51ba384601e5b13',
			client_secret:'a4e39feb4d41550cfcc02b926a8a03e856d8148e'
		}
	}).done(function(user){

		//making an ajax request for the repositories
		$.ajax({
			url:'https://api.github.com/users/'+username+'/repos', 
			data:{
				client_id:'c770f51ba384601e5b13',
				client_secret:'a4e39feb4d41550cfcc02b926a8a03e856d8148e',
				sort: 'created_at asc',
				per_page: 5
		}
		}).done(function(repos){
			//console.log(repos);
			$.each(repos,function(index,repo){
				$('#repos').append(`
					<div class="well">
						<div class="row">
							<div class="col-md-7">
								<strong>${repo.name}</strong> : ${repo.description} 
							</div>
							<div class="col-md-3">
								<span class="label label-default">Forks: ${repo.forks_count}</span>								
								<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
								<span class="label label-default">Stars: ${repo.stargazers_count}</span> 
							</div>
							<div class="col-md-2">
								<a href="${repo.html_url} target="_blank" class="btn btn-default">Repo Page</a>
							</div>
						</div>
					</div>
				`);
			})
		});

		//putting the fetched information into out html page
		$('#profile').html(`
			<div class="panel panel-default">
  			<div class="panel-heading">
    		<h3 class="panel-title">${user.name}</h3>
  			</div>
  			<div class="panel-body">
    			<div class="row">
    				<div class="col-md-3">
    					<img class="thumbnail avatar" src="${user.avatar_url}">
    					<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Complete Profile</a>
    				</div>
    				<div class="col-md-9">
    					<span class="label label-default">Public Repos: ${user.public_repos}</span>
						<span class="label label-primary">Public Gists: ${user.public_gists}</span>
						<span class="label label-success">Followers: ${user.followers}</span>
						<span class="label label-info">Following: ${user.following}</span>
						<br>
						<br> 
						<ul class="list-group">
							<li class="list-group-item">Company: ${user.company}</li>
							<li class="list-group-item">Website/blogs: ${user.blog}</li>
							<li class="list-group-item">Location: ${user.location}</li>
							<li class="list-group-item">Member Since: ${user.created_at}</li>
						</ul>
    				</div>
    			</div>
  			</div>
			</div> 

			<h3 class="page-header">Latest Repos</h3>
			<div id="repos"></div>
		`);
	});

	});
});