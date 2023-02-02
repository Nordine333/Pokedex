const fight = {
  "DeckLeft": {
    "User": "p12345678",
    "Pokemons": [2, 25, 19]
  },
  "DeckRight": {
    "User": "p23456789",
    "Pokemons": [25, 27, 34]
  },
  "Winner": "right",
  "Rounds": [
    {
      "Left": 2,
      "Right": 25,
      "AttackFrom": "right",
      "Type": "electric",
      "Damage": 5,
      "KO": false
    },
    {
      "Left": 2,
      "Right": 25,
      "AttackFrom": "left",
      "Type": "poison",
      "Damage": 10,
      "KO": false
    },
    {
      "Left": 59,
      "Right": 107,
      "AttackFrom": "left",
      "Type": "poison",
      "Damage": 10,
      "KO": false
    },
    {
      "Left": 438,
      "Right": 309,
      "AttackFrom": "left",
      "Type": "poison",
      "Damage": 10,
      "KO": false
    },
    {
      "Left": 513,
      "Right": 243,
      "AttackFrom": "left",
      "Type": "poison",
      "Damage": 10,
      "KO": false
    }
    /* encore d'autres rounds */
  ]
}


/* ******************************************************************
 * Constantes de configuration
 * ****************************************************************** */
//"97589d10-d69e-47bd-89c3-3e985a494f66"; //"69617e9b-19db-4bf7-a33f-18d4e90ccab7";
const serverUrl = "https://lifap5.univ-lyon1.fr/";

/* ******************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage de
 * l'utilisateur.
 * ****************************************************************** */


const donnees_promises = fetchPokemon();



async function transaction(donnees_promises)
{
  return Promise.all([donnees_promises]).then(function PromToArr(data)
{
  const ArrayProm = Array.from(data[0]);
  AfficherPokemon(ArrayProm); // initialise l'affichage du lancement de la page
	AfficherInfoPokemon(0);
  return ArrayProm;
  
});

}

const donnees_exemple = transaction(donnees_promises);





function showOld() {
alert('test');
}


function formate_Resist(filteredResist, nbPokemon)

{
		Promise.all([donnees_exemple]).then(function(values) {
		const formated_Resist = filteredResist.map(n => '<li>' + n[0] + '</li>');
		return formated_Resist.toString().replaceAll(',', '');
	});
}

function formate_Weak(filteredWeak, nbPokemon)

{
	Promise.all([donnees_exemple]).then(function(values) {
		const formated_Weak = filteredWeak.map(n => '<li>' + n[0] + '</li>');
		return formated_Weak.toString().replaceAll(',', '');
	});
}

function RetirerPokemonDeck(NumPokedexDuPokemon)
{

	AncienDeck = fetchDeckID();
	Promise.all([AncienDeck]).then(function(values) {
		values[0].splice(values[0].indexOf(Number(NumPokedexDuPokemon)), 1);
		const Deck = fetchDeck(values[0]);
		console.log(Deck);
	});
	document.getElementById("bouton-MAJ_deck").className = "is-success button";
    document.getElementById("bouton-MAJ_deck").innerText = "Ajouter à mon deck";
    document.getElementById("bouton-MAJ_deck").onclick = function(){AjouterPokemonDeck(NumPokedexDuPokemon);};
}

function AfficherInfoPokemon(nbPokemon)
{
	Promise.all([donnees_exemple]).then(function(values) {
		const NumPokedexDuPokemon = values[0][nbPokemon].PokedexNumber;
		const	AncienDeck = fetchDeckID();
		Promise.all([AncienDeck]).then(function(poke) {
		if(poke[0].indexOf(Number(NumPokedexDuPokemon)) > -1)
		{
			 document.getElementById("bouton-MAJ_deck").className = "is-danger button";
			 document.getElementById("bouton-MAJ_deck").innerText = "Retirer de mon deck";
			 document.getElementById("bouton-MAJ_deck").onclick = function(){RetirerPokemonDeck(NumPokedexDuPokemon);}; //(NumPokedexDuPokemon)"
	    }
	    else
	    {
			 document.getElementById("bouton-MAJ_deck").className = "is-success button";
			 document.getElementById("bouton-MAJ_deck").innerText = "Ajouter à mon deck";
			 document.getElementById("bouton-MAJ_deck").onclick = function(){AjouterPokemonDeck(NumPokedexDuPokemon);};
		}
		});

		const asArray = values[0][nbPokemon].Against;
		const TabAgainst = Object.entries(asArray);
		const filteredResist = TabAgainst.filter(([key, value]) => value < 1);
		const filteredWeak = TabAgainst.filter(([key, value]) => value > 1);
		
		document.getElementById('replace').innerHTML =  '<div class="card-header"> ' +
		'<div class="card-header-title">' + values[0][nbPokemon].JapaneseName + '</div> </div> ' + 
		'<div class="card-content"> ' +
		'<article class="media"> <div class="media-content"> <h1 class="title">' +	values[0][nbPokemon].Name + 
		'</h1> </div> </article>' +
		'</div> <div class="card-content"> <article class="media"> <div class="media-content">' + 
		'<div class="content has-text-left"> <p> Hp : ' + values[0][nbPokemon].Hp + '</p>' +
		'<h3>Abilities</h3>' +
		'<ul> ' + values[0][nbPokemon].Abilities.map(n => '<li>' + n + '</li>').toString().replaceAll(',', '') + '</ul>' +
		'<h3>Resistant against</h3>' +
		'<ul>' + filteredResist.map( (value) => '<li>' + value[0] + '</li>').toString().replaceAll(',', '') +  '</ul>' +
		'<h3>Weak against</h3>' +
		'<ul>' + filteredWeak.map( (value) => '<li>' + value[0] + '</li>').toString().replaceAll(',', '') +  '</ul>' + // n[0] correspond à la clé (nom du type), je selection pas n sinon il y'a n[1] qui est la valeur
		'</div> </div> <figure class="media-right"> <figure class="image is-475x475"> <img class="" src=' + 
		values[0][nbPokemon].Images.Full + ' alt=' + values[0][nbPokemon].Name + '/>';
	});

    
}

function formate_Affichage(liste_pokemon)
{
	const ici = liste_pokemon.map((n,index) => ' <div class="content" > <tr   id="' + index + 
	'" onclick="MetAJourInfoPokemon(' +
	index + ')"  > <td> <img alt="' + n.Name + 
	'"  src="' + n.Images.Detail + ' "  width="64" ' +
	'</td> <td> <div class="content"> ' + n.PokedexNumber + '</div> </td> ' +
	'<td> <div class="content">' + n.Name + '</div> </td>' +
	'<td> <ul> <li>' + n.Abilities.map( (value) =>  value + ' - ').toString().replace(/-([^-]*)$/, '' + '$1') + '</li> </ul> </td>' +
	'<td> <ul> <li>' + n.Types.map( (value) =>  value + ' - ').toString().replace(/-([^-]*)$/, '' + '$1') + '</li> </ul> </td> </tr> </div>'); 
	return ici.toString().replaceAll(',', '');
}

function AugmenteAffichage()
{
	document.getElementById('NbPokeShow').innerHTML = Number(document.getElementById('NbPokeShow').innerHTML) + 10 ;
	RechercherPokemon();
}

function ReduitAffichage()
{
	if(document.getElementById('NbPokeShow').innerHTML > 10 )
	{
		document.getElementById('NbPokeShow').innerHTML = Number(document.getElementById('NbPokeShow').innerHTML) - 10 ;
		RechercherPokemon();
	}
	
}

function AfficherPokemon(liste_pokemon)
{
	const liste_pokemonArr = Array.from(liste_pokemon);
	
	const NbPokemonAffichage = document.getElementById('NbPokeShow').innerHTML; //recup le num de pokemon à afficher
	
	const ReducePokeNbShow = liste_pokemonArr.filter((n, index) => index < NbPokemonAffichage); // reduit la liste de pokemon a afficher 
	
	const formated_liste_pokemon = formate_Affichage(ReducePokeNbShow); // prepare l'affichage de pokemon en html
	
	document.getElementById('AffichagePokemon').innerHTML = ' <table class="table"> <thead> <tr>  <th><span>Image</span></th>' +
    '<th> <span onclick="TrieParNum()" >#</span ><span class="icon"><i class="fas fa-angle-up"></i></span> </th>' +
    '<th><span onclick="TrieParNom()" >Name</span></th> <th><span onclick="TrieParAbilites()">Abilities</span></th> ' +
    ' <th><span onclick="TrieParTypes()">Types</span></th> </tr>  </thead> <tbody>' +
    formated_liste_pokemon; // affiche un formatage du tableau html (impossible de le sortir sinon ca ruine) + les pokemons formaté en html 
	
}


function MetAJourInfoPokemon(nbPokemon)
{

	//document.getElementById(nbPokemon).class="is-selected" ;
	//document.getElementById(nbPokemon).style.borderColor = "yellow";

	document.getElementsByClassName("is-selected").item(0).class = "";
	document.getElementById(nbPokemon).className = "is-selected" ; // le cadre du pokemon à mettre en avant devient bleu

	document.getElementById('replace').innerHTML = AfficherInfoPokemon(nbPokemon);

	

}



function TrieParNum()
{
	Promise.all([donnees_exemple]).then(function(values) {
		AfficherPokemon(values[0].sort((a,b) => a.PokedexNumber > b.PokedexNumber ? 1 : -1 ));;
	});
}

function TrieParAbilites()
{
	Promise.all([donnees_exemple]).then(function(values) {
		AfficherPokemon(values[0].sort((a,b) => a.Abilities > b.Abilities ? 1 : -1 ));
	});
}

function TrieParNom()
{
	Promise.all([donnees_exemple]).then(function(values) {
		AfficherPokemon(values[0].sort((a,b) => a.Name > b.Name ? 1 : -1 ));
	});
}

function TrieParTypes()
{
	Promise.all([donnees_exemple]).then(function(values) {
		AfficherPokemon(values[0].sort((a,b) => a.Types > b.Types ? 1 : -1 ));
	});
}

function RechercherPokemon()
{
	const nomPokemon = document.getElementById("recherchePokemon").value;
	Promise.all([donnees_exemple]).then(function(values) {
		const pokemon_voulu = Array.from(values[0]).filter(n => n.Name.toLowerCase().startsWith(nomPokemon.toLowerCase())); // je met tout en majuscule pour pas differencier maj et min
		AfficherPokemon(pokemon_voulu);
	});
	//document.getElementById('NbPokeShow').innerHTML = pokemon_voulu.length; // interessant mais ne marche pas
}

function VoirMesPokemons()
{
	document.getElementById("tab-all-pokemons").classList.remove("is-active") ; // supprime la lumière bleu sur le bouton "Tous les pokemons"
	document.getElementById("tab-tout").className = "is-active" ; //  rajouter la lumière bleu sur le bouton "Mes pokemons"
	Promise.all([donnees_exemple]).then(function(values) {
		const MesPokemonsArray = fetchDeckID();
		Promise.all([MesPokemonsArray]).then(function(MesPokemons) {
			const pokemon_voulu = Array.from(values[0]).filter(n => MesPokemons[0].indexOf(n.PokedexNumber) > -1);
			AfficherPokemon(pokemon_voulu);
		});
	});
}
function Contraire(mot)
{
	if(mot === "left") { return "right";}
	if(mot === "right") { return "left";}
}

function NumberLengthToZero (nombre)
{
	const zero = '0';
	return zero.repeat(3-nombre);
}
function formate_CombatAffichagePokemon(n, mot)
{
	if(mot === "left") { 
		return '<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + NumberLengthToZero(n.Left.toString().length)  +
		n.Left + '.png" width="80" height="80">';
		}
	else {
		return '<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + NumberLengthToZero(n.Right.toString().length)  +
		n.Right + '.png" width="80" height="80">';
	}
}

function CombatStart()
{
    const Combat = fetchFight();
	Promise.all([Combat]).then(function(values) {
	if(values[0].Winner === "right" )
	{
		document.write('<p>Le joueur ' + values[0].DeckRight.User + '&nbsp;à gagné le combat</p>');
		
		const liste_rounds = values[0].Rounds.map((n) => '<p>Le pokemon ' + formate_CombatAffichagePokemon(n, n.AttackFrom) + ' attaque ' + 
		formate_CombatAffichagePokemon(n, Contraire(n.AttackFrom))  + ' avec une attaque ' + n.Type + ' cela inflige ' +
		n.Damage + ' dêgats.</p>' ); 

	   liste_rounds.forEach((ligne,index) => setTimeout(() => {  document.write(ligne); }, index*2000));
	}
	if(values[0].Winner === "left" )
	{
		document.write('<p>Le joueur ' + values[0].DeckLeft.User + '&nbsp;à gagné le combat</p>');
		
		const liste_rounds = values[0].Rounds.map((n) => '<p>Le pokemon ' + formate_CombatAffichagePokemon(n, n.AttackFrom) + ' attaque ' + 
		formate_CombatAffichagePokemon(n, Contraire(n.AttackFrom))  + ' avec une attaque ' + n.Type + ' cela inflige ' +
		n.Damage + ' dêgats.</p>' );
		
		
	   liste_rounds.forEach((ligne,index) => setTimeout(() => {  document.write(ligne); }, index*2000));
	}
	    });
}

function AjouterPokemonDeck(NumPokedexDuPokemon)
{
	
	AncienDeck = fetchDeckID();
	Promise.all([AncienDeck]).then(function(values) {
		Deck = fetchDeck(values[0].concat([Number(NumPokedexDuPokemon)]));
		console.log(Deck);
	});
	document.getElementById("bouton-MAJ_deck").className = "is-danger button";
    document.getElementById("bouton-MAJ_deck").innerText = "Retirer de mon deck";
    document.getElementById("bouton-MAJ_deck").onclick = function(){RetirerPokemonDeck(NumPokedexDuPokemon);}; //(NumPokedexDuPokemon)"
	  
	
}
    
function CombatAffichage()
{
	document.write('<input type="button" id="CombatStart" value="Combattre" onclick="CombatStart()" >');
}



/**
 * Fait une requête GET authentifiée sur /whoami
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchWhoami(apiKey) {
  return fetch(serverUrl + "whoami", { headers: { "Api-Key": apiKey } })
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
 * Fait une requête GET authentifiée sur /pokemon
 * @returns une promesse contenant un json de l'ensemble des pokemons un message d'erreur
 */
function fetchPokemon() {
  return fetch(serverUrl + "pokemon")
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
 * @returns une promesse du deck du joueur identifié ou un message d'erreur
 */
function fetchDeckID() {
  return fetch(serverUrl + "deck/p2008210", { method: "GET", headers: { "Api-Key": "97589d10-d69e-47bd-89c3-3e985a494f66" }})
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
 * @returns une promesse du deck du joueur identifié ou un message d'erreur
 */
function fetchDeck(NouveauDeckArray) {
  return fetch(serverUrl + "deck", { method: "POST", headers: { "Content-Type": "application/json", "Api-Key": "97589d10-d69e-47bd-89c3-3e985a494f66" },
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
 * Fait une requête POST authentifiée sur /fight
 * @returns une promesse des données d'un combat generer via le deck du joueur et d'un deck aléatoire ou un message d'erreur
 */
function fetchFight() {
  return fetch(serverUrl + "fight", { method: "POST", headers: { "Api-Key": "97589d10-d69e-47bd-89c3-3e985a494f66" } })
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
  return fetchWhoami(apiKey).then((data) => {
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
    callbacks: {"ValideConnexion" : { onclick:() => lanceWhoamiEtInsereLogin(etatCourant, document.getElementById("PasswordAPI").value ) },
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

function SeDeconnecte(etatCourant)
{
	document.getElementById("NomUtilisateur").innerHTML = "" ;
	etatCourant.login = undefined;
	document.getElementById("btn-open-login-modal").text = 'Connexion';
	genereBoutonConnexion(etatCourant);
	
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
  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a id="btn-open-login-modal" class="button is-light" style="left:950;" > ${etatCourant.login === undefined ? `Connexion` : `Deconnexion`} </a>
      </div>
    </div>
  </div>`;
  return {
    html: html,
    callbacks: {
      "btn-open-login-modal": {
        onclick: () => etatCourant.login === undefined ? afficheModaleConnexion(etatCourant) : SeDeconnecte(etatCourant),
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
          <a id="btn-combat" class="button is-light" onclick="CombatAffichage()"> Combat </a>
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
 * Génére le code HTML de la page ainsi que l'ensemble des callbacks à
 * enregistrer sur les éléments de cette page.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function generePage(etatCourant) {
  const barredeNavigation = genereBarreNavigation(etatCourant);
  const modaleLogin = genereModaleLogin(etatCourant);
  // remarquer l'usage de la notation ... ci-dessous qui permet de "fusionner"
  // les dictionnaires de callbacks qui viennent de la barre et de la modale.
  // Attention, les callbacks définis dans modaleLogin.callbacks vont écraser
  // ceux définis sur les mêmes éléments dans barredeNavigation.callbacks. En
  // pratique ce cas ne doit pas se produire car barreDeNavigation et
  // modaleLogin portent sur des zone différentes de la page et n'ont pas
  // d'éléments en commun.
  return {
    html: barredeNavigation.html + modaleLogin.html,
    callbacks: { ...barredeNavigation.callbacks, ...modaleLogin.callbacks },
  };
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
 *   "input-search": { "onchange": f2,
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

function AfficherToutPokemons()
{
	document.getElementById("tab-tout").classList.remove("is-active") ; // supprime la lumière bleu sur le bouton "Tous les pokemons"
	document.getElementById("tab-all-pokemons").className = "is-active" ; //  rajouter la lumière bleu sur le bouton "Mes pokemons"
	Promise.all([donnees_exemple]).then(function(values) {
	  const ArrayProm = Array.from(values[0]);
	  AfficherPokemon(ArrayProm);
	});
}


/**
 * Mets à jour la page (contenu et événements) en fonction d'un nouvel état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majPage(etatCourant) {
  console.log("CALL majPage");
  console.log("CALL majPage");
  const page = generePage(etatCourant);
  document.getElementById("root").innerHTML = page.html;
  enregistreCallbacks(page.callbacks);
  document.addEventListener('input', RechercherPokemon); // met à jour les pokemons à afficher grâce a la search bar
  if(etatCourant.login != undefined) {document.getElementById("NomUtilisateur").innerHTML = etatCourant.login ;}
  else {document.getElementById("NomUtilisateur").innerHTML = "" ;}
  document.getElementById("tab-tout").onclick = VoirMesPokemons;
  document.getElementById("tab-all-pokemons").onclick =  AfficherToutPokemons;

  
}

/**
 * Appelé après le chargement de la page.
 * Met en place la mécanique de gestion des événements
 * en lançant la mise à jour de la page à partir d'un état initial.
 */
function initClientPokemons() {
  console.log("CALL initClientPokemons");
  const etatInitial = {
    loginModal: false,
    login: undefined,
    errLogin: undefined,
  };
  majPage(etatInitial);
}

// Appel de la fonction init_client_duels au après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Exécution du code après chargement de la page");
  initClientPokemons();
});
