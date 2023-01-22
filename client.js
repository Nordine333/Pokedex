/* ******************************************************************
 * Constantes de configuration
 * ****************************************************************** */
const serverUrl = "https://lifap5.univ-lyon1.fr";

/* ******************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage de
 * l'utilisateur.
 * ****************************************************************** */

/**
 * Incremente la valeur du nombre de Pokemon à afficher de 10,
 * puis lance l'affichage des pokemons
 *
 * @param {Etat} etatCourant
 */
function AugmenteAffichage(etatCourant)
{
	etatCourant.PokemonAffichee += 10 ;
	formate_Affichage(etatCourant);
}

/**
 * Décrémente la valeur du nombre de Pokemon à afficher de 10, 
 * puis lance l'affichage des pokemons
 *
 * @param {Etat} etatCourant
 */
function ReduitAffichage(etatCourant)
{
	if(etatCourant.PokemonAffichee > 10 )
	{
		etatCourant.PokemonAffichee -= 10 ;
		formate_Affichage(etatCourant);
	}
	
}

/**
 * Crée un tableau contenant les pokemons de l'utilisateur
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
function VoirMesPokemons(etatCourant)
{
	etatCourant.MesPokemonsOuToutPokemon = 1;
	etatCourant.TableauMesPokemon = 
	fetchDeckID(etatCourant);
	Promise.all([etatCourant.TableauPokemon]).then(function(values) {
		Promise.all([etatCourant.TableauMesPokemon]).then(function(MesPokemons) {
			const pokemon_voulu = Array.from(values[0])
			.filter(n => MesPokemons[0].indexOf(n.PokedexNumber) > -1);
			etatCourant.TableauPokemon = pokemon_voulu;
			formate_Affichage(etatCourant);
		});
	});
	

}

/**
 * Crée un tableau contenant tout les pokemons
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
function AfficherToutPokemons(etatCourant)
{
	etatCourant.MesPokemonsOuToutPokemon = -1;
	Promise.all([etatCourant.TableauPokemon]).then(function(values) {
	  const ArrayProm = Array.from(values[0]);
	  etatCourant.TableauPokemon =  etatCourant.TableauPokemonConstant;
	  formate_Affichage(etatCourant);
	});
}

/**
 * Met à jour le numéro pokemon dont il faut
 * afficher les infos (celui sur lequel l'utilisateur
 * à cliqué).
 * Puis lance son affichage.
 *
 * @param event est un pointeur vers l'evenement, {Etat} etatCourant
 */
function ChangePokemonInfoAffichage(event,etatCourant) {
	
    etatCourant.InfoPokemonNb = event.currentTarget.id ; // je recupere l'ID grace
    formate_Affichage(etatCourant);                     // au pointeur de l'evenement

}

/**
 * Trie le tableau de pokemon selon le numéro de pokedex
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
async function TrieParNum(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
	if(etatCourant.Tri === "Num")
	{
		etatCourant.TriOrdre = -1 * etatCourant.TriOrdre; 
	}
	etatCourant.TableauPokemon =  
	await Promise.all( etatCourant.Tri === "Num" ? dataPokemon.reverse() :
    dataPokemon.sort((a,b) => a.PokedexNumber > b.PokedexNumber ? 1 : -1 ));
	etatCourant.Tri = "Num";

    formate_Affichage(etatCourant);
}


/**
 * Trie le tableau de pokemon selon l'ordre alphabétiques
 * des noms des pokemons 
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
async function TrieParNom(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
	if(etatCourant.Tri === "Nom")
	{
		etatCourant.TriOrdre = -1 * etatCourant.TriOrdre;
    }
	etatCourant.TableauPokemon = 
	await Promise.all( etatCourant.Tri === "Nom" ? dataPokemon.reverse() :
    dataPokemon.sort((a,b) => a.Name > b.Name ? 1 : -1 ));
	etatCourant.Tri = "Nom";
    
    formate_Affichage(etatCourant);
}

/**
 * Trie le tableau de pokemon selon l'ordre alphabétiques
 * des types des pokemons 
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
async function TrieParTypes(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
	if(etatCourant.Tri === "Types")
	{
		etatCourant.TriOrdre = -1 * etatCourant.TriOrdre; 
	}
	etatCourant.TableauPokemon = 
	await Promise.all( etatCourant.Tri === "Types" ? dataPokemon.reverse() :
    dataPokemon.sort((a,b) => a.Types > b.Types ? 1 : -1 ));
	etatCourant.Tri = "Types";
	
    formate_Affichage(etatCourant);
}

/**
 * Trie le tableau de pokemon selon l'ordre alphabétiques
 * des abilitées des pokemons 
 * puis lance l'affichage de ce dernier.
 *
 * @param {Etat} etatCourant
 */
async function TrieParAbilites(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
	if(etatCourant.Tri === "Abilites")
	{
		etatCourant.TriOrdre = -1 * etatCourant.TriOrdre; 
	}
	etatCourant.TableauPokemon = 
	await Promise.all( etatCourant.Tri === "Abilites" ? dataPokemon.reverse() :
    dataPokemon.sort((a,b) => a.Abilities > b.Abilities ? 1 : -1 ));
	etatCourant.Tri = "Abilites";
	
    formate_Affichage(etatCourant);
}

/**
 * Génère le code HTML permettant de faire
 * l'affichage du bouton d'ajout dans le Deck
 *
 * @returns un code html
 */
function Affichage_Bouton_Ajouter_Deck()
{
	return	`</figure>
           </figure>
          </article>
          </div>
          <div class="card-footer">
              <article class="media">
                <div class="media-content">
                  <button id="bouton-MAJ_deck" class="is-success button" tabindex="0">
                    Ajouter à mon deck
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>`
}

/**
 * Génère le code HTML de l'affichage du tableau de pokemon 
 * selon le nombre de pokemon que l'utilisateur
 * désire afficher
 *
 * @param {Etat} etatCourant
 * @returns un code html 
 */
async function formate_Affichage_Tableau_Pokemons(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;

	return  await Promise.all(
		dataPokemon.filter((n, index) => index < etatCourant.PokemonAffichee)
		.map(async (val,index) => {
		
	const clear_abilities =	val.Abilities.map( (value) =>  value + ' - ')
	.toString().replace(/-([^-]*)$/, '' + '$1')
	
	const clear_types =	val.Types.map( (value) =>  value + ' - ')
	.toString().replace(/-([^-]*)$/, '' + '$1')
	
    return `
		<div class="content" > <tr class="" id="${index}" > 
		<td> <img alt="${val.Name}"  src="${val.Images.Detail}"  width="64"
		</td> <td> <div class="content">  ${val.PokedexNumber} </div> </td>
		<td> <div class="content">  ${val.Name} </div> </td>
		<td> <ul> <li> ${clear_abilities} </li> </ul> </td>
		<td> <ul> <li> ${clear_types} </li> </ul> </td> </tr> </div> ` ; 
		
		 }
	   )
	)
}

/**
 * Formate l'affichage des abilitées du pokémon,
 * des resistances du pokemon
 * et des faiblesses du pokemon
 *
 * @param {Etat} etatCourant
 * @return un tableau comportant 
 * les 3 tableaux formatés
 * 
 */
function Formate_Info_Pokemon(InfoPokemon)
{
	const Tab_Against = Object.entries(InfoPokemon[0].Against);
	
	const formated_abilities = InfoPokemon[0].Abilities
	.map(n => '<li>' + n + '</li>')
	.toString().replaceAll(',', '');
	
	const formated_Resist  = Tab_Against.filter(([key, value]) => value < 1)
	.map( (value) => '<li>' + value[0] + '</li>')
	.toString().replaceAll(',', '');
	
	const formated_Weak = Tab_Against.filter(([key, value]) => value > 1)
	.map( (value) => '<li>' + value[0] + '</li>')
	.toString().replaceAll(',', '');
	
	return [formated_abilities,formated_Resist,formated_Weak];
}

/**
 * Génère le code HTML de l'affichage des 
 * infos du pokemon sur lequel l'utilisateur à cliquer
 *
 * @param {Etat} etatCourant
 * @returns un code html 
 */
async function formate_Affichage_Info_Pokemons(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
	
	const InfoPokemon = await Promise.all(
    dataPokemon.filter((val, index) => index == etatCourant.InfoPokemonNb));

	const TroisTableaux = Formate_Info_Pokemon(InfoPokemon); 
    
    return InfoPokemonFormated = `
    <div class="column"> <div class="card"> <div class="card-header">
    <div class="card-header-title"> ${InfoPokemon[0].JapaneseName} 
    </div> </div> <div class="card-content"> 
	<article class="media"> <div class="media-content"> 
	<h1 class="title">	${InfoPokemon[0].Name}
	</h1> </div> </article> </div> <div class="card-content">
	<article class="media"> <div class="media-content">
	<div class="content has-text-left"> <p> Hp :  ${InfoPokemon[0].Hp} </p>
	<h3>Abilities</h3> <ul> ${TroisTableaux[0]} </ul>
	<h3>Resistant against</h3> <ul> ${TroisTableaux[1]} </ul>
	<h3>Weak against</h3> <ul> ${TroisTableaux[2]} </ul> </div> </div> 
	<figure class="media-right"> <figure class="image is-475x475"> <img  src=
	"${InfoPokemon[0].Images.Full}" alt="${InfoPokemon[0].Name}" />`
	+ Affichage_Bouton_Ajouter_Deck();
}

/**
 * Formate l'affichage du tableau de pokemon
 * à afficher et des infos du pokemon
 * sur lequel l'utilisateur à cliquer.
 * Et met en surbrillance le pokemon
 * sur lequel l'utilisateur à cliqué.
 *
 * @param {Etat} etatCourant
 */
async function formate_Affichage(etatCourant)
{
	const dataPokemon = await etatCourant.TableauPokemon;
    const TableauPokemonFormated = 
    await Promise.all([formate_Affichage_Tableau_Pokemons(etatCourant)]) ;
    
    const InfoPokemonFormated = 
    await Promise.all([formate_Affichage_Info_Pokemons(etatCourant)]);
		
	majEtatEtPage(etatCourant, {
      TableauPokemonForamated: `${TableauPokemonFormated}`,
      InfoPokemonFormated: `${InfoPokemonFormated}`
    });
    
	await Promise.all(
		dataPokemon.filter((n, index) => index < etatCourant.PokemonAffichee)
		.map(async (val,index) => {
		document.getElementById(index)
		.onclick = (event) => ChangePokemonInfoAffichage(event,etatCourant);
	}))

    document.getElementById(etatCourant.InfoPokemonNb)
    .className = "is-selected";
  
}

/**
 * Retourne le contraire du joueur passé en parametre
 * (permet de faciliter l'affichage de pokemon)
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Chaine de caractere du joueur contraire
 */
function Contraire(mot)
{
	if(mot === "left") { return "right";}
	if(mot === "right") { return "left";}
}

/**
 * Afin d'obtenir l'url d'image fonctionnel
 * nous devons retourner le bon nombre de '0'
 * Exemple : si le pokedex number est 25 
 * alors le numero du lien sera 025, 
 * on doit donc retourner un seul '0'
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Une chaine de characteres de un ou plusieurs '0'
 */
function NumberLengthToZero (nombre)
{
	const zero = '0';
	return zero.repeat(3-nombre);
}

/**
 * Genere le code HTML contenant l'image d'un pokemon à afficher
 *
 * @param Joueur : chaine de caracteres du nom du joueur (left/right)
 * 		  Rounds : objet contenant le  round actuelle
 * 		  
 * @returns Chaine de caractere contenant du code HTML
 */
function formate_CombatAffichagePokemon(Round, Joueur)
{
	if(Joueur === "left") { 
		return '<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' +
		 NumberLengthToZero(Round.Left.toString().length)  +
		Round.Left + '.png" width="80" height="80">';
		}
	else {
		return '<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' +
		 NumberLengthToZero(Round.Right.toString().length)  +
		Round.Right + '.png" width="80" height="80">';
	}
}

/**
 * Affiche le déroulement d'un combat aléatoire avec un affichage
 * des rounds espacés de une seconde.	  
 */
function CombatStart()
{
    const Combat = fetchFight();
	Promise.all([Combat]).then(function(InfoCombat) {
		if(InfoCombat[0].Winner === "right" )
		{
			document.write('<p>Le joueur ' + InfoCombat[0].DeckRight.User +
			'&nbsp; à gagné le combat</p>');
		}
		else
		{
			document.write('<p>Le joueur ' + InfoCombat[0].DeckLeft.User +
		   '&nbsp; à gagné le combat</p>');
		}	
		
		const liste_rounds = InfoCombat[0].Rounds.map((round) => '<p>Le pokemon ' + 
		formate_CombatAffichagePokemon(round, round.AttackFrom) + ' attaque ' + 
		formate_CombatAffichagePokemon(round, Contraire(round.AttackFrom))  +
		 ' avec une attaque ' + round.Type + ' cela inflige ' + round.Damage + ' dêgats.</p>' ); 

	    liste_rounds.forEach((ligne,index) => setTimeout(() => {
			document.write(ligne); }, index*2000));
	
	});
}

/**
 * Genere l'affichage de la page de combat
 */
function CombatAffichage()
{
	document.write('<input type="button" id="CombatStart"' + 
	'value="Combattre" onclick="CombatStart()" >');
}


/**
 * Fait une requête GET authentifiée sur /whoami
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchPokemon() {
  return fetch(serverUrl + "/pokemon")
    .then((response) => {
      if (response.status === 401) {
        return response.json().then((json) => {
          console.log(json);
          return { err: json.message };
        });
      } else {
        return response.json();
      }
    })
    .catch((erreur) => ({ err: erreur }));
}

/**
 * Fait une requête POST authentifiée sur /deck
 * 
 * @param {Etat} etatCourant
 * 
 * @returns une promesse du deck du joueur identifié ou un message d'erreur
 */
function fetchDeckID(etatCourant) {
  return fetch(serverUrl + "/deck/p2008210", { method: "GET",
	   headers: { "Api-Key": etatCourant.password }}) 
    .then((response) => {
      if (response.status === 401) {
        return response.json().then((json) => {
          console.log(json);
          return { err: json.message };
        });
      } else {
        return response.json();
      }
    })
    .catch((erreur) => ({ err: erreur }));
}


/**
 * Fait une requête GET authentifiée sur /whoami
 * 
 *  @param {Etat} etatCourant
 * 		   apiKey : chaine de caracteres du mot de passe
 * 
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchWhoami(etatCourant,apiKey) {
  etatCourant.password = apiKey;
  return fetch(serverUrl + "/whoami", { 
	  headers: { "Api-Key": etatCourant.password } })
    .then((response) => {
      if (response.status === 401) {
        return response.json().then((json) => {
          console.log(json);
          return { err: json.message };
        });
      } else {
        return response.json();
      }
    })
    .catch((erreur) => ({ err: erreur }));
}

/**
 * Fait une requête POST authentifiée sur /fight
 * 
 * @returns une promesse des données d'un combat generer via le deck
 *  du joueur et d'un deck aléatoire ou un message d'erreur
 */
function fetchFight() {
  return fetch(serverUrl + "/fight", { method: "POST", headers: {
	   "Api-Key": "97589d10-d69e-47bd-89c3-3e985a494f66" } })
    .then((response) => {
      if (response.status === 401) {
        return response.json().then((json) => {
          console.log(json);
          return { err: json.message };
        });
      } else {
        return response.json();
      }
    })
    .catch((erreur) => ({ err: erreur }));
}

/**
 * Fait une requête POST authentifiée sur /deck
 * 
 *  *  @param NouveauDeckArray : Array contenant le nouveau deck du joueur
 * 		      apiKey : chaine de caracteres du mot de passe
 * 
 * @returns une promesse du deck du joueur identifié ou un message d'erreur
 */
function fetchDeck(NouveauDeckArray,apiKey) {
  return fetch(serverUrl + "deck", { method: "POST", headers: {
	   "Content-Type": "application/json", "Api-Key": apiKey },
	 body: JSON.stringify(NouveauDeckArray) })
    .then((response) => {
      if (response.status === 401) {
        return response.json().then((json) => {
          console.log(json);
          return { err: json.message };
        });
      } else {
        return response.json();
      }
    })
    .catch((erreur) => ({ err: erreur }));
}


/**
 * Fait une requête sur le serveur et insère le login dans la modale d'affichage
 * de l'utilisateur puis déclenche l'affichage de cette modale.
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Une promesse de mise à jour
 */
function lanceWhoamiEtInsereLogin(etatCourant,apiKey) {
  return fetchWhoami(etatCourant,apiKey).then((data) => {
    majEtatEtPage(etatCourant, {
      login: data.user, // qui vaut undefined en cas d'erreur
      errLogin: data.err, // qui vaut undefined si tout va bien
      loginModal: data.err === undefined ? false : true , // on affiche la modale
    });
  });
}

/**
 * Génère le code HTML du corps de la modale de login. On renvoie en plus un
 * objet callbacks vide pour faire comme les autres fonctions de génération,
 * mais ce n'est pas obligatoire ici.
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et un objet vide
 * dans le champ callbacks
 */
function genereModaleLoginBody(etatCourant) {
  const text =
    etatCourant.errLogin !== undefined
      ? etatCourant.errLogin
      : etatCourant.login;
  return {
    html: `
  <section class="modal-card-body">
  <FORM name="formulaire" id="FormLogin"> Entrer votre mot de passe
  <INPUT TYPE="password" id="PasswordAPI"  >
  <INPUT TYPE="button" id="ValideConnexion" VALUE="Connexion"> </FORM>
  </section>
  
  `,
    callbacks: {"ValideConnexion" : {
		 onclick:() => lanceWhoamiEtInsereLogin(
		etatCourant, document.getElementById("PasswordAPI").value ) },
  },

}

}


/**
 * Génère le code HTML du titre de la modale de login et les callbacks associés.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLoginHeader(etatCourant) {
  return {
    html: `
<header class="modal-card-head  is-back">
  <p class="modal-card-title">Utilisateur</p>
  <button
    id="btn-close-login-modal1"
    class="delete"
    aria-label="close"
    ></button>
</header>`,
    callbacks: {
      "btn-close-login-modal1": {
        onclick: () => majEtatEtPage(etatCourant, { loginModal: false }),
      },
    },
  };
}

/**
 * Génère le code HTML du base de page de la modale de login et les callbacks associés.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLoginFooter(etatCourant) {
  return {
    html: `
  <footer class="modal-card-foot" style="justify-content: flex-end">
    <button id="btn-close-login-modal2" class="button">Fermer</button>
  </footer>
  `,
    callbacks: {
      "btn-close-login-modal2": {
        onclick: () => majEtatEtPage(etatCourant, { loginModal: false }),
      },
    },
  };
}

/**
 * Génère le code HTML de la modale de login et les callbacks associés.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLogin(etatCourant) {
  const header = genereModaleLoginHeader(etatCourant);
  const footer = genereModaleLoginFooter(etatCourant);
  const body = genereModaleLoginBody(etatCourant);
  const activeClass = etatCourant.loginModal ? "is-active" : "is-inactive";
  return {
    html: `
      <div id="mdl-login" class="modal ${activeClass}">
        <div class="modal-background"></div>
        <div class="modal-card">
          ${header.html}
          ${body.html}
          ${footer.html}
        </div>
      </div>`,
    callbacks: { ...header.callbacks, ...footer.callbacks, ...body.callbacks },
  };
}

/* ************************************************************************
 * Gestion de barre de navigation contenant en particulier les bouton Pokedex,
 * Combat et Connexion.
 * ****************************************************************** */

/**
 * Déclenche la mise à jour de la page en changeant l'état courant pour que la
 * modale de login soit affichée
 * @param {Etat} etatCourant
 */
function afficheModaleConnexion(etatCourant) {
  lanceWhoamiEtInsereLogin(etatCourant);
}

/**
 * Deconnecte l'utilisateur et effectue
 * des des callbacks
 *
 * @param {Etat} etatCourant
 */
function SeDeconnecte(etatCourant)
{
	etatCourant.login = undefined; // etat de deconnexion
	genereBoutonConnexion(etatCourant);
    callbacks = {
      "NomUtilisateur": {
        innerHTML: "",
      },
      "btn-open-login-modal": {
        text: "Connexion",
    },
    }
    
    enregistreCallbacks(callbacks);
    etatCourant.password = ""; // re-initiallise le mot de passe
    formate_Affichage(etatCourant);

}


/**
 * Génère le code HTML et les callbacks pour la partie droite de la barre de
 * navigation qui contient le bouton de login.
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereBoutonConnexion(etatCourant) {
  const html = `
  <div class="navbar-end"> <div class="navbar-item"> <div class="buttons">
      <p id="NomUtilisateur" >  </p>
        <a id="btn-open-login-modal" class="button is-light" style="left:950;" >
         ${etatCourant.login === undefined ? `Connexion` : `Deconnexion`} </a> </div> </div>
  </div>`;
  return {
    html: html,
    callbacks: {
      "btn-open-login-modal": {
        onclick: () => etatCourant.login === undefined ?
        afficheModaleConnexion(etatCourant) : SeDeconnecte(etatCourant),
      },
      "NomUtilisateur": {
		innerHTML: etatCourant.login != undefined ? '<p>Bienvenue ' +
	    etatCourant.login + '</p>' : "" ,
	  },
    },
  };
}

/**
 * Génère le code HTML de la barre de navigation et les callbacks associés.
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereBarreNavigation(etatCourant) {
  const connexion = genereBoutonConnexion(etatCourant);
  return {
    html: `
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar">
      <div class="navbar-item"><div class="buttons">
          <a id="btn-pokedex" class="button is-light"> Pokedex </a>
          <a id="btn-combat" class="button is-light" 
          onclick="CombatAffichage()"> Combat </a>
      </div></div>
      ${connexion.html}
    </div>
  </nav>`,
    callbacks: {
      ...connexion.callbacks,
      "btn-pokedex": { onclick: () => console.log("click bouton pokedex") },
    },
  };
}

/**
 * Génère le squelette du code HTML
 * pour afficher le tableau
 * 
 * @returns un code HTML 
 */



function genereHtmlTableau()
{
	oninput="recherchePokemon(event)"

	return ` <section class="section">
      <div class="columns">
        <div class="column">
          <div class="tabs is-centered"> <ul>
              <li class="is-active" id="tab-all-pokemons">
                <a>Tous les pokemons</a>
              </li>
              <li id="tab-tout"><a>Mes pokemons</a></li> </ul>
          </div>
          <div id="tbl-pokemons"></div>
          <div id="tbl-pokemons">
		  <label for="recherchePokemon" >Rechercher un pokémon : </label>
		  <input type="search" autocomplete="off" id="recherchePokemon" oninput="recherchePokemon(event)">
	<table class="table"> <thead> <tr>  <th><span>Image</span></th>
    <th> <span id="TrieNum" >#</span ><span class="icon"><i></i></span> </th>
    <th><span id="TrieNom" >Name</span></th> <th><span id="TrieAbilites">
    Abilities</span></th>
    <th><span id="TrieTypes">Types</span></th> </tr>  </thead> <tbody>`;
}

function recherchePokemon(etatCourant) {
  const saisie = event.target.value;
  const pokemonsFiltres = etatCourant.TableauPokemon.filter((pokemon) => {
    return pokemon.Name.toLowerCase().includes(saisie.toLowerCase());
  });
  formate_Affichage(pokemonsFiltres);
}


/**
 * Génère le code HTML
 * pour afficher les bouttons
 * qui permettent de gerer 
 * le nombre de pokemon à afficher
 * 
 * @returns un code HTML 
 */
function GenereHtmlBouttonPourLimiterAffichage()
{
	return `</tbody> </table> </div> <p id="NbPokeShow" style="float:left;" >
	 10 <p style="float:right;" >
	</p> &nbsp;résultats affichés </p> </p> <!-- &nbsp; est un caractere invisibe -->
	<input id="AugmenteAffichage" type="button" value="+ 10"> 
	<input id="ReduireAffichage" type="button" value="- 10" >
    </div> `;
}

/**
 * Génére le code HTML de la page ainsi que l'ensemble des callbacks à
 * enregistrer sur les éléments de cette page.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 * 
 * Commentaire : 
 *  // remarquer l'usage de la notation ... ci-dessous qui permet de "fusionner"
 *	// les dictionnaires de callbacks qui viennent de la barre et de la modale.
 *	// Attention, les callbacks définis dans modaleLogin.callbacks vont écraser
 *	// ceux définis sur les mêmes éléments dans barredeNavigation.callbacks. En
 *	// pratique ce cas ne doit pas se produire car barreDeNavigation et
 *	// modaleLogin portent sur des zone différentes de la page et n'ont pas
 *	// d'éléments en commun.
 */
function generePage(etatCourant) {
  const barredeNavigation = genereBarreNavigation(etatCourant);
  const modaleLogin = genereModaleLogin(etatCourant);
   const AffichagePokemon_clear =etatCourant.TableauPokemonForamated.toString()
   .replaceAll(',', '');
  return {
    html: barredeNavigation.html + modaleLogin.html + genereHtmlTableau() + 
     `${AffichagePokemon_clear}` + GenereHtmlBouttonPourLimiterAffichage() + 
	`${etatCourant.InfoPokemonFormated} `,
    callbacks: { ...barredeNavigation.callbacks, ...modaleLogin.callbacks,
    "AugmenteAffichage": { onclick: () => AugmenteAffichage(etatCourant) }, 
    "ReduireAffichage": { onclick: () => ReduitAffichage(etatCourant) },
    "NbPokeShow": { innerHTML: etatCourant.PokemonAffichee },
    "TrieNum": { onclick: () => TrieParNum(etatCourant) },
    "TrieNom": { onclick: () => TrieParNom(etatCourant) },
    "TrieAbilites": { onclick: () => TrieParAbilites(etatCourant) },
    "TrieTypes": { onclick: () => TrieParTypes(etatCourant) },
    "tab-tout": { className: etatCourant .MesPokemonsOuToutPokemon == 1 ? "is-active" : "" },
    "tab-all-pokemons": { className: etatCourant
		.MesPokemonsOuToutPokemon == -1 ? "is-active" : "" }, }, };
}

/* ******************************************************************
 * Initialisation de la page et fonction de mise à jour
 * globale de la page.
 * ****************************************************************** */

/**
 * Créée un nouvel état basé sur les champs de l'ancien état, mais en prenant en
 * compte les nouvelles valeurs indiquées dans champsMisAJour, puis déclenche la
 * mise à jour de la page et des événements avec le nouvel état.
 *
 * @param {Etat} etatCourant etat avant la mise à jour
 * @param {*} champsMisAJour objet contenant les champs à mettre à jour, ainsi
 * que leur (nouvelle) valeur.
 */
function majEtatEtPage(etatCourant, champsMisAJour) {
  const nouvelEtat = { ...etatCourant, ...champsMisAJour };
  majPage(nouvelEtat);
}

/**
 * Prend une structure décrivant les callbacks à enregistrer et effectue les
 * affectation sur les bon champs "on...". Par exemple si callbacks contient la
 * structure suivante où f1, f2 et f3 sont des callbacks:
 *
 * { "btn-pokedex": { "onclick": f1 },
function genereHtmlTableau()
{
	oninput="recherchePokemon(event,etatCourant)"

	return ` <section class="section">
      <div class="columns">
        <div class="column">
          <div class="tabs is-centered"> <ul>
              <li class="is-active" id="tab-all-pokemons">
                <a>Tous les pokemons</a>
              </li>
              <li id="tab-tout"><a>Mes pokemons</a></li> </ul>
          </div>
          <div id="tbl-pokemons"></div>
          <div id="tbl-pokemons">
		  <label for="recherchePokemon" >Rechercher un pokémon : </label>
		  <input type="search" autocomplete="off" id="recherchePokemon" oninput="recherchePokemon(event,etatCourant)">
	<table class="table"> <thead> <tr>  <th><span>Image</span></th>
    <th> <span id="TrieNum" >#</span ><span class="icon"><i></i></span> </th>
    <th><span id="TrieNom" >Name</span></th> <th><span id="TrieAbilites">
    Abilities</span></th>
    <th><span id="TrieTypes">Types</span></th> </tr>  </thead> <tbody>`;
}

function recherchePokemon(event,etatCourant) {
  const saisie = event.target.value;
  const pokemonsFiltres = etatCourant.TableauPokemon.filter((pokemon) => {
    return pokemon.Name.toLowerCase().includes(saisie.toLowerCase());
  });
  formate_Affichage(pokemonsFiltres);
}
 *   "f-search": { "onchange": f2,
 *                     "oninput": f3 }
 * }
 *
 * alors cette fonction rangera f1 dans le champ "onclick" de l'élément dont
 * l'id est "btn-pokedex", rangera f2 dans le champ "onchange" de l'élément dont
 * l'id est "input-search" et rangera f3 dans le champ "oninput" de ce même
 * élément. Cela aura, entre autres, pour effet de délclencher un appel à f1
 * lorsque l'on cliquera sur le bouton "btn-pokedex".
 *
 * @param {Object} callbacks dictionnaire associant les id d'éléments à un
 * dictionnaire qui associe des champs "on..." aux callbacks désirés.
 */
function enregistreCallbacks(callbacks) {
  Object.keys(callbacks).forEach((id) => {
    const elt = document.getElementById(id);
    if (elt === undefined || elt === null) {
      console.log(
        `Élément inconnu: ${id}, impossible d'enregistrer de callback sur cet id`
      );
    } else {
      Object.keys(callbacks[id]).forEach((onAction) => {
        elt[onAction] = callbacks[id][onAction];
      });
    }
  });
}

/**
 * Met à jour le logo qui designe la colonne
 * selon le tableau à été trié
 * 
 * @param {Etat} etatCourant 
 */
function MetAJourLogoTrieur(etatCourant)
{
	if(etatCourant.Tri === "Types") {
	    document.getElementById("TrieTypes").className = 
		etatCourant.TriOrdre == -1 ? "fas fa-angle-down" : "fas fa-angle-up"; 
	}
	if(etatCourant.Tri === "Num") {  
		document.getElementById("TrieNum").className = 
		etatCourant.TriOrdre == -1 ? "fas fa-angle-down" : "fas fa-angle-up"; 
	}
	if(etatCourant.Tri === "Nom") {
	    document.getElementById("TrieNom").className = 
		etatCourant.TriOrdre == -1 ? "fas fa-angle-down" : "fas fa-angle-up"; 
    }
	if(etatCourant.Tri === "Abilites") {
		document.getElementById("TrieAbilites").className = 
		etatCourant.TriOrdre == -1 ? "fas fa-angle-down" : "fas fa-angle-up";
    }
	  
}

/**
 * Mets à jour la page (contenu et événements) en fonction d'un nouvel état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majPage(etatCourant) {
  console.log("CALL majPage");
  const page = generePage(etatCourant);
  document.getElementById("root").innerHTML = page.html;
  enregistreCallbacks(page.callbacks);

  MetAJourLogoTrieur(etatCourant);
  
  document.getElementById("tab-tout").onclick = function(){VoirMesPokemons(etatCourant);}; 
  document.getElementById("tab-all-pokemons").onclick =
    function(){AfficherToutPokemons(etatCourant);};
	 
}


/**
 * Appelé après le chargement de la page.
 * Met en place la mécanique de gestion des événements
 * en lançant la mise à jour de la page à partir d'un état initial.
 */
async function initClientPokemons() {
  console.log("CALL initClientPokemons");
  const etatInitial = {
    loginModal: false,
    login: undefined,
    errLogin: undefined,
	TableauPokemon: fetchPokemon(), //tableau a affiché
	InfoPokemonNb: 0,
	PokemonAffichee: 10,
	Tri: "Aucun", // enregistre le nom du tri
	TriOrdre: 1, // 1 => croissant, -1 => decroissant
	TableauMesPokemon: "", // tableau des pokemons du deck
	TableauPokemonConstant: fetchPokemon(), //tableau non modifié
	MesPokemonsOuToutPokemon: -1, // -1 => affiche tout pokemons 1 => affiche pokemons du deck
	password: ""     
  };
  formate_Affichage(etatInitial);
}

// Appel de la fonction init_client_duels au après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Exécution du code après chargement de la page");
  initClientPokemons();
});
