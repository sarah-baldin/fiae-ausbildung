import React, {useEffect} from "react";

function Teaser() {
	useEffect(() => {
		var avatar = document.getElementById("avatar");
		
		function clickHandler() {
			console.log("test");
		}
		
		avatar.addEventListener("click", clickHandler);
		return () => window.removeEventListener("click", clickHandler);
	  });
	  

	  const date = new Date();
	  const currentTime = date.getHours();
	
	  let daytime;
	
	  if (currentTime < 12) {
		daytime = "Guten Morgen";
	  } else if (currentTime < 18) {
		daytime = "Guten Tag";
	  } else {
		daytime = "Guten Abend";
	  }

	return (
		<div className="component-wrapper">
			<section className="jumbotron colored-background" id="home">
				<div className="section-content">
					<div id="avatar-div">
						<div id="bubble"></div>
						<img className="avatar img-fluid" id="avatar" onClick={saySomething} src="./images/newAvatarSVG.svg" alt="Avatar" />
					</div>
					<div className="row">
						<div className="col-12">
							<h1 className="display-4 jumbotron-headline">{daytime}, ich bin Sarah</h1>
							<p className="lead">...und ich suche einen Ausbildungsplatz zur Anwendungsentwicklerin!</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Teaser;