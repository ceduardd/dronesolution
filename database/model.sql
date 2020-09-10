-- PHYSIC AND LOGICAL MODEL OF DB

CREATE TABLESPACE ts_dronesolution
  DATAFILE 'ts_dronesolution.ora'
  SIZE 10m
  AUTOEXTEND ON;

CREATE USER dronesolution IDENTIFIED BY dronesolution
  DEFAULT TABLESPACE ts_dronesolution
  QUOTA UNLIMITED ON ts_dronesolution;

GRANT CREATE SESSION,
      CREATE TABLE
      TO dronesolution;