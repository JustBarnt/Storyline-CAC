/**
* @description Controlls a the Progress Element
* @author Brent Williams <brent.williams@ddincmail.org> (https://www.github.com/DDincBrent).
* @class CaptionController
* 
* @param {NodeList} progress Node Selector of the progress bar.
* @param {String} SL_Init Name of the SL variable used to make sure the bar is only scaled and hidden one time.
*/

const { toughCookie } = require("jsdom");

class CaptionController
{
	#player
	#progress;
	#SL_Init

	constructor(progress, initialized)
	{
		this.#player = GetPlayer() ? GetPlayer() : console.error('No Player was found this script is used for Storyline 360 only');
		this.#progress = progress;
		this.#SL_Perc = this.#player.GetVar(perc);
		this.#SL_Init = this.#player.GetVar(initialized);

		if(!this.#SL_Init)
		{
			gsap.set(this.#progress, { transformOrigin: 'center left', scaleX: 0.01, scaleY:1 });
			this.#player.SetVar(initialized, true);
		}	
	}

	Animate(anim_props)
	{
		const progressBar = this.#progress;
		gsap.to(progressBar, anim_props);
	}
}