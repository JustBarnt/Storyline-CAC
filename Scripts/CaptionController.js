/**
* @description Controlls a the CC Text in SL
* @author Brent Williams <functnal@gmail.com> (https://www.github.com/JustBarnt).
* @class CaptionController
* 
* @param {NodeList} caption Node Selector of the CC Box
* @param {String} sl_variable Name of the SL variable used to control CC opening and closing.
*/

class CaptionController
{
	#player
	#caption;
	#SL_ccActive

	constructor(caption, sl_variable)
	{
		this.#player = GetPlayer() ? GetPlayer() : console.error('No Player was found this script is used for Storyline 360 only');
		this.#caption = caption;
		this.#SL_ccActive = this.#player.GetVar(sl_variable);

		gsap.set(this.#caption, { transformOrigin: 'center', scaleX: 1, scaleY:1, opacity: 0 });
	}

	Animate()
	{
		const caption = this.#caption;
		const ccActive = this.#SL_ccActive;

		switch(ccActive)
		{
			case true:
				gsap.to(caption, { duration: 0.5, scaleX: 1, scaleY:1, opacity: 1, ease: Power4.easeIn });
				break;

			case false:
				gsap.to(caption, { duration: 0.5, scaleX: 0, scaleY:0, opacity: 0, ease: Power4.easeIn });
				break;
		}
	}
}
