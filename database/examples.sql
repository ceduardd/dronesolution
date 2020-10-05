-- Query exmples

-- ===================================  
-- CONSULT AGREEMENTS
-- ===================================

SELECT DATE_ISSUE, USERS.FULLNAME, USERS.DNI, EVENTS.NAME, DATE_START, PLANS.NAME_PLAN, PLANS.PRICE 
	FROM AGREEMENTS
		INNER JOIN USERS ON USERS.DNI = AGREEMENTS.USER_DNI 
		INNER JOIN EVENTS ON EVENTS.ID = AGREEMENTS.EVENT_ID
		INNER JOIN PLANS ON PLANS.ID = AGREEMENTS.PLAN_ID 
	WHERE USERS.DNI = '0938975611';

-- ===================================  
-- INSERT USERS
-- ===================================

INSERT INTO users (dni, fullname, email, password, phone, home_address) VALUES (
	'0912349078',
	'Francisco Rodriguez',
	'frodriguez@gmail.com',
	'******',
	'3-901398',
	'Av. Infinity Loop'
);

-- ===================================  
-- INSERT PILOTS
-- ===================================

INSERT INTO pilots (dni, fullname, email, experience, path_img) VALUES (
	'0910903787',
	'Kora Xian',
	'kxian@gmail.com',
	'Experiencia en el filmaciones de eventos como conciertos y partidos de futbol, trabajando en DroneSolution desde 2018',
	'/assets/pilots/KoraXian.jpg'
);

-- ===================================  
-- INSERT DRONES
-- ===================================

INSERT INTO drones (brand, description, pilot_dni, path_img) VALUES (
	'Mavic Mini',
	'El compacto pero potente Mavic Mini es el compañero creativo perfecto que eleva sin esfuerzo lo ordinario.',
	'0910903787',
	'/assets/drones/Mavic-Mini-DJI.jpg'
);

-- ===================================  
-- INSERT EVENTS
-- ===================================

INSERT INTO events (dni, fullname, email, password, phone, home_address) VALUES (
	'0989102310',
	'Kora Xian',
	'kxian@gmail.com',
	'******',
	'3-90199',
	'Av. XYZ'
);