export {};

document.addEventListener('DOMContentLoaded', function() {

    const viewAllBtn = document.getElementById('viewAllBtn');

    const hiddenPrograms = document.querySelectorAll('.program-card.hidden');

    

    viewAllBtn.addEventListener('click', function() {

        // Toggle all hidden programs

        hiddenPrograms.forEach(program => {

            program.classList.toggle('hidden');

        });

        

        // Change button text based on state

        if (viewAllBtn.textContent.includes('View All')) {

            viewAllBtn.innerHTML = 'Show Less <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>';

        } else {

            viewAllBtn.innerHTML = 'View All Academic Programs <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';

        }

    });

});


// Faculty Modal System
function openFacultyModal(facultyId) {
	console.log('Opening modal for:', facultyId); // Debug log
	const modal = document.getElementById('facultyModal');
	const modalContent = document.getElementById('modalContent');
	const modalBody = document.getElementById('modalBody');
	
	if (!modal || !modalContent || !modalBody) {
		console.error('Modal elements not found');
		return;
	}
	
	// Faculty data
	const facultyData = {
		andas: {
			name: "Dr. Sheriffa T. Andas",
			position: "Dean, Oceanography and Environmental Science",
			academicRank: "Professor VI",
			image: "/images/ioes/Faculty/SHERIFFA T. ANDAS.jpg",
			education: [
				"Doctor of Philosophy in Biology Major in Systematics and Ecology",
				"Master of Arts in Science Education Major in Biology and General Science",
				"Bachelor of Science in Biology"
			],
			achievements: [],
			publications: [],
			description: "Dr. Sheriffa T. Andas serves as the Dean of the Institute of Oceanography and Environmental Science, bringing extensive expertise in biology and environmental science to lead the institute's academic and research initiatives."
		},
		muallil: {
			name: "Dr. Richard N. Muallil",
			position: "Vice Chancellor for Research, Innovation, Development and Extension (VCRIDE)",
			academicRank: "Professor VI",
			image: "/images/ioes/Faculty/RICHARD N. MUALLIL.jpg",
			education: [
				"Doctor of Philosophy in Marine Science Major in Marine Biology",
				"Master of Science in Marine Science",
				"Bachelor of Science in Zoology"
			],
			achievements: [
				"Outstanding Young Scientist of the Philippines and for his Excellency in the field of Science, award on the 12th day of May 2018 at MSU-TCTO Fisheries Training Center",
				"Ten Outstanding Young Men (TOYM) of the Philippines (for Marine Science and Conservation) Award given by the TOYM Foundation, JCI Philippines, and Gerry Roxas Foundation in December 2016 at the Malacanan Palace, Manila, Philippines",
				"Outstanding Young Scientists (OYS) of the Philippines (for Marine Science), 14th day of July 2016 at Manila Hotel, Manila Philippines"
			],
			publications: [
				"Muallil, R.N., Irilis, R.A., Habibuddin, A.A. Abdulmajid, N.S. Ajik, J.O. Ancheta, R.A. 2024. A rapid assessment of the status, trends and challenges in small-scale commercial sardine fisheries in the Sulu Archipelago, southern Philippines. Marine Policy. 160: 105965",
				"Barboza, A., Macusi, E.D., Borazon, E.Q., Santos, M.D., Muallil, R.N., Nallos, I.M. 2024. Small-scale fisheries (SSF) management and conservation schemes and their application in the Philippines. Marine Policy. 161: 106018",
				"Muallil, R.N., Injani, A.S., Abduraup, Y.T., Saddari, F.J., Ondo, E.R., Sakilan, A.J., Hapid, M.G.N. and Allama, H.A., 2024. Recent record of True Giant Clam Tridacna gigas from the Sulu Archipelago and insight into the giant clam fisheries and conservation in the southernmost islands of the Philippines. Journal of Threatened Taxa, 16(3), pp.25006-25009.",
				"Arriesgado, D., Arriesgado, E., Roa, E., Perpetua, A., Gonzales, R., Acuña, R., Eballe, R., Bucay, D., Balaba, M., Roa, L. and Janolino, B.B., Mualli, R.N., Mingoc, J., Sornito, M. 2024. Seagrass cover and associated macrobenthic marine invertebrates in Southern Philippines. Aquatic Ecology, pp.1-15.",
				"Rodriguez, J.J.R.B., Cuales, J.M.D., Herrera, M.J.B., Zubiri, L.A.M., Muallil, R.N., Ishmael, A.I., Jimenez, E.B., Stoneking, M. and De Ungria, M.C.A., 2022. Ethical challenges in genetic research among Philippine Indigenous Peoples: Insights from fieldwork in Zamboanga and the Sulu Archipelago. Frontiers in Genetics, p.2869.",
				"Muallil, R.N., Tambihasan, A.M., Enojario, M.J., Tarabasa, R.T., Habibuddin, A.A., Injani, A.S., Ammang, M.A.T., Aksa, A.S. and Nañola Jr, C.L., 2023. Data on the length-weight relationship of 161 species of commercially important coral reef fishes in Tawi-Tawi islands, Southern Philippines. Data in Brief, 50, p.109537."
			],
			description: "Dr. Richard N. Muallil is a distinguished marine scientist and Vice Chancellor for Research, Innovation, Development and Extension. His groundbreaking research in marine conservation and fisheries management has earned him national recognition and numerous prestigious awards."
		},
		halun: {
			name: "Dr. Sitti Zayda B. Halun",
			position: "Director, Seaweed Research and Development Center (SeaRDeC)",
			academicRank: "Professor VI",
			image: "/images/ioes/Faculty/SITTI ZAYDA B. HALUN.jpg",
			education: [
				"Doctor of Philosophy in Biology Major in Marine Ecology",
				"Master of Science in Environmental Science",
				"Bachelor of Science in Biology"
			],
			achievements: [],
			publications: [
				"Halun, Sitti Zayda B., \"The Effects of Fertilization and Simulated Grazing on the Community Structure of a Seagrass Bed in South Florida\" (2011). FIU Electronic Theses and Dissertations. 415.",
				"Z. Halun, J. Terrados, J. Borum, L. Kamp-Nielsen, C. M. Duarte, M. D. Fortes. 2002. Experimental evaluation of the effects of siltation-derived changes in sediment conditions on the Philippine seagrass Cymodocea rotundata. Journal of Experimental Marine Biology and Ecology 279. 73 – 87",
				"Marbà, N., Duarte, C. M., Terrados, J., Halun, Z., Gacia, E., & Fortes, M. D. (2010). Effects of Seagrass Rhizospheres on Sediment Redox Conditions in Se Asian Coastal Ecosystems. Estuaries and Coasts, 33(1), 107-117. DOI: 10.1007/S12237-009-9250-0",
				"Jamodiong EA, Cabaitan PC, Villanueva RD, Halun Z, Illano A, Romero F, Feliciano GN Lanaria ML, Cerna K, Sakilan A, Romero PM, Jimlan A, Ligson CA, Gomez EJ. 2017. Reproductive Patterns of Selected Coral Species in the Philippines Handbook. University of the Philippines Marine Science Institute, Diliman, Quezon City, Philippines"
			],
			description: "Dr. Sitti Zayda B. Halun is a Professor at the Institute of Oceanography and Environmental Science (IOES) and Director of the Seaweed Research and Development Center (SeaRDeC) at Mindanao State University–Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She spearheaded the establishment of SeaRDeC through the Department of Science and Technology's Niche Center in the Region (NICER) program to strengthen seaweed research and innovation in the Philippines. She earned her Ph.D. in Marine Ecology at Florida International University on a Fulbright Scholarship, an M.Sc. in Environmental Science from the University of the Philippines Diliman, and a B.S. in Biology from Silliman University. Dr. Halun's research integrates marine ecology, reproductive biology, and population genetics to advance evidence for climate resilience and sustainable coastal livelihoods. She focuses on blue-carbon ecosystems (seagrasses and mangroves), seaweeds (systematics, cultivation, and post-harvest), and marine invertebrates, linking field ecology with laboratory analyses to inform restoration, management, and value-chain improvements."
		},
		diansuy: {
			name: "Assoc. Prof. Araniza M. Diansuy",
			position: "Director of the Office of Continuing Education and Extension Services (OCEANeS)",
			academicRank: "Associate Professor V",
			image: "/images/ioes/Faculty/ARANIZA M. DIANSUY.jpg",
			education: [
				"Master of Science in Marine Science",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Araniza L. Manulon Diansuy is an Associate Professor V at the Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), where she also serves as the Director for Continuing Education and Extension Services. She holds a Master of Science in Marine Science, major in Marine Biology from the University of the Philippines Diliman, and a Bachelor of Science in Marine Biology from MSU-TCTO. Her research interests center on seaweeds and the ecophysiology of marine plants, with notable contributions to studies on carrageenophyte seedstocks, seaweed farming, and community-based resource management. She has presented her work in various national and international conferences and has co-authored peer-reviewed publications, including recent studies in Marine Policy and the Journal of Threatened Taxa. Over the course of her academic career, she has held leadership roles such as Chairperson of the Marine Biology Department, College Secretary of the Institute of Oceanography and Environmental Science, and Acting Dean of IOES. With over two decades of teaching, research, and extension work at MSU-TCTO, Prof. Diansuy continues to advance marine science education and promote sustainable coastal resource management in Tawi-Tawi and beyond."
		},
		jammang: {
			name: "Assoc. Prof. Nurhima H. Jammang",
			position: "College Secretary, Oceanography and Environmental Science",
			academicRank: "Associate Professor V",
			image: "/images/ioes/Faculty/NURHIMA H. JAMMANG.jpg",
			education: [
				"Master of Science in Teaching Biology",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Nurhima H. Jammang is an Associate Professor at the Institute of Oceanography and Environmental Science (IOES), MSU-TCTO, with a specialization in Disaster Risk Reduction Management. She teaches Environmental Science, Marine Pollution, Ecology, and Climate Change, and is actively engaged in research projects such as the Inventory, Diversity, Assessment and Ethnobotanical Studies of Trees and Pteridophytes in Sumbilang Forest, Panglima Sugala (MOST-funded) and the Comprehensive Intervention Program on Solid Waste Management at Pahut Elementary School, Bongao. She has served as Department Chairperson and currently holds the position of College Secretary of IOES. Her participation in numerous professional trainings on curriculum design, research development, tourism planning, biosecurity, and research ethics reflects her dedication to continuous growth. Through teaching, research, and leadership, she contributes to advancing academic excellence, environmental sustainability, and community development in line with the Institute's mission."
		},
		serag: {
			name: "Assoc. Prof. Karen Joy B. Serag-Endonila",
			position: "Special Assistant to the Office of the Vice Chancellor for Research and Extension",
			academicRank: "Associate Professor V",
			image: "/images/ioes/Faculty/KAREN JOY B. SERAG-ENDONILA.jpg",
			education: [
				"Master of Science in Environmental Science",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [
				"Oral administration of Sargassum polycystum extracts stimulates immune response and increases survival against Aeromonas hydrophila infection in Oncorhynchus mykiss. Authors: Adem Yavuz Sönmez, Soner Bilen, Yiğit Taştan, Karen Joy B Serag, Concepcion C Toring, Jumelita B Romero, Osman Nezih Kenanoğlu, Ertugrul Terzi (2021)",
				"Wild Kappaphycus cf. striatus Growing in a Mangrove Stand in Siasi, Sulu, Philippines. Authors: Jesse Jan M Galera, Jimal A Turong, Aldimar S Bara, Karen Joy B Serag-Endonila, Sitti Zayda B Halun (2023)"
			],
			description: "Karen Joy S. Endonila, Associate Professor, holds a Master of Science in Environmental Science major in Marine Ecology. Her academic and research expertise encompasses marine biodiversity conservation, with a particular focus on sea turtles and seaweed tissue culture. Through her work, she contributes to advancing scientific knowledge, fostering innovative approaches in marine ecological studies, and promoting sustainable management of marine resources. Her research aims to address critical environmental challenges and support the preservation of marine ecosystems for future generations."
		},
		regino: {
			name: "Sitti Amina M. Regino",
			position: "Chairperson, BS Marine Science Program",
			academicRank: "Instructor III",
			image: "/images/ioes/Faculty/SITTI AMINA M. REGINO.jpg",
			education: [
				"Master of Science in Aquaculture",
				"Master of Science in Marine Science (CAR)",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Sitti Amina M. Regino is an Instructor at the Mindanao State University Tawi-Tawi College of Technology and Oceanography, where she also serves as Chairperson of the Marine Biology Program. She earned her Master of Science in Aquaculture from MSU-TCTO. Her research focuses on the nutrition, aquaculture, and production of the invertebrate Dolabella auricularia, as well as Dolastatin extraction. She also specializes in seagrass and mangrove ecosystems. She has presented her work at numerous national and international conferences. With over three decades of teaching experience, she continues to advance marine science education, aquaculture management, and the development of the blue economy in the Philippines."
		},
		julkanain: {
			name: "Anina Haslee A. Julkanain-Ong",
			position: "",
			academicRank: "Instructor II",
			image: "/images/ioes/Faculty/Atty. Pumbaya.jpg",
			education: [
				"Master of Science in Chemical Oceanography (on-going)",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Anina Haslee A. Julkanain-Ong is an Instructor II at the Institute of Oceanography and Environmental Science, currently pursuing her Master of Science in Chemical Oceanography."
		},
		burias: {
			name: "Dahlia P. Burias",
			position: "",
			academicRank: "Instructor I",
			image: "/images/ioes/Faculty/Atty. Pumbaya.jpg",
			education: [
				"Master of Science in Environmental Science (on-going)",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Dahlia P. Burias is an Instructor I at the Institute of Oceanography and Environmental Science, currently pursuing her Master of Science in Environmental Science."
		},
		abdulmajid: {
			name: "Assist. Prof. Nur-Aisa S. Abdulmajid-Basiri",
			position: "Chairperson, BS Environmental Science Program",
			academicRank: "Assistant Professor IV",
			image: "/images/ioes/Faculty/NUR-AISA S. ABDULMAJID.jpg",
			education: [
				"Master of Science in Microbiology",
				"Bachelor of Science in Biology"
			],
			achievements: [],
			publications: [
				"Muallil, R.N., Irilis, R.A., Habibuddin, A.A. Abdulmajid, N.S. Ajik, J.O. Ancheta, R.A. 2024. A rapid assessment of the status, trends and challenges in small-scale commercial sardine fisheries in the Sulu Archipelago, southern Philippines. Marine Policy. 160: 105965"
			],
			description: "Nur-Aisa S. Abdulmajid-Basiri is an Assistant Professor IV at the Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), where she also serves as the Chairperson of Environmental Science Department. She holds a Master of Science in Microbiology from the University of Santo Tomas. Her research interests center on endophytic fungi, food microbiology, and environmental microbiology. She has presented her work in various national conferences and has authored and co-authored peer-reviewed publications. With more than five years of teaching experience, Asst. Prof. Abdulmajid continues to promote sustainable utilization of resources and quality education in MSU-TCTO."
		},
		tambihasan: {
			name: "Ahalnida M. Tambihasan",
			position: "Special Research Assistant to the Office of the Vice Chancellor for Research and Extension",
			academicRank: "Instructor I",
			image: "/images/ioes/Faculty/AHALNIDA TAMBIHASAN.jpg",
			education: [
				"Master of Science in Marine Science Major in Marine Biology",
				"Bachelor of Science in Biology"
			],
			achievements: [],
			publications: [
				"Muallil, R. N., Tambihasan, A. M., Enojario, M. J., Ong, Y. N., & Nañola, C. L. (2020). Inventory of commercially important coral reef fishes in Tawi-Tawi Islands , Southern Philippines : The Heart of the Coral Triangle. Fisheries Research, 230(May), 105640. https://doi.org/10.1016/j.fishres.2020.105640",
				"Muallil, R. N., Tambihasan, A. M., Enojario, M. J., Tarabasa, R. T., Habibuddin, A. A., Injani, A. S., ... & Nañola Jr, C. L. (2023). Data on the length-weight relationship of 161 species of commercially important coral reef fishes in Tawi-Tawi islands, Southern Philippines. Data in Brief, 50, 109537."
			],
			description: "Ahalnida M. Tambihasan, MSc (cand.) Instructor & Special Research Assistant to the Office of Vice Chancellor for Research and Extension — Mindanao State University, Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). Ahalnida Tambihasan is an instructor and researcher specializing in marine biology, coastal resource assessment, and population genetics of marine vertebrates. She holds a B.S. in Biology (Cum Laude) from Mindanao State University and is undertaking graduate studies in Marine Science (Marine Biology) at the University of the Philippines — Marine Science Institute. Ahalnida has led and contributed to field and lab research on coral reef fisheries and scallop population genetics in the Philippines, co-authoring peer-reviewed datasets and fisheries inventories. Her work focuses on bridging community-based resource management with molecular approaches to support sustainable fisheries and conservation in the Coral Triangle region."
		},
		lintasan: {
			name: "Assoc. Prof. Abdurajan B. Lintasan",
			position: "",
			academicRank: "Associate Professor V",
			image: "/images/ioes/Faculty/ABDURAJAN B. LINTASAN.jpg",
			education: [
				"Doctor of Philosophy in Physics (on-going)",
				"Master of Science in Physics",
				"Bachelor of Science in Physics"
			],
			achievements: [],
			publications: [],
			description: "Assoc. Prof. Abdurajan B. Lintasan is an Associate Professor V specializing in Physics at the Institute of Oceanography and Environmental Science."
		},
		abdulwahid: {
			name: "Asst. Prof. Faricia M. Abdulwahid",
			position: "Chief, Integrated Science Laboratory (ISL)",
			academicRank: "Assistant Professor IV",
			image: "/images/ioes/Faculty/FARICIA M. ABDULWAHID.jpg",
			education: [
				"Master in Education - University of Western Australia (2009 - AUS-AID Scholar)",
				"Master of Public Administration - Western Mindanao State University",
				"Bachelor of Science in Chemistry - Western Mindanao State University"
			],
			achievements: [],
			publications: [],
			description: "Faricia M. Abdulwahid was born and raised in the island of Sibutu in the Province of Tawi-Tawi where she finished her elementary and secondary education. She is a holder of Bachelor of Science in Chemistry which she obtained from the Western Mindanao State University (WMSU) in Zamboanga City. It is from the same university she also obtained her Master in Public Administration. Being a registered chemist she was employed at WMSU to teach Chemistry. After ten years at WMSU, she transferred to MSU-TCTO and was assigned at the College of Arts and Sciences (CAS) to teach Chemistry and just recently she is reassigned to the Institute of Oceanography and Environmental Science (IOES). While at MSU-TCTO she got the opportunity to study and obtained her Master in Education at the University of Western Australia in Perth, Western Australia in 2009 as an AUS-AID scholar. At present aside from being a Faculty member of the IOES she is also serving as the Chief of the Integrated Science Laboratory (ISL)."
		},
		mohammad: {
			name: "Asst. Prof. Kimtang Joy H. Mohammad",
			position: "",
			academicRank: "Assistant Professor IV",
			image: "/images/ioes/Faculty/KIMTANG JOY H. MOHAMMAD.jpg",
			education: [
				"Master of Science in Marine Biology",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Ms. Kimtang Joy H. Mohammad is a Cum Laude graduate in Marine Biology from the Institute of Oceanography and Environmental Science, Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), where she now serves as an Assistant Professor IV. She began her research career at the MSU-TCTO Research Office (October 2018–December 2023), where she contributed to studies on the assessment and monitoring of coral recruitment in the waters of Bongao, Tawi-Tawi. Building on this foundation, she expanded her expertise at the Seaweed Research and Development Center (January 2024–July 2025), involved in projects on the production, mass propagation, genetic analysis, and biopolymer evaluation of eucheumatoids for innovative applications. She further strengthened her academic background by earning a Master's degree in Marine Biology from Mindanao State University – Iligan Institute of Technology (MSU-IIT) as a DOST-ASTHRDP scholar. Beyond research, she actively shares her expertise by presenting her work at national and international conferences and by serving as a lecturer in seaweed farmer training programs in Tawi-Tawi, in collaboration with stakeholders, to improve seedling materials and enhance the quality of seaweed stocks."
		},
		rasul: {
			name: "Zharifa G. Rasul, MSc",
			position: "Special Assistant, Secondary Education",
			academicRank: "Teacher I",
			image: "/images/ioes/Faculty/ZHARIFA G. RASUL.jpg",
			education: [
				"Master of Science in Biology",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Zharifa G. Rasul is a faculty member of the Institute of Oceanography and Environmental Science (IOES) at Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), under the Environmental Science Department. She earned her Master of Science in Biology from MSU – Iligan Institute of Technology (MSU-IIT), graduating on July 8, 2024. Her field of specialization is biodiversity, with a particular focus on species diversity and distribution. Her master's thesis, titled \"Diversity and Distribution of Odonata in Two Forest Areas in Northern Mindanao, Philippines,\" highlights her commitment to ecological research and conservation. During her graduate studies, Ms. Rasul actively participated in various seminars and workshops conducted through both online platforms and face-to-face sessions, enhancing her academic and professional competencies. She continues to pursue her passion for biodiversity and environmental science through her teaching and research engagements."
		},
		pon: {
			name: "Monica Mae R. Pon",
			position: "",
			academicRank: "Teacher I",
			image: "/images/ioes/Faculty/MONICA MAE R. PON.jpg",
			education: [
				"Master of Science in Genetics (pursuing) - University of the Philippines Los Baños",
				"Bachelor of Science in Biology (Cum Laude, 2012) - MSU-IIT (DOST-SEI Scholar)"
			],
			achievements: [],
			publications: [
				"Fernigil L Colicol, Charmine Z Puig, Shielamar J Judan, Monica Mae R Pon, Warda H Hadjirul, Fauzia K Sali-Latif, Fatima Zahra V Sali, Julasmin S Kassim. 2025. Critical Reflections and Using Bourdieu-Scheerens Framework in Transformative Mixed Methods Teachers' Licensure Review Evaluation. IJLTER.ORG. 24:1, 542-562",
				"Nurul-Ainie Sapaih Eldani, Monica Mae R. Pon, Efren Tangon, Jan Patrick S. Jaudinez, Harlequin D. Marcial, Rogelio B. Jr Bonggat. 2025. Zoochemicals: secondary metabolites and toxicity potential of soft coral Rumphella aggregata (Nutting, 1910) from Tandubas, Tawi-Tawi, Philippines. AACL Bioflux. 18:4, 1846-1857"
			],
			description: "Monica Mae R. Pon is a dedicated science educator with over 10 years of experience in teaching biology, chemistry, and environmental education at MSU Tawi-Tawi. She holds a Cum laude degree in Biology from MSU-IIT in 2012 as a DOST-SEI scholar and is currently pursuing an MSc in Genetics at the University of the Philippines Los Baños. She has been actively involved in various collegiate and university-wide activities and initiatives throughout the years and have served as Adviser of several academic and non-academic associations in the College of Education, where she previously served. Passionate about nature, Monica enjoys exploring the outdoors, particularly the islands of Tawi-Tawi, and integrates real-world science into her teaching. She is also actively involved in community-based initiatives. Outside of work, she enjoys arts and crafts, K-pop, and 90s OPM music. Coming from a family of educators, she draws inspiration from her parents, and her deep faith shapes her commitment to education and service."
		},
		// Personnel/Staff Data
		hadjirul: {
			name: "Angeline B. Hadjirul",
			position: "Aquaculture Technologist",
			academicRank: "Aquaculture Technologist",
			image: "/images/ioes/Faculty/ANGELINE B. HADJIRUL.jpg",
			education: [
				"Master of Science in Aquaculture",
				"Bachelor of Science in Marine Biology"
			],
			achievements: [],
			publications: [],
			description: "Angeline Hadjirul is a passionate Aquacultural Technologist at MSU-TCTO, Institute of Oceanography and Environmental Science. She holds an M.S. degree in Aquaculture and focuses on seaweed cultivation, aquaculture system design, and sustainable marine farming. Dedicated to promoting eco-friendly aquaculture, she strives to improve the health and well-being of aquatic life. For the past five years, she has inspired students and colleagues as a guest lecturer at the institute."
		},
		kalimuddin: {
			name: "Sharifa K. Kalimuddin",
			position: "Administrative Aide IV",
			academicRank: "Administrative Aide IV",
			image: "/images/ioes/Faculty/SHARIFA KALIMUDDIN.jpg",
			education: [
				"Master of Science in Aquaculture - MSU-TCTO",
				"Bachelor of Science in Information Technology - MSU-TCTO"
			],
			achievements: [],
			publications: [],
			description: "Sharifa K. Kalimuddin is an Administrative Aide IV at the Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving under the Institute of Oceanography and Environmental Science. She holds a Master of Science in Aquaculture and a Bachelor of Science in Information Technology, both from MSU-TCTO. Her academic and professional interests focus on aquaculture, reflecting her commitment to advancing sustainable aquatic food production and environmental stewardship."
		},
		hussin: {
			name: "Bibing A. Hussin",
			position: "Research Assistant & Guest Lecturer",
			academicRank: "Research Assistant",
			image: "/images/ioes/Faculty/BIBING A. HUSSIN.jpg",
			education: [
				"Master's Degree (pursuing) - Universiti Malaysia Terengganu (DOST-SEI Scholarship)",
				"Bachelor of Science in Environmental Science (Magna Cum Laude, 2022) - MSU-TCTO (DBP-Rise Scholar)"
			],
			achievements: [
				"Magna Cum Laude - Bachelor of Science in Environmental Science (2022)",
				"DBP-Rise Scholarship Recipient",
				"Member, Student Announcers of 94.1 Nutriskwela Radyo Kasannangan DXNH-FM MSU-TCTO"
			],
			publications: [],
			description: "Bibing A. Hussin is a distinguished graduate of Bachelor of Science in Environmental Science from Mindanao State University - Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), where she earned her degree Magna Cum Laude in 2022. As an accomplished academic scholar, she was a recipient of the DBP-Rise Scholarship and actively contributed as a member of the Student Announcers of 94.1 Nutriskwela Radyo Kasannangan DXNH-FM MSU-TCTO. Currently, she is pursuing her master's degree at Universiti Malaysia Terengganu, Kuala Terengganu, Malaysia, under the prestigious DOST-SEI Scholarship. Her research interests are centered on marine pollution, with a specific focus on microplastics, reflecting her passion for addressing critical environmental challenges in marine ecosystems."
		},
		gunong: {
			name: "Adzlan D. Gunong",
			position: "Science Research Assistant",
			academicRank: "Science Research Assistant",
			image: "/images/ioes/Faculty/msuguest.png",
			education: [
				"Bachelor of Science in Environmental Science (2020) - MSU-TCTO"
			],
			achievements: [
				"College Student Leadership Award (CSLA)",
				"PRIMe-TP Trainee - University of the Philippines Marine Science Institute (2022)",
				"Lead Facilitator - PRIMe-TP Mindanao at MSU Naawan (2023)",
				"Project Staff - DOST-MOST funded Microplastics Research Project (2023)"
			],
			publications: [],
			description: "Adzlan D. Gunong is a graduate of Bachelor of Science in Environmental Science from Mindanao State University – Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), completing his degree in 2020. He was honored with the College Student Leadership Award (CSLA) for his exemplary service during his undergraduate years. He began his professional career in 2020 as a Laboratory Aide at the Seaweed Research and Development Center (SeaRDeC). In 2021, he worked as a Science Research Assistant at the Research Office, a position he held until 2023. In 2024, he also served as a Science Research Assistant at SeaRDeC. In 2022, Mr. Gunong was selected as one of the trainees for the Plastics Research-Intensive Methods Training Program (PRIMe-TP) at the University of the Philippines Marine Science Institute. The following year, in 2023, he became one of the lead facilitators of the PRIMe-TP Mindanao held at MSU Naawan and was also engaged as Project Staff in a Department of Science and Technology – Ministry of Science and Technology (DOST-MOST) funded project entitled \"Microplastics in Fish and Shellfish of Tawi-Tawi, SW Philippines.\" He has presented his research on microplastics in both national and international conferences, contributing to broader scientific dialogues on marine plastic pollution. Currently, he works as a Science Research Assistant at MSU-TCTO under the Department of the Institute of Oceanography and Environmental Science (IOES), where he applies his academic training to various research and extension initiatives. With a strong academic foundation and a deep appreciation for the marine biodiversity of Tawi-Tawi, Mr. Gunong remains committed to contributing significantly to the protection and sustainable management of the province's rich natural resources."
		},
		salabi: {
			name: "Kilin R. Salabi",
			position: "Research Assistant & Guest Lecturer",
			academicRank: "Research Assistant",
			image: "/images/ioes/Faculty/KILIN R. SALABI.jpg",
			education: [
				"Bachelor of Science in Marine Biology (Magna Cum Laude, 2023) - MSU-TCTO (DBP-RISE Scholar)"
			],
			achievements: [
				"Magna Cum Laude - Bachelor of Science in Marine Biology (2023)",
				"College Student Leadership Award (CSLA)",
				"Gawad Chancellor for Student Journalism",
				"DBP-RISE Scholar Citation",
				"Editor-in-Chief - KAWASA (Official Student Publication of MSU-TCTO)",
				"Associate Editor - KAWASA"
			],
			publications: [],
			description: "Kilin R. Salabi is a graduate of the Bachelor of Science in Marine Biology from MSU-TCTO, completing his degree in 2023 with the academic distinction of Magna Cum Laude. He has been honored with multiple accolades, including the College Student Leadership Award (CSLA), Gawad Chancellor for Student Journalism, and a Citation as a DBP-RISE Scholar. His leadership and editorial experience include serving as Associate Editor and later Editor-in-Chief of KAWASA, the official student publication of MSU-TCTO. He has also participated in various training programs and workshops that strengthened his leadership, communication, and organizational skills. Currently, he works as a Research Assistant at MSU-TCTO, where he applies his academic training to research and extension initiatives. With a strong academic foundation and a deep appreciation for the marine biodiversity of Tawi-Tawi, he is committed to contributing significantly to the protection and sustainable management of the province's rich natural resources."
		}
	};
	
	const faculty = facultyData[facultyId];
	if (!faculty) return;
	
	// Create modal content
	modalBody.innerHTML = `
		<div class="relative">
			<!-- Hero Section -->
			<div class="relative bg-gradient-to-r from-msu-deep-ocean to-msu-bgc-color rounded-t-2xl">
				<div class="flex flex-col items-center justify-center py-8 px-4 md:px-8">
					<div class="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mb-6">
						<img src="${faculty.image}" alt="${faculty.name}" class="w-full h-full object-contain" />
					</div>
					<h1 class="text-3xl md:text-4xl font-bold text-white mb-2 text-center">${faculty.name}</h1>
					<p class="text-xl text-gray-200 text-center">${faculty.position}</p>
					${faculty.academicRank ? `<p class="text-lg text-gray-300 text-center">${faculty.academicRank}</p>` : ''}
				</div>
			</div>
			<!-- Content Section -->
			<div class="p-8 space-y-8">
				<!-- Description -->
				<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-6 rounded-xl border-l-4 border-msu-deep-ocean">
					<p class="text-lg text-msu-main-color dark:text-msu-bgc-color leading-relaxed">${faculty.description}</p>
				</div>
				
				<!-- Education -->
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
						</svg>
						Educational Background
					</h3>
					<div class="space-y-3">
						${faculty.education.map(edu => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${edu}</p>
							</div>
						`).join('')}
					</div>
				</div>
				
				<!-- Achievements -->
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						Key Achievements
					</h3>
					<div class="grid md:grid-cols-2 gap-4">
						${faculty.achievements.map(achievement => `
							<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-4 rounded-lg border-l-4 border-msu-deep-ocean">
								<p class="text-msu-main-color dark:text-msu-bgc-color">${achievement}</p>
							</div>
						`).join('')}
					</div>
				</div>
				
				${faculty.publications && faculty.publications.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Recent Publications
					</h3>
					<div class="space-y-3">
						${faculty.publications.map(publication => `
							<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-4 rounded-lg border-l-4 border-msu-deep-ocean">
								<p class="text-msu-main-color dark:text-msu-bgc-color text-sm">${publication}</p>
							</div>
						`).join('')}
					</div>
				</div>
				` : ''}
				
				${faculty.leadership ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						Leadership Roles
					</h3>
					<div class="space-y-3">
						${faculty.leadership.map(role => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${role}</p>
							</div>
						`).join('')}
					</div>
				</div>
				` : ''}
				
				${faculty.research ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
						</svg>
						Research & Publications
					</h3>
					<div class="space-y-3">
						${faculty.research.map(research => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${research}</p>
							</div>
						`).join('')}
					</div>
				</div>
				` : ''}
				
				${faculty.international ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						International Engagements
					</h3>
					<div class="space-y-3">
						${faculty.international.map(engagement => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${engagement}</p>
							</div>
						`).join('')}
					</div>
				</div>
				` : ''}
				
				${faculty.positions ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
						</svg>
						Professional Experience
					</h3>
					<div class="space-y-3">
						${faculty.positions.map(position => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${position}</p>
							</div>
						`).join('')}
					</div>
				</div>
				` : ''}
			</div>
		</div>
	`;
	// Display modal with animation
	modal.style.display = 'flex';
	modal.classList.remove('hidden');
	
	setTimeout(() => {
		modalContent.classList.remove('scale-95', 'opacity-0');
		modalContent.classList.add('scale-100', 'opacity-100');
	}, 10);
	
	document.body.style.overflow = 'hidden';
	
	// Close the modal when clicking outside or pressing Escape
	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.classList.add('hidden');
		}
	});
	
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			modal.classList.add('hidden');
		}
	});
}

function closeFacultyModal() {
	console.log('Closing modal'); // Debug log
	const modal = document.getElementById('facultyModal');
	const modalContent = document.getElementById('modalContent');
	
	if (!modal || !modalContent) {
		console.error('Modal elements not found for closing');
		return;
	}
	
	// Animate out
	modalContent.classList.remove('scale-100', 'opacity-100');
	modalContent.classList.add('scale-95', 'opacity-0');
	
	// Hide modal after animation
	setTimeout(() => {
		modal.style.display = 'none';
		modal.classList.add('hidden');
		document.body.style.overflow = 'auto';
	}, 300);
}

// Close modal when clicking outside
document.getElementById('facultyModal').addEventListener('click', function(e) {
	if (e.target === this) {
		closeFacultyModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closeFacultyModal();
	}
});

// Guest Lecturer Modal System
function openGuestLecturerModal(lecturerId) {
	console.log('Opening guest lecturer modal for:', lecturerId);
	console.log('Function is being called!');
	const modal = document.getElementById('guestLecturerModal');
	const modalContent = document.getElementById('guestModalContent');
	const modalBody = document.getElementById('guestModalBody');
	
	console.log('Modal elements found:', {
		modal: !!modal,
		modalContent: !!modalContent,
		modalBody: !!modalBody
	});
	
	if (!modal || !modalContent || !modalBody) {
		console.error('Guest lecturer modal elements not found');
		console.error('Modal:', modal);
		console.error('ModalContent:', modalContent);
		console.error('ModalBody:', modalBody);
		return;
	}
	// Guest Lecturer data
	const lecturerData = {
		bara: {
			name: "Atty. Arif T. Bara, CPA",
			position: "Lecturer",
			academicRank: "Lecturer",
			image: "/images/ioes/Faculty/Atty. Bara.jpg",
			personalInfo: {
				surname: "Bara",
				firstName: "Arif",
				middleName: "Tomawis"
			},
			bio: "Arif has 12 years of combined experience in auditing, corporate governance and law, bringing a multidisciplinary approach to financial and legal challenges by seamlessly integrating corporate governance, financial compliance and legal analysis.\n\nWith three years of experience in internal audit, he has led financial, operational, compliance, and consumer business audits, ensuring adherence to IFRS, SOX, and industry regulations. His expertise includes assessing internal controls, risk management, and governance structures, leveraging data analytics to identify risks and enhance compliance. He has conducted consumer business reviews, optimizing revenue assurance, policy adherence, and customer programs.\n\nAs an auditor with over four years of experience in public practice, he has audited clients from various industries such as multilateral development and offshore banks, insurance and holding companies, credit card processing firms, BPOs, manufacturing and retail, construction, and non-profit organizations. His expertise includes preparing consolidated financial statements and executing audit procedures focused on risk assessment, accounting policy compliance, and key financial estimates. He also performs internal control reviews using the COSO 2013 framework to support compliance and strengthen governance.\n\nWhile in law school, he also provided accounting and taxation consulting, assisting clients with financial reporting, tax compliance, and strategic planning. His work includes analyzing financial data, ensuring regulatory compliance, and offering advisory services to optimize business operations and tax efficiency.\n\nCurrently, Arif is a law lecturer, fostering the next generation of legal professionals and incorporating a multidisciplinary approach into legal education.\n\nArif is a Certified Public Accountant (CPA) and a Lawyer, having earned his Juris Doctor degree from the University of the Philippines Diliman and his undergraduate degree in Accounting (cum laude) from the Iligan Institute of Technology of Mindanao State University.",
			specialization: "Accounting, Auditing, Corporate Governance, Taxation and Law",
			education: [
				{
					level: "College",
					school: "Mindanao State University - Iligan Institute of Technology",
					degree: "Bachelor of Science in Accountancy, Cum Laude",
					years: "2007 - 2012"
				},
				{
					level: "Graduate Studies",
					school: "University of the Philippines Diliman",
					degree: "Juris Doctor",
					years: "2020 - 2024"
				}
			],
			accomplishments: [
				{
					date: "April 2012",
					accomplishment: "Cum Laude",
					issuingBody: "Mindanao State University - Iligan Institute of Technology"
				},
				{
					date: "April 2011",
					accomplishment: "Academic Leadership Award",
					issuingBody: "Mindanao State University - Iligan Institute of Technology"
				},
				{
					date: "April 2012",
					accomplishment: "Leadership Award",
					issuingBody: "Philippine Institute of Certified Public Accountants- Iligan City and Lanao del Norte Chapter"
				},
				{
					date: "April 2012",
					accomplishment: "Service Award",
					issuingBody: "National Federation of Junior Philippine Institute of Accountants - Region X and Caraga"
				}
			]
		},
		bucoy: {
			name: "Atty. Arnold C. Bucoy, LL.M.",
			position: "Guest Lecturer",
			academicRank: "Guest Lecturer",
			image: "/images/ioes/Faculty/Atty. Bucoy.jpg",
			personalInfo: {
				surname: "Bucoy",
				firstName: "Arnold",
				middleName: "Cabalida"
			},
			bio: "Atty. Arnold C. Bucoy is a distinguished legal professional with expertise in Civil Law. He brings extensive academic and practical experience to legal education, having pursued advanced studies in law at prestigious institutions.\n\nHis educational journey demonstrates a commitment to excellence in legal studies, progressing from his undergraduate degree in Mass Communication to advanced legal studies culminating in his current pursuit of a Doctor of Civil Law degree.\n\nAs a Guest Lecturer, Atty. Bucoy shares his specialized knowledge in Civil Law with students, providing valuable insights into complex legal principles and practical applications in civil litigation and legal practice.",
			specialization: "Civil Law",
			education: [
				{
					level: "College",
					school: "Western Mindanao State University",
					degree: "AB Mass Communication Broadcasting",
					years: "2007 - 2011"
				},
				{
					level: "Graduate Studies",
					school: "San Beda University",
					degree: "Master of Laws (LL.M.)",
					years: "2018 - 2023"
				},
				{
					level: "Doctoral Studies",
					school: "University of Sto. Tomas",
					degree: "Doctor of Civil Law (DCL)",
					years: "2024 - Present"
				}
			],
			accomplishments: []
		},
		deasis: {
			name: "Atty. Aveneer K. De Asis",
			position: "Guest Lecturer",
			academicRank: "Guest Lecturer",
			image: "/images/ioes/Faculty/Atty. De Asis.jpg",
			personalInfo: {
				surname: "De Asis",
				firstName: "Aveneer",
				middleName: "Kaibing"
			},
			bio: "Atty. Aveneer K. De Asis is a lawyer from the Public Attorney's Office with 9+ years of experience in litigation. He wants to be a beacon of hope for the poor, the underprivileged, the marginalized and the oppressed.\n\nWith extensive experience in both criminal and civil litigation, Atty. De Asis brings practical insights from his work at the Public Attorney's Office, where he has consistently been recognized as a top-performing public attorney.\n\nAs a Guest Lecturer, he shares his expertise in Remedial Law and Criminal Law, providing students with real-world knowledge of courtroom procedures, evidence rules, and legal advocacy for underserved communities.",
			specialization: "Remedial Law (Criminal Procedure, Civil Procedure & the Rules on Evidence) and Criminal Law (Books 1 & 2)",
			education: [
				{
					level: "College",
					school: "MSU-TCTO",
					degree: "Bachelor of Arts in Political Science",
					years: "2002 - 2007"
				},
				{
					level: "Graduate Studies",
					school: "Western Mindanao State University – College of Law",
					degree: "Bachelor of Laws",
					years: "2007 - 2011"
				}
			],
			accomplishments: [
				{
					date: "17 December 2022",
					accomplishment: "Top performing public attorney",
					issuingBody: "PAO IX-B"
				},
				{
					date: "16 December 2023",
					accomplishment: "Top performing public attorney",
					issuingBody: "PAO IX-B"
				}
			]
		},
		disalo: {
			name: "Atty. Al-Noor Majeed B. Disalo",
			position: "Guest Lecturer",
			academicRank: "Guest Lecturer",
			image: "/images/ioes/Faculty/Atty. Disalo.jpg",
			personalInfo: {
				surname: "Disalo",
				firstName: "Al-Noor Majeed",
				middleName: "Barodi"
			},
			bio: "A dedicated law educator. Admitted to the Philippine Bar in 2023, he has been a Guest Lecturer at the MSU - College of Law Iligan, Maguindanao, and Tawi-Tawi Campuses since January 2023. His teaching experience spans a wide range of subjects, including Credit Transactions, Constitutional Law 2, Property Laws, Labor Laws, and Land Titles and Deeds. With a strong focus on Constitutional Law, Atty. Disalo is committed to preparing the next generation of legal professionals with a heart of serving their communities.",
			specialization: "Constitutional Law and Property Law",
			education: [
				{
					level: "College",
					school: "Mindanao State University - Iligan Institute of Technology",
					degree: "Bachelor of Science in General Biology",
					years: "2014 - 2018"
				},
				{
					level: "Graduate Studies",
					school: "San Beda University - College of Law",
					degree: "Juris Doctor",
					years: "2018 - 2023"
				},
				{
					level: "Others",
					school: "Asian Institute of Management - School of Executive Education and Lifelong Learning",
					degree: "Fellowship in the Future Bridging Leadership Program",
					years: "2018 - 2019"
				}
			],
			accomplishments: []
		},
		domado: {
			name: "Atty. Mohamad Rayyan Moxcir Domado",
			position: "Professorial Lecturer",
			academicRank: "Professorial Lecturer",
			image: "/images/ioes/Faculty/Atty. Domado.jpg",
			personalInfo: {
				surname: "Domado",
				firstName: "Mohamad Rayyan",
				middleName: "Moxcir"
			},
			bio: "Atty. Mohamad Rayyan Moxcir Domado is a member of Philippine Bar and Shari'ah Bar. He is a candidate for Masters in Islamic Studies at University of the Philippines-Diliman. Currently, he holds the position of Attorney IV at the Bangsamoro Attorney General's Office.\n\nHe serves as a faculty member at both the Mindanao State University (MSU)-College of Law Iligan, Maguindanao, and Tawi-Tawi Campuses, and also works as a part-time lecturer at Coland Systems Technology Inc. in Cotabato City.\n\nHe both finished his Juris Doctor degree and bachelor's degree in Islamic Studies major in Shariah in MSU-Marawi where he graduated cum laude. Moreover, he also ranked 2nd in the 2011 Special Bar Examinations for Shariah administered by the Supreme Court of the Philippines. His academic excellence and community service made him one of the national finalists of the 2010 Ten Outstanding Students of the Philippines.\n\nHe is affiliated with different socio-civic organizations that empower youth, protection of the environment, and assistance of the legal needs of the underprivileged and marginalized sectors.",
			specialization: "Shari'ah, Administrative Law, Climate Justice",
			education: [
				{
					level: "College",
					school: "Mindanao State University-Marawi",
					degree: "Bachelor of Arts in Shari'ah",
					years: "2006 - 2011"
				},
				{
					level: "Graduate Studies",
					school: "Mindanao State University-Iligan Campus",
					degree: "Juris Doctor",
					years: "2011 - 2016"
				},
				{
					level: "Others",
					school: "University of the Philippines-Diliman",
					degree: "Masters in Islamic Studies",
					years: "2019 - Present"
				}
			],
			accomplishments: [
				{
					date: "April 2011",
					accomplishment: "Cum Laude",
					issuingBody: "Mindanao State University"
				},
				{
					date: "October 2011",
					accomplishment: "National Finalist, 2011 Ten Outstanding Students of the Philippines",
					issuingBody: "Ten Outstanding Students of the Philippines"
				},
				{
					date: "June 2011",
					accomplishment: "Rank 2nd, 2011 Shariah Bar Examination",
					issuingBody: "Supreme Court of the Philippines"
				}
			]
		},
		pumbaya: {
			name: "Atty. Sitty Nor-Aisah M. Pumbaya",
			position: "Admin Officer V (MSU-IIT)",
			academicRank: "Admin Officer V",
			image: "/images/ioes/Faculty/Atty. Pumbaya.jpg",
			personalInfo: {
				surname: "Pumbaya",
				firstName: "Sitty Nor-Aisah",
				middleName: "Macapanton"
			},
			bio: "A lawyer and legal researcher with interest in policy development and governance-related topics. Continues knowledge and experience in areas such as expropriation law, administrative procedures, and gender mainstreaming. Committed to learning, inclusive public service, and contributing to evidence-based initiatives.\n\nAs an Admin Officer V at MSU-Iligan Institute of Technology, she brings her legal expertise to administrative functions while maintaining her passion for policy development and governance. Her work focuses on ensuring that administrative procedures align with legal frameworks and promote inclusive public service.\n\nHer commitment to gender and development (GAD) mainstreaming reflects her dedication to creating more inclusive and equitable policies and procedures in her administrative role.",
			specialization: "Expropriation Law, Administrative Law, Policy Development & Governance, Gender and Development (GAD) Mainstreaming",
			education: [
				{
					level: "College",
					school: "MSU-Iligan Institute of Technology",
					degree: "Bachelor of Arts Major in English",
					years: "2013 - 2017"
				},
				{
					level: "Graduate Studies",
					school: "MSU - College of Law Iligan Extension",
					degree: "Juris Doctor",
					years: "2017 - 2022"
				}
			],
			accomplishments: [
				{
					date: "",
					accomplishment: "Cum Laude",
					issuingBody: "MSU - College of Law"
				},
				{
					date: "",
					accomplishment: "First Honorable Mention",
					issuingBody: "MSU - College of Law"
				},
				{
					date: "",
					accomplishment: "College Debate Awardee",
					issuingBody: "MSU - College of Law"
				},
				{
					date: "",
					accomplishment: "Leadership Awardee",
					issuingBody: "MSU - College of Law"
				},
				{
					date: "",
					accomplishment: "Magna Cum Laude",
					issuingBody: "MSU-Iligan Institute of Technology"
				},
				{
					date: "",
					accomplishment: "College Debate Awardee",
					issuingBody: "MSU - Iligan Institute of Technology"
				},
				{
					date: "",
					accomplishment: "College Leadership Awardee",
					issuingBody: "MSU-Iligan Institute of Technology"
				}
			]
		},
		mamutuk: {
			name: "Judge Jamel T. Mamutuk, CPA, CESE, SCL",
			position: "Guest Lecturer",
			academicRank: "Judge",
			image: "/images/ioes/Faculty/Judge Mamutuk.jpg",
			personalInfo: {
				surname: "Mamutuk",
				firstName: "Jamel",
				middleName: "Tabao"
			},
			bio: "Judge Jamel T. Mamutuk is a distinguished member of the judiciary with extensive credentials including CPA, CESE, and SCL designations. His educational journey spans multiple prestigious institutions, demonstrating his commitment to continuous learning and professional development.\n\nWith his diverse educational background in Accountancy, Law, Public Administration, and Islamic Studies, Judge Mamutuk brings a unique multidisciplinary perspective to the judiciary. His expertise in both conventional and Shari'ah law makes him a valuable contributor to legal education.\n\nJudge Mamutuk's recognition as a top-performing judge with the highest clearance rate in Judicial Region X demonstrates his efficiency and dedication to dispensing justice. His international experience through the Ship for Southeast Asian and Japanese Youth Program (SSEAYP) has broadened his perspective on legal systems and youth leadership.\n\nAs a Guest Lecturer, Judge Mamutuk shares his comprehensive knowledge of criminal procedure, civil procedure, evidence, and Shari'ah procedure with law students, providing practical insights into judicial processes and legal practice.",
			specialization: "Criminal Procedure, Civil Procedure, Evidence, Shari'ah Procedure",
			education: [
				{
					level: "College",
					school: "Mindanao State University – Main Campus",
					degree: "BS Accountancy",
					years: "1991 - 1996"
				},
				{
					level: "College",
					school: "Mindanao State University – Main Campus",
					degree: "Juris Doctor",
					years: "1997 - 2001"
				},
				{
					level: "Graduate Studies",
					school: "Mindanao State University – Maguindanao",
					degree: "Master of Public Administration",
					years: "2004 - 2006"
				},
				{
					level: "Graduate Studies",
					school: "Western Mindanao State University",
					degree: "Doctor of Public Administration",
					years: "2007 - 2022"
				},
				{
					level: "Graduate Studies",
					school: "University of the Philippines - Diliman",
					degree: "Master of Arts in Islamic Studies",
					years: "2022 - Present"
				}
			],
			accomplishments: [
				{
					date: "2008",
					accomplishment: "3rd Placer, Special Shari'a Bar Examinations",
					issuingBody: "Supreme Court of the Philippines"
				},
				{
					date: "2018",
					accomplishment: "Pillar of Youth Leadership Award",
					issuingBody: "Parliament of Youth Leaders, Inc. (National Youth Parliament Alumni Association)"
				},
				{
					date: "2019",
					accomplishment: "Recognition as National Leader of the Philippine Delegation to the Ship for Southeast Asian and Japanese Youth Program (SSEAYP)",
					issuingBody: "Cabinet Office of Japan"
				},
				{
					date: "2022",
					accomplishment: "Recognition for dedicated service and unwavering commitment to dispensing justice",
					issuingBody: "Metropolitan and City Judges Association of the Philippines"
				},
				{
					date: "2023",
					accomplishment: "Top 8 – Highest Clearance Rate Judge for Judicial Region X",
					issuingBody: "Supreme Court of the Philippines"
				}
			]
		},
		cuento: {
			name: "Provincial Prosecutor Jerry Jarantilla Cuento",
			position: "Guest Lecturer",
			academicRank: "Provincial Prosecutor",
			image: "/images/ioes/Faculty/Prosecutor Cuento.jpg",
			personalInfo: {
				surname: "Cuento",
				firstName: "Jerry",
				middleName: "Jarantilla"
			},
			bio: "Provincial Prosecutor Jerry Jarantilla Cuento is a distinguished legal professional with extensive experience in prosecutorial practice and criminal law enforcement. His career in the prosecution service demonstrates his commitment to justice and the rule of law.\n\nAs a Provincial Prosecutor, he brings years of practical experience in criminal prosecution, case management, and legal advocacy. His expertise in prosecutorial procedures and criminal law makes him a valuable contributor to legal education.\n\nProsecutor Cuento's experience in handling various criminal cases provides students with real-world insights into the prosecutorial process, from case evaluation to trial advocacy. His practical knowledge of criminal procedure and evidence rules enhances the learning experience for law students.\n\nAs a Guest Lecturer, Prosecutor Cuento shares his comprehensive knowledge of prosecutorial practice, criminal law, and legal advocacy with law students, providing practical insights into the prosecutorial process and criminal justice system.",
			specialization: "Criminal Prosecution, Criminal Law, Legal Advocacy, Prosecutorial Practice",
			education: [
				{
					level: "Graduate Studies",
					school: "MSU-TCTO",
					degree: "LL.B.",
					years: "1995"
				}
			],
			accomplishments: []
		},
		cader: {
			name: "Atty. Junaid G. Cader",
			position: "Public Attorney II",
			academicRank: "Juris Doctor - Non Thesis",
			image: "/images/ioes/Faculty/Atty. Cader.jpg",
			personalInfo: {
				surname: "Cader",
				firstName: "Junaid",
				middleName: "Guro"
			},
			bio: "A young professional government worker since 2022, Atty. Junaid G. Cader brings fresh perspective and dedication to legal practice. As a Public Attorney II, he is committed to serving the community and upholding justice through his specialized knowledge in Criminal Law and Litigation.",
			specialization: "Criminal Law / Litigation",
			education: [
				{
					level: "College",
					school: "MSU - Marawi City",
					degree: "Bachelor of Arts - English",
					years: "2013 - 2017"
				},
				{
					level: "Graduate Studies",
					school: "University of San Carlos - School of Law and Governance",
					degree: "Juris Doctor - Non Thesis",
					years: "2017 - 2021"
				}
			],
			accomplishments: []
		},
		maruhom: {
			name: "Atty. Datu Esma Mikee P. Maruhom",
			position: "Assistant Dean",
			academicRank: "Associate Professor",
			image: "/images/col/Profile/DATU ESMA MIKEE P. MARUHOM.jpg",
			personalInfo: {
				surname: "Maruhom",
				firstName: "Datu Esma Mikee",
				middleName: "Pantaran"
			},
			bio: "Atty. Datu Esma Mikee Pantaran Maruhom is currently serving as the Assistant Dean of the College of Law, and concurrently designated as Chief-of-staff and Head Executive Assistant to the Office of the Chancellor.\n\nAtty. Maruhom was an active student leader during his undergraduate years in MSU-IIT which made him Student Regent of the Mindanao State University System. While studying law, he joined MSU-TCTO as Special Assistant for Public Relations under the Office of the Chancellor.\n\nPresently, Atty. Maruhom is currently teaching political law subjects, particularly on Constitutional Law courses. He is also actively engaged in research and preservation initiatives concerning peace, culture and history while also championing the mainstreaming of Shariah legal education and legal practice.",
			specialization: "Constitutional Law",
			education: [
				{
					level: "College",
					school: "MSU Iligan Institute of Technology",
					degree: "BA English",
					years: "2011 - 2016"
				},
				{
					level: "Graduate Studies",
					school: "University of San Jose - Recoletos",
					degree: "Juris Doctor",
					years: "2016 - 2021"
				},
				{
					level: "Others",
					school: "Asian Institute of Management",
					degree: "Executive Course - Bridging Leadership",
					years: "2017 - 2018"
				}
			],
			accomplishments: [
				{
					date: "2016",
					accomplishment: "University Student Leadership Award",
					issuingBody: "MSU-IIT"
				},
				{
					date: "2015",
					accomplishment: "Leadership Award",
					issuingBody: "MSU Alumni Association"
				},
				{
					date: "2015",
					accomplishment: "Outstanding Youth Leadership Award",
					issuingBody: "City Government of Iligan"
				}
			]
		},
		matba: {
			name: "Atty. Ymil Rjiv D. Matba",
			position: "Lecturer",
			academicRank: "Lecturer",
			image: "/images/ioes/Faculty/Atty. Matba.jpg",
			personalInfo: {
				surname: "Matba",
				firstName: "Ymil Rjiv",
				middleName: "Dela Torre"
			},
			bio: "Atty. Ymil Rjiv D. Matba is currently the managing partner of Batocabe and Partners Law Offices. He brings extensive experience in civil and criminal litigation as well as labor compliance, providing practical insights into the legal profession and ethical considerations.",
			specialization: "Civil and criminal litigation, labor compliance",
			education: [
				{
					level: "College",
					school: "University of the Philippines",
					degree: "BA Political Science",
					years: "2007 - 2011"
				},
				{
					level: "Graduate Studies",
					school: "University of the Philippines",
					degree: "Juris Doctor",
					years: "2013 - 2018"
				}
			],
			accomplishments: []
		},
		nagamora: {
			name: "Prosecutor Jamairah A. Nagamora",
			position: "Lecturer",
			academicRank: "Lecturer",
			image: "/images/ioes/Faculty/Prosecutor Nagamora.jpg",
			personalInfo: {
				surname: "Nagamora",
				firstName: "Jamairah",
				middleName: "Abdul"
			},
			bio: "Prosecutor Jamairah A. Nagamora is an experienced legal professional specializing in litigation and legislation. She brings practical insights from her prosecutorial experience and is recognized for her work in human rights advocacy, having received recognition from the Bangsamoro Human Rights Commission.",
			specialization: "Litigation and Legislation",
			education: [
				{
					level: "College",
					school: "MSU-IIT",
					degree: "AB Political Science",
					years: "2012 - 2016"
				},
				{
					level: "Graduate Studies",
					school: "University of San Carlos",
					degree: "Juris Doctor – International Law Practice",
					years: "2017 - 2021"
				}
			],
			accomplishments: [
				{
					date: "12/2023",
					accomplishment: "Plaque of Recognition as Human Rights Worker",
					issuingBody: "Bangsamoro Human Rights Commission"
				}
			],
			publications: [
				{
					date: "11/2016",
					title: "Facial Morphometrics, Voters' Facial Preferences, and Electoral Outcomes",
					publisher: "Journal of Government and Politics"
				}
			]
		}
	};
	
	const lecturer = lecturerData[lecturerId];
	if (!lecturer) {
		console.error('Guest lecturer data not found for:', lecturerId);
		return;
	}
	
	// Populate modal content
	modalBody.innerHTML = `
		<div class="p-6">
			<!-- Header Section -->
			<div class="flex flex-col md:flex-row gap-6 mb-8">
				<div class="flex-shrink-0">
					<img src="${lecturer.image}" alt="${lecturer.name}" class="w-48 h-48 object-cover rounded-full mx-auto md:mx-0 border-4 border-msu-deep-ocean shadow-lg">
				</div>
				<div class="flex-1">
					<h2 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-2">${lecturer.name}</h2>
					<p class="text-lg text-msu-deep-ocean dark:text-msu-bgc-color mb-4">${lecturer.position}</p>
					<p class="text-md text-gray-600 dark:text-gray-300 mb-4"><strong>Academic Rank:</strong> ${lecturer.academicRank}</p>
				</div>
			</div>
			
			<!-- Personal Information -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Personal Information</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surname</label>
						<p class="text-gray-900 dark:text-gray-100">${lecturer.personalInfo.surname}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
						<p class="text-gray-900 dark:text-gray-100">${lecturer.personalInfo.firstName}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Middle Name</label>
						<p class="text-gray-900 dark:text-gray-100">${lecturer.personalInfo.middleName}</p>
					</div>
				</div>
			</div>
			
			<!-- Bio Section -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Short Personal or Professional Bio</h3>
				<div class="prose dark:prose-invert max-w-none">
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">${lecturer.bio}</p>
				</div>
			</div>
			
			<!-- Areas of Specialization -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Areas of Specialization</h3>
				<p class="text-gray-700 dark:text-gray-300">${lecturer.specialization}</p>
			</div>
			<!-- Educational Background -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Educational Background</h3>
				<div class="overflow-x-auto">
					<table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Level</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Name of School</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Degree</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Years Attended</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 dark:divide-gray-600">
							${lecturer.education.map(edu => `
								<tr>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${edu.level}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${edu.school}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${edu.degree}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${edu.years}</td>
								</tr>
							`).join('')}
						</tbody>
					</table>
				</div>
			</div>
			
			<!-- Accomplishments and Recognitions -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Accomplishments and Recognitions</h3>
				<div class="overflow-x-auto">
					<table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Date</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Accomplishments and Recognitions</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Issuing Body</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 dark:divide-gray-600">
							${lecturer.accomplishments.map(acc => `
								<tr>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${acc.date}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${acc.accomplishment}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${acc.issuingBody}</td>
								</tr>
							`).join('')}
						</tbody>
					</table>
				</div>
			</div>
			
			${lecturer.publications ? `
			<!-- Recent Publications -->
			<div class="mb-8">
				<h3 class="text-xl font-semibold text-msu-main-color dark:text-msu-bgc-color mb-4 border-b-2 border-msu-deep-ocean pb-2">Recent Publications</h3>
				<div class="overflow-x-auto">
					<table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Date Published</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Title of Publication / Type of Publication</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">Publisher/Journal</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 dark:divide-gray-600">
							${lecturer.publications.map(pub => `
								<tr>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${pub.date}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${pub.title}</td>
									<td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">${pub.publisher}</td>
								</tr>
							`).join('')}
						</tbody>
					</table>
				</div>
			</div>
			` : ''}
		</div>
	`;
	
	// Show modal with animation
	modal.style.display = 'flex';
	modal.classList.remove('hidden');
	
	// Animate in
	setTimeout(() => {
		modalContent.classList.remove('scale-95', 'opacity-0');
		modalContent.classList.add('scale-100', 'opacity-100');
	}, 10);
	
	// Prevent body scroll
	document.body.style.overflow = 'hidden';
}

function closeGuestLecturerModal() {
	console.log('Closing guest lecturer modal');
	const modal = document.getElementById('guestLecturerModal');
	const modalContent = document.getElementById('guestModalContent');
	
	if (!modal || !modalContent) {
		console.error('Guest lecturer modal elements not found for closing');
		return;
	}
	
	// Animate out
	modalContent.classList.remove('scale-100', 'opacity-100');
	modalContent.classList.add('scale-95', 'opacity-0');
	
	// Hide modal after animation
	setTimeout(() => {
		modal.style.display = 'none';
		modal.classList.add('hidden');
		document.body.style.overflow = 'auto';
	}, 300);
}

// Close guest lecturer modal when clicking outside
document.getElementById('guestLecturerModal').addEventListener('click', function(e) {
	if (e.target === this) {
		closeGuestLecturerModal();
	}
});

// Handle Escape key for both modals
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		const facultyModal = document.getElementById('facultyModal');
		const guestModal = document.getElementById('guestLecturerModal');
		
		if (facultyModal && !facultyModal.classList.contains('hidden')) {
			closeFacultyModal();
		} else if (guestModal && !guestModal.classList.contains('hidden')) {
			closeGuestLecturerModal();
		}
	}
});

// Expose functions to global scope
(window as any).openGuestLecturerModal = openGuestLecturerModal;
(window as any).closeGuestLecturerModal = closeGuestLecturerModal;

// Guest Lecturer Search Functionality
function searchGuestLecturers() {
	const searchInput = document.getElementById('guestLecturerSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearGuestLecturerSearch') as HTMLElement;
	const resultsDiv = document.getElementById('guestLecturerSearchResults') as HTMLElement;
	const searchTerm = searchInput.value.toLowerCase().trim();
	
	// Show/hide clear button
	if (searchTerm.length > 0) {
		clearButton.style.display = 'flex';
	} else {
		clearButton.style.display = 'none';
		resultsDiv.style.display = 'none';
	}
	
	// Get all guest lecturer cards (both visible and hidden)
	const allCards = document.querySelectorAll('#guestLecturerGrid .bg-white.rounded-xl.shadow-lg, .additional-guest-lecturer-card');
	let visibleCount = 0;
	let totalCount = allCards.length;
	
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		const nameElement = cardElement.querySelector('h3');
		const positionElement = cardElement.querySelector('p');
		const specializationElement = cardElement.querySelector('span');
		const descriptionElement = cardElement.querySelector('.text-msu-main-color');
		
		let isMatch = false;
		
		if (searchTerm === '') {
			// Show all cards if no search term
			isMatch = true;
		} else {
			// Check if any text content matches the search term
			const nameText = nameElement?.textContent?.toLowerCase() || '';
			const positionText = positionElement?.textContent?.toLowerCase() || '';
			const specializationText = specializationElement?.textContent?.toLowerCase() || '';
			const descriptionText = descriptionElement?.textContent?.toLowerCase() || '';
			
			isMatch = nameText.includes(searchTerm) || 
					 positionText.includes(searchTerm) || 
					 specializationText.includes(searchTerm) || 
					 descriptionText.includes(searchTerm);
		}
		
		if (isMatch) {
			// Show matching cards, but respect the additional card's collapsed state when search is cleared
			if (searchTerm !== '') {
				cardElement.style.display = 'block';
				cardElement.classList.remove('hidden');
			} else {
				// If search is cleared, only show non-additional cards or additional cards if they were previously shown
				const isAdditionalCard = cardElement.classList.contains('additional-guest-lecturer-card');
				const showMoreText = document.getElementById('showMoreGuestLecturersText') as HTMLElement;
				const isExpanded = showMoreText?.textContent === 'Show Less Guest Lecturers';
				
				if (!isAdditionalCard || isExpanded) {
					cardElement.style.display = 'block';
					cardElement.classList.remove('hidden');
				} else {
					cardElement.style.display = '';
					cardElement.classList.add('hidden');
				}
			}
			visibleCount++;
			
			// Add highlight effect for search term
			if (searchTerm !== '') {
				cardElement.style.border = '2px solid #1e40af'; // blue-800
				cardElement.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
			} else {
				cardElement.style.border = '';
				cardElement.style.boxShadow = '';
			}
		} else {
			cardElement.style.display = 'none';
			cardElement.classList.add('hidden');
		}
	});
	// Update search results display
	if (searchTerm !== '') {
		resultsDiv.style.display = 'block';
		resultsDiv.innerHTML = `Found ${visibleCount} of ${totalCount} guest lecturers matching "${searchTerm}"`;
	} else {
		resultsDiv.style.display = 'none';
	}
}

function clearGuestLecturerSearch() {
	const searchInput = document.getElementById('guestLecturerSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearGuestLecturerSearch') as HTMLElement;
	const resultsDiv = document.getElementById('guestLecturerSearchResults') as HTMLElement;
	
	searchInput.value = '';
	clearButton.style.display = 'none';
	resultsDiv.style.display = 'none';
	
	// Show all cards and remove highlights
	const allCards = document.querySelectorAll('#guestLecturerGrid .bg-white.rounded-xl.shadow-lg, .additional-guest-lecturer-card');
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		cardElement.style.display = 'block';
		cardElement.classList.remove('hidden');
		cardElement.style.border = '';
		cardElement.style.boxShadow = '';
	});
}
// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.getElementById('guestLecturerSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearGuestLecturerSearch') as HTMLElement;
	
	if (searchInput) {
		searchInput.addEventListener('input', searchGuestLecturers);
		searchInput.addEventListener('keyup', function(e) {
			if (e.key === 'Escape') {
				clearGuestLecturerSearch();
			}
		});
	}
	
	if (clearButton) {
		clearButton.addEventListener('click', clearGuestLecturerSearch);
	}
});

// Expose search functions to global scope
(window as any).searchGuestLecturers = searchGuestLecturers;
(window as any).clearGuestLecturerSearch = clearGuestLecturerSearch;

// Faculty Search Functionality
function searchFaculty() {
	const searchInput = document.getElementById('facultySearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearFacultySearch') as HTMLElement;
	const resultsDiv = document.getElementById('facultySearchResults') as HTMLElement;
	const searchTerm = searchInput.value.toLowerCase().trim();
	
	// Show/hide clear button
	if (searchTerm.length > 0) {
		clearButton.style.display = 'flex';
	} else {
		clearButton.style.display = 'none';
		resultsDiv.style.display = 'none';
	}
	
	// Get all faculty cards (both visible and hidden)
	const allCards = document.querySelectorAll('#facultyGrid .bg-white.rounded-xl.shadow-lg');
	let visibleCount = 0;
	let totalCount = allCards.length;
	
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		const nameElement = cardElement.querySelector('h3');
		const positionElement = cardElement.querySelector('.text-gray-300.text-sm');
		const specializationElement = cardElement.querySelector('.flex.items-center.mb-4 span');
		const descriptionElement = cardElement.querySelector('.text-msu-main-color.dark\\:text-msu-bgc-color.mb-4');
		
		let isMatch = false;
		
		if (searchTerm === '') {
			// Show all cards if no search term
			isMatch = true;
		} else {
			// Check if any text content matches the search term
			const nameText = nameElement?.textContent?.toLowerCase() || '';
			const positionText = positionElement?.textContent?.toLowerCase() || '';
			const specializationText = specializationElement?.textContent?.toLowerCase() || '';
			const descriptionText = descriptionElement?.textContent?.toLowerCase() || '';
			
			isMatch = nameText.includes(searchTerm) || 
					 positionText.includes(searchTerm) || 
					 specializationText.includes(searchTerm) || 
					 descriptionText.includes(searchTerm);
		}
		if (isMatch) {
			// Show matching cards, but respect the additional card's collapsed state when search is cleared
			if (searchTerm !== '') {
				cardElement.style.display = 'block';
				cardElement.classList.remove('hidden');
			} else {
				// If search is cleared, only show non-additional cards or additional cards if they were previously shown
				const isAdditionalCard = cardElement.id && cardElement.id.startsWith('additionalFaculty');
				const showMoreText = document.getElementById('showMoreText') as HTMLElement;
				const isExpanded = showMoreText?.textContent === 'Show Less Faculty';
				
				if (!isAdditionalCard || isExpanded) {
					cardElement.style.display = 'block';
					cardElement.classList.remove('hidden');
				} else {
					cardElement.style.display = '';
					cardElement.classList.add('hidden');
				}
			}
			visibleCount++;
			
			// Add highlight effect for search term
			if (searchTerm !== '') {
				cardElement.style.border = '2px solid #1e40af'; // blue-800
				cardElement.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
			} else {
				cardElement.style.border = '';
				cardElement.style.boxShadow = '';
			}
		} else {
			cardElement.style.display = 'none';
			cardElement.classList.add('hidden');
		}
	});
	// Update search results display
	if (searchTerm !== '') {
		resultsDiv.style.display = 'block';
		resultsDiv.innerHTML = `Found ${visibleCount} of ${totalCount} faculty members matching "${searchTerm}"`;
	} else {
		resultsDiv.style.display = 'none';
	}
}

function clearFacultySearch() {
	const searchInput = document.getElementById('facultySearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearFacultySearch') as HTMLElement;
	const resultsDiv = document.getElementById('facultySearchResults') as HTMLElement;
	
	searchInput.value = '';
	clearButton.style.display = 'none';
	resultsDiv.style.display = 'none';
	
	// Show all cards and remove highlights, respecting the show more/less state
	const allCards = document.querySelectorAll('#facultyGrid .bg-white.rounded-xl.shadow-lg');
	const showMoreText = document.getElementById('showMoreText') as HTMLElement;
	const isExpanded = showMoreText?.textContent === 'Show Less Faculty';
	
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		const isAdditionalCard = cardElement.id && cardElement.id.startsWith('additionalFaculty');
		
		cardElement.style.border = '';
		cardElement.style.boxShadow = '';
		
		// Only show non-additional cards or additional cards if expanded
		if (!isAdditionalCard || isExpanded) {
			cardElement.style.display = 'block';
			cardElement.classList.remove('hidden');
		} else {
			cardElement.style.display = '';
			cardElement.classList.add('hidden');
		}
	});
}

// Initialize faculty search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.getElementById('facultySearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearFacultySearch') as HTMLElement;
	
	if (searchInput) {
		searchInput.addEventListener('input', searchFaculty);
		searchInput.addEventListener('keyup', function(e) {
			if (e.key === 'Escape') {
				clearFacultySearch();
			}
		});
	}
	
	if (clearButton) {
		clearButton.addEventListener('click', clearFacultySearch);
	}
});
// Expose search functions to global scope
(window as any).searchFaculty = searchFaculty;
(window as any).clearFacultySearch = clearFacultySearch;

// Personnel Search Functionality
function searchPersonnel() {
	const searchInput = document.getElementById('personnelSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearPersonnelSearch') as HTMLElement;
	const resultsDiv = document.getElementById('personnelSearchResults') as HTMLElement;
	const searchTerm = searchInput.value.toLowerCase().trim();
	
	// Show/hide clear button
	if (searchTerm.length > 0) {
		clearButton.style.display = 'flex';
	} else {
		clearButton.style.display = 'none';
		resultsDiv.style.display = 'none';
	}
	
	// Get all personnel cards
	const allCards = document.querySelectorAll('#personnelGrid .personnel-card');
	let visibleCount = 0;
	let totalCount = allCards.length;
	
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		const nameElement = cardElement.querySelector('h3');
		const positionElement = cardElement.querySelector('p');
		
		let isMatch = false;
		
		if (searchTerm === '') {
			// Show all cards if no search term
			isMatch = true;
		} else {
			// Check if any text content matches the search term
			const nameText = nameElement?.textContent?.toLowerCase() || '';
			const positionText = positionElement?.textContent?.toLowerCase() || '';
			
			isMatch = nameText.includes(searchTerm) || positionText.includes(searchTerm);
		}
		
		if (isMatch) {
			cardElement.style.display = 'block';
			cardElement.classList.remove('hidden');
			visibleCount++;
			
			// Add highlight effect for search term
			if (searchTerm !== '') {
				const imgContainer = cardElement.querySelector('.relative.w-28') as HTMLElement;
				if (imgContainer) {
					imgContainer.style.border = '4px solid #1e40af';
					imgContainer.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
				}
			} else {
				const imgContainer = cardElement.querySelector('.relative.w-28') as HTMLElement;
				if (imgContainer) {
					imgContainer.style.border = '';
					imgContainer.style.boxShadow = '';
				}
			}
		} else {
			cardElement.style.display = 'none';
			cardElement.classList.add('hidden');
		}
	});
	
	// Update search results display
	if (searchTerm !== '') {
		resultsDiv.style.display = 'block';
		resultsDiv.innerHTML = `Found ${visibleCount} of ${totalCount} personnel matching "${searchTerm}"`;
	} else {
		resultsDiv.style.display = 'none';
	}
}

function clearPersonnelSearch() {
	const searchInput = document.getElementById('personnelSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearPersonnelSearch') as HTMLElement;
	const resultsDiv = document.getElementById('personnelSearchResults') as HTMLElement;
	
	searchInput.value = '';
	clearButton.style.display = 'none';
	resultsDiv.style.display = 'none';
	
	// Show all cards and remove highlights
	const allCards = document.querySelectorAll('#personnelGrid .personnel-card');
	allCards.forEach((card: Element) => {
		const cardElement = card as HTMLElement;
		cardElement.style.display = 'block';
		cardElement.classList.remove('hidden');
		
		const imgContainer = cardElement.querySelector('.relative.w-28') as HTMLElement;
		if (imgContainer) {
			imgContainer.style.border = '';
			imgContainer.style.boxShadow = '';
		}
	});
}

// Initialize personnel search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	const searchInput = document.getElementById('personnelSearch') as HTMLInputElement;
	const clearButton = document.getElementById('clearPersonnelSearch') as HTMLElement;
	
	if (searchInput) {
		searchInput.addEventListener('input', searchPersonnel);
		searchInput.addEventListener('keyup', function(e) {
			if (e.key === 'Escape') {
				clearPersonnelSearch();
			}
		});
	}
	
	if (clearButton) {
		clearButton.addEventListener('click', clearPersonnelSearch);
	}
});

// Expose search functions to global scope
(window as any).searchPersonnel = searchPersonnel;
(window as any).clearPersonnelSearch = clearPersonnelSearch;

// Enhanced Mobile-Optimized PDF Viewer System (Sulimbang Style)
let currentPdfUrl = '';
let currentPdfTitle = '';
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
let canvas = null;
let ctx = null;
let nextCanvas = null;
let nextCtx = null;
let isAnimating = false;
let baseScale = 1.0;

// Professional PDF Viewer functions
async function openPDFViewer(pdfUrl, title) {
	console.log('Opening professional PDF viewer:', { pdfUrl, title });
	
	// Check if PDF URL is valid
	if (!pdfUrl || pdfUrl === '' || pdfUrl === '#') {
		console.error('Invalid PDF URL:', pdfUrl);
		alert('PDF file not available for this program.');
		return;
	}
	
	// Store current PDF info
	currentPdfUrl = pdfUrl;
	currentPdfTitle = title;
	
	// Open the modal
	const modal = document.getElementById('pdfViewerModal');
	const titleElement = document.getElementById('modalPdfTitle');
	const loadingElement = document.getElementById('pdfLoading');
	const errorElement = document.getElementById('pdfError');
	const pdfViewerElement = document.getElementById('pdfViewer');
	
	if (modal && titleElement) {
		// Set title - more mobile-friendly truncation
		const isMobile = window.innerWidth < 640;
		const maxLength = isMobile ? 25 : 40;
		const displayTitle = title && title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
		titleElement.textContent = displayTitle || 'MSU-TCTO Program Viewer';
		
		// Show loading state
		if (loadingElement) loadingElement.classList.remove('hidden');
		if (errorElement) errorElement.classList.add('hidden');
		
		// Open modal
		modal.classList.remove('hidden');
		document.body.style.overflow = 'hidden';
		
		// Initialize PDF viewer
		await initializePdfViewer();
	}
}
async function initializePdfViewer() {
	try {
		// Load PDF.js library dynamically
		if (typeof (window as any).pdfjsLib === 'undefined') {
			await loadPdfJs();
		}
		
		// Set up canvas containers
		const currentPageContainer = document.getElementById('currentPageContainer');
		const nextPageContainer = document.getElementById('nextPageContainer');
		if (!currentPageContainer || !nextPageContainer) return;
		
		// Clear previous content
		currentPageContainer.innerHTML = '';
		nextPageContainer.innerHTML = '';
		
		// Create main canvas
		canvas = document.createElement('canvas');
		canvas.id = 'pdfCanvas';
		canvas.className = 'shadow-lg border border-gray-200 rounded-lg';
		canvas.style.maxWidth = '100%';
		canvas.style.maxHeight = '100%';
		canvas.style.width = 'auto';
		canvas.style.height = 'auto';
		ctx = canvas.getContext('2d');
		
		// Create next page canvas for animations
		nextCanvas = document.createElement('canvas');
		nextCanvas.id = 'nextPdfCanvas';
		nextCanvas.className = 'shadow-lg border border-gray-200 rounded-lg';
		nextCanvas.style.maxWidth = '100%';
		nextCanvas.style.maxHeight = '100%';
		nextCanvas.style.width = 'auto';
		nextCanvas.style.height = 'auto';
		nextCtx = nextCanvas.getContext('2d');
		
		currentPageContainer.appendChild(canvas);
		nextPageContainer.appendChild(nextCanvas);
		
		// Load the PDF
		const loadingTask = (window as any).pdfjsLib.getDocument(currentPdfUrl);
		pdfDoc = await loadingTask.promise;
		
		// Update page info
		updatePageInfo();
		
		// Render first page
		await renderPage(pageNum);
		
		// Hide loading
		const loadingElement = document.getElementById('pdfLoading');
		if (loadingElement) loadingElement.classList.add('hidden');
		
	} catch (error) {
		console.error('Error loading PDF:', error);
		showPdfError();
	}
}

async function loadPdfJs() {
	return new Promise((resolve, reject) => {
		// Load PDF.js from CDN
		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
		script.onload = () => {
			// Set worker path
			(window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
			resolve(undefined);
		};
		script.onerror = reject;
		document.head.appendChild(script);
	});
}
function updatePageInfo() {
	const pageInfoElement = document.getElementById('pageInfo');
	if (pageInfoElement && pdfDoc) {
		pageInfoElement.textContent = `${pageNum} / ${pdfDoc.numPages}`;
		console.log('Page info updated:', `${pageNum} / ${pdfDoc.numPages}`);
	}
	
	updateNavigationButtons();
}
function updateNavigationButtons() {
	// Update navigation buttons in PDF viewer modal
	const prevButton = document.getElementById('pdfPrevPage');
	const nextButton = document.getElementById('pdfNextPage');
	
	if (prevButton) {
		const isDisabled = pageNum <= 1 || isAnimating;
		(prevButton as HTMLButtonElement).disabled = isDisabled;
		if (isDisabled) {
			prevButton.classList.add('opacity-50', 'cursor-not-allowed');
			prevButton.style.pointerEvents = 'none';
		} else {
			prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
			prevButton.style.pointerEvents = 'auto';
		}
		console.log('Previous button state:', { pageNum, isAnimating, disabled: isDisabled });
	}
	
	if (nextButton) {
		const isDisabled = pageNum >= pdfDoc?.numPages || isAnimating;
		(nextButton as HTMLButtonElement).disabled = isDisabled;
		if (isDisabled) {
			nextButton.classList.add('opacity-50', 'cursor-not-allowed');
			nextButton.style.pointerEvents = 'none';
		} else {
			nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
			nextButton.style.pointerEvents = 'auto';
		}
		console.log('Next button state:', { pageNum, totalPages: pdfDoc?.numPages, isAnimating, disabled: isDisabled });
	}
}

async function renderPage(num) {
	pageRendering = true;
	
	try {
		const page = await pdfDoc.getPage(num);
		
		// Calculate optimal scale to fit the container - Enhanced for mobile
		const container = document.getElementById('pageFlipContainer');
		if (container) {
			const containerRect = container.getBoundingClientRect();
			const pageViewport = page.getViewport({ scale: 1.0 });
			
			// Mobile-optimized padding
			const isMobile = window.innerWidth < 768;
			const padding = isMobile ? 20 : 40;
			
			// Calculate scale to fit both width and height with padding
			const scaleX = (containerRect.width - padding) / pageViewport.width;
			const scaleY = (containerRect.height - padding) / pageViewport.height;
			const fitScale = Math.min(scaleX, scaleY, isMobile ? 2.0 : 3.0); // Lower max scale for mobile
			
			// Set base scale for fit-to-screen if not set
			if (baseScale === 1.0) {
				baseScale = fitScale;
			}
			
			const optimalScale = fitScale * scale;
			
			const viewport = page.getViewport({ scale: optimalScale });
			
			// Set canvas dimensions
			if (canvas && ctx) {
				canvas.height = viewport.height;
				canvas.width = viewport.width;
				
				// Render PDF page into canvas context
				const renderContext = {
					canvasContext: ctx,
					viewport: viewport
				};
				
				await page.render(renderContext).promise;
			}
		}
		
		pageRendering = false;
		
		if (pageNumPending !== null) {
			renderPage(pageNumPending);
			pageNumPending = null;
		}
		
	} catch (error) {
		console.error('Error rendering page:', error);
		pageRendering = false;
	}
}

function queueRenderPage(num) {
	if (pageRendering) {
		pageNumPending = num;
	} else {
		renderPage(num);
	}
}

async function onPrevPage() {
	console.log('onPrevPage called:', { pageNum, isAnimating, totalPages: pdfDoc?.numPages });
	if (pageNum <= 1 || isAnimating) {
		console.log('onPrevPage blocked:', { reason: pageNum <= 1 ? 'first page' : 'animating' });
		return;
	}
	try {
		console.log('Starting previous page animation...');
		await animatePageFlip('prev');
		console.log('Previous page animation completed');
	} catch (error) {
		console.error('Error in onPrevPage:', error);
		isAnimating = false;
		updateNavigationButtons();
	}
}
async function onNextPage() {
	console.log('onNextPage called:', { pageNum, isAnimating, totalPages: pdfDoc?.numPages });
	if (pageNum >= pdfDoc?.numPages || isAnimating) {
		console.log('onNextPage blocked:', { reason: pageNum >= pdfDoc?.numPages ? 'last page' : 'animating' });
		return;
	}
	try {
		console.log('Starting next page animation...');
		await animatePageFlip('next');
		console.log('Next page animation completed');
	} catch (error) {
		console.error('Error in onNextPage:', error);
		isAnimating = false;
		updateNavigationButtons();
	}
}

async function animatePageFlip(direction) {
	console.log('animatePageFlip called:', { direction, isAnimating, pageNum });
	if (isAnimating) {
		console.log('Animation already in progress, returning');
		return;
	}
	
	isAnimating = true;
	updateNavigationButtons(); // Disable buttons immediately

	const pageFlipContainer = document.getElementById('pageFlipContainer');
	const nextPageContainer = document.getElementById('nextPageContainer');
	const pageTurnShadow = document.getElementById('pageTurnShadow');
	
	if (!pageFlipContainer || !nextPageContainer || !pageTurnShadow) {
		isAnimating = false;
		return;
	}

	// Calculate target page number
	const targetPage = direction === 'next' ? pageNum + 1 : pageNum - 1;
	
	// Play subtle page turn sound effect (optional)
	playPageTurnSound();
	
	// Pre-render the target page on the next canvas
	await renderPageOnCanvas(targetPage, nextCanvas, nextCtx);
	
	// Add page curl effect
	addPageCurlEffect(direction);
	
	// Show shadow effect with animation
	pageTurnShadow.classList.remove('opacity-0');
	pageTurnShadow.classList.add('opacity-100');
	
	// Show next page container with stagger effect
	nextPageContainer.classList.remove('opacity-0');
	nextPageContainer.classList.add('opacity-100');
	
	// Apply sophisticated flip animation
	if (direction === 'next') {
		pageFlipContainer.style.transform = 'rotateY(-180deg) scale(0.95)';
	} else {
		pageFlipContainer.style.transform = 'rotateY(180deg) scale(0.95)';
	}
	
	// Wait for animation to complete - Shorter duration for mobile
	const animationDuration = window.innerWidth < 768 ? 500 : 700;
	await new Promise(resolve => setTimeout(resolve, animationDuration));
	
	// Update page number
	pageNum = targetPage;
	
	// Swap canvases - move next page to current
	const currentPageContainer = document.getElementById('currentPageContainer');
	if (currentPageContainer && nextCanvas && canvas && ctx) {
		// Copy next canvas content to main canvas
		canvas.width = nextCanvas.width;
		canvas.height = nextCanvas.height;
		ctx.drawImage(nextCanvas, 0, 0);
	}
	
	// Reset animation state first
	isAnimating = false;
	console.log('Animation completed, isAnimating set to false');
	
	// Update page info and navigation buttons
	updatePageInfo();
	
	// Reset visual states
	pageFlipContainer.style.transform = 'rotateY(0deg)';
	nextPageContainer.classList.remove('opacity-100');
	nextPageContainer.classList.add('opacity-0');
	pageTurnShadow.classList.remove('opacity-100');
	pageTurnShadow.classList.add('opacity-0');
	
	// Force update navigation buttons after animation
	setTimeout(() => {
		updateNavigationButtons();
		console.log('Navigation buttons updated after animation');
	}, 100);
	
	// Safety timeout to ensure buttons are re-enabled
	setTimeout(() => {
		if (isAnimating) {
			console.warn('Animation state stuck, forcing reset');
			isAnimating = false;
			updateNavigationButtons();
		}
	}, 1000);
}

async function renderPageOnCanvas(pageNumber, targetCanvas, targetCtx) {
	if (!pdfDoc || !targetCanvas || !targetCtx) return;
	
	try {
		const page = await pdfDoc.getPage(pageNumber);
		
		// Calculate optimal scale to fit the container
		const container = document.getElementById('pageFlipContainer');
		if (container) {
			const containerRect = container.getBoundingClientRect();
			const pageViewport = page.getViewport({ scale: 1.0 });
			
			// Mobile-optimized padding
			const isMobile = window.innerWidth < 768;
			const padding = isMobile ? 20 : 40;
			
			// Calculate scale to fit both width and height with padding
			const scaleX = (containerRect.width - padding) / pageViewport.width;
			const scaleY = (containerRect.height - padding) / pageViewport.height;
			const optimalScale = Math.min(scaleX, scaleY, isMobile ? 1.5 : 2.0) * scale; // Lower max scale for mobile
			
			const viewport = page.getViewport({ scale: optimalScale });
			
			// Set canvas dimensions
			targetCanvas.height = viewport.height;
			targetCanvas.width = viewport.width;
			
			// Render PDF page into canvas context
			const renderContext = {
				canvasContext: targetCtx,
				viewport: viewport
			};
			
			await page.render(renderContext).promise;
		}
	} catch (error) {
		console.error('Error rendering page:', error);
	}
}
function playPageTurnSound() {
	// Create a subtle audio context for page turn sound
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
		
		gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
		
		oscillator.type = 'sine';
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	} catch (error) {
		// Silently fail if audio context is not supported
	}
}

function addPageCurlEffect(direction) {
	const pdfContainer = document.getElementById('pdfContainer');
	if (!pdfContainer) return;
	
	// Add temporary curl effect class
	pdfContainer.classList.add('page-curling');
	
	// Remove curl effect after animation - Shorter for mobile
	const duration = window.innerWidth < 768 ? 500 : 700;
	setTimeout(() => {
		pdfContainer.classList.remove('page-curling');
	}, duration);
}

function zoomFit() {
	if (!pdfDoc) return;
	
	// Reset to fit-to-screen scale
	scale = 1.0;  // Reset to base scale calculation
	baseScale = 1.0; // Reset base scale to recalculate
	renderPage(pageNum);
	updateZoomLevel();
	updateNavigationButtons();
}
async function zoomIn() {
	if (isAnimating) return;
	const zoomFactor = window.innerWidth < 768 ? 1.2 : 1.25; // Smaller increments for mobile
	scale *= zoomFactor;
	await renderPage(pageNum);
	updateZoomLevel();
	updateNavigationButtons();
}

async function zoomOut() {
	if (isAnimating) return;
	const zoomFactor = window.innerWidth < 768 ? 1.2 : 1.25; // Smaller increments for mobile
	scale /= zoomFactor;
	if (scale < 0.3) scale = 0.3; // Lower minimum for mobile viewing
	await renderPage(pageNum);
	updateZoomLevel();
	updateNavigationButtons();
}

function updateZoomLevel() {
	const zoomElement = document.getElementById('zoomLevel');
	if (zoomElement) {
		zoomElement.textContent = `${Math.round(scale * 100)}%`;
	}
}
function showPdfError() {
	const loadingElement = document.getElementById('pdfLoading');
	const errorElement = document.getElementById('pdfError');
	
	if (loadingElement) loadingElement.classList.add('hidden');
	if (errorElement) errorElement.classList.remove('hidden');
}
function closePdfViewer() {
	const modal = document.getElementById('pdfViewerModal');
	
	if (modal) {
		modal.classList.add('hidden');
		document.body.style.overflow = '';
		
		// Reset state
		pdfDoc = null;
		pageNum = 1;
		pageRendering = false;
		pageNumPending = null;
		scale = 1.0;
		baseScale = 1.0;
		isAnimating = false;
	}
}

function openPdfInNewTab() {
	if (currentPdfUrl) {
		window.open(currentPdfUrl, '_blank');
	}
}

function downloadPdf() {
	if (currentPdfUrl) {
		const link = document.createElement('a');
		link.href = currentPdfUrl;
		link.download = currentPdfTitle || 'document.pdf';
		link.click();
	}
}

// Make functions globally accessible
(window as any).openFacultyModal = openFacultyModal;
(window as any).closeFacultyModal = closeFacultyModal;
(window as any).openPDFViewer = openPDFViewer;
(window as any).closePdfViewer = closePdfViewer;
(window as any).openPdfInNewTab = openPdfInNewTab;
(window as any).downloadPdf = downloadPdf;
(window as any).onPrevPage = onPrevPage;
(window as any).onNextPage = onNextPage;
(window as any).zoomIn = zoomIn;
(window as any).zoomOut = zoomOut;
(window as any).zoomFit = zoomFit;

// Add event listeners for PDF viewer controls
document.addEventListener('DOMContentLoaded', function() {
	// PDF Viewer Controls - Navigation buttons
	const prevPageBtn = document.getElementById('pdfPrevPage');
	const nextPageBtn = document.getElementById('pdfNextPage');
	const zoomInBtn = document.getElementById('zoomIn');
	const zoomOutBtn = document.getElementById('zoomOut');
	const zoomFitBtn = document.getElementById('zoomFit');

	// Navigation button event listeners
	if (prevPageBtn) {
		prevPageBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Previous page button clicked');
			onPrevPage();
		});
	}

	if (nextPageBtn) {
		nextPageBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Next page button clicked');
			onNextPage();
		});
	}

	// Zoom control event listeners
	if (zoomInBtn) {
		zoomInBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Zoom in button clicked');
			zoomIn();
		});
	}

	if (zoomOutBtn) {
		zoomOutBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Zoom out button clicked');
			zoomOut();
		});
	}

	if (zoomFitBtn) {
		zoomFitBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Zoom fit button clicked');
			zoomFit();
		});
	}

	// Close PDF viewer when clicking outside
	const pdfModal = document.getElementById('pdfViewerModal');
	if (pdfModal) {
		pdfModal.addEventListener('click', function(e) {
			if (e.target === this) {
				closePdfViewer();
			}
		});
	}

	// Close PDF viewer with Escape key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			const modal = document.getElementById('pdfViewerModal');
			if (modal && !modal.classList.contains('hidden')) {
				closePdfViewer();
			}
		}
	});
});

// Test function
(window as any).testModal = function() {
	console.log('Testing modal...');
	openFacultyModal('jemsy');
};
// Faculty Show More/Less functionality
function toggleFacultyView() {
	const additionalFacultyCards = document.querySelectorAll('#additionalFaculty1, #additionalFaculty2, #additionalFaculty3, #additionalFaculty4, #additionalFaculty5, #additionalFaculty6, #additionalFaculty7, #additionalFaculty8, #additionalFaculty9, #additionalFaculty10, #additionalFaculty11') as NodeListOf<HTMLElement>;
	const showMoreText = document.getElementById('showMoreText') as HTMLElement;
	const showMoreIcon = document.getElementById('showMoreIcon') as HTMLElement;
	const showMoreBtn = document.getElementById('showMoreBtn') as HTMLElement;
	
	if (!additionalFacultyCards.length || !showMoreText || !showMoreIcon) {
		console.error('Faculty toggle elements not found');
		return;
	}
	
	// Check if additional faculty is currently hidden (check first card)
	if (additionalFacultyCards[0].classList.contains('hidden')) {
		// Show additional faculty with smooth animation
		additionalFacultyCards.forEach((card: HTMLElement) => {
			card.classList.remove('hidden');
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';
			
			// Animate in
			setTimeout(() => {
				card.style.transition = 'all 0.5s ease-in-out';
				card.style.opacity = '1';
				card.style.transform = 'translateY(0)';
			}, 10);
		});
		
		// Update button text and icon
		showMoreText.textContent = 'Show Less Faculty';
		showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>';
		showMoreBtn.classList.remove('bg-[#61063B]', 'hover:bg-msu-deep-ocean-dark');
		showMoreBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
		
	} else {
		// Hide additional faculty with smooth animation
		additionalFacultyCards.forEach((card: HTMLElement) => {
			card.style.transition = 'all 0.5s ease-in-out';
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';
			
			// Hide after animation
			setTimeout(() => {
				card.classList.add('hidden');
				card.style.opacity = '';
				card.style.transform = '';
			}, 500);
		});
		
		// Update button text and icon
		showMoreText.textContent = 'Show More Faculty';
		showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
		showMoreBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
		showMoreBtn.classList.add('bg-[#61063B]', 'hover:bg-msu-deep-ocean-dark');
	}
}

// Make function globally accessible
(window as any).toggleFacultyView = toggleFacultyView;

// Guest Lecturer Show More/Less functionality
function toggleGuestLecturerView() {
	const additionalGuestLecturerCards = document.querySelectorAll('.additional-guest-lecturer-card') as NodeListOf<HTMLElement>;
	const showMoreText = document.getElementById('showMoreGuestLecturersText') as HTMLElement;
	const showMoreIcon = document.getElementById('showMoreGuestLecturersIcon') as HTMLElement;
	const showMoreBtn = document.getElementById('showMoreGuestLecturersBtn') as HTMLElement;
	
	if (!additionalGuestLecturerCards.length || !showMoreText || !showMoreIcon) {
		console.error('Guest Lecturer toggle elements not found');
		return;
	}
	
	// Check if additional guest lecturers are currently hidden (check first card)
	if (additionalGuestLecturerCards[0].classList.contains('hidden')) {
		// Show additional guest lecturers with smooth animation
		additionalGuestLecturerCards.forEach((card: HTMLElement) => {
			card.classList.remove('hidden');
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';
			
			// Animate in
			setTimeout(() => {
				card.style.transition = 'all 0.5s ease-in-out';
				card.style.opacity = '1';
				card.style.transform = 'translateY(0)';
			}, 10);
		});
		
		// Update button text and icon
		showMoreText.textContent = 'Show Less Guest Lecturers';
		showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>';
		showMoreBtn.classList.remove('bg-[#61063B]', 'hover:bg-[#61063B]');
		showMoreBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
		
	} else {
		// Hide additional guest lecturers with smooth animation
		additionalGuestLecturerCards.forEach((card: HTMLElement) => {
			card.style.transition = 'all 0.5s ease-in-out';
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';
			
			// Hide after animation
			setTimeout(() => {
				card.classList.add('hidden');
				card.style.opacity = '';
				card.style.transform = '';
			}, 500);
		});
		
		// Update button text and icon
		showMoreText.textContent = 'Show More Guest Lecturers';
		showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
		showMoreBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
		showMoreBtn.classList.add('bg-[#61063B]', 'hover:bg-[#61063B]');
	}
}
// Make function globally accessible
(window as any).toggleGuestLecturerView = toggleGuestLecturerView;
// Alumni Carousel Functionality
let currentAlumniSlide = 0;
let alumniAutoPlay = true;
let alumniInterval;

function initAlumniCarousel() {
	const carousel = document.getElementById('alumniCarousel');
	const dots = document.querySelectorAll('.alumni-dot');
	const prevBtn = document.getElementById('prevAlumni');
	const nextBtn = document.getElementById('nextAlumni');
	
	if (!carousel || !dots.length || !prevBtn || !nextBtn) {
		console.error('Alumni carousel elements not found');
		return;
	}
	
	// Update carousel position
	function updateCarousel() {
		carousel.style.transform = `translateX(-${currentAlumniSlide * 100}%)`;
		
		// Update dots
		dots.forEach((dot, index) => {
			if (index === currentAlumniSlide) {
				dot.classList.remove('bg-white/50');
				dot.classList.add('bg-white');
			} else {
				dot.classList.remove('bg-white');
				dot.classList.add('bg-white/50');
			}
		});
	}
	
	// Next slide
	function nextSlide() {
		currentAlumniSlide = (currentAlumniSlide + 1) % 4;
		updateCarousel();
	}
	
	// Previous slide
	function prevSlide() {
		currentAlumniSlide = (currentAlumniSlide - 1 + 4) % 4;
		updateCarousel();
	}
	
	// Go to specific slide
	function goToSlide(slideIndex) {
		currentAlumniSlide = slideIndex;
		updateCarousel();
	}
	
	// Auto-play functionality
	function startAutoPlay() {
		if (alumniAutoPlay) {
			alumniInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
		}
	}
	
	function stopAutoPlay() {
		clearInterval(alumniInterval);
	}
	
	
	// Event listeners
	nextBtn.addEventListener('click', () => {
		nextSlide();
		if (alumniAutoPlay) {
			stopAutoPlay();
			startAutoPlay();
		}
	});
	
	prevBtn.addEventListener('click', () => {
		prevSlide();
		if (alumniAutoPlay) {
			stopAutoPlay();
			startAutoPlay();
		}
	});
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			goToSlide(index);
			if (alumniAutoPlay) {
				stopAutoPlay();
				startAutoPlay();
			}
		});
	});
	// Touch/swipe support
	let startX = 0;
	let endX = 0;
	
	carousel.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX;
	});
	
	carousel.addEventListener('touchend', (e) => {
		endX = e.changedTouches[0].clientX;
		handleSwipe();
	});
	function handleSwipe() {
		const threshold = 50;
		const diff = startX - endX;
		
		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				nextSlide(); // Swipe left - next slide
			} else {
				prevSlide(); // Swipe right - previous slide
			}
			
			if (alumniAutoPlay) {
				stopAutoPlay();
				startAutoPlay();
			}
		}
	}
	
	// Keyboard navigation
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			prevSlide();
			if (alumniAutoPlay) {
				stopAutoPlay();
				startAutoPlay();
			}
		} else if (e.key === 'ArrowRight') {
			nextSlide();
			if (alumniAutoPlay) {
				stopAutoPlay();
				startAutoPlay();
			}
		}
	});
	
	// Initialize
	updateCarousel();
	startAutoPlay();
	
	// Pause auto-play when page is not visible
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			stopAutoPlay();
		} else if (alumniAutoPlay) {
			startAutoPlay();
		}
	});
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initAlumniCarousel);

// Make functions globally accessible
(window as any).initAlumniCarousel = initAlumniCarousel;

// Programs Table Functionality
// Data will be populated from server-side
let programsData = [];

let currentPage = 1;
let rowsPerPage = 25;
let currentSort = { column: 'program', direction: 'asc' };
let filteredData = [];

// Function to initialize programs data (data is already loaded server-side)
function initializeProgramsData() {
    try {
        console.log('=== CLIENT-SIDE INITIALIZATION ===');
        console.log('Initializing programs data...');
        console.log('window.serverProgramsData exists:', !!(window as any).serverProgramsData);
        console.log('window.serverProgramsData value:', (window as any).serverProgramsData);
        
        // Get data from window variable injected by Astro
        if ((window as any).serverProgramsData) {
            console.log('Parsing server data...');
            programsData = JSON.parse((window as any).serverProgramsData);
            console.log('Loaded server-side programsData:', programsData);
            console.log('ProgramsData length:', programsData.length);
            console.log('ProgramsData type:', typeof programsData);
            console.log('First program:', programsData[0]);
        } else {
            console.log('No server-side data found, using empty array');
            programsData = [];
        }
        
        // If no data is found, show empty state
        if (programsData.length === 0) {
            console.log('No programs data found - will show empty state');
        }
        
        // Data is now available
        filteredData = [...programsData];
        console.log('Filtered data initialized:', filteredData);
        return true;
    } catch (error) {
        console.error('Error initializing programs data:', error);
        programsData = [];
        filteredData = [];
        return false;
    }
}

function initProgramsTable() {
    const tableBody = document.getElementById('programsTableBody');
    const mobileContainer = document.getElementById('mobileProgramsContainer');
    const globalSearch = document.getElementById('globalSearch');
    const degreeFilter = document.getElementById('degreeFilter');
    const levelFilter = document.getElementById('levelFilter');
    const clearFilters = document.getElementById('clearFilters');
    const rowsPerPageSelect = document.getElementById('rowsPerPage');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    // Render table (Desktop)
    function renderTable() {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            tableBody.innerHTML = '';
            mobileContainer.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        
        // Desktop table view
        tableBody.innerHTML = pageData.map(program => `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${program.program}</div>
                    <div class="text-sm text-gray-500">${program.description}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-main-color/10 text-msu-main-color">
                        ${program.degree}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.level}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.duration}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ${program.accreditation}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    ${program.fileUrl ? 
                        `<button onclick="openPDFViewer('${program.fileUrl}', '${program.name}')" class="text-msu-main-color hover:text-msu-deep-ocean transition-colors duration-200 cursor-pointer">
                            View Details
                        </button>` : 
                        `<span class="text-gray-400">No file available</span>`
                    }
                </td>
            </tr>
        `).join('');
        // Mobile card view
        mobileContainer.innerHTML = pageData.map(program => `
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <!-- Program Header -->
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-bold text-msu-main-color leading-tight">${program.program}</h3>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-main-color/10 text-msu-main-color ml-2 flex-shrink-0">
                            ${program.degree}
                        </span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">${program.description}</p>
                    
                    <!-- Program Details Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Level</div>
                            <div class="text-sm font-semibold text-gray-900">${program.level}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Duration</div>
                            <div class="text-sm font-semibold text-gray-900">${program.duration}</div>
                        </div>
                    </div>
                    
                    <!-- Accreditation -->
                    <div class="mb-4">
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            ${program.accreditation}
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div class="flex justify-end">
                        ${program.fileUrl ? 
                            `<button onclick="openPDFViewer('${program.fileUrl}', '${program.name}')" class="inline-flex items-center px-4 py-2 bg-msu-main-color text-white text-sm font-medium rounded-lg hover:bg-msu-deep-ocean transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
                                View Details
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </button>` : 
                            `<span class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                                No file available
                            </span>`
                        }
                    </div>
                </div>
            </div>
        `).join('');

        // Update results count
        resultsCount.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length} programs`;
    }

    // Filter and search
    function filterData() {
        const searchTerm = (globalSearch as HTMLInputElement).value.toLowerCase();
        const degreeFilterValue = (degreeFilter as HTMLSelectElement).value;
        const levelFilterValue = (levelFilter as HTMLSelectElement).value;

        filteredData = programsData.filter(program => {
            const matchesSearch = !searchTerm || 
                program.program.toLowerCase().includes(searchTerm) ||
                program.description.toLowerCase().includes(searchTerm) ||
                program.degree.toLowerCase().includes(searchTerm) ||
                program.level.toLowerCase().includes(searchTerm);

            const matchesDegree = !degreeFilterValue || program.degree === degreeFilterValue;
            const matchesLevel = !levelFilterValue || program.level === levelFilterValue;

            return matchesSearch && matchesDegree && matchesLevel;
        });

        currentPage = 1;
        renderTable();
        renderPagination();
    }
    // Sort data
    function sortData(column) {
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.direction = 'asc';
        }

        filteredData.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (currentSort.direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        renderTable();
    }

    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        const pagination = document.getElementById('pagination');

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '<nav class="flex items-center space-x-1">';
        
        // Previous button
        paginationHTML += `
            <button onclick="changePage(${currentPage - 1})" 
                    ${currentPage === 1 ? 'disabled' : ''} 
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
            </button>
        `;

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button onclick="changePage(1)" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">1</button>`;
            if (startPage > 2) {
                paginationHTML += '<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>';
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button onclick="changePage(${i})" 
                        class="px-3 py-2 text-sm font-medium ${i === currentPage ? 'text-white bg-msu-main-color border-msu-main-color' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'} border">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>';
            }
            paginationHTML += `<button onclick="changePage(${totalPages})" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">${totalPages}</button>`;
        }

        // Next button
        paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" 
                    ${currentPage === totalPages ? 'disabled' : ''} 
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        `;

        paginationHTML += '</nav>';
        pagination.innerHTML = paginationHTML;
    }
    // Change page
    (window as any).changePage = function(page: number) {
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderTable();
            renderPagination();
        }
    };

    // Event listeners
    globalSearch.addEventListener('input', filterData);
    degreeFilter.addEventListener('change', filterData);
    levelFilter.addEventListener('change', filterData);
    rowsPerPageSelect.addEventListener('change', (e) => {
        rowsPerPage = parseInt((e.target as HTMLSelectElement).value);
        currentPage = 1;
        renderTable();
        renderPagination();
    });
    clearFilters.addEventListener('click', () => {
        (globalSearch as HTMLInputElement).value = '';
        (degreeFilter as HTMLSelectElement).value = '';
        (levelFilter as HTMLSelectElement).value = '';
        filterData();
    });
    // Sort event listeners
    document.querySelectorAll('[data-sort]').forEach(header => {
        header.addEventListener('click', () => {
            sortData((header as HTMLElement).dataset.sort);
        });
    });

    // Initial render
    renderTable();
    renderPagination();
}

// Initialize programs table when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const success = initializeProgramsData();
    if (success) {
        initProgramsTable();
    } else {
        console.error('Failed to load programs data');
        // Show error message to user
        const tableBody = document.getElementById('programsTableBody');
        const mobileContainer = document.getElementById('mobileProgramsContainer');
        const noResults = document.getElementById('noResults');
        
        if (tableBody) tableBody.innerHTML = '';
        if (mobileContainer) mobileContainer.innerHTML = '';
        if (noResults) {
            noResults.classList.remove('hidden');
            noResults.innerHTML = `
                <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Failed to load programs</h3>
                <p class="mt-1 text-sm text-gray-500">Please refresh the page to try again.</p>
            `;
        }
    }
});

// Tab navigation interactions
document.addEventListener('DOMContentLoaded', () => {
	const tabButtons = document.querySelectorAll('.tab-button');
	tabButtons.forEach((button) => {
		button.addEventListener('click', function () {
			document.querySelectorAll('.tab-button').forEach((btn) => {
				btn.classList.remove('active');
				btn.classList.add('border-transparent', 'text-gray-500');
				btn.classList.remove('border-msu-deep-ocean', 'text-msu-bgc-color');
			});

			document.querySelectorAll('.tab-content').forEach((content) => {
				content.classList.add('hidden');
				content.classList.remove('active');
			});

			this.classList.add('active', 'border-msu-deep-ocean', 'text-msu-bgc-color');
			this.classList.remove('border-transparent', 'text-gray-500');

			const tabId = this.getAttribute('data-tab');
			const content = tabId ? document.getElementById(`${tabId}-content`) : null;
			if (content) {
				content.classList.remove('hidden');
				content.classList.add('active');
			}
		});
	});
});

// Animated counters
document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.counter');
	const speed = 200;

	counters.forEach((counter) => {
		const targetAttr = counter.getAttribute('data-target');
		const target = targetAttr ? Number(targetAttr) : 0;

		function updateCount() {
			const current = Number(counter.textContent) || 0;
			const increment = target / speed;

			if (current < target) {
				counter.textContent = Math.ceil(current + increment).toString();
				setTimeout(updateCount, 1);
			} else {
				counter.textContent = target.toString();
			}
		}

		updateCount();
	});
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
	const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
	const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null;
	const submitText = document.getElementById('submitText');
	const submitSpinner = document.getElementById('submitSpinner');
	const formStatus = document.getElementById('formStatus');
	const thankYouModal = document.getElementById('thankYouModal');
	const closeModalBtn = document.getElementById('closeModalBtn');

	const showStatus = (message: string, isSuccess = true) => {
		if (!formStatus) return;
		formStatus.textContent = message;
		formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600');
		formStatus.classList.add(isSuccess ? 'text-green-600' : 'text-red-600');
		formStatus.focus();
	};

	const resetSubmitState = () => {
		if (!submitBtn || !submitText || !submitSpinner) return;
		submitBtn.disabled = false;
		submitText.classList.remove('hidden');
		submitSpinner.classList.add('hidden');
	};

	const closeModal = () => {
		if (!thankYouModal) return;
		thankYouModal.classList.add('hidden');
		document.body.classList.remove('overflow-hidden');
		resetSubmitState();
	};

	closeModalBtn?.addEventListener('click', closeModal);
	thankYouModal?.addEventListener('click', (event) => {
		if (event.target === thankYouModal) {
			closeModal();
		}
	});

	const showModal = () => {
		if (!thankYouModal) return;
		thankYouModal.classList.remove('hidden');
		document.body.classList.add('overflow-hidden');
		closeModalBtn?.focus();
	};

	const validateForm = () => {
		if (!contactForm) return false;

		const nameInput = document.getElementById('name') as HTMLInputElement | null;
		const emailInput = document.getElementById('email') as HTMLInputElement | null;
		const subjectSelect = document.getElementById('subject') as HTMLSelectElement | null;
		const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;

		if (!nameInput || !emailInput || !subjectSelect || !messageInput) {
			showStatus('Please complete all required fields.', false);
			return false;
		}

		const name = nameInput.value.trim();
		const email = emailInput.value.trim();
		const subject = subjectSelect.value;
		const message = messageInput.value.trim();

		if (!name || !email || !subject || !message) {
			showStatus('Please fill out all required fields.', false);
			return false;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			showStatus('Please enter a valid email address.', false);
			return false;
		}

		return true;
	};

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		if (!contactForm || !submitBtn || !submitText || !submitSpinner) {
			showStatus('Form configuration error. Please try again later.', false);
			return;
		}

		if (!validateForm()) {
			return;
		}

		submitBtn.disabled = true;
		submitText.classList.add('hidden');
		submitSpinner.classList.remove('hidden');
		showStatus('Submitting your message...', true);

		const formData = new FormData(contactForm);

		fetch(contactForm.action, {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.text();
			})
			.then(() => {
				showStatus('Message sent successfully!', true);
				showModal();
				contactForm.reset();
			})
			.catch((error) => {
				console.error('Form submission error:', error);
				showStatus('There was an error sending your message. Please try again.', false);
			})
			.finally(() => {
				resetSubmitState();
			});
	};

	submitBtn?.addEventListener('click', (event) => {
		event.preventDefault();
		handleSubmit(event);
	});

	contactForm?.addEventListener('submit', handleSubmit);

	document.getElementById('email')?.addEventListener('input', function (this: HTMLInputElement) {
		const email = this.value.trim();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			showStatus('Please enter a valid email address.', false);
			this.classList.add('border-red-500');
		} else {
			if (submitBtn && !submitBtn.disabled) {
				showStatus('', true);
			}
			this.classList.remove('border-red-500');
		}
	});
});

// Dark mode enhancements
document.addEventListener('DOMContentLoaded', () => {
	function applyDarkMode(isDark: boolean) {
		if (isDark) {
			document.documentElement.classList.add('dark');
			document.body.classList.add('dark');
			document.documentElement.style.backgroundColor = '#111827';
			document.body.style.backgroundColor = '#111827';

			const sections = document.querySelectorAll('section');
			sections.forEach((section) => {
				section.classList.add('dark');
			});

			const aboutSection = document.querySelector('section.bg-gradient-to-br') as HTMLElement | null;
			if (aboutSection) {
				aboutSection.style.backgroundColor = '#020817';
				aboutSection.style.color = '#ffffff';
			}

			document.querySelectorAll('.tab-button').forEach((button) => {
				(button as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('p, span, li').forEach((paragraph) => {
				(paragraph as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
				(heading as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('li').forEach((listItem) => {
				(listItem as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('.program-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#1f2937';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('select, input, textarea').forEach((input) => {
				(input as HTMLElement).style.backgroundColor = '#374151';
				(input as HTMLElement).style.color = '#ffffff';
				(input as HTMLElement).style.borderColor = '#4b5563';
			});
			document.querySelectorAll('option').forEach((option) => {
				(option as HTMLElement).style.backgroundColor = '#374151';
				(option as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('label').forEach((label) => {
				(label as HTMLElement).style.color = '#ffffff';
			});
			document.querySelectorAll('.faculty-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#374151';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('.guest-lecturer-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#374151';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('.personnel-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#374151';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('.facility-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#374151';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('.research-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = '#374151';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
			document.querySelectorAll('.program-card').forEach((card) => {
				(card as HTMLElement).style.backgroundColor = 'rgba(55, 65, 81, 0.8)';
				(card as HTMLElement).style.border = '1px solid #4b5563';
			});
		} else {
			document.documentElement.classList.remove('dark');
			document.body.classList.remove('dark');
			document.documentElement.style.backgroundColor = '';
			document.body.style.backgroundColor = '';

			const aboutSection = document.querySelector('section.bg-gradient-to-br') as HTMLElement | null;
			if (aboutSection) {
				aboutSection.style.backgroundColor = '';
				aboutSection.style.color = '';
			}

			const resetStyles = (selector: string, styles: string[]) => {
				document.querySelectorAll(selector).forEach((element) => {
					const el = element as HTMLElement;
					styles.forEach((styleProp) => {
						(el.style as any)[styleProp] = '';
					});
				});
			};

			resetStyles('.tab-button', ['color']);
			resetStyles('p, span, li', ['color']);
			resetStyles('h1, h2, h3, h4, h5, h6', ['color']);
			resetStyles('.program-card', ['backgroundColor', 'border']);
			resetStyles('.faculty-card', ['backgroundColor', 'border']);
			resetStyles('.guest-lecturer-card', ['backgroundColor', 'border']);
			resetStyles('.personnel-card', ['backgroundColor', 'border']);
			resetStyles('.facility-card', ['backgroundColor', 'border']);
			resetStyles('.research-card', ['backgroundColor', 'border']);
			resetStyles('select, input, textarea', ['backgroundColor', 'color', 'borderColor']);
			resetStyles('option', ['backgroundColor', 'color']);
			resetStyles('label', ['color']);
		}
	}

	const darkModeToggle = document.getElementById('darkModeToggle');
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	const isInitiallyDark =
		localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches);

	applyDarkMode(isInitiallyDark);

	darkModeToggle?.addEventListener('click', () => {
		const isCurrentlyDark = document.documentElement.classList.contains('dark');
		const newTheme = isCurrentlyDark ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		applyDarkMode(!isCurrentlyDark);
	});

	prefersDarkScheme.addEventListener('change', (event) => {
		const storedTheme = localStorage.getItem('theme');
		if (!storedTheme) {
			applyDarkMode((event as MediaQueryListEvent).matches);
		}
	});
});

// Student life slider
document.addEventListener('DOMContentLoaded', () => {
	const sliderTrack = document.getElementById('slider-track');
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	const dots = Array.from(document.querySelectorAll('.slider-dot'));

	let currentSlide = 0;
	let isAutoplay = true;
	let autoplayInterval: number | undefined;
	const totalSlides = 6;

	const getSlideWidth = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 768) return 100;
		if (screenWidth < 1024) return 50;
		return 25;
	};

	const updateSlider = () => {
		if (!sliderTrack) return;
		const slideWidth = getSlideWidth();
		const translateX = -(currentSlide * slideWidth);
		sliderTrack.style.transform = `translateX(${translateX}%)`;

		dots.forEach((dot, index) => {
			(dot as HTMLElement).classList.toggle('bg-msu-main-color', index === currentSlide);
			(dot as HTMLElement).classList.toggle('bg-gray-300', index !== currentSlide);
			(dot as HTMLElement).style.transform = index === currentSlide ? 'scale(1.2)' : 'scale(1)';
		});
	};

	const goToSlide = (index: number) => {
		if (index < 0) {
			currentSlide = totalSlides - 1;
		} else if (index >= totalSlides) {
			currentSlide = 0;
		} else {
			currentSlide = index;
		}
		updateSlider();
	};

	const startAutoplay = () => {
		if (!isAutoplay) return;
		stopAutoplay();
		autoplayInterval = window.setInterval(() => {
			goToSlide(currentSlide + 1);
		}, 4000);
	};

	const stopAutoplay = () => {
		if (autoplayInterval !== undefined) {
			clearInterval(autoplayInterval);
			autoplayInterval = undefined;
		}
	};

	prevBtn?.addEventListener('click', () => {
		goToSlide(currentSlide - 1);
		isAutoplay = false;
		stopAutoplay();
	});

	nextBtn?.addEventListener('click', () => {
		goToSlide(currentSlide + 1);
		isAutoplay = false;
		stopAutoplay();
	});

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			goToSlide(index);
			isAutoplay = false;
			stopAutoplay();
		});
	});

	sliderTrack?.addEventListener('mouseenter', () => {
		isAutoplay = false;
		stopAutoplay();
	});

	sliderTrack?.addEventListener('mouseleave', () => {
		isAutoplay = true;
		startAutoplay();
	});

	window.addEventListener('resize', updateSlider);

	updateSlider();
	startAutoplay();
});
