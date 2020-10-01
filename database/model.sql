-- PHYSIC AND LOGICAL MODEL OF DB

-- ===================================  
-- DEFAULT TABLESPACE
-- ===================================

CREATE TABLESPACE ts_dronesolution
  DATAFILE 'ts_dronesolution.dbf'
  SIZE 10M
  AUTOEXTEND ON;

-- ===================================  
-- USER
-- ===================================

CREATE USER dronesolution IDENTIFIED BY dronesolution
  DEFAULT TABLESPACE ts_dronesolution
  QUOTA UNLIMITED ON ts_dronesolution;

-- ===================================  
-- PRIVILEGES
-- ===================================

GRANT CREATE SESSION,
  RESOURCE,
  TO dronesolution;