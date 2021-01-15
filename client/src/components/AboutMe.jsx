import React from "react";
import { v4 as uuidv4 } from 'uuid';
import AboutMeCard from "./AboutMeCard";
import cards from "./AboutMeCardContent";


function AboutMe() {
	function createCard(card, i) {
		return (
			<div className="col-xl-3 col-lg-6">
				<AboutMeCard
					key={uuidv4()}
					id={"card_"+card.id}
					imgSrc={card.imgSRC}
					imgAlt={card.imgALT}
					cardTitle={card.textHead}
					cardContent={card.textContent}
					
				/>
			</div>
		  );
	}

	const aboutMeFirstRow = cards.filter(item => item.id < 4);
	const aboutMeLastRow = cards.filter(card => card.id >= 4);


	return (
		<div className="component-wrapper">
			<section className="about-me white-background" id="about-me">
				<div className="section-content">
					<div className="row">
						<div className="col-12">
							<h1 className="heading">About Me</h1>
							<p className="subtitle">Viele Informationen können Sie ja schon meinen Bewerbungsunterlagen entnehmen. Ein paar Key Facts über mich möchte ich Ihnen gerne hier geben:</p>
						</div>

					{/* TOP LINE */}
						{aboutMeFirstRow.map(createCard)}

					{/* MOTTO LINE */}
						<div className="col-12 motto-div">
							<div className="motto">
								<h2>„Es ist nie zu spät, das zu werden, was man hätte sein können.“</h2>
								<p><i>George Eliot</i></p>
							</div>
						</div>

					{/* BOTTOM LINE */}
						{aboutMeLastRow.map(createCard)}

					</div>
				</div>
			</section>
		</div>
	);
}

export default AboutMe;