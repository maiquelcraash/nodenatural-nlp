/**
 * Created by maiquel on 04/08/17.
 */

(function () {
	"use strict";

	let natural = require('natural');

	let base = [
		['eu sou admirada por muitos', 'alegria'],
		['me sinto completamente amado', 'alegria'],
		['amar e maravilhoso', 'alegria'],
		['estou me sentindo muito animado novamente', 'alegria'],
		['eu estou muito bem hoje', 'alegria'],
		['que belo dia para dirigir um carro novo', 'alegria'],
		['o dia esta muito bonito', 'alegria'],
		['estou contente com o resultado do teste que fiz no dia de ontem', 'alegria'],
		['o amor e lindo', 'alegria'],
		['nossa amizade e amor vai durar para sempre', 'alegria'],
		['estou amedrontado', 'medo'],
		['ele esta me ameacando a dias', 'medo'],
		['isso me deixa apavorada', 'medo'],
		['este lugar e apavorante', 'medo'],
		['se perdermos outro jogo seremos eliminados e isso me deixa com pavor', 'medo'],
		['tome cuidado com o lobisomem', 'medo'],
		['se eles descobrirem estamos encrencados', 'medo'],
		['estou tremendo de medo', 'medo'],
		['eu tenho muito medo dele', 'medo'],
		['estou com medo do resultado dos meus testes', 'medo']];

	/**
	 * Pre-processa a database retirando as stopwords e efetuando stemming
	 */
	function preProcess(database) {
		let stopwords = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'ao', 'ele', 'das', 'à', 'seu', 'sua', 'ou', 'quando', 'muito', 'nos', 'já', 'eu', 'também', 'só', 'pelo', 'pela', 'até', 'isso', 'ela', 'entre', 'depois', 'sem', 'mesmo', 'aos', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'você', 'essa', 'num', 'nem', 'suas', 'meu', 'às', 'minha', 'numa', 'pelos', 'elas', 'qual', 'nós', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'dele', 'tu', 'te', 'vocês', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos', 'nossas', 'dela', 'delas', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo', 'estou', 'está', 'estamos', 'estão', 'estive', 'esteve', 'estivemos', 'estiveram', 'estava', 'estávamos', 'estavam', 'estivera', 'estivéramos', 'esteja', 'estejamos', 'estejam', 'estivesse', 'estivéssemos', 'estivessem', 'estiver', 'estivermos', 'estiverem', 'hei', 'há', 'havemos', 'hão', 'houve', 'houvemos', 'houveram', 'houvera', 'houvéramos', 'haja', 'hajamos', 'hajam', 'houvesse', 'houvéssemos', 'houvessem', 'houver', 'houvermos', 'houverem', 'houverei', 'houverá', 'houveremos', 'houverão', 'houveria', 'houveríamos', 'houveriam', 'sou', 'somos', 'são', 'era', 'éramos', 'eram', 'fui', 'foi', 'fomos', 'foram', 'fora', 'fôramos', 'seja', 'sejamos', 'sejam', 'fosse', 'fôssemos', 'fossem', 'for', 'formos', 'forem', 'serei', 'será', 'seremos', 'serão', 'seria', 'seríamos', 'seriam', 'tenho', 'tem', 'temos', 'tém', 'tinha', 'tínhamos', 'tinham', 'tive', 'teve', 'tivemos', 'tiveram', 'tivera', 'tivéramos', 'tenha', 'tenhamos', 'tenham', 'tivesse', 'tivéssemos', 'tivessem', 'tiver', 'tivermos', 'tiverem', 'terei', 'terá', 'teremos', 'terão', 'teria', 'teríamos', 'teriam']
		database = database.map((sentence) => {
			let words = sentence[0].split(' ');
			words = words.filter((word) => {
				return !stopwords.includes(word)
			});

			words = words.map((word) => {
				return steemer(word);
			});

			return [words, sentence[1]];
		});
		return database;

		function steemer(str) {
			return natural.PorterStemmerPt.stem(str);
		}
	}

	let data = preProcess(base);

	let classifier = new natural.BayesClassifier(natural.PorterStemmerPt);
	// let classifier = new natural.LogisticRegressionClassifier(natural.PorterStemmerPt);

	data.forEach((document) => {
		classifier.addDocument(document[0], document[1]);
	});

	classifier.train();

	let teste = "estou me sentindo apavorado";
	console.log(classifier.classify(teste));
	console.log(classifier.getClassifications(teste));

}());