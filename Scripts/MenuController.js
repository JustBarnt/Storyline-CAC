/**
* @description Controlls a custom Menu for SL Modules
* @author Brent Williams <functnal@gmail.com> (https://www.github.com/JustBarnt)
* @class MenuController
* 
* @param {Array} modal Array of items in the background. EX: Modal, Title, TitleBar -- Use the same accessibilty name for them.
* @param {Array} content Array of items in the foregroud. EX: Slide links, buttons. -- Use naming convention TOC-Modal-Content-# when naming.
* @param {String} seachIndex Accesibility name of exluding the number at the end. EX: 'TOC-Modal-Content'.
* @param {String} sl_variable Name of the SL variable used to control menu opening and closing.
*/

class MenuController
{
	#player;
	#modal;
	#content;
	#SL_menuOpen

	constructor(modal, content, seachIndex, sl_variable)
	{
		this.#player = GetPlayer() ? GetPlayer() : console.error('No Player was found this script is used for Storyline 360 only');
		this.#modal = modal;
		this.#content = this.#GatherContent(content, seachIndex);
		this.#SL_menuOpen = this.#player.GetVar(sl_variable);
		
		this.#modal.forEach((item) => { gsap.set(item, { opactiy: 0, scaleX: 0, scaleY: 0}) });
		this.#content.forEach((slide) => { gsap.set(slide, { opactiy: 0 }) });
	}

	/**
	* @description Gathers the correct content for the menu and sorts it.
	* @author Brent Williams <brent.williams@ddincmail.org> (https://www.github.com/DDincBrent).
	* @method GatherContent #Private
	* 
	* @param {Array} content Array of NodeSelectors.
	* @param {String} seachIndex Accesibility name to compare against.
	* 
	*/
	
	#GatherContent(content,seachIndex)
	{
		content.forEach((item, i) => 
		{
			if(!item.getAttribute('data-acc-text').includes(seachIndex))
				content.splice(i,1);
		});

		content.sort((a,b) => 
		{
			const valueA = a.getAttribute('data-acc-text').split('-')[3];
			const valueB = b.getAttribute('data-acc-text').split('-')[3];

			return valueA - valueB;
		});

		console.log(`Content has been gathered and sorted numerically by ascending order.`)
		return content;
	}

	/**
	* @description Animates the items apart of the menu controller.
	* @author Brent Williams <brent.williams@ddincmail.org> (https://www.github.com/DDincBrent).
	* @method Animate
	* 
	* @param {Object} anim_props An object containing all the animation properties.
	* 
	*/
	
	Animate(anim_props) //TASK ADD IN OBJECT FOR DYNAMIC PROPERTIES
	{
		const menuOpen = this.#SL_menuOpen;
		const modal = this.#modal;
		const content = this.#content;

		const menuAnimation = gsap.timeline({ paused: true, defaults: anim_props });
		const contentAnimation = gsap.timeline({ delay: 0.5, paused: true, defaults: anim_props });

		modal.forEach((child) =>
		{
			gsap.set(child, { opacity: 0, transformOrigin: 'center' });

			switch(menuOpen)
			{
				case true: 
					menuAnimation.to(child, {overwrite: true });
					menuAnimation.play();
					break;

				case false:
					menuAnimation.to(child, { overwrite: true });
					menuAnimation.reverse(0);
					break;
			}	
		})

		content.forEach((child) =>
		{ 
			gsap.set(child, { opacity:0 });

			switch(menuOpen)
			{
				case true:
					contentAnimation.to(child, { overwrite: true }, 0);
					contentAnimation.play();
					break;

				case false:
					contentAnimation.to(child, { overwrite: true }, 0)
					contentAnimation.reverse(0);
					break;
			}		
		});

		if(!menuOpen)
		{
			const delay = (menuAnimation.vars.defaults.duration + contentAnimation.vars.defaults.duration)*1000; //Translate to milliseconds
			let menuTimeout = setTimeout(this.#HideMenuLayer(true), delay);
			clearTimeout(menuTimeout);
		}
	}

	/**
	* @description Hides storyline menu layer
	* @author Brent Williams <brent.williams@ddincmail.org> (https://www.github.com/DDincBrent)
	* @Method HideMenuLayer #Private
	*
	* @param {Boolean} bool True: Hide menu, False: show menu
	*/
	#HideMenuLayer(bool)
	{
		const hidden = bool;
		const menuParent = this.#modal.parentElement

		let classAtt = menuParent.getAttribute('class');
		switch(hidden)
		{
			case false:
				console.log('Showing Menu Layer');
				bg.setAttribute('class', classAtt.replace('hidden', 'shown'));
			break;
			case true:
				console.log('Hiding Menu Layer');
				bg.setAttribute('class', classAtt.replace('shown', 'hidden'));
			break;
		}
	}
}
