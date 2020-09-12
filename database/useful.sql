-- USEFUL SENTENCES FOR ORACLE DBMS

-- ===================================
-- TABLESPACES
-- ===================================

-- Show tablespaces
SELECT 
  tablespace_name, 
  file_name, 
  bytes / 1024/ 1024  MB
FROM
  dba_data_files;

-- Drop tablespaces (including temporary tablespace)
DROP TABLESPACE ts_name
  INCLUDING CONTENTS AND DATAFILES -- Drop objects into tablespace and datafiles created
  -- INCLUDING CONTENTS AND KEEP DATAFILES -- Drop objects into tablespace and keep datafiles created
  CASCADE CONSTRAINTS; -- Delete references pk and fk in other tables outside tablespace

-- Size of the tablespace
SELECT 
  tablespace_name, 
  bytes / 1024 / 1024 MB
FROM 
  dba_free_space
WHERE 
  tablespace_name = 'ts_dronesolution';

-- ===================================  
-- USERS
-- ===================================

-- Show privileges of the current session
SELECT * FROM session_privs;

-- Show users open status
SELECT 
  username, 
  default_tablespace, 
  profile, 
  authentication_type
FROM
  dba_users
WHERE 
  account_status = 'OPEN';

-- Drop user
DROP USER user_name CASCADE; -- including objectes created by the user

-- ===================================  
-- TABLES
-- ===================================

-- Show tables (current user)
SELECT table_name
  FROM user_tables
  ORDER BY table_name;

-- Drop table
DROP TABLE table_name CASCADE CONSTRAINTS;

